var firebase = require('firebase');
var config = {
    apiKey: "AIzaSyBDLrFOGGqpc7h3PIiefTXjVi-2gvfJhnI",
    authDomain: "demofirebase-97584.firebaseapp.com",
    databaseURL: "https://demofirebase-97584.firebaseio.com",
    projectId: "demofirebase-97584",
    storageBucket: "demofirebase-97584.appspot.com",
    messagingSenderId: "911220474223"
};
firebase.initializeApp(config);
module.exports = firebase;