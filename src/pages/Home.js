import Header from '../components/ui/Header';
import UpcomingRaceCard from '../components/raceSchedule/UpcomingRaceCard'
import React, {useEffect, useState} from "react";
import axios from "axios";

const Home = () => {
    const [ races, setRaces ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true)
    
    useEffect(() => {
        const fetchRaces = async () => {
            try {
                const response = await axios.get(
                    'http://ergast.com/api/f1/current.json'
                );
                const raceData = response.data.MRData.RaceTable.Races;
                setRaces(raceData);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        }
        fetchRaces()
    }, [])
    
    const upcomingRace = races.find((race) => new Date(race.date) > new Date())
    // days until next race
    let timeUntilRace = null;
    if (upcomingRace) {
        const currentDate = new Date();
        const raceDate = new Date(upcomingRace.date);
        const timeDifference = raceDate.getTime() - currentDate.getTime();

        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

        timeUntilRace = `${days} days, ${hours} hours, ${minutes} minutes`;
    }
    
    return (
        <div>
            <Header />
            <div className="time-card-container">
                <div className="time-card">
                    <div className="time-card-header">Next Race in:</div>
                    <div className="time-card-content">{timeUntilRace}</div>
                </div>
            </div>
                {upcomingRace && (
                    <div className="upcoming-race-container-home">
                        <UpcomingRaceCard race={upcomingRace} isLoading={isLoading} />
                    </div>
            )}
        </div>
    )
}
export default Home