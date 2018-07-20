import React, { Component } from 'react';

export default class ParentQ extends Component {
    constructor() {
        super();

        this.state = {
            status: []
        }
    }

    updateSubscriptions(subscription) {
        let copy = this.state.status.slice();
        let index = copy.indexOf(subscription)
        if(index >=0) {
            copy.splice(copy, 1);
        } else {
            copy.push(subscription);
        }
        this.setState({
            status: copy
        })
    }

    render() {
        return (
            <div className="parentQ" style={{left: `${this.props.position}%`}}>
                <h3>What channels would you like to see in your newsfeed?</h3>
                <button onClick={() => this.updateStatus("Just Moms")}>Just Moms</button>
                <button onClick={() => this.updateStatus("Just Dads")}>Just Dads</button>
                <button onClick={() => this.updateStatus("Expecting")}>Expecting</button>
                <button onClick={() => this.updateStatus("Babies")}>Babies</button>
                <button onClick={() => this.updateStatus("Toddlers")}>Toddlers</button>
                <button onClick={() => this.updateStatus("Elementary")}>Elementary</button>
                <button onClick={() => this.updateStatus("Pre-Teen")}>Pre-Teen</button>
                <button onClick={() => this.updateStatus("Teen")}>Teen</button>
                <button onClick={() => this.updateStatus("All Grown Up")}>All Grown Up</button>
                <button id="next"><img src="http://i65.tinypic.com/309k6z5.jpg" alt=""/></button>
                <button id="prev" onClick={() => this.props.slideBack("parentQ","question1")}><img src="http://i68.tinypic.com/2wd99fn.jpg" alt=""/></button>
            </div>
        )
    }
}