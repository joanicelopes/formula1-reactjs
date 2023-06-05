import React from 'react';
import { useState } from 'react';


const RaceCard = ({ race, isLoading }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const flipCard = () => {
        setIsFlipped(!isFlipped);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-PT', { month: '2-digit', day: '2-digit' });
      };
    
      const formatTime = (timeString) => {
        const [hours, minutes] = timeString.split(':');
        return `${hours}:${minutes}`;
      };
      

    return isLoading ? (
        <h1>Loading...</h1>
    ) : (
        <div
        className={`race-card ${isFlipped ? 'flipped' : ''}`}
        onClick={flipCard}
      >
        <div className="race-card-inner">
          <div className="race-card-front">
            <h2>{race.raceName}</h2>
            <p>Date: {formatDate(race.date)}</p>
            <p>Time: {formatTime(race.time)}</p>
          </div>
          <div className="race-card-back">
            <p>Practice 1 ({formatDate(race.FirstPractice.date)}) : {formatTime(race.FirstPractice.time)}</p>
            <p>Practice 2 ({formatDate(race.SecondPractice.date)}) : {formatTime(race.SecondPractice.time)}</p>
            <p>Practice 3</p>
            <p>Qualifying ({formatDate(race.Qualifying.date)}) : {formatTime(race.Qualifying.time)}</p>
          </div>
        </div>
      </div>
    );
};

export default RaceCard;
