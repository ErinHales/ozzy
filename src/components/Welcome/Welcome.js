import React, {Component} from 'react';
import Button from '../Button/Button';
import "./Welcome.css";

export default class Welcome extends Component {

    login() {
        let {REACT_APP_DOMAIN, REACT_APP_CLIENT_ID} = process.env;
        let redirectUri = encodeURIComponent("http://localhost:4000/auth/callback");
        window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`;
    }
    
    
    render() {
        return (
            <div className="welcome">
                <img src="http://i67.tinypic.com/33lm8g4.jpg" alt=""/>
                <h1>Ozzy</h1>
                <button onClick={() => this.login()}><Button text="Get Started"/></button>
            </div>
        )
    }
}