import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from'./SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxillary';

const sideDrawer=(props)=>{
	let attachedClass=[classes.SideDrawer,classes.Close];
	if(props.show){
		attachedClass=[classes.SideDrawer,classes.Open];
	}
	return(
		<Aux>
			<Backdrop show={props.show} clicked={props.func}/>
			<div className={attachedClass.join(' ')}>
				<div className={classes.Logo}>
					<Logo/>
				</div>
				<nav>
					<NavigationItems authenticated={props.isAuth}/>
				</nav>
			</div>
		</Aux>
	);
}

export default sideDrawer;