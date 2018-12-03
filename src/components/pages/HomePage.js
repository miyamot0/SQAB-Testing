import React, { Component } from 'react';
//import { Redirect } from 'react-router-dom';

class HomePage extends Component {
    render() {
        return (
            <div className="container"> 
             
                <div className="row text-center">
                    <img className="center-block" src="/img/SQABvector.svg" alt="mainImg"/><br/>
                </div>

                <br/>
                    <hr className="extra-margin"/>
                <br/>
            
                <div className="row">
                    <div className="col-lg-12">
                        <div className="well">
                            <h2 className="post-title">Society for the Quantitative Analyses of Behavior</h2><br/>
                            <p className="lead">The Society for the Quantitative Analyses of Behavior (SQAB) was founded in 1978 by M. L. Commons and J. A. Nevin to present and publish material which bring a quantitative analysis to bear on the understanding of behavior. A brief history is available. The International Society holds its annual meeting in conjunction with the Association for Behavior Analysis International  (ABAI). Talks at SQAB focus on the development and use of mathematical formulations to: characterize one or more dimensions of an obtained data set, derive predictions to be compared with data, and generate novel data analyses.</p>
                        </div>
                    </div>
                </div>
            
                <hr className="extra-margin"/><br/>
            
                <div className="row">
                    <div className="col-lg-7">
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
                                    <div className="item active"><img className="d-block w-100" src="/img/symp-1.jpeg" alt="Second slide"/></div>
                                    <div className="item"><img className="d-block w-100" src="/img/symp-2.jpeg" alt="Second slide"/></div>
                                    <div className="item"><img className="d-block w-100" src="/img/symp-3.jpeg" alt="Second slide"/></div>
                                    <div className="item"><img className="d-block w-100" src="/img/symp-4.jpeg" alt="Second slide"/></div>
                                    <div className="item"><img className="d-block w-100" src="/img/symp-5.jpeg" alt="Second slide"/></div>
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
            
                    <div className="col-lg-5">
                        <div className="well">
                            <h2 className="post-title">2019 Annual Conference</h2>
                            <p className="lead">The Society for the Quantitative Analyses of Behavior (SQAB) hosts a yearly conference coinciding with the Annual conference for the Association for Behavior Analysis International (ABAI). Topics span a range of human and non-human experiemental research and both paper and poster sessions are offered.
                            </p>
                            <p className="lead">SQAB 2019 will be held in the <a href="https://www.swissotel.com/hotels/chicago/">Swissotel Chicago</a>. Additional information will be listed in the Annual Conference page.</p>
                            <div className="read-more">
                                <a href="Conference.html" className="btn btn-info btn-block btn-raised">Learn More</a>
                            </div>                
                        </div>
                    </div>
                </div>
            
                <hr className="extra-margin"/><br/>
            
                <div className="row">
                    <div className="col-lg-7">
                        <div className="well">
                            <div id="myCarousel2" className="carousel slide" data-ride="carousel">
                                <ol className="carousel-indicators">
                                    <li data-target="#myCarousel2" data-slide-to="0" className="active"></li>
                                    <li data-target="#myCarousel2" data-slide-to="1"></li>
                                    <li data-target="#myCarousel2" data-slide-to="2"></li>
                                    <li data-target="#myCarousel2" data-slide-to="3"></li>
                                    <li data-target="#myCarousel2" data-slide-to="4"></li>
                                    <li data-target="#myCarousel2" data-slide-to="5"></li>
                                    <li data-target="#myCarousel2" data-slide-to="6"></li>
                                    <li data-target="#myCarousel2" data-slide-to="7"></li>
                                    <li data-target="#myCarousel2" data-slide-to="8"></li>
                                    <li data-target="#myCarousel2" data-slide-to="9"></li>
                                    <li data-target="#myCarousel2" data-slide-to="10"></li>
                                </ol>
            
                                <div className="carousel-inner">
                                    <div className="item active"><img className="d-block w-100" src="/img/tut-1.jpeg" alt="Second slide1"/></div>
                                    <div className="item"><img className="d-block w-100" src="/img/tut-2.jpeg" alt="Second slide2"/></div>
                                    <div className="item"><img className="d-block w-100" src="/img/tut-3.jpeg" alt="Second slide3"/></div>
                                    <div className="item"><img className="d-block w-100" src="/img/tut-4.jpeg" alt="Second slide4"/></div>
                                    <div className="item"><img className="d-block w-100" src="/img/tut-5.jpeg" alt="Second slide5"/></div>
                                    <div className="item"><img className="d-block w-100" src="/img/tut-6.jpeg" alt="Second slide6"/></div>
                                    <div className="item"><img className="d-block w-100" src="/img/tut-7.jpeg" alt="Second slide7"/></div>
                                    <div className="item"><img className="d-block w-100" src="/img/tut-8.jpeg" alt="Second slide8"/></div>
                                    <div className="item"><img className="d-block w-100" src="/img/tut-9.jpeg" alt="Second slide9"/></div>
                                    <div className="item"><img className="d-block w-100" src="/img/tut-10.jpeg" alt="Second slide10"/></div>
                                    <div className="item"><img className="d-block w-100" src="/img/tut-11.jpeg" alt="Second slide11"/></div>
                                </div>
            
                                <a className="left carousel-control" href="#myCarousel2" data-slide="prev">
                                    <span className="sr-only">Previous</span>
                                </a>
                                <a className="right carousel-control" href="#myCarousel2" data-slide="next">
                                    <span className="sr-only">Next</span>
                                </a>
                            </div>
                        </div>
                    </div>
            
                    <div className="col-lg-5">
                        <div className="well">
                            <h2 className="post-title">Invited Tutorials</h2>
                            <p className="lead">In addition to paper and poster sessions, SQAB arranges for experts in various areas of research to provide introductory tutorials. These are offered as a means for encouraging dissemination of novel methods and approaches.</p>
                            <div className="read-more">
                                <a href="Tutorial.html" className="btn btn-info btn-block btn-raised">Learn More</a>
                            </div>                
                        </div>
                    </div>
                </div>
            
                <hr className="extra-margin"/><br/>
            
                <div className="row">
                    <div className="col-lg-12">
                        <div className="well">
                            <h2 className="post-title">Ethics and Diversity Policy</h2><br/>
                            <p className="lead">The Society for the Quantitative Analyses of Behavior (SQAB) encourages diversity, inclusiveness, and freedom from discriminatory behavior in the field of behavioral science broadly, and within the organization specifically. Diversity refers to differences in race, ethnicity, sexual orientation, gender identity, age, country of origin, religious or spiritual beliefs, ability, and social and economic class. The ethics and diversity policy was approved by the SQAB Executive Board in 2018 and was based on those developed by ABAI with the approval of ABAI.</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomePage;