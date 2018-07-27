import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';
import CareProvider from '../CareProviders/CareProviders';
import MapItem from '../MapItem/MapItem';
import SelectedCareProvider from '../CareProviders/SelectedCareProvider';

export default class Map extends Component {

    constructor() {
        super();

        this.state = {
            center: {
                lat: 40.7608333,
                lng: -111.8902778
            },
            defaultCenter: {
                lat: null,
                lng: null
            },
            zoom: 11,
            careProviderInfo: [],
            coords: {},
            selectedCareProvider: null,
            mapItems: []
        }
    }

    componentDidMount() {
        // gets users location as soon as they navigate to this component, redirects the map to focus on the user's location

        let getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            }
        }
        let showPosition = (position) => {
            // this.state.center is the center of where the map will focus
            this.setState({
                center: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                },
                defaultCenter: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
            })
        }
        getLocation();

        axios.get("/api/addresses").then(response => {
            this.setState({
                careProviderInfo: response.data
            })
        })
    }

    componentDidUpdate(prevProps, prevState) {
        // For each item in this.state.careProviderInfo, it takes the address and returns a mapItem component in google map the location of the care provider's address.
        // Requires latitude and longitude as props
        if (prevState.careProviderInfo !== this.state.careProviderInfo || prevState.selectedCareProvider !== this.state.selectedCareProvider) {
            let mapArr = [];
            this.state.careProviderInfo.forEach(user => {
                let { care_provider_id, address_1, city, state, zip } = user;
                let address = `${address_1}, ${city}, ${state} ${zip}, USA`;
                this.getCoords(address).then(response => {
                    let width = "30px";
                    if (care_provider_id === this.state.selectedCareProvider) {
                        width = "40px";
                        this.setState({
                            center: {
                                lat: response.lat,
                                lng: response.lng
                            }
                        })
                    }
                    mapArr.push(<MapItem lat={response.lat} lng={response.lng} key={care_provider_id} width={width} />)
                })
            })
            if (this.state.selectedCareProvider === null) {
                this.setState({
                    mapItems: mapArr,
                    center: {
                        lat: this.state.defaultCenter.lat,
                        lng: this.state.defaultCenter.lng
                    }
                })
            } else {
                this.setState({
                    mapItems: mapArr
                })
            }
        }
    }

    async getCoords(address) {
        //important to return promise here. If there is no promise, it does not have time to resolve response.data.results[0] before returning the lat and lng
        // This function gets the lat and lng from each address from this.state.careProviderInfo and passes those into the map item components
        return new Promise((resolve, reject) => {
            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`)
                .then(response => {
                    return resolve({
                        lat: response.data.results[0].geometry.location.lat,
                        lng: response.data.results[0].geometry.location.lng
                    })
                })
        })
    }

    selectCareProvider = (id) => {
        this.setState({
            selectedCareProvider: id
        })
    }

    render() {
        // For each item in this.state.careProviderInfo, returns a component with the care provider's information
        let usersArr = [];
        this.state.careProviderInfo.forEach(user => {
            return usersArr.push(<CareProvider userInfo={user} selectCareProvider={this.selectCareProvider} />)
        })

        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '300px', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
                    center={this.state.center}
                    zoom={this.state.zoom}
                >
                    {this.state.mapItems}
                </GoogleMapReact>
                {this.state.selectedCareProvider ? <SelectedCareProvider id={this.state.selectedCareProvider} careProviderInfo={this.state.careProviderInfo} selectCareProvider={this.selectCareProvider} /> : usersArr}
            </div>
        );
    }
}
