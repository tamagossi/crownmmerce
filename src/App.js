import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import Shop from './pages/shop/shop.component';
import SignAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import './App.css'

export default class App extends React.Component {
  constructor(){
   super();

   this.state = {
     currentUser: null
   }
 }

 unsubscribeFromAuth = null;
 
 componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = createUserProfileDocument(userAuth);
        
        userRef.onSnapshot(snapShot => {
          this.setState({
            id: snapShot.id,
            ...snapShot.data()
          })
        })
      }

      this.setState({ currentUser: userAuth });
    });
 }

 componentWillUnmount() {
   this.unsubscribeFromAuth();
 }

  render() {
    return (
      <div className='App'>
        <Header currentUser={ this.state.currentUser } />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={Shop} />
          <Route path="/sign-in" component={SignAndSignUp} />
        </Switch>
      </div>
    )
  }
}
