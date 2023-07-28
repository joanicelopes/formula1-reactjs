import React from 'react';
import Loader from '../ui/Loader'

const DriverStandingsTable = ({ drivers, standings, isLoading }) => {
    return isLoading ? (
        <Loader />
    ) : (
        <div className="standings">
            <table className="table">
                <thead>
                    <tr>
                        <th className="position-column">POS</th>
                        <th></th>
                        <th>DRIVER</th>
                        <th>TEAM</th>
                        <th>PTS</th>
                        <th>WINS</th>
                    </tr>
                </thead>
                <tbody>
                    {standings.map((driverStanding) => {
                        const driver = drivers.find((d) => d.driverId === driverStanding.driverId);
                        return (
                            <tr key={driverStanding.driverId}>
                                <td>{driverStanding.position}</td>
                                <td><span className={`${driverStanding.constructorId}`}>❚</span></td>
                                <td className='driver-column'>{driverStanding.driverName}</td>
                                <td>{driverStanding.constructor}</td>
                                <td>{driverStanding.points}</td>
                                <td>{driverStanding.wins}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
};
export default DriverStandingsTable;