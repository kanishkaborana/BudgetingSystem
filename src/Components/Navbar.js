import React from 'react'
import logoutIcon from './Images/logout-icon.svg'
import moneyIcon from './Images/money.svg'
import plusIcon from './Images/plus-icon.svg'
import profileIcon from './Images/profile-icon.svg'
import { Link } from 'react-router-dom'


class Navbar extends React.Component {

    constructor(props){
        super(props)
    }

    

    render(){
        return (
            
            <div>
                <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
                    <Link to = {{pathname: '/Dashboard', state: {user: this.props.user, userType: this.props.userType}}}>
                        <a class="navbar-brand" style = {{color: "white"}}>Where's My Money?
                    <img src={moneyIcon} style = {{height: 30, width: 40}}></img>
                    </a>
                    </Link>
                    
                
                    <div class="collapse navbar-collapse" id="collapsibleNavId">
                        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                        <Link to = {{pathname: '/AddExpense', state: {user: this.props.user, userType: this.props.userType}}}>
                            <a class="nav-link" style = {{color: "white"}}>Add Expense
                            <img src={plusIcon} style = {{height: 30, width: 40}}></img>
                            </a>
                        </Link>
                        <li class="nav-item active">
                        <Link to = {{pathname: '/ManageExpense', state: {user: this.props.user, userType: this.props.userType}}}>
                            <a class="nav-link"> Manage Expenses</a>
                        </Link>
                        </li>
                        <li class="nav-item active">
                            <Link to = {{pathname: '/Profile/' + this.props.user, state: {userType: this.props.userType}}}>
                                <a class = 'nav-link' style = {{color: "white"}}>
                                Profile <span ><img src={profileIcon} style = {{height: 30, width: 30}}></img></span>
                                </a>
                            </Link>
                        </li>           
                        </ul>
                        <form class="form-inline my-2 my-lg-0">
                            <Link to = ''>
                                <a class = 'nav-item active' style = {{color: "white"}}>
                                Logout <span ><img src={logoutIcon} style = {{height: 30, width: 30}}></img></span>
                                </a>
                            </Link>
                        
                        </form>
                    </div>
                </nav>
            </div>
        )
    
    }
}
export default Navbar


