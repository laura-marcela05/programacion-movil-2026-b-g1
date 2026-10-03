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
  IonSpinner,
  IonToast,
} from "@ionic/react";
import { obtenerComidas, crearComida } from "../services/comidasApi";

const Home: React.FC = () => {
  const [comidas, setComidas] = useState<any[]>([]);
  const [franja, setFranja] = useState("Desayuno");
  const [descripcion, setDescripcion] = useState("");
  const [registradas, setRegistradas] = useState(0);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");
  const [mostrarToast, setMostrarToast] = useState(false);

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

  useEffect(() => {
    cargar();
  }, []);

  async function registrar() {
    if (!descripcion.trim()) {
      setError("Escribe una descripción antes de registrar");
      return;
    }

    try {
      setGuardando(true);
      await crearComida(franja, descripcion);
      setDescripcion("");
      setRegistradas(registradas + 1);
      setError("");
      setMostrarToast(true);
      await cargar();
    } catch (e) {
      setError("No se pudo registrar la comida");
    } finally {
      setGuardando(false);
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

        <IonButton expand="block" onClick={registrar} disabled={guardando}>
          {guardando ? <IonSpinner name="dots" /> : "Registrar comida"}
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
        ) : comidas.length === 0 ? (
          <IonText color="medium">
            <p>Aún no hay comidas registradas.</p>
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

        <IonToast
          isOpen={mostrarToast}
          message="Comida registrada correctamente"
          duration={2000}
          onDidDismiss={() => setMostrarToast(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;
