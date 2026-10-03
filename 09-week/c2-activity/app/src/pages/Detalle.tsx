import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonContent,
  IonText,
} from "@ionic/react";
import { obtenerComida } from "../services/comidasApi";

const Detalle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [comida, setComida] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    obtenerComida(id as string)
      .then(setComida)
      .catch(() => setError("No se pudo conectar con el servidor"));
  }, [id]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Detalle de comida</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}

        {comida && (
          <IonText>
            <h2>{comida.franja}</h2>
            <p>{comida.descripcion}</p>
            <p>{new Date(comida.fecha).toLocaleString()}</p>
          </IonText>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Detalle;
