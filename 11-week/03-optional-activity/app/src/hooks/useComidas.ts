import { useState } from 'react';
import { useIonViewWillEnter } from '@ionic/react';
import { obtenerComidas, Comida } from '../services/comidasApi';

// Carga la lista de comidas y expone los tres estados de la pantalla:
// cargando, error y datos. Se usa en Comidas y en Resumen.
//
// Con tabs, Ionic deja montadas las pestañas que ya visitaste, así que un
// useEffect no se volvería a ejecutar al regresar a ellas. useIonViewWillEnter
// sí corre cada vez que la pantalla se va a mostrar, y así una comida recién
// registrada aparece sin tener que recargar.
export function useComidas() {
  const [comidas, setComidas] = useState<Comida[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  async function cargar() {
    setCargando(true);
    setError('');
    try {
      setComidas(await obtenerComidas());
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setCargando(false);
    }
  }

  useIonViewWillEnter(() => {
    cargar();
  });

  return { comidas, cargando, error, cargar };
}
