import axios from 'axios';
import React from 'react';
import { withRouter } from 'react-router';
import './Authenticate.css';
import * as Service from '../../service/Authentication' ;
import Aos from 'aos';
import "aos/dist/aos.css";

class SignUp extends React.Component{
    baseapiURL = "http://localhost/forum/home/signup.php";
    loginbaseapiURL = "http://localhost/forum/home/login.php"
    formGroupControls = [
        {'name': 'name', 'type': 'text', 'id': 'Name'},
        {'name': 'username', 'type': 'text', 'id': 'userName'},
        {'name': 'email', 'type': 'email','id': 'userEmail'},
        {'name': 'password', 'type': 'password','id': 'userPassword'}
    ];
    loginFormControls = [
        {'name': 'email', 'type': 'email','id': 'loginEmail'},
        {'name': 'password', 'type': 'password','id': 'loginPassword'} 
    ];
    constructor(props){
        super(props)
        this.state = {'name': '','username': '', 'email': '', 'password': ''};
         this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.sendRequest = this.sendRequest.bind(this);
        this.login = this.login.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }
    componentDidMount(){
        if(Service.isAuthenticated()){
            this.props.history.push('/forum');
        }
        Aos.init({
            duration: 1000
        })
        Aos.refresh();
    }
    componentDidUpdate(){
        if(Service.isAuthenticated()){
            this.props.history.push('/forum');
        }
    }
    sendRequest(){
        let form = new FormData()
        form.append('name', this.state.name)
        form.append('username', this.state.username)
        form.append('email', this.state.email)
        form.append('password', this.state.password)
        const headers = {'Content-type':  'multipart/form-data' , 'Access-Control-Allow-Origin':'*'}
        axios({
            method: 'post',
            url: this.baseapiURL,
            data: form,
            config: {
                headers: headers
            }
        })
        .then((response)=>{
            if(typeof response.data === "string"){
                alert(response.data);
                this.setState({'name': '','username': '', 'email': '', 'password': ''})
                return;
            }else{
                Service.authenticate(response.data.uid);
                window.location.assign('/forum')
            }
        }).catch((err)=>{
            console.log(err);
        })  
    }
//  login 
    login(){
        let form = new FormData()
        form.append('email', this.state.email)
        form.append('password', this.state.password)
        const headers = {'Content-type':  'multipart/form-data' , 'Access-Control-Allow-Origin':'*'}
        axios({
            url: this.loginbaseapiURL,
            method: 'post',
            data: form,
            config: {
                headers: headers
            }
        })
        .then((response)=>{
            if(typeof response.data === "string"){
                alert(response.data);
                this.setState({'email': '', 'password': ''})
                return;
            }else{
                Service.authenticate(response.data.uid);
                window.location.assign('/forum')
            }
        }).catch((err)=>{
            console.log(err);
        })  
    }



    onChange(e){
            this.setState({...this.state, [e.target.name]: e.target.value});
    }

    handleSubmit(e){
            if(this.state.name === '' || this.state.email === '' || this.state.password === '' || this.state.username === ''){
                alert('Please enter the required fields.');
                return;
            }
            this.sendRequest();
            e.preventDefault();
    }

    handleLogin(e){
        this.login();
        e.preventDefault();
    }

    render(){

        return(
            <div className="app-signin-page container-fluid">
                <div className="app-brand-container">
                    <div className="app-brand-logo-container" >
                        <div id="app-brand-logo">
                            <div className="leaf-blade"></div>
                            <h1 style={{color: 'dodgerblue'}}>&nbsp;SF</h1>
                        </div>
                        <p>Student Forum</p>
                        <div className="modal fade bg-dark text-white" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" style={{color: 'dodgerblue'}}>
                                <div className="modal-content bg-dark text-white">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Sign in to the Forum</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form className="container-fluid form-group" method='post'>
                                        {this.loginFormControls.map((eachFormControl, index)=>{
                                            return(
                                                <div className="mb-3" key={index}>
                                                    <label htmlFor={`#${eachFormControl.id}`} className="form-label" style={{textTransform: 'uppercase'}}>{eachFormControl.name}</label>
                                                    <input type={eachFormControl.type} 
                                                        name={eachFormControl.name}
                                                        className="form-control"
                                                        id={eachFormControl.id}
                                                        value={this.state[eachFormControl.name]}
                                                        onChange={(e)=>(this.onChange(e))}
                                                        required
                                                        />
                                                </div> 
                                            );
                                        })}
                                        <button className="btn btn-primary" onClick={this.handleLogin}>Sign in</button><br />
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                                </div>
                            </div>
                            </div>
                    </div>
                </div>
                <div className="signup-form container">
                    <h3 style={{textAlign: 'center', paddingBottom: '20px', color: 'dodgerblue'}}>Sign up to the Forum.</h3>
                    <form className="container form-group" method='post'>
                        {this.formGroupControls.map((eachFormControl, index)=>{
                            return(
                                <div className="mb-3" key={index}>
                                    <label htmlFor={`#${eachFormControl.id}`} className="form-label" style={{textTransform: 'uppercase'}}>{eachFormControl.name}</label>
                                    <input type={eachFormControl.type} 
                                        name={eachFormControl.name}
                                        className="form-control"
                                        id={eachFormControl.id}
                                        value={this.state[eachFormControl.name]}
                                        onChange={(e)=>(this.onChange(e))}
                                        required
                                        />
                                </div> 
                            );
                        })}
                        <button className="btn btn-primary" onClick={this.handleSubmit}>Sign up</button><br />
                        <hr/>
                        <p>Already a member. Please Sign in</p>
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Sign in
                            </button>
                    </form>

                </div>

            </div>
        );
    }

}

export default withRouter(SignUp);
