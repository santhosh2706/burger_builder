import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart=()=>{
    return{
        type:actionTypes.AUTH_START
    }
}

export const authFail=(error)=>{
    return{
        type:actionTypes.AUTH_FAIL,
        error:error
        
    }
}

export const authSuccess=(token,userId)=>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        token:token,
        userId:userId
    }
}

export const authLogout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
    return{
        type:actionTypes.AUTH_LOGOUT
    }
}

export const checkTimeout=(expirationTime)=>{
    return dispatch=>{
        setTimeout(()=>{
            dispatch(authLogout)
        },expirationTime*1000)
    }
}

export const auth=(email,password,isSignup)=>{
    const payload={
        email:email,
        password:password,
        returnSecureToken:true
    }
    let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB5vcafAk0zFJg0WCbwl7RT-ib0HEeOtrU';
    if(!isSignup){
        url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB5vcafAk0zFJg0WCbwl7RT-ib0HEeOtrU';
    }
    return dispatch=>{
        dispatch(authStart());
        axios.post(url,payload)
        .then(response=>{
            const expire=new Date(new Date().getTime() + response.data.expiresIn*1000);
            localStorage.setItem('token',response.data.idToken);
            localStorage.setItem('expirationDate',expire);
            localStorage.setItem('userId',response.data.localId);
            dispatch(authSuccess(response.data.idToken,response.data.localId));
            dispatch(checkTimeout(response.data.expiresIn))
        })
        .catch(error=>{
            dispatch(authFail(error.response.data.error));
        })
    }
}

export const authCheckState=()=>{
    return dispatch=>{
        const token=localStorage.getItem('token');
        if(!token){
                dispatch(authLogout());
        }else{
            const expirationDate=new Date(localStorage.getItem('expirationDate'));
            if(expirationDate>new Date()){
                    const userId=localStorage.getItem('userId');
                    dispatch(authSuccess(token,userId));
                    dispatch(checkTimeout((expirationDate.getTime()-new Date().getTime())/1000)); 
            }else{
                    dispatch(authLogout());
            }
        }
    }
    
}