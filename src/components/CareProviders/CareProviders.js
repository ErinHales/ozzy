import React, { Component } from 'react';
import "./CareProviders.css";

export default class CareProvider extends Component {
    constructor() {
        super();

        this.state = {
            rating: []
        }
    }

    // renders each individual care provider and their information as it is passed down from a forEach function in Map.js
    render() {
        return (
            <div className="careProvider" onClick={() => this.props.selectCareProvider(this.props.userInfo.care_provider_id)}>
                <div className="careProviderHeader">
                    <img src={this.props.userInfo.image} alt="" />
                    <div className="careProviderInfo">
                        <h3>{this.props.userInfo.name}</h3>
                        <h4>{this.props.userInfo.status}</h4>
                    </div>
                    <div>
                        <div className="rating">
                            <img src={this.props.userInfo.stars > 0 ? "http://i66.tinypic.com/on30y.jpg" : "http://i68.tinypic.com/eel1t.jpg"} alt="" />
                            <img src={this.props.userInfo.stars > 1 ? "http://i66.tinypic.com/on30y.jpg" : "http://i68.tinypic.com/eel1t.jpg"} alt="" />
                            <img src={this.props.userInfo.stars > 2 ? "http://i66.tinypic.com/on30y.jpg" : "http://i68.tinypic.com/eel1t.jpg"} alt="" />
                            <img src={this.props.userInfo.stars > 3 ? "http://i66.tinypic.com/on30y.jpg" : "http://i68.tinypic.com/eel1t.jpg"} alt="" />
                            <img src={this.props.userInfo.stars > 4 ? "http://i66.tinypic.com/on30y.jpg" : "http://i68.tinypic.com/eel1t.jpg"} alt="" />
                        </div>
                        <button onClick={() => this.props.selectCareProvider(this.props.userInfo.care_provider_id)} className="moreInfoButton">More Info</button>
                    </div>
                </div>
                <p>{this.props.userInfo.short_bio}</p>
            </div>
        )
    }
}
