import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import AccountScreen from "../screens/AccountScreen";
import PatientDemographicsScreen from "../screens/PatientDemographicsScreen";
import CoverageScreen from "../screens/CoverageScreen";
import BenefitsScreen from "../screens/BenefitsScreen";
import OrganizationScreen from "../screens/OrganizationScreen";
import PractitionersScreen from "../screens/PractitionersScreen";
import BenefitsDetailsScreen from "../screens/BenefitsDetailsScreen";

import { hp, wp } from "../utils/utility";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => (
  <Tab.Navigator
    tabBarOptions={{
      style: { height: hp(10) },
      tabStyle: { paddingBottom: hp(1) },
      labelStyle: { color: "#707070", fontSize: 15 },
    }}
    initialRouteName="myAccount"
  >
    {/* <Tab.Screen
      name="Home"
      options={{
        tabBarIcon: ({ focused, color, size }) => (
          <Image
            style={{
              tintColor: focused ? "#F19344" : "#707070",
              width: wp(7),
              height: hp(3.5),
              resizeMode: "contain",
            }}
            source={require("../assets/icons/home.png")}
          />
        ),
      }}
      component={HomeScreen}
    /> */}
    <Tab.Screen
      name="myAccount"
      options={{
        title: "My Account",
        tabBarIcon: ({ focused, color, size }) => (
          <Image
            style={{
              tintColor: focused ? "#F19344" : "#707070",
              width: wp(7),
              height: hp(3.5),
              resizeMode: "contain",
            }}
            source={require("../assets/icons/account.png")}
          />
        ),
      }}
      component={AccountStack}
    />
  </Tab.Navigator>
);

const screenOptionStyle = {
  headerTitleAlign: "center",
  headerStyle: {
    backgroundColor: "transparent",
    elevation: 0,
  },
};

const Stack = createStackNavigator();

const AccountStack = () => (
  <Stack.Navigator
    initialRouteName="My Account"
    screenOptions={screenOptionStyle}
    headerMode="screen"
  >
    <Stack.Screen
      name="My Account"
      options={{ headerLeft: null }}
      component={AccountScreen}
    />
    <Stack.Screen
      name="Patient Demographics"
      component={PatientDemographicsScreen}
    />
    <Stack.Screen name="Coverage" component={CoverageScreen} />
    <Stack.Screen
      name="Benefits"
      options={{ headerShown: false }}
      component={BenefitsScreen}
    />
    <Stack.Screen name="Benefits Details" component={BenefitsDetailsScreen} />
    <Stack.Screen name="Organization" component={OrganizationScreen} />
    <Stack.Screen name="Practitioners" component={PractitionersScreen} />
  </Stack.Navigator>
);

export default BottomTabNavigator;
