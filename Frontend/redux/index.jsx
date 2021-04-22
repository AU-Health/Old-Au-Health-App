import axios from "axios";
import thunk from 'redux-thunk';
import { combineReducers, createStore, applyMiddleware } from "redux";




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

function getTruths() {
	// 	fetch("http://localhost:4000/companies")
	// 	  .then(handleErrors)
	// 	  .then(res => res.json())
	// 	  .then(_ = (res) => {
	// 		companyResults = Object.values(res.data);

	// 		for (co = 0; co < companyResults.length + 1; co++){
	// 			if (companyResults && companyResults[co] && companyResults[co].companyName){
	// 			innerProduct = {
	// 				companyName: companyResults[co].companyName,
	// 				numOfRatings: companyResults[co].numOfRatings,
	// 				overallRatingGrade: companyResults[co].overallRatingGrade,
	// 				imgLogoUrl: companyResults[co].imgLogoUrl
	// 			}
	// 			if (products.length < companyResults.length) {
	// 				products.push(innerProduct);
	// 			  }
	// 		}
	// 		else{

	// 		}
	// 	}

	//   })
}
function fakeGetTruths() {
	getTruths()
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

export function fetchTruths() {
	return dispatch => {
		dispatch({ type: 'FETCH_TRUTHS_BEGIN', payload: response.data });
		return fakeGetTruths()
		//   .then(json => {
		// 	dispatch(fetchTruthsSuccess(json.products));
		// 	return json.products;
		//   })
		//   .catch(error =>
		// 	dispatch(fetchProductsFailure(error))
		//   );
	};
};

//reducers

const userReducer = (state = {}, action) => {
	switch (action.payload) {
		case FETCH_TRUTHS_BEGIN:
			return {
				...state,
				loading: true,
				error: null
			};

		case FETCH_TRUTHS_SUCCESS:
			// All done: set loading "false".
			// Also, replace the items with the ones from the server
			return {
				...state,
				loading: false,
				items: action.payload.products
			};

		case FETCH_TRUTHS_FAILURE:

			return {
				...state,
				loading: false,
				error: action.payload.error,
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
