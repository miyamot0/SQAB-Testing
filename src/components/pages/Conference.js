import React, { Component } from 'react';

class Conference extends Component {
    render() {
        return (
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="jumbotron">
                            <h2 class="h2-responsive">Annual Conference</h2>
                            <br/>
                            <p class="lead">The Society for the Quantitative Analyses of Behavior (SQAB) hosts a yearly conference coinciding with the Annual conference for the Association for Behavior Analysis International (ABAI). Topics span a range of human and non-human experiemental research and both paper and poster sessions are offered. </p>
                        </div>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-6 text-center">
                        <img class="center-block" src="img/SQABvector.svg" class="img"/>
                        <br/>
                    </div>
                
                    <div class="col-md-6">
                        <div class="well">
                            <h2 class="h2-responsive">2019 Annual Conference</h2>
                            <br/>
                            <p class="lead">SQAB 2019 will be held in the <a href="https://www.swissotel.com/hotels/chicago/">Swissotel Chicago</a> from May 23-24 2019. General sessions will be in Vevey Ballrooms 1-3 and Poster sessions will be held in Vevey Ballroom 4.</p>
                            <p class="lead">The 2019 Program has not yet been finalized. Please check back at a later time.</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Conference;