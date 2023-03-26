
import firebase, {initializeApp} from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyA4q93ih01Mg9-2559XoQyHp8Z9opFfglw",
    authDomain: "ecommerce-site-e42e8.firebaseapp.com",
    projectId: "ecommerce-site-e42e8",
    storageBucket: "ecommerce-site-e42e8.appspot.com",
    messagingSenderId: "322057234470",
    appId: "1:322057234470:web:10da73351e264478201ee7"
  };

const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

export { auth, db, storage };