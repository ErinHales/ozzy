import React, { Component } from 'react';
import axios from 'axios';
import './NewPost.css';

export default class NewPost extends Component {
    constructor() {
        super();

        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var date = new Date();
        var month = date.getMonth();
        var date = date.getDate();
        let postDate = `${months[month]} ${date}, 2018`;

        this.state = {
            post: "",
            image: "",
            date: postDate,
            status: "All",
            anonymous: false,
            image: false,
            url: "http://i67.tinypic.com/29w7a83.jpg"
        }
    }
    addImage() {
        this.setState({
            image: !this.state.image
        })
    }

    updatePost(e) {
        this.setState({
            post: e.target.value
        })
    }

    setStatus(e) {
        this.setState({
            status: e.target.value
        })
    }

    post() {
        axios.post('/api/newpost', {date: this.state.date, post: this.state.post, status: this.state.status})
    }

    render() {
        return (
            <div className="newPost">
                <div className="postContainer">
                    <div className="newPostHeader">
                        <button onClick={() => this.post()}>Post</button>
                        <select className="status" onChange={(e) => this.setStatus(e)}>
                            <option value="All">All</option>
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
                    </div>
                    <div>
                        <textarea type="text" placeholder="type here" className="postText" onChange={(e) => this.updatePost(e)}></textarea>
                        {this.state.image ? <img src={this.state.url} alt="post" className="postImg" /> : null}
                        <div className="anonymousBox">
                            <input type="checkbox" />
                            <h3>Ask Anonymously</h3>
                        </div>
                        <div className="icons">
                            <img src="http://i63.tinypic.com/2n1b05y.jpg" alt="camera" className="camera" onClick={() => this.addImage()} />
                            <img src="http://i68.tinypic.com/15cofhi.jpg" alt="menu" className="menu" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}