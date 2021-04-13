import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { Container, Header, Left, Body, Button, Title, Right, Subtitle } from 'native-base';
import { Entypo, AntDesign } from '@expo/vector-icons';
import RBSheet from "react-native-raw-bottom-sheet";
import DropDownPicker from 'react-native-dropdown-picker';

import { hp, wp } from '../../utils/utility';
// , icon: () => <Image source={require('../../assets/icons/check-double.png')} />
class BenefitsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            benifits: [
                {
                    id: 1,
                    image: require('../../assets/images/connect1.png'),
                    name: 'Pharmacy', dateFrom: 'January 24, 2020', dateTo: 'January 24, 2021'
                },
                {
                    id: 2,
                    image: require('../../assets/images/connect1.png'),
                    name: 'Outpatient', dateFrom: 'January 24, 2020', dateTo: 'January 24, 2021'
                },
                {
                    id: 3,
                    image: require('../../assets/images/connect1.png'),
                    name: 'Skin Diseases', dateFrom: 'January 24, 2020', dateTo: 'January 24, 2021'
                },
                {
                    id: 4,
                    image: require('../../assets/images/connect1.png'),
                    name: 'Mental Health', dateFrom: 'January 24, 2020', dateTo: 'January 24, 2021'
                },
                {
                    id: 5,
                    image: require('../../assets/images/connect1.png'),
                    name: 'Eye And Vision Care', dateFrom: 'January 24, 2020', dateTo: 'January 24, 2021'
                },
                {
                    id: 6,
                    image: require('../../assets/images/connect1.png'),
                    name: 'Nerves, Spine & Brain', dateFrom: 'January 24, 2020', dateTo: 'January 24, 2021'
                },
                {
                    id: 7,
                    image: require('../../assets/images/connect1.png'),
                    name: 'General Surgery', dateFrom: 'January 24, 2020', dateTo: 'January 24, 2021'
                },
                {
                    id: 8,
                    image: require('../../assets/images/connect1.png'),
                    name: 'Birth & Child Treatment', dateFrom: 'January 24, 2020', dateTo: 'January 24, 2021'
                },
                {
                    id: 9,
                    image: require('../../assets/images/connect1.png'),
                    name: 'Infectious Diseases', dateFrom: 'January 24, 2020', dateTo: 'January 24, 2021'
                }
            ],
            months: [
                { label: 'January', value: 'January' },
                { label: 'February', value: 'February' },
                { label: 'March', value: 'March' },
                { label: 'April', value: 'April' },
                { label: 'May', value: 'May' },
                { label: 'June', value: 'June' },
                { label: 'July', value: 'July' },
                { label: 'August', value: 'August' },
                { label: 'September', value: 'September' },
                { label: 'October', value: 'October' },
                { label: 'November', value: 'November' },
                { label: 'December', value: 'December' },
            ],
            DAYS_IN_MONTH: [
                { label: '01', value: '01' }, { label: '02', value: '02' }, { label: '03', value: '03' },
                { label: '04', value: '04' }, { label: '05', value: '05' }, { label: '06', value: '06' },
                { label: '07', value: '07' }, { label: '08', value: '08' }, { label: '09', value: '09' },
                { label: '10', value: '10' }, { label: '11', value: '11' }, { label: '12', value: '12' },
                { label: '13', value: '13' }, { label: '14', value: '14' }, { label: '15', value: '15' },
                { label: '16', value: '16' }, { label: '17', value: '17' }, { label: '18', value: '18' },
                { label: '19', value: '19' }, { label: '20', value: '20' }, { label: '21', value: '21' },
                { label: '22', value: '22' }, { label: '23', value: '23' }, { label: '24', value: '24' },
                { label: '25', value: '25' }, { label: '26', value: '26' }, { label: '27', value: '27' },
                { label: '28', value: '28' }, { label: '29', value: '29' }, { label: '30', value: '30' },
                { label: '31', value: '31' }
            ],
            StartDays: [{ label: '01', value: '01' }],
            EndDays: [{ label: '01', value: '01' }],
            years: [
                { label: '2001', value: '2001' }, { label: '2002', value: '2002' },
                { label: '2003', value: '2003' }, { label: '2004', value: '2004' },
                { label: '2005', value: '2005' }, { label: '2006', value: '2006' },
                { label: '2007', value: '2007' }, { label: '2008', value: '2008' },
                { label: '2009', value: '2009' }, { label: '2010', value: '2010' },
            ],

            billingStartPeriod: { month: 'January', day: '01', year: '2001' },
            billingEndPeriod: { month: 'January', day: '01', year: '2001' },

            provider: [
                { label: 'All Provider', value: 'All Provider' },
                { label: 'CVS Health', value: 'CVS Health' },
                { label: 'Mckesson', value: 'Mckesson' },
            ],
            defaultProvider: 'All Provider'
        };
    }

    componentDidMount = () => {
        this.selectDaysForCurrentMonth()
    }

    selectMonth = (item, state, key) => {
        // let b = months;
        // b.map(function (x) {
        //     x.selected = true;
        //     return x
        // });
        // b[index]['selected'] = true;
        let a = state;
        a.month = item.value;
        this.setState({ [key]: a })
        this.selectDaysForCurrentMonth()
    }

    selectDay = (item, state, key) => {
        let a = state;
        a.day = item.value;
        this.setState({ [key]: a })
    }

    selectYear = (item, state, key) => {
        let a = state;
        a.year = item.value;
        this.setState({ [key]: a })
    }

    selectDaysForCurrentMonth = () => {
        let thirtyOne = ['January', 'March', 'May', 'July', 'August', 'October', 'December'];
        let thirty = ['April', 'June', 'September', 'November'];

        let a = this.state.billingStartPeriod;
        let b = this.state.billingEndPeriod;

        let defaultDays = this.state.DAYS_IN_MONTH;

        if (thirtyOne.includes(a.month)) {
            this.setState({ StartDays: defaultDays.slice(0, 31) });
        }
        else if (thirty.includes(a.month)) {
            this.setState({ StartDays: defaultDays.slice(0, 30) });
        }
        else {
            this.setState({ StartDays: defaultDays.slice(0, 28) });
        }

        if (thirtyOne.includes(b.month)) {
            this.setState({ EndDays: defaultDays.slice(0, 31) });
        }
        else if (thirty.includes(b.month)) {
            this.setState({ EndDays: defaultDays.slice(0, 30) });
        }
        else {
            this.setState({ EndDays: defaultDays.slice(0, 28) });
        }
    }


    render() {
        const { billingStartPeriod, billingEndPeriod, months, StartDays, EndDays, years, provider, defaultProvider } = this.state;
        return (
            <Container>
                <Header style={{ backgroundColor: 'transparent', elevation: 0 }} androidStatusBarColor={'transparent'}>
                    <Left style={{ flex: 1 }}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <AntDesign name="arrowleft" size={30} color="black" />
                        </TouchableOpacity>
                    </Left>
                    <Body style={{ alignItems: 'center', flex: 1 }}>
                        <Title style={{ color: '#000' }}>Benifits</Title>
                    </Body>
                    <Right style={{ flex: 1 }}>
                        <TouchableOpacity onPress={() => this.RBSheet.open()} style={{}}>
                            <Image source={require('../../assets/icons/filter-tool.png')} />
                        </TouchableOpacity>
                    </Right>
                </Header>
                <View style={styles.container}>
                    <View style={{ paddingHorizontal: wp(5), }}>
                        <View style={{ width: wp(90), height: hp(6), borderRadius: 30, backgroundColor: '#e6e6e6', alignItems: 'center', flexDirection: 'row' }}>
                            <View style={{ width: wp(10), alignItems: 'flex-end' }}>
                                <Image source={require('../../assets/icons/search.png')} style={{ tintColor: '#979797', width: wp(6), height: hp(4), resizeMode: 'contain' }} />
                            </View>
                            <TextInput
                                placeholder={"Search Benifits "}
                                placeholderTextColor={"#979797"}
                                style={{ fontSize: 15, fontWeight: '700', marginLeft: Platform.OS == 'web' ? wp(1) : wp(2), color: '#000' }}
                            />
                        </View>
                    </View>
                    <View style={{ height: hp(2) }} />
                    <ScrollView style={{ backgroundColor: '#f5f5f5' }}>
                        {
                            this.state.benifits.map((item, index) => (
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Benefits Details', { benefitID: item.id })} key={index} style={styles.mainBtn}>
                                    <View style={{ width: wp(70), flexDirection: 'row', alignItems: 'center' }}>
                                        <Image resizeMode="contain" style={{ width: wp(14), height: hp(7) }} source={item.image} />
                                        <View style={{ height: hp(7) }}>
                                            <Text style={{ paddingLeft: wp(2.5), fontSize: 20, fontWeight: 'bold' }}>{item.name}</Text>
                                            <Text style={{ paddingLeft: wp(2.5), fontSize: 12, color: '#949494' }}>{item.dateFrom + ' - ' + item.dateTo}</Text>
                                        </View>
                                    </View>
                                    <Entypo name="chevron-small-right" size={24} color="black" />
                                </TouchableOpacity>
                            ))
                        }
                    </ScrollView>
                    <RBSheet
                        ref={ref => { this.RBSheet = ref; }}
                        height={350}
                        closeOnDragDown={true}
                        customStyles={{
                            container: { borderTopLeftRadius: 20, borderTopRightRadius: 20 },
                            draggableIcon: { backgroundColor: "#333333" }
                        }}
                    >
                        <View style={{ paddingHorizontal: wp(3), width: wp(100), justifyContent: 'space-between' }}>
                            <Text>Start Bill Period</Text>
                            <View style={{ flexDirection: 'row', paddingTop: hp(1) }}>
                                <DropDownPicker
                                    items={months}
                                    defaultValue={billingStartPeriod.month}
                                    containerStyle={{ height: 40, width: wp(34) }}
                                    style={{ backgroundColor: '#fafafa' }}
                                    itemStyle={{ justifyContent: 'flex-start' }}
                                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                                    onChangeItem={(item) => this.selectMonth(item, billingStartPeriod, 'billingStartPeriod')}
                                />
                                <DropDownPicker
                                    items={StartDays}
                                    defaultValue={billingStartPeriod.day}
                                    containerStyle={{ height: 40, width: wp(20), marginLeft: wp(3) }}
                                    style={{ backgroundColor: '#fafafa' }}
                                    itemStyle={{ justifyContent: 'flex-start' }}
                                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                                    onChangeItem={(item) => this.selectDay(item, billingStartPeriod, 'billingStartPeriod')}
                                />
                                <DropDownPicker
                                    items={years}
                                    defaultValue={billingStartPeriod.year}
                                    containerStyle={{ height: 40, width: wp(34), marginLeft: wp(3) }}
                                    style={{ backgroundColor: '#fafafa' }}
                                    itemStyle={{ justifyContent: 'flex-start' }}
                                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                                    onChangeItem={(item) => this.selectYear(item, billingStartPeriod, 'billingStartPeriod')}
                                />
                            </View>
                        </View>
                        <View style={{ paddingHorizontal: wp(3), width: wp(100), justifyContent: 'space-between', paddingTop: hp(1) }}>
                            <Text>End Bill Period</Text>
                            <View style={{ flexDirection: 'row', paddingTop: hp(1) }}>
                                <DropDownPicker
                                    items={months}
                                    defaultValue={billingEndPeriod.month}
                                    containerStyle={{ height: 40, width: wp(34) }}
                                    style={{ backgroundColor: '#fafafa' }}
                                    itemStyle={{ justifyContent: 'flex-start' }}
                                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                                    onChangeItem={(item) => this.selectMonth(item, billingEndPeriod, 'billingEndPeriod')}
                                />
                                <DropDownPicker
                                    items={EndDays}
                                    defaultValue={billingEndPeriod.day}
                                    containerStyle={{ height: 40, width: wp(20), marginLeft: wp(3) }}
                                    style={{ backgroundColor: '#fafafa' }}
                                    itemStyle={{ justifyContent: 'flex-start' }}
                                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                                    onChangeItem={(item) => this.selectDay(item, billingEndPeriod, 'billingEndPeriod')}
                                />
                                <DropDownPicker
                                    items={years}
                                    defaultValue={billingEndPeriod.year}
                                    containerStyle={{ height: 40, width: wp(34), marginLeft: wp(3) }}
                                    style={{ backgroundColor: '#fafafa' }}
                                    itemStyle={{ justifyContent: 'flex-start' }}
                                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                                    onChangeItem={(item) => this.selectYear(item, billingEndPeriod, 'billingEndPeriod')}
                                />
                            </View>
                        </View>
                        <View style={{ paddingHorizontal: wp(3), width: wp(100), justifyContent: 'space-between', paddingTop: hp(1) }}>
                            <Text>End Bill Period</Text>
                            <View style={{ flexDirection: 'row', paddingTop: hp(1) }}>
                                <DropDownPicker
                                    items={provider}
                                    defaultValue={defaultProvider}
                                    containerStyle={{ height: 40, width: wp(97) }}
                                    style={{ backgroundColor: '#fafafa' }}
                                    itemStyle={{ justifyContent: 'flex-start' }}
                                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                                    onChangeItem={(item) => {
                                        this.setState({ defaultProvider: item.value })
                                    }}
                                />
                            </View>
                        </View>
                        <View style={{ paddingHorizontal: wp(3), width: wp(100), alignItems: 'center', paddingTop: hp(4) }}>
                            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', width: wp(80), height: hp(8), backgroundColor: '#f19344', borderRadius: 30 }}>
                                <Text style={{ color: '#fff' }}>Apply Filter</Text>
                            </TouchableOpacity>
                        </View>
                    </RBSheet>
                </View>
            </Container>
        );
    }
}

export default BenefitsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
    },
    mainBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: wp(100),
        paddingHorizontal: wp(5),
        backgroundColor: '#ffffff',
        height: hp(10),
        marginBottom: hp(1)
    }
})