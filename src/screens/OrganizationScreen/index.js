import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class OrganizationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Text> Organization Screen </Text>
            </View>
        );
    }
}

export default OrganizationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})