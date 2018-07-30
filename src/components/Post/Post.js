import React, { Component } from 'react';
import axios from 'axios';
import {Image} from 'cloudinary-react';
import './Post.css';

export default class Post extends Component {
    constructor() {
        super();

        this.state = {
            feeds: ["All", "Just Moms", "Just Dads", "Expecting", "Babies", "Toddlers", "Elementary", "Pre-Teen", "Teen", "All Grown Up"],
            colors: ["#F7BC4F", "#CE69A7", "#89DA90", "#7155EC", "#660066", "#FFFF66", "#66CCCC", "#ff3333", "#408D7A", "#BD6B80"],
            likedPost: {},
            liked: false,
            loved: false,
            comments: [],
            showComments: false,
            input: ""
        }
    }

    componentDidMount() {
        // We have to handle whether a post has been liked or not here. This has to happen in each individual post because we need to fetch data as to what our individual user has liked or not.
        axios.get(`/api/liked/${this.props.data.id}`).then(response => {
            if (response.data[0]) {
                this.setState({
                    likedPost: response.data[0],
                    liked: response.data[0].liked,
                    loved: response.data[0].loved
                })
            }
        })
    }

    likeNewPost(like, love) {
        // If a post has not been liked by a certain user before, this creates a new instance in the database which saves whether a certain post is liked or loved and reflects that change in state
        axios.post(`/api/newlike/${this.props.data.id}`, { liked: like, loved: love }).then(response => {
            this.setState({
                likedPost: response.data[0],
                liked: response.data.liked,
                loved: response.data.loved
            })
        })
    }


    like() {
        // if user has already liked or loved a post and decides to update that, this simply updates the existing record in the database
        if (this.state.likedPost.postid) {
            axios.put(`/api/like/${this.props.data.id}`, { liked: !this.state.liked }).then(res => {
                this.setState({
                    liked: !this.state.liked
                })
            })
        } else {
            this.likeNewPost(true, false);
        }
    }

    love() {
        // if user has already liked or loved a post and decides to update that, this simply updates the existing record in the database
        if (this.state.likedPost.postid) {
            axios.put(`/api/love/${this.props.data.id}`, { loved: !this.state.loved }).then(res => {
                this.setState({
                    loved: !this.state.loved
                })
            })
        } else {
            this.likeNewPost(false, true);
        }
    }

    getComments(show) {
        // gets comments for a specific post and displays them
        axios.get(`/api/comments/${this.props.data.id}`).then(response =>{
            this.setState({
                comments: response.data,
                showComments: show
            })
        })
    }

    updateCommentInput(e) {
        this.setState({
            input: e.target.value
        })
    }

    comment() {
        // creates a new comment and resets the input
        axios.post(`/api/comment/${this.props.data.id}`, {text: this.state.input}).then(response => {
            this.getComments(true);
            this.setState({
                input: ""
            })
        })
    }

    report(bool) {
        axios.put('/api/report', {id: this.props.data.id, report: bool}).then(response => {
            if (window.location.hash === "#/manage") {
                this.props.update(response);
            }
        })
    }

    deletePost = () => {
        axios.delete(`/api/deletepost/${this.props.data.id}`).then(response => {
            this.props.update(response);
        });
    }

    render() {
        let { colors, feeds } = this.state;
        let { date, status, post, first_name, last_name, picture, image, link } = this.props.data;
        let commentArr = [];
        if(this.state.comments[0]) {
            this.state.comments.forEach((comment,i) => {
                return commentArr.push(
                    <div className="commentContainer">
                        <div className="userComment">
                            <img src={comment.picture} alt="profile"/>
                            <div className="commentName">
                                <h3>{comment.first_name} {comment.last_name}</h3>
                            </div>
                        </div>
                        <p key={i} className="comment">{comment.text}</p>
                    </div>)
            })
        }
        return (
            <div className="post">
                <div className="inline">
                <img src={picture} alt="profile" />
                    <div className="postInfo">
                        <div className="name">
                            <h2>{first_name} {last_name}</h2>
                            <h3>{date}</h3>
                        </div>
                        <div className="status">
                            <h3>{status}</h3>
                            <div className="box" style={{ backgroundColor: colors[feeds.indexOf(status)] }}></div>
                        </div>
                    </div>
                </div>
                <p>{post}</p>
                {image ? <a href={link} target="_blank"><Image cloudName={process.env.REACT_APP_CLOUD_NAME} publicId={image} id="postedImg" /></a> : null}
                <div className="iconContainer">
                    <img src={this.state.loved ? "http://i68.tinypic.com/10ht5w0.jpg" : "http://i65.tinypic.com/2e0lnhj.jpg"} alt="love" onClick={() => this.love()} />
                    <img src={this.state.liked ? "http://i65.tinypic.com/29xalxi.jpg" : "http://i67.tinypic.com/2cokgaw.jpg"} alt="" onClick={() => this.like()} />
                    <img src="http://i68.tinypic.com/3130vwh.jpg" alt="" onClick={() => this.getComments(!this.state.showComments)}/>
                    <img title="Report Post" src="http://i66.tinypic.com/j0xqo2.jpg" alt="" onClick={() => this.report(true)} />
                </div>
                {this.props.delete === true ? <div><button className="cancelButton padding" onClick={() => this.deletePost()}>Delete</button><button className="ignoreButton padding" onClick={() => this.report(false)}>Ignore</button></div> : null}
                {/* if this.state.showComments is true, it will display comments and input box for making a new comment */}
        {this.state.showComments ? <input type="text" placeholder="comment" value={this.state.input} onChange={(e) => this.updateCommentInput(e)} onKeyUp={event => (event.key === "Enter" && this.state.input !== "") ? this.comment() : null} /> : null}
        {this.state.showComments ? <button onClick={() => (this.state.input !== "") ? this.comment() : null}>submit</button> : null}
                {this.state.showComments ? commentArr : null}
            </div>
        )
    }
}