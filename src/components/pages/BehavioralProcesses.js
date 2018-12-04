import React, { Component } from 'react';
import issueData from '../../json/specialissues.json';

const sortDescending = function (a, b) { return b.Year - a.Year; }

class BehavioralProcesses extends Component {
    render() {
        var issues = issueData.Specials;
        issues.sort(sortDescending);

        const issueLinks = issues.map((issue) => {
            return (
                <a href={"http://www.sciencedirect.com/science/journal/03766357/" + issue.Volume +
                    "/" + issue.Issue + "/"}
                    className="lead"
                    key={issue.Year}
                    download>
                    {
                        "Proceedings of SQAB " + issue.Year + ": " + issue.Title +
                        ", Behavioural Processes, " + issue.Volume + "(" +
                        issue.Issue + "), " + issue.Pages
                    }
                    <br /><br /></a>
            )
        });

        return (
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="jumbotron">
                            <h2 class="h2-responsive">Special Issues from The Society for the Quantitative Analyses of Behavior</h2>
                            <br />
                            <p class="lead">Special Issues are available through Open Access complements of Elsevier for six months following​ conference proceedings</p>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12">
                        <div id="issuesDiv" class="well">
                            <h2 class="h2-responsive">Previous Special Issues</h2>
                            <br />
                            {issueLinks}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BehavioralProcesses;