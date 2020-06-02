import React,{Component} from 'react';
import Aux from '../../hoc/Auxillary';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';

class Layout extends Component{

	state={
		showSideDrawer:false
	}

	sideDrawerClosed=()=>{
		this.setState({showSideDrawer:false});
	}

	drawerToggleHandler=()=>{
		const newSide=!this.state.showSideDrawer;
		this.setState({showSideDrawer:newSide});
	}

	render(){

		return (
			<Aux>
				<Toolbar 
				isAuth={this.props.authenticated}
				clicked={this.drawerToggleHandler}/>
				<SideDrawer show={this.state.showSideDrawer} func={this.sideDrawerClosed}/>
				<main className={classes.Content}>
					{this.props.children}
				</main>
			</Aux>
		);
	}
}

const mapStateToProps=state=>{
	return{
		authenticated: state.auth.token!=null
	}
}

export default connect(mapStateToProps)(Layout);
