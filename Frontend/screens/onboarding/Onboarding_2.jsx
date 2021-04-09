import React, { useState } from 'react';
import { View, Text, Dimensions, Input, StyleSheet, CheckBox, ScrollView, TouchableOpacity } from 'react-native';
import TextBlock from '../../components/TextBlock';


var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;

var h = deviceHeight * 25 / 100;
var w = deviceWidth * 80 / 100;

let desc = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

const Onboarding_2 = ({ navigation }) => {
    return (
        <View style={styles.onboardingContainer}>


            <TextBlock title='How to Use' desc={desc} />

            <TextBlock title='Title' desc={desc} />



            <View style={styles.BtnViewContainer}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("Onboarding_1");
                    }} style={styles.onboardingBtnContainer}>
                <Text style={styles.onboardingBtn}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("Login");
                    }} style={styles.onboardingBtnContainer}>
                    <Text style={styles.onboardingBtn}>Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    onboardingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    onboardingBtn: {
      fontSize: 18,
      color: '#009688',
      fontWeight: "bold",
      alignSelf: "center",
    },
    onboardingBtnContainer: {
      elevation: 8,
      //backgroundColor: "#009688",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12,
    },
    BtnViewContainer: {
        width: w,
        bottom: 0,
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
});

export default Onboarding_2;
