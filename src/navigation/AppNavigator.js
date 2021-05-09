import React from "react";
import { NavigationContainer } from "@react-navigation/native";
// import StackNavigator from "./StackNavigator";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "../screens/WelcomeScreen";
import HealthCareScreen from "../screens/HealthCareScreen";
import SignInScreen from "../screens/SignInScreen";
import ConnectHealthAccountScreen from "../screens/ConnectHealthAccountScreen";
import DashboardScreen from "../screens/DashboardScreen";
import CallBackScreen from "../screens/CallBackScreen";

const Stack = createStackNavigator();

const linking = {
  prefixes: ["http://localhost:19006"],
  config: {
    screens: {
      callback: "callback",
    },
  },
};

const AppNavigator = () => {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="welcome" headerMode="none">
        <Stack.Screen name="welcome" component={WelcomeScreen} />
        <Stack.Screen name="healthCare" component={HealthCareScreen} />
        {/* <Stack.Screen
          name="connectHealthAccount"
          component={ConnectHealthAccountScreen}
        /> */}
        <Stack.Screen name="dashboard" component={DashboardScreen} />
        <Stack.Screen name="callback" component={CallBackScreen} />
      </Stack.Navigator>{" "}
    </NavigationContainer>
  );
};

export default AppNavigator;
