import React, { Component } from 'react';
import './Profile.css';

export default class Profile extends Component {
    constructor() {
        super();

        this.state = {
            profileURL: "",
            status: "",
            subscribedNewsFeeds: [],
            seekingChildCare: false,
            family: {}
        }
    }

    render() {
        return (
            <div className="profileSettings">
                <img src="" alt=""/>
            </div>
        )
    }
}