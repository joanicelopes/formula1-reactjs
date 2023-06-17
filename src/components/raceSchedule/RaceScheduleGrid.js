import React from 'react';
import RaceCard from './RaceCard';
import UpcomingRaceCard from './UpcomingRaceCard';

const RaceScheduleGrid = ({ races, raceResults, isLoading }) => {
    const upcomingRace = races.find((race) => new Date(race.date) > new Date())
    return isLoading ? (
        <h1>Loading...</h1>
    ) : (
        <div>
            {upcomingRace && (
                <div className="upcoming-race-container">
                    <UpcomingRaceCard race={upcomingRace} isLoading={isLoading} />
                </div>
            )}
            <div className="race-grid">
                {races.map((race) => (
                    <RaceCard key={race.round} race={race} raceResults={raceResults} />
                ))}
            </div>
        </div>
    )
}

export default RaceScheduleGrid;