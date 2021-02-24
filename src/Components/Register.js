import React from 'react'
import ReactDOM from 'react-dom'
import '../Styles/Custom.scss'
import {Form, Button, Col, InputGroup} from 'react-bootstrap'
import axios from 'axios'

const API = 'http://localhost:8080'

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

    componentDidMount () {
        let input = this.state.input
        input["filingStatus"] = document.getElementById("filingStatus").value
        console.log(input["filingStatus"])
        this.setState({input:input, errors:this.state.errors})
    }

    handleChange(event) {
        let input = this.state.input;
        input[event.target.name] = event.target.value;
      
        this.setState({
          input:input,
          errors: this.state.errors
        });
    }

    handleSubmit(event) {
        console.log(this.state);
        event.preventDefault();
        if (this.validate()) {
            console.log("registering...")
            axios.post(API + '/users/register', {
                userID: "",
                email: this.state.input["email"],
                password: this.state.input["password"],
                fname: this.state.input["fname"],
                lname: this.state.input["lname"],
                userType: "customer",
                dob: this.state.input["dob"],
                annIncome: this.state.input["annualIncome"],
                filingStatus: this.state.input["filingStatus"]
            }).then((response) => 
                console.log(response.data))
           
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
        if(input["filingStatus"] === "" || input["filingStatus"] === null){
            errors["filingStatus"] = "Please select a filing status."
        }
        this.setState({errors:errors});
        return valid;
    }


    render() {
        return(
        <div id="registerContainer">
            <h1>Create an Account</h1>
            <Form onSubmit = {this.handleSubmit}>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridFName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text"  name = "fname" onChange = {this.handleChange} required/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridLName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text"  name = "lname" onChange = {this.handleChange} required/>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="formEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type = "email" name = "email" onChange = {this.handleChange} required/>
                        <Form.Text className = "confirmPass">{this.state.errors.confirmEmail}</Form.Text>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formConfirmEmail">
                        <Form.Label>Confirm Email Address</Form.Label>
                        <Form.Control type = "email"  name = "confirmEmail" onChange = {this.handleChange} required/>
                    </Form.Group>
                    
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="formPassword">
                        <Form.Label>Create a Password</Form.Label>
                        <Form.Control type = "password" name = "password" onChange = {this.handleChange} required/>
                        <Form.Text className = "confirmPass">{this.state.errors.confirmPassword}</Form.Text>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formConfirmEmail">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type = "password" name = "confirmPassword" onChange = {this.handleChange} required/>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="formBirthday">
                        <Form.Label>Birthday</Form.Label>
                        <Form.Control type = "date" name = "dob" onChange = {this.handleChange} required />     
                    </Form.Group>

                    <Form.Group as={Col} controlId="formFilingStatus">
                    <Form.Label>Filing Status</Form.Label>
                    <Form.Control as="select"  name = "filingStatus" id = "filingStatus" onChange = {this.handleChange} required>
                        <option>Single</option>
                        <option>Married filing jointly</option>
                        <option>Married filing seperately</option>
                        <option>Head of household</option>
                    </Form.Control>
                    <Form.Text className = "confirmPass">{this.state.errors.filingStatus}</Form.Text>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="formAnnualIncome"  required>
                    <Form.Label>Annual Income</Form.Label>
                    <InputGroup>
                        <InputGroup.Prepend>
                        <InputGroup.Text>$</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type = "number" min={0} name = "annualIncome" onChange = {this.handleChange} />
                    </InputGroup>
                    
                    </Form.Group>               
                </Form.Row>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>


        </div>
    )
    }
}

export default Register;