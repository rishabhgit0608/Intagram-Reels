import firebase from "firebase/compat";

const firebaseConfig = {
  apiKey: "AIzaSyBo3a-5j5aqnxJAPm8dTsAsxnsGjkI1jUA",
  authDomain: "new-login-project-5f0ab.firebaseapp.com",
  projectId: "new-login-project-5f0ab",
  storageBucket: "new-login-project-5f0ab.appspot.com",
  messagingSenderId: "855762419464",
  appId: "1:855762419464:web:9279136a05677867d636bd",
  measurementId: "G-686Y7C6YK1",
};
let firebaseApp = firebase.initializeApp(firebaseConfig);

let firebaseAuth = firebaseApp.auth();

export default firebaseAuth;

export let firebaseStorage = firebaseApp.storage();

export let firebaseDB = firebaseApp.firestore();

export let timeStamp = firebase.firestore.FieldValue.serverTimestamp;
