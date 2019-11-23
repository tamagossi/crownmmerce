import React, { Component } from 'react'
import './sign-in.style.scss'

import FormInput from './../form-input/form-input.component';
import CustomButton from './../custom-button/custom-button.component';

import { auth, signInWithGoogle } from './../../firebase/firebase.utils';

export default class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    }
  }

  handleSubmit = async event => {
    event.preventDefault();
    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({
        email: '',
        password: ''
      })
    } catch (error) { console.log(error); }

  }

  handleChange = event => {
    const { value, name } = event.target;
    this.setState({[name]: value})
  }

  render() {
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={ this.handleSubmit }>
          <FormInput name='email' 
            label="Email"
            type="email"
            value={ this.state.email }
            handleChange={ this.handleChange }
            required
          />

          <FormInput name='password' 
            label="Password"
            type="password"
            value={ this.state.password }
            handleChange={ this.handleChange }
            required
          />


          <div className="button-container">
            <CustomButton type="submit">Sign In</CustomButton>
            <CustomButton 
              isGoogleButton
              onClick={ signInWithGoogle }
              style={{marginTop: '10px'}}
            >Sign In With Google</CustomButton>
          </div>
        </form>
      </div>
    )
  }
}
