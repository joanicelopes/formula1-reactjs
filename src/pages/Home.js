import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from 'dayjs'
import Header from '../components/ui/Header';
import relativeTime from 'dayjs/plugin/relativeTime';
import UpcomingRaceCard from '../components/raceSchedule/UpcomingRaceCard'
import LastRaceResultsCard from "../components/lastRaceResults/LastRaceResults";

const Home = () => {
    const [races, setRaces] = useState([]);
    const [lastRace, setLastRace] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    dayjs.extend(relativeTime);

    useEffect(() => {
        const fetchRaces = async () => {
            try {
                const raceDataResponse = await axios.get(
                    'http://ergast.com/api/f1/current.json'
                );
                const raceData = raceDataResponse.data.MRData.RaceTable.Races;

                const lastRaceResponse = await axios.get(
                    'https://ergast.com/api/f1/current/last/results.json'
                )
                const lastRaceData = lastRaceResponse.data.MRData.RaceTable.Races;

                setRaces(raceData);
                setLastRace(lastRaceData)
                setIsLoading(false);

            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        }
        fetchRaces()
    }, [])

    const upcomingRace = races.find((race) => race && new Date(race.date) > new Date());

    /* Needs correction */
    const DaysUntilRace = (upcomingRace) => {
        if (upcomingRace) {
            const currentDate = dayjs();
            const raceDate = dayjs(upcomingRace.date);

            const days = raceDate.diff(currentDate, 'days');
            const hours = raceDate.diff(currentDate, 'hours') % 24;
            const minutes = raceDate.diff(currentDate, 'minutes') % 60;

            return `${days} days, ${hours} hours, ${minutes} minutes`;
        }

        return null;
    };


    return isLoading ? (
        <h1>Loading...</h1>
    ) : (
        <div className="home-grid-container">
            <Header />
            <div className="time-card-container">
                <div className="time-card">
                    <div className="time-card-header">Next Race in:</div>
                    <div className="time-card-content">{DaysUntilRace(upcomingRace)}</div>
                </div>
            </div>
            {upcomingRace && (
                <div className="upcoming-race-container-home">
                    <UpcomingRaceCard race={upcomingRace} isLoading={isLoading} />
                </div>
            )}
            <div className="last-race-results-container">
                <LastRaceResultsCard lastRace={lastRace} isLoading={isLoading} />
            </div>
            <div className='xpto'>
            </div>
        </div>
    );

}
export default Home