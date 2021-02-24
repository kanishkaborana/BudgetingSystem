import React from 'react'
import ReactDOM from 'react-dom'
import '../Styles/Custom.scss'
import {Form, Button} from 'react-bootstrap'

class Register extends React.Component {

    constructor(){
        super();
        this.state = {
            input: {},
            errors: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let input = this.state.input;
        input[event.target.name] = event.target.value;
      
        this.setState({
          input
        });
    }

    handleSubmit(event) {
        console.log(this.state);
        event.preventDefault();
        if (this.validate()) {
            this.setState({input: {}, errors: {}});
        }
        
        
    }
    
    validate() {
        
        let valid = true;
        let input = this.state.input;
        let errors = this.state.errors;

        if(input["password"] !== input["confirmPassword"]){
                errors["confirmPassword"] = "Passwords don't match.";
                valid = false;
        }
        else {
            errors["confirmPassword"] = "";
        }
        if(input["email"] !== input["confirmEmail"]){
                errors["confirmEmail"] = "Emails don't match.";
                valid = false;
        }
        else {
            errors["confirmEmail"] = "";
        }
        this.setState({errors:errors});
        return valid;
    }


    render() {
        return(
        <div id="registerContainer">
            <h1>Create an Account</h1>
            <Form className = "registerForm">

                <Form.Group controlID = "fname" className = "doubleField">
                    <Form.Control type = "text" placeholder = "First name" className = "input2" required/>
                    <Form.Control type = "text" placeholder = "Last name" className = "input2" id = "rightInput" required/>
                </Form.Group>

                <Form.Group controlID = "email" className = "doubleField">
                    <Form.Control type = "email" placeholder = "Email Address" className = "input2" name = "email" onChange = {this.handleChange} required/>
                    <Form.Control type = "email" placeholder = "Confirm Email" className = "input2" id = "rightInput" name = "confirmEmail" onChange = {this.handleChange} required/>
                    <Form.Text className = "confirmPass">{this.state.errors.confirmEmail}</Form.Text>               
                </Form.Group>

                <Form.Group controlID = "password" className = "doubleField">
                    <Form.Control type = "password" placeholder = "Create Password" className = "input2" name = "password" onChange = {this.handleChange} required/>
                    <Form.Control type = "password" placeholder = "Confirm Password" className = "input2" id = "rightInput" name = "confirmPassword" onChange = {this.handleChange} required/>
                    <Form.Text className = "confirmPass">{this.state.errors.confirmPassword}</Form.Text>
                </Form.Group>

               
                <Form.Group className = "btn1">
                    <Button variant = "primary" type="submit" onClick = {this.handleSubmit}>Create an Account</Button>
                    <Button href='/Login' variant = "primary" className = "link1">Return to Login</Button>
                </Form.Group>
            </Form>
        </div>
    )
    }
}

export default Register;