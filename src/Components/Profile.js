import React, { Component } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { API_URL_UPDATE_USER, API_URL_USERS } from '../config'
import Navbar from './Navbar'
import {Form, Button, Col, InputGroup} from 'react-bootstrap'
import AdminNavbar from './AdminNavbar'

export default class Profile extends Component {

    constructor(props){
        super(props)
        this.state = {
            user : {},
            userType: "",
            errors: {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        console.log(this.state)
        let {username} = this.props.match.params
        axios.get(API_URL_USERS + '/' + username)
        .then((response) => {
            
            this.setState({user: response.data})
            console.log(this.state.user)
        })
    }

    handleChange(event) {
        let user = this.state.user;
        user[event.target.name] = event.target.value;
        this.setState({user : user});
    }

    handleSubmit(event) {
        event.preventDefault()
        if (this.validate()) {
            event.preventDefault()

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
                    this.setState({errors: errors})
                }
            })
        }
    }

    validate() {
        let user = this.state.user
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

    // printTaxBracket(){
    //     //Based on 2019 tax data
    //     let tax_bracket;
    //     let user = this.state.user
    //     if(user["filingStatus"]="Single"){
    //         if(user["annIncome"]<=9700){
    //             tax_bracket=0.10;
    //         }else if(user["annIncome"]<=39475){
    //             tax_bracket=0.12;
    //         }else if(user["annIncome"]<=84200){
    //             tax_bracket=0.22;
    //         }else if(user["annIncome"]<=160725){
    //             tax_bracket=0.24;
    //         }else if(user["annIncome"]<=204100){
    //             tax_bracket=0.32;
    //         }else if(user["annIncome"]<=520300){
    //             tax_bracket=0.35;
    //         }else{
    //             tax_bracket=0.37;
    //         }
    //     }else if(user["filingStatus"]="Married filing jointly"){
    //         if(user["annIncome"]<=19400){
    //             tax_bracket=0.10;
    //         }else if(user["annIncome"]<=78950){
    //             tax_bracket=0.12;
    //         }else if(user["annIncome"]<=168400){
    //             tax_bracket=0.22;
    //         }else if(user["annIncome"]<=321450){
    //             tax_bracket=0.24;
    //         }else if(user["annIncome"]<=408200){
    //             tax_bracket=0.32;
    //         }else if(user["annIncome"]<=612350){
    //             tax_bracket=0.35;
    //         }else{
    //             tax_bracket=0.37;
    //         }
    //     }else if(user["filingStatus"]="Married filing separately"){
    //         if(user["annIncome"]<=9700){
    //             tax_bracket=0.10;
    //         }else if(user["annIncome"]<=39475){
    //             tax_bracket=0.12;
    //         }else if(user["annIncome"]<=84200){
    //             tax_bracket=0.22;
    //         }else if(user["annIncome"]<=160725){
    //             tax_bracket=0.24;
    //         }else if(user["annIncome"]<=204100){
    //             tax_bracket=0.32;
    //         }else if(user["annIncome"]<=306175){
    //             tax_bracket=0.35;
    //         }else{
    //             tax_bracket=0.37;
    //         }
    //     }else{
    //         if(user["annIncome"]<=13850){
    //             tax_bracket=0.10;
    //         }else if(user["annIncome"]<=52850){
    //             tax_bracket=0.12;
    //         }else if(user["annIncome"]<=84200){
    //             tax_bracket=0.22;
    //         }else if(user["annIncome"]<=160700){
    //             tax_bracket=0.24;
    //         }else if(user["annIncome"]<=204100){
    //             tax_bracket=0.32;
    //         }else if(user["annIncome"]<=510300){
    //             tax_bracket=0.35;
    //         }else{
    //             tax_bracket=0.37;
    //         }
    //     }
    //     tax_brack_statement="Your tax bracket is " + tax_bracket;
    //     alert(tax_brack_statement);
    // }

    render() {
        return (
            <div>
                {this.state.userType === "customer" ? 
                    <Navbar user = {this.state.user["userID"]} userType = {this.state.userType}/> : <AdminNavbar user = {this.state.user["userID"]} userType = {this.state.userType}></AdminNavbar> }
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



