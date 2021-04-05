import React from 'react'
import ReactDOM from 'react-dom'
import Navbar from './Navbar'
import AdminNavbar from './AdminNavbar'
import axios from 'axios'
import {API_URL_USERS, API_URL_USER_DELETE } from '../config'
import {Table} from 'react-bootstrap'
import {Link, Redirect} from 'react-router-dom'

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userID: this.props.location.state["user"],
            userType: this.props.location.state["userType"],
            customers: [{}]
        }
        this.getCustomersTable = this.getCustomersTable.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    componentDidMount() {
        axios.get(API_URL_USERS)
        .then((response) => {
            this.setState({customers: response.data})
            console.log((this.state.customers[0]))
        })
    }

    handleDelete(index) {
        let userID = document.getElementById("userID" + index).innerHTML
        axios.delete(API_URL_USER_DELETE + '/' + userID)
        .then((response) => {
            //update customers table
            axios.get(API_URL_USERS)
                .then((response) => {
                this.setState({customers: response.data})
                console.log((this.state.customers[0]))
            })
        })
    }

    handleEdit(index) {
        let userID = document.getElementById("userID" + index).innerHTML
        console.log("editting " + userID);
        this.props.history.push({pathname: '/EditUser', state: {admin: this.state.userID, user: userID}})
    }

    getCustomersTable() {
            return (
                <div>
                    <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th>UserID</th>
                                        <th>Email</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(this.state.customers).map((element, index) => {
                                        console.log(index)
                                        return(
                                        <tr id = {"row" + index}>
                                            <td id = {"userID" + index}>{element.userID}</td>
                                            <td>{element.email}</td>
                                            <td>{element.fname}</td>
                                            <td>{element.lname}</td>
                                            <td><button type="button" name="" id="" class="btn btn-primary" btn-lg btn-block onClick = {() => this.handleEdit(index)}>Edit</button></td>
                                            <td><button type="button" name="" id="" class="btn btn-primary" btn-lg btn-block onClick = {() => this.handleDelete(index)}>Delete</button></td>
                                        </tr>
                                        )
                                    })}
                                </tbody>
                        </Table>
                </div>
                )
            }
    

    render() {
        //console.log(this.state)
        const table = this.getCustomersTable()
        return (
            <div>
                
                {this.state.userType === "customer" ?
                    <div>
                        <Navbar user = {this.state.userID} userType = {this.state.userType}/>
                        Welcome, {this.state.userID}
                    </div>
                : <div>
                    <AdminNavbar user = {this.state.userID} userType = {this.state.userType}/>
                    Welcome, {this.state.userID}<br></br>
                    CUSTOMERS:<br></br>
                    {table}
                    
                    </div>
                }
                
            </div>
        )
    }

}

export default Dashboard