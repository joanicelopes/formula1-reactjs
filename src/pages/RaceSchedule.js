import React, { useState, useEffect } from 'react'
import axios from 'axios'
import RaceScheduleGrid from "../components/raceSchedule/RaceScheduleGrid"

const RaceSchedule = () => {
    const [races, setRaces] = useState([]);
    const [raceResults, setRaceResults] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchRacesAndResults = async () => {
            try {
                const response = await axios.get('https://ergast.com/api/f1/current.json');
                const raceData = response.data.MRData.RaceTable.Races;
                setRaces(raceData);

                const resultsPromises = raceData.map((race) =>
                    axios.get(`https://ergast.com/api/f1/${race.season}/${race.round}/results.json`)
                );

                const resultsResponses = await Promise.all(resultsPromises);
                const raceResultsData = resultsResponses.map((response) => response.data.MRData.RaceTable.Races);
                setRaceResults(raceResultsData);

                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        };

        fetchRacesAndResults();
    }, []);

    return (
        <div>
            <h1 className='page-title'>{races[0]?.season} Schedule</h1>
            <RaceScheduleGrid isLoading={isLoading} races={races} raceResults={raceResults} />
        </div>
    )
}
export default RaceSchedule