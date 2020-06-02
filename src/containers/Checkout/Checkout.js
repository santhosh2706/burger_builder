import React,{Component} from 'react';
import {connect} from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSumaary';
import {Route,Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component{


   
    checkoutCancelHandler=()=>{
        console.log(this.props);
        this.props.history.goBack();
    }

    checkoutContinueHandler=()=>{
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        let summary=<Redirect to="/"/>
        if(this.props.ingredient){
            const redirection=this.props.purchased?<Redirect to="/"/>:null;
            summary=<div><CheckoutSummary 
                        cancelCheckout={this.checkoutCancelHandler}
                        continueCheckout={this.checkoutContinueHandler}
                        ingredients={this.props.ingredient}/>
                        <Route path={this.props.match.path+'/contact-data'} component={ContactData}/>
                        {redirection}
                    </div>
        }
        return summary;
            
    }
}

const mapStateToProps=state=>{
    return {
        ingredient: state.burgerBuilder.ingredients,
        purchased:state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);