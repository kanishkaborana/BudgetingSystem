import React, { Component } from 'react'


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
