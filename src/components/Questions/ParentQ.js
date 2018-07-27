import React, {Component} from 'react';

export default class ParentQ2 extends Component {
    getColor(val) {
        if (this.props.childCare === val) {
            return "#3F254B";
        } else {
            return "#5D356D";
        }
    }
    render() {
        return (
            <div className="parentQ" style={{left: `${this.props.position}%`}}>
                <h3>Are you interested <br/>in finding child care?</h3>
                <button onClick={() => this.props.updateState("childCare", true)} style={{backgroundColor: this.getColor(true)}}>Yes</button>
                <button onClick={() => this.props.updateState("childCare", false)} style={{backgroundColor: this.getColor(false)}}>No</button>
                <button id="next" onClick={() => this.props.slider("parentQ","parentQ2")}><img src="http://i65.tinypic.com/309k6z5.jpg" alt=""/></button>
                <button id="prev" onClick={() => this.props.slideBack("parentQ", "question1")}><img src="http://i68.tinypic.com/2wd99fn.jpg" alt="" /></button>
            </div>
        )
    }
}