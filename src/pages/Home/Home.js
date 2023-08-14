import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from 'dayjs'
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import relativeTime from 'dayjs/plugin/relativeTime';
import UpcomingRaceCard from '../../components/raceSchedule/UpcomingRaceCard'
import LastRaceResultsCard from "../../components/lastRaceResults/LastRaceResults";
import Loader from '../../components/ui/Loader'
import './Home.css'

const Home = () => {
    const [races, setRaces] = useState([]);
    const [lastRace, setLastRace] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    dayjs.extend(relativeTime);

    useEffect(() => {
        const fetchRaces = async () => {
            try {
                const raceDataResponse = await axios.get(
                    'https://ergast.com/api/f1/current.json'
                );
                const raceData = raceDataResponse.data.MRData.RaceTable.Races;

                const lastRaceResponse = await axios.get(
                    'https://ergast.com/api/f1/current/last/results.json'
                )
                const lastRaceData = lastRaceResponse.data.MRData.RaceTable.Races;

                setRaces(raceData);
                setLastRace(lastRaceData);

                setIsLoading(true);
                setTimeout(() => {
                    setIsLoading(false)
                }, 5000)
                setIsLoading(false);

            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        }
        fetchRaces()
    }, [])

    const upcomingRace = races.find((race) => race && new Date(race.date) > new Date());

    const DaysUntilRace = () => {

        if (upcomingRace) {
            const raceDateTime = dayjs(`${upcomingRace.date} ${upcomingRace.time}`, 'YYYY-MM-DD HH:mm');
            return raceDateTime.fromNow();
        }

        return null;
    };

    return isLoading ? (
        <Loader />
    ) : (
        <div className="home-grid-container">
            <Header />
            <div className="time-card-container">
                <div className="time-card">
                    <div className="time-card-left">Next Race</div>
                    <div className="time-card-right">{DaysUntilRace(upcomingRace)}</div>
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
            <Footer />
        </div>
    );

}
export default Home