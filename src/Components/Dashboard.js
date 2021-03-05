import React from 'react'
import ReactDOM from 'react-dom'
import Navbar from './Navbar'
class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userID: this.props.location.state["user"]

        }
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <Navbar user = {this.state.userID}/>
                Welcome, {this.state.userID}
            </div>
        )
    }

}

export default Dashboard