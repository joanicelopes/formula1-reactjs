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
        const endDay = end.format("DD MMMM");
        return `${startDay} - ${endDay}`;
    }

    return (
        <div className="upcoming-race-card">
            <div className="child-1">
                <div className='top-text'>NEXT</div>
                <h2 className='child1-text'>{race.raceName}</h2>
                <p className='child1-text'>{race.Circuit.circuitName}</p>
                <p className='race-weekend'>{raceWeekend(race.FirstPractice.date, race.date)}</p>
            </div>
            <div className="child-2">
                <p className="child2-text">Practice 1 ({formatDate(race.FirstPractice.date)}) : {formatTime(race.FirstPractice.time)}</p>
                <p className="child2-text">Practice 2 ({formatDate(race.SecondPractice.date)}) : {formatTime(race.SecondPractice.time)}</p>
                {race.ThirdPractice && (
                    <p className="child2-text">Practice 3 ({formatDate(race.ThirdPractice.date)}) : {formatTime(race.ThirdPractice.time)}</p>
                )}
                {race.Sprint && (
                    <p className="child2-text">Sprint ({formatDate(race.Sprint.date)}) : {formatTime(race.Sprint.time)}</p>
                )}
                <p className="child2-text">Qualifying ({formatDate(race.Qualifying.date)}) : {formatTime(race.Qualifying.time)}</p>
                <p className="child2-text">Race ({formatDate(race.date)}) : {formatTime(race.time)}</p>
            </div>
        </div>
    );
};

export default UpcomingRaceCard;