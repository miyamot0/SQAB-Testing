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
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="jumbotron">
                            <h2 class="h2-responsive">Leadership and Executive Board (2018-2019)</h2><br />
                            <p class="lead">The Society for the Quantitative Analyses of Behavior is led by a yearly-appointed board of executive directors. The contact information for all board members, as well as student appointees, is provided below.</p>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-12">
                        <h2 class="h2-responsive text-center">Current Leadership</h2>
                        <br />
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6">
                        <div id="boardDiv" class="well">
                            <h2 class="h2-responsive">Current Board</h2><br />
                            {officerLinks}
                        </div>
                    </div>

                    <div class="col-md-6">
                        <div id="studentDiv" class="well">
                            <h2 class="h2-responsive">Current Student Positions</h2><br />
                            {studentLinks}
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-12">
                        <h2 class="h2-responsive text-center">Past Leadership</h2><br />
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6">
                        <div id="prevBoardDiv" class="well">
                            <h2 class="h2-responsive">Past Board</h2><br />
                            {prevDirectorLinks}
                        </div>
                    </div>

                    <div class="col-md-6">
                        <div id="prevPresidentsDiv" class="well">
                            <h2 class="h2-responsive">Past Presidents</h2><br />
                            {prevPresidents}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ExecutiveBoard;