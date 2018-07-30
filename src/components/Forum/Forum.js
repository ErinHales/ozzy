import React, { Component } from 'react';
import axios from 'axios';
import Post from '../Post/Post';
import { Link } from 'react-router-dom';
import './Forum.css';

export default class Forum extends Component {
    constructor() {
        super();

        this.state = {
            posts: [],
            subscriptions: "",
            filter: ""
        }
    }

    componentDidMount() {
        axios.get("/api/posts").then(res => {
            this.setState({
                posts: res.data
            })
        });
        axios.get("/api/getuserinfo").then(res => {
            this.setState({
                subscriptions: res.data[0].newsfeed
            })
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.filter !== this.state.filter) {
            axios.get(`/api/filter/${this.state.filter}`).then(res => {
                console.log(res.data);
                this.setState({
                    posts: res.data
                })
            });
        }
    }

    updateFilter = (e) => {
        this.setState({
            filter: e.target.value
        })
    }

    render() {
        // maps over all posts and returns a post component for each
        console.log(this.state.filter);
        let postsArr = [];
        this.state.posts.forEach((post, i) => {
            postsArr.push(<Post key={i} data={post} />)
        })
        return (
            <div className="forumPage">
                {/* User can filter by topic and also by subscribed newsfeed */}
                <select className="status pickFilter" onChange={(e) => this.updateFilter(e)}>
                    <option value={this.state.subscriptions}>Your Subscriptions</option>
                    <option value="Just Moms">Just Moms</option>
                    <option value="Just Dads">Just Dads</option>
                    <option value="Expecting">Expecting</option>
                    <option value="Babies">Babies</option>
                    <option value="Toddlers">Toddlers</option>
                    <option value="Elementary">Elementary</option>
                    <option value="Pre-Teen">Pre-Teen</option>
                    <option value="Teen">Teen</option>
                    <option value="All Grown Up">All Grown Up</option>
                </select>
                {/* postsArr displays all of the post components */}
                {postsArr}
                <Link to="/new" className="pencilButton"><img src="http://i66.tinypic.com/30ix6bm.jpg" alt="" /></Link>
            </div>
        )
    }
}