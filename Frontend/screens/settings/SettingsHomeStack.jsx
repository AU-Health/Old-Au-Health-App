import React from 'react';
import { Text, View, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';
import { Avatar, ListItem, Icon } from 'react-native-elements';
import { Component, useRef} from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StackNavigator } from 'react-navigation';

var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;

let settingList = [
    {
        name: 'Profile',
        icon: 'av-timer',
        route: 'Test'
    },
    {
        name: 'Resources',
        icon: 'av-timer',
        route: 'Test1'
    },
    {
        name: 'Notifications',
        icon: 'av-timer',
        route: 'Test1'
    },
    {
        name: 'Feedback',
        icon: 'av-timer',
        route: 'Test1'
    },
    {
        name: 'About',
        icon: 'av-timer',
        route: 'Test1'
    },
    {
        name: 'Logout',
        icon: 'av-timer',
        route: 'Test1'
    },
 ]

const SettingsHomeStack = ({ navigation }) => {
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

          <View style={{
              flex: 3,
          }}>

              {settingList.map((item, i) => (
                      <ListItem key={i} bottomDivider onPress={() => {

                              //console.log("work works!")
                              //const navigation = useNavigation();
                              //this.props.navigation.navigate('RootStack', { screen: item.name })
                              navigation.navigate(item.name)
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
