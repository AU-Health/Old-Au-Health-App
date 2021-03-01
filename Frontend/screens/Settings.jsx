import React from 'react';
import { Text, View, ScrollView, Image } from 'react-native';
import { Avatar, ListItem, Icon } from 'react-native-elements';
import { Component, useRef} from 'react';

let settingList = [
    {
        name: 'Setting tab 1',
        icon: 'av-timer'
    },
    {
        name: 'Setting tab 2',
        icon: 'av-timer'
    },
    {
        name: 'Setting tab 3',
        icon: 'av-timer'
    },
    {
        name: 'Setting tab 4',
        icon: 'av-timer'
    },
    {
        name: 'Setting tab 5',
        icon: 'av-timer'
    },
  ]

export default class Settings extends Component {
  render() {
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
          <div>
            {settingList.map((item, i) => (
                    <ListItem key={i} bottomDivider>
                        <Icon name={item.icon} />
                        <ListItem.Content>
                            <ListItem.Title>{item.name}</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron/> 
                    </ListItem>
            ))
            }
            </div>
        </View>
      </ScrollView>
    );
  }
}