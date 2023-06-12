import React from 'react';

const LastRaceResultsCard = ({ lastRace, isLoading }) => {
    console.log(lastRace)
    return lastRace && lastRace.length > 0 ? (
        <div className="lastrace-results-card">
            <h2>Last Race Results</h2>
            <h4>{lastRace.raceName}</h4>
            <p>{lastRace.date} - {lastRace.time}</p>
            <p>Winner: {lastRace.Driver.code}</p>
            <table>
            <thead>
                <tr>
                    <th>Pos</th>
                    <th>Driver</th>
                    <th>Time</th>
                    <th>Pts</th>
                </tr>
            </thead>
            <tbody>
                {lastRace.Results.map((result, index) => (
                    <tr key={index}>
                        <td>{result.position}</td>
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
