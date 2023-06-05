import './App.css';
import Navbar from './components/ui/Navbar';
import Home from './pages/Home';
import Drivers from './pages/Drivers';
import Constructors from './pages/Constructors';
import DriverStandings from './pages/DriverStandings';


const App = () => {
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
    default:
      component = <App />
  }

  return ( 
    <div >
      <div>
        <Navbar />
      </div>
      <div className="container">{component}</div>
    </div>
  )
}
export default App;
