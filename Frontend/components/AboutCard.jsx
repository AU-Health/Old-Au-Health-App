import React from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, ListItem, Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';

var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;

var h = deviceHeight * 25 / 100;
var w = deviceWidth;

const AboutCard2 = ({ desc }) => {
    return (
        <View style={styles.aboutContainer}>
            <Avatar
                size="large"
                rounded
                icon={{name: 'user', type: 'font-awesome'}}
                onPress={() => console.log("Works!")}
                activeOpacity={0.7}/>
            <Text style={styles.descText}> {desc} </Text>

            <View style={styles.divider}/>
        </View>
    );
};

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
        marginTop: 5,
        alignItems: 'center',
        width: w,
        height: h,
        flex: .5,
        flexDirection: 'row',
    },
    descText: {
        flexShrink: 1,
        fontSize: 14,
    },
    divider: { //get this working lol
        borderBottomColor: 'black',
        borderBottomWidth: 2,
    },
    avaterContainer: {
        marginLeft: 5,
    },
    textContainer: { //work on fixing the text, currently goes off the screen!
        flexGrow: 1,
        flex: .5,
    },
})

export default AboutCard;
