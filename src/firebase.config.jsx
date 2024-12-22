// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration



const firebaseConfig = {
  apiKey: "AIzaSyC6FzXAek3m66mZwSp48WQfchqhjGGGEjs",
  authDomain: "my-note-app-01.firebaseapp.com",
  projectId: "my-note-app-01",
  storageBucket: "my-note-app-01.firebasestorage.app",
  messagingSenderId: "589154804911",
  appId: "1:589154804911:web:72a5957c172d8b5081a05a"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);


export default app