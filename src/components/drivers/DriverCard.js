import React from 'react'

const DriverCard = ({ driver, isLoading }) => {
    const image = `/images/drivers/${driver.driverId}_front.png`
    return (
        <div className="driver-card" key={driver.driverId}>
            <div className="driver-number">
                {driver.permanentNumber}
            </div>
            <div className='img-container'>
                <img src={image} alt={driver.driverId} />
            </div>
            <div className='card-content'>
                <h3>{driver.givenName + ' ' + driver.familyName}</h3>
                <p>Team</p>
            </div>
        </div>
    )
}

export default DriverCard;