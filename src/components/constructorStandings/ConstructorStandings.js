import React from 'react';
import Loader from '../ui/Loader'

const ConstructorStandingsTable = ({ constructors, standings, isLoading }) => {
    return isLoading ? (
        <Loader />
    ) : (
        <div className="standings">
            <table className="table">
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