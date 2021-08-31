import React from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
//import LinearGradient from 'react-native-linear-gradient';
import { LinearGradient } from 'expo-linear-gradient';

var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;

var h = deviceHeight * 25 / 100;
var w = deviceWidth * 80 / 100;

let activity1, activity2, activity3, percent1, percent2, percent3;
let labels, percentages;

const Legend = ({ data }) => {

    //loads data in from the Progress.jsx screen, change the data there.
    const _loadData = (data) => {
        labels = data['labels'];
        percentages = data['data'];

      
        percent1 = percentages[0] * 100;
        percent2 = percentages[1] * 100;
        percent3 = percentages[2] * 100;

        activity1 = labels[0];
        activity2 = labels[1];
        activity3 = labels[2];

    };

    _loadData(data);
    // the order of the data is reversed in order to show the outer ring first.
    return (
        <View style={styles.Container}>

            <View style={styles.textContainer}>
                <Text style={styles.labelText}>
                    {activity3}: {percent3}%
                </Text>
            </View>
        
            <View style={styles.textContainer}>
                <Text style={styles.labelText}>
                    {activity2}: {percent2}%
                </Text>
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.labelText}>
                    {activity1}: {percent1}%
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    Container: {
        flexDirection: "row",
        width: w,
        height: h * 10 / 100,
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    textContainer: {
        height: h * 10 / 100,
    },
    labelText: {
        fontSize: 15,
        fontWeight: '500',
    },

})

export default Legend;
