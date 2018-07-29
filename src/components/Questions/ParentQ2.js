import React, { Component } from 'react';

export default class ParentQ extends Component {
    constructor() {
        super();

        this.state = {
            subscriptions: []
        }
    }

    updateSubscriptions(subscription) {
        let copy = this.state.subscriptions.slice();
        let index = copy.indexOf(subscription)
        if(index >= 0) {
            copy.splice(index, 1);
        } else {
            copy.push(subscription);
        }
        this.setState({
            subscriptions: copy
        })
    }

    getColor(val) {
        if(this.state.subscriptions.indexOf(val) >= 0) {
            return "#3F254B";
        } else {
            return "#5D356D";
        }
    }

    slideBack = () => {
        if(this.props.status === "Parent") {
            return "parentQ";
        } else {
            return "careProviderQ2";
        }
    }

    render() {
        return (
            <div className="parentQ2" style={{left: `${this.props.position}%`}}>
                <h3>What channels would you like to see in your newsfeed?</h3>
                <button onClick={() => this.updateSubscriptions("Just Moms")} style={{backgroundColor: this.getColor("Just Moms")}}>Just Moms</button>
                <button onClick={() => this.updateSubscriptions("Just Dads")} style={{backgroundColor: this.getColor("Just Dads")}}>Just Dads</button>
                <button onClick={() => this.updateSubscriptions("Expecting")} style={{backgroundColor: this.getColor("Expecting")}}>Expecting</button>
                <button onClick={() => this.updateSubscriptions("Babies")} style={{backgroundColor: this.getColor("Babies")}}>Babies</button>
                <button onClick={() => this.updateSubscriptions("Toddlers")} style={{backgroundColor: this.getColor("Toddlers")}}>Toddlers</button>
                <button onClick={() => this.updateSubscriptions("Elementary")} style={{backgroundColor: this.getColor("Elementary")}}>Elementary</button>
                <button onClick={() => this.updateSubscriptions("Pre-Teen")} style={{backgroundColor: this.getColor("Pre-Teen")}}>Pre-Teen</button>
                <button onClick={() => this.updateSubscriptions("Teen")} style={{backgroundColor: this.getColor("Teen")}}>Teen</button>
                <button onClick={() => this.updateSubscriptions("All Grown Up")} style={{backgroundColor: this.getColor("All Grown Up")}}>All Grown Up</button>
                <button id="next" onClick={() => {
                    this.props.updateState("subscribed", this.state.subscriptions.join(", "));
                    this.props.slider("parentQ2", "parentQ3");
                }}><img src="http://i65.tinypic.com/309k6z5.jpg" alt="" /></button>
                <button id="prev" onClick={() => this.props.slideBack("parentQ2", this.slideBack())}><img src="http://i68.tinypic.com/2wd99fn.jpg" alt=""/></button>
            </div>
        )
    }
}