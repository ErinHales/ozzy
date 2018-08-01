import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

export default class DisplayFamily extends Component {
    constructor() {
        super();

        this.state = {
            familyPic: "",
            newImg: ""
        }
    }

    componentDidMount() {
        this.setState({
            familyPic: this.props.person.image,
            newImg: this.props.person.image
        })
    }

    componentDidUpdate(prevProps, prevState) {
        // if the picture of a family member is changed, it automatically updates it in the database
        // Might want to move this function to Profile.js so it is only updated in the database when user clicks "Save Changes" button
        if (prevState.familyPic !== this.state.familyPic) {
            axios.put(`/api/familypic`, { id: this.props.person.id, url: this.state.familyPic }).then(res => {
                console.log(`Family member ${this.props.person.id} has a new picture!`);
            })
        }
    }

    onDrop = files => {
        // Basically same onDrop function as in NewPost.js
        // Push all the axios request promise into a single array
        let { REACT_APP_UPLOAD_PRESET, CLOUDINARY_API_KEY, REACT_APP_CLOUD_NAME } = process.env;
        const uploaders = files.map(file => {
            this.setState({
                familyPic: file.preview
            })
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
                const fileURL = response.data.secure_url // You should store this URL for future references in your app
                console.log(file);
                // this.setState({
                //     // publicId: data.public_id,
                //     familyPic: fileURL
                // })
                this.props.updatePicture(this.props.index, fileURL);
            })
        });
    }

    render() {
        return (
            <div className="familyMember">
                {/* styling for all overlayConatiners is in NewPost.css */}
                <Dropzone onDrop={this.onDrop} multiple={false} className="dropzone">
                    <div className="overlayContainer">
                        <img src={this.state.familyPic ? this.state.familyPic : "http://i63.tinypic.com/2vnorqs.jpg"} alt="family" className="familyProfilePic" />
                        <div className="middle">
                            <div className="text" style={{fontSize: "12px", padding: "10px"}}>Drag or click to select photo</div>
                        </div>
                    </div>
                </Dropzone>
                <div>
                    <input placeholder={this.props.person.name ? this.props.person.name : "name"} type="text" onChange={(e) => this.props.updateName(this.props.index, e)} />
                    <input placeholder={this.props.person.relationship ? this.props.person.relationship : "relationship"} type="text" onChange={(e) => this.props.updateRelationship(this.props.index, e)} />
                </div>
            </div>
        )
    }
}