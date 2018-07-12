import React, {Component} from 'react';
import axios from 'axios';
import Post from '../Post/Post';
import './Forum.css';

export default class Forum extends Component {
    constructor() {
        super();

        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        axios.get("/api/posts").then(res => {
            this.setState({
                posts: res.data
            })
        })
    }

    render() {
        let postsArr = [];
        this.state.posts.forEach((post,i) => {
            postsArr.push(<Post key={i} data={post} />)
        })
        return (
            <div className="forumPage">
                {postsArr}
            </div>
        )
    }
}