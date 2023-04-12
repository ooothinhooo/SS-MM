import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { getAuth } from "firebase/auth";

// import { firebase } from "firebase/app";
// import "firebase/storage";
// const firebaseConfig = {
//   apiKey: env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: env.REACT_APP_FIREBASE_DATABASE_URL,
//   projectId: env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   messagingSenderId: env.REACT_APP_FIREBASE_APP_ID,
//   appId: env.REACT_APP_APP_ID,
//   measurementId: env.REACT_APP_FIREBASE_MEASUREMENT_ID,
// };

//Your web app's Firebase configuration
//For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSaq729Fcax2sCKaieiL1o5wE9qYy6mIs",
  authDomain: "fooddeliveryapp154.firebaseapp.com",
  databaseURL: "https://fooddeliveryapp154-default-rtdb.firebaseio.com",
  projectId: "fooddeliveryapp154",
  storageBucket: "fooddeliveryapp154.appspot.com",
  messagingSenderId: "463417095744",
  appId: "1:463417095744:web:38a377531cb6574aef51a5",
  measurementId: "G-BBJ4M9MBH7",
};
// const app = initializeApp(firebaseConfig);
// export const authentication = getAuth(app);
// const firestore = getFirestore(app);
// const storage = getStorage(app, "gs://fooddeliveryapp154.appspot.com");
// export default storage;
// export { app, firestore };
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const firestore = getFirestore(app);
// const storage = getStorage(app, "gs://lro123.appspot.com");
const storage = getStorage(app, "gs://fooddeliveryapp154.appspot.com");
export const db = getFirestore(app);
export const auth = getAuth(app);
export const authentication = getAuth(app);
export { app, firestore, storage };

export const DeleteFileDoc = (FolderUser, FileName) => {
  // console.log(FolderUser);
  // console.log(FileName);
  // Create a reference to the file to delete
  const desertRef = ref(storage, `/docs/${FolderUser}/${FileName}`);

  // Delete the file
  deleteObject(desertRef)
    .then(() => {
      // File deleted successfully
      // console.log("File deleted successfully");
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
    });
};
