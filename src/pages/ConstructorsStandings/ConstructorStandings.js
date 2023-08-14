import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ConstructorStandingsTable from "../../components/constructorStandings/ConstructorStandings";


const ConstructorStandings = () => {
    const [constructors, setConstructors] = useState([])
    const [standings, setStandings] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchItems = async () => {
            const response = await axios(`https://ergast.com/api/f1/current/constructorStandings.json`)
            const result = response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings
            const constructorStandings = result.map((constructor) => {
                return {
                    constructorId: constructor.Constructor.constructorId,
                    constructorName: constructor.Constructor.name,
                    position: constructor.position,
                    points: constructor.points,
                    wins: constructor.wins,
                }
            })
            setConstructors(result.map((cs) => cs.Constructor));
            setStandings(constructorStandings)
            setIsLoading(false)
        }
        fetchItems()
    }, [])

    return (
        <div className="standings-container">
            <h1 className='page-title'>Current Constructor Standings</h1>
            <ConstructorStandingsTable isLoading={isLoading} constructors={constructors} standings={standings} />
        </div>
    )
}

export default ConstructorStandings