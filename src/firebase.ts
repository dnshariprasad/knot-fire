import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDVCA-Aqu_5j_rgNYmAhoOpNtyuaZQih-M",
  authDomain: "knot-0551.firebaseapp.com",
  projectId: "knot-0551",
  storageBucket: "knot-0551.firebasestorage.app",
  messagingSenderId: "1090158077363",
  appId: "1:1090158077363:web:b391db04186829e8a717c6",
  measurementId: "G-SZLKJPZWER"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
