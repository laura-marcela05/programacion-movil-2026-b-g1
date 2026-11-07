import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

export type ResultadoFoto =
  | { tipo: 'ok'; uri: string }
  | { tipo: 'denegado' }
  | { tipo: 'cancelado' }
  | { tipo: 'error'; mensaje: string };

function textoDelError(e: unknown): string {
  if (e instanceof Error) return e.message;
  if (typeof e === 'string') return e;
  if (e && typeof e === 'object' && 'message' in e) {
    return String((e as { message: unknown }).message);
  }
  return '';
}

// Pide el permiso de cámara (si hace falta) y abre la cámara del teléfono.
// Siempre devuelve uno de cuatro resultados, nunca deja escapar un error sin explicar.
export async function tomarFotoDeComida(): Promise<ResultadoFoto> {
  try {
    let permiso = await Camera.checkPermissions();

    if (permiso.camera === 'prompt' || permiso.camera === 'prompt-with-rationale') {
      permiso = await Camera.requestPermissions({ permissions: ['camera'] });
    }

    if (permiso.camera === 'denied') {
      return { tipo: 'denegado' };
    }

    const foto = await Camera.getPhoto({
      quality: 80,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    });

    if (!foto.webPath) {
      return { tipo: 'error', mensaje: 'La cámara no devolvió la foto. Intenta de nuevo.' };
    }

    return { tipo: 'ok', uri: foto.webPath };
  } catch (e) {
    const texto = textoDelError(e).toLowerCase();

    if (texto.includes('denied')) {
      return { tipo: 'denegado' };
    }
    if (texto.includes('cancel')) {
      return { tipo: 'cancelado' };
    }
    return { tipo: 'error', mensaje: 'No se pudo abrir la cámara. Intenta de nuevo.' };
  }
}
