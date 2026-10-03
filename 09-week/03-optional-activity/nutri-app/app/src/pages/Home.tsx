import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonText,
} from "@ionic/react";
import { obtenerComidas, crearComida } from "../services/comidasApi";

const Home: React.FC = () => {
  // Lista que viene de la API
  const [comidas, setComidas] = useState<any[]>([]);
  // Campos del formulario de registro
  const [franja, setFranja] = useState("Desayuno");
  const [descripcion, setDescripcion] = useState("");
  // Contador de comidas registradas en esta sesión (no viene de la API)
  const [registradas, setRegistradas] = useState(0);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  async function cargar() {
    try {
      setCargando(true);
      const datos = await obtenerComidas();
      setComidas(datos);
      setError("");
    } catch (e) {
      setError("No se pudo conectar con el servidor");
    } finally {
      setCargando(false);
    }
  }

  // Se pide la lista una sola vez, cuando la pantalla se abre
  useEffect(() => {
    cargar();
  }, []);

  async function registrar() {
    if (!descripcion.trim()) return;

    try {
      await crearComida(franja, descripcion);
      setDescripcion("");
      setRegistradas(registradas + 1);
      cargar(); // vuelve a pedir la lista completa, ya actualizada
    } catch (e) {
      setError("No se pudo registrar la comida");
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>NutriTrack</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonSelect
            value={franja}
            onIonChange={(e) => setFranja(e.detail.value)}
          >
            <IonSelectOption value="Desayuno">Desayuno</IonSelectOption>
            <IonSelectOption value="Almuerzo">Almuerzo</IonSelectOption>
            <IonSelectOption value="Cena">Cena</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonInput
            placeholder="¿Qué comiste?"
            value={descripcion}
            onIonInput={(e) => setDescripcion(e.detail.value || "")}
          />
        </IonItem>
        <IonButton expand="block" onClick={registrar}>
          Registrar comida
        </IonButton>

        <IonText>
          <p>Comidas registradas en esta sesión: {registradas}</p>
        </IonText>

        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}

        {cargando ? (
          <IonText>
            <p>Cargando...</p>
          </IonText>
        ) : (
          <IonList>
            {comidas.map((c) => (
              <IonItem key={c.id} routerLink={`/detalle/${c.id}`} detail>
                <IonLabel>
                  <h3>
                    {c.franja} — {c.descripcion}
                  </h3>
                  <p>{new Date(c.fecha).toLocaleString()}</p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;
