import React from 'react';

export default function Question1(props) {

    return (
        <div className="question1" style={{left: `${props.position}%`}}>
            <h3>Are you a:</h3>
            <button onClick={() => {
                props.updateStatus("status", "Parent");
                props.slider('question1','parentQ');
                }}>Parent</button>
            <button onClick={() => {
                props.updateStatus("status", "Care Provider");
                props.slider('question1','careProviderQ')
                }}>Care Provider</button>
            <button id="next"><img src="http://i65.tinypic.com/309k6z5.jpg" alt=""/></button>
            <button id="prev" onClick={() => props.slideBack("question1","getStarted")}><img src="http://i68.tinypic.com/2wd99fn.jpg" alt=""/></button>
        </div>
    )
}