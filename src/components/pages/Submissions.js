import React, { Component } from 'react';
import fire from '../../fire';

class Submissions extends Component {
    constructor ( props ) {
        super( props );
        this.state = {
            submittingAuthor: "",
            posterTitle: "",
            authorEmail: "",
            abstractText: "",
            authorList: ""
        };

        this.handleInputChange = this.handleInputChange.bind( this );
        this.uploadPoster = this.uploadPoster.bind( this );
    }

    validateEmail() {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test( String( this.state.authorEmail ).toLowerCase() );
    }

    uploadPoster( e ) {
        e.preventDefault();

        if ( ( this.state.submittingAuthor.split( /\w\w+/ ).length - 1 ) < 2 ) {
            alert( 'Please enter a full name!' );
            return;
        }
        else if ( ( this.state.posterTitle.split( /\w\w+/ ).length - 1 ) < 2 ) {
            alert( 'Please enter a full title!' );
            return;
        }
        else if ( !this.validateEmail() ) {
            alert( 'Check email address in form!' );
            return;
        }
        else if ( ( this.state.abstractText.split( /\w\w+/ ).length - 1 ) > 300 ) {
            alert( 'Abstract is over 300 words!' );
            return;
        }

        var currentdate = new Date();
        var datetime = ""
            + ( currentdate.getMonth() + 1 ) + "/"
            + currentdate.getDate() + "/"
            + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();

        const data = {
            name: this.state.submittingAuthor,
            title: this.state.posterTitle,
            email: this.state.authorEmail,
            abstract: this.state.abstractText,
            list: this.state.authorList,
            time: datetime
        };

        fire.database().ref( 'SQAB2019' ).push( data );
    }

    handleInputChange( event ) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState( {
            [ name ]: value
        } );
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="jumbotron">
                            <h2 className="h2-responsive">Submissions for Annual Conference</h2>
                            <br />
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
                                    <div className="item active"><img className="d-block w-100" src="img/symp-1.jpeg" alt="" /></div>
                                    <div className="item"><img className="d-block w-100" src="img/symp-2.jpeg" alt="Second slide" /></div>
                                    <div className="item"><img className="d-block w-100" src="img/symp-3.jpeg" alt="Second slide" /></div>
                                    <div className="item"><img className="d-block w-100" src="img/symp-4.jpeg" alt="Second slide" /></div>
                                    <div className="item"><img className="d-block w-100" src="img/symp-5.jpeg" alt="Second slide" /></div>
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
                            <form onSubmit={ this.uploadPoster }>
                                <div className="form-group">
                                    <label htmlFor="submittingAuthor" className="bmd-label-floating">Submitting Author:</label>
                                    <input name="submittingAuthor" type="text"
                                        className="form-control"
                                        placeholder="Firstname Lastname"
                                        value={ this.state.submittingAuthor }
                                        onChange={ this.handleInputChange } />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="posterTitle" className="bmd-label-floating">Poster Title:</label>
                                    <input name="posterTitle" type="text"
                                        className="form-control"
                                        placeholder="Experimental comparison of..."
                                        value={ this.state.posterTitle }
                                        onChange={ this.handleInputChange } />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="authorEmail" className="bmd-label-floating">Corresponding Email:</label>
                                    <input name="authorEmail" type="text"
                                        placeholder="presenter@company.com"
                                        className="form-control"
                                        value={ this.state.authorEmail }
                                        onChange={ this.handleInputChange } />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="abstractText" className="bmd-label-floating">Abstract (Maximum 300 words):</label>
                                    <textarea name="abstractText"
                                        placeholder="In this study..."
                                        className="form-control"
                                        value={ this.state.abstractText }
                                        onChange={ this.handleInputChange }
                                        rows="10" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="authorList" className="bmd-label-floating">Full Author List, with Affiliation (One per line, please):</label>
                                    <textarea name="authorList"
                                        placeholder="Firstname Lastname (XYZ University)"
                                        className="form-control"
                                        value={ this.state.authorList }
                                        onChange={ this.handleInputChange }
                                        rows="5" />
                                </div>

                                <input type="submit" value="Submit" className="btn btn-primary btn-block btn-raised" />

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Submissions;