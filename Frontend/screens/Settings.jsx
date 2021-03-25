import React from 'react';
import { Text, View, ScrollView, Image } from 'react-native';
import { Avatar, ListItem, Icon } from 'react-native-elements';
import { Component, useRef} from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StackNavigator } from 'react-navigation';

import ProfileTrackers from '../components/ProfileTrackers';


const Stack = createStackNavigator();

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
        name: 'Contact',
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

//main settings view

function SettingsHome({ navigation }) {
    return(
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
}

//here are different setting option screens as functions
//flex: 1, justifyContent: 'center', alignItems: 'center'
function Profile() {
    return(
        <ScrollView>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Avatar
                    size="xlarge"
                    rounded
                    icon={{name: 'user', type: 'font-awesome'}}
                    onPress={() => console.log("Works!")}
                    activeOpacity={0.7}
                    containerStyle={{flex: 2, }}
                />
            <Text style={{
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 24,
                //fontWeight: 'bold',
            }}> Username </Text>
            </View>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                }}>
                <ProfileTrackers></ProfileTrackers>

            </View>
        </ScrollView>
    );
}

function Resources() {
    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text> Hello World 2 screen </Text>
        </View>
    );
}

function Notifications() {
    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text> Hello World 3 screen </Text>
        </View>
    );
}

function Contact() {
    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text> Hello World 4 screen </Text>
        </View>
    );
}

function About() {
    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text> Hello World 5 screen </Text>
        </View>
    );
}

function Logout() {
    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text> Hello World 6 screen </Text>
        </View>
    );
}

//function that gets exported from this file, its just a navigation stack pointing to all the pages above

export default class Settings extends Component {
  render() {
    return(
        <NavigationContainer independent={true}>
            <Stack.Navigator>
                <Stack.Screen name='SettingsHome' component={SettingsHome}/>
                <Stack.Screen name='Profile' component={Profile}/>
                <Stack.Screen name='Resources' component={Resources}/>
                <Stack.Screen name='Notifications' component={Notifications}/>
                <Stack.Screen name='Contact' component={Contact}/>
                <Stack.Screen name='About' component={About}/>
                <Stack.Screen name='Logout' component={Logout}/>
            </Stack.Navigator>
        </NavigationContainer>

    );
  }
}
