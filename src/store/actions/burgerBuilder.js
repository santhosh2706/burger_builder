import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const addIngredient=(ingName)=>{
    return {
        type:actionTypes.ADD_INGREDIENT,
        ingredientName:ingName
    }
}

export const removeIngredient=(ingName)=>{
    return{
        type:actionTypes.REMOVE_INGREDIENT,
        ingredientName:ingName
    }
}

export const setIngredients=(ingredients)=>{
    return{
        type:actionTypes.SET_INGREDIENT,
        ingredients:ingredients
    }
}

export const fetchIngredientFailed=()=>{
    return{
        type:actionTypes.FETCH_INGREDIENT_FAILED
    }
}

export const fetchIngredientStart=()=>{
    return{
        type:actionTypes.FETCH_INGREDIENT_START
    }
}

export const initIngredients =()=>{
    return dispatch=>{
        dispatch(fetchIngredientStart())
        axios.get('/ingredient.json')
			.then(response=>{
				dispatch(setIngredients(response.data))
            })
            .catch(error=>{
                dispatch(fetchIngredientFailed)
			});
    }
}