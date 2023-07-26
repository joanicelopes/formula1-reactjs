import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Select from 'react-select';

const RaceResults = () => {
    const [races, setRaces] = useState([]);
    const [raceResults, setRaceResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchRaces = async () => {
            try {
                const response = await axios.get(
                    'https://ergast.com/api/f1.json'
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
        /* const fetchResults = async () => {
            try {
                for (const race of races) {
                    const raceResultsResponse = await axios.get(
                        `https://ergast.com/api/f1/${race.season}/${race.round}/results.json`
                    );
                    const raceResultsData = raceResultsResponse.data.MRData.RaceTable.Races;
                    setRaceResults((prevRaceResults) => [...prevRaceResults, ...raceResultsData]);
                }
            } catch (error) {
                console.error('Error fetching race results:', error);
            }
        };
        fetchResults() */
    }, [races])

    const otherOptions = races.reduce((acc, item) => {
        if (!acc.seasons.includes(item.season)) {
            acc.seasons.push(item.season);
            acc.result.push({
                label: item.season,
                value: item.season,
            });
        }
        return acc;
    }, { seasons: [], result: [] }).result;

    const options = [
        { value: 2008, label: 2008 },
        { value: 2009, label: 2009 },
        { value: 2010, label: 2010 },
    ]
    const handleChange = (selectedOption) => {
        console.log("handleChange", selectedOption)
    }
    return (
        <div>
            <h1 className='page-title'>Race Results</h1>
            <Select placeholder='Season' options={otherOptions} onChange={handleChange} />
        </div>
    )
}
export default RaceResults
