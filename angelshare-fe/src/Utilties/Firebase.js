import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: `${process.env.REACT_APP_FIREBASE_API}`,
    authDomain: `${process.env.REACT_APP_FIREBASE_AUTHDOMAIN}`,
    databaseURL: `${process.env.REACT_APP_FIREBASE_DBURL}`,
    projectId: `${process.env.REACT_APP_FIREBASE_PROJECTID}`,
    storageBucket: `${process.env.REACT_APP_STORAGEBUCKET}`,
    messagingSenderId: `${process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID}`,
    appId: `${process.env.REACT_APP_FIREBASE_APPID}`,
    measurementId: `${process.env.REACT_APP_FIREBASE_APPID}`
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }