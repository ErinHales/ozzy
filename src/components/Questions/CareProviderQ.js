import React, { Component } from 'react';

export default class CareProviderQ extends Component {

    getColor(val) {
        if (this.props.careType === val) {
            return "#3F254B";
        } else {
            return "#5D356D";
        }
    }

    render() {
        return (
            <div className="careProviderQ" style={{ left: `${this.props.position}%` }}>
                <h3>What type of child care are you?</h3>
                <button onClick={() => this.props.updateCareType("careType", "School")} style={{backgroundColor: this.getColor("School")}}>School</button>
                <button onClick={() => this.props.updateCareType("careType", "Day Care")} style={{backgroundColor: this.getColor("Day Care")}}>Day Care</button>
                <button onClick={() => this.props.updateCareType("careType", "Baby Sitter")} style={{backgroundColor: this.getColor("Baby Sitter")}}>Baby Sitter</button>
                <button onClick={() => this.props.updateCareType("careType", "Nanny")} style={{backgroundColor: this.getColor("Nanny")}}>Nanny</button>
                <button id="next"><img src="http://i65.tinypic.com/309k6z5.jpg" alt="" /></button>
                <button id="prev" onClick={() => this.props.slideBack("careProviderQ", "question1")}><img src="http://i68.tinypic.com/2wd99fn.jpg" alt="" /></button>
            </div>
        )
    }
}