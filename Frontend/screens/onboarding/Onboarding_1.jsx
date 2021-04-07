import React, { useState } from 'react';
import { View, Text, Dimensions, Input, StyleSheet, CheckBox, ScrollView, TouchableOpacity } from 'react-native';

const Onboarding_1 = ({ navigation }) => {
    return (
        <View style={styles.onboardingContainer}>
          <Text> 1st Onboarding screen </Text>
          <TouchableOpacity
              onPress={() => {
                  navigation.navigate("Onboarding_2");
              }} style={styles.onboardingBtnContainer}>
          <Text style={styles.onboardingBtn}>Continue</Text>
          </TouchableOpacity>
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

export default Onboarding_1;
