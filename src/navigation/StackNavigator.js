import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import HealthCareScreen from '../screens/HealthCareScreen';

const Stack = createStackNavigator();

export default StactNavigator = () => (
    <Stack.Navigator headerMode="none" >
        <Stack.Screen name="welcome" component={WelcomeScreen} />
        <Stack.Screen name="healthCare" component={HealthCareScreen} />
    </Stack.Navigator>
)
