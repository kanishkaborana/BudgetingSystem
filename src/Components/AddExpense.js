import React from 'react'
import ReactDOM from 'react-dom'
import '../Styles/Custom.scss'
import {Form, Button, Col, InputGroup} from 'react-bootstrap'
import { Redirect } from 'react-router'
import axios from 'axios'
import {API_URL} from '../config'
import Navbar from './Navbar'


class AddExpense extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            added: false,
            input: {userID: this.props.location.state["user"]},
            errors: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount () {
        let input = this.state.input
        input["category"] = document.getElementById("category").value
        this.setState({added: false, input:input, errors:this.state.errors})
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
        let recurring = 0;
        event.preventDefault();
        if (this.validate()) {
            if(document.getElementById("recurring").checked){
                recurring = 1;
            }
            axios.post(API_URL + '/expenses/added', {
                userID: this.state.input.userID,
                amount: this.state.input["amount"],
                category: this.state.input["category"],
                dateAdded: this.state.input["dateAdded"],
                expenseTitle: this.state.input["expenseTitle"],
                recurring: recurring
            }).then((response) => {
                this.setState ({added: true, errors : {output: response.data}})
                }
            )
        }
    } 
      
        
    validate() {
        
        let valid = true;
        let input = this.state.input;
        let errors = this.state.errors;
        let dateAdded = new Date(input["dateAdded"])
        let today = new Date()
        
        // handling category 
        if(input["category"] === "" || input["category"] === null){
            errors["category"] = "Please select a category."
            valid = false;
        }

        //handling date error
        if (dateAdded > today){
            errors["dateError"] = "Date cannot be a future date."
            valid = false;
        }
        else {
            errors["dateError"] = ""
        }
    
        this.setState({errors:errors});
        return valid;
    }


    render() {
        return(
            <div>
                <Navbar user = {this.props.location.state["user"]} userType = {this.props.location.state["userType"]}/>
                <div id="registerContainer">
                    <h1>Add an Expense</h1>
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

                        <Form.Row>
                            <Form.Group as={Col} controlId="formRecurring">
                                <Form.Check inline label="Recurring" id="recurring"/>
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

export default AddExpense;