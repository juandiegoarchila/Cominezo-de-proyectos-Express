//src/config/config.js
import {
  initializeApp,
  cert,
  applicationDefault,
  getApps,
} from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { config } from 'dotenv';
import fs from 'fs';

config();

let firebaseConfig = {};

if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  // Verifica que el archivo de credenciales exista
  if (!fs.existsSync(process.env.GOOGLE_APPLICATION_CREDENTIALS)) {
    console.error(
      `❌ El archivo ${process.env.GOOGLE_APPLICATION_CREDENTIALS} no existe.`
    );
    process.exit(1);
  }
  try {
    const serviceAccount = JSON.parse(
      fs.readFileSync(process.env.GOOGLE_APPLICATION_CREDENTIALS, 'utf8')
    );
    firebaseConfig = { credential: cert(serviceAccount) };
  } catch (error) {
    console.error('❌ Error al leer GOOGLE_APPLICATION_CREDENTIALS:', error);
    process.exit(1);
  }
} else {
  firebaseConfig = { credential: applicationDefault() };
}

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
  console.log('✅ Firebase conectado correctamente');
}

const db = getFirestore();
export { db };
