import React, { Component } from 'react';
import { View, Text } from 'react-native';

import BottomTabNavigator from '../../navigation/BottomTabNavigator'

class DashboardScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <BottomTabNavigator />
        );
    }
}

export default DashboardScreen;
