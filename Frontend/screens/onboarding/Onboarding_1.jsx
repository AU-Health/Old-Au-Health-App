import React, { useState } from 'react';
import { View, Text, Dimensions, Input, StyleSheet, CheckBox, ScrollView, TouchableOpacity } from 'react-native';
import TextBlock from '../../components/TextBlock';


var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;

var h = deviceHeight * 25 / 100;
var w = deviceWidth * 80 / 100;

let desc = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

const Onboarding_1 = ({ navigation }) => {
    return (
        <View style={styles.onboardingContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}> Welcome to AU Cares </Text>
          </View>

          <TextBlock title='About' desc={desc} />

          <TextBlock title='Our Goal' desc={desc} />

          <View style={styles.BtnViewContainer}>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Onboarding_2");
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
        //justifyContent: 'center',
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
  title: {
    fontSize: 22,
    fontWeight: '700',
  },
  titleContainer: {
    marginTop: 30,
  },
});

export default Onboarding_1;
