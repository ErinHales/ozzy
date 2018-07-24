import React, { Component } from 'react';
import "./Convo.css";
import axios from 'axios';
import socketIOClient from 'socket.io-client';
import Message from '../Message/Message';

export default class Convo extends Component {
    constructor() {
        super();

        this.state = {
            message: "",
            thread: []
        }
        this.socket = socketIOClient("http://localhost:4000");
    }

    componentDidMount() {
        this.socket.on("connection", response => {
            console.log("hello");
        })
        axios.get(`/api/thread/${this.props.match.params.id}`).then(response => {
            this.setState({
                thread: response.data
            })
        })
    }

    handleChange(e) {
        this.setState({
            message: e.target.value
        })
    }

    newConversation = () => {
        if (this.state.thread.length === 0) {
            axios.post("/api/newconvo", { id: this.props.match.params.id }).then(() => {
                console.log("New conversation created!")
            })
        }
    }

    render() {
        console.log(this.state.thread);
        let messageArr = [];
        this.state.thread.forEach(message => {
            messageArr.push(<Message messageData={message} />);
        })
        return (
            <div className="messagesContainer">
                <div>
                    {messageArr}
                </div>
                <textarea type="text" placeholder="type here" onChange={(e) => this.handleChange(e)}></textarea>
                <button onClick={() => this.newConversation()}>Send</button>
            </div>
        )
    }
}