
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDB0ZJAZVrstFtkBc4zia-mdbbvNpRv6J4",
  authDomain: "test-ba491.firebaseapp.com",
  projectId: "test-ba491",
  storageBucket: "test-ba491.appspot.com",
  messagingSenderId: "702393151176",
  appId: "1:702393151176:web:3824f76078de1517ecfffd",
  measurementId: "G-MYZ2Y2PGZ0"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app); 
export const storage = getStorage(app);