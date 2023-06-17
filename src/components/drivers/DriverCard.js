import React from 'react'

const DriverCard = ({ driver }) => {
    const image = `/images/drivers/${driver.driverId}_front.png`
    return (
        <div className={`driver-card constructor-${driver.constructor[0].constructorId}`}>
            <div className="driver-number">
                {driver.permanentNumber}
            </div>
            <div className='img-container'>
                <img src={image} alt={driver.driverId} />
            </div>
            <div className='card-content'>
                <h3>{driver.givenName + ' ' + driver.familyName}</h3>
                <p>{driver.constructor[0].name}</p>
            </div>
        </div>
    )
}

export default DriverCard;