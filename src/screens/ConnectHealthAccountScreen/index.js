import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
} from "react-native";
import { Container, Header, Left, Body, Button } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { hp, wp } from "../../utils/utility";
import FHIR from "fhirclient";

class ConnectHealthAccountScreen extends Component {
  constructor(props) {
    super(props);
  }

  selectUserAccess = (index) => {
    let a = this.state.userAccess;
    a[index]["connected"] = !a[index]["connected"];
    this.setState({ userAccess: a });
  };

  onApprove = () => {
    const { org, scopes } = this.props.route.params;
    const allScopes = scopes.scopes_supported.toString();
    const regex = /,/gi;
    try {
      FHIR.oauth2.authorize({
        client_id: "0oabfidz5F3Ho3w8G5d6",
        scope: allScopes.replace(regex, " "),
        fhirServiceUrl: org.resource.address,
        completeInTarget: true,
        iss: org.resource.address,
        target: "_self",
        redirect_uri: "http://localhost:19006/dashboard",
        client_secret: "TppBdLtYVlBEsepxpN20fM8KUde4l26007NQoia7",
      });
    } catch (err) {
      console.log(err);
    }

    // this.props.navigation.navigate("signIn");
  };

  render() {
    const { org, scope } = this.props.route.params;
    return (
      <Container>
        <Header
          style={{ backgroundColor: "transparent", elevation: 0 }}
          androidStatusBarColor={"transparent"}
        >
          <Left>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <AntDesign name="close" size={28} color="black" />
            </TouchableOpacity>
          </Left>
          <Body></Body>
        </Header>
        <View
          style={{
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            style={styles.TopImageSize}
            source={require("../../assets/images/connect1.png")}
          />
          <Image
            style={{
              width: wp(10),
              height: hp(5),
              resizeMode: "contain",
              marginHorizontal: wp(2),
            }}
            source={require("../../assets/images/connectTo.png")}
          />
          <Image
            style={styles.TopImageSize}
            source={require("../../assets/images/connect2.png")}
          />
        </View>
        <View style={{ height: hp(3) }} />
        <Text style={{ textAlign: "center", fontSize: 24, fontWeight: "bold" }}>
          Connect FHIRFLY to your {org.resource.name}
        </Text>
        <View style={{ height: hp(3) }} />
        <Text style={{ textAlign: "center", fontSize: 16 }}>
          Allow FHIRFLY to access:
        </Text>
        <View style={{ height: hp(2) }} />

        <Text style={{ textAlign: "center", fontSize: 16 }}>
          Select the account you want to allow connection.
        </Text>
        <View style={{ height: hp(8) }} />
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => this.onApprove()}
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: wp(80),
              height: hp(8),
              backgroundColor: "#f19344",
              borderRadius: 30,
            }}
          >
            <Text style={{ color: "#fff" }}>Approve</Text>
          </TouchableOpacity>
        </View>
      </Container>
    );
  }
}

export default ConnectHealthAccountScreen;

const styles = StyleSheet.create({
  TopImageSize: {
    width: wp(24),
    height: hp(12),
    resizeMode: "contain",
  },
  userAccessImageSize: {
    width: wp(28),
    height: hp(14),
    resizeMode: "contain",
  },
});
