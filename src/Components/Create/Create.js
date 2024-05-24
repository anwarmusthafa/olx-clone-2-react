import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { AuthContext, FirebaseContext } from '../../Store/Context';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false)

  const { db } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const storage = getStorage();
  const navigate = useNavigate()

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async () => {
    setLoading(true)
    if (image) {
      try {
        console.log("User: ", user);
        const storageRef = ref(storage, `images/${image.name}`);
        const snapshot = await uploadBytes(storageRef, image);
        console.log('File uploaded successfully:', snapshot);
        const url = await getDownloadURL(snapshot.ref);
        console.log('File URL:', url);
  
        await addDoc(collection(db, 'products'), {
          name,
          category,
          price,
          url,
          userId: user.uid,
          createdAt: new Date().toISOString(),
        });
  
        console.log('Document successfully written!');
        navigate("/")
      } catch (error) {
        console.error('Error writing document: ', error);
      } finally{
        setLoading(false)
      }
    } else {
      alert("Please upload an image.");
    }
  };
  

  return (
    <Fragment>
      <Header />
      <div className="centerDiv">
        <label htmlFor="name">Name</label>
        <br />
        <input
          className="input"
          type="text"
          id="name"
          name="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label htmlFor="category">Category</label>
        <br />
        <input
          className="input"
          type="text"
          id="category"
          name="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <br />
        <label htmlFor="price">Price</label>
        <br />
        <input
          className="input"
          type="number"
          id="price"
          name="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <br />
        <br />
        {image && (
          <img
            alt="Preview"
            width="200px"
            height="200px"
            src={URL.createObjectURL(image)}
          />
        )}
        <br />
        <input type="file" onChange={handleFileChange} />
        <br />
        <button disabled={loading} onClick={handleSubmit} className="uploadBtn">
          {loading? "Uploding..." :"Upload and Submit"}
        </button>
      </div>
    </Fragment>
  );
};

export default Create;
