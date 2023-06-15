import DriverGrid from '../components/drivers/DriverGrid';
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DriverCardGrid from '../components/drivers/DriversCardGrid';
const Drivers = () => {

    const [drivers, setDrivers] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchItems = async () => {
            const result = await axios(`http://ergast.com/api/f1/current/drivers.json`)
            const driverData = result.data.MRData.DriverTable.Drivers
            setDrivers(driverData)
            setIsLoading(false)
            console.log(drivers)
        }
        fetchItems()
    }, [])
    return (
        <div>
            <h1 className='page-title'>Drivers</h1>
            <DriverCardGrid isLoading={isLoading} drivers={drivers} />
        </div>
    )
}

export default Drivers