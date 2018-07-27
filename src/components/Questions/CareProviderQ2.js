import React, { Component } from 'react';

export default class CareProviderQ2 extends Component {
    constructor() {
        super();

        this.state = {
            shortBio: "",
            longBio: ""
        }
    }

    updateShortBio = (e) => {
        if (e.target.value.length < 200) {
            this.setState({
                shortBio: e.target.value
            })
        }
    }

    updateLongBio = (e) => {
        if (e.target.value.length < 1000) {
            this.setState({
                longBio: e.target.value
            })
        }
    }

    render() {
        return (
            <div className="careProviderQ2" style={{ left: `${this.props.position}%`}}>
                <h3>Build your Profile!</h3>
                <div className="tellUs">
                    <h3>Tell us a little bit about yourself</h3>
                    <h5>(1000 characters)</h5>
                </div>
                <textarea className="longBio" onChange={(e) => this.updateLongBio(e)} value={this.state.longBio}></textarea>
                <div className="tellUs">
                    <h3>Summary</h3>
                    <h5>(200 characters)</h5>
                </div>
                <textarea className="shortBio" onChange={(e) => this.updateShortBio(e)} value={this.state.shortBio}></textarea>
                <button id="next" onClick={() => this.props.slider("careProviderQ2", "parentQ2")}><img src="http://i65.tinypic.com/309k6z5.jpg" alt="" /></button>
                <button id="prev" onClick={() => this.props.slideBack("careProviderQ2", "careProviderQ")}><img src="http://i68.tinypic.com/2wd99fn.jpg" alt="" /></button>
            </div>
        )
    }
}