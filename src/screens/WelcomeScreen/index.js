import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import { hp, wp } from "../../utils/utility";

import FHIR from "fhirclient";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/actions/auth";
import { connect } from "react-redux";

const mapDispatch = (dispatch) => ({
  setUser: (user) => dispatch(setUser(user)),
});

class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    FHIR.oauth2
      .ready()
      .then(async (client) => {
        console.log(client);
        console.log(client.patient.id);

        client.request("Patient/" + client.patient.id).then((patient) => {
          this.props.setUser({ patient, client });
          this.props.navigation.navigate("dashboard");
        });
      })
      .then((data) => {
        console.log(data);
      })
      .catch(console.error);
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={{ width: wp(100), height: hp(100) }}
          resizeMode="cover"
          source={require("../../assets/images/splashBg.png")}
        >
          <View
            style={{
              width: wp(100),
              height: hp(70),
              justifyContent: "center",
              alignItems: "center",
              paddingTop: wp(10),
            }}
          >
            <Image
              style={{ width: wp(40), height: hp(15) }}
              resizeMode="contain"
              source={require("../../assets/images/logo.png")}
            />
            <Text style={{ color: "#fff", fontSize: 40 }}>FHIRFLY</Text>
          </View>
          <View
            style={{
              width: wp(100),
              height: hp(30),
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#fff",
                textAlign: "center",
                lineHeight: 25,
                paddingHorizontal: wp(15),
                paddingBottom: hp(5),
                paddingTop: hp(5),
              }}
            >
            </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("healthCare")}
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: wp(80),
                height: hp(8),
                backgroundColor: "#f19344",
                borderRadius: 30,
              }}
            >
              <Text style={{ color: "#fff" }}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});

export default connect(null, mapDispatch)(WelcomeScreen);
