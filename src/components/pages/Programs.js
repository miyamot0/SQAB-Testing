import React, { Component } from 'react';
import programData from '../../json/programs.json';

const sortDescending = function (a, b) { return b.Year - a.Year; }

class Programs extends Component {
    render() {
        var programs = programData.Programs;
        programs.sort(sortDescending);

        const programLinks = programs.map((program) => {
            return (
                <a href={'/' + program.Path}
                    className="lead"
                    key={program.Year}
                    download>
                    {program.Year + ' SQAB Program'}
                    <br /><br /></a>
            )
        });

        var newsletters = programData.Newsletters;
        newsletters.sort(sortDescending);

        const newsletterLinks = newsletters.map((newsletter) => {
            return (
                <a href={'/' + newsletter.Path}
                    className="lead"
                    key={newsletter.Year}
                    download>
                    {newsletter.Year + ' SQAB Newsletter'}
                    <br /><br /></a>
            )
        });

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="jumbotron">
                            <h2 className="h2-responsive">Yearly Programs and Newsletters</h2>
                            <br />
                            <p className="lead">Newsletters and Conference programs are retained for future reference in this location. They are also hosted online in the respective Github repository.</p>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div id="programDiv" className="well">
                            <h2 className="h2-responsive">Previous Programs</h2>
                            <br />
                            {programLinks}
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div id="newsletterDiv" className="well">
                            <h2 className="h2-responsive">Previous Newsletters</h2>
                            <br />
                            {newsletterLinks}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Programs;