import React from 'react';

const LastRaceResultsCard = ({ lastRace, isLoading }) => {
    const race = lastRace[0]
    console.log(lastRace.date)
    return lastRace && lastRace.length > 0 ? (
        <div className="lastrace-results-card">
            <h2>Last Race Results</h2>
            <h4>{race.raceName}</h4>
            <p>{race.date} - {race.time}</p>
            <p>Winner: {race.Results[0].Driver.code}</p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis leo eleifend, finibus mi sit amet, lobortis massa. Pellentesque feugiat, lectus nec euismod ornare, elit nisi fringilla ligula, quis lobortis risus velit eu elit. Phasellus quis neque eget lacus facilisis sagittis ut quis ex. Praesent porta orci a erat tempus imperdiet. Integer aliquet magna gravida lacus tristique varius. Nunc malesuada tortor suscipit pulvinar pharetra. Donec dapibus mauris vel ipsum aliquet vulputate. Nunc elementum congue dolor, eu sollicitudin justo ultrices suscipit. Fusce congue, mi ullamcorper consequat faucibus, purus lectus vulputate eros, id gravida tortor arcu et sem. Aliquam varius imperdiet semper. Ut auctor pretium tortor non pulvinar.
        </div>
    ) : (
        <div>No Info</div>
    )
}
export default LastRaceResultsCard;
