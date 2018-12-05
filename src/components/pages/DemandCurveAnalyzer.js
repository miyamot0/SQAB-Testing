import React, { Component } from 'react';
import 'handsontable/dist/handsontable.full.css';
import { HotTable } from '@handsontable/react';
import { Line } from 'react-chartjs-2';

const fullHeightStyle = {
    height: "100%"
};

const chartWrapper = {
    width: "content-box",
    height: "400px",
}

function defaultChartData() {
    return {
        labels: [],
        datasets: [],
        responsive: true,
        maintainAspectRatio: false,
    }
}

function getExponentialProjection( x, obj ) {
    var k = ( obj.FitK ) ? obj.Params[ 2 ] : obj.SetK;

    return Math.pow( 10, ( Math.log10( obj.Params[ 0 ] ) + k * ( Math.exp( -obj.Params[ 1 ] * obj.Params[ 0 ] * x ) - 1 ) ) );
}

function getExponentiatedProjection( x, obj ) {
    var k = ( obj.FitK ) ? obj.Params[ 2 ] : obj.SetK;

    return obj.Params[ 0 ] * Math.pow( 10, ( k * ( Math.exp( -obj.Params[ 1 ] * obj.Params[ 0 ] * x ) - 1 ) ) );
}

class DemandCurveAnalyzer extends Component {
    constructor ( props ) {
        super( props );

        this.hotReference = React.createRef();

        this.state = {
            settings: {
                data: [ [ "", "" ], [ "", "" ], [ "", "" ],
                [ "", "" ], [ "", "" ], [ "", "" ],
                [ "", "" ], [ "", "" ], [ "", "" ] ],
                colHeaders: [ 'Price/Unit Price', 'Consumption' ],
                rowHeaders: false,
                stretchH: "all",
                columnSorting: false,
                columns: [
                    { data: 0, type: 'text' },
                    { data: 1, type: 'text' }
                ],
                contextMenu: true,
            },
            options: {
                layout: {
                    padding: {
                        top: 5
                    }
                },
                scaleFontColor: 'black',
                legend: {
                    position: 'bottom',
                },
                title: {
                    display: true,
                    text: 'Demand Curve Modeling',
                    fontColor: "black"
                },
                scales: {
                    xAxes: [ {
                        titleFontColor: "black",
                        scaleLabel: {
                            display: true,
                            labelString: 'Unit Price'
                        },
                        type: 'logarithmic',
                        position: 'bottom',
                        scaleLineColor: "black",
                        gridLines: {
                            display: false
                        },
                        ticks: {
                            maxRotation: 90,
                            minRotation: 90,
                            callback: function ( value, index, values ) {
                                var mValue = value.toString();

                                var isValid = /^[01]*$/.test( mValue );
                                var isValid2 = ( value === 0.1 || value === 0.01 || value === 0.001 );

                                if ( isValid || isValid2 ) {
                                    return Number( mValue );
                                }
                                else {
                                    return null;
                                }
                            }
                        }
                    } ],
                    yAxes: [ {
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Consumption',
                        },
                        type: 'logarithmic',
                        ticks: {
                            min: 0.1,
                            fontColor: "black",
                            callback: function ( value, index, values ) {
                                var mValue = value.toString();
                                var isValid = /^[01]*$/.test( mValue );
                                var isValid2 = ( value === 0.1 || value === 0.01 || value === 0.001 );

                                if ( isValid || isValid2 ) {
                                    return Number( mValue );
                                }
                                else {
                                    return null;
                                }
                            }
                        },
                        scaleLineColor: "black",
                        gridLines: {
                            display: false
                        }
                    } ]
                },
                showTooltips: false,
                elements: {
                    point: {
                        radius: 0
                    },
                    line: {
                        borderWidth: 0
                    }
                },
                maintainAspectRatio: false
            },
            data: defaultChartData(),
            worker: new Worker( '/js/worker_demand.js' ),
            isBusy: false,
            canSubmit: true,
            submitText: "Fit Models",
            selectModel: "Exponential Model",
            selectX: "Drop",
            customX: "0.01",
            showX: false,
            selectY: "Drop",
            customY: "0.01",
            showY: false,
            selectK: "Log range",
            customK: "1.5",
            showK: false,
        }

        this.state.worker.addEventListener( "message", obj => {
            this.handleWorkerOutput( obj );
        } );

    }

    setDefaultValues( event ) {
        this.setState( {
            settings: {
                data: [
                    [ "0.0", "1000" ],
                    [ "0.5", "1000" ],
                    [ "1.0", "1000" ],
                    [ "1.5", "800" ],
                    [ "2.0", "800" ],
                    [ "2.5", "700" ],
                    [ "3.0", "600" ],
                    [ "4.0", "500" ],
                    [ "5.0", "400" ],
                    [ "10.0", "200" ],
                    [ "15.0", "100" ]
                ]
            }
        } );
    }

    constructExponentialChart() {
        this.setState( {
            options: {
                layout: {
                    padding: {
                        top: 5
                    }
                },
                scaleFontColor: 'black',
                legend: {
                    position: 'bottom',
                },
                title: {
                    display: true,
                    text: 'Demand Curve Modeling',
                    fontColor: "black"
                },
                scales: {
                    xAxes: [ {
                        titleFontColor: "black",
                        scaleLabel: {
                            display: true,
                            labelString: 'Unit Price'
                        },
                        type: 'logarithmic',
                        position: 'bottom',
                        scaleLineColor: "black",
                        gridLines: {
                            display: false
                        },
                        ticks: {
                            maxRotation: 90,
                            minRotation: 90,
                            callback: function ( value, index, values ) {
                                var mValue = value.toString();

                                var isValid = /^[01]*$/.test( mValue );

                                var isValid2 = ( value === 0.1 || value === 0.01 || value === 0.001 );

                                if ( isValid || isValid2 ) {
                                    return Number( mValue );
                                }
                                else {
                                    return null;
                                }
                            }
                        }
                    } ],
                    yAxes: [ {
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Consumption',
                        },
                        type: 'logarithmic',
                        ticks: {
                            min: 0.1,
                            fontColor: "black",
                            callback: function ( value, index, values ) {
                                var mValue = value.toString();

                                var isValid = /^[01]*$/.test( mValue );

                                var isValid2 = ( value === 0.1 || value === 0.01 || value === 0.001 );

                                if ( isValid || isValid2 ) {
                                    return Number( mValue );
                                }
                                else {
                                    return null;
                                }
                            }
                        },
                        scaleLineColor: "black",
                        gridLines: {
                            display: false
                        }
                    } ]
                },
                showTooltips: false,
                elements: {
                    point: {
                        radius: 0
                    },
                    line: {
                        borderWidth: 0
                    }
                },
                maintainAspectRatio: false
            }
        } )
    }

    constructExponentiatedChart() {
        this.setState( {
            options: {
                layout: {
                    padding: {
                        top: 5
                    }
                },
                scaleFontColor: 'black',
                legend: {
                    position: 'bottom',
                },
                title: {
                    display: true,
                    text: 'Demand Curve Modeling',
                    fontColor: "black"
                },
                scales: {
                    xAxes: [ {
                        titleFontColor: "black",
                        scaleLabel: {
                            display: true,
                            labelString: 'Unit Price'
                        },
                        type: 'logarithmic',
                        position: 'bottom',
                        scaleLineColor: "black",
                        gridLines: {
                            display: false
                        },
                        ticks: {
                            beginAtZero: true,
                            maxRotation: 90,
                            minRotation: 90,
                            callback: function ( value, index, values ) {
                                var mValue = value.toString();

                                var isValid = /^[01]*$/.test( mValue );

                                var isValid2 = ( value === 0.1 || value === 0.01 || value === 0.001 );

                                if ( isValid || isValid2 ) {
                                    return Number( mValue );
                                }
                                else {
                                    return null;
                                }
                            }
                        }
                    } ],
                    yAxes: [ {
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Consumption',
                        },
                        type: 'linear',
                        ticks: {
                            beginAtZero: true,
                            fontColor: "black"
                        },
                        scaleLineColor: "black",
                        gridLines: {
                            display: false
                        }
                    } ]
                },
                showTooltips: false,
                elements: {
                    point: {
                        radius: 0
                    },
                    line: {
                        borderWidth: 0
                    }
                },
                maintainAspectRatio: false
            }
        } )
    }

    clearChart() {
        this.setState( {
            data: {
                datasets: [
                    {
                        label: 'Demand Curve',
                        data: [],
                        fill: false,
                        lineTension: 0,
                        backgroundColor: "rgba(249,46,14,1)",
                        borderColor: "rgba(249,46,14,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderWidth: 1,
                        borderJoinStyle: 'miter',
                        pointBorderWidth: 0,
                        pointHoverRadius: 0,
                        pointHoverBackgroundColor: "rgba(0,0,0,0)",
                        pointHoverBorderColor: "rgba(0,0,0,0)",
                        pointHoverBorderWidth: 0,
                    },
                    {
                        label: 'Work Output Curve',
                        data: [],
                        fill: false,
                        lineTension: 0,
                        backgroundColor: "rgba(25,221,137,1)",
                        borderColor: "rgba(25,221,137,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderWidth: 1,
                        borderJoinStyle: 'miter',
                        pointBorderWidth: 0,
                        pointHoverRadius: 0,
                        pointHoverBackgroundColor: "rgba(0,0,0,0)",
                        pointHoverBorderColor: "rgba(0,0,0,0)",
                        pointHoverBorderWidth: 0,
                    },
                    {
                        label: 'Raw Data',
                        data: [],
                        fill: false,
                        lineTension: 0,
                        backgroundColor: "rgba(0,0,0,1)",
                        borderColor: "rgba(0,0,0,0)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderWidth: 1,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(0,0,0,1)",
                        pointBackgroundColor: "#000",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(0,0,0,1)",
                        pointHoverBorderColor: "rgba(0,0,0,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 5,
                        pointHitRadius: 10,
                        spanGaps: false
                    }
                ]
            }
        } )
    }

    isNumeric( value ) {
        return typeof ( value ) === 'number';
    }

    handleWorkerOutput( obj ) {
        if ( obj.data.done ) {
            const resultsTitle = document.getElementById( 'resultsTitle' );
            const resultsBody = document.getElementById( 'resultsBody' );

            var mPrices = obj.data.x.slice();
            var mConsumption = obj.data.y.slice();

            var mPointsObject = {};
            mPointsObject.label = "Raw Data";
            mPointsObject.data = [];

            var lowestPrice = Math.min( ...mPrices )
            var mFinalPrice = Math.max( ...mPrices )

            var mPrice;

            // Deep copy
            const dataSetCopy = this.state.data.datasets.slice( 0 );

            const demandCopy = dataSetCopy[ 0 ].data.slice( 0 );
            const outputCopy = dataSetCopy[ 1 ].data.slice( 0 );
            const rawCopy = dataSetCopy[ 2 ].data.slice( 0 );

            for ( var j = 0; j < mPrices.length; j++ ) {
                mPrice = parseFloat( mPrices[ j ] );
                mPrice = ( mPrice <= 0 ) ? 0.01 : mPrice;

                rawCopy.push( {
                    x: mPrice,
                    y: parseFloat( mConsumption[ j ] )
                } );
            }

            lowestPrice = ( lowestPrice === 0 ) ? 0.01 : lowestPrice;

            var mDelta = 3;

            for ( var i = lowestPrice; i <= mFinalPrice; ) {
                if ( obj.data.Exponential ) {
                    demandCopy.push(
                        {
                            x: i,
                            y: getExponentialProjection( i, obj.data.results )
                        } );

                    outputCopy.push(
                        {
                            x: i,
                            y: getExponentialProjection( i, obj.data.results ) * i
                        } );

                    getExponentialProjection( i, obj.data.results );
                }
                else {
                    demandCopy.push(
                        {
                            x: i,
                            y: getExponentiatedProjection( i, obj.data.results )
                        } );

                    outputCopy.push(
                        {
                            x: i,
                            y: getExponentiatedProjection( i, obj.data.results ) * i
                        } );
                }

                if ( i >= 0 && i <= 0.1 ) {
                    i = i + 0.01 / mDelta;
                }
                else if ( i > 0.1 && i <= 1 ) {
                    i = i + 0.1 / mDelta;
                }
                else if ( i > 1 && i <= 10 ) {
                    i = i + 1 / mDelta;
                }
                else if ( i > 10 && i <= 100 ) {
                    i = i + 10 / mDelta;
                }
                else if ( i > 100 && i <= 1000 ) {
                    i = i + 100 / mDelta;
                }
                else if ( i > 1000 && i <= 10000 ) {
                    i = i + 1000 / mDelta;
                }
                else if ( i > 10000 && i <= 100000 ) {
                    i = i + 10000 / mDelta;
                }
                else if ( i > 100000 && i <= 1000000 ) {
                    i = i + 100000 / mDelta;
                }
                else if ( i > 1000000 && i <= 10000000 ) {
                    i = i + 1000000 / mDelta;
                }
            }

            dataSetCopy[ 0 ].data = demandCopy;
            dataSetCopy[ 1 ].data = outputCopy;
            dataSetCopy[ 2 ].data = rawCopy;

            var k = ( obj.data.results.FitK ) ? obj.data.results.Params[ 2 ] : obj.data.SetK;
            var approxPmax = obj.data.results.HurshPmax;
            var approxOmax;

            if ( obj.data.Exponential ) {
                approxOmax = getExponentialProjection( approxPmax, obj.data.results ) * approxPmax;

                resultsTitle.innerHTML = "Exponential Model of Demand";
            }
            else if ( obj.data.Exponentiated ) {
                approxOmax = getExponentiatedProjection( approxPmax, obj.data.results ) * approxPmax;

                resultsTitle.innerHTML = "Exponentiated Model of Demand";
            }

            var innerHtml = "";

            innerHtml += "<strong>Results of Fitting:</strong><br>";
            innerHtml += "<strong>Alpha: </strong> " + obj.data.results.Params[ 1 ] + "<br>";
            innerHtml += "<strong>Q0: </strong> " + obj.data.results.Params[ 0 ] + "<br>";
            innerHtml += "<strong>K: </strong> " + k + "<br>";
            innerHtml += "<strong>K Fitted: </strong> " + obj.data.results.FitK + "<br>";
            innerHtml += "<strong>Omaxd: </strong> " + approxOmax + "<br>";
            innerHtml += "<strong>Pmaxd: </strong> " + approxPmax + "<br>";
            innerHtml += "<strong>RMS Error: </strong> " + obj.data.results.RMSE + "<br>";
            innerHtml += "<strong>Avg error: </strong> " + obj.data.results.MSE + "<br>";

            resultsBody.innerHTML = innerHtml;

            this.setState( {
                data: Object.assign( {}, this.state.data, {
                    datasets: dataSetCopy
                } ),
                canSubmit: true,
                isBusy: false,
                submitText: "Fit Models"
            } );
        }
    }

    startCalculation( event ) {
        if ( this.state.isBusy ) return;
        if ( !window.Worker ) {
            alert( "Please use a modern web-broswer with Web-Worker support" );

            return;
        }

        var mX = [];
        var mY = [];

        for ( var i = 0; i < this.state.settings.data.length; i++ ) {
            var temp = this.state.settings.data[ i ];

            if ( this.isNumeric( parseFloat( temp[ 0 ] ) ) && this.isNumeric( parseFloat( temp[ 1 ] ) ) ) {
                if ( parseFloat( temp[ 0 ] ) < 0 ) {
                    alert( 'Please enter positive prices.' );

                    return;
                }

                mX.push( temp[ 0 ] );
                mY.push( temp[ 1 ] );
            }
        }

        var isExponential = this.state.selectModel === "Exponential Model";
        var kLogRange = this.state.selectK === "Log range";
        var kFit = this.state.selectK === "Fit as parameter";
        var kValue = this.state.selectK === "Set Custom";

        this.clearChart();

        document.getElementById( 'resultsTitle' ).innerHTML = "";
        document.getElementById( 'resultsBody' ).innerHTML = "";

        var kText = this.state.customK;

        if ( isExponential )
            this.constructExponentialChart();
        else
            this.constructExponentiatedChart();

        this.setState( {
            canSubmit: false,
            submitText: "Please Wait..."
        }, () => {
            this.state.worker.postMessage(
                {
                    maxIterations: 1000,
                    x: mX,
                    y: mY,
                    Exponential: isExponential,
                    Exponentiated: !isExponential,
                    KFit: kFit,
                    KLogRange: kLogRange,
                    KValue: kValue,
                    SetK: kText
                } );
        } );
    }

    onChangeFunc( selectName, selectedOption ) {
        this.setState( {
            [ selectName ]: selectedOption
        }, () => {
            if ( selectName === "selectX" ) {
                this.setState( {
                    showX: this.state[ selectName ] === "Modify Custom"
                } );
            }
            else if ( selectName === "selectY" ) {
                this.setState( {
                    showY: this.state[ selectName ] === "Modify Custom"
                } );
            }
            else if ( selectName === "selectK" ) {
                this.setState( {
                    showK: this.state[ selectName ] === "Set Custom"
                } );
            }
        } );

    }

    render() {
        var customXClassName = this.state.showX ? "form-group row" : "form-group row hidden";
        var customYClassName = this.state.showY ? "form-group row" : "form-group row hidden";
        var customKClassName = this.state.showK ? "form-group row" : "form-group row hidden";

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="jumbotron">
                            <h2 className="h2-responsive">Demand Curve Analyzer</h2><br />
                            <p className="lead">The Demand Curve Analyzer is designed to assist clinicians and researchers in conducting behavior economic analyses while also providing more accessible options for these calculations. Demand Curve Analyzer fits respective parameters using differential evolution, a robust metaheuristic process for optimizing model performance. At present, only a single series may be fitted at a time. All methods are performed "behind the scenes", faciliating model fitting while retaining a simple, spreadsheet-based interface. This project is fully open-sourced under a GPL-license (v3) and all source code is completely available.</p>
                            <p className="lead"><strong>Published:</strong><br />Gilroy, S. P., Kaplan, B. A., Reed, D. D., Koffarnus, M. N. &amp; Hantula, D. A. (2018). The Demand Curve Analyzer: Behavioral economic software for applied researchers. <i>Journal of the Experimental Analysis of Behavior</i>.</p>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <h3 className="panel-title">Demand Curve Analyzer</h3>
                            </div>

                            <div className="panel-body">
                                <p className="lead">This web-app automates the fitting of the Exponential and Exponentiated models of operant demand (with the Exponential model as the default).</p>
                                <p className="lead">Demand curve analysis is performed by providing least 3 pairs (x and y) of Pricing and Consumption data in the control below. At least three pairs of data are necessary to perform any type of modeling (at the extreme minimum).</p>
                                <p className="lead">Prices (x) and Consumption (y) values can be any positive real number (i.e., greater or equal to 0).</p>

                                <br />

                                <div className="read-more">
                                    <button id="loadSampleBtn" className="btn btn-primary btn-block btn-raised" onClick={ ( e ) => this.setDefaultValues( e ) }>Load Sample Data</button>
                                </div>

                                <br />

                                <HotTable root="hot" settings={ this.state.settings } />

                                <div className="form-group">
                                    <label htmlFor="selectModel" className="lead">Select Model:</label>
                                    <select className="form-control"
                                        id="selectModel"
                                        name="selectModel"
                                        onChange={ e => this.onChangeFunc( e.target.name, e.target.value ) }
                                        style={ fullHeightStyle }>
                                        <option defaultValue>Exponential Model</option>
                                        <option>Exponentiated Model</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="selectX" className="lead">Manage Prices at Zero:</label>
                                    <select className="form-control"
                                        id="selectX"
                                        name="selectX"
                                        onChange={ e => this.onChangeFunc( e.target.name, e.target.value ) }
                                        style={ fullHeightStyle }>
                                        <option>Drop</option>
                                        <option defaultValue>Keep</option>
                                        <option>Modify Custom</option>
                                    </select>
                                </div>

                                <div id="customXvalue" className={ customXClassName }>
                                    <label htmlFor="customX" className="col-2 col-form-label">Replace Zero Price with:</label>
                                    <div className="col-10">
                                        <input className="form-control"
                                            type="text"
                                            defaultValue="0.01"
                                            id="customX"
                                            name="customX"
                                            onChange={ e => this.onChangeFunc( e.target.name, e.target.value ) } />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="selectY" className="lead">Manage Consumption values at Zero:</label>
                                    <select className="form-control"
                                        id="selectY"
                                        name="selectY"
                                        onChange={ e => this.onChangeFunc( e.target.name, e.target.value ) }
                                        style={ fullHeightStyle }>
                                        <option defaultValue>Drop</option>
                                        <option>Keep</option>
                                        <option>Modify to 0.1</option>
                                        <option>Modify to 0.01</option>
                                        <option>Modify Custom</option>
                                    </select>
                                </div>

                                <div id="customYvalue" className={ customYClassName }>
                                    <label htmlFor="customY" className="col-2 col-form-label">Replace Zero Consumption with:</label>
                                    <div className="col-10">
                                        <input className="form-control"
                                            type="text"
                                            defaultValue="0.01"
                                            id="customY"
                                            name="customY"
                                            onChange={ e => this.onChangeFunc( e.target.name, e.target.value ) } />
                                    </div>
                                </div>

                                <div id="kSelectDiv" className="form-group">
                                    <label htmlFor="selectK" className="lead">Scaling parameter (K) Value?:</label>
                                    <select className="form-control"
                                        id="selectK"
                                        name="selectK"
                                        onChange={ e => this.onChangeFunc( e.target.name, e.target.value ) }
                                        style={ fullHeightStyle }>
                                        <option defaultValue>Log range</option>
                                        <option>Fit as parameter</option>
                                        <option>Set Custom</option>
                                    </select>
                                </div>

                                <div id="customKvalue" className={ customKClassName }>
                                    <label htmlFor="customK" className="col-2 col-form-label">Set Scaling Parameter:</label>
                                    <div className="col-10">
                                        <input className="form-control"
                                            type="text"
                                            defaultValue="1.0"
                                            id="customK"
                                            name="customK"
                                            onChange={ e => this.onChangeFunc( e.target.name, e.target.value ) } />
                                    </div>
                                </div>

                                <br />

                                <button id="scoreBtn"
                                    className="btn btn-primary btn-block btn-raised"
                                    disabled={ !this.state.canSubmit }
                                    onClick={ ( e ) => this.startCalculation( e ) }> { this.state.submitText } </button>

                                <br />

                                <p className="lead">The <a href="https://github.com/miyamot0/miyamot0.github.io">Demand Curve Analyzer (Web)</a> uses the following tools to function:</p>

                                <p className="lead">Differential Evolution - <a href="https://github.com/milsto/differential-evolution">Github</a></p>

                                <p className="lead">
                                    Random.js (<a href="https://raw.githubusercontent.com/ckknight/random-js/master/LICENSE">MIT Licensed</a>) -
                            <a href="https://github.com/ckknight/random-js">Github</a></p>

                                <p className="lead"><a href="http://www.mathjs.org/">Math.js</a> (<a href="https://raw.githubusercontent.com/josdejong/mathjs/master/LICENSE">Apache 2.0 Licensed</a>) -
                            <a href="https://github.com/josdejong/mathjs">Github</a></p>

                                <p className="lead"><a href="https://www.jquery.com/">Jquery</a> (<a href="https://raw.githubusercontent.com/jquery/jquery/master/LICENSE.txt">MIT Licensed</a>) -
                            <a href="https://github.com/jquery/jquery">Github</a>
                                </p>

                                <p className="lead"><a href="https://www.Handsontable.com/">Handsontable</a> (<a href="https://raw.githubusercontent.com/handsontable/handsontable/master/LICENSE">MIT Licensed</a>)
                            <a href="https://github.com/handsontable/handsontable">Github</a></p>

                                <p className="lead"><a href="https://www.chartjs.org/">Chart.js</a> (<a href="https://raw.githubusercontent.com/chartjs/Chart.js/master/LICENSE.md">MIT Licensed</a>) - <a href="https://github.com/chartjs/Chart.js">Github</a></p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="well">
                            <div style={ chartWrapper }>
                                <Line data={ this.state.data }
                                    options={ this.state.options } />
                            </div>
                            <h3 id="resultsTitle"> </h3>
                            <h3 id="resultsBody" className="lead"> </h3>
                        </div>
                    </div>
                </div>

                <script src="/js/Chart.min.js" type="text/javascript"></script>

                <link href="/css/handsontable.full.min.css" rel="stylesheet" />
                <script src="/js/handsontable.full.min.js" type="text/javascript"></script>

                <script src="/js/ui_demand.js" type="text/javascript"></script>
            </div>
        );
    }
}

export default DemandCurveAnalyzer;