import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
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
            messageArr.push(<Link to={`/message/${thread.care_provider}`} className="messageLink"><div className="messageThread"><p>{thread.name}</p><img src={thread.image} alt="care provider"/></div></Link>);
        })
        return (
            <div>
                {messageArr}
            </div>
        )
    }
}