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
            input: {},
            errors: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount () {
        console.log(this.state)
        let input = this.state.input
        input["category"] = document.getElementById("category").value
        console.log(input["category"])
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
        console.log(this.state);
        event.preventDefault();
        if (this.validate()) {
            console.log("adding...")
            axios.post(API_URL + '/expenses/added', {
                userID: this.state.input.username,
                expenseTitle: this.state.input["expenseTitle"],
                dateAdded: this.state.input["dateAdded"],
                amount: this.state.input["amount"],
                category: this.state.input["category"]
            }).then((response) => {
                console.log(response.data)
                this.setState ({added: true, input : {}, errors : {}})
                }
            )
        }
        console.log(this.state.added)
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
        }

        //handling date error
        if (dateAdded > today){
            errors["dateError"] = "Date cannot be a future date."
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
                <Navbar user = {this.state.userID} userType = {this.state.userType}/>
                <div id="registerContainer">
                {this.state.added && (<Redirect to="/AddExpense/Success"/>)}
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
                                <Form.Control type = "number" min={0} name = "annualIncome" onChange = {this.handleChange} />
                            </InputGroup>
                            </Form.Group>    
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Control as="select"  name = "category" id = "category" onChange = {this.handleChange} required>
                                <option>Food</option>
                                <option>Rent</option>
                                <option>Gas</option>
                                <option>Utility</option>
                            </Form.Control>
                            <Form.Text>{this.state.errors.category}</Form.Text>
                            </Form.Group>          
                        </Form.Row>

                        <Form.Group className = "btn1">
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form.Group>

                    </Form>


                </div>
            </div>
    )
    }
}

export default AddExpense;