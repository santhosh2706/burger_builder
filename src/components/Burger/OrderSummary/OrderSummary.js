import React from 'react';
import Aux from '../../../hoc/Auxillary'
import Button from '../../UI/Button/Button'

const orderSummary=(props)=>{
	const finalIngredients=Object.keys(props.ingredients)
							.map(igKey=> {
								return (
									props.ingredients[igKey]!==0 ?
										<li key={igKey} >
											<span style={{textTransform:'capitalize'}}>{igKey}
											</span>: {props.ingredients[igKey]}
										</li> : null
									);
							});
	return (
		<Aux>
			<h3>Order Summary</h3>
			<h4 >Your Burger Ingredients:</h4>
			{finalIngredients}
			<h4>Total Amount: Rs.{props.price}</h4>
			<h4>Checkout?</h4>
			<Button btnType="Danger" clicked={props.modalClosed}>CANCEL</Button>
			<Button btnType="Success" clicked={props.checkout}>CONTINUE</Button>
		</Aux>
	);
}

export default orderSummary;