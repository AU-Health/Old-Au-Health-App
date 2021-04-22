import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, Image, View, SafeAreaView, Button, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Login from './Login';
import { Divider, Overlay } from 'react-native-elements';
import { ViewComponent } from 'react-native';
import WheelOfFortune from 'react-native-wheel-of-fortune'
import _ from 'lodash';
import { connect } from "react-redux";


const participants = [
  // <img src='https://foleysfitnesscenter.com/files/2019/10/weightlifting.png' />,
  "Physical Activity",
  'Occupational Wellness',
  'Emotional Wellness',
  'Social Wellness',
  'Fruit & Veg Cons.',
  'Sleep',
  'Water Cons.',
];
const extra =
  [
    "Fruit and Vegetable Consumption",
    "Water Consumption"
  ];

const explanations =
  [
    "Have you been maintaining a regular physical activity regime (i.e. walking, running, dancing, etc) for the past 6 months and plan to continue to do so?",
    "Have you been engaging in professional development activities/research  for the past 6 months?  If so, this may be the right category for you.",
    "Are you being aware, understanding, and accepting of your emotions on a regular basis through challenges and change?",
    "Have you been continually building your social groups for the past 6 months?",
    "Have you been eating adequate amounts of fruits and vegetables and plan to continue to do so?",
    "Have you been getting  adequate amounts of sleep  for the past 6 months and plan to continue to do so?",
    "Have you been drinking adequate amounts of water and plan to continue to do so? If so, this may be the right category for you.",


  ];
class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winnerValue: null,
      winnerIndex: null,
      started: false,
      tempIsLoggedIn: false,
      vis: true,
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
      borderColor: '#000000',
      innerRadius: 15,
      duration: 6000,
      // backgroundColor: 'transparent',
      textAngle: 'horizontal',
      knobSource: require('../assets/tick11.png'),
      onRef: ref => (this.child = ref),
    };



    return (
      <SafeAreaView style={styles.container}>

        <View style={{ flex: .9 }}>
          <Image style={{ width: 105, height: 105, marginTop: '8%', marginLeft: '1%' }} source={require('../assets/aucares.png')} />
        </View>
        <View style={{ flex: .1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Wheel of Wellness</Text>
        </View>


        <View style={{ flex: 2.5 }}>
          <WheelOfFortune
            options={wheelOptions}
            getWinner={(value, index) => {
              this.setState({ winnerValue: value, winnerIndex: index });
            }}
          />
        </View>

        <View style={{ flex: .8, justifyContent: 'center', width: '50%', marginLeft: '25%', marginRight: '25%' }}>
          {!this.state.started && (
            <View>
              <Button
                color='#d7263d'
                title="Spin!"
                onPress={() => {
                
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
              <Overlay overlayStyle={{width: '70%', borderRadius: 7}}isVisible={this.state.vis} onBackdropPress={() => { this.setState({ vis: false }) }}>
                <View>
                  <Text h3 style={{fontWeight: 'bold', fontSize: 20, padding: '5%', textAlign: 'center'}}>
                 
                    {(() => {
                      switch (this.state.winnerIndex) {
                        case 4: return `Challenge: ${extra[0]}`;
                        case 6: return `Challenge: ${extra[1]}`;
                        default: return `Challenge: ${participants[this.state.winnerIndex]}`;
                      }
                    })()}

                    {/* Challenge: {participants[this.state.winnerIndex]} */}
                  </Text>
                  <Divider />
                  <Text style={{padding: '5%', fontSize: 18}}>
                    {explanations[this.state.winnerIndex]}
              </Text>

              <View style={{dispaly: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginTop: '10%', marginBottom: '5%'}}>
                  <Button
                    color='gray'
                    title='Spin Again!'
                    onPress={() => {
                      this.setState({ winnerIndex: null });
                      this.child._tryAgain();
                    }}
                  />
                  
                <Button
                color='blue'
                title="Proceed!"
                onPress={() => {
                 
                  //FETCH CALL TO WHATEVER
                  
                }}
              />
              </View>
                </View>
              </Overlay>


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

//quetion dare or truth from physical activity

const mapStateToProps = state => ({
	// reviews: state.reviews.items,
  truthsItems: state.truthsReducer.items,
  truthsErros: state.truthsReducer.errors,
  truthsLoading: state.truthsReducer.loading

});
//might have to send up to a state and have agree votes as a state
const mapDispatchToProps = (dispatch) => {
	return {
		// fetchCompanies: () => dispatch(fetchProducts()),
		// fetchRevs: (theCName) => dispatch(fetchReviews(theCName)),
	
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)