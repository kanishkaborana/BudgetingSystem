import React, { Component } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { API_URL_UPDATE_EXPENSE, API_URL_EXPENSES } from '../config'
import Navbar from './Navbar'
import {Form, Button, Col, InputGroup} from 'react-bootstrap'

export default class EditExpense extends Component {

    constructor(props){
        super(props)
        this.state = {
            user: {},
            input: {expenseID: this.props.location.state["input"]},
            errors: {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        console.log(this.state)
        axios.get(API_URL_EXPENSES + '/' + this.state.user["userID"])
        .then((response) => {
            this.setState({input: response.data})
            console.log(this.state.input)
        })
    }

    handleChange(event) {
        let input = this.state.input;
        input[event.target.name] = event.target.value;
      
        this.setState({
            added: false,
            input:input,
            errors: this.state.errors
        });
    }

    handleSubmit(event) {
        event.preventDefault()
        if (this.validate()) {
            event.preventDefault()

            axios.post(API_URL_UPDATE_EXPENSE, {
                userID: this.state.input.userID,
                amount: this.state.input["amount"],
                category: this.state.input["category"],
                dateAdded: this.state.input["dateAdded"],
                expenseTitle: this.state.input["expenseTitle"],
            }).then((response) => {
                let errors = this.state.errors
                if (response.data === "Expense updated"){ 
                    errors["update"] = "Expense successfully updated!"
                    this.setState({errors: errors})
                }
            })
        }
    }

    validate() {
        let input = this.state.input
        let valid = true;
        let errors = this.state.errors;
        let dateAdded = new Date(input["dateAdded"])
        let today = new Date()
        
        // handling category 
        if(input["category"] === "" || input["category"] === null){
            errors["category"] = "Please select a category."
        }

        //handling date error
        if (dateAdded > today){
            errors["dateError"] = "Date cannot be a future date."
        }
        else {
            errors["dateError"] = ""
        }
    
        this.setState({ errors:errors});
        return valid;
    }

    

    render() {
        return (
            <div>
            <Navbar user = {this.state.user} userType = {this.props.location.state["userType"]}/>
            <div id="registerContainer">
            {/* {this.state.added && (<Redirect to="/AddExpense/Success"/>)} */}
                <h1>Edit an Expense</h1>
                <Form onSubmit = {this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formExpenseTitle">
                            <Form.Label>Expense Title</Form.Label>
                            <Form.Control type = "text" name = "expenseTitle" onChange = {this.handleChange} required/>
                        </Form.Group>                    
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formDate">
                            <Form.Label>Date</Form.Label>
                            
                            <Form.Control type = "date" name = "dateAdded"  onChange = {this.handleChange} required />
                            <Form.Text>{this.state.errors.dateError}</Form.Text>     
                        </Form.Group>

                        <Form.Group as={Col} controlId="formAmount"  required>
                        <Form.Label>Amount</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                            <InputGroup.Text>$</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control type = "number" min={0} name = "amount" onChange = {this.handleChange} />
                        </InputGroup>
                        </Form.Group>    
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formCategory">
                        <Form.Label>Category</Form.Label>
                        <Form.Control as="select"  name = "category" id = "category" onChange = {this.handleChange} required>
                            <option>Food</option>
                            <option>Groceries</option>
                            <option>Rent/Mortgage</option>
                            <option>Gas</option>
                            <option>Entertainment</option>
                            <option>Utility</option>
                            <option>Business</option>
                            <option>Other</option>
                        </Form.Control>
                        <Form.Text>{this.state.errors.category}</Form.Text>
                        </Form.Group>          
                    </Form.Row>

                    <Form.Group className = "btn1">
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        <Form.Text className = "output">{this.state.errors["output"]}</Form.Text>
                    </Form.Group>

                </Form>

            </div>
        </div>    
        )
    }
}


//export default EditExpense;
