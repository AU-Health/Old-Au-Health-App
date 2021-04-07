import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, Image, View, SafeAreaView, Button, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Login from './Login';
import { Divider } from 'react-native-elements';
import { ViewComponent } from 'react-native';
import WheelOfFortune from 'react-native-wheel-of-fortune'


const participants = [
  // <img src='https://foleysfitnesscenter.com/files/2019/10/weightlifting.png' />,
  'PA',
  'Occupational Wellness',
  'Emotional Wellness',
  'Social Wellness',
  'Fruit & Vegetable Consumption',
  'Sleep',
  'Water Consumption',
];
export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winnerValue: null,
      winnerIndex: null,
      started: false,
    };
    this.child = null;
  }


  handleWheelSpinButtonClick = () => {
    console.log('you clicked spin the button!')
  }
  render() {
    const wheelOptions = {
      rewards: participants,
      knobSize: 35,
      borderWidth: 2,
      borderColor: '#fff',
      innerRadius: 15,
      duration: 6000,
      // backgroundColor: 'transparent',
      textAngle: 'vertical',
      knobSource: require('../assets/tick11.png'),
      onRef: ref => (this.child = ref),
    };



    return (
      <SafeAreaView style={styles.container}>
          <View style={{flex: .9}}>
          <Image style={{width: 105, height: 105, marginTop: '8%', marginLeft: '1%'}} source={require('../assets/aucares.png')} />
          </View>
          <View style={{flex: .1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 25, fontWeight: 'bold'}}>Wheel of Wellness</Text>
          </View>
         
        
          <View style={{flex:2.5}}>
          <WheelOfFortune
            options={wheelOptions}
            getWinner={(value, index) => {
              this.setState({ winnerValue: value, winnerIndex: index });
            }}
          />
          </View>
     
          <View style={{flex: .8, justifyContent: 'center', width: '50%', marginLeft: '25%', marginRight: '25%'}}>
          {!this.state.started && (
            <View>
              <Button 
                color='#d7263d'
                title="Spin!"
                onPress={() => {
                  console.log("the button was pressed");
                  this.setState({
                    started: true,
                  });
                  this.child._onPress();
                }}
              />
            </View>
          )}
          {this.state.winnerIndex != null && (
            <View >
              <Text >
                Challenge: {participants[this.state.winnerIndex]}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ winnerIndex: null });
                  this.child._tryAgain();
                }}
                style={styles.tryAgainButton}>
                <Text style={styles.tryAgainText}>TRY AGAIN</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>  
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 25,
    fontWeight: "bold",
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  


  },
  startButtonView: {
    // position: 'absolute',
    // top: 0,
    // left: '50%',
  },
  startButton: {
    // marginTop: 0,
    // padding: 0,
  },
  startButtonText: {
    // fontSize: 50,
    // color: '#fff',
    // fontWeight: 'bold',
  },
  winnerView: {
    // position: 'absolute',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  tryAgainButton: {
    padding: 10,
  },
  winnerText: {
    fontSize: 30,
  },
  tryAgainButton: {
    padding: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',

  },
  tryAgainText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});
