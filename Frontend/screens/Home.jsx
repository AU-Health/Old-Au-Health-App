import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, Image, View, SafeAreaView, Button, TouchableOpacity, Pressable, } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Login from './Login';
import { Divider, Overlay, ButtonGroup } from 'react-native-elements';
import { ViewComponent } from 'react-native';
import WheelOfFortune from 'react-native-wheel-of-fortune'
import _ from 'lodash';
import { connect } from "react-redux";

let items = [require('../assets/pa1.png'), require('../assets/oa.png'), require('../assets/emotion.png'), require('../assets/social.png'), require('../assets/veg1.png'), require('../assets/slumb1.png'), require('../assets/water1.png')];

//temporary dictionary of truths for each category
let newl = '\n'
let tempTruths = {
  "How many minutes of moderate physical activity do adults need throughout the week?": ['25', '150', '75', '10'],
  "How many hours per week should the average college student spending working (studying and working)?": ['3', '6', '12', '40'],
  "True/false-Getting connected with others is not an important aspect of emotional wellness.": ['true', 'false'],
  "To have a robust sense of well-being, how many hours of social interaction should an adult have per day?": ['6', '1', '2', '10'],
  "How many cups per day of vegetables is part of a healthy eating pattern?": ['2 or 3', '4', '5 or 6', 'less than 1'],
  "How many hours of continual sleep does an average adult under the age of 65 need per night for optimal health?": ['5-7 hours', '7-8 hours', '9-10 hours', 'it doesn’t matter'],
  "How many cups of water should an adult have per day?": ['15.5', '11.3', '12', '19']
}

let tempDares =
  ["we dare you to go outside and run 2 miles",
    "We dare you to apply to 2 more jobs this week",
    "We dare you to talk about how you're feeling this week with others",
    "We dare you to go out and have unch with one new friend this week",
    "We dare you to eat 2 new fruits or veggies this week",
    "We dare you to sleep 7-8 hours per night for the next 3 nights. You will receive a follow-up question once per day for the following 3 days to help hold you accountable. Each day these follow-up questions are answered, you will receive 5 points. ",
    "We dare you to drink twice as much water as you did yesterday today",
  ]



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
      challengeOverlayVisible: false,
      selectedIndex: -1,
    };
    this.child = null;
  }


  handleWheelSpinButtonClick = () => {
    console.log('you clicked spin the button!')
  }
  render() {
    const buttons = ['Truth', 'Dare', 'Question']

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
              <Overlay overlayStyle={{ width: '70%', borderRadius: 7 }} isVisible={this.state.vis} onBackdropPress={() => { this.setState({ vis: false }) }}>
                <View>
                  <Text h3 style={{ fontWeight: 'bold', fontSize: 20, padding: '5%', textAlign: 'center' }}>

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
                  <Text style={{ padding: '2%', fontSize: 18 }}>
                    {explanations[this.state.winnerIndex]}
                  </Text>

                  <View style={{ dispaly: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginTop: '5%', marginBottom: '5%' }}>
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
                        this.setState({ challengeOverlayVisible: true })
                        //FETCH CALL TO WHATEVER
                        //redirect to page where there is a category and questions truth and dare
                        //your challenge full screen overlay
                      }}
                    />

                  </View>

                </View>
              </Overlay>


            </View>
          )}

          {(this.state.challengeOverlayVisible) ?
            <Overlay overlayStyle={{ width: '90%', height: '90%', borderRadius: 7, padding: '10%' }} fullScreen={true} isVisible={this.state.challengeOverlayVisible} onBackdropPress={() => { this.setState({ challengeOverlayVisible: false }) }}>
              <View style={{flex: 1, flexDirection: 'column'}}>
                <View style={{flex: 2}}>
                <Text style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 20, padding: '5%' }}>Select a challenge for
                 {(() => {
                    switch (this.state.winnerIndex) {
                      case 4: return ` ${extra[0]}`;
                      case 6: return ` ${extra[1]}`;
                      default: return ` ${participants[this.state.winnerIndex]}`;
                    }
                  })()}!</Text>
                <ButtonGroup
                  onPress={(num) => { this.setState({ selectedIndex: parseInt(num) }) }}
                  selectedIndex={this.state.selectedIndex}
                  buttons={buttons}
                  containerStyle={{ height: 100 }}
                />
                </View>



               
                <Text style={{flex: 3, justifyContent: 'center', textAlignVertical: 'center', alignItems: 'center', textAlign: 'center', marginTop: -15, paddingBottom: '5%', paddingLeft: '5%', paddingRight: '5%', fontSize: 18}}>
                  {(() => {
                    switch (this.state.selectedIndex) {
                      case 0: return [`${Object.keys(tempTruths)[this.state.winnerIndex]} \n \n`, Object.values(tempTruths)[this.state.winnerIndex].map((ii) => <Button title={ii}/>)];
                      case 1: return `${tempDares[this.state.winnerIndex]}`;
                      case 2: return `Is there a way around a challenge your facing right now that involves doing more of the challenge: ${participants[this.state.winnerIndex]}?`;
                      default: return <Image style={{ width: 80, height: 80 }} source={items[this.state.winnerIndex]} />;
                    }
                  })()}</Text>

              

                <View>
                {(this.state.selectedIndex !== -1) ? <View style={{ marginBottom: 0 }}>
                <Button
                      
                      title="Accept Challenge!"
                      onPress={() => {
                        console.log('pressed accepted')
                      }} />

                </View> : console.log('hi')}
                  </View>

              </View>
            </Overlay> : console.log('')}
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