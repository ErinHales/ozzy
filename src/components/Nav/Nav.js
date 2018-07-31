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
        }).catch(err => {
            console.error(err)
        })
    }

    toggleMenu() {
        // will disable menu if you are in the getstarted phase when you first create and account
        if (window.location.hash !== "#/getstarted") {
            this.setState({
                menu: !this.state.menu
            })
        }
    }

    render() {
        // will not display navigation bar or menu before user has logged in
        if (window.location.hash === "#/") {
            return <div></div>;
        } else {
            return (
                <div>
                    {/* click anywhere on the nav bar to see the slideDown menu */}
                    <div className="nav" onClick={() => this.toggleMenu()}>
                        <div className="navContainer">
                            <img src="http://i64.tinypic.com/2q8smdi.jpg" alt="" className="navIcon" />
                            <div className="navHeader">
                                <img src={this.state.userPhoto} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className={this.state.menu ? "menuOn" : "menuOff"}>
                        <div className="menuLinks">
                            <div className="menuItem">
                                <img src="http://i68.tinypic.com/289a80g.jpg" alt="Forum" />
                                <Link className="link" to="/forum" onClick={() => this.toggleMenu()}>Forum</Link><br />
                            </div>
                            <div className="menuItem">
                                <img src="http://i68.tinypic.com/3130vwh.jpg" alt="new post" />
                                <Link className="link" to="/new" onClick={() => this.toggleMenu()}>Create Post</Link><br />
                            </div>
                            <div className="menuItem">
                                <img src="http://i68.tinypic.com/xfz446.jpg" alt="" />
                                <Link className="link" to="/find" onClick={() => this.toggleMenu()}>Find Child Care</Link>
                            </div>
                            <div className="menuItem">
                                <img src="http://i67.tinypic.com/fvg4t5.jpg" alt="" />
                                <Link className="link" to="/messages" onClick={() => this.toggleMenu()}>Messages</Link><br />
                            </div>
                            <div className="menuItem">
                                <img src="http://i67.tinypic.com/2cdfneu.jpg" alt="" />
                                <Link className="link" to="/calendar" onClick={() => this.toggleMenu()}>Calendar</Link><br />
                            </div>
                            <div className="menuItem">
                                <img src="http://i63.tinypic.com/2yl6zci.jpg" alt="profile" />
                                <Link className="link" to="/profile" onClick={() => this.toggleMenu()}>Profile</Link>
                            </div>
                            <div className="menuItem">
                                <img src="http://i68.tinypic.com/2sbpi0o.jpg" alt="profile" />
                                <Link className="link" to="/privacyPolicy" onClick={() => this.toggleMenu()}>Privacy Policy</Link>
                            </div>
                            <div className="menuItem">
                                <img src="http://i63.tinypic.com/35jcg04.jpg" alt="" />
                                <Link className="link" to="/" onClick={() => this.toggleMenu()}>Logout</Link><br />
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}