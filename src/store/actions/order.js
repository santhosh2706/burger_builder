import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const purchaseSuccess=(id,orderData)=>{
    return {
        type:actionTypes.PURCHASE_SUCCESS,
        orderId:id,
        orderData:orderData
    }
}
export const purchaseFail=(error)=>{
    return{
        type:actionTypes.PURCHASE_FAIL,
        error:error
    }
}

export const purchaseStart=()=>{
    return{
        type:actionTypes.PURCHASE_START
    }
}

export const purchase=(order,token)=>{
    return dispatch=>{
        dispatch(purchaseStart());
        axios.post('/orders.json?auth='+token,order)
        .then(response=>{
            dispatch(purchaseSuccess(response.data.name,order))
        })
		.catch(error=>{
            dispatch(purchaseFail(error))
        });
    }
}

export const purchaseInit=()=>{
    return{
        type:actionTypes.PURCHASE_INIT
    }
}

export const fetchOrderStart=()=>{
    return{
        type:actionTypes.FETCH_ORDER_START
    }
}

export const fetchOrderSuccess=(orders)=>{
    return{
        type:actionTypes.FETCH_ORDER_SUCCESS,
        order:orders
    }
}

export const fetchOrderFail=(error)=>{
    return{
        type:actionTypes.FETCH_ORDER_FAIL,
        error:error
    }
}

export const fetchOrder=(token,userId)=>{
    return dispatch=>{
        dispatch(fetchOrderStart());
        const queryParams='?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"';
        axios.get('/orders.json'+queryParams)
        .then(response=>{
            let fetchedOrders= [];
            for(let key in response.data){
                fetchedOrders.push({
                    ...response.data[key],
                    id:key
                })
            }
            dispatch(fetchOrderSuccess(fetchedOrders));
        }).catch(err=>{
            dispatch(fetchOrderFail(err));
        }) 
    }
}