import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Animated,
  Platform,
  ActivityIndicator,
} from "react-native";
import _ from "lodash";
import { wp, hp } from "../../utils/utility";
import axios from "axios";
import FHIR from "fhirclient";

class HealthCareScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iconWidth: new Animated.Value(Platform.OS == "web" ? wp(36) : wp(20)),
      healthProvider: [],
      searchVal: "",
    };
    this.onSearchDelayed = _.debounce(this.onSearch, 2000);
  }

  componentDidMount() {
    axios.get("https://fhir.directory/baseR4/Endpoint?connection-type=hl7-fhir-rest").then((res) => {
      this.setState({ healthProvider: res.data.entry });
    });
  }

  selectHealthCareProvider = (id) => {
    let a = this.state.healthProvider.map((item) => {
      if (item.resource.id == id && !item.selected)
        return { ...item, selected: true };
      else if (item.resource.id == id && item.selected)
        return { ...item, selected: false };
      return { ...item, selected: false };
    });

    this.setState({ healthProvider: a });
  };

  onSearch = (val) => {
    axios
      .get(`https://fhir.directory/baseR4/Endpoint?connection-type=hl7-fhir-rest&name=${val}`)
      .then((res) => {
        this.setState({ healthProvider: res.data.entry });
      });
  };

  connectWithHealthCareProvider = () => {
    const selected = this.state.healthProvider.find((item) => item.selected);
    if (selected) {
      axios
        .get(`${selected.resource.address}/.well-known/smart-configuration`)
        .then((res) => {
          const org = selected;
          const scopes = res.data;
          const allScopes = scopes.scopes_supported.toString();
          const regex = /,/gi;
          try {
            FHIR.oauth2.authorize({
              clientId: "0oap960mo1O8wH7Ab5d6",
              scope: allScopes.replace(regex, " "),
              fhirServiceUrl: org.resource.address,
              audience: org.resource.address,
              completeInTarget: true,
              iss: org.resource.address,
              target: "_self",
              redirect_uri: "https://fhirfly.app/callback",
            });
          } catch (err) {
            console.log(err);
          }
        });
    }
  };

  render() {
    let data = this.state.healthProvider;

    return (
      <View style={styles.container}>
        <ScrollView
          style={{ backgroundColor: "#f5f5f5" }}
          contentContainerStyle={{ paddingBottom: hp(12) }}
        >
          <View
            style={{
              width: wp(100),
              alignItems: "center",
              paddingVertical: hp(2),
            }}
          >
            <Image
              style={{
                width: wp(15),
                height: Platform.OS == "web" ? hp(8) : hp(5),
              }}
              resizeMode="contain"
              source={require("../../assets/images/logo.png")}
            />
          </View>
          <View style={{ paddingHorizontal: wp(5) }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                lineHeight: 30,
                paddingBottom: hp(1.5),
                color: "#333333",
              }}
            >
              Select your preferred healthcare provider
            </Text>
            <Text
              style={{
                color: "#333333",
                fontSize: 14,
                fontWeight: "600",
                paddingBottom: hp(2.5),
              }}
            >
              Pick your healthcare provider to initiate a connection.
            </Text>
            <View
              style={{
                width: wp(90),
                height: hp(6),
                borderRadius: 30,
                backgroundColor: "#e6e6e6",
                alignItems: "center",
                flexDirection: "row",
                paddingHorizontal: 10,
              }}
            >
              <Image
                source={require("../../assets/icons/search.png")}
                style={{
                  tintColor: "#979797",
                  width: Platform.OS == "web" ? wp(4) : wp(6),
                  height: hp(4),
                  resizeMode: "contain",
                }}
              />

              <TextInput
                placeholder={"Search Healthcare Provider"}
                placeholderTextColor={"#979797"}
                style={{
                  fontSize: 15,
                  fontWeight: "700",
                  marginLeft: Platform.OS == "web" ? wp(1) : wp(2),
                  color: "#000",
                  outline: "none",
                }}
                onChangeText={this.onSearchDelayed}
              />
            </View>
          </View>
          <View
            style={{
              alignItems: "center",
              paddingTop: Platform.OS == "web" ? wp(2) : wp(5),
            }}
          >
            {this.state.healthProvider.length == 0 ? (
              <ActivityIndicator size={30} color="black" />
            ) : (
              data.map((item, index) => (
                <View key={index}>
                  <TouchableOpacity
                    onPress={() =>
                      this.selectHealthCareProvider(item.resource.id)
                    }
                    style={{
                      backgroundColor: "#fff",
                      width: wp(100),
                      height: hp(12),
                      flexDirection: "row",
                      alignItems: "center",
                      paddingHorizontal: wp(5),
                    }}
                  >
                    <View
                      style={{
                        width: Platform.OS == "web" ? wp(4) : wp(15),
                        height: hp(8),
                      }}
                    >
                      <Image
                        source={
                          item.resource.image
                            ? { uri: item.resource.image }
                            : require("../../assets/images/logo.png")
                        }
                        style={{ width: "100%", height: "100%" }}
                        resizeMode="contain"
                      />
                      {item.connected ? (
                        <Image
                          style={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            width: Platform.OS == "web" ? wp(1.5) : wp(6),
                            height: hp(3),
                          }}
                          resizeMode="contain"
                          source={require("../../assets/icons/connected.png")}
                        />
                      ) : null}
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: Platform.OS == "web" ? wp(86) : wp(72),
                        paddingLeft: wp(3),
                      }}
                    >
                      <Text
                        style={{ fontSize: 16, textAlignVertical: "center" }}
                      >
                        {item.resource.name}
                      </Text>
                      {item.connected ? (
                        <Text
                          style={{
                            fontSize: 16,
                            textAlignVertical: "center",
                            color: "#707070",
                          }}
                        >
                          Connected
                        </Text>
                      ) : null}
                      {item.selected ? (
                        <Image
                          style={{
                            width: Platform.OS == "web" ? wp(2) : wp(6),
                          }}
                          resizeMode="contain"
                          source={require("../../assets/icons/check-double.png")}
                        />
                      ) : null}
                    </View>
                  </TouchableOpacity>
                  <View style={{ height: hp(1) }} />
                </View>
              ))
            )}
          </View>
        </ScrollView>
        <View
          style={{
            width: wp(100),
            height: hp(15),
            backgroundColor: "#ffffff",
            position: "absolute",
            bottom: 0,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => this.connectWithHealthCareProvider()}
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: wp(80),
              height: hp(8),
              backgroundColor: "#949494",
              borderRadius: 30,
            }}
          >
            <Text style={{ color: "#fff" }}>Connect</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default HealthCareScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: hp(4),
    // alignItems: 'center',
  },
  iconDefaultStyle: {
    alignItems: "flex-end",
  },
});
