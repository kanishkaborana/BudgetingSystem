import React from 'react'
import Navbar from './Navbar'
import AdminNavbar from './AdminNavbar'
import axios from 'axios'
import {API_URL_USERS, API_URL_USER_DELETE, API_URL } from '../config'
import {Table} from 'react-bootstrap'
import { Chart } from "react-google-charts";


/*
    Dashboard Component.
    Contains the functions and JSX for the dashboard page.
    Displays the correct output depending on the user that is logged in,
    admin or customer.
*/
class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userID: this.props.location.state["user"],
            userType: this.props.location.state["userType"],
            user: {},
            customers: [{}],
            expenses: [{}],
            monthlyReport: [{}]
        }
        this.getCustomersTable = this.getCustomersTable.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    // Function to take action once component loads. Fetches user data and expense
    // data for the user from the API.
    componentDidMount() {
        let date = new Date()
        // Fetch data from api
        if (this.state.userType === "admin") {
            axios.get(API_URL_USERS)
            .then((response) => {
                this.setState({customers: response.data})
            })
        }
        else if (this.state.userType === "customer") {
            // API call to fetch the user data
            axios.get(API_URL_USERS + '/' + this.state.userID)
            .then((response) => {
                this.setState({user: response.data})
            })
            // API call to fetch the user expenses for the current year
            axios.get(API_URL + "/expenses/" + this.state.userID + "/year/" + date.getFullYear())
            .then((response) => {
                this.setState({expenses: response.data})
            })
            // API call to fetch expenses for the current month
            axios.get(API_URL + "/expenses/" + this.state.userID + "/monthly/" + date.getFullYear())
            .then((response) => {
                this.setState({monthlyReport: response.data})
            })
        }
    }

    // Function to delete the user from the row selected by an admin
    handleDelete(index) {
        let userID = document.getElementById("userID" + index).innerHTML
        // API call to delete the user
        axios.delete(API_URL_USER_DELETE + '/' + userID)
        .then((response) => {
            //update customers table
            axios.get(API_URL_USERS)
                .then((response) => {
                    this.setState({customers: response.data})
                })
        })
    }

    // Function to redirect the user to the Edit User component that will allow the
    // admin to edit the user they selected.
    handleEdit(index) {
        let userID = document.getElementById("userID" + index).innerHTML
        this.props.history.push({pathname: '/EditUser', state: {admin: this.state.userID, user: userID}})
    }

    // Function to display a table of all the users in the database
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
                            <th>Edit Customer</th>
                            <th>DeleteCustomer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(this.state.customers).map((element, index) => {
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

    // Function to parse the expenses in the state and return a 2D array containing
    // the month and the total expense amount for that month. 
    // Ex: [["January", 1000], ["February", 2000],...]
    updateMonthlyData() {
        let array = [['Month', 'Amount']];
        this.state.monthlyReport.forEach(element => {
            array.push([element.month, element.amount])
        });
        return array
    }
    
    // Function to parse the expenses in the state and return a 2D array containing
    // the expense category sum 
    // Ex: [["January", 1000], ["February", 2000],...]
    updateCategoricalPieData() {
        let rentTotal = 0;
        let entertainmentTotal = 0;
        let utilityTotal = 0;
        let foodTotal = 0;
        let businessTotal = 0;
        let groceriesTotal = 0;
        let otherTotal = 0;
        // Loop through the expenses array
        this.state.expenses.forEach(element => {
            // Check expense category
            switch(element.category) {
                case "Food":
                    foodTotal += element.amount
                    break;
                case "Rent/Mortgage":
                    rentTotal += element.amount
                    break;
                case "Entertainment":
                    entertainmentTotal += element.amount
                    break;
                case "Utility":
                    utilityTotal += element.amount
                    break;
                case "Business":
                    businessTotal += element.amount;
                    break;
                case "Groceries":
                    groceriesTotal += element.amount
                    break;
                default:
                    otherTotal += element.amount
            }
        });
        let arr = [['Category', 'Amount'], 
            foodTotal === 0 ? ['', ''] : ['Food', foodTotal],
            rentTotal === 0 ? ['', ''] : ['Rent/Mortgage', rentTotal],
            entertainmentTotal === 0 ? ['', ''] : ['Entertainment', entertainmentTotal],
            utilityTotal === 0 ? ['', ''] : ['Utility', utilityTotal],
            groceriesTotal === 0 ? ['', ''] : ['Groceries', groceriesTotal],
            businessTotal === 0 ? ['', ''] : ['Business', businessTotal],
            otherTotal === 0 ? ['', ''] : ['Other', otherTotal] ];
        return arr;
    }

    // Function to return a pie chart containing expenses by the month of the current year
    getExpensesByMonth() {
        if(this.state.expenses.length != 0) {
            return (
                <Chart
                    width={'1000px'}
                    height={'700px'}
                    chartType="PieChart"
                    loader={<div>Loading Expense Chart</div>}
                    data={this.updateMonthlyData()}
                    options={{
                        title: 'Expenses By Month',
                        'backgroundColor': 'transparent',
                        pieHole: 0.4,
                        legend: {
                            position: "bottom",
                            textStyle: {
                              color: "233238",
                              fontSize: 14
                            }
                          },
                          chartArea: {
                            left: 100,
                            top: 100,
                            width: "90%",
                            height: "80%"
                          },
                    }}
                    rootProps={{ 'data-testid': '3' }}
                />
            )
        }
        else {
            return (
                <h1>No Expenses</h1>
            )
        }
    }

    // Function to return a pie chart containing expenses by category
    getCategoricalPieGraph() {

        if(this.state.expenses.length !== 0) {
            return (
                <Chart
                    width={'1000px'}
                    height={'700px'}
                    chartType="PieChart"
                    loader={<div>Loading Expense Chart</div>}
                    data={this.updateCategoricalPieData()}
                    options={{
                        title: 'Expenses By Category',
                        'backgroundColor': 'transparent',
                        pieHole: 0.4,
                        legend: {
                            position: "bottom",
                            textStyle: {
                                color: "233238",
                                fontSize: 14
                            }
                            },
                        chartArea: {
                            left: 100,
                            top: 100,
                            width: "90%",
                            height: "80%"
                        },
                    }}
                    rootProps={{ 'data-testid': '3' }}
                />
            )
        }
        else {
            return (
                <h1>No Expenses</h1>
            )
        }    
    }
    
    // Function to get the year budget spending for the customer
    getMonthlyReport() {
        let total = 0;
        this.state.expenses.forEach(element => {
            total += element.amount
        });
        
        return (
            <div>
                <h2>Yearly Spendings</h2>
                <h2>Expenses: ${total}</h2><br/>
                <h2>Income: ${(this.state.user.annIncome - 0.0).toFixed(2)}</h2><br/>
                <h2>Savings: $ {((this.state.user.annIncome - 0.0) - total).toFixed(2)} </h2>
            </div>
        )
    }

    // Function to get the tax bracket for a customer depending on their filing status and
    // annual income
    printTaxBracket(){
        //Based on 2019 tax data
        let tax_bracket;
        let user = this.state.user
        if(user["filingStatus"] = "Single") {
            if(user["annIncome"] <= 9700) {
                tax_bracket = 0.10;
            }
            else if(user["annIncome"] <= 39475) {
                tax_bracket = 0.12;
            }
            else if(user["annIncome"] <= 84200) {
                tax_bracket = 0.22;
            }
            else if(user["annIncome"] <= 160725) {
                tax_bracket = 0.24;
            }
            else if(user["annIncome"] <= 204100) {
                tax_bracket = 0.32;
            }
            else if(user["annIncome"] <= 520300) {
                tax_bracket = 0.35;
            }
            else {
                tax_bracket = 0.37;
            }
        }
        else if(user["filingStatus"] = "Married filing jointly") {
            if(user["annIncome"] <= 19400) {
                tax_bracket = 0.10;
            }
            else if(user["annIncome"] <= 78950) {
                tax_bracket = 0.12;
            }
            else if(user["annIncome"] <= 168400) {
                tax_bracket = 0.22;
            }
            else if(user["annIncome"] <= 321450) {
                tax_bracket = 0.24;
            }
            else if(user["annIncome"] <= 408200) {
                tax_bracket = 0.32;
            }
            else if(user["annIncome"] <= 612350) {
                tax_bracket = 0.35;
            }
            else {
                tax_bracket = 0.37;
            }
        }
        else if(user["filingStatus"] = "Married filing separately") {
            if(user["annIncome"] <= 9700) {
                tax_bracket = 0.10;
            }
            else if(user["annIncome"] <= 39475) {
                tax_bracket = 0.12;
            }
            else if(user["annIncome"] <= 84200) {
                tax_bracket = 0.22;
            }
            else if(user["annIncome"] <= 160725) {
                tax_bracket = 0.24;
            }
            else if(user["annIncome"] <= 204100) {
                tax_bracket = 0.32;
            }
            else if(user["annIncome"] <= 306175) {
                tax_bracket = 0.35;
            }
            else {
                tax_bracket = 0.37;
            }
        }else{
            if(user["annIncome"] <= 13850){
                tax_bracket = 0.10;
            }else if(user["annIncome"] <= 52850){
                tax_bracket = 0.12;
            }else if(user["annIncome"] <= 84200){
                tax_bracket = 0.22;
            }else if(user["annIncome"] <= 160700){
                tax_bracket = 0.24;
            }else if(user["annIncome"] <= 204100){
                tax_bracket = 0.32;
            }else if(user["annIncome"] <= 510300){
                tax_bracket = 0.35;
            }else{
                tax_bracket = 0.37;
            }
        }
        //let tax_brack_statement="Your tax bracket is " + tax_bracket;
        return(
            <div>
                <hr/>
                <h1>
                    Tax Bracket: {tax_bracket}
                </h1>
                
            </div>
        )
    }
            

    // Function to render the dashbaord
    render() {
        const table = this.getCustomersTable()
        const monthlyPieChart = this.getExpensesByMonth()
        const monthlyReport = this.getMonthlyReport()
        const categoricalPieGraph = this.getCategoricalPieGraph()
        
        return (
            <div>
                {/* IF USER IS A CUSTOMER, RENDER THIS */}
                {this.state.userType === "customer" ?
                    <div>
                        <Navbar user = {this.state.userID} userType = {this.state.userType}/>
                        <h2>Welcome, {this.state.userID}</h2>
                        <br></br>
                        <h1>Annual Budget Spread</h1><hr/>
                        <table>
                            <tr>
                                <td>{monthlyPieChart}</td>
                                <td>{categoricalPieGraph}</td>
                            </tr>
                        </table>
                        
                        <h2></h2>
                        {monthlyReport}
                        {this.printTaxBracket()}
                    </div>
                :
                // IF USER IS AN ADMIN, RENDER THIS 
                <div>
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