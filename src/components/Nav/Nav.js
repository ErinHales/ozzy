import React from 'react';
import {Link} from 'react-router-dom';

export default function Nav() {

    return (
        <div>
            <Link to="/forum">Forum</Link>
            <Link to="/new">Create Post</Link>
            <Link to="/">Logout</Link>
        </div>
    )
}