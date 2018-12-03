import React, { Component } from 'react';

class Submissions extends Component {
    render() {
        return (
            <div className="container">            
                <div className="row">
                    <div className="col-md-12">
                        <div className="jumbotron">
                            <h2 className="h2-responsive">Submissions for Annual Conference</h2>
                            <br/>
                            <p className="lead">Submissions for the annual conference (e.g., posters, papers) can be submitted through an online portal. Information specific to submitting each type of work is provided below.</p>
                        </div>
                    </div>
                </div>
            
                <div className="row">
                    <div className="col-md-6">
                        <div className="well">
                            <div id="myCarousel" className="carousel slide" data-ride="carousel">
                                <ol className="carousel-indicators">
                                    <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                                    <li data-target="#myCarousel" data-slide-to="1"></li>
                                    <li data-target="#myCarousel" data-slide-to="2"></li>
                                    <li data-target="#myCarousel" data-slide-to="3"></li>
                                    <li data-target="#myCarousel" data-slide-to="4"></li>
                                </ol>
            
                                <div className="carousel-inner">
                                    <div className="item active"><img className="d-block w-100" src="img/symp-1.jpeg" alt=""/></div>
                                    <div className="item"><img className="d-block w-100" src="img/symp-2.jpeg" alt="Second slide"/></div>
                                    <div className="item"><img className="d-block w-100" src="img/symp-3.jpeg" alt="Second slide"/></div>
                                    <div className="item"><img className="d-block w-100" src="img/symp-4.jpeg" alt="Second slide"/></div>
                                    <div className="item"><img className="d-block w-100" src="img/symp-5.jpeg" alt="Second slide"/></div>
                                </div>
            
                                <a className="left carousel-control" href="#myCarousel" data-slide="prev">
                                    <span className="sr-only">Previous</span>
                                </a>
                                <a className="right carousel-control" href="#myCarousel" data-slide="next">
                                    <span className="sr-only">Next</span>
                                </a>
                            </div>
                        </div>
                    </div>
                
                    <div className="col-md-6">
                        <div className="well">
                            <h2 className="h2-responsive">Submission for SQAB 2019</h2>
                            <br/>
                            <p className="lead">The portal for SQAB submissions is currently closed. Please revisit this page at a later time.</p>
                        </div>
                    </div>
                </div>
            </div>      
        );
    }
}

export default Submissions;