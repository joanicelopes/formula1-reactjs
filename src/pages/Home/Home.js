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
    const [lastRace, setLastRace] = useState([]);
    const [driverStandings, setDriverStandings] = useState([]);
    const [constructors, setConstructors] = useState([])
    const [cStandings, setConstructorStandings] = useState([])
    const [isLoading, setIsLoading] = useState(true);

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
                );
                const lastRaceData = lastRaceResponse.data.MRData.RaceTable.Races;

                setRaces(raceData);
                setLastRace(lastRaceData);

                const response = await axios.get('https://ergast.com/api/f1/current/driverStandings.json');
                const Dresult = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
                const driverStandings = Dresult.map((driver) => ({
                    driverId: driver.Driver.driverId,
                    givenName: driver.Driver.givenName,
                    familyName: driver.Driver.familyName,
                    position: driver.position,
                    points: driver.points,
                    wins: driver.wins,
                    constructor: driver.Constructors[0].name,
                    constructorId: driver.Constructors[0].constructorId
                }));
                setDriverStandings(driverStandings);

                const Dresponse = await axios(`https://ergast.com/api/f1/current/constructorStandings.json`)
            const result = Dresponse.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings
            const constructorStandings = result.map((constructor) => {
                return {
                    constructorId: constructor.Constructor.constructorId,
                    constructorName: constructor.Constructor.name,
                    position: constructor.position,
                    points: constructor.points,
                    wins: constructor.wins,
                }
            })
            setConstructors(result.map((cs) => cs.Constructor));
            setConstructorStandings(constructorStandings)

                setIsLoading(true);
                setTimeout(() => {
                    setIsLoading(false);
                }, 5000);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        };
        fetchRaces();
    }, []);

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
                <div className="summary-card">
                    <div className="driver-standings-summary">
                        <h2>Driver Standings</h2>
                        <ul>
                            {driverStandings.slice(0, 5).map((d) => (
                                <li key={d.position}>
                                    <span className="position">{d.position}</span>
                                    <span className="driver">{d.givenName} {d.familyName}</span>
                                    <span className="team">{d.constructor}</span>
                                    <span className="points">{d.points} pts</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="constructor-standings-summary">
                        <h2>Constructor Standings</h2>
                        <ul>
                            {cStandings.slice(0, 5).map((c) => (
                                <li key={c.position} className={`${c.constructorId}`}>
                                    <span className="position">{c.position}</span>
                                    <span className="driver">{c.constructorName}</span>
                                    <span className="points">{c.points} pts</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Home;
