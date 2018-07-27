import React, {Component} from 'react';
import GetStarted from './GetStarted';
import Question1 from './Question1';
import ParentQ from './ParentQ';
import CareProviderQ from './CareProviderQ';
import ParentQ2 from './ParentQ2';
import CareProviderQ2 from './CareProviderQ2';
import ParentQ3 from './ParentQ3';
import axios from 'axios';
import './Questions.css';

export default class Questions extends Component {
    constructor() {
        super();

        this.state = {
            status: "",
            subscribed: "",
            careType: "",
            childCare: false,
            // the following values are the position from the left(in percentages). 0 would be onscreen. 100 would be offscreen to the right. -100 would be offscreen to the left.  Transitions are managed in Questions.css
            getStarted: 0,
            question1: 100,
            parentQ: 100,
            parentQ2: 100,
            careProviderQ: 100,
            careProviderQ2: 100,
            parentQ3: 100
        }
    }

    slider = (prop1, prop2) => {
        // slides first prop off screen to the left and slides second prop on screen from the right
        // used for moving forward through questions
        this.setState({
            [prop1]: -100,
            [prop2]: 0
        })
    }

    slideBack = (prop1, prop2) => {
        // slides first prop off screen to the right and slides second prop on screen from the left
        // used for moving back through questions
        this.setState({
            [prop1]: 100,
            [prop2]: 0
        })
    }

    updateState = (prop,val) => {
        this.setState({
            [prop]: val
        })
    }

    submitNewParent = (pic) => {
        let {status, subscribed, childCare} = this.state;
        axios.post('/api/newparent', {status: status, childcare: childCare, newsfeed: subscribed}).then(() => {
            console.log("Hello, new user!");
        })
    }

    render() {
        // houses all of the question components and slides them on and offscreen
        console.log(this.state);
        return (
            <div>
                <GetStarted slider={this.slider} slideBack={this.slideBack} position={this.state.getStarted}/>
                <Question1 slider={this.slider} slideBack={this.slideBack} position={this.state.question1}  updateStatus={this.updateState} status={this.state.status} />
                <ParentQ slider={this.slider} slideBack={this.slideBack} position={this.state.parentQ} updateState={this.updateState} submit={this.submitNewParent} childCare={this.state.childCare}/>
                <ParentQ2 slider={this.slider} slideBack={this.slideBack} position={this.state.parentQ2} updateState={this.updateState} status={this.state.status} />
                <ParentQ3 slider={this.slider} slideBack={this.slideBack} position={this.state.parentQ3} />
                <CareProviderQ updateCareType={this.updateState} slider={this.slider} slideBack={this.slideBack} position={this.state.careProviderQ} careType={this.state.careType} />
                <CareProviderQ2 slider={this.slider} slideBack={this.slideBack} position={this.state.careProviderQ2} />
            </div>
        )
    }
}