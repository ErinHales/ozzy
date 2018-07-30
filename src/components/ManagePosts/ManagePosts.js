import React, { Component } from 'react';
import Post from '../Post/Post';
import axios from 'axios';

export default class Manage extends Component {
    constructor() {
        super();

        this.state = {
            reportedPosts: [],
            reportedComments: []
        }
    }

    componentDidMount() {
        axios.get('/api/reported').then(response => {
            this.setState({
                reportedPosts: response.data
            })
        })
    }

    update = (response) => {
        this.setState({
            reportedPosts: response.data
        })
    }

    render() {
        let postsArr = [];
        this.state.reportedPosts.forEach((post, i) => {
            postsArr.push(<Post key={i} data={post} delete={true} update={this.update} />)
        })
        return (
            <div>
                {postsArr}
            </div>
        )
    }
}