import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';
const config = {
  apiKey: "AIzaSyBXI_9h34Dsfqegtn7ST78JvLC-T0CyaHQ",
  authDomain: "intake-stock-e1612.firebaseapp.com",
  databaseURL: "https://intake-stock-e1612-default-rtdb.firebaseio.com",
  projectId: "intake-stock-e1612",
  storageBucket: "intake-stock-e1612.appspot.com",
  messagingSenderId: "424208456782",
  appId: "1:424208456782:web:776968e8a6914cefd4f71f"
};
const app = initializeApp(config);
const db = getFirestore(app);
export default db;