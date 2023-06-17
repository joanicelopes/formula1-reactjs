import React from 'react';
import { useState } from 'react';
import dayjs from 'dayjs';
import Modal from "../Modal/Modal";

const RaceCard = ({ race, raceResults, isLoading }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleViewResultsClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const flipCard = () => {
        setIsFlipped(!isFlipped);
    };

    const handleCardClick = () => {
        if (!hasRacePassed) {
            flipCard();
        }
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

    const raceWeekend = (startDateString, endDateString) => {
        const start = dayjs(startDateString);
        const end = dayjs(endDateString);
        const startDay = start.format("DD");
        const endDay = end.format("DD MMM");
        return `${startDay} - ${endDay}`;
    }

    const hasRacePassed = new Date(race.date) < new Date(); // Check if the race date has passed

    return isLoading ? (
        <h1>Loading...</h1>
    ) : (
        <div className={`race-card-container ${isFlipped ? 'flipped' : ''}`}
            onClick={handleCardClick}
        >
            <div className="race-card" style={hasRacePassed ? { border: '1px solid #ccc', borderRadius: '8px' } : {}}>
                <div className="race-card-front">
                    <span className="race-round">Round {race.round}</span>
                    <h3>{race.raceName}</h3>
                    <h4 className="circuit-name">{race.Circuit.circuitName}</h4>
                    <p className='race-weekend'>{raceWeekend(race.FirstPractice.date, race.date)}</p>
                    <p>Race ({formatDate(race.date)}) : {formatTime(race.time)}</p>
                    {hasRacePassed && <button className="race-results-btn" onClick={handleViewResultsClick}>View Results</button>}
                    {/* <Modal season={race.season} raceRound={race.round} raceResults={raceResults} /> */}
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
            {isModalOpen && (
                <Modal season={race.season} round={race.round} raceResults={raceResults} closeModal={handleCloseModal} />
            )}
        </div>
    );
};

export default RaceCard;
