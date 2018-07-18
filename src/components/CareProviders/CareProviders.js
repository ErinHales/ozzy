import React, {Component} from 'react';
import axios from "axios";
import "./CareProviders.css";

export default class CareProvider extends Component {
    constructor() {
        super();

        this.state = {
            lat: 0,
            lng: 0,
            rating: []
        }
    }

    componentDidMount() {
            var address = "1491 W 1700 N, Provo, UT 84604, USA";
            axios.get(`http://maps.googleapis.com/maps/api/geocode/json?address=${address}`).then(response => {
                this.setState({
                    lat: response.data.results[0].geometry.location.lat,
                    lng: response.data.results[0].geometry.location.lng
                })
            })
                // console.log(response.data.results[0].geometry.location.lat);
    }

    render() {
        return (
            <div className="careProvider">
                <div className="careProviderHeader">
                    <img src={this.props.userInfo.image} alt=""/>
                    <div className="careProviderInfo">
                        <h3>{this.props.userInfo.name}</h3>
                        <h4>{this.props.userInfo.status}</h4>
                    </div>
                    <div className="rating">
                        <img src={this.props.userInfo.stars > 0 ? "http://i66.tinypic.com/on30y.jpg" : "http://i68.tinypic.com/eel1t.jpg"} alt=""/>
                        <img src={this.props.userInfo.stars > 1 ? "http://i66.tinypic.com/on30y.jpg" : "http://i68.tinypic.com/eel1t.jpg"} alt=""/>
                        <img src={this.props.userInfo.stars > 2 ? "http://i66.tinypic.com/on30y.jpg" : "http://i68.tinypic.com/eel1t.jpg"} alt=""/>
                        <img src={this.props.userInfo.stars > 3 ? "http://i66.tinypic.com/on30y.jpg" : "http://i68.tinypic.com/eel1t.jpg"} alt=""/>
                        <img src={this.props.userInfo.stars > 4 ? "http://i66.tinypic.com/on30y.jpg" : "http://i68.tinypic.com/eel1t.jpg"} alt=""/>
                    </div>
                </div>
                <p>{this.props.userInfo.short_bio}</p>
            </div>
        )
    }
}
