import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Animated } from 'react-native';

import { wp } from '../../utils/utility';

class HealthCareScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            iconWidth: new Animated.Value(wp(20))
        };
    }

    shortWidth = () => {
        Animated.timing(this.state.iconWidth, {
            toValue: wp(10),
            duration: 200,
            useNativeDriver: false
        }).start();
    };

    longWidth = () => {
        Animated.timing(this.state.iconWidth, {
            toValue: wp(20),
            duration: 200,
            useNativeDriver: false
        }).start();
    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={{ paddingHorizontal: wp(5), backgroundColor: '#f5f5f5' }}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', lineHeight: 30, paddingBottom: wp(2), color: '#333333' }}>Select your preferred healthcare provider</Text>
                    <Text style={{ color: '#333333', fontSize: 14, fontWeight: '600', paddingBottom: wp(5) }}>Pick your healthcare provider to initiate a connection.</Text>
                    <View style={{ width: wp(90), height: wp(13), borderRadius: 30, backgroundColor: '#e6e6e6', alignItems: 'center', flexDirection: 'row' }}>
                        <Animated.View
                            style={{ width: this.state.iconWidth, alignItems: 'flex-end' }}

                        >
                            <Image source={require('../../assets/icons/search.png')} style={{ tintColor: '#979797', width: wp(6), resizeMode: 'contain' }} />
                        </Animated.View>
                        <TextInput
                            onFocus={this.shortWidth}
                            onBlur={this.longWidth}
                            placeholder={"Search Healthcare Provider"}
                            placeholderTextColor={"#979797"}
                            style={{ fontSize: 15, fontWeight: '700', marginLeft: wp(2), color: '#000' }}
                        />
                    </View>
                </ScrollView>
                <View style={{ width: wp(100), height: wp(30), backgroundColor: '#ffffff', position: 'absolute', bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', width: wp(80), height: wp(15), backgroundColor: '#949494', borderRadius: 30 }}>
                        <Text style={{ color: '#fff' }}>Connect</Text>
                    </TouchableOpacity>
                </View>
            </View >
        );
    }
}

export default HealthCareScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: wp(5),
        // alignItems: 'center',
    },
    iconDefaultStyle: {
        alignItems: 'flex-end'
    }
})