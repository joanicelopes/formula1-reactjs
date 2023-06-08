import ConstructorGrid from '../components/constructors/ConstructorGrid';
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Home = () =>  {

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
        setItems(constructorDriverMap)
        console.log(constructorDriverMap)
        setIsLoading(false)
    }
    fetchItems()
},[])
    
    return (
        <ConstructorGrid isLoading={isLoading} items={items} />
    )
}

export default Home