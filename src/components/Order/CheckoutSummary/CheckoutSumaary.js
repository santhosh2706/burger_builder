import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary =(props)=>{
    return(
        <div className={classes.CheckoutSummary}>
            <p>Here is your tasty burger!</p>
            <Burger ingredient={props.ingredients}/>
            <Button btnType="Danger" clicked={props.cancelCheckout}>CANCEL</Button>
            <Button btnType="Success" clicked={props.continueCheckout}>CONTINUE</Button>
        </div>

    );
}

export default checkoutSummary;