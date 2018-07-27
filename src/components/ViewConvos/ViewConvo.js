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
        axios.get('/api/last', {id: this.props.thread.care_provider}).then(response => {
            this.setState({
                lastMessage: response.data
            })
        })
    }

    render() {
        console.log(this.state.lastMessage)
        let{care_provider, image, name} = this.props.thread;
        return (
            <Link to={`/message/${care_provider}`} className="messageLink">
                <div className="messageThread">
                    <img src={image} alt="care provider" />
                    <div className="messageThreadDetails">
                        <h4>{name}</h4>
                        <p>{this.state.lastMessage}</p>
                    </div>
                </div>
            </Link>
        )
    }
}