import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCTh1wS7s1HYIKL0f4lyMA8ZLJKwEB_Jn0",
  authDomain: "rio-clothing-db.firebaseapp.com",
  projectId: "rio-clothing-db",
  storageBucket: "rio-clothing-db.appspot.com",
  messagingSenderId: "853495579454",
  appId: "1:853495579454:web:67f84a79d5ff14bc28226f"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);

  // if user data does not exists
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  // if user data exists
  return userDocRef;

}