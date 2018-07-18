import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';
import CareProvider from '../CareProviders/CareProviders';
import MapItem from '../MapItem/MapItem';

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default class Map extends Component {

    constructor() {
        super();

        this.state = {
            center: {
                lat: 40.7608333,
                lng: -111.8902778
            },
            zoom: 11,
            addresses: [],
            coords: {}
        }
    }

    componentDidMount() {
        let getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            } else {
                // x.innerHTML = "Geolocation is not supported by this browser.";
            }
        }
        let showPosition = (position) => {
            this.setState({
                center: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
            })
        }
        getLocation();

        axios.get("/api/addresses").then(response => {
            this.setState({
                addresses: response.data
            })
        })
    }

    async getCoords(address) {
		return new Promise((resolve, reject) => {
			axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`)
				.then(response => {
					return resolve({
						lat: response.data.results[0].geometry.location.lat,
						lng: response.data.results[0].geometry.location.lng
					})
				})
		})
    }

    render() {
        let usersArr = [];
        this.state.addresses.forEach(user => {
            return usersArr.push(<CareProvider userInfo={user} />)
        })

        let mapArr = []
        this.state.addresses.forEach(user => {
            let {address_1, city, state, zip} = user;
            let address = `${address_1}, ${city}, ${state} ${zip}, USA`;
            this.getCoords(address).then(response => {
                mapArr.push(<MapItem lat={response.lat} lng={response.lng} />)
            })
        })

        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '300px', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
                    center={this.state.center}
                    zoom={this.state.zoom}
                >
                {mapArr}
                </GoogleMapReact>
                {usersArr}
            </div>
        );
    }
}
