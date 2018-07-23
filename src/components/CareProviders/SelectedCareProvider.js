import React, { Component } from 'react';

export default class SelectedCareProvider extends Component {
    constructor() {
        super();

        this.state = {
            careProviderInfo: {}
        }
    }

    componentDidMount() {
        for (var i=0; i<this.props.careProviderInfo.length; i++) {
            if (this.props.careProviderInfo[i].care_provider_id === this.props.id) {
                this.setState({
                    careProviderInfo: this.props.careProviderInfo[i]
                })
            }
        }
    }

    render() {
        let { city, state, name, status, short_bio, long_bio, image, stars } = this.state.careProviderInfo;
        return (
            <div className="viewCareProvider">
                <img src={image} alt="care provider" className="careProviderProfile" />
                <div className="careProviderInfoContainer">
                <div className="careProviderHeader">
                    <div className="careProviderInfo">
                        <h3>{name}</h3>
                        <h4>{status}</h4>
                    </div>
                    <div className="rating">
                        <img src={stars > 0 ? "http://i66.tinypic.com/on30y.jpg" : "http://i68.tinypic.com/eel1t.jpg"} alt="" />
                        <img src={stars > 1 ? "http://i66.tinypic.com/on30y.jpg" : "http://i68.tinypic.com/eel1t.jpg"} alt="" />
                        <img src={stars > 2 ? "http://i66.tinypic.com/on30y.jpg" : "http://i68.tinypic.com/eel1t.jpg"} alt="" />
                        <img src={stars > 3 ? "http://i66.tinypic.com/on30y.jpg" : "http://i68.tinypic.com/eel1t.jpg"} alt="" />
                        <img src={stars > 4 ? "http://i66.tinypic.com/on30y.jpg" : "http://i68.tinypic.com/eel1t.jpg"} alt="" />
                    </div>
                </div>
                <h4>{short_bio}</h4>
                <p>{long_bio}</p>
                </div>
                <div className="backButtonContainer">
                    <button onClick={() => this.props.selectCareProvider(null)}>Back</button>
                </div>
            </div>
        )
    }
}