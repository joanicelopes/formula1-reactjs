import React from 'react';

const LastRaceResultsCard = ({ lastRace, isLoading }) => {
    const results = lastRace[0].Results;
    return lastRace && lastRace.length > 0 ? (
        <div className="last-race-results-card">
            <h2>Last Race Results</h2>
            <p>Round {lastRace[0].round} - {lastRace[0].raceName}</p>
            <table className='last-race-table'>
            <thead>
                <tr>
                    <th>Pos</th>
                    <th>Driver</th>
                    <th>Time</th>
                    <th>Pts</th>
                </tr>
            </thead>
            <tbody>
                {results.map((result, index) => (
                    <tr key={index}>
                        <td>{result.position}</td>
                        <td>{result.Driver.givenName} {result.Driver.familyName}</td>
                        <td>{result.Time ? result.Time.time : result.status}</td>
                        <td>{result.points}</td>
                    </tr>
                ))}
            </tbody>
            </table>
        </div>
    ) : (
        <div className="lastrace-results-card">
        <h2>Last Race Results</h2>
        <p>No Info</p>
        </div>
    )
}
export default LastRaceResultsCard;
