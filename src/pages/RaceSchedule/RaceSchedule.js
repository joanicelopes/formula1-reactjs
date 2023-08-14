import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RaceScheduleGrid from '../../components/raceSchedule/RaceScheduleGrid';

const RaceSchedule = () => {
    const [races, setRaces] = useState([]);
    const [raceResults, setRaceResults] = useState({});
    const [isLoading, setIsLoading] = useState(true);

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

                // Create an object with race data as keys and their respective results as values
                const raceResultsObject = {};
                raceData.forEach((race, index) => {
                    raceResultsObject[`${race.season}-${race.round}`] = raceResultsData[index];
                });

                setRaceResults(raceResultsObject);
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
            <h1 className="page-title"> Schedule</h1>
            <RaceScheduleGrid isLoading={isLoading} races={races} raceResults={raceResults} />
        </div>
    );
};

export default RaceSchedule;
