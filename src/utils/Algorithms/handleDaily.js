import moment from 'moment'

/*
 * Handles events that occur every 'n' number of days
 * (e.g. every day, every 5 days)
 */

const handleDaily = (calendar, recurrence, e) => {
    console.log(e);
    const start = moment(e.start.dateTime)
    const end = moment(e.end.dateTime)

    // reformat reponse to get how many days between each recurrence

    // let index = e.recurrence[0].charAt(":");
    // e.recurrence[0].splice(index, 1);
    let arr = e.recurrence[0].toLowerCase().split(":");
    let findInterval = (arr[1].split(";"))
    let eventObj = {};
    findInterval.forEach(recurrence => {
        recurrence = recurrence.split("=");
        eventObj[recurrence[0]] = recurrence[1];
    })
    
    const wtfGoogle = getValues(eventObj);

    function getValues(obj) {
        // if (eventObj[RRULEFREQ] === "DAILY" && eventObj[INTERVAL] === true) {
            // return eventObj.INTERVAL;
        if(obj.freq && obj.interval) {
            return 2;
        } else {
            return 1;
        }
    }
    const n = wtfGoogle;
    let add = wtfGoogle
    let reoccurringEvents = []

    while (recurrence > 0) {
        const reoccurringEvent = {
            eventType: calendar.name,
            creator: e.creator,
            end: end.clone().add(add, 'days')._d,
            gLink: e.htmlLink,
            description: e.description,
            location: e.location,
            start: start.clone().add(add, 'days')._d,
            title: e.summary,
            meta: e
        }
        reoccurringEvents.push(reoccurringEvent)
        recurrence--
        add += n
    }
    return reoccurringEvents
}

export default handleDaily