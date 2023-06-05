import React from 'react';
import RaceCard from './RaceCard';
const RaceGrid = ({ races, isLoading}) => {
    return isLoading ? (
        <h1>Loading...</h1>
    ) : (
        <div>
            <h1> Race Schedule</h1>
            <div className="race-grid">
            {races.map((race) => (
                <RaceCard key={race.round} race={race} />
                ))}
            </div>
        </div>
    )
}

export default RaceGrid