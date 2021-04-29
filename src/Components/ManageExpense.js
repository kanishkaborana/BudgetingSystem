import React, { Component } from 'react'
import axios from 'axios'
import { API_URL_EXPENSE, API_URL_EXPENSE_DELETE } from '../config'
import {Table} from 'react-bootstrap'
import Navbar from './Navbar'


/*
    Manage Component.
    Contains the functions and JSX for the Manage Expense webpage
*/
class ManageExpense extends Component {

    constructor(props) {
        super(props);
        // Default state
        this.state = {
            userID: this.props.location.state["user"],
            userType: this.props.location.state["userType"],
            expenses: [{}]
        }
        this.getExpensesTable = this.getExpensesTable.bind(this)
    }

    // Actions to take once component loads in. Retrieves all expense for the  user
    // from the API
    componentDidMount() {
        // API call to get all the expenses for the user
        axios.get(API_URL_EXPENSE + "/" + this.state.userID)
        .then((response) => {
            this.setState({
                expenses: response.data})
            })
    }

    // Function to allow the customer to delete an expense from the expenses table
    handleDelete(index) {
        // Get the expenseID from the row selected
        let expenseID = document.getElementById("expenseID" + index).innerHTML
        // API call to delete the expense
        axios.delete(API_URL_EXPENSE_DELETE + '/' + expenseID)
        .then((response) => {
            // API call to update the expenses table
            axios.get(API_URL_EXPENSE + "/" + this.state.userID)
                .then((response) => {   
                    this.setState({
                        expenses: response.data
                    })       
                })
        })
    }

    // Function to allow the customer to edit an expense from the expenses table
    handleEdit(index) {
        // Get the expenseID from the row selected
        let expenseID = document.getElementById("expenseID" + index).innerHTML
        // Redirect customer to the webpage that allows them to edit an expense
        this.props.history.push({pathname: '/EditExpense', state: {expenseID: expenseID, userID: this.state.userID, userType: this.state.userType}})
    }

    // Function to render in the table containing all the user expenses
    getExpensesTable() {
            return (
                <div>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>ExpenseID</th>
                                <th>Expense Title</th>
                                <th>Date added</th>
                                <th>Amount</th>
                                <th>Category</th>
                                <th>Recurring</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {(this.state.expenses).map((element, index) => {
                            return(
                            <tr id = {"row" + index}>
                                <td id = {"expenseID" + index}>{element.expenseID}</td>
                                <td>{element.expenseTitle}</td>                                        <td>{element.dateAdded}</td>
                                <td>{element.amount}</td>
                                <td>{element.category}</td>
                                <td>{element.recurring == 1 ? "Yes" : "No" }</td>
                                <td><button type="button" name="" id="" class="btn btn-primary" btn-lg btn-block onClick = {() => this.handleEdit(index)}>Edit</button></td>
                                <td><button type="button" name="" id="" class="btn btn-primary" btn-lg btn-block onClick = {() => this.handleDelete(index)}>Delete</button></td>
                            </tr>
                            )})}
                        </tbody>
                    </Table>
                </div>
            )
    }
    


    // Render function containing the JSX and HTML
    render() {
        const table =  this.getExpensesTable()
        return (
            <div>
                <Navbar user = {this.state.userID} userType = {"customer"}/>
                <h2>Expenses List</h2>
                {table}
                
            </div>
        )
    }
}

export default ManageExpense