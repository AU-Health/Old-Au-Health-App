import { MaterialCommunityIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Provider } from 'react-redux'
import { store } from './redux'
import ChallengeScreen from './screens/Challenges'
import HomeScreen from './screens/Home'
import { Mood } from './screens/onboarding/Mood'
import Onboarding_1 from './screens/onboarding/Onboarding_1'
import Onboarding_2 from './screens/onboarding/Onboarding_2'
import preLogin from './screens/onboarding/preLogin'
import Questionaire from './screens/onboarding/Questionaire'
import ProgressScreen from './screens/Progress'
import Settings from './screens/Settings'

//App Home Screen
const Tab = createBottomTabNavigator()
function HomeApp({ _navigation }) {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            const icons = {
              Home: 'home',
              Progress: 'chart-donut-variant',
              Challenges: 'playlist-check',
              Settings: 'account-settings',
            }

            return (
              <MaterialCommunityIcons
                name={icons[route.name]}
                color={color}
                size={size}
              />
            )
          },
        })}
        tabBarOptions={{
          activeTintColor: '#000080',
          inactiveTintColor: 'grey',
          style: {
            backgroundColor: 'rgba(250, 250, 248, .2)',
          },
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Progress" component={ProgressScreen} />
        <Tab.Screen name="Challenges" component={ChallengeScreen} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

//App
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ header: () => null }}>
          <Stack.Screen name="Onboarding_1" component={Onboarding_1} />
          <Stack.Screen name="Onboarding_2" component={Onboarding_2} />
          <Stack.Screen name="Questions" component={Questionaire} />
          <Stack.Screen name="Mood" component={Mood} />
          <Stack.Screen name="Login" component={preLogin} />
          <Stack.Screen name="HomeApp" component={HomeApp} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

const Stack = createStackNavigator()

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  onboardingBtn: {
    fontSize: 18,
    color: '#fafafa',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  onboardingBtnContainer: {
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  BtnViewContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
  },
})
