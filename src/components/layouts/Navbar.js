import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <header>
            <div className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-responsive-collapse">
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="/">SQAB</a>
                    </div>
                    <div className="navbar-collapse collapse navbar-responsive-collapse">
                        <ul className="nav navbar-nav">
                        <li className="dropdown">
                            <a href="#" data-target="#" className="dropdown-toggle" data-toggle="dropdown">Conference<b className="caret"></b></a>
                            <ul className="dropdown-menu">
                                <li><Link to="/Conference">Annual Conference </Link></li>

                                <li><Link to="/Tutorials">Recorded Tutorials </Link></li>
                                <li><Link to="/Registration">Registration </Link></li>
                                <li><Link to="/Submission">Submissions </Link></li>
                                <li><Link to="/Programs">Programs &amp; Newsletters </Link></li>
                            </ul>
                        </li>

                        <li className="dropdown">
                            <a href="#" data-target="#" className="dropdown-toggle" data-toggle="dropdown">Resources<b className="caret"></b></a>
                            <ul className="dropdown-menu">
                                <li><Link to="/DemandCurveAnalyzer">Demand Curve Analyzer </Link></li>
                                <li><Link to="/DiscountingModelSelector">Discounting Model Selector </Link></li>
                                <li><Link to="/Resources">Resource Links </Link></li>
                            </ul>
                        </li>               
                        
                        <li><Link to="/BehavioralProcesses">Behavioral Processes </Link></li>
                        <li><Link to="/Board">Executive Board </Link></li>

                        <li><a href="#" data-toggle="modal" data-target="#privacyModal">Privacy </a></li>
                        <li><a href="#" data-toggle="modal" data-target="#listservModal">Listserv </a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}


/*
<nav className="nav-wrapper grey darken-3">
<div className="container">
    <Link to="/">SQAB</Link>
    { <NavbarLinks /> }
</div>
</nav>
*/

export default Navbar;