import React, { Component } from 'react';
import "./Convo.css";
import axios from 'axios';
import io from 'socket.io-client';
import Message from '../Message/Message';

console.log(window.location)
export default class Convo extends Component {
    constructor() {
        super();

        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var d = new Date();
        var month = d.getMonth();
        var date = d.getDate();
        var time = "AM";
        var hour = d.getHours();
        if(hour > 12) {
            hour -= 12;
            time = "PM";
        }
        var minutes = d.getMinutes();
        if(minutes < 10) {
            minutes = `0${minutes}`;
        }
        let messageDate = `${hour}:${minutes} ${time} ${months[month]} ${date}, 2018`;

        this.state = {
            message: "",
            thread: [],
            date: messageDate
        }
        this.socket = io();
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
        // conversation_id, care_provider_id, date, message, messager_id, messager
        let { care_provider_id, conversation_id, user_id } = this.state.thread[0];
        this.socket.emit("send", {conversation_id: conversation_id, care_provider_id: care_provider_id, date: this.state.date, message: this.state.message, user_id: user_id});
    }
    
    updateThread = () => {
        axios.get(`/api/thread/${this.props.match.params.id}`).then(response => {
            this.setState({
                thread: response.data,
                message: ""
            })
        })
    }

    render() {
        let messageArr = [];
        this.state.thread.forEach(message => {
            messageArr.push(<Message messageData={message} />);
        })
        return (
            <div className="messagesContainer">
                <div className="displayMessagesContainer">
                    {messageArr}
                </div>
                <textarea type="text" placeholder="type here" value={this.state.message} onChange={(e) => this.handleChange(e)}></textarea>
                <img src="http://i64.tinypic.com/jzwkuh.jpg" alt="send" className="sendMessage" onClick={() => {
                    this.newConversation();
                    if(this.state.message !== "") {
                        this.sendMessage();
                        this.updateThread();
                    }
                }} />
            </div>
        )
    }
}