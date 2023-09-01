import ConstructorGrid from '../../components/constructors/ConstructorGrid';
import React, { useState, useEffect } from 'react'
import Footer from '../../components/ui/Footer';
import axios from 'axios'
import './Constructors.css'
const Constructors = () => {

    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchItems = async () => {
            const response = await axios('https://ergast.com/api/f1/current/driverStandings.json')
            const standingsLists = response.data.MRData.StandingsTable.StandingsLists;
            const constructorDriverMap = [];

            standingsLists.forEach((standingList) => {
                standingList.DriverStandings.forEach((driverStanding) => {
                    const constructor = driverStanding.Constructors[0];
                    const constructorId = constructor.constructorId;
                    const driver = driverStanding.Driver;

                    const constructorIndex = constructorDriverMap.findIndex((item) => item.constructorId === constructorId);
                    if (constructorIndex === -1) {
                        constructorDriverMap.push({
                            constructorId,
                            name: constructor.name,
                            nationality: constructor.nationality,
                            drivers: [driver]
                        });
                    } else {
                        constructorDriverMap[constructorIndex].drivers.push(driver);
                    }
                });
            });

            const driverIdToExclude = "de_vries";

            // Create a new array without the driver with the specified ID
            const filteredConstructorDriverMap = constructorDriverMap.map((constructor) => ({
                ...constructor,
                drivers: constructor.drivers.filter((driver) => driver.driverId !== driverIdToExclude),
            }));
            //console.log("Filtered Constructor Driver Map:", filteredConstructorDriverMap);

            setItems(filteredConstructorDriverMap)
            //console.log(constructorDriverMap)
            setIsLoading(false)
        }
        fetchItems()
    }, [])

    return (
        <>
            <h1 className='page-title'>Constructors</h1>
            <div className="constructors-grid-container">
                <ConstructorGrid isLoading={isLoading} items={items} />
                <Footer />
            </div>
        </>
    )
}

export default Constructors