import React, { Component } from 'react';

export default class Question1 extends Component {

    getColor(val) {
        if (this.props.status === val) {
            return "#3F254B";
        } else {
            return "#5D356D";
        }
    }

    render() {

        return (
            <div className="question1" style={{ left: `${this.props.position}%` }}>
                <h3>Are you a:</h3>
                <button onClick={() => {
                    this.props.updateStatus("status", "Parent");
                    this.props.slider('question1', 'parentQ');
                }} style={{backgroundColor: this.getColor("Parent")}}>Parent</button>
                <button onClick={() => {
                    this.props.updateStatus("status", "Care Provider");
                    this.props.slider('question1', 'careProviderQ')
                }} style={{backgroundColor: this.getColor("Care Provider")}}>Care Provider</button>
                <button id="next"><img src="http://i65.tinypic.com/309k6z5.jpg" alt="" /></button>
                <button id="prev" onClick={() => this.props.slideBack("question1", "getStarted")}><img src="http://i68.tinypic.com/2wd99fn.jpg" alt="" /></button>
            </div>
        )
    }
}