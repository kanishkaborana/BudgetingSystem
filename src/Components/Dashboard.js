import React from 'react'
import ReactDOM from 'react-dom'
import Navbar from './Navbar'
import AdminNavbar from './AdminNavbar'
import axios from 'axios'
import {API_URL_USERS } from '../config'
import {Table} from 'react-bootstrap'

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

    handleDelete() {
        
    }

    getCustomersTable() {
        console.log((this.state.customers[0]).dob)
            //console.log("hi" + (this.state.customers[0])['userID'])
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
                                    {(this.state.customers).map(element => {
                                        console.log(element.userID)
                                        return(
                                        <tr>
                                            <td>{element.userID}</td>
                                            <td>{element.email}</td>
                                            <td>{element.fname}</td>
                                            <td>{element.lname}</td>
                                            <td><button type="button" name="" id="" class="btn btn-primary" btn-lg btn-block>Edit</button></td>
                                            <td><button type="button" name="" id="" class="btn btn-primary" btn-lg btn-block onClick = {this.handleDelete()}>Delete</button></td>
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