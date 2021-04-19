import React, { Component } from 'react'
import axios from 'axios'
import {API_URL, API_URL_EXPENSE_DELETE } from '../config'
import {Table} from 'react-bootstrap'
import {Link, Redirect} from 'react-router-dom'

class ManageExpense extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userID: this.props.location.state["user"],
            expenses: [{}]
        }
        this.getExpensesTable = this.getExpensesTable.bind(this)
    }

    componentDidMount() {
        axios.get(API_URL + '/expense/' + this.state.userID)
        .then((response) => {
            this.setState({expenses: response.data})
        })
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
                <h2>Expense List</h2>
                {table}
                
            </div>
        )
    }
}

export default ManageExpense