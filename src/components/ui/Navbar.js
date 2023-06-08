import logo from '../../img/F1-icon-square.png'

export default function Navbar() {
    return <nav className="nav">
    
        <a href="/" className="site-title"><img src={logo} className="img-responsive" alt="" /></a>
        <ul>
            <li>
                <a href="/drivers">Drivers</a>
            </li>
            <li>
                 <a href="/constructors">Constructors</a>
            </li>
            <li>
                <a href="/driverstandings">Driver Standings</a>
            </li>
            <li>
                <a href="/constructorstandings">Constructor Standings</a>
            </li>
            <li>
                <a href="/raceschedule">Race Schedule</a>
            </li>
        </ul>
    </nav>
}