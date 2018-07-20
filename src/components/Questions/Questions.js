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
            getStarted: 0,
            question1: 100,
            parentQ: 100,
            careProviderQ: 100,
        }
    }

    slider = (prop1, prop2) => {
        this.setState({
            [prop1]: -100,
            [prop2]: 0
        })
    }

    slideBack = (prop1, prop2) => {
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