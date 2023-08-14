import './App.css';
import React, { useState, useEffect } from 'react';
import Navbar from './components/ui/Navbar';
import Home from './pages/Home/Home';
import Drivers from './pages/Drivers/Drivers';
import Constructors from './pages/Constructors/Constructors';
import DriverStandings from './pages/DriverStandings/DriverStandings';
import ConstructorStandings from './pages/ConstructorsStandings/ConstructorStandings';
import RaceSchedule from './pages/RaceSchedule/RaceSchedule';
import RaceResults from './pages/RaceResults/RaceResults';
import Footer from './components/ui/Footer';
import Nav from './components/ui/Nav';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  let component

  switch (window.location.pathname) {
    case "/":
      component = <Home />
      break
    case "/drivers":
      component = <Drivers />
      break
    case "/constructors":
      component = <Constructors />
      break
    case "/driverstandings":
      component = <DriverStandings />
      break
    case "/constructorstandings":
      component = <ConstructorStandings />
      break
    case "/raceschedule":
      component = <RaceSchedule />
      break
    case "/raceresults":
      component = <RaceResults />
      break
    default:
      component = <App />
  }

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <div >
      <div>
        <Nav />
      </div>
      <div className="container">{component}</div>
      {/*       {!isLoading && (
        <div><Footer /></div>
      )} */}
    </div>
  )
}
export default App;
