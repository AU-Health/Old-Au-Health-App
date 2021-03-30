import React, { useState } from 'react';
import { View, Text, Dimensions, Input, StyleSheet, CheckBox } from 'react-native';

var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;
//<Text> {title} </Text>
//height: deviceHeight * 10/ 100,

const Task = ({ title }) => {
    const [isSelected, setSelection] = [false, false];

    return (
        <View
            style={styles.taskContainer}>
            <View style={{position: 'absolute', left: 0}}>
                <Text style={{ paddingLeft: 8,}}> task title </Text>
            </View>
            <View style={styles.checkboxContainer}>
                <CheckBox
                    value={isSelected}
                    onValueChange={setSelection}
                    style={styles.checkbox}
                />
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    checkboxContainer: {
      position: 'absolute',
      right: 10,
      marginBottom: 20,
    },
    checkbox: {
      alignSelf: "center",
    },
    taskContainer: {
        justifyContent: 'center',
        width: deviceWidth * 90 / 100,
        borderLeftWidth: 4,
        borderRadius: 4,
        borderColor: '#000080',
        height: '15%',
        marginTop: 10,
        backgroundColor: '#FBFAF5',
        shadowColor: '#c4c4c4',
        shadowOffset: {
            width: 3,
            height: 2,
        },
        shadowRadius: 4,
        shadowOpacity: 1.0,
    },
});

export default Task;
