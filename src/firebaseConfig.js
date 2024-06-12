import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDo8INABPeUAhye1V9opUs8Do-ESHFSIio",
    authDomain: "id-carzone.firebaseapp.com",
    projectId: "id-carzone",
    storageBucket: "id-carzone.appspot.com",
    messagingSenderId: "927986563989",
    appId: "1:927986563989:web:57f51f1cf71a64ad68d49c",
    measurementId: "G-Q49QTC7M3Z"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
