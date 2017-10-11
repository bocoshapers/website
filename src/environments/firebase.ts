/**
 * Created by githop on 3/16/17.
 */

const prodApiKey = process.env.FIREBASE_PROD;
const devApiKey = process.env.FIREBASE_DEV;

export const FIREBASE_CONF = {
  apiKey: prodApiKey,
  authDomain: "boco-backend.firebaseapp.com",
  databaseURL: "https://boco-backend.firebaseio.com",
  storageBucket: "boco-backend.appspot.com",
  messagingSenderId: "234737841607"
};

export const FIREBASE_DEV_CONFIG = {
  apiKey: devApiKey,
  authDomain: "dev-boco-backend.firebaseapp.com",
  databaseURL: "https://dev-boco-backend.firebaseio.com",
  projectId: "dev-boco-backend",
  storageBucket: "dev-boco-backend.appspot.com",
  messagingSenderId: "264327484040"
};
