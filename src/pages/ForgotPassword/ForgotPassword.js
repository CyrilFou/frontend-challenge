import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { createBrowserHistory } from "history";
import axios from "axios";

import './ForgotPassword.scss';

const history = createBrowserHistory({ forceRefresh: true });
var url = "http://165.227.42.25";
class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };
    this.resetPassword = this.resetPassword.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  emailValidator(email) {
    let emailPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    // console.log(emailPattern.test(email));
    return emailPattern.test(email);
  };

  resetPassword = async e => {
    try {
        e.preventDefault();
        this.emailValidator(this.state.email);
        await axios.post(url + "/frontend/reset_password", {
            email: this.state.email
        }).then(res => {
            console.log(res.data.code);
            if(res.data.code==="Reset successful"){
              //need to develop that page
                history.push("signIn");
            }else{
                alert("Please try again!");
            }
        })
    } catch (e) {
        alert(e.message);
    }
};

  render() {
    return <div className="signin-container">
      <div >
        <form >
          <div className="form-group">
            <input type="email" className="form-control" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} required></input>
          </div>
          <div >
            <button type="submit" name="signIn" className=" btn btn-info fogotpwd btn">Forgot Password</button>
          </div>
        </form>
      </div>
      <div className="signup-options-container">
        <NavLink to="/signIn" className="signup-link">Sign In</NavLink>
        <NavLink to="/signUp" className="forgot-password-link">Sign Up</NavLink>

      </div>
    </div>
  }
}

export default ForgotPassword;
