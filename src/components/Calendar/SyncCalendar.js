import React from 'react';

export default function SyncCalendar(props) {
    return (
        <div className="popUp" style={{left: `${props.left}px`}}>
            <h3>Brookside Elementary has offered to share their calendar with you.  Would you like to sync your Ozzy Calendar with their's?</h3>
            <h6>(It will ONLY sync your Ozzy calendar, not your personal Google Calendar)</h6>
            <button onClick={() => props.sync()}>Sync</button>
        </div>
    )
}