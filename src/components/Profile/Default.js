import React from 'react';
import { Image } from 'cloudinary-react';

export default function Default(props) {
    //needs profileURL, status, subscribedNewsFeeds, seekingChildCare, displayFamily
    let displayFamily = [];
    props.family.forEach((person, i) => {
        return displayFamily.push(
            <div className="familyMember" key={i}>
                <Image cloudName={process.env.REACT_APP_CLOUD_NAME} publicId={person.image} />
                <div>
                    <h3>{person.name}</h3>
                    <h4>{person.relationship}</h4>
                </div>
            </div>
        )
    })
    return (
        <div className="profileSettings">
            <img src={props.profileURL} alt="profile" className="profilePicture" />
            <div className="settingsContainer">    
                <h3>Status:  {props.status}</h3>
                <h3>Subscribed News Channels: {props.subscribedNewsFeeds}</h3>
                <h3>Seeking Child Care: {props.seekingChildCare ? "Yes" : "No"}</h3>
            </div>
            <div className="family">
                <h3>Family:</h3>
                <div className="displayFamily">
                    {displayFamily}
                </div>
            </div>
        </div>
    )
}