import React, { Component } from 'react';
import boardData from '../../json/board.json';

class ExecutiveBoard extends Component {
    render() {
        var persons = boardData.Officers;

        const officerLinks = persons.map((officer) => {
            return (
                <a href={officer.Role === "Webmaster" ? "mailto:" + officer.Contact : null}
                    className="lead"
                    key={officer.Name}>
                    {officer.Name + " (" + officer.Role + ")"}
                    <br /><br /></a>
            )
        });

        persons = boardData.Students;

        const studentLinks = persons.map((officer) => {
            return (
                <a href={officer.Role === "Webmaster" ? "mailto:" + officer.Contact : null}
                    className="lead"
                    key={officer.Name}>
                    {officer.Name + " (" + officer.Role + ")"}
                    <br /><br /></a>
            )
        });

        persons = boardData.PastDirectors;

        const prevDirectorLinks = persons.map((officer) => {
            return (
                <a href={officer.Role === "Webmaster" ? "mailto:" + officer.Contact : null}
                    className="lead"
                    key={officer.Name}>
                    {officer.Name + " (" + officer.Role + ")"}
                    <br /><br /></a>
            )
        });

        persons = boardData.PastPresident;

        const prevPresidents = persons.map((officer) => {
            return (
                <a href={officer.Role === "Webmaster" ? "mailto:" + officer.Contact : null}
                    className="lead"
                    key={officer.Name}>
                    {officer.Name}
                    <br /><br /></a>
            )
        });

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="jumbotron">
                            <h2 className="h2-responsive">Leadership and Executive Board (2018-2019)</h2><br />
                            <p className="lead">The Society for the Quantitative Analyses of Behavior is led by a yearly-appointed board of executive directors. The contact information for all board members, as well as student appointees, is provided below.</p>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-12">
                        <h2 className="h2-responsive text-center">Current Leadership</h2>
                        <br />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div id="boardDiv" className="well">
                            <h2 className="h2-responsive">Current Board</h2><br />
                            {officerLinks}
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div id="studentDiv" className="well">
                            <h2 className="h2-responsive">Current Student Positions</h2><br />
                            {studentLinks}
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-12">
                        <h2 className="h2-responsive text-center">Past Leadership</h2><br />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div id="prevBoardDiv" className="well">
                            <h2 className="h2-responsive">Past Board</h2><br />
                            {prevDirectorLinks}
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div id="prevPresidentsDiv" className="well">
                            <h2 className="h2-responsive">Past Presidents</h2><br />
                            {prevPresidents}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ExecutiveBoard;