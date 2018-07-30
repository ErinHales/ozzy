import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import './Calendar.css';

import GoogleCalendar from '../../utils/GoogleCalendar';

import 'react-big-calendar/lib/css/react-big-calendar.css';
// import styles from './Home.scss'

// use Moment.js to localize react-big-calendar
BigCalendar.momentLocalizer(moment)

const calendars = [
    {
        name: 'Erin McBride',
        url: 'mcbridee093@gmail.com'
    },
    {
        name: "Ozzy",
        url: 'ii34a0djbmvg4n2emfie8m3jfs@group.calendar.google.com'
    }
]
const dailyRecurrence = 700
const weeklyRecurrence = 100
const monthlyRecurrence = 20

export default class Calendar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            events: []
        }
    }

    componentDidMount = () => {
        this.getGoogleCalendarEvents()
    }

    getGoogleCalendarEvents = () => {
        /* @param {string} GOOGLE_API_KEY
          *@param {array} calendars - a list of key, value pairs
                        {name: 'name of your calendar', url: 'calendar_url'}
          *@param {number} dailyRecurrence - how many times you want daily events to reoccur
          *@param {number} weeklyRecurrence - how many times you want weekly events to reoccur
          *@param {number} monthlyRecurrence - how many times you want monthly events to reoccur
        
          *@returns {array} events - list of objects that will render on react-big-calendar
          *e.x. event = {
         *           eventType: {string} calendar.name
         *           creator: {string}
         *           end: Datetime
         *           gLink: {string} link to event in Google Calendar,
         *           description: {string},
         *           location: {string}
         *           start: Datetime
         *           title: {string} summary
         *           meta: {object} - everything about the event Google returns
         * }
        */
        GoogleCalendar.getAllCalendars(process.env.REACT_APP_GOOGLE_CALENDAR_API, calendars, dailyRecurrence, weeklyRecurrence, monthlyRecurrence)
            .then(events => this.setState({ events }))
            .catch(err => { throw new Error(err) })
    }

    render() {
        return (
            <div className="calendar-container">
                <BigCalendar events={this.state.events} />
            </div>
        )
    }
}
