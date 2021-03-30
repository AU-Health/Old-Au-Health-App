import React, { useState } from 'react';
import { View, Text, Dimensions, Input, StyleSheet, CheckBox, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Avatar, ListItem, Icon } from 'react-native-elements';

import SettingsBackBtn from '../../components/SettingsBackBtn';

var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;

var h = deviceHeight * 90 / 100;
var w = deviceWidth * 90 / 100;

const Feedback = ({ navigation }) => {
    return (
        <View style={styles.contactContainer}>
            <View style={styles.headerContainer}>
                <SettingsBackBtn navigation={navigation}/>
                <View styles={styles.titeContainer}>
                    <Text style={styles.titleText}> Feedback </Text>
                </View>
            </View>

            <View style={styles.body}>
                <View style={styles.inputContainer}>
                    <View style={styles.floatTextLeft}>
                        <Text style={styles.labelText}> First Name </Text>
                    </View>
                    <View style={styles.inputContainer2}>
                        <TextInput placeholder="First Name" />
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <View style={styles.floatTextLeft}>
                        <Text style={styles.labelText}> Last Name </Text>
                    </View>
                    <View style={styles.inputContainer2}>
                        <TextInput placeholder="Last Name" />
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <View style={styles.floatTextLeft}>
                        <Text style={styles.labelText}> Email </Text>
                    </View>
                    <View style={styles.inputContainer2}>
                        <TextInput placeholder="Email" />
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <View style={styles.floatTextLeft}>
                        <Text style={styles.labelText}> Subject </Text>
                    </View>
                    <View style={styles.inputContainer2}>
                        <TextInput placeholder="Subject" />
                    </View>
                </View>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    contactContainer: {
        flex: 1,
        alignItems: 'center',
        width: w,
        height: h,
        backgroundColor: '#f3f1ef',
        marginTop: 30,
        shadowColor: '#c4c4c4',
        shadowOffset: {
            width: 3,
            height: 2,
        },
        shadowRadius: 4,
        shadowOpacity: 1.0,
        left: 20,
        borderRadius: 10,
    },
    headerContainer: {
        width: w,
        marginTop: 10,
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
        marginTop: 50,
        width: w,
    },
    inputContainer: {
        marginTop: 10,
    },
    inputContainer2: {
        left: 10,
        width: 300,
        height: 30,
        borderRadius: 10,
        backgroundColor: '#DCDCDC',
    },
    labelText: {
        left: 0,
        fontSize: 14,
        fontWeight: 'bold',
    },
    floatTextLeft: {
        left: 10,
    },
});

export default Feedback;
