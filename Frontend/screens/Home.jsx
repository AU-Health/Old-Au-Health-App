import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, Image, View, SafeAreaView, Button, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Login from './Login';
import { Divider } from 'react-native-elements';
import { ViewComponent } from 'react-native';
import WheelOfFortune from 'react-native-wheel-of-fortune'


const participants = [
  <img src = 'https://foleysfitnesscenter.com/files/2019/10/weightlifting.png' />,
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
      knobSize: 50,
      borderWidth: 8,
      borderColor: '#fff',
      innerRadius: 30,
      duration: 6000,
      // backgroundColor: 'transparent',
      textAngle: 'horizontal',
      knobSource: require('../assets/tick3.png'),
      onRef: ref => (this.child = ref),
    };
    return (
      <View >
        <Divider style={{ height: '15%' }} />
        <Image style={{ width: 100, height: 100 }} source={require('../assets/aucares.png')} />
      
          <Text style={styles.titleText}> Wheel of Wellness</Text>
          <Divider style={{ height: '25%' }} />
         

          <View style={styles.container}>
        <StatusBar barStyle={'light-content'} />
        <WheelOfFortune
          options={wheelOptions}
          getWinner={(value, index) => {
            this.setState({winnerValue: value, winnerIndex: index});
          }}
        />
        {!this.state.started && (
          <View style={styles.startButtonView}>
          
              <Button title="Spin!"
              onPress={()=>{console.log("the button was pressed");
              this.setState({
                started: true,
              });
              this.child._onPress();}} 
              style={styles.startButtonText}/>
        
          </View>
        )}
        {this.state.winnerIndex != null && (
          <View style={styles.winnerView}>
            <Text style={styles.winnerText}>
              Challenge: {participants[this.state.winnerIndex]}
            </Text>
            <TouchableOpacity
              onPress={() => {
                this.setState({winnerIndex: null});
                this.child._tryAgain();
              }}
              style={styles.tryAgainButton}>
              <Text style={styles.tryAgainText}>TRY AGAIN</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

          {/* <Button
            title="Spin!"
            type="solid"
            color='red'
            raised
            onPress={this.handleWheelSpinButtonClick}
            accessibilityLabel="Button to spin the wheel of challenges"
          />
           */}

        </View>

    


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
    alignItems: 'center',
    justifyContent: 'center',
  
  },
  startButtonView: {
    position: 'absolute',
    bottom: '-80%',
    left: '40%',
  },
  startButton: {
    marginTop: 50,
    padding: 5,
  },
  startButtonText: {
    fontSize: 50,
    color: '#fff',
    fontWeight: 'bold',
  },
  winnerView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
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
