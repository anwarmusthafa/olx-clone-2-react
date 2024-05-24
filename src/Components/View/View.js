import React, { useContext, useEffect, useState } from 'react';
import './View.css';
import { postContext } from '../../Store/PostContext';
import { FirebaseContext } from '../../Store/Context';
import { collection, getDocs, query, where } from 'firebase/firestore';


function View() {
  const { postDetails } = useContext(postContext);
  const { db } = useContext(FirebaseContext);
  const product = postDetails
  const userId = product.userId
  const [user, setUser] = useState("")

  useEffect(() => {
    const fetchUser = async () => {
        try {
            const userCollection = collection(db, 'users');
            const querySnapshot = await getDocs(query(userCollection, where('id', '==', userId)));
            querySnapshot.forEach(doc => {
                setUser(doc.data())
            });
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    if (userId) {
        fetchUser();
    }
}, [userId, db]);
  


  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={product.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {product.price} </p>
          <span>{product.name}</span>
          <p>{product.category}</p>
          <span>{product.createdAt}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{user.username}</p>
          <p>{user.phone}</p>
        </div>
      </div>
    </div>
  );
}

export default View;
