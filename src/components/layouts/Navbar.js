import React from 'react';
//import { Link } from 'react-router-dom';
//import NavbarLinks from './NavbarLinks';

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
                        <a className="navbar-brand" href="index.html">SQAB</a>
                    </div>
                    <div className="navbar-collapse collapse navbar-responsive-collapse">
                        <ul className="nav navbar-nav">
                        <li className="dropdown">
                            <a href="#" data-target="#" className="dropdown-toggle" data-toggle="dropdown">Conference<b className="caret"></b></a>
                            <ul className="dropdown-menu">
                            <li><a href="Conference.html">Annual Conference </a></li>
                            <li><a href="Tutorial.html">Recorded Tutorials</a></li>
                            <li><a href="Registration.html">Registration </a></li>
                            <li><a href="Submission.html">Submissions </a></li>
                            <li><a href="Programs.html">Programs &amp; Newsletters </a></li>
                            </ul>
                        </li>

                        <li className="dropdown">
                            <a href="#" data-target="#" className="dropdown-toggle" data-toggle="dropdown">Resources<b className="caret"></b></a>
                            <ul className="dropdown-menu">
                            <li><a href="DemandCurveAnalyzer.html">Demand Curve Analyzer </a></li>
                            <li><a href="DiscountingModelSelector.html">Discounting Model Selector </a></li>
                            <li><a href="Resources.html">Resource Links </a></li>
                            </ul>
                        </li>               
                        
                        <li><a href="BehavioralProcesses.html">Behavioral Processes</a></li>
                        <li><a href="Board.html">Executive Board</a></li>
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