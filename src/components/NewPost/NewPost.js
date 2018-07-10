import React, {Component} from 'react';
import './NewPost.css';

export default class NewPost extends Component {
    constructor() {
        super();

        this.state = {
            post: "",
            image: "",
            status: "",
            image: false,
            url: ""
        }
    }
    addImage() {
        this.setState({
            image: !this.state.image
        })
    }
    
    render() {
        return (
            <div className="post">
                <input type="text" placeholder="type here" className="postText"/>
                {this.state.image ? <img src={this.state.url} alt="post" /> : null}
                <div>
                    <input type="checkbox"/>
                    <h3>Ask Anonymously</h3>
                </div>
                <div>
                    <img src="http://i63.tinypic.com/2n1b05y.jpg" alt="camera" onClick={() => this.addImage}/>
                    <img src="http://i68.tinypic.com/15cofhi.jpg" alt="menu"/>
                </div>
            </div>
        )
    }
}