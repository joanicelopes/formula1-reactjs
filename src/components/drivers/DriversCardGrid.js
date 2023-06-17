import React from 'react'
import DriverCard from './DriverCard'

const DriverCardGrid = ({ drivers, isLoading }) => {
    return isLoading ? (
        <h1>Loading...</h1>
    ) : (
        <div className='driver-card-grid'>
            {drivers.map((driver) => {
                // const dt = drivers.find((d) => d.driverId === standings.driverId);
                return (
                    <DriverCard key={driver.driverId} driver={driver}/>
                )
            })}
        </div>
    )
}

export default DriverCardGrid;