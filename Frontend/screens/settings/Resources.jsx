import React, { useState } from 'react';
import { View, Text, Dimensions, Input, StyleSheet, CheckBox, ScrollView, TouchableOpacity } from 'react-native';
import { Avatar, ListItem, Icon } from 'react-native-elements';

import SettingsBackBtn from '../../components/SettingsBackBtn';
import ResourcesCard from '../../components/ResourcesCard';

var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;

const Resources = ({ navigation }) => {
    return (
        <View style={styles.resourcesContainer}>
            <View style={styles.headerContainer}>
                <SettingsBackBtn navigation={navigation}/>
                <View styles={styles.titeContainer}>
                    <Text style={styles.titleText}> Resources </Text>
                </View>
            </View>

            <ScrollView style={styles.body}>
                <ResourcesCard title='Organization 1' number='xxx-xxx-xxxx' email='email@gmail.com' desc='Short description here.'/>
                <ResourcesCard title='Organization 2' number='xxx-xxx-xxxx' email='email@gmail.com' desc='Short description here.'/>
                <ResourcesCard title='Organization 3' number='xxx-xxx-xxxx' email='email@gmail.com' desc='Short description here.'/>
                <ResourcesCard title='Organization 4' number='xxx-xxx-xxxx' email='email@gmail.com' desc='Short description here.'/>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    resourcesContainer: {
        alignItems: 'center',
    },
    headerContainer: {
        marginTop: 30,
        width: deviceWidth,
    },
    titleContainer: {
        marginTop: 5,
    },
    titleText: {
        marginTop: 8,
        position: 'absolute',
        fontSize: 26,
        fontWeight: 'bold',
        right: 120,
    },
    body: {
        marginTop: 60,

    },
});

export default Resources;
