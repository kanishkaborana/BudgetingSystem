import React, { Component } from 'react'
import Navbar from './Navbar'
import { Chart } from "react-google-charts";
import { API_URL_EXPENSES } from '../config';
import axios from 'axios';


export default class CompareExpense extends Component {

    constructor(props){
        super(props);
        this.state = {
            userID: this.props.location.state["user"],
            userType: this.props.location.state["userType"],
            month1: "",
            month2: "",
            expense1: [{}],
            expense2: [{}]
        }
    }

    updatePieData(expenses) {
        let array = [['Expense', 'Amount']];
        expenses.forEach(element => {
            array.push([element.expenseTitle, element.amount])
        });
        return array
    }

    updateCategoricalPieData(expenses) {
        let rentTotal = 0;
        let entertainmentTotal = 0;
        let utilityTotal = 0;
        let foodTotal = 0;
        let businessTotal = 0;
        let groceriesTotal = 0;
        let otherTotal = 0;
        expenses.forEach(element => {
            
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
        return arr;
    }

    getExpenseGraph(expenses) {

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

    updateExpense1() {
        if (this.state.month1 != "") {
            let year = this.state.month1.substring(0,4)
            let month = parseInt(this.state.month1.substring(5,7)) - 1
            
            console.log(API_URL_EXPENSES + "/" + this.state.userID + "/month/" + month + "/year/" + year)
            axios.get(API_URL_EXPENSES + "/" + this.state.userID + "/month/" + month + "/year/" + year)
            .then((response) => {
                this.setState({expense1: response.data})
            })
            console.log(this.state.expense1)
        }
    }

    updateExpense2() {
        if (this.state.month2 != "") {
            let year = this.state.month2.substring(0,4)
            let month = parseInt(this.state.month2.substring(5,7)) - 1
            axios.get(API_URL_EXPENSES + "/" + this.state.userID + "/month/" + month + "/year/" + year)
            .then((response) => {
                this.setState({expense2: response.data})
            })
        }
    }

    compare() {
        console.log("clicked!")
        this.updateExpense1();
        this.updateExpense2();
    }

    handleClick() {
        console.log('hello world')
    }

    render() {
        let date = new Date()
        let graph1 = this.getExpenseGraph(this.state.expense1)
        let graph2 = this.getExpenseGraph(this.state.expense2)
        let graph1Category = this.getExpenseGraphCategory(this.state.expense1)
        let graph2Category = this.getExpenseGraphCategory(this.state.expense2)

        return (
            <div>
                <Navbar user = {this.props.location.state["user"]} userType = {this.props.location.state["userType"]}/>
              
                <input type="button" value="Compare" onClick={this.compare.bind(this)}/>
                

                <table> 
                    <tr>
                        <th>Month 1<input type="month" id="month1" name="month1" onChange={(event) => this.setState({month1: event.target.value})} required></input></th>
                        <th>Month 2<input type="month" id="month1" name="month1" onChange={(event) => this.setState({month2: event.target.value})} required></input></th>
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
