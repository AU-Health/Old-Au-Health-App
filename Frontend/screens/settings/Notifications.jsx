import React, { useState } from 'react';
import { View, Text, Dimensions, Input, StyleSheet, CheckBox, ScrollView, TouchableOpacity } from 'react-native';
import { Avatar, ListItem, Icon } from 'react-native-elements';

import SettingsBackBtn from '../../components/SettingsBackBtn';

var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;

const Notifications = ({ navigation }) => {
    return (
        <View style={styles.notificationsContainer}>
            <View style={styles.headerContainer}>
                <SettingsBackBtn navigation={navigation}/>
                <View styles={styles.titeContainer}>
                    <Text style={styles.titleText}> Notifications </Text>
                </View>
            </View>

            <View style={styles.body}>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    notificationsContainer: {
        flex: 1,
        alignItems: 'center',
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
});

export default Notifications;
