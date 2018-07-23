import React, {Component} from 'react';
import GetStarted from './GetStarted';
import Question1 from './Question1';
import ParentQ from './ParentQ';
import CareProviderQ from './CareProviderQ';
import './Questions.css';

export default class Questions extends Component {
    constructor() {
        super();

        this.state = {
            status: "",
            subscribed: "",
            careType: "",
            // the following values are the position from the left(in percentages). 0 would be onscreen. 100 would be offscreen to the right. -100 would be offscreen to the left.  Transitions are managed in Questions.css
            getStarted: 0,
            question1: 100,
            parentQ: 100,
            careProviderQ: 100,
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

    render() {
        // houses all of the question components and slides them on and offscreen
        return (
            <div>
                <GetStarted slider={this.slider} slideBack={this.slideBack} position={this.state.getStarted}/>
                <Question1 slider={this.slider} slideBack={this.slideBack} position={this.state.question1}  updateStatus={this.updateState} status={this.state.status} />
                <ParentQ slider={this.slider} slideBack={this.slideBack} position={this.state.parentQ} />
                <CareProviderQ updateCareType={this.updateState} slider={this.slider} slideBack={this.slideBack} position={this.state.careProviderQ} />
            </div>
        )
    }
}