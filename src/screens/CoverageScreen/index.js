import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class CoverageScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Text> Coverage Screen </Text>
            </View>
        );
    }
}

export default CoverageScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})