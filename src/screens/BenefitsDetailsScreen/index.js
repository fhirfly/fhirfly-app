import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Animated,
  TouchableOpacity,
} from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";

import { hp, wp } from "../../utils/utility";
import { connect } from "react-redux";

const mapState = (state) => ({
  activeBenefit: state.auth.activeBenefit,
});

class BenefitsDetailsScreen extends Component {
  constructor(props) {
    super(props);
    const {
      dateFrom,
      dateTo,
      payee,
      outcome,
      supportingInfo,
      diagnosisAll,
      procedure,
      item,
      adjudication,
      paymentOrig,
      total,
    } = this.props.activeBenefit;

    paymentOrig;

    let tempPayment = [
      { name: "Date : ", value: paymentOrig.date },
      { name: "Status : ", value: paymentOrig.type.coding[0].display },
    ];

    let tempTotals = total.map((item) => {
      return {
        name: `${item.category.coding[0].display} : `,
        value: `$${item.amount.value}`,
      };
    });
    var tempAdjudication = [];
    if (adjudication)
      tempAdjudication = adjudication.map((item) => {
        return {
          name: `${item.category.coding[0].display} : `,
          value: `$${item.amount.value}`,
        };
      });

    let diagnosis = diagnosisAll.map((item) => {
      return {
        value: item.diagnosisCodeableConcept.coding[0].display,
        name: `${item.type[0].coding[0].display} : `,
      };
    });

    var procedures = [];
    if (procedure)
      procedures = procedure.map((item) => {
        return {
          value: item.procedureCodeableConcept.coding[0].display,
          name: `${item.type[0].coding[0].display} : `,
        };
      });
    // valueString, valueQuantity
    let tempSupportingInfo = supportingInfo.map((item) => {
      if (item.timingDate)
        return { name: "Timing Date : ", value: item.timingDate };
      else {
        if (item.category.coding[0].display)
          return {
            name: `${item.category.coding[0].display} : `,
            value: item.timingPeriod
              ? item.timingPeriod.start
              : item.valueString
              ? item.valueString
              : item.valueQuantity
              ? item.valueQuantity.value
              : "",
          };
        else return "";
      }
    });

    let billableItems = item.map((ite) => {
      let tempArr = [];
      console.log(ite);
      if (ite.revenue)
        tempArr.push({
          name: "Revenue : ",
          value: ite.revenue.coding[0].display,
        });
      if (ite.productOrService)
        tempArr.push({
          name: "Product or Service : ",
          value: ite.productOrService.coding[0].display,
        });
      if (ite.servicedPeriod)
        tempArr.push({
          name: "Service Period : ",
          value: `${ite.servicedPeriod.start} - ${ite.servicedPeriod.end}`,
        });
      if (ite.locationCodeableConcept)
        tempArr.push({
          name: "Location Type : ",
          value: ite.locationCodeableConcept.coding[0].display,
        });

      if (ite.quantity && ite.quantity.value > 0)
        tempArr.push({
          name: "Quantity : ",
          value: ite.quantity.value,
        });

      return tempArr;
    });
    billableItems = [].concat.apply([], billableItems);

    this.state = {
      benefitID: 1,
      // benefitID: props.route.params.benefitID,
      viewSection: true,
      expandSection: true,
      showId: false,
      dataFieldSection: [
        {
          label: `${dateFrom} - ${dateTo}`,
          value: "Billable Period",
          viewSection: false,
          expandSection: false,
          sectionHeight: new Animated.Value(hp(10)),
        },
        {
          label: `${payee.type.coding[0].display}`,
          value: `${payee.party.display}`,
          viewSection: false,
          expandSection: false,
          sectionHeight: new Animated.Value(hp(10)),
        },
        {
          label: `${outcome}`,
          value: "Outcome",
          viewSection: false,
          expandSection: false,
          sectionHeight: new Animated.Value(hp(10)),
        },
        {
          label: ``,
          value: "Supporting Info",
          description: tempSupportingInfo,
          viewSection: false,
          expandSection: false,
          sectionHeight: "auto",
        },
        {
          label: ``,
          value: "Diagnosis",
          description: diagnosis,
          viewSection: false,
          expandSection: false,
          sectionHeight: "auto",
        },
        {
          label: ``,
          value: "Procedures",
          description: procedures,
          viewSection: false,
          expandSection: false,
          sectionHeight: "auto",
        },
        {
          label: ``,
          value: "Billable Item",
          description: billableItems,
          viewSection: false,
          expandSection: false,
          sectionHeight: "auto",
        },
        {
          label: ``,
          value: "Adjudication",
          description: tempAdjudication,
          viewSection: false,
          expandSection: false,
          sectionHeight: "auto",
        },
        {
          label: ``,
          value: "Payment",
          description: tempPayment,
          viewSection: false,
          expandSection: false,
          sectionHeight: "auto",
        },
        {
          label: ``,
          value: "Totals",
          description: tempTotals,
          viewSection: false,
          expandSection: false,
          sectionHeight: "auto",
        },
      ],
    };
  }

  toggleSection = (index, type) => {
    let a = this.state.dataFieldSection;
    a[index][type] = !a[index][type];
    this.setState({ dataFieldSection: a });
  };

  shortHeight = (index, type, _height) => {
    if (type == "expandSection") {
      let a = this.state.dataFieldSection;
      a[index]["viewSection"] = false;
      this.setState({ dataFieldSection: a });
    }

    this.toggleSection(index, type);
    Animated.timing(this.state.dataFieldSection[index]["sectionHeight"], {
      toValue: _height,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  longHeight = (index, type, _height) => {
    if (type == "viewSection") {
      let a = this.state.dataFieldSection;
      a[index]["expandSection"] = true;
      this.setState({ dataFieldSection: a });
    }

    this.toggleSection(index, type);
    Animated.timing(this.state.dataFieldSection[index]["sectionHeight"], {
      toValue: _height,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  render() {
    const { dataFieldSection, showId } = this.state;
    const { idNumber, payment, name, dateFrom, dateTo, provider, diagnosis } =
      this.props.activeBenefit;
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: hp(5) }}
      >
        <View style={{ backgroundColor: "#ffffff", paddingBottom: hp(2.5) }}>
          <View style={styles.section}>
            <View style={styles.cell}>
              <TouchableOpacity
                onPress={() => this.setState({ showId: !showId })}
              >
                <Text style={[styles.value, { fontSize: 12 }]}>
                  {showId ? idNumber : idNumber.substr(0, 10)}
                </Text>
              </TouchableOpacity>
              <Text style={styles.label}>ID Number</Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.value}>{payment}</Text>
              <Text style={styles.label}>Payment Amount</Text>
            </View>
          </View>
          <View
            style={{
              marginHorizontal: wp(4),
              borderBottomWidth: 0.5,
              borderBottomColor: "#949494",
              paddingTop: hp(2),
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <View style={[styles.cell, { height: hp(7.5) }]}>
                <Text
                  style={[styles.value, { fontSize: 17, fontWeight: "700" }]}
                >
                  {name}
                </Text>
                <Text style={styles.label}>Claim Type</Text>
              </View>
              <View style={[styles.cell, { height: hp(7.5) }]}>
                <Text
                  style={[styles.value, { fontSize: 13, fontWeight: "700" }]}
                >
                  {diagnosis}
                </Text>
                <Text style={styles.label}>Principal Diagnosis</Text>
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={[styles.cell, { height: hp(7.5) }]}>
                <Text
                  style={[styles.value, { fontSize: 17, fontWeight: "700" }]}
                >
                  {dateFrom}
                </Text>
                <Text style={styles.label}>Start Date</Text>
              </View>
              <View style={[styles.cell, { height: hp(7.5) }]}>
                <Text
                  style={[styles.value, { fontSize: 17, fontWeight: "700" }]}
                >
                  {dateTo}
                </Text>
                <Text style={styles.label}>End Date</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: wp(4),
              marginTop: hp(2),
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                height: hp(9),
              }}
            >
              {/* <View
                style={{
                  width: wp(48),
                  flexDirection: "row",
                  alignItems: "center",
                  height: hp(9),
                }}
              >
                <Image
                  style={{
                    width: wp(13),
                    height: hp(6.5),
                    resizeMode: "contain",
                    borderRadius: 15,
                  }}
                  resizeMode="contain"
                  source={require("../../assets/images/user1.png")}
                />
                <View style={{ paddingLeft: wp(2) }}>
                  <Text
                    style={[styles.value, { fontSize: 14, fontWeight: "700" }]}
                  >
                    Bryon Rempel
                  </Text>
                  <Text style={[styles.label, { fontSize: 12 }]}>
                    Pharmacist
                  </Text>
                </View>
              </View> */}
              <View style={{ width: wp(48) }}>
                <Text
                  style={[styles.value, { fontSize: 14, fontWeight: "700" }]}
                >
                  {provider.display}
                </Text>
                <Text style={[styles.label, { fontSize: 12 }]}>Provider</Text>
              </View>
            </View>
          </View>
        </View>

        {dataFieldSection.map((item, index) => (
          <Animated.View
            key={index}
            style={[
              styles.dataFieldSection,
              { height: item.sectionHeight, flexDirection: "column" },
            ]}
          >
            <View>
              <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                {item.value}
              </Text>
              <Text style={styles.label}>{item.label}</Text>
            </View>
            {item.description ? (
              <View style={{ marginTop: 15 }}>
                {item.description.map((desc) => (
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <Text style={{ fontWeight: "bold" }}>{desc.name}</Text>
                    <Text>{desc.value}</Text>
                  </View>
                ))}
              </View>
            ) : (
              <View></View>
            )}
          </Animated.View>
        ))}
      </ScrollView>
    );
  }
}

export default connect(mapState, null)(BenefitsDetailsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    flexDirection: "row",
    marginHorizontal: wp(4),
    borderBottomWidth: 0.5,
    borderBottomColor: "#949494",
    paddingTop: hp(2),
  },
  cell: {
    width: wp(48),
    height: hp(9),
  },
  label: {
    fontSize: 13,
    color: "#949494",
  },
  value: {
    fontSize: 26,
    color: "#333333",
  },
  dataFieldSection: {
    backgroundColor: "#ffffff",
    marginTop: hp(2),
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
});
