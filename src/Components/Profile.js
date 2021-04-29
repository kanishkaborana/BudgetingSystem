import React, { Component } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { API_URL_UPDATE_USER, API_URL_USERS } from '../config'
import Navbar from './Navbar'
import {Form, Button, Col, InputGroup} from 'react-bootstrap'
import AdminNavbar from './AdminNavbar'
import { Redirect } from 'react-router'


/*
    Profile Component.
    Contains the functions and JSX for the user profile webpage
*/
export default class Profile extends Component {

    constructor(props){
        super(props)
        // Default state
        this.state = {
            user : {},
            userType: this.props.location.state["userType"],
            editted : false,
            errors: {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Actions to take once component loads in. Call the API to get the 
    // user information
    componentDidMount() {
        let {username} = this.props.match.params
        // API call to get the users information
        axios.get(API_URL_USERS + '/' + username)
        .then((response) => {
            this.setState({editted : false, user: response.data})
        })
    }

    // Function to read user input and update state
    handleChange(event) {
        let user = this.state.user;
        user[event.target.name] = event.target.value;
        this.setState({
            editted : false, user : user
        });
    }

    // Function to handle user form submission
    handleSubmit(event) {
        event.preventDefault()
        // Make sure form is valid
        if (this.validate()) {
            event.preventDefault()
            // Call the API to update user information
            axios.post(API_URL_UPDATE_USER, {
                userID: this.state.user["userID"],
                email: this.state.user["email"],
                password: this.state.user["password"],
                fname: this.state.user["fname"],
                lname: this.state.user["lname"],
                userType: this.state.user["userType"],
                dob: this.state.user["dob"],
                annIncome: this.state.user["annIncome"],
                filingStatus: this.state.user["filingStatus"]
            }).then((response) => {
                let errors = this.state.errors
                if (response.data === "User updated"){ 
                    errors["update"] = "Profile successfully updated!"
                    this.setState({editted : true, errors: errors})
                }})
    
        }
    }
    
    // Function to make sure form is valid. Makes sure that the user confirmed
    // password, confirmed email, and selected a filing status
    validate() {
        let user = this.state.user;
        let valid = true
        let errors = this.state.errors

        if(user["password"] !== user["confirmPassword"]){
                errors["confirmPassword"] = "Passwords don't match.";
                valid = false;
        }
        else {
            errors["confirmPassword"] = "";
        }
        if(user["email"] !== user["confirmEmail"]){
                errors["confirmEmail"] = "Emails don't match.";
                valid = false;
        }
        else {
            errors["confirmEmail"] = "";
        }
        if(user["filingStatus"] === "" || user["filingStatus"] === null){
            errors["filingStatus"] = "Please select a filing status."
        }
    
        this.setState({user: user, errors:errors});
        return valid;
    }

    // Render function containing JSX and HTML
    render() {
        return (
            <div>
                {(this.state.userType === "customer") ? <Navbar user = {this.state.user["userID"]} userType = {this.state.userType}/> : <AdminNavbar user = {this.state.user["userID"]} userType = {this.state.userType}></AdminNavbar> }
                {this.state.editted && (<Redirect to= {{ pathname: '/Dashboard', state: {user: this.state.user["userID"], userType: this.state.userType} }} />) }

                <h1>Edit Profile</h1>
                <Form onSubmit = {this.handleSubmit}>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridFName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text"  name = "fname" onChange = {this.handleChange} value = {this.state.user["fname"]} required/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridLName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text"  name = "lname" onChange = {this.handleChange} value = {this.state.user["lname"]} required/>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="formEmail">
                        <Form.Label>New Email Address</Form.Label>
                        <Form.Control type = "email" name = "email" onChange = {this.handleChange} value = {this.state.user["email"]} required/>
                        <Form.Text className = "confirmPass">{this.state.errors["confirmEmail"]}</Form.Text>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formConfirmEmail">
                        <Form.Label>Confirm New Email Address</Form.Label>
                        <Form.Control type = "email"  name = "confirmEmail" onChange = {this.handleChange}  required/>
                    </Form.Group>
                    
                </Form.Row>


                


                <Form.Row>
                    <Form.Group as={Col} controlId="formPassword">
                        <Form.Label>Change Password</Form.Label>
                        <Form.Control type = "password" name = "password" onChange = {this.handleChange} value = {this.state.user["password"]} required/>
                        <Form.Text className = "confirmPass">{this.state.errors["confirmPassword"]}</Form.Text>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formConfirmEmail">
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control type = "password" name = "confirmPassword" onChange = {this.handleChange}   required/>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                   
                    <Form.Group as={Col} controlId="formFilingStatus">
                    <Form.Label>Filing Status</Form.Label>
                    <Form.Control as="select"  name = "filingStatus" id = "filingStatus" onChange = {this.handleChange} value = {this.state.user["filingStatus"]} required>
                        <option>Single</option>
                        <option>Married filing jointly</option>
                        <option>Married filing seperately</option>
                        <option>Head of household</option>
                    </Form.Control>
                    
                    </Form.Group>
                    
                    <Form.Group as={Col} controlId="formAnnualIncome"  required>
                    <Form.Label>Annual Income</Form.Label>
                    <InputGroup>
                        <InputGroup.Prepend>
                        <InputGroup.Text>$</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type = "number" min={0} name = "annIncome" onChange = {this.handleChange} value = {this.state.user["annIncome"]}  />
                    </InputGroup>
                    
                    </Form.Group> 
                </Form.Row>

                <Form.Group className = "btn1">
                    <Button variant="primary" type="submit" onclick={this.printTaxBracket}>
                        Save Changes
                    </Button>
                    <Form.Text className = "updateStatus">{this.state.errors["update"]}</Form.Text>
                </Form.Group>
            </Form>



            </div>
        )
    }
}



