import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Platform, StyleSheet } from 'react-native';
import { Container, Header, Left, Body, Button } from 'native-base';
import { AntDesign } from '@expo/vector-icons';

import { hp, wp } from '../../utils/utility';

class ConnectHealthAccountScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userAccess: [
                {
                    userImage: require('../../assets/images/user1.png'),
                    name: 'Samuel Smith',
                    age: '28 yrs old.',
                    connected: true
                },
                {
                    userImage: require('../../assets/images/user2.png'),
                    name: 'Jordan Smith',
                    age: '60 yrs old.',
                    connected: false
                },
                {
                    userImage: require('../../assets/images/user3.png'),
                    name: 'Dawn Smith',
                    age: '58 yrs old.',
                    connected: false
                },
            ]
        };
    }

    selectUserAccess = (index) => {
        let a = this.state.userAccess
        a[index]['connected'] = !a[index]['connected']
        this.setState({ userAccess: a })
    }

    render() {
        return (
            <Container>
                <Header style={{ backgroundColor: 'transparent', elevation: 0 }} androidStatusBarColor={'transparent'}>
                    <Left>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <AntDesign name="close" size={28} color="black" />
                        </TouchableOpacity>
                    </Left>
                    <Body></Body>
                </Header>
                <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                    <Image style={styles.TopImageSize} source={require('../../assets/images/connect1.png')} />
                    <Image style={{ width: wp(10), height: hp(5), resizeMode: 'contain', marginHorizontal: wp(2) }} source={require('../../assets/images/connectTo.png')} />
                    <Image style={styles.TopImageSize} source={require('../../assets/images/connect2.png')} />
                </View>
                <View style={{ height: hp(3) }} />
                <Text style={{ textAlign: 'center', fontSize: 24, fontWeight: 'bold' }}>Connect FHIRFLY to your CVS Health Account</Text>
                <View style={{ height: hp(3) }} />
                <Text style={{ textAlign: 'center', fontSize: 16 }}>Allow FHIRFLY to access:</Text>
                <View style={{ height: hp(2) }} />
                <Text style={{ textAlign: 'center', fontSize: 16 }}>Whose record do you want to allow access to?</Text>
                <View style={{ height: hp(3) }} />
                <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                    {
                        this.state.userAccess.map((item, index) => (
                            <TouchableOpacity key={index} onPress={() => this.selectUserAccess(index)} style={{ marginHorizontal: wp(2) }}>
                                <Image style={styles.userAccessImageSize} source={item.userImage} />
                                <Text style={{ fontSize: 15, fontWeight: '700', paddingVertical: hp(0.5) }}>{item.name}</Text>
                                <Text>{item.age}</Text>
                                {
                                    item.connected
                                        ? <Image style={{
                                            position: 'absolute', top: 0, right: 0,
                                            width: wp(7),
                                            height: hp(4)
                                        }} resizeMode="contain" source={require('../../assets/icons/connected.png')} />
                                        : null
                                }
                            </TouchableOpacity>
                        ))
                    }
                </View>
                <View style={{ height: hp(5) }} />
                <Text style={{ textAlign: 'center', fontSize: 16 }}>Select the account you want to allow connection.</Text>
                <View style={{ height: hp(8) }} />
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('signIn')} style={{ justifyContent: 'center', alignItems: 'center', width: wp(80), height: hp(8), backgroundColor: '#f19344', borderRadius: 30 }}>
                        <Text style={{ color: '#fff' }}>Approve</Text>
                    </TouchableOpacity>
                </View>
            </Container>
        );
    }
}

export default ConnectHealthAccountScreen;

const styles = StyleSheet.create({
    TopImageSize: {
        width: wp(24), height: hp(12), resizeMode: 'contain'
    },
    userAccessImageSize: {
        width: wp(28), height: hp(14), resizeMode: 'contain'
    }
})