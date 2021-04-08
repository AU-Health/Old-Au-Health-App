import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Image, Button, TextInput, SafeAreaView } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { Input, Header, Text, Label, Icon } from 'react-native-elements';
import _ from 'lodash';
import { connect } from "react-redux";
import { onUserLogin, onFetchProduct } from '../redux';
//import { onFetchProduct } from '../redux';
import { Divider } from 'react-native-paper';



class Login extends React.Component {
	state = {
		username: '',
		password: '',
		signup: false,
		loginLink: 'Login',


	}

	handleUsernameChange = (tu) => {
		this.setState({ username: tu.value })
	}
	handlePasswordChange = (tp) => {
		this.setState({ password: tp.value })
	}
	handleLoginPress = () => {
		console.log('logging in');
		//grab information from the username and password state. check the states against what is in database
		//store the username in redux to remember the username
		let usernameFinal = this.state.username;
		let passwordFinal = this.state.password;
		//once you login we want redux to remember your username and take you to the home page

	}
	handleSignUpPress = () => {
		console.log('you sign up');
		//fetch call to database through redux to post
	}
	render() {

		return (
			<SafeAreaView style={styles.container}>
				<View style={{ flex: 1, justifyContent: 'center' }}>

					<View style={{ flex: 2, alignItems: 'center', marginTop: '10%' }}>
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
									onPress={this.handleSignUpPress()}
									title="Signup"
								/>
							</View>
							<View style={{ flex: 2, justifyContent: 'center' }}>
								<Text>Already have an account?</Text>
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
									inputContainerStyle={{ width: '50%' }}
									onChangeText={text => this.handleUsernameChange(text)}
								/>


								<Input
									labelStyle={{ color: 'black' }}
									label='Password'
									placeholder='******'
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
								<Text>Don't have an account?</Text>
								<Button raised={true} color='#f46036' title='Sign-up' onPress={() => { this.setState({ signup: true }) }} />

								<Text>Forgot password?</Text>
								<Button raised={true} color='#f46036' title='Send email' />
							</View>

						</View>}

				</View>
			</SafeAreaView>
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



