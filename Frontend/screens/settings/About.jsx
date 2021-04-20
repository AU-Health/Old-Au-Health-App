import React, { useState } from 'react';
import { View, Text, Dimensions, Input, StyleSheet, CheckBox, ScrollView, TouchableOpacity } from 'react-native';
import { Avatar, ListItem, Icon } from 'react-native-elements';

import SettingsBackBtn from '../../components/SettingsBackBtn';
import AboutCard from '../../components/AboutCard';

var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;

const About = ({ navigation }) => {
    return (
        <View style={styles.aboutContainer}>
            <View style={styles.headerContainer}>
                <SettingsBackBtn navigation={navigation}/>
                <View styles={styles.titeContainer}>
                    <Text style={styles.titleText}> About </Text>
                </View>
            </View>

            <ScrollView style={styles.body}>
                <AboutCard desc='short description of the authors / creators or somebody else, idk.'/>
                <AboutCard desc='short description of the authors / creators or somebody else, idk.'/>
                <AboutCard desc='short description of the authors / creators or somebody else, idk.'/>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    aboutContainer: {
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
        right: 150,
    },
    body: {
        marginTop: 50,
    },
});

export default About;
