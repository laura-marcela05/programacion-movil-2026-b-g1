import React, { useEffect, useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
  IonContent, IonText, IonSpinner, IonList, IonItem, IonLabel, IonButton, useIonRouter,
} from '@ionic/react';
import { obtenerComidas } from '../services/comidasApi';
import { agruparPorDia, DiaResumen } from '../utils/resumen';
import MensajeError from '../components/MensajeError';

// "2026-11-14" -> "Sábado, 14 de noviembre". Se usa el mediodía para que la
// zona horaria no corra la fecha un día, y solo se pone en mayúscula la
// primera letra (capitalize pondría también "De").
function tituloDia(dia: string): string {
  const texto = new Date(`${dia}T12:00:00`).toLocaleDateString('es-CO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

const Resumen: React.FC = () => {
  const [dias, setDias] = useState<DiaResumen[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const router = useIonRouter();

  async function cargar() {
    setCargando(true);
    setError('');
    try {
      const comidas = await obtenerComidas();
      setDias(agruparPorDia(comidas, new Date()));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargar();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Resumen semanal</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {error && <MensajeError mensaje={error} onReintentar={cargar} />}

        {cargando ? (
          <IonText>
            <p><IonSpinner name="dots" /> Cargando...</p>
          </IonText>
        ) : (
          !error && (
            <>
              {[...dias].reverse().map((d) => (
                <IonList key={d.dia} inset>
                  <IonItem lines="none">
                    <IonLabel>
                      <h2>{tituloDia(d.dia)}</h2>
                    </IonLabel>
                  </IonItem>
                  {d.comidas.length === 0 ? (
                    <IonItem>
                      <IonLabel color="medium">Sin registros</IonLabel>
                    </IonItem>
                  ) : (
                    d.comidas.map((c) => (
                      <IonItem key={c.id}>
                        <IonLabel>
                          <h3>{c.franja}</h3>
                          <p>{c.descripcion}</p>
                        </IonLabel>
                      </IonItem>
                    ))
                  )}
                </IonList>
              ))}
              <IonButton expand="block" onClick={() => router.push('/home', 'back')}>
                Registrar una comida
              </IonButton>
            </>
          )
        )}
      </IonContent>
    </IonPage>
  );
};

export default Resumen;