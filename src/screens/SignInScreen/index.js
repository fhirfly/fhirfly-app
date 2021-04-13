import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Platform, CheckBox } from 'react-native';
import { Container, Header, Left, Body, Button } from 'native-base';
import { AntDesign } from '@expo/vector-icons';

import { hp, wp } from '../../utils/utility';

class SignInScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSelected: false
        };
    }

    setSelection = (status) => {
        this.setState({ isSelected: status })
    }

    render() {
        const { isSelected } = this.state;
        return (
            <Container>
                <Header style={{ backgroundColor: 'transparent', elevation: 0, height: hp(10) }} androidStatusBarColor={'transparent'}>
                    <Left>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <AntDesign name="arrowleft" size={30} color="black" />
                        </TouchableOpacity>
                    </Left>
                    <Body>
                        <Image source={require('../../assets/images/signInLogo.png')} />
                    </Body>
                </Header>
                <View style={{ height: hp(8) }} />
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ color: '#919191', fontWeight: 'bold', fontSize: 17 }}>Sign In</Text>
                    <View style={{ width: wp(90), justifyContent: 'flex-start' }}>
                        <Text style={{ color: '#919191', fontWeight: 'bold', fontSize: 17, paddingTop: hp(2), paddingBottom: hp(0.5) }}>Username</Text>
                        <TextInput
                            style={{
                                fontSize: 15,
                                fontWeight: '700',
                                color: '#000',
                                borderWidth: 2, borderRadius: 4,
                                borderColor: '#cecece',
                                height: hp(6)
                            }}
                        />
                        <Text style={{ color: '#919191', fontWeight: 'bold', fontSize: 17, paddingTop: hp(1.5), paddingBottom: hp(0.5) }}>Password</Text>
                        <TextInput
                            style={{
                                fontSize: 15,
                                fontWeight: '700',
                                color: '#000',
                                borderWidth: 2, borderRadius: 4,
                                borderColor: '#cecece',
                                height: hp(6)
                            }}
                        />
                    </View>
                    <View style={{ height: hp(4) }} />
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            value={isSelected}
                            onValueChange={this.setSelection}
                            style={styles.checkbox}
                        />
                        <Text style={styles.label}>Remember Me</Text>
                    </View>
                    <View style={{ height: hp(4) }} />
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('dashboard')} style={{ justifyContent: 'center', alignItems: 'center', width: wp(90), height: hp(8), backgroundColor: '#0079bb', borderRadius: 4 }}>
                        <Text style={{ color: '#fff', fontSize: 16, fontWeight: '700' }}>Sign In</Text>
                    </TouchableOpacity>
                    <View style={{ height: hp(4) }} />
                    <View style={{ width: wp(90) }}>
                        <Text style={{ color: '#919191', fontSize: 16 }}>Need help signing in?</Text>
                    </View>
                    <View style={{ height: hp(3) }} />
                    <View style={{ width: wp(90), height: 1, backgroundColor: '#919191' }} />
                    <View style={{ height: hp(3) }} />
                    <View style={{ width: wp(90), flexDirection: 'row' }}>
                        <Text style={{ color: '#919191', fontSize: 16 }}>Don't have an account? </Text>
                        <TouchableOpacity>
                            <Text style={{ color: '#0079bb', fontSize: 16 }}>Sign up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Container>
        );
    }
}

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    checkboxContainer: {
        flexDirection: "row",
        width: wp(90),
        alignItems: 'center',
    },
    checkbox: {
        marginLeft: wp(-2)
    },
    label: {
        margin: 8,
        color: '#919191',
        fontSize: 15
    },
})