import React from 'react'

const DriverCard = ({ driver }) => {
    const imageSrc = `/images/drivers/${driver.driverId}_front.png`;
    const defaultImageSrc = '/images/drivers/default_front.png';

    return (
        <div className={`driver-card constructor-${driver.constructor[0].constructorId}`}>
            <div className="driver-number">
                {driver.permanentNumber}
            </div>
            <div className='img-container'>
                <img src={imageSrc}
                    alt={driver.driverId}
                    onError={(e) => {
                        e.target.src = defaultImageSrc; // Use the default image if the specified image doesn't exist 
                    }}
                />
            </div>
            <div className='card-content'>
                <h3>{driver.givenName + ' ' + driver.familyName}</h3>
                <p>{driver.constructor[0].name}</p>
            </div>
        </div>
    )
}

export default DriverCard;