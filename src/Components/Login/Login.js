import React, { useState , useContext} from 'react';
import { getAuth} from 'firebase/auth';
import Logo from '../../olx-logo.png';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth'


function Login() {
  const [email, setEmail] = useState("") 
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const auth = getAuth();
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // Navigate to the home page after successful sign-in
    } catch (error) {
      // Handle sign-in error here
      setError(error.message)
    }finally{
      setLoading(false)
    }
  };
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt='logo'></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            defaultValue="John"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            defaultValue="Doe"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <br />
          <br />
          <button disabled={loading}>{loading ? 'Signin...' : 'Signin'}</button>
          <p className='text-danger' >{error}</p>
        </form>
        <a onClick={()=> navigate("/signup")} >Signup</a>
      </div>
    </div>
  );
}

export default Login;
