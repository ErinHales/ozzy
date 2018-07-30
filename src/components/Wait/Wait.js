import React, { Component } from 'react';
import './Wait.css';

export default class Wait extends Component {
    constructor() {
        super();

        this.state = {
            top: 30,
            left: 0
        }
    }

    // componentDidUpdate(prevProps, prevState) {
    //     if(prevState.left !== this.state.left) {
    //         this.float();
    //     }
    // }

    float() {
        if (this.state.top < 100) {
            let positionTop = this.state.top;
            positionTop += 10;
            let positionLeft = this.state.left;
            positionLeft += 10;
            this.setState({
                top: positionTop,
                left: positionLeft
            })
        }
    }

    render() {
        console.log(this.state);
        return (
            <div onClick={() => this.float()}>
                <img src="http://i67.tinypic.com/mrybyf.jpg" alt="" id="floatingBaby" style={{ top: `${this.state.top}%`, left: `${this.state.left}%` }} />
            </div>
        )
    }
}