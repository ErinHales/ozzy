import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SelectedCareProvider extends Component {
    constructor() {
        super();

        this.state = {
            careProviderInfo: {}
        }
    }

    componentDidMount() {
        for (var i = 0; i < this.props.careProviderInfo.length; i++) {
            if (this.props.careProviderInfo[i].care_provider_id === this.props.id) {
                this.setState({
                    careProviderInfo: this.props.careProviderInfo[i]
                })
            }
        }
    }

    render() {
        // also returns city and state
        let { name, status, short_bio, long_bio, image, stars } = this.state.careProviderInfo;
        return (
            <div className="viewCareProvider">
                <div className="messageContainer">
                    <img src={image} alt="care provider" className="careProviderProfile" />
                    <Link to={`/message/${this.props.id}`}><button className="messageButton"><img src="http://i67.tinypic.com/fvg4t5.jpg" alt="message" /><h2>Message</h2></button></Link>
                </div>
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