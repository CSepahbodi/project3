import React, { Component } from 'react';
import Master from '../Master';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Auth extends Component {

  state = {
    redirectTo: null
  }

  componentDidMount = () => {
    axios
      .get('/auth/user')
      .then(response => {
        //console.log(response);
        const { user } = response.data;
        if (user === null) {
          this.setState({ redirectTo: '/' });
        } 
        else {
          this.props.loginUser(user);
        }
      });
  }

  render() {
    return this.state.redirectTo === null ? <Master {...this.props}/> : <Redirect to={{ pathname: this.state.redirectTo }} />
  }
}

export default Auth;