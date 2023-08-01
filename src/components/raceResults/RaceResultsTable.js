import React from "react";

const RaceResultsTable = ({ season, round, raceResults }) => {

    const filteredResults = raceResults.filter(
        (result) => result.season === season && result.round === round
    );
    const results = filteredResults.length > 0 ? filteredResults[0].Results : [];
    console.log(filteredResults.length)
    return results.length > 0 ? (
        <div>
            <h2>Race Results</h2>
            <p>Round {round} - {filteredResults[0].raceName}</p>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Pos</th>
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
                                <td>{result.Driver.givenName} {result.Driver.familyName}</td>
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
        <div>
            <div>
                <h2>Race Results</h2>
                <p>No Info</p>
            </div>
        </div>
    )

}
export default RaceResultsTable;