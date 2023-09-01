import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DriverCardGrid from '../../components/drivers/DriversCardGrid';
import './Drivers.css'
import Footer from '../../components/ui/Footer';

const Drivers = () => {

    const [drivers, setDrivers] = useState([])
    const [isLoading, setIsLoading] = useState(true)


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
            const driverIdToExclude = "de_vries";

            // Create a new array without the driver with the specified ID
            const filteredDriverConstructorMap = driverConstructorMap.filter((driverEntry) => driverEntry.driverId !== driverIdToExclude);

            setDrivers(filteredDriverConstructorMap);
            //console.log(filteredDriverConstructorMap)
            setIsLoading(false);
        };
        fetchItems()
    }, [])
    return (
        <>
            <h1 className='page-title'>Drivers</h1>
            <div className="drivers-grid-container">
                <DriverCardGrid isLoading={isLoading} drivers={drivers} />
                <Footer />
            </div>
        </>
    )
}

export default Drivers