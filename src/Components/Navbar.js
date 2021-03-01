import React from 'react'
import logoutIcon from './Images/logout-icon.svg'
import moneyIcon from './Images/money.svg'

class Navbar extends React.Component {

    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit() {
        this.props.logout()
    }

    render(){
        if (this.props.loggedIn === true) {
            return (
                
                <div>
                    <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
                        <a class="navbar-brand" style = {{color: "white"}} >Where's My Money?
                        <img src={moneyIcon} style = {{height: 30, width: 40}}></img>
                        </a>
                    
                        <div class="collapse navbar-collapse" id="collapsibleNavId">
                            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                                <li class="nav-item active">
                                    <a class="nav-link" href="#"> Add Expense </a>
                                </li>
                                <li class="nav-item active">
                                    <a class="nav-link" href="#"> Manage Expenses</a>
                                </li>
                                <li class="nav-item active">
                                    <a class="nav-link" href="#"> Profile</a>
                                </li>           
                            </ul>
                            <form class="form-inline my-2 my-lg-0">
                                
                                <button class="btn" style = {{color: "white"}} onSubmit = {this.handleSubmit} >
                                        Logout <span ><img src={logoutIcon} style = {{height: 30, width: 30}}></img></span>
                                </button>
                            
                            </form>
                        </div>
                    </nav>
                </div>
            )
        }
        else {
            return null
        }
        
}
}
export default Navbar


