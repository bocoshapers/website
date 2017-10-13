/**
 * Created by githop on 3/16/17.
 */


import { FIREBASE_PROD, FIREBASE_DEV } from './firebase.keys';

export const FIREBASE_CONF = {
  apiKey: FIREBASE_PROD,
  authDomain: 'boco-backend.firebaseapp.com',
  databaseURL: 'https://boco-backend.firebaseio.com',
  storageBucket: 'boco-backend.appspot.com',
  messagingSenderId: '234737841607'
};

export const FIREBASE_DEV_CONFIG = {
  apiKey: FIREBASE_DEV,
  authDomain: 'dev-boco-backend.firebaseapp.com',
  databaseURL: 'https://dev-boco-backend.firebaseio.com',
  projectId: 'dev-boco-backend',
  storageBucket: 'dev-boco-backend.appspot.com',
  messagingSenderId: '264327484040'
};
