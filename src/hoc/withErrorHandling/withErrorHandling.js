import React,{Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxillary';

const withErrorHandling =(WrappedComponent,axios)=>{
    return class extends Component{
        state={
            error:null
        }

        errorConfirmHandler=()=>{
            this.setState({error:null});
        }

        componentWillMount(){
            this.req=axios.interceptors.request.use(req=>{
                this.setState({error:null});
                return req;
            })
            this.res=axios.interceptors.response.use(res=>res,error=>{
                this.setState({error:error});
            })
        }

        componentWillUnmount=()=>{
            axios.interceptors.request.eject(this.req);
            axios.interceptors.response.eject(this.res);
        }
        render(){
            return(
                <Aux>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmHandler}>
                        <div>{this.state.error?this.state.error.message:null}</div>
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
                
            );
        }
    }
}

export default withErrorHandling;