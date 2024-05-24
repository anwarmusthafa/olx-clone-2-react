import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBJbQ8avSXXw1US9QfAjMC8FhIdXlELOsU",
  authDomain: "olx-clone-2-ae930.firebaseapp.com",
  projectId: "olx-clone-2-ae930",
  storageBucket: "olx-clone-2-ae930.appspot.com",
  messagingSenderId: "744854002916",
  appId: "1:744854002916:web:4dbbaa1edba9235d6520f1",
  measurementId: "G-DP83TTL150"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
