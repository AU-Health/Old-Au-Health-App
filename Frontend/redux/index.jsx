import axios from "axios";
import thunk from 'redux-thunk';
import { combineReducers, createStore, applyMiddleware } from "redux";
import _ from 'lodash';



let truths = [];
const FETCH_TRUTHS_BEGIN = "FETCH_TRUTHS_BEGIN";
const FETCH_TRUTHS_SUCCESS = "FETCH_TRUTHS_SUCCESS";
const FETCH_TRUTHS_FAILURE = "FETCH_TRUTHS_FAILURE";
//actions
/* export const onUserLogin = (email, password) =>{
	return async (dispatch) =>{
		try{
			const response = await axios.post('URL', {email, password});
			dispatch({type: 'DO_LOGIN', payload: response.data});
		}
		catch (error) {
			dispatch({type: 'ON_ERROR', payload: error});
		}
	};
}; */

function makeTempJSON() {
	fetch('https://jsonplaceholder.typicode.com/posts', {
		method: 'POST',
		body: JSON.stringify({
			"status": "ok",
			"task": {
				"TruthId": 10,
				"Description": "How many hours a travel",
				"Points": 55,
				"CategoryId": 6,
				"MinPointsNeeded": 40,
				"HoursToComplete": 3,
				"SentNum": 1,
				"CompleteNum": 0,
				"CategoryName": "Sleep"
			}
		}),
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
	})
		.then((response) => response.json())
		.then((json) => console.log(json));
}

function getTruths(categoryName) {
	const url = 'http://192.168.1.10:3000/dares-truths-questions/task/truth/' + categoryName;
	const url2 = 'https://mocki.io/v1/9f7ce101-f5df-4460-9d21-c3ef0d4b84b5'
	//YOU HAVE TO SWITCH THE URL TO URL...URL2 IS MY FAKE JSON PAGE

	fetch(url2, {
		withCredentials: true,
		credentials: 'include',
		headers: {
			//swtich the access token to the actual state of the token
			'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNjgzOWVkMWYtYTRhZS0xMWViLWEzOWYtMjA0NzQ3ZDMyZjk3IiwiaXNBZG1pbiI6dHJ1ZSwiaXNWZXJpZmllZCI6MSwiY29uc2VudFNpZ25lZCI6MCwiaWF0IjoxNjE5NDYyMDY0LCJleHAiOjE2MTk0NzI4NjR9.1zK0TlRbtuKdUsyYwzp0SGqDqjPev0RP6SoWT12x6GM"
		},
	}).then(response => response.json())
		.then(response => {
			console.log("RESP BODY line 41 ", response);
			truths.push(response)
		})
		.catch(error => {
			console.log("There was an error, " + error);
		})
}



function fakeGetTruths(categoryName) {

	getTruths(categoryName)
	return new Promise(resolve => {
		// Resolve after a timeout so we can see the loading indicator
		setTimeout(
			() =>
				resolve({
					truths
				}),
			300
		);
	});
}

export function fetchTruthsCat(categoryName) {
	return dispatch => {
		dispatch({ type: 'FETCH_TRUTHS_BEGIN' });
		console.log("Category name line 65", categoryName);
		return fakeGetTruths(categoryName)
			.then(json => {
				console.log('line 68', json.truths[0]);
				dispatch({ type: 'FETCH_TRUTHS_SUCCESS', payload: json.truths[0]});
				return json;
			})
			.catch(error =>
				dispatch({ type: 'FETCH_TRUTHS_FAILURE', payload: error })
			);
	};
};

//reducers
const initialState = {
	items: [],
	loading: false,
	error: null
};

const userReducer = (action, state = initialState) => {
	switch (action) {
		case FETCH_TRUTHS_BEGIN:
			return {
				...state,
				loading: true,
				error: null,
			};

		case FETCH_TRUTHS_SUCCESS:
			// All done: set loading "false".
			// Also, replace the items with the ones from the server
			return {
				...state,
				loading: false,
				items: action.payload
			};

		case FETCH_TRUTHS_FAILURE:

			return {
				...state,
				loading: false,
				error: action.payload,
				items: []
			};


		case 'DO_LOGIN':
			return {
				...state,
				user: action.payload,
			};
		case 'FETCH_PRODUCTS':
			return {
				...state,
				products: action.payload,
			};
		case 'ON_ERROR':
			return {
				...state,
				appError: action.payload,
			};
		default:
			return state;
	}
}

//root reducers
export const rootReducer = combineReducers({
	truthsReducer: userReducer,
})

//store
export const store = createStore(rootReducer, applyMiddleware(thunk))
