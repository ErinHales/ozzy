import React from 'react';
import Dropzone from 'react-dropzone';
// import axios from 'axios';
import './Profile.css';

export default function Edit(props) {



    // onDrop = (files) => {
    //     // Push all the axios request promise into a single array
    //     let { REACT_APP_UPLOAD_PRESET, CLOUDINARY_API_KEY, REACT_APP_CLOUD_NAME } = process.env;
    //     // const uploaders = 
    //     files.map(file => {
    //         // Initial FormData
    //         const formData = new FormData();
    //         formData.append("file", file);
    //         formData.append("upload_preset", REACT_APP_UPLOAD_PRESET); // Replace the preset name with your own
    //         formData.append("api_key", CLOUDINARY_API_KEY); // Replace API key with your own Cloudinary key
    //         formData.append("timestamp", (Date.now() / 1000) | 0);

    //         // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
    //         return axios.post(`https://api.cloudinary.com/v1_1/${REACT_APP_CLOUD_NAME}/image/upload`, formData, {
    //             headers: { "X-Requested-With": "XMLHttpRequest" },
    //         }).then(response => {
    //             const data = response.data;
    //             const fileURL = data.secure_url // You should store this URL for future references in your app
    //             console.log(file);
    //             let copy = this.state.family.slice();
    //             copy[i].image = fileURL
    //             this.setState({
    //                 // publicId: data.public_id,
    //                 family: copy
    //             })
    //             console.log(data);
    //         })
    //     });
    //     // axios.all(uploaders).then(() => {
    //     //     // ... perform after upload is successful operation
    //     //     console.log(uploaders);
    //     // });
    // }

    
    let newsfeedArr = props.newsfeed.split(", ").map(item => {
        return <button className="editButton" onClick={() => props.deleteSubscription(item)}>{item}<img src="http://i68.tinypic.com/23wwjnc.jpg" alt="delete" /></button>
    });
    let displayFamily = [];
    props.family.forEach((person, i) => {
        return displayFamily.push(
            <div className="familyMember" key={i}>
                <Dropzone onDrop={(file) => props.onDropFam(file, i)} multiple={false} className="dropzone">
                    <img src={person.image} alt="family" />
                </Dropzone>
                <div>
                    <input placeholder={person.name} type="text" onChange={(e) => this.updateName(i, e)} />
                    < input placeholder={person.relationship} type="text" onChange={(e) => props.updateRelationship(i, e)} />
                </div>
            </div>)
    })
    return (
        <div className="profileSettings">
            <Dropzone onDrop={props.onDrop} multiple={false} className="profilePicture">
                <img src={props.profileURL} alt="upload" className="profilePicture" />
            </Dropzone>
            <div className="profileContainer">
                <h3>Status: {props.status}</h3>
                <select className="status" onChange={(e) => props.setStatus(e)}>
                    <option value="Parent">Parent</option>
                    <option value="School">School</option>
                    <option value="Day Care">Day Care</option>
                    <option value="Pre-School">Pre-School</option>
                    <option value="Baby-Sitter">Baby-Sitter</option>
                    <option value="Nanny">Nanny</option>
                    <option value="Other">Other</option>
                </select>
                <h3>Subscribed News Channels:</h3>
                <select className="status" onChange={(e) => props.addSubscription(e.target.value)}>
                    <option value="Just Moms">Just Moms</option>
                    <option value="Just Dads">Just Dads</option>
                    <option value="Expecting">Expecting</option>
                    <option value="Babies">Babies</option>
                    <option value="Toddlers">Toddlers</option>
                    <option value="Elementary">Elementary</option>
                    <option value="Pre-Teen">Pre-Teen</option>
                    <option value="Teen">Teen</option>
                    <option value="All Grown Up">All Grown Up</option>
                </select>
                {newsfeedArr}
                <h3>Seeking Child Care: </h3>
                <button className="editButton" onClick={() => props.toggleChildCare()}>{props.seekingChildCare ? "Yes" : "No"}</button>
            </div>
            <div className="displayEditFamily">
                {displayFamily}
            </div>
        </div>
    )
}