import React, {useState} from 'react';
import { View, Text, Dimensions, StyleSheet, Pressable, Button } from 'react-native';
//import LinearGradient from 'react-native-linear-gradient';
import { LinearGradient } from 'expo-linear-gradient';

import ProfileTrackersModals from './ProfileTrackersModals';

var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;
var h = deviceHeight * 25 / 100;
var w = deviceWidth * 80 / 100;
var name;
let modal;

const ProfileTrackers = ({ title, info, color1, color2 }) => {

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
        name = title;
    };

    if(name == 'Social Health'){
        modal = <ProfileTrackersModals title='Social Health' info='Social Health Info' isModalVisible={isModalVisible} setModalVisible={setModalVisible}/>
    } else if (name == 'Emotional Health') {
        modal = <ProfileTrackersModals title='Emotional Health' info='Emotional Health Info' isModalVisible={isModalVisible} setModalVisible={setModalVisible}/>
    } else if (name == 'Sleep') {
        modal = <ProfileTrackersModals title='Sleep' info='Sleep Info' isModalVisible={isModalVisible} setModalVisible={setModalVisible}/>
    } else if (name == 'Physical') {
        modal = <ProfileTrackersModals title='Physical' info='Physical Info' isModalVisible={isModalVisible} setModalVisible={setModalVisible}/>
    } else if (name == 'Hydration') {
        modal = <ProfileTrackersModals title='Hydration' info='Hydration Info' isModalVisible={isModalVisible} setModalVisible={setModalVisible}/>
    } else if (name == 'Fruits & Veggies') {
        modal = <ProfileTrackersModals title='Fruits & Veggies' info='Fruits & Veggies Info' isModalVisible={isModalVisible} setModalVisible={setModalVisible}/>
    } else if (name == 'Occupational Health') {
        modal = <ProfileTrackersModals title='Occupational Health' info='Occupational Health Info' isModalVisible={isModalVisible} setModalVisible={setModalVisible}/>
    } else {
        modal = <ProfileTrackersModals title='Error' info='Could not load the correct modal.' isModalVisible={isModalVisible} setModalVisible={setModalVisible}/>
    }


    return (
        <View style={styles.cardContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}> { title } </Text>
            </View>
            <Pressable onPress={toggleModal}>
                <LinearGradient
                    colors={ [color1, color2] }
                    style={styles.linearGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}>
                    <View style={styles.textBodyContainer}>
                        <Text> { info } </Text>
                    </View>
                </LinearGradient>
                {modal}
            </Pressable>





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
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    height: h,
    width: w,
  },
  cardContainer: {
      marginTop: 20,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#c4c4c4',
      shadowOffset: {
          width: 3,
          height: 2,
      },
      shadowRadius: 4,
      shadowOpacity: 1.0,
  },
  titleContainer: {
      width: w,
      alignItems: 'flex-start',
  },
  titleText: {
      textShadowColor: 'white',
      fontSize: 16,
      fontWeight: 'bold',
  },
  textBodyContainer: {
      marginTop: 10,
      marginLeft: 10,
      width: w,
      height: h,
      alignItems: 'flex-start',
  },
})

export default ProfileTrackers;
