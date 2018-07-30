import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ViewConvo.css';

export default class ViewConvos extends Component {
    constructor() {
        super();
        this.state = {
            lastMessage: ""
        }
    }

    componentDidMount() {
        let { care_provider } = this.props.thread;
        axios.get(`/api/last/${care_provider}`).then(response => {
            console.log(response);
            this.setState({
                lastMessage: response.data[0]
            })
        })
    }

    render() {
        console.log(this.state.lastMessage)
        let { care_provider, image, name } = this.props.thread;
        return (
            <Link to={`/message/${care_provider}`} className="messageLink">
                <div className="messageThread">
                    <img src={image} alt="care provider" />
                    <div className="messageThreadDetails">
                        <h4>{name}</h4>
                        <p>{this.state.lastMessage.message}</p>
                        <p>{this.state.lastMessage.date}</p>
                    </div>
                </div>
            </Link>
        )
    }
}