import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

export default class DisplayFamily extends Component {
    constructor() {
        super();
        
        this.state = {
            familyPic: ""
        }
    }

    componentDidMount() {
        this.setState({
            familyPic: this.props.person.image
        })
    }

    // componentDidUpdate(prevProps, prevState) {
    //     if(prevState.familyPic !== this.state.familyPic) {
    //         axios.put(`/api/familypic/${this.props.person.family_id}`).then(res => {
    //             console.log(`Family member ${this.props.person.family_id} has a new picture!`);
    //         })
    //     }
    // }

    onDrop = file => {
        // Push all the axios request promise into a single array
        let { REACT_APP_UPLOAD_PRESET, CLOUDINARY_API_KEY, REACT_APP_CLOUD_NAME } = process.env;
        // const uploaders = files.map(file => {
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
                    familyPic: fileURL
                })
            })
        // });
        // axios.all(uploaders).then(() => {
            // ... perform after upload is successful operation
            // console.log(uploaders);
        // });
    }

    render() {
        return (
            <div className="familyMember">
                    <Dropzone onDrop={this.onDrop} multiple={false} className="dropzone">
                        <img src={this.state.familyPic} alt="family" />
                    </Dropzone>
                    <div>
                        <input placeholder={this.props.person.name} type="text" onChange={(e) => this.props.updateName(e)} />
                        <input placeholder={this.props.person.relationship} type="text" onChange={(e) => this.props.updateRelationship(e)} />
                    </div>
                </div>
        )
    }
}