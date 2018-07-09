import React, {Component} from 'react';

export default class Post extends Component {

    render() {
        console.log(this.props)
        let {date, status, post, first_name, last_name} = this.props.data;
        return (
            <div>
                <h2>{first_name} {last_name}</h2>
                <h2>{date}</h2>
                <h2>{status}</h2>
                <p>{post}</p>
            </div>
        )
    }
}