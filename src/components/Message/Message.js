import React, { Component } from 'react';
import "./Message.css";

export default class Message extends Component {
    render() {
        if (this.props.messageData.messager === "User") {
            return (
                <div className="userMessage">
                    <div>
                        <p>{this.props.messageData.message}</p>
                        <h5>{this.props.messageData.date}</h5>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="careProviderMessage">
                    <div style={{ backgroundColor: this.props.messageData.color }}>
                        <p>{this.props.messageData.message}</p>
                        <h5>{this.props.messageData.date}</h5>
                    </div>
                </div>
            )
        }
    }
}