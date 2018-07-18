import React, {Component} from 'react';
import Question1 from './Question1';
import ParentQ from './ParentQ';
import CareProviderQ from './CareProviderQ';

export default class Questions extends Component {
    constructor() {
        super();

        this.state = {
            parent: false,
            careProvider: false,
            subscribed: "",
            status: ""
        }
    }

    updateStatus = (val) => {
        this.setState({
            status: val
        })
    }

    render() {
        return (
            <div>
                <Question1 />
                <ParentQ />
                <CareProviderQ updateStatus={this.updateStatus} />
            </div>
        )
    }
}