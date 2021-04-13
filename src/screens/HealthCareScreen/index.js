import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Animated, Platform } from 'react-native';

import { wp, hp } from '../../utils/utility';

class HealthCareScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            iconWidth: new Animated.Value(Platform.OS == 'web' ? wp(36) : wp(20)),
            healthProvider: [
                {
                    hpImage: require('../../assets/images/healthProvider/hp1.png'),
                    name: 'United Health Group', selected: false, connected: true
                },
                {
                    hpImage: require('../../assets/images/healthProvider/hp2.png'),
                    name: 'Mckesson', selected: true, connected: false
                },
                {
                    hpImage: require('../../assets/images/healthProvider/hp3.png'),
                    name: 'Amerisourcebergen', selected: false, connected: false
                },
                {
                    hpImage: require('../../assets/images/healthProvider/hp4.png'),
                    name: 'CVS Health', selected: false, connected: false
                },
                {
                    hpImage: require('../../assets/images/healthProvider/hp5.png'),
                    name: 'Cigna', selected: false, connected: false
                },
                {
                    hpImage: require('../../assets/images/healthProvider/hp6.png'),
                    name: 'Cardinal Health', selected: false, connected: false
                },
                {
                    hpImage: require('../../assets/images/healthProvider/hp7.png'),
                    name: 'Walgreens Boots Alliance', selected: false, connected: false
                },
                {
                    hpImage: require('../../assets/images/healthProvider/hp8.png'),
                    name: 'Anthem', selected: false, connected: false
                },
                {
                    hpImage: require('../../assets/images/healthProvider/hp9.png'),
                    name: 'Johnson & Johnson', selected: false, connected: false
                },
                {
                    hpImage: require('../../assets/images/healthProvider/hp10.png'),
                    name: 'Centene', selected: false, connected: false
                },

            ]
        };
    }

    shortWidth = () => {
        Animated.timing(this.state.iconWidth, {
            toValue: Platform.OS == 'web' ? wp(3) : wp(10),
            duration: 150,
            useNativeDriver: false
        }).start();
    };

    longWidth = () => {
        Animated.timing(this.state.iconWidth, {
            toValue: Platform.OS == 'web' ? wp(36) : wp(20),
            duration: 150,
            useNativeDriver: false
        }).start();
    };

    selectHealthCareProvider = (index) => {
        let a = this.state.healthProvider
        if (a[index]['connected'] == false)
            a[index]['selected'] = !a[index]['selected']
        this.setState({ healthProvider: a })
    }

    connectWithHealthCareProvider = () => {
        let a = this.state.healthProvider
        for (let index = 0; index < a.length; index++) {
            if (a[index]['selected'] == true) {
                a[index]['connected'] = !a[index]['connected'];
                a[index]['selected'] = false
            }
        }
        this.setState({ healthProvider: a });
        this.props.navigation.navigate('connectHealthAccount')
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={{ backgroundColor: '#f5f5f5' }} contentContainerStyle={{ paddingBottom: hp(12) }}>
                    <View style={{ width: wp(100), alignItems: 'center', paddingVertical: hp(2) }}>
                        <Image style={{ width: wp(15), height: Platform.OS == 'web' ? hp(8) : hp(5) }} resizeMode="contain" source={require('../../assets/images/logo.png')} />
                    </View>
                    <View style={{ paddingHorizontal: wp(5), }}>
                        <Text style={{ fontSize: 22, fontWeight: 'bold', lineHeight: 30, paddingBottom: hp(1.5), color: '#333333' }}>Select your preferred healthcare provider</Text>
                        <Text style={{ color: '#333333', fontSize: 14, fontWeight: '600', paddingBottom: hp(2.5) }}>Pick your healthcare provider to initiate a connection.</Text>
                        <View style={{ width: wp(90), height: hp(6), borderRadius: 30, backgroundColor: '#e6e6e6', alignItems: 'center', flexDirection: 'row' }}>
                            <Animated.View style={{ width: this.state.iconWidth, alignItems: 'flex-end' }}>
                                <Image source={require('../../assets/icons/search.png')} style={{ tintColor: '#979797', width: Platform.OS == 'web' ? wp(2) : wp(6), height: hp(4), resizeMode: 'contain' }} />
                            </Animated.View>
                            <TextInput
                                onFocus={this.shortWidth}
                                onBlur={this.longWidth}
                                placeholder={"Search Healthcare Provider"}
                                placeholderTextColor={"#979797"}
                                style={{ fontSize: 15, fontWeight: '700', marginLeft: Platform.OS == 'web' ? wp(1) : wp(2), color: '#000' }}
                            />
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', paddingTop: Platform.OS == 'web' ? wp(2) : wp(5), }}>
                        {
                            this.state.healthProvider.map((item, index) => (
                                <View key={index}>
                                    <TouchableOpacity onPress={() => this.selectHealthCareProvider(index)} style={{ backgroundColor: '#fff', width: wp(100), height: hp(12), flexDirection: 'row', alignItems: 'center', paddingHorizontal: wp(5) }}>
                                        <View style={{ width: Platform.OS == 'web' ? wp(4) : wp(15), height: hp(8) }}>
                                            <Image source={item.hpImage} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
                                            {
                                                item.connected
                                                    ? <Image style={{
                                                        position: 'absolute', top: 0, right: 0,
                                                        width: Platform.OS == 'web' ? wp(1.5) : wp(6),
                                                        height: hp(3)
                                                    }} resizeMode="contain" source={require('../../assets/icons/connected.png')} />
                                                    : null
                                            }
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: Platform.OS == 'web' ? wp(86) : wp(72), paddingLeft: wp(3) }}>
                                            <Text style={{ fontSize: 16, textAlignVertical: 'center' }}>{item.name}</Text>
                                            {
                                                item.connected
                                                    ? <Text style={{ fontSize: 16, textAlignVertical: 'center', color: '#707070' }}>Connected</Text>
                                                    : null
                                            }
                                            {
                                                item.selected
                                                    ? <Image style={{ width: Platform.OS == 'web' ? wp(2) : wp(6) }} resizeMode="contain" source={require('../../assets/icons/check-double.png')} />
                                                    : null
                                            }
                                        </View>
                                    </TouchableOpacity>
                                    <View style={{ height: hp(1) }} />
                                </View>
                            ))
                        }
                    </View>
                </ScrollView>
                <View style={{ width: wp(100), height: hp(15), backgroundColor: '#ffffff', position: 'absolute', bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => this.connectWithHealthCareProvider()} style={{ justifyContent: 'center', alignItems: 'center', width: wp(80), height: hp(8), backgroundColor: '#949494', borderRadius: 30 }}>
                        <Text style={{ color: '#fff' }}>Connect</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default HealthCareScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: hp(4),
        // alignItems: 'center',
    },
    iconDefaultStyle: {
        alignItems: 'flex-end'
    }
})