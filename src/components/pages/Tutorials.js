import React, { Component } from 'react';
import tutorialData from '../../json/tutorials.json';

function checkParamsPresent()
{
	return document.location.toString().indexOf('?') !== -1;
}

const isInDirectory = !checkParamsPresent();

class Tutorials extends Component {
    render() {
        var relevantTutorial = tutorialData.Tutorials;

        if (isInDirectory)
        {
            const tutorialLinks = relevantTutorial.map((tutorial) => {
                return (
                    <a href= { 'Tutorials/?index=' + tutorial.Index }
                       className = "lead"
                       key= { tutorial.Index }>
                       { tutorial.Title }
                       <br/><br/></a>
                )
            });

            return (
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="jumbotron">
                                <h2 id="titleRef" className="h1-responsive">SQAB Pre-eminent Tutorials</h2>
                                <br/>
                                <p id="descriptionRef" className="lead">SQAB is committed to simplifying the transition to quantitative behavior analysis for students as well as advanced researchers. These videos of presentations from leaders in the field are at various levels and are appropriate for individual, classroom, and seminar use. Individual video presentations can be accessed by clicking on the appropriate links below. All of the videos can be accessed on our <a href='https://www.youtube.com/c/SocietyfortheQuantitativeAnalysesofBehavior'>YouTube</a> channel.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="col-md-12">
                            <div id="tutorialDirectory" className="well">
                            {
                                tutorialLinks
                            }
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else
        {
            var paramString = document.location.toString().split("?")[1];
            var index = parseInt(paramString.split("=")[1]);

            const buttonPrev = (index == 0) ?
                <a id="buttonPrev" 
                   href="#" 
                   className="btn btn-info btn-raised invisible">Previous Video</a> :
                <a id="buttonPrev" 
                   href= { "?index=" + parseInt(index - 1) }
                   className="btn btn-info btn-raised">Previous Video</a>;

            const buttonNext = (index >= relevantTutorial.length - 1) ?
                <a id="buttonNext" 
                    href="#" 
                    className="btn btn-info btn-raised invisible">Next Video</a> :
                <a id="buttonNext" 
                    href= { "?index=" + parseInt(index + 1) }
                    className="btn btn-info btn-raised pull-right">Next Video</a>;

            return (
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="jumbotron">
                                <h2 id="titleRef" className="h1-responsive">{ relevantTutorial[index].Title }</h2>
                                <br/>
                                <p id="descriptionRef" className="lead">{ relevantTutorial[index].Summary }</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="col-md-12">                       
                            <div id="tutorialChartDiv" className="well">
                                <div id="tutorialIframeDiv" className="embed-responsive embed-responsive-16by9 text-center">
                                    <iframe src = { relevantTutorial[index].Video }/>
                                </div>
                        
                                <hr className="extra-margin"/>
                        
                                <div className="read-more">
                                    { buttonPrev }
                                    { buttonNext }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default Tutorials;