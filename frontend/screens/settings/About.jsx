import React, { useState } from 'react';
import { View, Text, Dimensions, Input, StyleSheet, CheckBox, ScrollView, TouchableOpacity } from 'react-native';
import { Avatar, ListItem, Icon } from 'react-native-elements';

import SettingsBackBtn from '../../components/SettingsBackBtn';
//import AboutCard from '../../components/AboutCard';
import TextBlock from '../../components/TextBlock';

var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;

let aboutText = 'AUCares is a platform to help American University students to stay on top of their health and keep track of their well-being. We support positive behavior change, share educational tidbits appropriate for your personal development, give insight to resources at AU, and connect you to exercise and social opportunities. ';
let goalText = 'Our goal is to provide education and assistance, better the lives of the AU student body, and facilitate long-term growth and development. ';
let howToUseText = 'Upon creating an account using your AU email, you will answer a series of initial questions so we can get an idea of your current state of well-being.\n \n Through a daily log-in, you can spin a wheel to receive a dare that pertains to your current progress. You will also answer a question about your previous dare to determine how much you’ve improved. \n \n You will be able to manage your goals and challenges in an organized manner. We will keep track of your overall progress through the Wheel of Wellness and provide you with advice and information that will help you to continue to advance in your areas of improvement.';
let targetText = 'AUCares strives to assist you in:\n Sleep\n Physical Activity\n Occupational Health\n Fruit and Vegetable Consumption\n Social Health\n Emotional HealthHydration';

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
                <TextBlock title={'About'} desc={aboutText}/>
                <TextBlock title={'Target Areas'} desc={targetText}/>
                <TextBlock title={'Our Goal'} desc={goalText}/>
                <TextBlock title={'How to Use'} desc={howToUseText}/>
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
