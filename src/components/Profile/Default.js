import React from 'react';
import { Image } from 'cloudinary-react';

export default function Default(props) {
    // this is the view that displays all of the users profile information. User cannot edit information from here

    // loops through family array and returns a component for each family member
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
            <div>
                <img src={props.profileURL} alt="profile" className="profilePicture" />
                <div className="settingsContainer">
                    <h3>Status:  {props.status}</h3>
                    <h3>Subscribed News Channels: {props.subscribedNewsFeeds}</h3>
                    <h3>Seeking Child Care: {props.seekingChildCare ? "Yes" : "No"}</h3>
                </div>
            </div>
            <div className="family">
                <h3>Family:</h3>
                {displayFamily[0] ? (
                    <div className="displayFamily">
                        {displayFamily}
                    </div>
                ) : <h2 className="noFamilyMembers">You have not added any family members. <br />Click the Edit button below to add your family</h2>}
            </div>
        </div>
    )
}