import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import Aux from '../../../hoc/Auxillary';

const navigationItems=(props)=>{
	let navigate=<NavigationItem link="/auth">Authenticate</NavigationItem>
	if(props.authenticated){
		navigate=<Aux>
					<NavigationItem link="/orders">Orders</NavigationItem>
					<NavigationItem link="/logout">Logout</NavigationItem>
				</Aux>
		
	}
	return (
		<ul className={classes.NavigationItems}>
		<NavigationItem link="/" exact>Burger Builder</NavigationItem>
		{navigate}
	</ul>
	);
}


export default navigationItems;