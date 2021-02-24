import React from 'react'
import ReactDOM from 'react-dom'

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userID: this.props.user

        }
    }

    render() {
        return (
            <div>
                Welcome, {this.state.userID}
            </div>
        )
    }

}

export default Dashboard