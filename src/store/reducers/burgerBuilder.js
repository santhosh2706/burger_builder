import * as action_types from '../actions/actionTypes';

const initialState={
    ingredients:null,
    total:10,
    error:false,
    loading:false,
    building:false
}

const INGREDIENT_PRICES={
	salad:15,
	cheese:10,
	meat:25,
	bacon:20
}

const reducer=(state=initialState,action)=>{

    switch(action.type){
        case (action_types.ADD_INGREDIENT):
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]+1
                },
                total: state.total+INGREDIENT_PRICES[action.ingredientName],
                building:true
            }
        case (action_types.REMOVE_INGREDIENT):
            return {
                ...state,     
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]-1
                },
                total: state.total-INGREDIENT_PRICES[action.ingredientName],
                building:true
            }
        case (action_types.SET_INGREDIENT):
            return{
                ...state,
                ingredients:{
                    salad: action.ingredients.salad,
                    bacon:action.ingredients.bacon,
                    cheese:action.ingredients.cheese,
                    meat:action.ingredients.meat
                },
                error:false,
                total:10,
                loading:false,
                building:false
            }
        case (action_types.FETCH_INGREDIENT_FAILED):
            return {
                ...state,
                error:true,
                loading:false
            }
        case(action_types.FETCH_INGREDIENT_START):
            return{
                ...state,
                loading:true
            }
        default:
            return state;
    }

}

export default reducer;