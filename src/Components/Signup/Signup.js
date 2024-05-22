import React, { useState, useContext } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../Store/FirebaseContext';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // State variable for loading
  const [error , setError] = useState("")
  const { db } = useContext(FirebaseContext);
  const auth = getAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      console.log("result", result);

      await updateProfile(result.user, { displayName: username });
      console.log("Profile updated successfully");

      // Add user details to Firestore
      await addDoc(collection(db, 'users'), {
        id: result.user.uid,
        username: username,
        phone: phone
      });

      // Navigate to login page
      navigate('/login');
    } catch (error) {
      console.error("Error creating user or updating profile:", error);
      setError(error.message || "An error occurred");
    } finally {
      setLoading(false); // Set loading state back to false
    }
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="Logo" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="tel"
            id="lname"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button disabled={loading}>{loading ? 'Signing up...' : 'Signup'}</button>
        </form>
        <a href="#">Login</a>
        <p>{error}</p>
      </div>
    </div>
  );
}
