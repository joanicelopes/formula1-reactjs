import React from 'react';

const UpcomingRaceCard = ({ race, isLoading }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-PT', { month: '2-digit', day: '2-digit' })
    };

    const formatTime = (timeString) => {
        const [hours, minutes] = timeString.split(':')
        return `${hours}:${minutes}`
    };

    return (
        <div className="upcoming-race-card">
            <h2>{race.raceName}</h2>
            <p>{race.Circuit.circuitName}</p>
            <p>{formatDate(race.date)} - {formatTime(race.time)}</p>
            <div className="text-container">
            <p className="right-text">Practice 1 ({formatDate(race.FirstPractice.date)}) : {formatTime(race.FirstPractice.time)}</p>
            <p className="right-text">Practice 2 ({formatDate(race.SecondPractice.date)}) : {formatTime(race.SecondPractice.time)}</p>
            {race.ThirdPractice && (
                <p className="right-text">Practice 3 ({formatDate(race.ThirdPractice.date)}) : {formatTime(race.ThirdPractice.time)}</p>
            )}
            {race.Sprint && (
                <p className="right-text">Sprint ({formatDate(race.Sprint.date)}) : {formatTime(race.Sprint.time)}</p>
            )}
            <p className="right-text">Qualifying ({formatDate(race.Qualifying.date)}) : {formatTime(race.Qualifying.time)}</p>
            </div>
        </div>
    );
};

export default UpcomingRaceCard;