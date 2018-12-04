import React, { Component } from 'react';
import resourcesData from '../../json/resources.json';

class Resources extends Component {
    render() {
        var obj = resourcesData.Labs;

        const labLinks = obj.map((resource) => {
            return (
                <p className="lead" key={resource.Name}>
                    {resource.Name + "; " + resource.University + " (" + resource.PI + ") "}
                    <a href={resource.Location}>[Link]</a><br />
                </p>
            )
        });

        obj = resourcesData.Tools;

        const toolLinks = obj.map((resource) => {
            return (
                <p className="lead" key={resource.Name}>
                    {resource.Name + " (" + resource.Type + ") "}
                    <a href={resource.Location}>[Link]</a><br />
                </p>
            )
        });

        obj = resourcesData.Books;

        const bookLinks = obj.map((resource) => {
            return (
                <p className="lead" key={resource.Name}>
                    {resource.Name + " "}
                    <a href={resource.Location}>[Link]</a><br />
                </p>
            )
        });

        obj = resourcesData.SpecialIssues;

        const specialIssuesLinks = obj.map((resource) => {
            return (
                <p className="lead" key={resource.Name}>
                    {resource.Name + " "}
                    <a href={resource.Location}>[Link]</a><br />
                </p>
            )
        });

        obj = resourcesData.Software;

        const softwareLinks = obj.map((resource) => {
            return (
                <p className="lead" key={resource.Name}>
                    {resource.Name + " "}
                    <a href={resource.Location}>[Install]</a>
                    <a href={resource.Source}> [Source]</a>
                    <br />
                </p>
            )
        });

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="jumbotron">
                            <h2 className="h2-responsive">SQAB Resources</h2><br />
                            <p className="lead">As an aide in disseminating experimental research, the SQAB board has curated information and materials from a range of Laboratories and research outlets.</p>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div id="labsDiv" className="well">
                            <h2 className="h2-responsive">Current Labs</h2><br />
                            {labLinks}
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div id="toolsDiv" className="well">
                            <h2 className="h2-responsive">Peer-reviewed Tools</h2><br />
                            {toolLinks}
                        </div>
                    </div>
                </div>

                <hr className="extra-margin" />
                <br />

                <div className="row">
                    <div className="col-md-6">
                        <div id="bookIssuesDiv" className="well">
                            <h2 className="h2-responsive">Books, Special Issues</h2><br />
                            {bookLinks}
                            {specialIssuesLinks}
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div id="softwareDiv" className="well">
                            <h2 className="h2-responsive">Computer Software</h2><br />
                            {softwareLinks}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Resources;