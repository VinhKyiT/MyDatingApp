// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // databaseURL: 'https://mydatingapp-bf9df.firebaseio.com',
  apiKey: 'AIzaSyBbA6Hu4P--jAEqGROXjGXnWg1rhEsIBHc',
  authDomain: 'mydatingapp-bf9df.firebaseapp.com',
  projectId: 'mydatingapp-bf9df',
  storageBucket: 'mydatingapp-bf9df.appspot.com',
  messagingSenderId: '696534455324',
  appId: '1:696534455324:web:df3d6f6412aef3e8aa7bd9',
  measurementId: 'G-MZK6SBXLP3',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

export { auth, db };
