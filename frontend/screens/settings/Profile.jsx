import React, { useState } from 'react';
import { View, Text, Dimensions, Input, StyleSheet, CheckBox, ScrollView } from 'react-native';
import { Avatar, ListItem, Icon } from 'react-native-elements';

import SettingsBackBtn from '../../components/SettingsBackBtn';
import ProfileTrackers from '../../components/ProfileTrackers';

var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;

const Profile = ({ navigation }) => {
    return (
        <ScrollView>
            <View style={styles.profileContainer}>
                <SettingsBackBtn navigation={navigation}/>
                <Avatar
                    size="xlarge"
                    rounded
                    icon={{name: 'user', type: 'font-awesome'}}
                    onPress={() => console.log("Works!")}
                    activeOpacity={0.7}
                    containerStyle={{flex: 2, }} />
                <Text style={styles.userNametext}> Username </Text>
            </View>
            <View style={styles.trackerContainer}>
                <ProfileTrackers title='Social Health' color1='#ffd5e5' color2='#f0f0d6' info='test info'></ProfileTrackers>
                <ProfileTrackers title='Emotional Health' color1='#ffffdd' color2='#d5b8ff' info='test info'></ProfileTrackers>
                <ProfileTrackers title='Sleep' color1='#c3aed6' color2='#4b77be' info='test info'></ProfileTrackers>
                <ProfileTrackers title='Physical Activity' color1='#cd5d7d' color2='#f27935' info='test info'></ProfileTrackers>
                <ProfileTrackers title='Hydration' color1='#81f5ff' color2='#e4f1fe' info='test info'></ProfileTrackers>
                <ProfileTrackers title='Fruits & Veggies' color1='#a0ffe6' color2='#7befb2' info='test info'></ProfileTrackers>
                <ProfileTrackers title='Occupational Health' color1='#f9d89c' color2='#ffffcc' info='test info'></ProfileTrackers>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    profileContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    userNametext: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 24,
    },
    trackerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Profile;
