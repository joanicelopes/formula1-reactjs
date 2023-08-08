import logo from '../../img/F1-icon-square.png'
import './NavBar.css';

export default function Nav() {
    return (
        <nav className='nav'>
            <a href="/" className="nav-logo"><img src={logo} className="nav-img" title="Home" alt='Home' /></a>
            <ul className="nav-list">
                <li className="nav-listitem"><a href="/drivers">Drivers</a></li>
                <li className="nav-listitem"><a href="/constructors">Constructors</a></li>
                <li className="nav-listitem">Standings
                    <ul className="nav-listitemdrop">
                        <li><a href="/driverstandings">Drivers</a></li>
                        <li><a href="/constructorstandings">Constructors</a></li>
                    </ul>
                </li>
                <li className="nav-listitem">Races
                    <ul className="nav-listitemdrop">
                        <li><a href="/raceschedule">Race Schedule</a></li>
                        <li><a href="/raceresults">Race Results</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
    )
}