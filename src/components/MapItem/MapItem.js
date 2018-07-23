import React from 'react';

export default function MapItem(props) {
    // returns a small marker icon on the map in the location that is passed down from props.lat and props.lng
    return(
        <div style={{width: '100px', height: '100px'}}>
            <img style={{width: props.width ? props.width : "30px"}}src="https://res.cloudinary.com/ozzy/image/upload/v1531511359/93a233029c_ndrtgb.svg" alt="pointer" />
        </div>
    )
}