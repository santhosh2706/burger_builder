import * as actionTypes from '../actions/actionTypes';
import { updateObject} from '../utility';

const initialState={
    loading:false,
    token:null,
    userId:null,
    error:null
}

const authStart=(state,action)=>{
    return updateObject(state,{error:null,loading:true})
}

const authFail=(state,action)=>{
    return updateObject(state,{
        error:action.error,
        loading:false
    })
}

const authLogout=(state,action)=>{
    return updateObject(state,{
        token:null,
        userId:null
    })
}

const authSuccess=(state,action)=>{
    
    return updateObject(state,{
        error:null,
        token:action.token,
        userId:action.userId,
        loading:false
    })
}

const reducer =(state=initialState,action)=>{
    switch (action.type){
        case (actionTypes.AUTH_LOGOUT): return authLogout(state,action);
        case (actionTypes.AUTH_START): return authStart(state,action);
        case (actionTypes.AUTH_FAIL): return authFail(state,action);
        case (actionTypes.AUTH_SUCCESS): return authSuccess(state,action);
        default: return state;
    }
}

export default reducer;