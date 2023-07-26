import logo from '../../img/F1-icon-square.png'

export default function Navbar() {
    return (
        <nav className="nav">
            {/*<a href="/" className="site-title"><img src={logo} className="img-responsive" alt="Home" /></a>
            <div className="nav-items">
                <div className="nav-standings">
                <button>Standings</button>
                    <ul>
                        <li><a href="/driverstandings">Drivers</a></li>
                        <li><a href="/constructorstandings">Constructors</a></li>
                    </ul>
                </div>    
                <div className="nav-races">
                    <button>Races</button>
                    <ul>
                        <li><a href="/raceschedule">Race Schedule</a></li>
                        <li><a>Race Results</a></li>
                    </ul>
                </div>
                    <button><a href="/drivers">Drivers</a></button>
                    <button><a href="/constructors">Constructors</a></button>
            </div>*/}
            <a href="/" className="site-title"><img src={logo} className="img-responsive" title="Home" alt='Home' /></a>
            <ul>
                <li><a href="/drivers">Drivers</a></li>
                <li><a href="/constructors">Constructors</a></li>
                <li>
                    <button href="/">Standings</button>
                    <ul className="nav-dropdown">
                        <li><a href="/driverstandings">Drivers</a></li>
                        <li><a href="/constructorstandings">Constructors</a></li>
                    </ul>
                </li>
                <li>
                    <button href="/">Races</button>
                    <ul className="nav-dropdown">
                        <li><a href="/raceschedule">Race Schedule</a></li>
                        <li><a href="/raceresults">Race Results</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
    )
}