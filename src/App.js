import React, {Fragment} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import './App.css';

import setAuthToken from './utils/setAuthToken';

import Navbar from './components/layout/Navbar';
import Alerts from './components/layout/Alerts';
import Home from './components/pages/Home';
import About from './components/pages/About';
import RegisterUser from './components/auth/RegisterUser';
import LoginUser from './components/auth/LoginUser';
import PrivateRoute from './routing/PrivateRoute';

if(localStorage.getItem('token')){
    setAuthToken(localStorage.getItem('token'))
}

function App() {
    return (<AuthState>
        <ContactState>
            <AlertState>
                <BrowserRouter>
                    <Fragment>
                        <Navbar/>
                        <div className="container">
                            <Alerts />
                            <Switch>
                                <PrivateRoute path='/' exact
                                    component={Home}/>
                                <Route path='/about'
                                    component={About}/>
                                <Route path='/register'
                                    component={RegisterUser}/>
                                <Route path='/login'
                                    component={LoginUser}/>
                            </Switch>
                        </div>
                    </Fragment>
                </BrowserRouter>
            </AlertState>
        </ContactState>
    </AuthState>);
}

export default App;
