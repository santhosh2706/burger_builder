import React,{Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios'; 
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandling from '../../hoc/withErrorHandling/withErrorHandling'; 
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

class Orders extends Component{

    componentDidMount(){
        this.props.fetchOrders(this.props.token,this.props.userId);
    }

    render(){
        let display=<Spinner/>;
        if(!this.props.loading){
            display=this.props.orders.map(order=>(
                    <Order key={order.id} 
                        ingredients={order.ingredients} 
                        price={order.price} />
                     ))
        }
        return (
            <div>
                {display}
            </div>
        );
    }
}

const mapStateToProps=state=>{
    return{
        orders:state.order.order,
        loading:state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        fetchOrders:(token,userId)=>dispatch(actions.fetchOrder(token,userId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandling(Orders,axios));