import React, { useState } from 'react';
import { View, Text, Dimensions, Input, StyleSheet, CheckBox, ScrollView, TouchableOpacity } from 'react-native';
import { Avatar, ListItem, Icon } from 'react-native-elements';
import { Switch } from 'react-native-switch';

import SettingsBackBtn from '../../components/SettingsBackBtn';

var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;

var h = deviceHeight * 5 / 100;
var w = deviceWidth * 80 / 100;

const Notifications = ({ navigation }) => {

    const [switchValue, setSwitchValue] = useState(false);

    const toggleSwitch = (value) => {
        setSwitchValue(value);
    };

    return (
        <View style={styles.notificationsContainer}>
            <View style={styles.headerContainer}>
                <SettingsBackBtn navigation={navigation}/>
                <View styles={styles.titeContainer}>
                    <Text style={styles.titleText}> Notifications </Text>
                </View>
            </View>

            <View style={styles.body}>
                <View style={styles.firstSettingContainer}>
                    <View styles={styles.firstSettingText}>
                        <Text> Allow Notifications </Text>
                    </View>
                    <View style={styles.switchContainer}>
                        <Switch onValueChange={toggleSwitch}
                            value={switchValue}
                            activeText={''}
                            inActiveText={''}
                            circleSize={20}
                            barHeight={1}
                            backgroundActive={'#23cba7'}
                            backInActive={'#23cba7'}
                            circleActiveColor={'#23cba7'}
                            circleInActiveColor={'#2e3131'}
                            changeValueImmediately={true}
                            circleBorderWidth={0}
                            style={styles.switchbtn}/>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    notificationsContainer: {
        flex: 1,
        alignItems: 'center',
        //zIndex: 0,
    },
    headerContainer: {
        width: deviceWidth,
        marginTop: 30,
    },
    titleContainer: {
        marginTop: 5,
    },
    titleText: {
        marginTop: 8,
        position: 'absolute',
        fontSize: 26,
        fontWeight: 'bold',
        right: 100,
    },
    body: {
    },
    switchContainer: {
        position: 'absolute',
        right: 10,
        marginTop: 50,
    },
    switchbtn: {
        alignSelf: "center",
    },
    firstSettingContainer: {
        backgroundColor: '#f3f1ef',
        marginTop: 80,
        width: w,
        height: h,
        //alignItems: "center",
        justifyContent: "center",
        borderLeftWidth: 4,
        borderColor: '#2e3131',
        borderRadius: 4,
        //borderTopWidth: 1,
        //borderBottomWidth: 1,
        //borderRightWidth: 1,
        shadowColor: '#c4c4c4',
        shadowOffset: {
            width: 3,
            height: 2,
        },
        shadowRadius: 4,
        shadowOpacity: 1.0,
    },
    firstSettingText: {
        fontSize: 18,
    },
});

export default Notifications;
