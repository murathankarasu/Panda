import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Config kontrolü - sadece kritik olanları kontrol et
const criticalKeys = ['apiKey', 'authDomain', 'projectId', 'appId'];
const missingKeys = criticalKeys.filter(key => !firebaseConfig[key as keyof typeof firebaseConfig]);

if (missingKeys.length > 0) {
  console.error("Eksik Firebase Config Değerleri:", missingKeys);
  console.warn(".env dosyasının proje ana dizininde olduğundan ve sunucuyu yeniden başlattığınızdan emin olun.");
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Analytics'i sadece tarayıcı destekliyorsa ve config tamsa başlat
let analytics = null;
isSupported().then(yes => {
  if (yes && !missingKeys.length) {
    analytics = getAnalytics(app);
  }
}).catch(err => console.log("Analytics not supported:", err));

export const db = getFirestore(app);
export const auth = getAuth(app);
export { app, analytics };
