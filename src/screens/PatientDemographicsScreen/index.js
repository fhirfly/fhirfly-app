import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import data from "../../utils/patients.json";
import { wp, hp } from "../../utils/utility";

class PatientDemographicsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastname: "",
      memberId: "",
      birthSex: "Male",
      Gender: "Male",
      raceEthnicity: "American",
      months: [
        { label: "January", value: "January" },
        { label: "February", value: "February" },
        { label: "March", value: "March" },
        { label: "April", value: "April" },
        { label: "May", value: "May" },
        { label: "June", value: "June" },
        { label: "July", value: "July" },
        { label: "August", value: "August" },
        { label: "September", value: "September" },
        { label: "October", value: "October" },
        { label: "November", value: "November" },
        { label: "December", value: "December" },
      ],
      DAYS_IN_MONTH: [
        { label: "01", value: "01" },
        { label: "02", value: "02" },
        { label: "03", value: "03" },
        { label: "04", value: "04" },
        { label: "05", value: "05" },
        { label: "06", value: "06" },
        { label: "07", value: "07" },
        { label: "08", value: "08" },
        { label: "09", value: "09" },
        { label: "10", value: "10" },
        { label: "11", value: "11" },
        { label: "12", value: "12" },
        { label: "13", value: "13" },
        { label: "14", value: "14" },
        { label: "15", value: "15" },
        { label: "16", value: "16" },
        { label: "17", value: "17" },
        { label: "18", value: "18" },
        { label: "19", value: "19" },
        { label: "20", value: "20" },
        { label: "21", value: "21" },
        { label: "22", value: "22" },
        { label: "23", value: "23" },
        { label: "24", value: "24" },
        { label: "25", value: "25" },
        { label: "26", value: "26" },
        { label: "27", value: "27" },
        { label: "28", value: "28" },
        { label: "29", value: "29" },
        { label: "30", value: "30" },
        { label: "31", value: "31" },
      ],
      days: [{ label: "01", value: "01" }],
      years: [
        { label: "2001", value: "2001" },
        { label: "2002", value: "2002" },
        { label: "2003", value: "2003" },
        { label: "2004", value: "2004" },
        { label: "2005", value: "2005" },
        { label: "2006", value: "2006" },
        { label: "2007", value: "2007" },
        { label: "2008", value: "2008" },
        { label: "2009", value: "2009" },
        { label: "2010", value: "2010" },
      ],
      dateOfBirth: { month: "January", day: "01", year: "2001" },
      city: "Lafayette",
      state: "Indiana",
      country: "United States of America",
      telecom: "Brightpoint",
    };
  }

  componentDidMount = () => {
    this.selectDaysForCurrentMonth();
  };

  selectMonth = (item, state, key) => {
    // let b = months;
    // b.map(function (x) {
    //     x.selected = true;
    //     return x
    // });
    // b[index]['selected'] = true;
    let a = state;
    a.month = item.value;
    this.setState({ [key]: a });
    this.selectDaysForCurrentMonth();
  };

  selectDay = (item, state, key) => {
    let a = state;
    a.day = item.value;
    this.setState({ [key]: a });
  };

  selectYear = (item, state, key) => {
    let a = state;
    a.year = item.value;
    this.setState({ [key]: a });
  };

  selectDaysForCurrentMonth = () => {
    let thirtyOne = [
      "January",
      "March",
      "May",
      "July",
      "August",
      "October",
      "December",
    ];
    let thirty = ["April", "June", "September", "November"];

    let b = this.state.dateOfBirth;

    let defaultDays = this.state.DAYS_IN_MONTH;

    if (thirtyOne.includes(b.month)) {
      this.setState({ days: defaultDays.slice(0, 31) });
    } else if (thirty.includes(b.month)) {
      this.setState({ days: defaultDays.slice(0, 30) });
    } else {
      this.setState({ days: defaultDays.slice(0, 28) });
    }
  };

  render() {
    const {
      birthSex,
      Gender,
      raceEthnicity,
      city,
      state,
      country,
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
              />
            </View>
          </View>
        </View>
        <View style={styles.singleItemContainer}>
          <Text style={styles.label}>Member ID</Text>
          <View style={styles.inputContainer}>
            <TextInput placeholder="Member ID" />
          </View>
        </View>
        <View style={styles.doubleItemContainer}>
          <View style={{ width: wp(42) }}>
            <Text style={styles.label}>Birth Sex</Text>
            <DropDownPicker
              items={[
                { label: "Male", value: "Male" },
                { label: "Female", value: "Female" },
              ]}
              defaultValue={birthSex}
              containerStyle={{ height: hp(6), width: wp(43) }}
              style={{ backgroundColor: "#fafafa" }}
              itemStyle={{ justifyContent: "flex-start" }}
              dropDownStyle={{ backgroundColor: "#fafafa" }}
              onChangeItem={(item) => this.setState({ birthSex: item.value })}
            />
          </View>
          <View style={{ width: wp(42) }}>
            <Text style={styles.label}>Gender</Text>
            <DropDownPicker
              items={[
                { label: "Male", value: "Male" },
                { label: "Female", value: "Female" },
                { label: "Prefer not to say", value: "Prefer not to say" },
              ]}
              defaultValue={Gender}
              containerStyle={{ height: hp(6), width: wp(43) }}
              style={{ backgroundColor: "#fafafa" }}
              itemStyle={{ justifyContent: "flex-start" }}
              dropDownStyle={{ backgroundColor: "#fafafa" }}
              onChangeItem={(item) => this.setState({ Gender: item.value })}
            />
          </View>
        </View>
        <View style={styles.singleItemContainer}>
          <Text style={styles.label}>Race & Ethnicity</Text>
          <DropDownPicker
            items={[
              { label: "American", value: "American" },
              { label: "Latino", value: "Latino" },
              { label: "Asian", value: "Asian" },
            ]}
            defaultValue={raceEthnicity}
            containerStyle={{ height: hp(6), width: wp(88) }}
            style={{ backgroundColor: "#fafafa" }}
            itemStyle={{ justifyContent: "flex-start" }}
            dropDownStyle={{ backgroundColor: "#fafafa" }}
            onChangeItem={(item) =>
              this.setState({ raceEthnicity: item.value })
            }
          />
        </View>
        <View style={styles.singleItemContainer}>
          <Text style={styles.label}>Date of Birth</Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <DropDownPicker
              items={months}
              defaultValue={dateOfBirth.month}
              containerStyle={{ height: hp(6), width: wp(32) }}
              style={{ backgroundColor: "#fafafa" }}
              itemStyle={{ justifyContent: "flex-start" }}
              dropDownStyle={{ backgroundColor: "#fafafa" }}
              onChangeItem={(item) =>
                this.selectMonth(item, dateOfBirth, "dateOfBirth")
              }
            />
            <DropDownPicker
              items={days}
              defaultValue={dateOfBirth.day}
              containerStyle={{ height: hp(6), width: wp(18) }}
              style={{ backgroundColor: "#fafafa" }}
              itemStyle={{ justifyContent: "flex-start" }}
              dropDownStyle={{ backgroundColor: "#fafafa" }}
              onChangeItem={(item) =>
                this.selectDay(item, dateOfBirth, "dateOfBirth")
              }
            />
            <DropDownPicker
              items={years}
              defaultValue={dateOfBirth.year}
              containerStyle={{ height: hp(6), width: wp(32) }}
              style={{ backgroundColor: "#fafafa" }}
              itemStyle={{ justifyContent: "flex-start" }}
              dropDownStyle={{ backgroundColor: "#fafafa" }}
              onChangeItem={(item) =>
                this.selectYear(item, dateOfBirth, "dateOfBirth")
              }
            />
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
            <TextInput placeholder="Street" />
          </View>
        </View>
        <View style={styles.singleItemContainer}>
          <Text style={styles.label}>City</Text>
          <DropDownPicker
            items={[
              { label: "Lafayette", value: "Lafayette" },
              { label: "Muncie", value: "Muncie" },
              { label: "Noblesville", value: "Noblesville" },
            ]}
            defaultValue={city}
            containerStyle={{ height: hp(6), width: wp(88) }}
            style={{ backgroundColor: "#fafafa" }}
            itemStyle={{ justifyContent: "flex-start" }}
            dropDownStyle={{ backgroundColor: "#fafafa" }}
            onChangeItem={(item) => this.setState({ city: item.value })}
          />
        </View>
        <View style={styles.singleItemContainer}>
          <Text style={styles.label}>State</Text>
          <DropDownPicker
            items={[
              { label: "Indiana", value: "Indiana" },
              { label: "Iowa", value: "Iowa" },
              { label: "Kansas", value: "Kansas" },
            ]}
            defaultValue={state}
            containerStyle={{ height: hp(6), width: wp(88) }}
            style={{ backgroundColor: "#fafafa" }}
            itemStyle={{ justifyContent: "flex-start" }}
            dropDownStyle={{ backgroundColor: "#fafafa" }}
            onChangeItem={(item) => this.setState({ state: item.value })}
          />
        </View>
        <View style={styles.singleItemContainer}>
          <Text style={styles.label}>Country</Text>
          <DropDownPicker
            items={[
              {
                label: "United States of America",
                value: "United States of America",
              },
              { label: "Uruguay", value: "Uruguay" },
              { label: "Uzbakistan", value: "Uzbakistan" },
            ]}
            defaultValue={country}
            containerStyle={{ height: hp(6), width: wp(88) }}
            style={{ backgroundColor: "#fafafa" }}
            itemStyle={{ justifyContent: "flex-start" }}
            dropDownStyle={{ backgroundColor: "#fafafa" }}
            onChangeItem={(item) => this.setState({ country: item.value })}
          />
        </View>
        <View style={{ paddingTop: hp(2), paddingHorizontal: wp(6) }}>
          <View style={styles.border} />
        </View>
        <View style={styles.singleItemContainer}>
          <Text style={styles.label}>Telecom</Text>
          <DropDownPicker
            items={[
              { label: "Brightpoint", value: "Brightpoint" },
              {
                label: "Schurz Communications",
                value: "Schurz Communications",
              },
              { label: "Allied Solutions", value: "Allied Solutions" },
            ]}
            defaultValue={telecom}
            containerStyle={{ height: hp(6), width: wp(88) }}
            style={{ backgroundColor: "#fafafa" }}
            itemStyle={{ justifyContent: "flex-start" }}
            dropDownStyle={{ backgroundColor: "#fafafa" }}
            onChangeItem={(item) => this.setState({ telecom: item.value })}
          />
        </View>
        <View style={styles.singleItemContainer}>
          <Text style={styles.label}>General Practitioner</Text>
          <View style={styles.inputContainer}>
            <TextInput placeholder="General Practitioner" />
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default PatientDemographicsScreen;

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
