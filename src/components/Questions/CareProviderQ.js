import React from 'react';

export default function CareProviderQ(props) {
    return (
        <div className="careProviderQ" style={{left: `${props.position}%`}}>
            <h3>What type of child care are you?</h3>
            <button onClick={() => props.updateCareType("careType","School")}>School</button>
            <button onClick={() => props.updateCareType("careType","Day Care")}>Day Care</button>
            <button onClick={() => props.updateCareType("careType","Baby Sitter")}>Baby Sitter</button>
            <button onClick={() => props.updateCareType("careType","Nanny")}>Nanny</button>
            <button id="next"><img src="http://i65.tinypic.com/309k6z5.jpg" alt=""/></button>
            <button id="prev" onClick={() => props.slideBack("careProviderQ","question1")}><img src="http://i68.tinypic.com/2wd99fn.jpg" alt=""/></button>
        </div>
    )
}