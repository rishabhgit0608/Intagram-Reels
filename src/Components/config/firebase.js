import firebase from "firebase/compat";
let firebaseConfig = {
 apiKey: "AIzaSyB7HDnXpuqyUcosoRk6w4BNGrHTAFvUgUI",
 authDomain: "login-auth-e9a63.firebaseapp.com",
 projectId: "login-auth-e9a63",
 storageBucket: "login-auth-e9a63.appspot.com",
 messagingSenderId: "661837767573",
 appId: "1:661837767573:web:c9e71c25ea1fc0a87b8c9c",
};

let firebaseApp = firebase.initializeApp(firebaseConfig);

let firebaseAuth = firebaseApp.auth();

export default firebaseAuth;
