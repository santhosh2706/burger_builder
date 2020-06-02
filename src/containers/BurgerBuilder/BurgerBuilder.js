import React,{Component} from 'react';
import {connect} from 'react-redux';
import Aux from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandling from '../../hoc/withErrorHandling/withErrorHandling';
import * as actionCreators  from '../../store/actions/index';

class BurgerBuilder extends Component{

	state = {
		orderPlaced:false,
		loading:false,
		error:false
	}

	componentDidMount(){
		this.props.onInitIngredient();
	}
		
	

	placeOrderHandler=()=>{
		if(this.props.isAuthenticated){
			this.setState({orderPlaced:true});
		}else{
			this.props.history.push('/auth');
		}
		
	}

	orderCanceledHandler=()=>{
		this.setState({orderPlaced:false});
	}

	updateOrderButton=()=>{
		const ingredients={...this.props.ings};
		const sum=Object.keys(ingredients)
					.map(igKey=>{
						return ingredients[igKey];
					})
					.reduce((sum,el)=>{
						return sum+el;
					},0);
		
		return sum>0
	}

	orderCheckoutHandler=()=>{
		this.props.onInitPurchase();
		this.props.history.push('/checkout');
		
	}

	render(){
		const disabledInfo={...this.props.ings};
		let sum=0;
		for (let key in disabledInfo){
			sum=sum+disabledInfo[key];
			disabledInfo[key]=disabledInfo[key]===0;
		}
		let orderSummary=null;
		let burger=this.props.error? <p style={{textAlign:"center",paddingTop:'30%'}}>Oops! The burger builder couldn't be loaded</p>:<Spinner/>;
		if(this.props.ings){
			burger=<Aux>
				<Burger ingredient={this.props.ings} />
					<BuildControls
						isAuth={this.props.isAuthenticated}
						price={this.props.total}
						add={this.props.onIngredientAdded}
						remove={this.props.onIngredientRemoved}
						disabled={disabledInfo}
						purchasable={this.updateOrderButton()}
						orderPlaced={this.placeOrderHandler}
					/>
				</Aux>
			orderSummary=<OrderSummary 
				ingredients={this.props.ings} 
				price={this.props.total} 
				modalClosed={this.orderCanceledHandler}
				checkout={this.orderCheckoutHandler}/>
		}
		

		return(
			<Aux>
				<Modal show={this.state.orderPlaced} modalClosed={this.orderCanceledHandler}>
					{orderSummary}
				</Modal>
				{burger}
			</Aux>
		);
	}
}

const mapStatetToProps=state=>{
	return {
		ings: state.burgerBuilder.ingredients,
		total: state.burgerBuilder.total,
		error:state.burgerBuilder.error,
		isAuthenticated:state.auth.token!==null
	}
}

const mapDispatchToProps=dispatch=>{
	return {
		onIngredientAdded: (ingName)=>dispatch(actionCreators.addIngredient(ingName)),
		onIngredientRemoved: (ingName)=>dispatch(actionCreators.removeIngredient(ingName)),
		onInitIngredient: ()=>dispatch(actionCreators.initIngredients()),
		onInitPurchase:()=>dispatch(actionCreators.purchaseInit())
	}
}

export default connect(mapStatetToProps,mapDispatchToProps)(withErrorHandling(BurgerBuilder,axios));