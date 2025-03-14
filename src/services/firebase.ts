import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getMessaging } from "firebase/messaging"
const firebaseConfig = {
    apiKey: import.meta.env.VITE_APIKEY,
    authDomain: import.meta.env.VITE_AUTHDOMAIN,
    projectId: import.meta.env.VITE_PROJECTID,
    appId: import.meta.env.VITE_APPID,
    storageBucket:import.meta.env.VITE_STORAGE,
    messagingSenderId:import.meta.env.VITE_MESSAGE_SENDER_ID,
  };
  const app = initializeApp(firebaseConfig);
  
  export const auth = getAuth(app);
  export const storage = getStorage(app);
  export const messaging = getMessaging(app);