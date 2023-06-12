import React from 'react';
import { useState } from 'react';
import dayjs from 'dayjs';

const RaceCard = ({ race, isLoading }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const flipCard = () => {
        setIsFlipped(!isFlipped);
    };

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

    const hasRacePassed = new Date(race.date) < new Date(); // Check if the race date has passed

    return isLoading ? (
        <h1>Loading...</h1>
    ) : (
        <div className={`race-card-container ${isFlipped ? 'flipped' : ''}`} 
             onClick={flipCard}
             
        >
        <div className="race-card" style={hasRacePassed ? { border: '3px solid #ccc' } : {}}>
          <div className="race-card-front">
           {/* <span className="race-round">Round {race.round}</span>*/}
            <h3>{race.raceName}</h3>
            <h4 className="circuitName">{race.Circuit.circuitName}</h4>
            <p>Date: {formatDate(race.date)}</p>
            <p>Time: {formatTime(race.time)}</p>
          </div>
          <div className="race-card-back">
            <p>Practice 1 ({formatDate(race.FirstPractice.date)}) : {formatTime(race.FirstPractice.time)}</p>
            <p>Practice 2 ({formatDate(race.SecondPractice.date)}) : {formatTime(race.SecondPractice.time)}</p>
              {race.ThirdPractice && (
                  <p>Practice 3 ({formatDate(race.ThirdPractice.date)}) : {formatTime(race.ThirdPractice.time)}</p>
              )}
              {race.Sprint && (
                  <p>Sprint ({formatDate(race.Sprint.date)}) : {formatTime(race.Sprint.time)}</p>
              )}
            <p>Qualifying ({formatDate(race.Qualifying.date)}) : {formatTime(race.Qualifying.time)}</p>
          </div>
        </div>
        </div>
    );
};

export default RaceCard;
