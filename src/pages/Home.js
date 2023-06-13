import Header from '../components/ui/Header';
import UpcomingRaceCard from '../components/raceSchedule/UpcomingRaceCard'
import React, {useEffect, useState} from "react";
import axios from "axios";
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';
import LastRaceResultsCard from "../components/lastRaceResults/LastRaceResults";

const Home = () => {
    const [ races, setRaces ] = useState([]);
    const [ lastRace, setLastRace ] = useState([])
    const [ isLoading, setIsLoading ] = useState(true)

    dayjs.extend(relativeTime);
    
    useEffect(() => {
        const fetchRaces = async () => {
            try {
                const raceDataResponse = await axios.get(
                    'http://ergast.com/api/f1/current.json'
                );
                const lastRaceResponse = await axios.get('https://ergast.com/api/f1/current/last/results.json')
                const raceData = raceDataResponse.data.MRData.RaceTable.Races;
                //const lastRaceData = lastRaceResponse.data.MRData.RaceTable.Races[0].Results;
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
    const DaysUntilRace = (upcomingRace) => {
        if (upcomingRace) {
            const currentDate = new Date();
            const raceDate = new Date(upcomingRace.date);
            const timeDifference = raceDate.getTime() - currentDate.getTime();

            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

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
            <div className="lastrace-results-container">
                <LastRaceResultsCard lastRace={lastRace} isLoading={isLoading}/>
            </div>
        </div>
    );

}
export default Home