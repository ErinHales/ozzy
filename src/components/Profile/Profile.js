import React, { Component } from 'react';
import axios from 'axios';
import { Image } from 'cloudinary-react';
import Edit from './Edit.js';
import Default from './Default.js';
import './Profile.css';

export default class Profile extends Component {
    constructor() {
        super();

        this.state = {
            profileURL: "",
            status: "",
            subscribedNewsFeeds: [],
            seekingChildCare: false,
            family: [],
            edit: false,
            publicId: ""
        }
    }

    componentDidMount() {
        axios.get('/api/getuserinfo').then(response => {
            // response.data also returns id, first_name, last_name
            let { picture, seeking_childcare, status, newsfeed } = response.data[0];
            let familyMembers = [];
            response.data.forEach((person, i) => {
                familyMembers.push({ name: person.name, image: person.image, relationship: person.relationship });
            })
            this.setState({
                profileURL: picture,
                status: status,
                subscribedNewsFeeds: newsfeed,
                seekingChildCare: seeking_childcare,
                family: familyMembers
            })
        })
    }

    saveChanges() {
        let { status, seekingChildCare, subscribedNewsFeeds, publicId } = this.state;
        axios.put('/api/parentinfo', { status: status, childCare: seekingChildCare, subscriptions: subscribedNewsFeeds }).then(() => {
            console.log('Parent info updated');
        })
        if (publicId) {
            axios.put('/api/userinfo', { picture: publicId }).then(() => {
                console.log('User info updated')
            })
        }
    }

    onDrop = files => {
        // Push all the axios request promise into a single array
        let { REACT_APP_UPLOAD_PRESET, CLOUDINARY_API_KEY, REACT_APP_CLOUD_NAME } = process.env;
        const uploaders = files.map(file => {
            // Initial FormData
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", REACT_APP_UPLOAD_PRESET); // Replace the preset name with your own
            formData.append("api_key", CLOUDINARY_API_KEY); // Replace API key with your own Cloudinary key
            formData.append("timestamp", (Date.now() / 1000) | 0);

            // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
            return axios.post(`https://api.cloudinary.com/v1_1/${REACT_APP_CLOUD_NAME}/image/upload`, formData, {
                headers: { "X-Requested-With": "XMLHttpRequest" },
            }).then(response => {
                const data = response.data;
                const fileURL = data.secure_url // You should store this URL for future references in your app
                console.log(file);
                this.setState({
                    publicId: data.public_id,
                    profileURL: fileURL
                })
                console.log(data);
            })
        });
        axios.all(uploaders).then(() => {
            // ... perform after upload is successful operation

        });
    }

    toggleEdit = () => {
        this.setState({
            edit: !this.state.edit
        })
    }

    setStatus = (e) => {
        this.setState({
            status: e.target.value
        })
    }

    toggleChildCare = () => {
        this.setState({
            seekingChildCare: !this.state.seekingChildCare
        })
    }

    addSubscription = (val) => {
        if (this.state.subscribedNewsFeeds.indexOf(val) === -1) {
            let subArr = this.state.subscribedNewsFeeds.split(", ");
            subArr.push(val);
            subArr = subArr.join(", ");
            this.setState({
                subscribedNewsFeeds: subArr
            })
        }
    }

    deleteSubscription = (val) => {
        let subArr = this.state.subscribedNewsFeeds.split(", ");
        let index = subArr.indexOf(val)
        subArr.splice(index, 1);
        subArr = subArr.join(", ");
        this.setState({
            subscribedNewsFeeds: subArr
        })
    }

    render() {
        let displayFamily = [];
        this.state.family.forEach((person, i) => {
            return displayFamily.push(
                <div className="familyMember" key={i}>
                    <div>
                        <h3>{person.name}</h3>
                        <h4>{person.relationship}</h4>
                    </div>
                    <Image cloudName={process.env.REACT_APP_CLOUD_NAME} publicId={person.image} />
                </div>
            )
        })
        const { edit, profileURL, status, subscribedNewsFeeds, seekingChildCare, family } = this.state;
        return (
            <div>
                {edit ? <Edit setStatus={this.setStatus} profileURL={profileURL} status={status} newsfeed={subscribedNewsFeeds} deleteSubscription={this.deleteSubscription} addSubscription={this.addSubscription} seekingChildCare={seekingChildCare} onDrop={this.onDrop} toggleChildCare={this.toggleChildCare} family={family} /> : <Default profileURL={profileURL} status={status} subscribedNewsFeeds={subscribedNewsFeeds} seekingChildCare={seekingChildCare} family={family} />}
                <div className="buttonContainer">
                    {edit ? <button className="editProfileButton" onClick={() => {
                        this.saveChanges();
                        this.toggleEdit();
                    }
                    }>Save Changes</button> : <button className="editProfileButton" onClick={() => this.toggleEdit()}>Edit Profile</button>}
                    {edit ? <button className="cancelButton" onClick={() => this.toggleEdit()}>Cancel</button> : null}
                </div>
            </div>
        )
    }
}