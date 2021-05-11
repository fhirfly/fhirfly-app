import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { connect } from "react-redux";

const mapState = (state) => ({
  user: state.auth.user,
});
class CoverageScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orgs: [],
    };
  }

  componentDidMount() {
    const { client } = this.props.user;

    var that = this;
    client
      .request(`/Practitioner`, {
        resolveReferences: ["practitionerReference"],
        graph: true,
      })
      .then(function (data) {
        if (!data.entry || !data.entry.length) {
          throw new Error("No Practitioners found for the selected patient");
        }
        return data.entry;
      })
      .then(
        function (data) {
          console.log(data);
          that.setState({
            orgs: data,
          });
        },
        function (error) {
          console.log(error);
        }
      );
  }

  render() {
    const { orgs } = this.state;
    return (
      <View style={styles.container} nativeID="meds">
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            width: "100%",
          }}
          style={{ width: "100%" }}
        >
          {orgs.map((item) => (
            <View
              style={{
                paddingVertical: 20,
                backgroundColor: "white",
                borderRadius: 10,
                padding: 15,
                marginBottom: 15,
                marginHorizontal: "15%",
                width: "70%",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: 10,
                }}
              >
                <Text style={{ fontWeight: "bold", marginRight: 10 }}>
                  Name :
                </Text>
                <Text>
                  {item.resource.name ? item.resource.name[0].given : ""}
                </Text>
                <Text> </Text>
                <Text>
                  {item.resource.name ? item.resource.name[0].family : ""}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: 10,
                }}
              >
                <Text style={{ fontWeight: "bold", marginRight: 10 }}>
                  Telephone :
                </Text>
                <Text>
                  {item.resource.telecom
                    ? item.resource.telecom.find((ite) => ite.system == "phone")
                      ? item.resource.telecom.find(
                          (ite) => ite.system == "phone"
                        ).value
                      : ""
                    : ""}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: 10,
                }}
              >
                <Text style={{ fontWeight: "bold", marginRight: 10 }}>
                  Address
                </Text>
                <Text>
                  {item.resource.address ? item.resource.address[0].text : ""}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: 10,
                }}
              >
                <Text style={{ fontWeight: "bold", marginRight: 10 }}>
                  Identifier :
                </Text>
                <Text>
                  {item.resource.identifier
                    ? item.resource.identifier.find((ite) =>
                        ite.type
                          ? ite.type.coding.find((itee) => itee.code == "npi")
                          : false
                      )
                      ? item.resource.identifier.find((ite) =>
                          ite.type
                            ? ite.type.coding.find((itee) => itee.code == "npi")
                            : false
                        ).value
                      : ""
                    : ""}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}

export default connect(mapState, null)(CoverageScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
  },
});
