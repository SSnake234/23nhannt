// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDh-hnp4K15xv3T1laiXf8--IbLBDxUv3o",
    authDomain: "cecs-47881.firebaseapp.com",
    databaseURL: "https://cecs-47881-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "cecs-47881",
    storageBucket: "cecs-47881.appspot.com",
    messagingSenderId: "1077638493495",
    appId: "1:1077638493495:web:4c799b7ad681e2e8e096b2"
};

// Initialize Firebas
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();
function register() {
    // Get all our input fields
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var username = document.getElementById('username').value;
  
    // Validate input fields
    if (validate_email(email) == false) {
        alert('Email is invalid!');
        return;
    }

    if (validate_password(password) == false) {
        alert('Password must be longer than 6 characters!');
        return;
    }

    if (validate_field(username) == false) {
      alert('One or More Fields are empty!');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        
        // Add this user to Firebase Database
        set(ref(database, 'users/' + user.uid), {
          email: email,
          username: username,
          last_login: Date.now()
        })
        createNotification('User Created!!');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        createNotification(errorMessage);
      });
}

function login() {
    // Get all our input fields
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
  
    // Validate input fields
    if (validate_email(email) == false) {
        alert('Email is invalid!');
        return;
    }

    if (validate_password(password) == false) {
        alert('Password must be longer than 6 characters!');
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            update(ref(database, 'users/' + user.uid), {
              last_login: Date.now()
            })

            window.location.href = "main.html";
            createNotification('User Logged In!!');
        })
        .catch((error) => {
            const errorMessage = error.message;
            createNotification(errorMessage);
        });
}

// Validate Functions
function validate_email(email) {
    // Regular expression for email validation
    var expression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return expression.test(email);
}

function validate_password(password) {
    return password.length > 6;
}

function validate_field(field) {
    return field && field.length > 0;
}

function createNotification(message) {
  const notification = document.createElement('div');
  notification.classList.add('notification', 'slide-in');
  notification.textContent = message;
  document.body.appendChild(notification);

  // Remove notification after a certain time (e.g., 3 seconds)
  setTimeout(() => {
      notification.classList.remove('slide-in');
      notification.classList.add('slide-out');
      setTimeout(() => {
          notification.remove();
      }, 0); // Should match transition duration
  }, 3000);
}

let log = document.getElementById('login');
let reg = document.getElementById('register');

if (log) {
  log.addEventListener('click', login);
}

if (reg) {
  reg.addEventListener('click', register);
}
