// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDkkf1StreUD3y-GuD19pWDl46J_-XCiuI",
    authDomain: "travel-101b3.firebaseapp.com",
    projectId: "travel-101b3",
    storageBucket: "travel-101b3.appspot.com",
    messagingSenderId: "999237037543",
    appId: "1:999237037543:web:6271de759ffe60bc26e142"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
