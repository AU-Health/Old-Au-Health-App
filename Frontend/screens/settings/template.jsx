import React, { useState } from 'react';
import { View, Text, Dimensions, Input, StyleSheet, CheckBox, ScrollView } from 'react-native';
import { Avatar, ListItem, Icon } from 'react-native-elements';

var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;

const Resources = () => {
    return (
        <View style={styles.resourcesContainer}>
            <Text> Resources screen </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    resourcesContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Resources;

/*
//Onboarding screens
function Onboarding_1({ navigation }) {
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text> 1st Onboarding screen </Text>
        <TouchableOpacity
            onPress={() => {
                navigation.navigate("Onboarding_2");
            }} style={styles.onboardingBtnContainer}>
        <Text style={styles.onboardingBtn}>Continue</Text>
        </TouchableOpacity>
      </View>
    );
}

function Onboarding_2({ navigation }) {
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text> 2nd Onboarding screen </Text>
        <View style={styles.BtnViewContainer}>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Onboarding_1");
                }} style={styles.onboardingBtnContainer}>
            <Text style={styles.onboardingBtn}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Questions");
                }} style={styles.onboardingBtnContainer}>
            <Text style={styles.onboardingBtn}>Continue</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
}

//Questionaire Screen
function Questions({ navigation }) {
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text> Questionaire screen </Text>
        <View style={styles.BtnViewContainer}>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Onboarding_2");
                }} style={styles.onboardingBtnContainer}>
            <Text style={styles.onboardingBtn}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("HomeApp");
                }} style={styles.onboardingBtnContainer}>
            <Text style={styles.onboardingBtn}>Continue</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
}

*/
