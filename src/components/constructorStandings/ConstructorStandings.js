import React from 'react';
const ConstructorStandingsTable = ({ constructors, standings, isLoading }) => {
    return isLoading ? (
        <h1>Loading...</h1>
    ) : (
        <div className="standings">
            <h1>Current Constructor Standings</h1>
            <table className="standings-table">
                <thead>
                <tr>
                    <th className="position-column">POS</th>
                    <th>CONSTRUCTOR</th>
                    <th>PTS</th>
                    <th>WINS</th>
                </tr>
                </thead>
                <tbody>
                {standings.map((constructorStanding) => {
                    const constructor = constructors.find((d) => d.constructorId === constructorStanding.constructorId);
                    return (
                        <tr key={constructorStanding.constructorId}>
                            <td className="position-column">{constructorStanding.position}</td>
                            <td>{constructorStanding.constructorName}</td>
                            <td>{constructorStanding.points}</td>
                            <td>{constructorStanding.wins}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    )
};
export default ConstructorStandingsTable;