import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Create from './Pages/Create'
import View from './Pages/ViewPost'
import Post from './Store/PostContext';

import { AuthContext, FirebaseContext } from './Store/Context';
import { getAuth} from 'firebase/auth';



function App() {
  const {setUser} = useContext(AuthContext)
  const {db} = useContext(FirebaseContext)
  const auth = getAuth()
  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      setUser(user)
    })
  })
  return (
    <div>
      <Post>
      <Router>
        <Routes>
          <Route  path="/" element={<Home/>}/>
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/create" element={<Create/>} />
          <Route path="/view" element={<View/>} />
        </Routes>
      </Router>
      </Post>
    </div>
  );
}

export default App;
