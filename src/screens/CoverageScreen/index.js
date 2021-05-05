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
      coverage: [],
    };
  }

  componentDidMount() {
    const { client } = this.props.user;

    var that = this;
    client
      .request(
        `/Coverage?subscriber=Patient/${client.patient.id}&_include=Coverage:beneficiary`,
        {
          resolveReferences: ["eobReference"],
          graph: true,
        }
      )
      .then(function (data) {
        if (!data.entry || !data.entry.length) {
          throw new Error("No Benefits found for the selected patient");
        }
        return data.entry;
      })
      .then(
        function (data) {
          that.setState({
            coverage: data
              .filter((item) => item.resource.beneficiary)
              .map((item) => {
                return {
                  ...item,
                  resource: {
                    ...item.resource,
                    beneficiary: item.resource.beneficiary.reference.replace(
                      "Patient/",
                      ""
                    ),
                  },
                };
              }),
            patients: data.filter((item) => !item.resource.beneficiary),
          });
        },
        function (error) {
          console.log(error);
        }
      );
  }

  render() {
    const { coverage, patients } = this.state;
    return (
      <View style={styles.container} nativeID="meds">
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            width: "100%",
          }}
          style={{ width: "100%" }}
        >
          {coverage.map((item) => (
            <View
              style={{
                paddingVertical: 20,
                backgroundColor: "white",
                borderRadius: 10,
                padding: 15,
                marginBottom: 15,
                marginHorizontal: "30%",
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
                  Beneficiary :
                </Text>
                <Text>
                  {patients.find(
                    (ite) => ite.resource.id == item.resource.beneficiary
                  )
                    ? patients.find(
                        (ite) => ite.resource.id == item.resource.beneficiary
                      ).resource.name[0].family
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
                  Period :
                </Text>
                <Text>
                  {item.resource.period.start} - {item.resource.period.end}
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
                  Type :
                </Text>
                <Text>{item.resource.type.text}</Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: 10,
                }}
              >
                <Text style={{ fontWeight: "bold", marginRight: 10 }}>
                  Class :
                </Text>
                <Text>{item.resource.class.map((ite) => ite.name)}</Text>
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
