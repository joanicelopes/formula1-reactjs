import React from 'react';
import RaceCard from './RaceCard';
import UpcomingRaceCard from './UpcomingRaceCard';

const RaceGrid = ({ races, isLoading }) => {
    const upcomingRace = races.find((race) => new Date(race.date) > new Date())
    return isLoading ? (
        <h1>Loading...</h1>
    ) : (
        <div>
            <h1> Race Schedule</h1>
            {upcomingRace && (
                <div className="upcoming-race-container">
                    <UpcomingRaceCard race={upcomingRace} isLoading={isLoading} />
                </div>
            )}
            <div className="race-grid">
            {races.map((race) => (
                <RaceCard key={race.round} race={race} />
                ))}
            </div>
        </div>
    )
}

export default RaceGrid