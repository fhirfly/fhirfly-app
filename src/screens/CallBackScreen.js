import React from "react";
import { View } from "react-native";
import FHIR from "fhirclient";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/actions/auth";

export default function CallBackScreen(props) {
  const dispatch = useDispatch();
  React.useEffect(() => {
    FHIR.oauth2
      .ready()
      .then(async (client) => {
        console.log(client);
        // const result = client.patient.read();
        console.log(client);

        client.request("Patient/" + client.patient.id).then((patient) => {
          dispatch(setUser({ patient, client }));
          props.navigation.navigate("dashboard");
        });
      })
      .then((data) => {
        console.log(data);
      })
      .catch(console.error);
  }, []);
  return <View></View>;
}
