import React, { useState } from 'react';
import { Text, View, ScrollView, Image, StyleSheet, Dimensions, Button } from 'react-native';
import { Avatar, ListItem, Icon } from 'react-native-elements';
import { Component, useRef} from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StackNavigator } from 'react-navigation';
import { LinearGradient } from 'expo-linear-gradient';
import Modal from 'react-native-modal';

import LogoutModals from '../../components/LogoutModal';

var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;

var h = deviceHeight * 25 / 100;
var w = deviceWidth * 80 / 100;

let settingList = [
    {
        name: 'Profile',
        icon: 'account-circle',
        route: 'Test'
    },
    {
        name: 'Resources',
        icon: 'book',
        route: 'Test1'
    },
    {
        name: 'Notifications',
        icon: 'bell',
        route: 'Test1'
    },
    {
        name: 'Feedback',
        icon: 'comment',
        route: 'Test1'
    },
    {
        name: 'About',
        icon: 'account-supervisor',
        route: 'Test1'
    },
    {
        name: 'Logout',
        icon: 'logout',
        route: 'Test1'
    },
 ]



const SettingsHomeStack = ({ navigation }) => {
    const [isSelected, setSelection] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);

    let modal = <LogoutModals isModalVisible={isModalVisible} setModalVisible={setModalVisible} />

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <ScrollView>
          <View style={{
              flex: 1,
              flexDirection: 'row',
          }}>
              <View style={{
                  //margin: 10,
              }}>
                  <Avatar
                      size="large"
                      rounded
                      icon={{name: 'user', type: 'font-awesome'}}
                      onPress={() => console.log("Works!")}
                      activeOpacity={0.7}
                      containerStyle={{flex: 2, marginLeft: 20, marginTop: 60}}
                  />
              </View>
              <View style={{
                  marginTop: 86,
              }}>
                  <Text style={{
                      fontWeight: 'bold',
                      fontSize: 28,
                      }}> User Name </Text>
              </View>
          </View>
                {modal}
          <View style={{
              flex: 3,
          }}>

              {settingList.map((item, i) => (
                      <ListItem key={i} bottomDivider onPress={() => {
                              if(item.name != 'Logout') {
                                  navigation.navigate(item.name)
                              } else {
                                  toggleModal()
                              }

                          }}>
                          <Icon name={item.icon} />
                          <ListItem.Content>
                              <ListItem.Title>{item.name}</ListItem.Title>
                          </ListItem.Content>
                          <ListItem.Chevron/>
                      </ListItem>
              ))
              }
          </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    resourcesContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

});

export default SettingsHomeStack;
