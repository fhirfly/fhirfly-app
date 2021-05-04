import React from "react";
import { View } from "react-native";
import FHIR from "fhirclient";

export default function CallBackScreen() {
  React.useEffect(() => {
    FHIR.oauth2
      .ready()
      .then((client) => client.request("Patient/" + client.patient.id))
      .then(console.log)
      .catch(console.error);
  }, []);
  return <View></View>;
}
