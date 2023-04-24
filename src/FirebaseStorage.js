import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyA_0i-Wz3c9OWrCN5eTp8TBXtSEbZ3_M0c",
    authDomain: "petinder-project.firebaseapp.com",
    databaseURL: "https://petinder-project-default-rtdb.firebaseio.com",
    projectId: "petinder-project",
    storageBucket: "petinder-project.appspot.com",
    messagingSenderId: "718859283138",
    appId: "1:718859283138:web:b1321938c299991ec2695b",
    measurementId: "G-WY98989N2P"
  };

  firebase.initializeApp(firebaseConfig)
  const storage = firebase.storage();
  
  export default storage
