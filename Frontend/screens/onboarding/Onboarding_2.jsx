import React, { useState } from 'react';
import { View, Text, Dimensions, Input, StyleSheet, CheckBox, ScrollView, TouchableOpacity } from 'react-native';

const Onboarding_2 = ({ navigation }) => {
    return (
        <View style={styles.onboardingContainer}>
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
      color: '#fafafa',
      fontWeight: "bold",
      alignSelf: "center",
    },
    onboardingBtnContainer: {
      elevation: 8,
      backgroundColor: "#009688",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12,
    },
});

export default Onboarding_2;
