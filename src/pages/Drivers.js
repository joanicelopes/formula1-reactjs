import DriverGrid from '../components/drivers/DriverGrid';
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Home = () =>  {

const [drivers, setDrivers] = useState([])
const [isLoading, setIsLoading] = useState(true)

useEffect(() => {
    const fetchItems = async () => {
      const result = await axios(`http://ergast.com/api/f1/current/drivers.json`)
      const driverData = result.data.MRData.DriverTable.Drivers
        setDrivers(driverData)
        //setItems(driverStandings.map((ds) => ds.Driver));
        //console.log(driverStandings)
        //setStandings(driverStandings)
        console.log(drivers)
        setIsLoading(false)
    }
    fetchItems()
},[]) 
    return (
        <DriverGrid isLoading={isLoading} drivers={drivers} />
    )
}

export default Home