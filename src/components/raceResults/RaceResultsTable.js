import React from 'react';

const RaceResultsTable = ({ raceResults, isLoading }) => {
    const results = raceResults[0].Results;
    return raceResults && raceResults.length > 0 ? (
        <div>
            {raceResults.length > 0 && (
                <div>
                    <div></div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Pos</th>
                                <th>Driver</th>
                                <th>Constructor</th>
                                <th>Laps</th>
                                <th>Grid</th>
                                <th>Status</th>
                                <th>Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((result, index) => (
                                <tr key={index}>
                                    <td>{result.position}</td>
                                    <td>{result.Driver.givenName} {result.Driver.familyName}</td>
                                    <td>{result.Constructor.name}</td>
                                    <td>{result.laps}</td>
                                    <td>{result.grid}</td>
                                    <td>{result.status}</td>
                                    <td>{result.points}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    ) : (
        <div className="">
            <h2>Last Race Results</h2>
            <p>No Info</p>
        </div>
    )
}
export default RaceResultsTable;
