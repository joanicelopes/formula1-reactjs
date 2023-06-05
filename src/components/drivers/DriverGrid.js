import React from 'react';

const DriverItem = ({ drivers, isLoading }) => {
  return isLoading ? (
      <h1>Loading...</h1>
  ) : (
      <div className="wrapper">
        <h1> Current Drivers</h1>
        <table className="standings-table">
          <thead>
          <tr>
            <th>PERMANENT NUMBER</th>
            <th>DRIVER</th>
            <th>NATIONALITY</th>
            <th>CODE</th>
          </tr>
          </thead>
          <tbody>
          {drivers.map((driver) => (
              <tr key={driver.driverId}>
                <td className="position-column">{driver.permanentNumber}</td>
                <td>{driver.givenName + ' ' + driver.familyName}</td>
                <td>{driver.nationality}</td>
                <td>{driver.code}</td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
};

export default DriverItem;
