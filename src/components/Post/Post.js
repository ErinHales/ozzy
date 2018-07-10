import React, { Component } from 'react';
import './Post.css';

export default class Post extends Component {

    render() {
        console.log(this.props)
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
                            <div className="box"></div>
                        </div>
                    </div>
                </div>
                <p>{post}</p>
            </div>
        )
    }
}