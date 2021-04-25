import React, { Component } from 'react'
import axios from 'axios'
import { API_URL_UPDATE_EXPENSE, API_URL_EXPENSES } from '../config'
import Navbar from './Navbar'
import {Form, Button, Col, InputGroup} from 'react-bootstrap'
import { Redirect } from 'react-router'

export default class EditExpense extends Component {

    constructor(props){
        super(props)
        this.state = {
            userID: this.props.location.state["userID"],
            userType: this.props.location.state["userType"],
            editted: false,
            input: {},
            errors: {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        console.log(this.state)
        console.log(API_URL_EXPENSES + '/' + this.props.location.state["expenseID"])
        axios.get(API_URL_EXPENSES + '/' + this.props.location.state["expenseID"])
        .then((response) => {
            this.setState({editted:false, input: response.data})
            console.log(this.state.input)
            this.state.input["recurring"] === "1" ? document.getElementById("recurring").checked = true : document.getElementById("recurring").checked = false
        })
    }

    handleChange(event) {
        console.log(this.state.input)
        let input = this.state.input;
    
        input[event.target.name] = event.target.value;


        
        if (event.target.name == "recurring") {
            input["recurring"] = document.getElementById("recurring").checked ? 1 : 0
        }
        
      
        this.setState({
            editted:false,
            input: input
        });
    }

    handleSubmit(event) {
        //let recurring = 0
        event.preventDefault()
        console.log(this.state.input)
        if (this.validate()) {
            event.preventDefault()
            /*
            if(document.getElementById("recurring").checked){
                recurring = 1;
            }
            */
            //console.log(recurring)
            axios.post(API_URL_UPDATE_EXPENSE, {
                expenseID: this.state.input["expenseID"],
                userID: this.state.input["userID"],
                amount: this.state.input["amount"],
                category: this.state.input["category"],
                dateAdded: this.state.input["dateAdded"],
                expenseTitle: this.state.input["expenseTitle"],
                recurring: this.state.input["recurring"],
            }).then((response) => {
                let errors = this.state.errors
                if (response.data === "Expense updated"){ 
                    errors["output"] = "Expense successfully updated!"
                    this.setState({ editted:true, errors: errors})
                }
            })
        }
    }

    validate() {
        let valid = true;
        let errors = {};
        let input = this.state.input;
        let dateAdded = new Date(input["dateAdded"])
        let today = new Date()
        
        // handling category 
        if(input["category"] === "" || input["category"] === null){
            errors["category"] = "Please select a category."
            valid = false;
        }

        //handling date error
        if (dateAdded >= today){
            errors["dateError"] = "Date cannot be a future date."
            valid = false;
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
            {this.state.editted && (<Redirect to= {{pathname: '/ManageExpense', state: {user: this.state.userID, userType: this.state.userType}}}/>) }
            <Navbar user = {this.state.userID} userType = {this.state.userType}/>
            <div id="registerContainer">
                <h1>Edit Expense {this.state.input.expenseID}</h1>
                <Form onSubmit = {this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formExpenseTitle">
                            <Form.Label>Expense Title</Form.Label>
                            <Form.Control type = "text" name = "expenseTitle" value = {this.state.input["expenseTitle"]} onChange = {this.handleChange} required/>
                        </Form.Group>                    
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formDate">
                            <Form.Label>Date</Form.Label>
                            
                            <Form.Control type = "date" name = "dateAdded" value = {this.state.input["dateAdded"]} onChange = {this.handleChange} required />
                            <Form.Text>{this.state.errors.dateError}</Form.Text>     
                        </Form.Group>

                        <Form.Group as={Col} controlId="formAmount"  required>
                        <Form.Label>Amount</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                            <InputGroup.Text>$</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control type = "number" min={0} name = "amount" value = {this.state.input["amount"]} onChange = {this.handleChange} />
                        </InputGroup>
                        </Form.Group>    
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formCategory">
                        <Form.Label>Category</Form.Label>
                        <Form.Control as="select"  name = "category" id = "category" value = {this.state.input["category"]} onChange = {this.handleChange} required>
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

                    <Form.Row>
                            <Form.Group as={Col} controlId="formRecurring">
                                <Form.Check inline label="Recurring" id="recurring" name = "recurring" onChange = {this.handleChange} />
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
