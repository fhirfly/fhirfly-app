import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import HealthCareScreen from '../screens/HealthCareScreen';
import SignInScreen from '../screens/SignInScreen';
import ConnectHealthAccountScreen from '../screens/ConnectHealthAccountScreen';
import DashboardScreen from '../screens/DashboardScreen';

const Stack = createStackNavigator();

const StackNavigator = () => (
    <Stack.Navigator initialRouteName="welcome" headerMode="none" >
        <Stack.Screen name="welcome" component={WelcomeScreen} />
        <Stack.Screen name="healthCare" component={HealthCareScreen} />
        <Stack.Screen name="connectHealthAccount" component={ConnectHealthAccountScreen} />
        <Stack.Screen name="signIn" component={SignInScreen} />
        <Stack.Screen name="dashboard" component={DashboardScreen} />
    </Stack.Navigator>
)

export default StackNavigator;
