import React, { Component } from 'react';
import "./Convo.css";
import axios from 'axios';
import io from 'socket.io-client';
import Message from '../Message/Message';

export default class Convo extends Component {
    constructor() {
        super();

        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var d = new Date();
        var month = d.getMonth();
        var date = d.getDate();
        var time = "AM";
        var hour = d.getHours();
        if (hour > 12) {
            hour -= 12;
            time = "PM";
        }
        var minutes = d.getMinutes();
        if (minutes < 10) {
            minutes = `0${minutes}`;
        }
        let messageDate = `${hour}:${minutes} ${time} ${months[month]} ${date}, 2018`;

        this.state = {
            message: "",
            thread: [],
            date: messageDate
        }
        this.socket = io();
        // this.socket.on("sent", function() {
        //     this.updateThread();
        // })
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

    sendMessage = () => {
        axios.post('/api/newmessage', { care_provider_id: this.props.match.params.id, date: this.state.date, message: this.state.message }).then(() => {
            this.updateThread();
            // this.socket.emit("send");
        })
    }

    updateThread = () => {
        axios.get(`/api/thread/${this.props.match.params.id}`).then(response => {
            this.setState({
                thread: response.data,
                message: ""
            })
        })
    }

    handleSendMessage() {
        this.newConversation();
        if (this.state.message !== "") {
            this.sendMessage();
            // this.updateThread();
        }
    }

    render() {
        let messageArr = [];
        this.state.thread.forEach(message => {
            messageArr.push(<Message messageData={message} />);
        })

        return (
            <div className="messagesContainer" onSubmit={() => this.handleSendMessage()}>
                <div className="flexMessagesContainer">
                    <div className="reverseMessages">
                        {messageArr}
                    </div>
                    <textarea type="text" placeholder="type here" value={this.state.message} onChange={(e) => this.handleChange(e)} onKeyUp={(event) => event.key === "Enter" ? this.handleChange(event) : null}></textarea>
                    <img src="http://i64.tinypic.com/jzwkuh.jpg" alt="send" className="sendMessage" onClick={() => this.handleSendMessage()} />
                </div>
            </div>
        )
    }
}