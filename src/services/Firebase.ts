import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import FIREBASE_CONFIG from 'config/firebaseConfig';

firebase.initializeApp(FIREBASE_CONFIG);

export const firestore = firebase.firestore();
export default firebase;
