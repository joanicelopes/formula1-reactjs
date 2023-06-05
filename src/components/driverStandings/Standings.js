import React from 'react';
const Standings = ({ drivers, standings, isLoading }) => {
    return isLoading ? (
        <h1>Loading...</h1>
    ) : (
        <div className="driver-standings">
            <h1>Current Driver Standings</h1>
            <table className="standings-table">
                <thead>
                <tr>
                    <th className="position-column">POS</th>
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
                            <td className="position-column">{driverStanding.position}</td>
                            <td>{driverStanding.driverName}</td>
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
export default Standings;