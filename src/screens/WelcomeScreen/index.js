import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';

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
                <ImageBackground style={{ width: wp(100), height: hp(100) }} resizeMode="cover" source={require('../../assets/images/splashBg.png')}>
                    <View style={{ width: wp(100), height: hp(70), justifyContent: 'center', alignItems: 'center', paddingTop: wp(10) }}>
                        <Image style={{ width: wp(40), height: hp(15) }} resizeMode="contain" source={require('../../assets/images/logo.png')} />
                        <Text style={{ color: '#fff', fontSize: 40 }}>FHIRFLY</Text>
                    </View>
                    <View style={{ width: wp(100), height: hp(30), flexDirection: 'column', alignItems: 'center' }}>
                        <Text style={{ color: '#fff', textAlign: 'center', lineHeight: 25, paddingHorizontal: wp(15), paddingBottom: hp(5), paddingTop: hp(5) }}>Best of the Breed FHIR Technology to meet CMS Patient Access Mandates</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('healthCare')} style={{ justifyContent: 'center', alignItems: 'center', width: wp(80), height: hp(8), backgroundColor: '#f19344', borderRadius: 30 }}>
                            <Text style={{ color: '#fff' }}>Get Started</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    }
})