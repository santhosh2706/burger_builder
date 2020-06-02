import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {Route,Switch,withRouter} from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

class App extends Component {

  componentDidMount(){
    this.props.checkState();
  }

  render() {
    let route=(
      <Switch>
        <Route path='/auth' component={Auth}/>
        <Route path='/' component={BurgerBuilder}/>
      </Switch>
    );

    if(this.props.isAuth){
      route=(
        <Switch>
           <Route path='/checkout' component={Checkout}/>
           <Route path='/orders' component={Orders}/>
           <Route path='/logout' component={Logout}/>
           <Route path='/auth' component={Auth}/>
           <Route path='/' component={BurgerBuilder}/>
        </Switch>
      );
    }
    return (
      <div>
        <Layout>
          {route}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps=state=>{
  return{
    isAuth:state.auth.token!==null
  }
}

const mapDispatchToProps=dispatch=>{
  return{
    checkState:()=>dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
