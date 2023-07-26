import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DriverStandingsTable from "../components/driverStandings/DriverStandings";

const DriverStandings = () => {

    const [drivers, setDrivers] = useState([])
    const [standings, setStandings] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchItems = async () => {
            const response = await axios(`https://ergast.com/api/f1/current/driverStandings.json`)
            const result = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
            const driverStandings = result.map((driver) => {
                return {
                    driverId: driver.Driver.driverId,
                    driverName: driver.Driver.givenName + ' ' + driver.Driver.familyName,
                    position: driver.position,
                    points: driver.points,
                    wins: driver.wins,
                    constructor: driver.Constructors[0].name
                }
            })
            setDrivers(result.map((ds) => ds.Driver));
            setStandings(driverStandings)
            setIsLoading(false)
        }
        fetchItems()
    }, [])
    return (
        <div className="standings-container">
            <h1 className='page-title'>Current Driver Standings</h1>
            <DriverStandingsTable isLoading={isLoading} drivers={drivers} standings={standings} />
        </div>
    )
}

export default DriverStandings