import React, { Component } from 'react';
import GetStarted from './GetStarted';
import Question1 from './Question1';
import ParentQ from './ParentQ';
import CareProviderQ from './CareProviderQ';
import ParentQ2 from './ParentQ2';
import CareProviderQ2 from './CareProviderQ2';
import ParentQ3 from './ParentQ3';
import CareProviderQ3 from './CareProviderQ3';
import axios from 'axios';
import './Questions.css';

export default class Questions extends Component {
    constructor() {
        super();

        this.state = {
            name: "",
            shortBio: "",
            longBio: "",
            status: "",
            subscribed: "",
            careType: "",
            childCare: false,
            address: {},
            // the following values are the position from the left(in percentages). 0 would be onscreen. 100 would be offscreen to the right. -100 would be offscreen to the left.  Transitions are managed in Questions.css
            getStarted: 0,
            question1: 100,
            parentQ: 100,
            parentQ2: 100,
            careProviderQ: 100,
            careProviderQ2: 100,
            parentQ3: 100,
            careProviderQ3: 100
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

    updateState = (prop, val) => {
        this.setState({
            [prop]: val
        })
    }

    submit = (pic) => {
        let { name, shortBio, longBio, status, subscribed, childCare, careType } = this.state;
        let { line1, line2, city, state, zip } = this.state.address;
        if (this.state.status === "Parent") {
            axios.post('/api/newparent', { status: status, childcare: childCare, newsfeed: subscribed }).then(console.log("Hello new user!"));
            axios.put('/api/parentinfo', {pic}).then(console.log("Picture updated!"));
        } else {
            axios.post('/api/newcareprovider', {name: name, status: careType, shortBio: shortBio, longBio: longBio, image: pic}).then(console.log("Hello new Care Provider!"));
            axios.post('/api/newparent', {status: status, childcare: null, newsfeed: subscribed}).then(console.log("User Info Updates"));
            axios.post('/api/newaddress', {line1: line1, line2: line2, city: city, state: state, zip: zip}).then(console.log("New address created!"));
        }
    }

    render() {
        // houses all of the question components and slides them on and offscreen
        console.log(this.state);
        return (
            <div>
                <GetStarted slider={this.slider} slideBack={this.slideBack} position={this.state.getStarted} />
                <Question1 slider={this.slider} slideBack={this.slideBack} position={this.state.question1} updateStatus={this.updateState} status={this.state.status} />
                <ParentQ slider={this.slider} slideBack={this.slideBack} position={this.state.parentQ} updateState={this.updateState} submit={this.submitNewParent} childCare={this.state.childCare} />
                <ParentQ2 slider={this.slider} slideBack={this.slideBack} position={this.state.parentQ2} updateState={this.updateState} status={this.state.status} />
                <ParentQ3 slider={this.slider} slideBack={this.slideBack} position={this.state.parentQ3} submit={this.submit} />
                <CareProviderQ updateCareType={this.updateState} slider={this.slider} slideBack={this.slideBack} position={this.state.careProviderQ} careType={this.state.careType} />
                <CareProviderQ2 slider={this.slider} slideBack={this.slideBack} position={this.state.careProviderQ2} updateState={this.updateState} />
                <CareProviderQ3 slider={this.slider} slideBack={this.slideBack} position={this.state.careProviderQ3} updateState={this.updateState} />
            </div>
        )
    }
}