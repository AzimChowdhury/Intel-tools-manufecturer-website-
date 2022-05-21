// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyARfX_VhZc5EIMMLiejPcViMyGi08_J_Fg",
    authDomain: "intel-62fc4.firebaseapp.com",
    projectId: "intel-62fc4",
    storageBucket: "intel-62fc4.appspot.com",
    messagingSenderId: "823067897112",
    appId: "1:823067897112:web:ded1e934af8cf7c302826d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;