import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import data from "../../utils/patients.json";
import { wp, hp } from "../../utils/utility";
import { connect } from "react-redux";
import moment from "moment";

const mapState = (state) => ({
  user: state.auth.user,
});

class PatientDemographicsScreen extends Component {
  constructor(props) {
    super(props);

    console.log(this.props);
    const {
      name,
      identifier,
      gender,
      extension,
      birthDate,
      address,
      telecom,
    } = this.props.user.patient;
    const membId = identifier.find((item) =>
      item.type.coding.find((ite) => ite.code == "MR")
    );
    const birthSex = extension.find((item) =>
      item.url.includes("us-core-birthsex")
    );
    const race = extension.find((item) => item.url.includes("us-core-race"));
    const ethnicity = extension.find((item) =>
      item.url.includes("us-core-ethnicity")
    );

    this.state = {
      firstName: name[0].given[0],
      lastName: name[0].family,
      memberId: membId ? membId.value : "",
      birthSex: birthSex ? birthSex.valueCode : "",
      gender: gender,
      race: race
        ? race.extension.find((item) => item.valueString).valueString
        : "",
      ethnicity: ethnicity
        ? ethnicity.extension.find((item) => item.valueString).valueString
        : "",
      birthDate: birthDate,
      address: address && address.length > 0 ? address[0] : {},
      telecom: telecom && telecom.length > 0 ? telecom[0] : { value: "" },
    };
  }

  render() {
    const {
      birthSex,
      gender,
      race,
      ethnicity,
      birthDate,
      address,
      telecom,
    } = this.state;
    const { dateOfBirth, months, days, years } = this.state;
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: hp(10) }}
      >
        <View style={styles.doubleItemContainer}>
          <View style={{ width: wp(42) }}>
            <Text style={styles.label}>First name</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="First name"
                value={this.state.firstName}
                onChangeText={(val) => this.setState({ firstName: val })}
                readOnly={true}
              />
            </View>
          </View>
          <View style={{ width: wp(42) }}>
            <Text style={styles.label}>Last name</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Last name"
                value={this.state.lastName}
                onChangeText={(val) => this.setState({ lastName: val })}
                readOnly={true}
              />
            </View>
          </View>
        </View>
        <View style={styles.singleItemContainer}>
          <Text style={styles.label}>Member ID</Text>
          <View style={[styles.inputContainer]}>
            <TextInput
              placeholder="Member ID"
              value={this.state.memberId}
              onChangeText={(val) => this.setState({ memberId: val })}
              style={{ width: "100%" }}
              readOnly={true}
            />
          </View>
        </View>
        <View style={styles.doubleItemContainer}>
          <View style={{ width: wp(42), zIndex: 5 }}>
            <Text style={styles.label}>Birth Sex</Text>
            <View style={[styles.inputContainer]}>
              <TextInput
                placeholder="Birth Sec"
                value={birthSex}
                onChangeText={(val) => this.setState({ birthSex: val })}
                style={{ width: "100%" }}
                readOnly={true}
              />
            </View>
          </View>
          <View style={{ width: wp(42) }}>
            <Text style={styles.label}>Gender</Text>
            <View style={[styles.inputContainer]}>
              <TextInput
                placeholder="Gender"
                value={gender}
                onChangeText={(val) => this.setState({ gender: val })}
                style={{ width: "100%" }}
                readOnly={true}
              />
            </View>
          </View>
        </View>
        <View style={styles.doubleItemContainer}>
          <View style={{ width: wp(42) }}>
            <Text style={styles.label}>Race</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="race"
                value={race}
                onChangeText={(val) => this.setState({ race: val })}
                readOnly={true}
              />
            </View>
          </View>
          <View style={{ width: wp(42) }}>
            <Text style={styles.label}>Ethnicity</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="ethnicity"
                value={ethnicity}
                onChangeText={(val) => this.setState({ ethnicity: val })}
                readOnly={true}
              />
            </View>
          </View>
        </View>
        <View style={styles.singleItemContainer}>
          <Text style={styles.label}>Date of Birth</Text>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <View
              style={[styles.inputContainer, { flex: 1, marginHorizontal: 5 }]}
            >
              <TextInput
                placeholder="Month"
                value={moment(birthDate).format("MM")}
                readOnly={true}
              />
            </View>
            <View
              style={[styles.inputContainer, { flex: 1, marginHorizontal: 5 }]}
            >
              <TextInput
                placeholder="Day"
                value={moment(birthDate).format("DD")}
                readOnly={true}
              />
            </View>
            <View
              style={[styles.inputContainer, { flex: 1, marginHorizontal: 5 }]}
            >
              <TextInput
                placeholder="Year"
                value={moment(birthDate).format("YYYY")}
                readOnly={true}
              />
            </View>
          </View>
        </View>
        <View style={{ paddingTop: hp(2), paddingHorizontal: wp(6) }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#949494" }}>
            Home Address
          </Text>
          <View style={styles.border} />
        </View>
        <View style={styles.singleItemContainer}>
          <Text style={styles.label}>Street</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Street"
              value={address.line}
              readOnly={true}
            />
          </View>
        </View>
        <View style={styles.singleItemContainer}>
          <Text style={styles.label}>City</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Street"
              value={address.city}
              readOnly={true}
            />
          </View>
        </View>
        <View style={styles.singleItemContainer}>
          <Text style={styles.label}>State</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Street"
              value={address.state}
              readOnly={true}
            />
          </View>
        </View>
        <View style={styles.singleItemContainer}>
          <Text style={styles.label}>Country</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Street"
              value={address.country}
              readOnly={true}
            />
          </View>
        </View>
        <View style={{ paddingTop: hp(2), paddingHorizontal: wp(6) }}>
          <View style={styles.border} />
        </View>
        <View style={styles.singleItemContainer}>
          <Text style={styles.label}>Telecom</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Street"
              value={telecom.value}
              readOnly={true}
            />
          </View>
        </View>
        <View style={styles.singleItemContainer}>
          <Text style={styles.label}>General Practitioner</Text>
          <View style={styles.inputContainer}>
            <TextInput placeholder="General Practitioner" readOnly={true} />
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default connect(mapState, null)(PatientDemographicsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#949494",
    paddingBottom: hp(1),
  },
  inputContainer: {
    backgroundColor: "#fff",
    height: hp(5),
    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: wp(2),
  },
  singleItemContainer: {
    paddingHorizontal: wp(6),
    width: wp(100),
    paddingTop: hp(2),
  },
  doubleItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: wp(100),
    paddingTop: hp(2),
    paddingHorizontal: wp(6),
  },
  border: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#949494",
    paddingTop: hp(1.5),
  },
});
