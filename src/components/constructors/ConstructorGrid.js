import React, { useState } from 'react'
import Loader from '../ui/Loader'

const ConstructorCard = ({ item, isLoading }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const flipCard = () => {
        setIsFlipped(!isFlipped);
    };
    return isLoading ? (
        <Loader />
    ) : (
        <div className={`constructor-card-container ${isFlipped ? 'flipped' : ''}`} onClick={flipCard}>
            <div className={`constructor-card constructor-${item.constructorId}`}>
                {/*<span className="constructor-country">{item.nationality}</span>*/}
                <div className="constructor-card-front">
                    <h3>{item.name}</h3>
                </div>
                <div className="constructor-card-back">
                    <ul>
                        {item.drivers.map((driver) => (
                            <li key={driver.driverId}>
                                <p>{driver.givenName + ' ' + driver.familyName}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

const ConstructorGrid = ({ items, constructorDrivers, isLoading }) => {
    return isLoading ? (
        <Loader />
    ) : (
        <div className="constructor-grid">
            {items.map((item) => (
                <ConstructorCard key={item.constructorId} item={item} />
            ))}
        </div>
    );
}

export default ConstructorGrid