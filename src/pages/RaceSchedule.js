import React, { useState, useEffect } from 'react'
import axios from 'axios'
import RaceScheduleGrid from "../components/raceSchedule/RaceScheduleGrid"

const RaceSchedule = () => {
    const [races, setRaces] = useState([]);
    const [raceResults, setRaceResults] = useState([])
    const [isLoading, setIsLoading] = useState(true)

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

        const fetchResults = async () => {
            try {
                for (const race of races) {
                    const raceResultsResponse = await axios.get(
                        `http://ergast.com/api/f1/${race.season}/${race.round}/results.json`
                    );
                    const raceResultsData = raceResultsResponse.data.MRData.RaceTable.Races;
                    setRaceResults((prevRaceResults) => [...prevRaceResults, ...raceResultsData]);
                }
            } catch (error) {
                console.error('Error fetching race results:', error);
            }
        };
        fetchResults()
    }, [races])
    return (
        <div>
            <h1 className='page-title'> Race Schedule</h1>
            <RaceScheduleGrid isLoading={isLoading} races={races} raceResults={raceResults} />
        </div>
    )
}
export default RaceSchedule