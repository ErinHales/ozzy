import React from 'react';
import Dropzone from 'react-dropzone';
import Image from 'react-dropzone';
import './Profile.css';

export default function Edit(props) {

    //props needs setStatus(bind setStatus), profileURL, status, newsfeed, delete function(takes in newsfeed item to be deleted) addSubscription(takes in subscription to be added, use e.target.value), seeking child care, onDrop function, toggleChildCare, update family members picture, add family member

    let newsfeedArr = props.newsfeed.split(", ").map(item => {
        return <button className="editButton" onClick={() => props.deleteSubscription(item)}>{item}<img src="http://i68.tinypic.com/23wwjnc.jpg" alt="delete" /></button>
    })

    // let displayFamily = [];
    // this.state.family.forEach((person, i) => {
    //     return displayFamily.push(
    //         <div className="familyMember" key={i}>
    //             <div>
    //                 <h3>{person.name}</h3>
    //                 <h4>{person.relationship}</h4>
    //             </div>
    //             <Image cloudName={process.env.REACT_APP_CLOUD_NAME} publicId={person.image} />
    //         </div>
    //     )
    // })


    let displayFamily = [];
    props.family.forEach((person, i) => {
        return displayFamily.push(
            <div className="familyMember" key={i}>
                <div>
                    <input placeholder={person.name} type="text" />
                    <input placeholder={person.relationship} type="text" />
                </div>
                <Dropzone onDrop={props.onDrop} className='dropzone' multiple={false}>
                    <Image cloudName={process.env.REACT_APP_CLOUD_NAME} publicId={person.image} />
                </Dropzone>
            </div>
        )
    })

    return (
        <div className="profileSettings">
            <Dropzone onDrop={props.onDrop} className='dropzone' multiple={false}>
                <img src={props.profileURL} alt="upload" className="profilePicture" /></Dropzone>
            <div className="displayEditStatus">
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
            </div>
            <div className="subscriptionsContainer">
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
            </div>
            <div>
                {newsfeedArr}
            </div>
            <div className="childCareContainer">
                <h3>Seeking Child Care: </h3>
                <button className="editButton" onClick={() => props.toggleChildCare()}>{props.seekingChildCare ? "Yes" : "No"}</button>
            </div>
            {displayFamily}
        </div>
    )
}