import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import RaceResultsTable from "../../components/raceResults/RaceResultsTable";
import Loader from '../../components/ui/Loader'
import dayjs from 'dayjs';
let utc = require('dayjs/plugin/utc')
let timezone = require('dayjs/plugin/timezone') // dependent on utc plugin

dayjs.extend(utc)
dayjs.extend(timezone)

const RaceResults = () => {
    const [seasonOptions, setSeasonOptions] = useState([]);
    const [selectedSeason, setSelectedSeason] = useState(null);
    const [selectedRound, setSelectedRound] = useState(null);
    const [roundOptions, setRoundOptions] = useState([]);
    const [raceResults, setRaceResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [raceInfo, setRaceInfo] = useState([]);
    const [qualyResults, setQualyResults] = useState([]);
    const [showQualifyingResults, setShowQualifyingResults] = useState(false);
    const [showRaceResults, setShowRaceResults] = useState(true);

    const handleShowQualifyingResults = () => {
        setShowQualifyingResults(true);
        setShowRaceResults(false);
    };

    const handleShowRaceResults = () => {
        setShowQualifyingResults(false);
        setShowRaceResults(true);
    };

    const formatDate = (dateString) => {
        const date = dayjs(dateString);
        //const date = dayjs.utc(dateString).tz('Atlantic/Cape_Verde')
        return date.format('DD MMM');
    };

    const formatTime = (timeString) => {
        const [hours, minutes] = timeString.split(':');
        const time = dayjs().set('hour', hours).set('minute', minutes);
        const cv = time.subtract(1, 'hour');
        return cv.format('HH:mm');
    };

    useEffect(() => {
        const fetchDataForPage = async (page) => {
            const response = await axios.get('https://ergast.com/api/f1.json', {
                params: {
                    offset: (page - 1) * 30,
                    limit: 30,
                },
            });
            return response.data.MRData.RaceTable.Races;
        };

        const fetchAllData = async () => {
            let allRaces = [];
            let page = 1;
            let races;

            do {
                races = await fetchDataForPage(page);
                allRaces = allRaces.concat(races);
                page++;
            } while (races.length > 0);

            return allRaces;
        };

        const loadSeasonOptions = async () => {
            const allRaces = await fetchAllData();
            const uniqueSeasons = Array.from(new Set(allRaces.map(race => race.season)));
            uniqueSeasons.sort((a, b) => b - a);

            const seasonOptions = uniqueSeasons.map(season => ({ value: season, label: season }));
            setSeasonOptions(seasonOptions);
        };

        loadSeasonOptions();
        setIsLoading(false);
    }, []);

    const fetchSeasonData = async (season) => {
        const response = await axios.get(`https://ergast.com/api/f1/${season}.json`);
        return response.data;
    };

    const handleSeasonChange = async selectedOption => {
        setSelectedSeason(selectedOption);
        setSelectedRound(null);
        setRaceResults([]);

        if (selectedOption) {
            const season = selectedOption.value;
            const response = await fetchSeasonData(season);
            const races = response.MRData.RaceTable.Races;
            const currentDate = new Date();

            const roundOptions = races
                .filter(race => new Date(race.date) < currentDate)
                .map(race => ({
                    value: race.round,
                    label: race.raceName,
                }));

            setRoundOptions(roundOptions);
        }
    };


    const handleRoundChange = selectedOption => {
        setSelectedRound(selectedOption);
        setRaceResults([]);

        if (selectedSeason && selectedOption) {
            const season = selectedSeason.value;
            const round = selectedOption.value;
            const raceResultsUrl = `https://ergast.com/api/f1/${season}/${round}/results.json`;
            const qualifyingResultsUrl = `https://ergast.com/api/f1/${season}/${round}/qualifying.json`;

            axios.all([
                axios.get(raceResultsUrl),
                axios.get(qualifyingResultsUrl)
            ])
                .then(axios.spread((raceResultsResponse, qualifyingResultsResponse) => {
                    const raceResults = raceResultsResponse.data.MRData.RaceTable.Races[0]?.Results || [];
                    const qualifyingResults = qualifyingResultsResponse.data.MRData.RaceTable.Races[0]?.QualifyingResults || [];

                    setRaceResults(raceResults);
                    setQualyResults(qualifyingResults);
                }))
                .catch(error => {
                    console.error('Error fetching data:', error);
                });

            axios.get(raceResultsUrl)
                .then(response => {
                    const info = response.data.MRData.RaceTable.Races[0];
                    setRaceInfo(info);
                })
                .catch(error => {
                    console.error('Error fetching race info:', error);
                });
        }
    };

    return isLoading ? (
        <Loader />
    ) : (
        <div>
            <div className="select-container">
                <div className="select-flex">
                    <div className="selects">
                        <div className="select-wrapper">
                            <h4>Season</h4>
                            <Select
                                className='select-dropdown-1'
                                options={seasonOptions}
                                value={selectedSeason}
                                onChange={handleSeasonChange}
                            />
                        </div>
                        {selectedSeason && (
                            <div className="select-wrapper">
                                <h4>Round</h4>
                                <Select
                                    className='select-dropdown-2'
                                    options={roundOptions}
                                    value={selectedRound}
                                    onChange={handleRoundChange}
                                />
                            </div>
                        )}
                    </div>

                </div>
            </div>
            <div>
                {!selectedSeason || !selectedRound ? (
                    <div></div>
                ) :
                    showQualifyingResults ? (
                        // Qualifying Results Table
                        <div className='table-container'>
                            <div className="race-info">
                                <div className='race-info-left'>
                                    <h2>Qualifying Results</h2>
                                </div>
                                <div className="race-info-right">
                                    {/* <button onClick={handleToggleQualifyingResults}>Qualifying</button> */}
                                    <div className='buttons-container'>
                                        <button onClick={handleShowRaceResults} disabled={showRaceResults}>
                                            Race Results
                                        </button>
                                        <button onClick={handleShowQualifyingResults} disabled={showQualifyingResults}>
                                            Qualifying Results
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Pos</th>
                                        <th></th>
                                        <th>Driver</th>
                                        <th>Constructor</th>
                                        <th>Q1</th>
                                        <th>Q2</th>
                                        <th>Q3</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {qualyResults.map((result, index) => (
                                        <tr key={index}>
                                            <td>{result.position}</td>
                                            <td><span className={`${result.Constructor.constructorId}`}>❚</span></td>
                                            <td>{result.Driver.givenName} {result.Driver.familyName}</td>
                                            <td>{result.Constructor.name}</td>
                                            <td>{result.Q1 ? result.Q1 : ''}</td>
                                            <td>{result.Q2 ? result.Q2 : ''}</td>
                                            <td>{result.Q3 ? result.Q3 : ''}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <h6>*Note that the starting grid positions may be different to the qualifying positions, due to penalties or mechanical problems.</h6>
                        </div>
                    ) : showRaceResults && raceResults.length > 0 ? (
                        // Race Results Table
                        <div className='table-container'>
                            <div className="race-info">
                                <div className='race-info-left'>
                                    <h2>Race Results</h2>
                                    <h4>Round {selectedRound?.value} - {selectedRound?.label}</h4>
                                    <h5>{formatDate(raceInfo.date)} - {formatTime(raceInfo.time)}</h5>
                                    <h5>{raceInfo.Circuit?.circuitName}</h5>
                                    <h5>{raceInfo.Circuit?.Location.locality}</h5>
                                </div>
                                <div className="race-info-right">
                                    {/* <button onClick={handleToggleQualifyingResults}>Qualifying</button> */}
                                    <div className='buttons-container'>
                                        <button onClick={handleShowRaceResults} disabled={showRaceResults}>
                                            Race Results
                                        </button>
                                        <button onClick={handleShowQualifyingResults} disabled={showQualifyingResults}>
                                            Qualifying Results
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Pos</th>
                                        <th></th>
                                        <th>Driver</th>
                                        <th>Constructor</th>
                                        <th>Laps</th>
                                        <th>Grid</th>
                                        <th>Time/Status</th>
                                        <th>Points</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {raceResults.map((result, index) => (
                                        <tr key={index}>
                                            <td>{result.position}</td>
                                            <td><span className={`${result.Constructor.constructorId}`}>❚</span></td>
                                            <td>{result.Driver.givenName} {result.Driver.familyName}</td>
                                            <td>{result.Constructor.name}</td>
                                            <td>{result.laps}</td>
                                            <td>{result.grid}</td>
                                            <td>{result.Time ? result.Time.time : result.status}</td>
                                            <td>{result.points}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        // Empty div when no race results or race results are not available
                        <div className="no-race-results">
                            {raceResults.length === 0 && (
                                <p>No results available.</p>
                            )}
                        </div>
                    )}
            </div>
        </div>
    );
};

export default RaceResults
