import Loader from '../ui/Loader'

const ConstructorStandingsTable = ({ constructors, standings, isLoading }) => {
    //const image = `/images/drivers/${standings.constructorId}.png`
    return isLoading ? (
        <Loader />
    ) : (
        <div className="standings">
            <table className="table">
                <thead>
                    <tr>
                        <th>POS</th>
                        <th></th>
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
                                <td>{constructorStanding.position}</td>
                                <td>
                                    <span className={`${constructorStanding.constructorId}`}>❚</span>
                                </td>
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