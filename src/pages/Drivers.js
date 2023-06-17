import DriverGrid from '../components/drivers/DriverGrid';
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DriverCardGrid from '../components/drivers/DriversCardGrid';
const Drivers = () => {

    const [drivers, setDrivers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [standings, setStandings] = useState([])

// TESTING
    /*useEffect(() => {
        const fetchItems = async () => {
            const result = await axios(`http://ergast.com/api/f1/current/drivers.json`)
            const driverData = result.data.MRData.DriverTable.Drivers
            const standings = await axios(`http://ergast.com/api/f1/current/driverStandings.json`)
            setDrivers(driverData)
            setIsLoading(false)
            console.log(drivers)
        }
        fetchItems()
    }, [])*/
    //---------------------------------------------------------------------------------------------------------------------------//
    /*useEffect(() => {
        const fetchItems = async () => {
            const response = await axios(`http://ergast.com/api/f1/current/driverStandings.json`)
            const result = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
            const driverData = result.map((driver) => {
                return {
                    driverId: driver.Driver.driverId,
                    driverName: driver.Driver.givenName + ' ' + driver.Driver.familyName,
                    constructorName: driver.Constructors[0].name,
                    permanentNumber: driver.Driver.permanentNumber,
                }
            })
            setDrivers(result.map((ds) => ds.Driver));
            setStandings(driverData)
            setIsLoading(false)
            console.log(driverData)
        }
        fetchItems()
    }, [])*/
    
    useEffect(() => {
        const fetchItems = async () => {
            const response = await axios('https://ergast.com/api/f1/current/driverStandings.json');
            const standingsLists = response.data.MRData.StandingsTable.StandingsLists;
            const driverConstructorMap = [];

            standingsLists.forEach((standingList) => {
                standingList.DriverStandings.forEach((driverStanding) => {
                    const constructor = driverStanding.Constructors[0];
                    const constructorId = constructor.constructorId;
                    const driver = driverStanding.Driver;

                    const driverIndex = driverConstructorMap.findIndex((item) => item.driverId === driver.driverId);
                    if (driverIndex === -1) {
                        driverConstructorMap.push({
                            driverId: driver.driverId,
                            givenName: driver.givenName,
                            familyName: driver.familyName,
                            permanentNumber: driver.permanentNumber,
                            constructor: [{
                                constructorId,
                                name: constructor.name,
                            }]
                        });
                    } else {
                        driverConstructorMap[driverIndex].constructor = {
                            constructorId,
                            name: constructor.name,
                            nationality: constructor.nationality
                        };
                    }
                });
            });

            setDrivers(driverConstructorMap);
            console.log(driverConstructorMap)
            setIsLoading(false);
        };
        fetchItems()
    },[])
    return (
        <div>
            <h1 className='page-title'>Drivers</h1>
            <DriverCardGrid isLoading={isLoading} drivers={drivers}/>
        </div>
    )
}

export default Drivers