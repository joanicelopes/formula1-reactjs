import React from 'react'
import DriverCard from './DriverCard'
import Loader from '../ui/Loader'

const DriverCardGrid = ({ drivers, isLoading }) => {
    return isLoading ? (
        <Loader />
    ) : (
        <div className='driver-card-grid'>
            {drivers.map((driver) => {
                // const dt = drivers.find((d) => d.driverId === standings.driverId);
                return (
                    <DriverCard key={driver.driverId} driver={driver} />
                )
            })}
        </div>
    )
}

export default DriverCardGrid;