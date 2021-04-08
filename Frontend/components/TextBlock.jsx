import React from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
//import LinearGradient from 'react-native-linear-gradient';
import { LinearGradient } from 'expo-linear-gradient';

var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;

var h = deviceHeight * 30 / 100;
var w = deviceWidth * 80 / 100;

const TextBlock = ({ title, desc }) => {
    return (
        <View style={styles.blockContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>
                    {title}
                </Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.descText}>
                    {desc}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    blockContainer: {
        marginTop: 20,
        width: w,
        height: h,
    },
    titleText: {
        fontSize: 18,
        fontWeight: '700',
        color: "#009688",
        marginBottom: 10,
    },
    descText: {

    },



})

export default TextBlock ;
