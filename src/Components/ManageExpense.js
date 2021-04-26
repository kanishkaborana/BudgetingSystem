import React, { Component } from 'react'
import axios from 'axios'
import { API_URL_EXPENSE, API_URL_EXPENSE_DELETE } from '../config'
import {Table} from 'react-bootstrap'
import Navbar from './Navbar'

class ManageExpense extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userID: this.props.location.state["user"],
            userType: this.props.location.state["userType"],
            expenses: [{}]
        }
        this.getExpensesTable = this.getExpensesTable.bind(this)
    }

    componentDidMount() {
        axios.get(API_URL_EXPENSE + "/" + this.state.userID)
        .then((response) => {
            this.setState({
                expenses: response.data})
            })
    }

    handleDelete(index) {
        let expenseID = document.getElementById("expenseID" + index).innerHTML
        axios.delete(API_URL_EXPENSE_DELETE + '/' + expenseID)
        .then((response) => {
            //update expenses table
            axios.get(API_URL_EXPENSE + "/" + this.state.userID)
                .then((response) => {   
                    this.setState({
                        expenses: response.data
                    })       
                })
        })
    }

    handleEdit(index) {
        let expenseID = document.getElementById("expenseID" + index).innerHTML
        this.props.history.push({pathname: '/EditExpense', state: {expenseID: expenseID, userID: this.state.userID, userType: this.state.userType}})
    }

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