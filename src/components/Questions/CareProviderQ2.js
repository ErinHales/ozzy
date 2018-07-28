import React, { Component } from 'react';

export default class CareProviderQ2 extends Component {
    constructor() {
        super();

        this.state = {
            name: "",
            shortBio: "",
            longBio: ""
        }
    }

    updateName = (e) => {
        if (e.target.value.length < 40) {
            this.setState({
                name: e.target.value
            })
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

    handleClick = () => {
        this.props.updateState("name", this.state.name);
        this.props.updateState("shortBio", this.state.shortBio);
        this.props.updateState("longBio", this.state.longBio);
        this.props.slider("careProviderQ2", "careProviderQ3");
    }

    render() {
        return (
            <div className="careProviderQ2" style={{ left: `${this.props.position}%` }}>
                <h3>Build your Profile!</h3>
                <div className="tellUs">
                    <h3>Name</h3>
                    <input type="text" value={this.state.name} onChange={(e) => this.updateName(e)}/>
                </div>
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
                <button id="next" onClick={() => this.handleClick()}><img src="http://i65.tinypic.com/309k6z5.jpg" alt="" /></button>
                <button id="prev" onClick={() => this.props.slideBack("careProviderQ2", "careProviderQ")}><img src="http://i68.tinypic.com/2wd99fn.jpg" alt="" /></button>
            </div>
        )
    }
}