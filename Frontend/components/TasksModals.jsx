import React from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Button } from 'react-native';
//import LinearGradient from 'react-native-linear-gradient';
import { LinearGradient } from 'expo-linear-gradient';
import Modal from 'react-native-modal';

var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;

var h = deviceHeight * 25 / 100;
var w = deviceWidth * 70 / 100;

const TasksModals = ({ title, info, isModalVisible, setModalVisible }) => {
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const submit = () => {
        console.log('don\'t forget to implement me!');
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


                <View style={styles.completeBottom}>
                    <Button style={styles.completeBtn} title="Completed" onPress={submit} />
                </View>
                <View style={styles.cancelBottom}>
                    <Button style={styles.cancelBtn} title="Cancel" onPress={toggleModal} />
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
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
    },
    infoText: {
    },
    completeBtn: {
        color: 'green',
        backgroundColor: '#cf000f',
    },
    completeBottom: {
        position: 'absolute',
        bottom: 5,
        left: 10,
    },
    cancelBottom: {
        position: 'absolute',
        bottom: 5,
        right: 10,
    },
})

export default TasksModals;
