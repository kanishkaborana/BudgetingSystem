import React from 'react'
import ReactDOM from 'react-dom'
import Link, { Redirect } from 'react-router-dom'
import axios from 'axios'
import '../Styles/Custom.scss'
import Register from './Register'
import {Form, Button} from 'react-bootstrap'

class Login extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            userID: "",
            password: "",
            message: "",
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let newUserID = this.state.userID
        let newPassword = this.state.password
        if (event.target.name === "userID"){
            newUserID = event.target.value
        }
        else if (event.target.name === "password") {
            newPassword = event.target.value
        }
        this.setState({
            userID: newUserID,
            password: newPassword,
            message: ""  
        });
        
    }

    handleSubmit(event) {
        event.preventDefault();
        
        this.setState({
            userID: this.state.userID,
            password: this.state.password,
        });

        this.props.Login({userID: this.state.userID, password: this.state.password})
               
    }

    render(){
        return(
            
            <div id="loginContainer">
                <h1>Login</h1>
                <Form className = "loginForm" id = "login" onSubmit = {this.handleSubmit}>
                    <Form.Group controlid = "userIDForm" >
                        <Form.Label className = "label1">Username</Form.Label>
                        <Form.Control type = "text" name = "userID" placeholder = "Enter username" className = "input1" onChange = {this.handleChange} required/>
                    </Form.Group>

                    <Form.Group controlid = "passForm">
                        <Form.Label className = "label1">Password</Form.Label>
                        <Form.Control type = "password" name = "password" placeholder = "Enter password" className = "input1" onChange = {this.handleChange} required/>
                        <Form.Text className = "confirmPass">{this.state.message}</Form.Text>
                    </Form.Group>
                    <Form.Group className = "btn1">
                        <Button variant = "primary" type = "submit" >Login</Button>
                        <Button href='/Register' variant = "primary" className = "link1">Register an Account</Button>
                    </Form.Group>
                </Form>
            </div>
        );
    }
}

export default Login;