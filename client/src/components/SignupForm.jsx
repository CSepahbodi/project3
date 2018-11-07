import React, { Component } from 'react';
import axios from 'axios';
import './SignupForm.css';
import { Redirect } from 'react-router-dom';
import { FormGroup, HelpBlock, FormControl } from 'react-bootstrap';

class SignupForm extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      redirectTo: null,
      goodData: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value.trim()
    });
  }

  handleSubmit(event) {
    console.log(this.state.username);
    console.log(this.state.password);
    event.preventDefault();

    if (this.validatePassword() === 'success' && this.validateUsername() === 'success' && this.confirmPassword() === 'success') {
      axios
      .post('/auth/signup', {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        console.log(response);
        if (!response.data.error) {
          console.log('youre good');

        
          this.setState({
            redirectTo: '/auth'
          });
        } else {
          console.log('duplicate');
        }
      });
    } else {
      console.log("Bad Data");
    }
  }

  validateUsername() {
    const length = this.state.username.length;
    if (length <= 0) {
      return 'error';
    }
    else {
      return 'success';
    }
  }

  validatePassword() {
    const length = this.state.password.length;
    if (length <= 0) {
      return 'error';
    }
    else {
      return 'success';
    }
  }

  confirmPassword() {
    const password = this.state.password;
    const confirm = this.state.confirmPassword;

    if (password !== confirm) {
      return 'error';
    }
    else {
      return 'success';
    }
  }




  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    }
    return (
      <div className="signup-form-container">
        <form action="">
          <h1>Sign Up</h1>
          <FormGroup
          validationState={this.validateUsername()}
          >
            <FormControl
              type="text"
              name="username"
              placeholder={'Username'}
              value={this.state.username}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup
          validationState={this.validatePassword()}
          >
            <FormControl
              type="password"
              name="password"
              placeholder={'Password'}
              value={this.state.password}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup
          validationState={this.confirmPassword()}
          >
            <FormControl
              type="password"
              name="confirmPassword"
              placeholder={'Confirm Password'}
              value={this.state.confirmPassword}
              onChange={this.handleChange}
            />
						<HelpBlock>
							<a className="login-link" onClick={this.props.signinRedirect} href="/#">Already have one?</a>
				  	</HelpBlock>
          </FormGroup>
        </form>
        <button className="sign-up" onClick={this.handleSubmit}>Sign up</button>
      </div>
    );
  }
}
export default SignupForm;
