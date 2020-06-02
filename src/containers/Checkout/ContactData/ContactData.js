import React,{Component} from 'react';
import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandling/withErrorHandling';
import * as actions from '../../../store/actions/index';

class ContactData extends Component{
    state={
        orderForm:{
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            mail:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your E-Mail'
                },
                value:'',
                validation:{
                    required:true,
                    isEmail:true
                },
                valid:false,
                touched:false
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            zipcode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Zipcode'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:6,
                    maxLength:6,
                    isNumeric:true
                },
                valid:false,
                touched:false
            },
            delivery_method:{
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'fastest',displayValue:'Fastest'},
                        {value:'cheapest',displayValue:'Cheapest'}
                    ]
                },
                validation:null,
                value:'fastest',
                valid:true,
                touched:true
            }
        },
        formValid:false        
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

    inputChangedHandler=(event,id)=>{
        const updatedForm={
            ...this.state.orderForm
        } 
        const updatedFormElement={
            ...updatedForm[id]
        }
        updatedFormElement.value=event.target.value;
        
        updatedFormElement.valid= this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
        updatedFormElement.touched=true;
        updatedForm[id]=updatedFormElement;
        let form=true;
        for(let input in updatedForm){
            form=updatedForm[input].valid&&form;
        }
        updatedForm[id]=updatedFormElement;
        this.setState({
            orderForm:updatedForm,
            formValid:form
        })
    }

    

    orderHandler=(event)=>{
        event.preventDefault();
        const formData={};
        for(let key in this.state.orderForm){
            formData[key]=this.state.orderForm[key].value
        }
		const order={
            userId:this.props.userId,
			ingredients:this.props.ingredient,
			price:this.props.price,
			customer:formData
		}
		this.props.orderNow(order,this.props.token);
    }

    render(){
        let formElements=[];
        for(let key in this.state.orderForm){
            formElements.push({
                id:key,
                config:this.state.orderForm[key]
            })
        }
        let form=(<form>
                {formElements.map(element=>(
                    <Input key={element.id}
                        elementType={element.config.elementType}
                        elementConfig={element.config.elementConfig}
                        value={element.config.value}
                        invalid={!element.config.valid}
                        touched={element.config.touched}
                        validation={element.config.validation}
                        changed={(event)=>this.inputChangedHandler(event,element.id)}/>
                )
                )}
                <Button disabled={!this.state.formValid} btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>);
        if(this.props.loading){
            form=<Spinner/>
        }
        return (
            <div className={classes.ContactData}>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state=>{
    return {
        ingredient:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.total,
        loading: state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
}


const mapDispatchToProps=dispatch=>{
    return {
        orderNow:(order,token)=>dispatch(actions.purchase(order,token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));