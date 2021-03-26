import React from 'react'
import logoutIcon from './Images/logout-icon.svg'
import moneyIcon from './Images/money.svg'
import { Link } from 'react-router-dom'


class AdminNavbar extends React.Component {

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
                                <li class="nav-item active">
                                    <a class="nav-link" href="#"> Add User </a>
                                </li>
                                <li class="nav-item active">
                                    <a class="nav-link" href="#"> Edit User</a>
                                </li>
                                <li class="nav-item active">
                                    <Link to = {{pathname: '/Profile/' + this.props.user, state: {userType: this.props.userType}}}>
                                        Profile
                                    </Link>
                                </li>           
                            </ul>
                            <form class="form-inline my-2 my-lg-0">
                                <Link to = ''>
                                    Logout <span ><img src={logoutIcon} style = {{height: 30, width: 30}}></img></span>
                                </Link>
                                {/* <button class="btn" style = {{color: "white"}} onSubmit = {this.handleSubmit} >
                                        
                                </button> */}
                            
                            </form>
                        </div>
                    </nav>
                </div>
            )
        
}
}
export default AdminNavbar


