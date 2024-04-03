import {firebaseConfig} from './verificonfig.js';
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();
const signupForm = document.querySelector('.registration.form');
const loginForm = document.querySelector('.login.form');
const forgotForm=document.querySelector('.forgot.form');
const container=document.querySelector('.container');
const signupBtn = document.querySelector('.signupbtn');
const anchors = document.querySelectorAll('a');
anchors.forEach(anchor => {
  anchor.addEventListener('click', () => {
    const id = anchor.id;
    switch(id){
    case 'loginLabel':
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
        forgotForm.style.display = 'none';
        break;

      case 'forgotLabel':
        signupForm.style.display = 'none';
        loginForm.style.display = 'none';
        forgotForm.style.display = 'block';
        break;
    }
  });
});

const loginBtn = document.querySelector('.loginbtn');
loginBtn.addEventListener('click', () => {
  const email = document.querySelector('#inUsr').value.trim();
  const password = document.querySelector('#inPass').value;
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      if (user.emailVerified) {
        console.log('User is signed in with a verified email.');
        location.href = "premium access.html";
      } else {
        alert('Please verify your email before signing in.');
      }
    })
    .catch((error) => {
      alert('Error signing in: ' + error.message);
    });
});
const forgotBtn=document.querySelector('.forgotbtn');
forgotBtn.addEventListener('click', () => {
  const emailForReset = document.querySelector('#forgotinp').value.trim();
 if (emailForReset.length>0) {
   auth.sendPasswordResetEmail(emailForReset)
 .then(() => {
   alert('Password reset email sent. Please check your inbox to reset your password.');
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
        forgotForm.style.display = 'none';
    })
    .catch((error) => {
    alert('Error sending password reset email: ' + error.message);
  });
  }
});
