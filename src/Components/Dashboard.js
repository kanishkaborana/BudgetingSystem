import React from 'react'
import ReactDOM from 'react-dom'

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name : "",
            userID : ""
        }
    }

    render() {
        return (
            <div>
                Welcome, {this.state.name}
            </div>
        )
    }

}

export default Dashboard