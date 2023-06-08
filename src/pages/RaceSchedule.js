import React, { useState, useEffect } from 'react'
import axios from 'axios'
import RaceGrid from "../components/raceSchedule/RaceGrid"

const RaceSchedule = () => {
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
    return (
        <div>
            <RaceGrid isLoading={isLoading} races={races} />
        </div>
    )
}
export default RaceSchedule