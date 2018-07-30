import React, {Component} from 'react';
import Button from '../Button/Button';
// import Wait from '../Wait/Wait';
import "./Welcome.css";

export default class Welcome extends Component {

    // home page.  Get started button will take you to auth0 login.  If it is the user's first time logging in, it will take them to the get started questions.  If not it will redirect them to the forum.

    login() {
        let {REACT_APP_DOMAIN, REACT_APP_CLIENT_ID} = process.env;
        let redirectUri = encodeURIComponent(`${window.origin}/auth/callback`);
        window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`;
    }
    
    
    render() {
        return (
            <div className="welcome">
                <img src="http://i67.tinypic.com/33lm8g4.jpg" alt=""/>
                <h1>Ozzy</h1>
                <div onClick={() => this.login()}><Button text="Get Started"/></div>
            </div>
        )
    }
}