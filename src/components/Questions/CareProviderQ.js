import React, { Component } from 'react';

export default class CareProviderQ extends Component {

    getColor(val) {
        if (this.props.careType === val) {
            return "#3F254B";
        } else {
            return "#5D356D";
        }
    }

    handleClick = (val) => {
        this.props.updateCareType("careType", val);
        this.props.slider("careProviderQ", "careProviderQ2");
    }

    render() {
        return (
            <div className="careProviderQ" style={{ left: `${this.props.position}%` }}>
                <h3>What type of child care provider?</h3>
                <button onClick={() => this.handleClick("School")} style={{backgroundColor: this.getColor("School")}}>School</button>
                <button onClick={() => this.handleClick("Day Care")} style={{backgroundColor: this.getColor("Day Care")}}>Day Care</button>
                <button onClick={() => this.handleClick("Baby Sitter")} style={{backgroundColor: this.getColor("Baby Sitter")}}>Baby Sitter</button>
                <button onClick={() => this.handleClick("Nanny")} style={{backgroundColor: this.getColor("Nanny")}}>Nanny</button>
                <button id="next" onClick={() => this.props.slider("careProviderQ", "careProviderQ2")}><img src="http://i65.tinypic.com/309k6z5.jpg" alt="" /></button>
                <button id="prev" onClick={() => this.props.slideBack("careProviderQ", "question1")}><img src="http://i68.tinypic.com/2wd99fn.jpg" alt="" /></button>
            </div>
        )
    }
}