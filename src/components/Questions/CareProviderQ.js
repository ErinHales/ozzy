import React from 'react';

export default function CareProviderQ(props) {
    return (
        <div>
            <h3>What type of child care are you?</h3>
            <button onClick={() => props.updateStatus("School")}>School</button>
            <button onClick={() => props.updateStatus("Day Care")}>Day Care</button>
            <button onClick={() => props.updateStatus("Baby Sitter")}>Baby Sitter</button>
            <button onClick={() => props.updateStatus("Nanny")}>Nanny</button>
        </div>
    )
}