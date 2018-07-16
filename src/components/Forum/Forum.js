import React, {Component} from 'react';
import axios from 'axios';
import Post from '../Post/Post';
import {Link} from 'react-router-dom';
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
                <Link to="/new" className="pencilButton"><img src="http://i66.tinypic.com/30ix6bm.jpg" alt=""/></Link>
            </div>
        )
    }
}