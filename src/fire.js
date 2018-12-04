import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/database';

var config = {
    apiKey: "AIzaSyAoIBtOT5wcVNP3ujWILYbsWfvvzWYgth0",
    authDomain: "sqabbackend.firebaseapp.com",
    databaseURL: "https://sqabbackend.firebaseio.com",
    projectId: "sqabbackend",
    storageBucket: "sqabbackend.appspot.com",
    messagingSenderId: "680112495974"
};

var fire = firebase.initializeApp( config );

export default fire;