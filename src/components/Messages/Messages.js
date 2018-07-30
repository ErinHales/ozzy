import React, { Component } from 'react';
import axios from 'axios';
import ViewConvo from '../ViewConvos/ViewConvo';
import "./Messages.css";

export default class Messages extends Component {
    constructor() {
        super();

        this.state = {
            messages: []
        }
    }

    componentDidMount() {
        axios.get("/api/messages").then(response => {
            this.setState({
                messages: response.data
            })
        })
    }

    render() {
        let messageArr = [];
        this.state.messages.forEach(thread => {
            messageArr.push(<ViewConvo thread={thread} />);
        })
        return (
            <div className="viewMessagesContainer">
                <div className="viewMessages">
                    {messageArr}
                </div>
            </div>
        )
    }
}