import React, { Component } from 'react';
import "./Message.css";

export default class Message extends Component {
    render() {
        if (this.props.messageData.messager === "User") {
            return (
                <div className="userMessage">
                    {/* <h5>{this.props.messageData.date}</h5> */}
                    <p>{this.props.messageData.message}</p>
                </div>
            )
        } else {
            return (
                <div className="careProviderMessage">
                    {/* <h5>{this.props.messageData.date}</h5> */}
                    <p style={{ backgroundColor: this.props.messageData.color }}>{this.props.messageData.message}</p>
                </div>
            )
        }
    }
}