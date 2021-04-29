import React, { Component } from 'react'
import Navbar from './Navbar'
import { Chart } from "react-google-charts";
import { API_URL_EXPENSES } from '../config';
import axios from 'axios';

/*
    Compare Expense Component.
    Contains the functions and JSX for the webpage that compares two expenses
    side-by-side.
*/
export default class CompareExpense extends Component {

    constructor(props){
        super(props);
        // Default state
        this.state = {
            userID: this.props.location.state["user"],
            userType: this.props.location.state["userType"],
            month1: "",
            month2: "",
            expense1: [{}],
            expense2: [{}]
        }
    }

    // Function to parse expenses into a 2D array containing all the expense
    // title with the expense amount. Ex: [["Groceries", 100], ["Gas", 20],...]
    updatePieData(expenses) {
        // First element is the header of each column
        let array = [['Expense', 'Amount']];
        expenses.forEach(element => {
            array.push([element.expenseTitle, element.amount])
        });
        return array
    }

    // Function to parse expenses and sum up the expenses by categories and store
    // the data into a 2D array containing the category with the sum. 
    // Ex: [["Food", 100], ["Entertainment", 20],...]
    updateCategoricalPieData(expenses) {
        let rentTotal = 0;
        let entertainmentTotal = 0;
        let utilityTotal = 0;
        let foodTotal = 0;
        let businessTotal = 0;
        let groceriesTotal = 0;
        let otherTotal = 0;
        // Loop through array
        expenses.forEach(element => {
            // Check category
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
            otherTotal == 0 ? ['', ''] : ['Other', otherTotal]];
        return arr;
    }

    // Function to return a pie chart containing expenses
    getExpenseGraph(expenses) {
        // Check if expenses array is empty
        if(expenses.length != 0) {
            return (
                <Chart
                    width={'1000px'}
                    height={'700px'}
                    chartType="PieChart"
                    loader={<div>Loading Expense Chart</div>}
                    data={this.updatePieData(expenses)}
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
    // Function to return a pie chart containing expenses by category
    getExpenseGraphCategory(expenses) {
        if(expenses.length != 0) {
            return (
                <Chart
                    width={'1000px'}
                    height={'700px'}
                    chartType="PieChart"
                    loader={<div>Loading Expense Chart</div>}
                    data={this.updateCategoricalPieData(expenses)}
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

    // Update the state of expense1 depending on the month selected by the user
    updateExpense1() {
        if (this.state.month1 != "") {
            // Parse month and year from string
            let year = this.state.month1.substring(0,4)
            let month = parseInt(this.state.month1.substring(5,7)) - 1
            // Call the API to get the list of expenses for the selected month
            axios.get(API_URL_EXPENSES + "/" + this.state.userID + "/month/" + month + "/year/" + year)
            .then((response) => {
                this.setState({expense1: response.data})
            })
        }
    }

    // Update the state of expense2 depending on the month selected by the user
    updateExpense2() {
        if (this.state.month2 != "") {
            // Parse month and year from string
            let year = this.state.month2.substring(0,4)
            let month = parseInt(this.state.month2.substring(5,7)) - 1
            // Call the API to get the list of expenses for the selected month
            axios.get(API_URL_EXPENSES + "/" + this.state.userID + "/month/" + month + "/year/" + year)
            .then((response) => {
                this.setState({expense2: response.data})
            })
        }
    }

    // Function to when user clicks the 'Compare' button
    compare() {
        this.updateExpense1();
        this.updateExpense2();
    }

    // Function to render the two pie graphs for each month
    render() {
        let graph1 = this.getExpenseGraph(this.state.expense1)
        let graph2 = this.getExpenseGraph(this.state.expense2)
        let graph1Category = this.getExpenseGraphCategory(this.state.expense1)
        let graph2Category = this.getExpenseGraphCategory(this.state.expense2)

        return (
            <div>
                <Navbar user = {this.props.location.state["user"]} userType = {this.props.location.state["userType"]}/>
       
                <table> 
                    <tr>
                        <th>Month 1<input type="month" id="month1" name="month1" onChange={(event) => this.setState({month1: event.target.value})} required></input></th>
                        <th>Month 2<input type="month" id="month1" name="month1" onChange={(event) => this.setState({month2: event.target.value})} required></input></th>
                    </tr> 
                    <tr>
                        <td><input type="button" value="Compare" onClick={this.compare.bind(this)}/></td>
                    </tr>
                    <tr> 
                        <td>{graph1}</td> 
                        <td>{graph2}</td> 
                    </tr> 

                    <tr> 
                        <td>{graph1Category}</td> 
                        <td>{graph2Category}</td> 
                    </tr>
                </table>  

            </div>
        )
    }
}
