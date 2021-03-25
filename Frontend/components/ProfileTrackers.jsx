import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;

const ProfileTrackers = ({ title, info }) => {
    return (
        <View style={{

                height: deviceHeight * 40 / 100,
                width: deviceWidth * 80 / 100,
            }}>
            <LinearGradient
                colors={['#1C86EE', '#7A67EE' ]}
                style={styles.linearGradient}>

            </LinearGradient>
        </View>

    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: 200,
    width: 350,
  },
})

export default ProfileTrackers;
