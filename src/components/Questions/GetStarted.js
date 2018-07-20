import React from 'react';

export default function GetStarted(props) {
    return (
        <div className="getStarted" style={{left: `${props.position}%`}} onClick={() => props.slider('getStarted','question1')}>
            <h2>Let's</h2>
            <h2>get</h2>
            <h2>started!</h2>
            <button id="next"><img src="http://i65.tinypic.com/309k6z5.jpg" alt=""/></button>
        </div>
    )
}