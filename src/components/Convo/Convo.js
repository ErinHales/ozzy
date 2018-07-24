import React, { Component } from 'react';
import "./Convo.css";
import axios from 'axios';
import io from 'socket.io-client';
import Message from '../Message/Message';

const socket = io("http://localhost:4000");

export default class Convo extends Component {
    constructor() {
        super();

        this.state = {
            message: "",
            thread: []
        }
        // this.socket = socketIOClient("http://localhost:4000");
        
    }

    componentDidMount() {
        socket.on("connection", response => {
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

    // createMessage = () => {
    //     let { care_provider_id, color, conversation_id } = this.state.thread;
    //     axios.post('/api/newmessage', {conversation_id: conversation_id, user_id: care_provider_id, color: color, date: 'some date', message: this.state.message}).then(response => {
    //         this.setState({
    //             thread: response.data
    //         })
    //     })
    // }

    sendMessage = () => {
        // conversation_id, care_provider_id, date, message, messager_id, messager
        let { care_provider_id, conversation_id, user_id } = this.state.thread[0];
        socket.emit("send", {conversation_id: conversation_id, care_provider_id: care_provider_id, date: 'some date', message: this.state.message, user_id: user_id});
    }

    render() {
        let messageArr = [];
        console.log(this.state.thread);
        this.state.thread.forEach(message => {
            console.log(message);
            messageArr.push(<Message messageData={message} />);
        })
        return (
            <div className="messagesContainer">
                <div>
                    {messageArr}
                </div>
                <textarea type="text" placeholder="type here" onChange={(e) => this.handleChange(e)}></textarea>
                <img src="http://i64.tinypic.com/jzwkuh.jpg" alt="send" className="sendMessage" onClick={() => {
                    this.newConversation();
                    this.sendMessage();
                    // this.createMessage();
                }} />
            </div>
        )
    }
}