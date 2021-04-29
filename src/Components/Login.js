import React from 'react'
import '../Styles/Custom.scss'
import {Form, Button} from 'react-bootstrap'


/*
    Login Component.
    Contains the functions and JSX for the login webpage
*/
class Login extends React.Component {
    // props containing a login() that is used to authenticated user credentials
    constructor(props){
        super(props);
        // Default state
        this.state = {
            userID: "",
            password: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Function to read user input and update state
    handleChange(event) {
        let newUserID = this.state.userID
        let newPassword = this.state.password
        if (event.target.name === "userID"){
            newUserID = event.target.value
        }
        else if (event.target.name === "password") {
            newPassword = event.target.value
        }
        this.setState({
            userID: newUserID,
            password: newPassword
        });
        
    }

    // Function to handle user form submission
    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            userID: this.state.userID,
            password: this.state.password
        });
        // Call the login function referenced in the props
        this.props.Login({userID: this.state.userID, password: this.state.password})
    }

    // Render function containing JSX and HTML
    render(){
        return(
            
            <div id="loginContainer">
                <h1>Login</h1>
                <Form className = "loginForm" id = "login" onSubmit = {this.handleSubmit}>
                    <Form.Group controlid = "userIDForm" >
                        <Form.Label className = "label1">Username</Form.Label>
                        <Form.Control type = "text" name = "userID" placeholder = "Enter username" className = "input1" onChange = {this.handleChange} required/>
                    </Form.Group>

                    <Form.Group controlid = "passForm">
                        <Form.Label className = "label1">Password</Form.Label>
                        <Form.Control type = "password" name = "password" placeholder = "Enter password" className = "input1" onChange = {this.handleChange} required/>
                        <Form.Text className = "confirmPass">{this.props.errors}</Form.Text>
                    </Form.Group>
                    <Form.Group className = "btn1">
                        <Button variant = "primary" type = "submit" >Login</Button>
                        <Button href='/Register' variant = "primary" className = "link1">Register an Account</Button>
                    </Form.Group>
                </Form>
            </div>
        );
    }
}

export default Login;