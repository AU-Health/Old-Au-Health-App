import React, { useState } from 'react';
import { View, Text, Dimensions, Input, StyleSheet, CheckBox, ScrollView, TouchableOpacity } from 'react-native';

const Questionaire = ({ navigation }) => {
    return (
        <View style={styles.questionaireContainer}>
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
};

const styles = StyleSheet.create({
    questionaireContainer: {
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

export default Questionaire;
