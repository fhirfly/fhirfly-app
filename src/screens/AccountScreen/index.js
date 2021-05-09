import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { hp, wp } from "../../utils/utility";
import moment from "moment";
import { connect } from "react-redux";

const mapState = (state) => ({
  user: state.auth.user,
});

class AccountScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainBtn: [
        {
          image: require("../../assets/icons/patientDemographics.png"),
          name: "Patient Demographics",
          route: "Patient Demographics",
        },
        {
          image: require("../../assets/icons/coverage.png"),
          name: "Coverage",
          route: "Coverage",
        },
        {
          image: require("../../assets/icons/benefits.png"),
          name: "Benefits",
          route: "Benefits",
        },
        {
          image: require("../../assets/icons/organization.png"),
          name: "Organization",
          route: "Organization",
        },
        {
          image: require("../../assets/icons/practitioners.png"),
          name: "Practitioners",
          route: "Practitioners",
        },
      ],
    };
  }

  render() {
    const { patient } = this.props.user;
    return (
      <View style={styles.container}>
        {/* <Image
          style={{
            width: wp(30),
            height: hp(15),
            resizeMode: "contain",
            marginTop: 50,
          }}
          source={require("../../assets/images/user1.png")}
        /> */}
        <View style={{ flexDirection: "row", paddingTop: hp(1.5) }}>
          <Text style={{ fontSize: 20, fontWeight: "700" }}>
            {patient.name[0].family}{" "}
          </Text>
          <Text>({moment().diff(moment(patient.birthDate), "years")})</Text>
        </View>
        <View style={{ height: hp(4) }} />
        {this.state.mainBtn.map((item, index) => (
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate(item.route)}
            key={index}
            style={styles.mainBtn}
          >
            <View
              style={{
                width: wp(70),
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: wp(5), height: hp(2.5), resizeMode: "contain" }}
                source={item.image}
              />
              <Text style={{ paddingLeft: wp(4) }}>{item.name}</Text>
            </View>
            <Entypo name="chevron-small-right" size={24} color="black" />
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={{
            flexDirection: "row",
            width: wp(30),
            height: hp(7),
            backgroundColor: "#919191",
            borderRadius: 30,
            alignItems: "center",
            paddingLeft: wp(3),
            alignSelf: "flex-start",
            marginLeft: wp(4),
            marginTop: hp(1),
          }}
          onPress={() => {
            sessionStorage.clear();
            this.props.navigation.navigate("welcome");
          }}
        >
          <Image
            style={{ width: wp(4), height: hp(2), resizeMode: "contain" }}
            source={require("../../assets/icons/logout.png")}
          />
          <Text
            style={{
              color: "#fff",
              fontSize: 15,
              fontWeight: "700",
              paddingLeft: wp(2),
            }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default connect(mapState, null)(AccountScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  mainBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: wp(100),
    paddingHorizontal: wp(5),
    backgroundColor: "#ffffff",
    height: hp(7.5),
    marginBottom: hp(1),
  },
});
