//actions

import axios from "axios";
import thunk from 'redux-thunk';
import { combineReducers, createStore, applyMiddleware } from "redux";

export const onUserLogin = (email, password) =>{
	return async (dispatch) =>{
		try{
			const response = await axios.post('URL', {email, password});
			dispatch({type: 'DO_LOGIN', payload: response.data});
		}
		catch (error) {
			dispatch({type: 'ON_ERROR', payload: error});
		}
	};
};

export const onFetchProduct = () =>{
	return async (dispatch) =>{
		try{
			const response = {
				data: [
					{name: 'Macbook Pro', price: '$1500'},
					{name: 'Iphone', price: '$400'}
				],
			};
			dispatch({type: 'FETCH_PRODUCTS', payload: response.data});
		}
		catch (error){
			dispatch({type: 'ON_ERROR', payload: error})
		}
	};
};

//reducers

const userReducer = (state = {}, action) => {
	switch (action.payload){
		case 'DO_LOGIN':
			return{
				...state, 
				user: action.payload,
			};
		case 'FETCH_PRODUCTS':
			return {
				...state, 
				products: action.payload,
			};
		case 'ON_ERROR':
			return{
				...state,
				appError: action.payload,
			};
		default:
			return state;
	}
}

//root reducers
export const rootReducer = combineReducers({
	LoginReducer: userReducer,
})

//store
export const store = createStore(rootReducer, applyMiddleware(thunk))
