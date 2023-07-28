import React from 'react';

const LastRaceResultsCard = ({ lastRace, isLoading }) => {
    const results = lastRace[0].Results;
    return lastRace && lastRace.length > 0 ? (
        <div className="last-race-results-card">
            <h2>Last Race Results</h2>
            <p>Round {lastRace[0].round} - {lastRace[0].raceName}</p>
            <div className="race-result-body">
                <table className='last-race-result-table'>
                    <thead>
                        <tr>
                            <th>Pos</th>
                            <th></th>
                            <th>Driver</th>
                            <th>Time</th>
                            <th>Pts</th>
                            <th>Laps</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((result, index) => (
                            <tr key={index}>
                                <td>{result.position}</td>
                                <td><span className={`${result.Constructor.constructorId}`}>❚</span></td>
                                <td>{result.Driver.code}</td>
                                <td>{result.Time ? result.Time.time : result.status}</td>
                                <td>{result.points}</td>
                                <td>{result.laps}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    ) : (
        <div className="lastrace-results-card">
            <h2>Last Race Results</h2>
            <p>No Info</p>
        </div>
    )
}
export default LastRaceResultsCard;
