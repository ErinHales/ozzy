import React, { Component } from 'react';
import axios from 'axios';
import './Post.css';

export default class Post extends Component {
    constructor() {
        super();

        this.state = {
            feeds: ["All","Just Moms","Just Dads","Expecting","Babies","Toddlers","Elementary","Pre-Teen","Teen","All Grown Up"],
            colors: ["#F7BC4F","#CE69A7","#89DA90","#7155EC","#660066","#FFFF66","#66CCCC","#ff3333","#408D7A","#BD6B80"],
            liked: false,
            loved: false
        }
    }

    componentDidMount() {
        axios.get(`/api/liked/${this.props.data.id}`).then(response => {
            if(response.data[0]) {
                this.setState({
                    liked: response.data[0].liked,
                    loved: response.data[0].loved
                })
            }
        })
    }


    like() {
        axios.put(`/api/like/${this.props.data.id}`, {liked: !this.props.data.liked}).then(res => {
            this.setState({
                liked: !this.state.liked
            })
        })
    }

    love() {
        axios.put(`/api/love/${this.props.data.id}`, {loved: !this.props.data.loved}).then(res => {
            this.setState({
                loved: !this.state.loved
            })
        })
    }

    render() {
        let {colors, feeds} = this.state;
        let { date, status, post, first_name, last_name, picture } = this.props.data;
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
                            <div className="box" style={{backgroundColor: colors[feeds.indexOf(status)]}}></div>
                        </div>
                    </div>
                </div>
                <p>{post}</p>
                <div className="iconContainer">
                    <img src={this.state.loved ? "http://i68.tinypic.com/10ht5w0.jpg" : "http://i65.tinypic.com/2e0lnhj.jpg"} alt="love" onClick={() => this.love()} />
                    <img src={this.state.liked ? "http://i65.tinypic.com/29xalxi.jpg" : "http://i67.tinypic.com/2cokgaw.jpg"} alt="" onClick={() => this.like()}/>
                    <img src="http://i68.tinypic.com/3130vwh.jpg" alt=""/>
                    <img src="http://i68.tinypic.com/15cofhi.jpg" alt=""/>
                </div>
            </div>
        )
    }
}