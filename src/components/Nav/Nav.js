import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./Nav.css";

export default class Nav extends Component {
    constructor() {
        super();

        this.state = {
            userPhoto: "",
            menu: false
        }
    }

    componentDidMount() {
        axios.get("/api/secure-data").then(res => {
            this.setState({
                userPhoto: res.data.picture
            })
        })
    }
    
    toggleMenu() {
        this.setState({
            menu: !this.state.menu
        })
    }

    render() {
        if (window.location.hash === "#/") {
            return <div></div>;
        } else {
            return (
                <div>
                    <div className="nav" onClick={() => this.toggleMenu()}>
                        <h1>Ozzy</h1>
                        <img src={this.state.userPhoto} alt="" />
                    </div>
                    <div className={this.state.menu ? "menuOn" : "menuOff"}>
                        <div className="menuLinks">
                            <Link className="link" to="/forum">Forum</Link><br/>
                            <Link className="link" to="/new">Create Post</Link><br/>
                            <Link className="link" to="/">Logout</Link><br/>
                        </div>
                    </div>
                </div>
            )
        }
    }
}