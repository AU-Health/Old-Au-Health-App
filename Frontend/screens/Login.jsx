import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Image, TextInput, SafeAreaView } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Header, Text, Divider, Label } from 'react-native-elements';
import _ from 'lodash';


export default class Login extends React.Component {
	state = {
		username: '',
		password: '',

	}

	handleUsernameChange = (tu) => {
		console.log(tu);
		this.setState({ username: tu.value })
	}
	handlePasswordChange = (tp) =>{
		this.setState({ password: tp.value})
	}

	render() {

		return (
			<SafeAreaView>
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<Image style={{ width: '150px', height: '150px' }} source={require('../assets/eaglelogo.png')} />
					<br/>
					<Text h5><b>Login</b></Text>
					<br/><br/>
					<Text style={{alignSelf: 'baseline'}}>Username</Text>
					<TextInput
						style={{ height: 40, borderColor: 'black', borderWidth: 2, borderRadius: 2 }}
						placeholder=' username'
						onChangeText={text => this.handleUsernameChange(text)}
					/>
					<br/>
					<Text style={{alignSelf: 'baseline'}}>Password</Text>
					<TextInput
						style={{ height: 40, borderColor: 'black', borderWidth: 2, borderRadius: 2 }}
						label='password'
						placeholder=' password'
						onChangeText={text => this.handlePasswordChange(text)}
					/>
					<br />
					<br />
					<a href='www.google.com' style={{textDecoration: 'none'}}>Forgot your password?</a>
				</View>
			</SafeAreaView>
		);
	}
}
