import { SecureStorage } from '@aparajita/capacitor-secure-storage';

const CLAVE_TOKEN = 'nutritrack_token';

// El token es una llave temporal de la cuenta: va en el almacenamiento seguro
// (Android Keystore / iOS Keychain), nunca en localStorage ni en preferencias normales.
// En el navegador el plugin usa localStorage sin cifrar: solo para desarrollo.
export function guardarToken(token: string): Promise<void> {
  return SecureStorage.setItem(CLAVE_TOKEN, token);
}

export async function leerToken(): Promise<string | null> {
  const valor = await SecureStorage.getItem(CLAVE_TOKEN);
  return typeof valor === 'string' ? valor : null;
}

export async function borrarToken(): Promise<void> {
  await SecureStorage.removeItem(CLAVE_TOKEN);
}
