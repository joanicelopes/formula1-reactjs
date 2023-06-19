import React from 'react';
import dayjs from 'dayjs';
let utc = require('dayjs/plugin/utc')
let timezone = require('dayjs/plugin/timezone') // dependent on utc plugin

dayjs.extend(utc)
dayjs.extend(timezone)
const UpcomingRaceCard = ({ race, isLoading }) => {
    const formatDate = (dateString) => {
        const date = dayjs(dateString);
        //const date = dayjs.utc(dateString).tz('Atlantic/Cape_Verde')
        return date.format('DD MMM');
    };

    const formatTime = (timeString) => {
        const [hours, minutes] = timeString.split(':');
        const time = dayjs().set('hour', hours).set('minute', minutes);
        const cv = time.subtract(1, 'hour');
        return cv.format('HH:mm');
    };

    const raceWeekend = (startDateString, endDateString) => {
        const start = dayjs(startDateString);
        const end = dayjs(endDateString);
        const startDay = start.format("DD");
        const endDay = end.format("DD MMM");

        if (start.isSame(end, 'month')) {
            return `${startDay} - ${endDay}`;
        } else {
            return `${startDay} ${start.format("MMM")} - ${endDay}`;
        }
    }

    const sessions = [];

    if (race.FirstPractice) {
        sessions.push({
            name: 'First Practice',
            date: race.FirstPractice.date,
            time: race.FirstPractice.time,
        });
    }
    if (race.SecondPractice) {
        sessions.push({
            name: 'Second Practice',
            date: race.SecondPractice.date,
            time: race.SecondPractice.time,
        });
    }
    if (race.ThirdPractice) {
        sessions.push({
            name: 'Third Practice',
            date: race.ThirdPractice.date,
            time: race.ThirdPractice.time,
        });
    }
    if (race.Qualifying) {
        sessions.push({
            name: 'Qualifying',
            date: race.Qualifying.date,
            time: race.Qualifying.time,
        });
    }
    if (race.Sprint) {
        sessions.push({
            name: 'Sprint',
            date: race.Sprint.date,
            time: race.Sprint.time,
        });
    }
    if (race) {
        sessions.push({
            name: 'Race',
            date: race.date,
            time: race.time,
        });
    }

    sessions.sort((a, b) => {
        const first = a.date + a.time;
        const second = b.date + b.time;

        return first.localeCompare(second);
    });

    return (
        <div className="upcoming-race-card">
            <div className="child-1">
                <div className='top-text'>NEXT</div>
                <h2 className='child1-text'>{race.raceName}</h2>
                <p className='child1-text'>{race.Circuit.circuitName}</p>
                <p className='race-weekend'>{raceWeekend(race.FirstPractice.date, race.date)}</p>
            </div>
            <div className="child-2">
                {sessions.map((session) => (
                    <p className="child2-text" key={session.name}>
                        {session.name} ({formatDate(session.date)}) : {formatTime(session.time)}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default UpcomingRaceCard;