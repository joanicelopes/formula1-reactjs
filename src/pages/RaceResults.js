import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import RaceResultsTable from "../components/raceResults/RaceResultsTable";
import Loader from '../components/ui/Loader'

const RaceResults = () => {
    const [seasonOptions, setSeasonOptions] = useState([]);
    const [selectedSeason, setSelectedSeason] = useState(null);
    const [selectedRound, setSelectedRound] = useState(null);
    const [roundOptions, setRoundOptions] = useState([]);
    const [raceResults, setRaceResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

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

            const roundOptions = races.map(race => ({
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
            const url = `https://ergast.com/api/f1/${season}/${round}/results.json`;

            axios.get(url)
                .then(response => {
                    const results = response.data.MRData.RaceTable.Races[0].Results;
                    setRaceResults(results);
                })
                .catch(error => {
                    console.error('Error fetching race results:', error);
                });
        }
    };

    // Function to check if an option should be disabled
    const isOptionDisabled = option => {
        if (selectedSeason && option.value) {
            const season = selectedSeason.value;
            const round = option.value;
            return !raceResults.some(result => result.round === round && result.season === season);
        }
        return false;
    };

    return isLoading ? (
        <Loader />
    ) : (
        <div>
            <div className="select-container">
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
            <div>
                {raceResults.length > 0 ? (
                    <div>
                        <div></div>
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
                    <div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default RaceResults
