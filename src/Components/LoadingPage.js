import React, { Component } from 'react'

/*
    Loading page Component.
    Contains the functions and JSX for the loading page.
    Meant to confirm a user form and redirect user to a webpage
*/
export default class LoadingPage extends Component {

    render(props) {
        return (
            <div>
               {this.props.status}
               <br></br>
               <a name="" id="" class="btn btn-primary" href={this.props.button} role="button">{this.props.buttonText}</a>           
            </div>
        )
    }
}
