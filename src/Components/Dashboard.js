import React from 'react'
import ReactDOM from 'react-dom'
import Navbar from './Navbar'
import AdminNavbar from './AdminNavbar'
import axios from 'axios'
import {API_URL_USERS, API_URL_USER_DELETE, API_URL } from '../config'
import {Table} from 'react-bootstrap'
import {Link, Redirect} from 'react-router-dom'
import { Chart } from "react-google-charts";

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userID: this.props.location.state["user"],
            userType: this.props.location.state["userType"],
            user: {},
            customers: [{}],
            expenses: [{}]
        }
        this.getCustomersTable = this.getCustomersTable.bind(this)
        this.getExpenseGraph = this.getExpenseGraph.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    componentDidMount() {
        if (this.state.userType === "admin") {
            axios.get(API_URL_USERS)
            .then((response) => {
                this.setState({customers: response.data})
                console.log((this.state.customers[0]))
            })
        }
        else if (this.state.userType === "customer") {
            axios.get(API_URL_USERS + '/' + this.state.userID)
            .then((response) => {
                console.log("api reponse")
                console.log(response.data)
                this.setState({user: response.data})
            })
            console.log("compontent mounting...")
            console.log(this.state.user)
            axios.get(API_URL + "/expense/" + this.state.userID)
            .then((response) => {
                this.setState({expenses: response.data})
                console.log(this.state.expenses)
            })
        }
        console.log(this.state)
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
    

    
 

    updatePieData() {
        console.log("updating pie data...")
        let array = [['Expense', 'Amount']];
        let color = '#FA3005' //RED
        this.state.expenses.forEach(element => {
            array.push([element.expenseTitle, element.amount])
        });
        return array
    }
    
    updateCategoricalPieData() {
        let rentTotal = 0;
        let entertainmentTotal = 0;
        let utilityTotal = 0;
        let foodTotal = 0;
        let businessTotal = 0;
        let groceriesTotal = 0;
        let otherTotal = 0;
        this.state.expenses.forEach(element => {
            console.log(element)
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
            foodTotal == 0 ? ['', ''] : ['Food', foodTotal],
            rentTotal == 0 ? ['', ''] : ['Rent/Mortgage', rentTotal],
            entertainmentTotal == 0 ? ['', ''] : ['Entertainment', entertainmentTotal],
            utilityTotal == 0 ? ['', ''] : ['Utility', utilityTotal],
            groceriesTotal == 0 ? ['', ''] : ['Groceries', groceriesTotal],
            businessTotal == 0 ? ['', ''] : ['Business', businessTotal],
            otherTotal == 0 ? ['', ''] : ['Other', otherTotal] ];
        console.log(arr)
        return arr;
    }

    getExpenseGraph() {

        if(this.state.expenses.length != 0) {
            return (
                <Chart
                    width={'1000px'}
                    height={'700px'}
                    chartType="PieChart"
                    loader={<div>Loading Expense Chart</div>}
                    data={this.updatePieData()}
                    options={{
                        title: 'Expenses',
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

    getCategoricalPieGraph() {

        if(this.state.expenses.length != 0) {
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
    

    getMonthlyReport() {
        console.log(this.state.user)
        let total = 0;
        this.state.expenses.forEach(element => {
            total += element.amount
        });
        
        return (
            <div>
                <h2>Expenses: ${total}</h2><br/>
                <h2>Income: ${(this.state.user.annIncome / 12).toFixed(2)}</h2><br/>
                <h2>Savings: $ {this.state.user.annIncome - total} </h2>
            </div>
        )
    }

    printTaxBracket(){
        //Based on 2019 tax data
        let tax_bracket;
        let user = this.state.user
        if(user["filingStatus"]="Single"){
            if(user["annIncome"]<=9700){
                tax_bracket=0.10;
            }else if(user["annIncome"]<=39475){
                tax_bracket=0.12;
            }else if(user["annIncome"]<=84200){
                tax_bracket=0.22;
            }else if(user["annIncome"]<=160725){
                tax_bracket=0.24;
            }else if(user["annIncome"]<=204100){
                tax_bracket=0.32;
            }else if(user["annIncome"]<=520300){
                tax_bracket=0.35;
            }else{
                tax_bracket=0.37;
            }
        }else if(user["filingStatus"]="Married filing jointly"){
            if(user["annIncome"]<=19400){
                tax_bracket=0.10;
            }else if(user["annIncome"]<=78950){
                tax_bracket=0.12;
            }else if(user["annIncome"]<=168400){
                tax_bracket=0.22;
            }else if(user["annIncome"]<=321450){
                tax_bracket=0.24;
            }else if(user["annIncome"]<=408200){
                tax_bracket=0.32;
            }else if(user["annIncome"]<=612350){
                tax_bracket=0.35;
            }else{
                tax_bracket=0.37;
            }
        }else if(user["filingStatus"]="Married filing separately"){
            if(user["annIncome"]<=9700){
                tax_bracket=0.10;
            }else if(user["annIncome"]<=39475){
                tax_bracket=0.12;
            }else if(user["annIncome"]<=84200){
                tax_bracket=0.22;
            }else if(user["annIncome"]<=160725){
                tax_bracket=0.24;
            }else if(user["annIncome"]<=204100){
                tax_bracket=0.32;
            }else if(user["annIncome"]<=306175){
                tax_bracket=0.35;
            }else{
                tax_bracket=0.37;
            }
        }else{
            if(user["annIncome"]<=13850){
                tax_bracket=0.10;
            }else if(user["annIncome"]<=52850){
                tax_bracket=0.12;
            }else if(user["annIncome"]<=84200){
                tax_bracket=0.22;
            }else if(user["annIncome"]<=160700){
                tax_bracket=0.24;
            }else if(user["annIncome"]<=204100){
                tax_bracket=0.32;
            }else if(user["annIncome"]<=510300){
                tax_bracket=0.35;
            }else{
                tax_bracket=0.37;
            }
        }
        let tax_brack_statement="Your tax bracket is " + tax_bracket;
        return(
            <div>
                <hr/>
                <h1>
                    Tax Bracket: {tax_bracket}
                </h1>
                
            </div>
        )
    }
            


    render() {
        //console.log(this.state)
        const table = this.getCustomersTable()
        const pieGraph = this.getExpenseGraph()
        const monthlyReport = this.getMonthlyReport()
        const categoricalPieGraph = this.getCategoricalPieGraph()
        const date = new Date()
        const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

        return (
            <div>
                
                {this.state.userType === "customer" ?
                    <div>
                        <Navbar user = {this.state.userID} userType = {this.state.userType}/>
                        <h2>Welcome, {this.state.userID}</h2>
                        <br></br>
                        <h1>{monthNames[date.getMonth()]}'s Expense Chart</h1><hr/>
                        {pieGraph}
                        {categoricalPieGraph}
                        {monthlyReport}
                        {this.printTaxBracket()}
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