import React, {useState} from 'react';
import { View, Text, Dimensions, StyleSheet, Pressable, Button } from 'react-native';
//import LinearGradient from 'react-native-linear-gradient';
import { LinearGradient } from 'expo-linear-gradient';
import Modal from 'react-native-modal';

var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;
var h = deviceHeight * 80 / 100;
var w = deviceWidth * 80 / 100;

const ProfileTrackersModals = ({ title, info, isModalVisible, setModalVisible }) => {
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <Modal style={styles.center} isVisible={isModalVisible}>
            <View style={styles.modalContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}> {title} </Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoText}> {info} </Text>
                </View>


                <View style={styles.bottom}>
                    <Button style={styles.hideBtn} title="Hide modal" onPress={toggleModal} />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContainer: {
        borderRadius: 8,
        backgroundColor: '#fafafa',
        width: w,
        height: h,
    },
    hideBtn: {

    },
    bottom: {
        position: 'absolute',
        bottom: 0,
        right: 5,
    },
    titleContainer: {
        marginTop: 10,
        alignItems: 'center',
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    infoContainer: {
        marginTop: 10,
        alignItems: 'center',
    },
    infoText: {
    },
})

export default ProfileTrackersModals;
