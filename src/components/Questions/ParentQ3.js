import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class ParentQ3 extends Component {
    constructor() {
        super();

        this.state = {
            userPic: ""
        }
    }

    componentDidMount() {
        axios.get('/api/getuserinfo').then(res => {
            this.setState({
                userPic: res.data[0].picture
            })
        })
    }

    onDrop = files => {
        // This takes the file that is uploaded from react-dropzone and immediately uploads it onto Cloudinary. Cloudinary returns a public id and url for the image that can be used in website layouts
        // Push all the axios request promise into a single array
        let { REACT_APP_UPLOAD_PRESET, CLOUDINARY_API_KEY, REACT_APP_CLOUD_NAME } = process.env;
        const uploaders = files.map(file => {
            // Information must be in form data, that's the way Cloudinary wants it
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", REACT_APP_UPLOAD_PRESET); // Replace the preset name with your own
            formData.append("api_key", CLOUDINARY_API_KEY); // Replace API key with your own Cloudinary key
            formData.append("timestamp", (Date.now() / 1000) | 0);

            // Make an AJAX upload request using Axios, pass in formData
            return axios.post(`https://api.cloudinary.com/v1_1/${REACT_APP_CLOUD_NAME}/image/upload`, formData, {
                headers: { "X-Requested-With": "XMLHttpRequest" },
            }).then(response => {
                const data = response.data;
                const fileURL = data.secure_url // You should store this URL for future references in your app
                console.log(file);
                this.setState({
                    publicId: data.public_id,
                    userPic: fileURL
                })
            })
        });
        axios.all(uploaders).then(() => {
            // ... perform after upload is successful operation

        });
    }

    render() {
        return (
            <div className="parentQ3" style={{ left: `${this.props.position}%`}}>
                <h3>Update Your Profile Picture</h3>
                <Dropzone onDrop={this.onDrop} className='dropzone setProfilePic' multiple={false}>
                    <div className="overlayContainer">
                        <img src={this.state.userPic} alt="upload" className="postImg introImg" />
                        <div className="middle">
                            <div className="text">Drag or click to select photo</div>
                        </div>
                    </div>
                </Dropzone>
                <Link to="/forum"><button id="next" onClick={() => this.props.submit(this.state.userPic)}><img src="http://i65.tinypic.com/309k6z5.jpg" alt=""/></button></Link>
                <button id="prev" onClick={() => this.props.slideBack("parentQ3", "parentQ2")}><img src="http://i68.tinypic.com/2wd99fn.jpg" alt="" /></button>
            </div>
        )
    }
}