import React from 'react'
import ReactDOM from 'react-dom'
import '../Styles/Custom.scss'
import {Form, Button, Col, InputGroup, ToggleButtonGroup, ToggleButton} from 'react-bootstrap'
import { Redirect } from 'react-router'
import axios from 'axios'
import {API_URL} from '../config'
import AdminNavbar from './AdminNavbar'
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider'


class AddUser extends React.Component {

    constructor(){
        super();
        this.state = {
            registered: false,
            input: {filingStatus: "Single"},
            errors: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount () {
        let input = this.state.input
        input["userType"] = "customer"
        this.setState({registered: false, input:input, errors:this.state.errors})
    }

    handleChange(event) {
        let input = this.state.input;
        input[event.target.name] = event.target.value;
        this.setState({
            registered: false,
            input:input,
            errors: this.state.errors
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.validate()) {
            if (this.state.input["userType"] === 'customer') {
                axios.post(API_URL + '/users/register', {
                    userID: this.state.input.username,
                    email: this.state.input["email"],
                    password: this.state.input["password"],
                    fname: this.state.input["fname"],
                    lname: this.state.input["lname"],
                    userType: this.state.input["userType"],
                    dob: this.state.input["dob"],
                    annIncome: this.state.input["annualIncome"],
                    filingStatus: this.state.input["filingStatus"]
                }).then((response) => {
                    if (response.data === 'User exists') { 
                        this.state.errors.usernameExists = "Username exists, try a different one."
                        this.state.errors["output"] = response.data
                        this.setState( {
                            registered: false,
                            input: this.state.input,
                            errors: this.state.errors
                        } ) 
                    }
                    else {
                        this.setState ({registered: true, input : {filingStatus: "Single"}, errors : {output: response.data}})
                    }
                
                }
                )
            }
            else {
                axios.post(API_URL + '/users/register', {
                    userID: this.state.input.username,
                    email: this.state.input["email"],
                    password: this.state.input["password"],
                    fname: this.state.input["fname"],
                    lname: this.state.input["lname"],
                    userType: this.state.input["userType"],
                    dob: new Date(),
                    annIncome: 0,
                    filingStatus: "Single"
                }).then((response) => {
                    if (response.data === 'User exists') { 
                        this.state.errors.usernameExists = "Username exists, try a different one."
                        this.state.errors["output"] = response.data
                        this.setState( {
                            registered: false,
                            input: this.state.input,
                            errors: this.state.errors
                        } ) 
                    }
                    else {
                        this.setState ({registered: true, input : {filingStatus: "Single"}, errors : {output: response.data}})
                    }
                
                }
                )
            }
        }
    }      
    
    
    validate() {
        
        let valid = true;
        let input = this.state.input;
        let errors = this.state.errors;
        let dob = new Date(input["dob"])
        let today = new Date()
        if (input["userType"] === 'customer') {

        
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
            if (dob > today){
                errors["birthdayError"] = "Birthday cannot be a future date."
            }
            else {
                errors["birthdayError"] = ""
            }
        }
        else {
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
        }
    
        this.setState({errors:errors});
        return valid;
    }


    render() {
        return(
        <div >
            <AdminNavbar user = {this.props.location.state["user"]} userType = {this.props.location.state["userType"]}></AdminNavbar>
            <h1>Add User</h1>
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
                    <Form.Group as={Col} controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type = "text" name = "username" onChange = {this.handleChange} required/>
                        <Form.Text className = "usernameExists">{this.state.errors.usernameExists}</Form.Text>
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
                    <Form.Group as={Col} controlId="formUserType" required>
                        <Form.Label>User Type</Form.Label><br></br>
                        <ToggleButtonGroup name="userType" type="radio" className="mb-2" defaultValue={'customer'}>
                            <ToggleButton value={'customer'} onChange = {this.handleChange} >Customer</ToggleButton>
                            <ToggleButton value={'admin'} onChange = {this.handleChange} >Admin</ToggleButton>
                        </ToggleButtonGroup>
                    </Form.Group>
                </Form.Row>
                {this.state.input["userType"] === 'customer' ? <div>
                <Form.Row>
                    <Form.Group as={Col} controlId="formBirthday">
                        <Form.Label>Birthday</Form.Label>
                        
                        <Form.Control type = "date" name = "dob"  onChange = {this.handleChange} required />
                        <Form.Text className = "birthdayValidate">{this.state.errors.birthdayError}</Form.Text>     
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
                </Form.Row></div>
                : <div></div> }
                
                <Form.Group className = "btn1">
                    <Button variant="primary" type="submit">
                        Add User
                    </Button>
                    <Form.Text className = "output">{this.state.errors["output"]}</Form.Text>
                </Form.Group>
            </Form>


        </div>
    )
    }
}

export default AddUser;