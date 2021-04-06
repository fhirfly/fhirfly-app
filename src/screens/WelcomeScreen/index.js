import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { hp, wp } from '../../utils/utility'

class WelcomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ height: hp(70), width: wp(100), justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#fff', fontSize: 40 }}>FHIRFLY</Text>
                </View>
                <View style={{ height: hp(30), width: wp(100), flexDirection: 'column', alignItems: 'center' }}>
                    <Text style={{ color: '#fff', textAlign: 'center', lineHeight: 25, paddingHorizontal: wp(15), paddingBottom: wp(10), paddingTop: wp(5) }}>Best of the Breed FHIR Technology to meet CMS Patient Access Mandates</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('healthCare')} style={{ justifyContent: 'center', alignItems: 'center', width: wp(80), height: wp(15), backgroundColor: '#f19344', borderRadius: 30 }}>
                        <Text style={{ color: '#fff' }}>Get Started</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#000000',
    }
})