import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Animated } from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';

import { hp, wp } from '../../utils/utility';

class BenefitsDetailsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            benefitID: 1,
            // benefitID: props.route.params.benefitID,
            viewSection: true,
            expandSection: true,
            dataFieldSection: [
                {
                    label: 'Data Field Value',
                    value: 'Data Field I',
                    viewSection: false, expandSection: false,
                    sectionHeight: new Animated.Value(hp(10))
                },
                {
                    label: 'Data Field Value',
                    value: 'Data Field II',
                    viewSection: false, expandSection: false,
                    sectionHeight: new Animated.Value(hp(10))
                },
                {
                    label: 'Data Field Value',
                    value: 'Data Field III',
                    viewSection: false, expandSection: false,
                    sectionHeight: new Animated.Value(hp(10))
                },
            ]
        };
    }

    toggleSection = (index, type) => {
        let a = this.state.dataFieldSection;
        a[index][type] = !a[index][type];
        this.setState({ dataFieldSection: a })
    }

    shortHeight = (index, type, _height) => {

        if (type == 'expandSection') {
            let a = this.state.dataFieldSection;
            a[index]['viewSection'] = false;
            this.setState({ dataFieldSection: a })
        }

        this.toggleSection(index, type)
        Animated.timing(this.state.dataFieldSection[index]['sectionHeight'], {
            toValue: _height,
            duration: 150,
            useNativeDriver: false
        }).start();
    };

    longHeight = (index, type, _height) => {

        if (type == 'viewSection') {
            let a = this.state.dataFieldSection;
            a[index]['expandSection'] = true;
            this.setState({ dataFieldSection: a })
        }

        this.toggleSection(index, type)
        Animated.timing(this.state.dataFieldSection[index]['sectionHeight'], {
            toValue: _height,
            duration: 150,
            useNativeDriver: false
        }).start();
    };



    render() {
        const { dataFieldSection } = this.state;
        return (
            <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: hp(5) }}>
                <View style={{ backgroundColor: '#ffffff', paddingBottom: hp(2.5) }}>
                    <View style={styles.section}>
                        <View style={styles.cell}>
                            <Text style={styles.value}>64374</Text>
                            <Text style={styles.label}>ID Number</Text>
                        </View>
                        <View style={styles.cell}>
                            <Text style={styles.value}>$368</Text>
                            <Text style={styles.label}>Payment Amount</Text>
                        </View>
                    </View>
                    <View style={{ marginHorizontal: wp(4), borderBottomWidth: 0.5, borderBottomColor: '#949494', paddingTop: hp(2) }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={[styles.cell, { height: hp(7.5) }]}>
                                <Text style={[styles.value, { fontSize: 17, fontWeight: '700' }]}>Pharmacy</Text>
                                <Text style={styles.label}>Claim Type</Text>
                            </View>
                            <View style={[styles.cell, { height: hp(7.5) }]}>
                                <Text style={[styles.value, { fontSize: 17, fontWeight: '700' }]}>Pills, Tablets, Capsule</Text>
                                <Text style={styles.label}>Claim Description</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={[styles.cell, { height: hp(7.5) }]}>
                                <Text style={[styles.value, { fontSize: 17, fontWeight: '700' }]}>January 24, 2020</Text>
                                <Text style={styles.label}>Start Date</Text>
                            </View>
                            <View style={[styles.cell, { height: hp(7.5) }]}>
                                <Text style={[styles.value, { fontSize: 17, fontWeight: '700' }]}>January 24, 2021</Text>
                                <Text style={styles.label}>End Date</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginHorizontal: wp(4), marginTop: hp(2) }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', height: hp(9), }}>
                            <View style={{ width: wp(48), flexDirection: 'row', alignItems: 'center', height: hp(9), }}>
                                <Image style={{ width: wp(13), height: hp(6.5), resizeMode: 'contain', borderRadius: 15 }} resizeMode='contain' source={require('../../assets/images/user1.png')} />
                                <View style={{ paddingLeft: wp(2) }}>
                                    <Text style={[styles.value, { fontSize: 14, fontWeight: '700' }]}>Bryon Rempel</Text>
                                    <Text style={[styles.label, { fontSize: 12, }]}>Pharmacist</Text>
                                </View>
                            </View>
                            <View style={{ width: wp(48) }}>
                                <Text style={[styles.value, { fontSize: 14, fontWeight: '700' }]}>CVS Pharmacy</Text>
                                <Text style={[styles.label, { fontSize: 12, }]}>Provider</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {
                    dataFieldSection.map((item, index) => (
                        <Animated.View key={index} style={[styles.dataFieldSection, { height: item.sectionHeight }]}>
                            <View>
                                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{item.value}</Text>
                                <Text style={styles.label}>{item.label}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', width: wp(18), height: wp(10), justifyContent: 'space-between' }}>
                                <Feather
                                    style={{ transform: [{ rotateX: '180deg' }] }}
                                    onPress={
                                        item.viewSection
                                            ? () => this.shortHeight(index, 'viewSection', hp(20))
                                            : () => this.longHeight(index, 'viewSection', hp(40))
                                    }
                                    name={item.viewSection ? 'eye' : 'eye-off'}
                                    size={28} color="black"
                                />
                                <AntDesign
                                    onPress={
                                        item.expandSection
                                            ? () => this.shortHeight(index, 'expandSection', hp(10))
                                            : () => this.longHeight(index, 'expandSection', hp(20))
                                    }
                                    name={item.expandSection ? 'minuscircleo' : 'pluscircleo'}
                                    size={28} color="black"
                                />
                            </View>
                        </Animated.View>
                    ))
                }

                {/* <Animated.View style={[styles.dataFieldSection, { height: sectionHeight }]}>
                    <View>
                        <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Data Field Value</Text>
                        <Text style={styles.label}>Data Field I</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', width: wp(18), height: wp(10), justifyContent: 'space-between' }}>
                        <Feather
                            style={{ transform: [{ rotateX: '180deg' }] }}
                            // onPress={() => this.toggleSection(index, 'viewSection')}
                            name={viewSection ? 'eye' : 'eye-off'}
                            size={28}
                            color="black"
                        />
                        <AntDesign
                            onPress={expandSection ? this.longHeight : this.shortHeight}
                            name={expandSection ? 'pluscircleo' : 'minuscircleo'}
                            size={28}
                            color="black"
                        />
                    </View>
                </Animated.View> */}
            </ScrollView>
        );
    }
}

export default BenefitsDetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    section: {
        flexDirection: 'row',
        marginHorizontal: wp(4),
        borderBottomWidth: 0.5,
        borderBottomColor: '#949494',
        paddingTop: hp(2)
    },
    cell: {
        width: wp(48),
        height: hp(9)
    },
    label: {
        fontSize: 13,
        color: '#949494'
    },
    value: {
        fontSize: 26,
        color: '#333333',
    },
    dataFieldSection: {
        backgroundColor: '#ffffff',
        marginTop: hp(2),
        paddingVertical: hp(2),
        paddingHorizontal: wp(4),
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    }
})