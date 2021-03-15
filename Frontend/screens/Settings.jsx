import React from 'react';
import { Text, View, ScrollView, Image } from 'react-native';
import { Avatar, ListItem, Icon } from 'react-native-elements';
import { Component, useRef} from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StackNavigator } from 'react-navigation';


const Stack = createStackNavigator();

let settingList = [
    {
        name: 'Setting1',
        icon: 'av-timer',
        route: 'Test'
    },
    {
        name: 'Setting2',
        icon: 'av-timer',
        route: 'Test1'
    },
    {
        name: 'Setting3',
        icon: 'av-timer',
        route: 'Test1'
    },
    {
        name: 'Setting4',
        icon: 'av-timer',
        route: 'Test1'
    },
    {
        name: 'Setting5',
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

function tab1() {
    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text> Hello World 1 screen </Text>
        </View>
    );
}

function tab2() {
    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text> Hello World 2 screen </Text>
        </View>
    );
}

function tab3() {
    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text> Hello World 3 screen </Text>
        </View>
    );
}

function tab4() {
    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text> Hello World 4 screen </Text>
        </View>
    );
}

function tab5() {
    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text> Hello World 5 screen </Text>
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
                <Stack.Screen name='Setting1' component={tab1}/>
                <Stack.Screen name='Setting2' component={tab2}/>
                <Stack.Screen name='Setting3' component={tab3}/>
                <Stack.Screen name='Setting4' component={tab4}/>
                <Stack.Screen name='Setting5' component={tab5}/>
            </Stack.Navigator>
        </NavigationContainer>

    );
  }
}
