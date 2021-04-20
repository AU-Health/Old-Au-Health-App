import React from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, ListItem, Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';

var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;

var h = deviceHeight * 20 / 100;
var w = deviceWidth;

const AboutCard = ({ desc }) => {
    return (
        <View style={styles.aboutContainer}>
            <View style={styles.avaterContainer}>
                <Avatar
                    size="large"
                    rounded
                    icon={{name: 'user', type: 'font-awesome'}}
                    onPress={() => console.log("Works!")}
                    activeOpacity={0.7}/>
            </View>

            <View styles={styles.textContainer}>
                <Text style={styles.descText}> {desc} </Text>
            </View>
            <View style={styles.divider}/>
        </View>
    );
};

const styles = StyleSheet.create({
    aboutContainer: {
        //backgroundColor: 'red',
        marginTop: 5,
        //alignItems: 'center',
        width: w * 80 / 100,
        height: h,
        flexDirection: 'column',
    },
    descText: {
        //marginTop: 20,
        fontSize: 14,
    },
    divider: { //get this working lol
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    avaterContainer: {
        //marginLeft: 5,
        flex: 1,
    },
    textContainer: { //work on fixing the text, currently goes off the screen!
        position: 'absolute',
        bottom: 0,
    },
})

export default AboutCard;
