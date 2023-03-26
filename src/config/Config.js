
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyA4q93ih01Mg9-2559XoQyHp8Z9opFfglw",
    authDomain: "ecommerce-site-e42e8.firebaseapp.com",
    projectId: "ecommerce-site-e42e8",
    storageBucket: "ecommerce-site-e42e8.appspot.com",
    messagingSenderId: "322057234470",
    appId: "1:322057234470:web:10da73351e264478201ee7"
  };

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage };