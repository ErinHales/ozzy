import React, { Component } from 'react';
import axios from 'axios';
import Edit from './Edit.js';
import Default from './Default.js';
import './Profile.css';

export default class Profile extends Component {
    // all of the data and functions for the profile page are stored here and passed down to the default and edit components
    constructor() {
        super();

        this.state = {
            profileURL: "",
            status: "",
            subscribedNewsFeeds: [],
            seekingChildCare: false,
            family: [],
            edit: false 
        }
    }

    componentDidMount() {
        axios.get('/api/getuserinfo').then(response => {
            // response.data also returns id, first_name, last_name
            let { picture, seeking_childcare, status, newsfeed } = response.data[0];
            this.setState({
                profileURL: picture,
                status: status,
                subscribedNewsFeeds: newsfeed,
                seekingChildCare: seeking_childcare,
                // family: familyMembers
            })
        })
        axios.get('/api/familyinfo').then(response => {
            let familyMembers = [];
            response.data.forEach((person, i) => {
                familyMembers.push({ name: person.name, image: person.image, relationship: person.relationship, id: person.id });
            })
            this.setState({
                family: familyMembers
            })
        })
    }

    addFamilyMember = () => {
        let copy = this.state.family.slice();
        copy.push({
            name: null,
            image: null,
            relationship: null
        });
        this.setState({
            family: copy
        })
    }

    updateName = (index, e) => {
        let copy = this.state.family.slice();
        copy[index].name = e.target.value;
        this.setState({
            family: copy
        })
    }

    updateRelationship = (index, e) => {
        let copy = this.state.family.slice();
        copy[index].relationship = e.target.value;
        this.setState({
            family: copy
        })
    } 

    updatePicture = (index, pic) => {
        let copy = this.state.family.slice();
        copy[index].image = pic;
        this.setState({
            family: copy
        })
    }

    saveChanges() {
        let { status, seekingChildCare, profileURL, subscribedNewsFeeds } = this.state;
        axios.put('/api/parentinfo', { status: status, childCare: seekingChildCare, subscriptions: subscribedNewsFeeds }).then(() => {
            console.log('Parent info updated');
        })
        if (profileURL) {
            axios.put('/api/userinfo', { picture: profileURL }).then(() => {
                console.log('User info updated')
            })
        }
        this.state.family.forEach(person => {
            if(person.id) {
                axios.put('/api/updatefamily', {id: person.id, url: person.image, name: person.name, relationship: person.relationship}).then(console.log("family info updated"));
            } else {
                axios.post('/api/addfamily', {name: person.name, image: person.image, relationship: person.relationship}).then(console.log("family member added"));
            }
        })
    }

    onDrop = files => {
        // Basically the same onDrop function as in NewPost.js
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
                    // publicId: data.public_id,
                    profileURL: fileURL
                })
                console.log(data);
            })
        });
        axios.all(uploaders).then(() => {
            // ... perform after upload is successful operation
            console.log(uploaders);
        });
    }


    toggleEdit = () => {
        this.setState({
            edit: !this.state.edit
        })
    }

    setStatus = (val) => {
        this.setState({
            status: val
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

    cancel = () => {
        axios.get('/api/getuserinfo').then(response => {
            // response.data also returns id, first_name, last_name
            let { picture, seeking_childcare, status, newsfeed } = response.data[0];
            let familyMembers = [];
            response.data.forEach((person, i) => {
                familyMembers.push({ name: person.name, image: person.image, relationship: person.relationship, id: person.family_id });
            })
            this.setState({
                profileURL: picture,
                status: status,
                subscribedNewsFeeds: newsfeed,
                seekingChildCare: seeking_childcare,
                family: familyMembers,
                edit: false
            })
        })
    }

    render() {
        console.log(this.state.family);
        const { edit, profileURL, status, subscribedNewsFeeds, seekingChildCare, family } = this.state;
        return (
            <div>
                {edit ? <Edit updatePicture={this.updatePicture} addFamilyMember={this.addFamilyMember} updateName={this.updateName} updateRelationship={this.updateRelationship} setStatus={this.setStatus} profileURL={profileURL} status={status} newsfeed={subscribedNewsFeeds} deleteSubscription={this.deleteSubscription} addSubscription={this.addSubscription} seekingChildCare={seekingChildCare} onDrop={this.onDrop} toggleChildCare={this.toggleChildCare} family={family} /> : <Default profileURL={profileURL} status={status} subscribedNewsFeeds={subscribedNewsFeeds} seekingChildCare={seekingChildCare} family={family} />}
                <div className="buttonContainer">
                    {edit ? <button className="editProfileButton" onClick={() => {
                        this.saveChanges();
                        this.toggleEdit();
                    }
                    }>Save Changes</button> : <button className="editProfileButton" onClick={() => this.toggleEdit()}>Edit Profile</button>}
                    {edit ? <button className="cancelButton" onClick={() => this.cancel()}>Cancel</button> : null}
                </div>
            </div>
        )
    }
}