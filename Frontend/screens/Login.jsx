import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Image, Button, TextInput, SafeAreaView, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { Input, Header, Text, Label, Icon } from 'react-native-elements';
import _ from 'lodash';
import { connect } from "react-redux";
import { onUserLogin, onFetchProduct } from '../redux';
//import { onFetchProduct } from '../redux';




class Login extends React.Component {
	state = {
		username: '',
		password: '',
		signup: false,
		loginLink: 'Login',


	}

	handleUsernameChange = (tu) => {
		this.setState({ username: tu })
	}
	handlePasswordChange = (tp) => {
		this.setState({ password: tp})

	}
	handleLoginPress = () => {
		console.log('logging in');
		//grab information from the username and password state. check the states against what is in database
		//store the username in redux to remember the username
		let userCreds = {
			"email": this.state.username,
			"password" : this.state.password,
			}

		let url = 'http://192.168.1.10:3000/authentication/login'
		fetch(url, {
			method: 'POST',
			withCredentials: true,
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
        	},
			body: JSON.stringify(userCreds)
    	}).then(responseJson => {
			console.log("SUCCESS");
			responseJson.json().then(data=>{
				console.log(data);
			})
    	})
		.catch(error => {
			console.log("ERROR!!"+error);
		})


		//once you login we want redux to remember your username and take you to the home page

	}

	//sign up the user
	handleSignUpPress = () => {
			let userCreds = {
			"email": this.state.username,
			"password" : this.state.password,
			"isAdmin" : true
			}

		let url = 'http://192.168.1.10:3000/authentication/user_create'
		fetch(url, {
			method: 'POST',
			withCredentials: true,
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
        	},
			body: JSON.stringify(userCreds)
    	}).then(responseJson => {
			console.log("SUCCESS");
			responseJson.json().then(data=>{
				console.log(data);
			})
    	})
		.catch(error => {
			console.log("ERROR!!"+error);
		})

	}


	render() {

		return (
			<KeyboardAvoidingView
				 behavior={Platform.OS === "ios" ? "padding" : null}
	
				 style={{ flex: 1 }}
				// note to self have to fix keyboard error
				>
			<SafeAreaView style={styles.container}>
				<View style={{ flex: 1, justifyContent: 'center' }}>

					<View style={{ flex: 2, alignItems: 'center', marginTop: '15%' }}>
						<Image style={{ width: 150, height: 150 }} source={require('../assets/aucares.png')} />
						<Text h3> Welcome!</Text>
					</View>


					{(this.state.signup === true) ?

						//signup
						<View style={{ flex: 4, alignItems: 'center' }}>
							<View style={{ flex: 2, justifyContent: 'flex-end' }}>
								<Input
									labelStyle={{ color: 'black' }}
									label='Username'
									placeholder='email@mail.com'
									inputContainerStyle={{ width: '50%' }}
									onChangeText={text => this.handleUsernameChange(text)}
								/>

								<Input
									labelStyle={{ color: 'black' }}
									label='Password'
									secureTextEntry={true}
									placeholder='*******'
									inputContainerStyle={{ width: '50%' }}
									onChangeText={text => this.handlePasswordChange(text)}
								/>


								<Button
									raised={true}
									color='#f46036'
									onPress={this.handleSignUpPress}
									title="Signup"
								/>
							</View>
							<View style={{ flex: 2, justifyContent: 'center' }}>
								<Text style={{textAlign:'center'}}>Already have an account?</Text>
								<Button raised={true} color='#f46036' title='Login' onPress={() => { this.setState({ signup: false }) }} />
							</View>

						</View>

						:

								//shows login
								<View style={{ flex: 4, alignItems: 'center' }}>
									<View style={{ flex: 2, justifyContent: 'flex-end' }}>
									
										<Input
											
											labelStyle={{ color: 'black' }}
											label='Username'
											placeholder='email@mail.com'
											inputContainerStyle={{ width: '50%'}}
											onChangeText={text => this.handleUsernameChange(text)}
										/>


										<Input
											labelStyle={{ color: 'black' }}
											label='Password'
											placeholder='******'
											secureTextEntry={true}
											inputContainerStyle={{ width: '50%' }}
											onChangeText={text => this.handlePasswordChange(text)}
										/>

										<Button
											color='#f46036'
											raised={true}
											onPress={this.handleLoginPress}
											title="Login"
										/>
									</View>

									<View style={{ flex: 2, justifyContent: 'center' }}>
										<Text style={{ textAlign: 'center' }}>Don't have an account?</Text>
										<Button raised={true} color='#f46036' title='Sign-up' onPress={() => { this.setState({ signup: true }) }} />

										<Text style={{ textAlign: 'center' }}> {'\n'}Forgot password?</Text>
										<Button raised={true} color='#f46036' title='Send email' />
									</View>

								</View>}

						</View>
				
				
			</SafeAreaView>
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,




	},
});


const mapStateToProps = state => ({
	//myReducer: state.myReducer,
	// reviews: state.reviews.items,
	// reviewsError: state.reviews.error,
	// reviewsLoading: state.reviews.loading,
});

const mapDispatchToProps = (dispatch) => {
	return {
		// fetchCompanies: () => dispatch(fetchProducts()),

	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)

//https://www.youtube.com/watch?v=qdAzeYAfQlY&ab_channel=JGogoi



