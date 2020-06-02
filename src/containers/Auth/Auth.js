import React,{Component} from 'react';
import classes from './Auth.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import { Redirect } from 'react-router-dom';

class Auth extends Component{

    state={
        controls:{
            mail:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your E-Mail Address'
                },
                value:'',
                validation:{
                    required:true,
                    isEmail:true
                },
                valid:false,
                touched:false
            },
            password:{
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'Your Password'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:8
                },
                valid:false,
                touched:false
            }
        },
        isSignup:true
    }


    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    submitHandler=(event)=>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.mail.value,this.state.controls.password.value,this.state.isSignup);
    }

    switchHandler=()=>{

        this.setState(prevState=>{
            return {isSignup:!prevState.isSignup};
        })
           
    }

    inputChangedHandler=(event,id)=>{
        const updatedInput={
            ...this.state.controls,
            [id]:{
                ...this.state.controls[id],
                value: event.target.value,
                touched:true,
                valid:this.checkValidity(event.target.value,this.state.controls[id].validation)
            }
        } 
        this.setState({controls:updatedInput});
    }

    render(){
        let formElements=[];
        for(let key in this.state.controls){
            formElements.push({
                id:key,
                config:this.state.controls[key]
            })
        }

        let form=(<form onSubmit={this.submitHandler}>
            {formElements.map(element=>(
                <Input 
                    key={element.id} 
                    elementType={element.config.elementType}
                    elementConfig={element.config.elementConfig}
                    value={element.config.value}
                    invalid={!element.config.valid}
                    touched={element.config.touched}
                    validation={element.config.validation}
                    changed={(event)=>this.inputChangedHandler(event,element.id)}/>
            )
            )}
        </form>);

        if(this.props.loading){
            form=<Spinner/>
        }

        let errorMessage=null;
        if(this.props.error){
            errorMessage=<p style={{color:'red'}}>{this.props.error.message}</p>
        }

        let display= <div className={classes.Auth}>
                        {errorMessage}
                        {form}
                        <Button btnType="Success" clicked={this.submitHandler}>SUBMIT</Button>
                        <Button btnType="Danger" clicked={this.switchHandler}>SWITCH TO {this.state.isSignup? "SIGN IN" : "SIGN UP"}</Button>
                    </div>
        if(this.props.authenticated){
            if(this.props.building){
                display=<Redirect to="/checkout"/>
            }else{
                display=<Redirect to="/"/>
            }
        }

        return display;
    }

}

const mapStateToProps=state=>{
    return{
        loading:state.auth.loading,
        error:state.auth.error,
        authenticated:state.auth.token!==null,
        building:state.burgerBuilder.building
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        onAuth:(email,password,isSignup)=>dispatch(actions.auth(email,password,isSignup))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);