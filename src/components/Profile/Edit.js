import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import DisplayFamily from './DisplayFamily';
// import axios from 'axios';
import './Profile.css';

export default class Edit extends Component {

    render() {
        let newsfeedArr = this.props.newsfeed.split(", ").map((item, i) => {
            return <button className="editButton" key={i} onClick={() => this.props.deleteSubscription(item)}>{item}<img src="http://i68.tinypic.com/23wwjnc.jpg" alt="delete" /></button>
        });
        let displayFamily = [];
        this.props.family.forEach((person, i) => {
            return displayFamily.push(
                <DisplayFamily person={person} updateName={this.props.updateName} updateRelationship={this.props.updateRelationship} key={i} />)
        })
        return (
            <div className="profileSettings">
                {/* styling for all overlayContainers is in NewPost.css */}
                <div>
                    <Dropzone onDrop={this.props.onDrop} multiple={false} className="profilePicture">
                        <div className="overlayContainer">
                            <img src={this.props.profileURL} alt="upload" className="profilePicture postImg" />
                            <div className="middle">
                                <div className="text">Drag or click to select photo</div>
                            </div>
                        </div>
                    </Dropzone>
                    <div className="profileContainer">
                        <h3>Status: {this.props.status}</h3>
                        <select className="status" onChange={(e) => this.props.setStatus(e.target.value)}>
                            <option value="Parent">Parent</option>
                            <option value="School">School</option>
                            <option value="Day Care">Day Care</option>
                            <option value="Pre-School">Pre-School</option>
                            <option value="Baby-Sitter">Baby-Sitter</option>
                            <option value="Nanny">Nanny</option>
                            <option value="Other">Other</option>
                        </select>
                        <h3>Subscribed News Channels:</h3>
                        <select className="status" onChange={(e) => this.props.addSubscription(e.target.value)}>
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
                        <button className="editButton" onClick={() => this.props.toggleChildCare()}>{this.props.seekingChildCare ? "Yes" : "No"}</button>
                    </div>
                </div>
                <div className="displayEditFamily">
                    <h3>Family:</h3>
                    {displayFamily}
                </div>
            </div>
        )
    }
}