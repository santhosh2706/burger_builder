import React from 'react';
//import Aux from '../../hoc/Auxillary';
import BurgerIngredients from './BurgerIngredients/Burgeringredients';
import classes from './Burger.css' 

const burger =(props) =>{

	let transformedIngredients = Object.keys(props.ingredient)
		.map(igKey=>{
			return [...Array(props.ingredient[igKey])]
		.map((_,i)=>{
			return <BurgerIngredients type={igKey} key={igKey+i}/>
		});
		}).reduce((arr,el)=>{
			return arr.concat(el);
		},[]);

	if(transformedIngredients.length===0){
		transformedIngredients= <p>Please add some ingredients!</p>
	}

	return (
		<div className={classes.Back}>
			<div className={classes.Burger}>
				<BurgerIngredients type='bread-top'/>
					{transformedIngredients}
				<BurgerIngredients type='bread-bottom'/>
			</div>
		</div>

	);
}

export default burger;