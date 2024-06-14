import React from "react";
import RaceCardNew from "./RaceCardNew";
import UpcomingRaceCard from "./UpcomingRaceCard";
import Loader from "../ui/Loader";

const RaceScheduleGrid = ({ races, raceResults, isLoading }) => {
    const upcomingRace = races.find((race) => new Date(race.date) > new Date());
    return isLoading ? (
        <Loader />
    ) : (
        <div>
            {upcomingRace && (
                <div className="upcoming-race-container">
                    <UpcomingRaceCard
                        race={upcomingRace}
                        isLoading={isLoading}
                    />
                </div>
            )}
            {/* <div className="race-grid">
                {races.map((race) => (
                    <RaceCardNew
                        key={race.round}
                        race={race}
                        raceResults={raceResults}
                    />
                ))}
            </div> */}
            <div className="race-list">
                {races.map((race) => (
                    <ul>
                        <li>
                            <RaceCardNew
                                key={race.round}
                                race={race}
                                raceResults={raceResults}
                            />
                        </li>
                    </ul>
                ))}
            </div>
        </div>
    );
};

export default RaceScheduleGrid;
