import React, { Component } from 'react';
import 'handsontable/dist/handsontable.full.css';
import { HotTable } from '@handsontable/react';
import { Line } from 'react-chartjs-2';

const fullHeightStyle = {
    height: "100%"
};

const hiddenStyle = {
    display: "none"
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

function getExponentialProjection( x, k ) { return Math.exp( -k[ 0 ] * x ); }

function getHyperbolicProjection( x, k ) { return Math.pow( ( 1 + k[ 0 ] * x ), -1 ); }

function getQuasiHyperbolicProjection( x, k ) { return k[ 0 ] * Math.pow( k[ 1 ], x ); }

function getMyersonProjection( x, k ) { return Math.pow( ( 1 + k[ 0 ] * x ), -k[ 1 ] ); }

function getRachlinProjection( x, k ) { return Math.pow( ( 1 + k[ 0 ] * Math.pow( x, k[ 1 ] ) ), -1 ); }

function getRodriguezLogueProjection( x, k ) { return Math.pow( ( 1 + x * k[ 0 ] ), ( -k[ 1 ] / k[ 0 ] ) ); }

function getEbertPrelecProjection( x, k ) { return Math.exp( -Math.pow( ( k[ 0 ] * x ), k[ 1 ] ) ); }

function getbleichrodtProjection( x, k ) { return k[ 2 ] * Math.exp( -k[ 0 ] * Math.pow( x, k[ 1 ] ) ); }

function getElementByModel( arr, value ) {

    var result = arr.filter( function ( o ) { return o.Model === value; } );

    return result ? result[ 0 ] : null;
}

function getNoise( obj, isTop ) {
    var mReturn = "";
    mReturn += "Noise Mean (c): " + parseFloat( obj.Params[ 0 ] ).toFixed( 6 ) + "<br>";
    mReturn += "Noise AIC: " + obj.AIC.toFixed( 6 ) + "<br>";
    mReturn += "Noise BIC: " + obj.BIC.toFixed( 6 ) + "<br>";
    mReturn += "Noise RMS error: " + obj.RMSE.toFixed( 6 ) + "<br>";
    mReturn += "Noise avg error: " + obj.MSE.toFixed( 6 ) + "<br>";
    mReturn += "<b>Noise Probability: " + obj.Probability.toFixed( 6 ) + "</b><br>";

    if ( isTop ) {
        mReturn += "<b>Noise Area (Natural): " + obj.AUC.toFixed( 6 ) + "</b><br>";
        mReturn += "<b>Noise Area (Log10 Scale): " + obj.AUClog10.toFixed( 6 ) + "</b><br>";
    }

    return mReturn;
}

function getExponential( obj, isTop ) {
    var mReturn = "";
    mReturn += "Exponential (k): " + obj.Params[ 0 ].toFixed( 6 ) + "<br>";
    mReturn += "Exponential AIC: " + obj.AIC.toFixed( 6 ) + "<br>";
    mReturn += "Exponential BIC: " + obj.BIC.toFixed( 6 ) + "<br>";
    mReturn += "Exponential RMS error: " + obj.RMSE.toFixed( 6 ) + "<br>";
    mReturn += "Exponential avg error: " + obj.MSE.toFixed( 6 ) + "<br>";
    mReturn += "<b>Exponential Probability: " + obj.Probability.toFixed( 6 ) + "</b><br>";

    if ( isTop ) {
        mReturn += "<b>Exponential ln(ED50): " + obj.ED50.toFixed( 6 ) + "</b><br>";
        mReturn += "<b>Exponential Area (Natural): " + obj.AUC.toFixed( 6 ) + "</b><br>";
        mReturn += "<b>Exponential Area (Log10 Scale): " + obj.AUClog10.toFixed( 6 ) + "</b><br>";
    }

    return mReturn;
}

function getHyperbolic( obj, isTop ) {
    var mReturn = "";
    mReturn += "Hyperbolic (k): " + obj.Params[ 0 ].toFixed( 6 ) + "<br>";
    mReturn += "Hyperbolic AIC: " + obj.AIC.toFixed( 6 ) + "<br>";
    mReturn += "Hyperbolic BIC: " + obj.BIC.toFixed( 6 ) + "<br>";
    mReturn += "Hyperbolic RMS error: " + obj.RMSE.toFixed( 6 ) + "<br>";
    mReturn += "Hyperbolic avg error: " + obj.MSE.toFixed( 6 ) + "<br>";
    mReturn += "<b>Hyperbolic Probability: " + obj.Probability.toFixed( 6 ) + "</b><br>";

    if ( isTop ) {
        mReturn += "<b>Hyperbolic ln(ED50): " + obj.ED50.toFixed( 6 ) + "</b><br>";
        mReturn += "<b>Hyperbolic Area (Natural): " + obj.AUC.toFixed( 6 ) + "</b><br>";
        mReturn += "<b>Hyperbolic Area (Log10 Scale): " + obj.AUClog10.toFixed( 6 ) + "</b><br>";
    }

    return mReturn;
}

function getQuasiHyperbolic( obj, isTop ) {
    var mReturn = "";
    mReturn += "Quasi Hyperbolic (b): " + obj.Params[ 0 ].toFixed( 6 ) + "<br>";
    mReturn += "Quasi Hyperbolic (d): " + obj.Params[ 1 ].toFixed( 6 ) + "<br>";
    mReturn += "Quasi Hyperbolic AIC: " + obj.AIC.toFixed( 6 ) + "<br>";
    mReturn += "Quasi Hyperbolic BIC: " + obj.BIC.toFixed( 6 ) + "<br>";
    mReturn += "Quasi Hyperbolic RMS error: " + obj.RMSE.toFixed( 6 ) + "<br>";
    mReturn += "Quasi Hyperbolic avg error: " + obj.MSE.toFixed( 6 ) + "<br>";
    mReturn += "<b>Quasi Hyperbolic Probability: " + obj.Probability.toFixed( 6 ) + "</b><br>";

    if ( isTop ) {
        mReturn += "<b>Quasi Hyperbolic ln(ED50): " + obj.ED50.toFixed( 6 ) + "</b><br>";
        mReturn += "<b>Quasi Hyperbolic Area (Natural): " + obj.AUC.toFixed( 6 ) + "</b><br>";
        mReturn += "<b>Quasi Hyperbolic Area (Log10 Scale): " + obj.AUClog10.toFixed( 6 ) + "</b><br>";
    }

    return mReturn;
}

function getRachlin( obj, isTop ) {
    var mReturn = "";
    mReturn += "Rachlin (k): " + obj.Params[ 0 ].toFixed( 6 ) + "<br>";
    mReturn += "Rachlin (s): " + obj.Params[ 1 ].toFixed( 6 ) + "<br>";
    mReturn += "Rachlin AIC: " + obj.AIC.toFixed( 6 ) + "<br>";
    mReturn += "Rachlin BIC: " + obj.BIC.toFixed( 6 ) + "<br>";
    mReturn += "Rachlin RMSE error: " + obj.RMSE.toFixed( 6 ) + "<br>";
    mReturn += "Rachlin avg error: " + obj.MSE.toFixed( 6 ) + "<br>";
    mReturn += "<b>Rachlin Probability: " + obj.Probability.toFixed( 6 ) + "</b><br>";

    if ( isTop ) {
        mReturn += "<b>Rachlin ln(ED50): " + obj.ED50.toFixed( 6 ) + "</b><br>";
        mReturn += "<b>Rachlin Area (Natural): " + obj.AUC.toFixed( 6 ) + "</b><br>";
        mReturn += "<b>Rachlin Area (Log10 Scale): " + obj.AUClog10.toFixed( 6 ) + "</b><br>";
    }

    return mReturn;
}

function getMyerson( obj, isTop ) {
    var mReturn = "";
    mReturn += "Myerson (k): " + obj.Params[ 0 ].toFixed( 6 ) + "<br>";
    mReturn += "Myerson (s): " + obj.Params[ 1 ].toFixed( 6 ) + "<br>";
    mReturn += "Myerson AIC: " + obj.AIC.toFixed( 6 ) + "<br>";
    mReturn += "Myerson BIC: " + obj.BIC.toFixed( 6 ) + "<br>";
    mReturn += "Myerson RMS error: " + obj.RMSE.toFixed( 6 ) + "<br>";
    mReturn += "Myerson avg error: " + obj.MSE.toFixed( 6 ) + "<br>";
    mReturn += "<b>Myerson Probability: " + obj.Probability.toFixed( 6 ) + "</b><br>";

    if ( isTop ) {
        mReturn += "<b>Myerson ln(ED50): " + obj.ED50.toFixed( 6 ) + "</b><br>";
        mReturn += "<b>Myerson Area (Natural): " + obj.AUC.toFixed( 6 ) + "</b><br>";
        mReturn += "<b>Myerson Area (Log10 Scale): " + obj.AUClog10.toFixed( 6 ) + "</b><br>";
    }

    return mReturn;
}

function getRodriguezLogue( obj, isTop ) {
    var mReturn = "";
    mReturn += "Loewenstein & Prelec (k): " + obj.Params[ 0 ].toFixed( 6 ) + "<br>";
    mReturn += "Loewenstein & Prelec (b): " + obj.Params[ 1 ].toFixed( 6 ) + "<br>";
    mReturn += "Loewenstein & Prelec AIC: " + obj.AIC.toFixed( 6 ) + "<br>";
    mReturn += "Loewenstein & Prelec BIC: " + obj.BIC.toFixed( 6 ) + "<br>";
    mReturn += "Loewenstein & Prelec RMS error: " + obj.RMSE.toFixed( 6 ) + "<br>";
    mReturn += "Loewenstein & Prelec avg error: " + obj.MSE.toFixed( 6 ) + "<br>";
    mReturn += "<b>Loewenstein & Prelec Probability: " + obj.Probability.toFixed( 6 ) + "</b><br>";

    if ( isTop ) {
        mReturn += "<b>Loewenstein & Prelec ln(ED50): " + obj.ED50.toFixed( 6 ) + "</b><br>";
        mReturn += "<b>Loewenstein & Prelec Area (Natural): " + obj.AUC.toFixed( 6 ) + "</b><br>";
        mReturn += "<b>Loewenstein & Prelec Area (Log10 Scale): " + obj.AUClog10.toFixed( 6 ) + "</b><br>";
    }

    return mReturn;
}

function getEbertPrelec( obj, isTop ) {
    var mReturn = "";
    mReturn += "Ebert & Prelec (k): " + obj.Params[ 0 ].toFixed( 6 ) + "<br>";
    mReturn += "Ebert & Prelec (s): " + obj.Params[ 1 ].toFixed( 6 ) + "<br>";
    mReturn += "Ebert & Prelec AIC: " + obj.AIC.toFixed( 6 ) + "<br>";
    mReturn += "Ebert & Prelec BIC: " + obj.BIC.toFixed( 6 ) + "<br>";
    mReturn += "Ebert & Prelec RMS error: " + obj.RMSE.toFixed( 6 ) + "<br>";
    mReturn += "Ebert & Prelec avg error: " + obj.MSE.toFixed( 6 ) + "<br>";
    mReturn += "<b>Ebert & Prelec Probability: " + obj.Probability.toFixed( 6 ) + "</b><br>";

    if ( isTop ) {
        mReturn += "<b>Ebert & Prelec ln(ED50): " + obj.ED50.toFixed( 6 ) + "</b><br>";
        mReturn += "<b>Ebert & Prelec Area (Natural): " + obj.AUC.toFixed( 6 ) + "</b><br>";
        mReturn += "<b>Ebert & Prelec Area (Log10 Scale): " + obj.AUClog10.toFixed( 6 ) + "</b><br>";
    }

    return mReturn;
}

function getBleichrodt( obj, isTop ) {
    var mReturn = "";
    mReturn += "Beleichrodt et al. (b): " + obj.Params[ 2 ].toFixed( 6 ) + "<br>";
    mReturn += "Beleichrodt et al. (k): " + obj.Params[ 0 ].toFixed( 6 ) + "<br>";
    mReturn += "Beleichrodt et al. (s): " + obj.Params[ 1 ].toFixed( 6 ) + "<br>";
    mReturn += "Beleichrodt et al. AIC: " + obj.AIC.toFixed( 6 ) + "<br>";
    mReturn += "Beleichrodt et al. BIC: " + obj.BIC.toFixed( 6 ) + "<br>";
    mReturn += "Beleichrodt et al. RMS error: " + obj.RMSE.toFixed( 6 ) + "<br>";
    mReturn += "Beleichrodt et al. avg error: " + obj.MSE.toFixed( 6 ) + "<br>";
    mReturn += "<b>Beleichrodt et al. Probability: " + obj.Probability.toFixed( 6 ) + "</b><br>";

    if ( isTop ) {
        mReturn += "<b>Beleichrodt et al. ln(ED50): " + obj.ED50.toFixed( 6 ) + "</b><br>";
        mReturn += "<b>Beleichrodt et al. Area (Natural): " + obj.AUC.toFixed( 6 ) + "</b><br>";
        mReturn += "<b>Beleichrodt et al. Area (Log10 Scale): " + obj.AUClog10.toFixed( 6 ) + "</b><br>";
    }

    return mReturn;
}

const INDEX_NOISE = 0;
const INDEX_EXPONENTIAL = 1;
const INDEX_HYPERBOLIC = 2;
const INDEX_QUASI_HYPERBOLIC = 3;
const INDEX_MYERSON_GREEN = 4;
const INDEX_RACHLIN = 5;
const INDEX_LOUWENSTEIN = 6;
const INDEX_EBERT_PRELEC = 7;
const INDEX_BELEICHRODT = 8;
const INDEX_RAW_DATA = 9;

class DiscountingModelSelector extends Component {
    constructor ( props ) {
        super( props );

        this.state = {
            settings: {
                data: [ [ "", "" ], [ "", "" ], [ "", "" ],
                [ "", "" ], [ "", "" ], [ "", "" ],
                [ "", "" ], [ "", "" ], [ "", "" ] ],
                colHeaders: [ 'Delays', 'Values' ],
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
                    text: 'Discounting Model Selection',
                    fontColor: "black"
                },
                scales: {
                    xAxes: [ {
                        titleFontColor: "black",
                        scaleLabel: {
                            display: true,
                            labelString: 'Delay'
                        },
                        type: 'logarithmic',
                        position: 'bottom',
                        scaleLineColor: "black",
                        gridLines: {
                            color: "transparent"
                        },
                        ticks: {
                            maxRotation: 90,
                            minRotation: 90,
                            callback: function ( value, index, values ) {
                                var mValue = value.toString();

                                var isValid = /^[01]*$/.test( mValue );

                                if ( isValid ) {
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
                            labelString: 'Value',
                        },
                        ticks: {
                            beginAtZero: true,
                            steps: 10,
                            stepValue: 0.1,
                            fontColor: "black",
                            max: 1
                        },
                        scaleLineColor: "black",
                        gridLines: {
                            color: "transparent"
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
            worker: new Worker( '/js/worker_discounting.js' ),
            isBusy: false,
            canSubmit: true,
            submitText: "Fit Models",
            selectBound: "Do not Bound",
        }

        this.state.worker.addEventListener( "message", obj => {
            this.handleWorkerOutput( obj );
        } );
    }

    getReference( i ) {
        var referenceId = "modelRank" + i;

        return document.getElementById( referenceId );
    }

    getHeadingContent( obj, i ) {
        var mRef = this.getReference( i );

        var isTop = ( i === 0 );

        if ( obj.Model === "Noise" ) {
            mRef.innerHTML = ( getNoise( obj, isTop ) );
        }
        else if ( obj.Model === "Exponential" ) {
            mRef.innerHTML = ( getExponential( obj, isTop ) );
        }
        else if ( obj.Model === "Hyperbolic" ) {
            mRef.innerHTML = ( getHyperbolic( obj, isTop ) );
        }
        else if ( obj.Model === "Beta-Delta" ) {
            mRef.innerHTML = ( getQuasiHyperbolic( obj, isTop ) );
        }
        else if ( obj.Model === "Green-Myerson" ) {
            mRef.innerHTML = ( getMyerson( obj, isTop ) );
        }
        else if ( obj.Model === "Rachlin" ) {
            mRef.innerHTML = ( getRachlin( obj, isTop ) );
        }
        else if ( obj.Model === "Loewstein-Prelec" ) {
            mRef.innerHTML = ( getRodriguezLogue( obj, isTop ) );
        }
        else if ( obj.Model === "Ebert-Prelec" ) {
            mRef.innerHTML = ( getEbertPrelec( obj, isTop ) );
        }
        else if ( obj.Model === "Beleichrodt" ) {
            mRef.innerHTML = ( getBleichrodt( obj, isTop ) );
        }
    }

    setDefaultValues( event ) {
        this.setState( {
            settings: {
                data: [
                    [ "1", "1.0" ],
                    [ "30", "0.9" ],
                    [ "180", "0.8" ],
                    [ "540", "0.7" ],
                    [ "1080", "0.6" ],
                    [ "2160", "0.5" ],
                    [ "4320", "0.4" ],
                    [ "8640", "0.3" ],
                    [ "17280", "0.2" ]
                ]
            }
        } );
    }

    clearChart() {
        this.setState( {
            data: {
                datasets:
                    [
                        {
                            label: 'Noise',
                            data: [],
                            fill: false,
                            lineTension: 0,
                            backgroundColor: "rgba(190,128,255,1)",
                            borderColor: "rgba(190,128,255,1)",
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
                            label: 'Exponential',
                            data: [],
                            fill: false,
                            lineTension: 0,
                            backgroundColor: "rgba(12,21,42,1)",
                            borderColor: "rgba(12,21,42,1)",
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
                            label: 'Hyperbolic',
                            data: [],
                            fill: false,
                            lineTension: 0,
                            backgroundColor: "rgba(152,36,56,1)",
                            borderColor: "rgba(152,36,56,1)",
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
                            label: 'Quasi-Hyperbolic',
                            data: [],
                            fill: false,
                            lineTension: 0,
                            backgroundColor: "rgba(235,84,10,1)",
                            borderColor: "rgba(235,84,10,1)",
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
                            label: 'Green-Myerson',
                            data: [],
                            fill: false,
                            lineTension: 0,
                            backgroundColor: "rgba(50,124,203,1)",
                            borderColor: "rgba(50,124,203,1)",
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
                            label: 'Rachlin',
                            data: [],
                            fill: false,
                            lineTension: 0,
                            backgroundColor: "rgba(20,182,148,1)",
                            borderColor: "rgba(20,182,148,1)",
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
                            label: 'Loewenstein-Prelec',
                            data: [],
                            fill: false,
                            lineTension: 0,
                            backgroundColor: "rgba(67,162,202,1)",
                            borderColor: "rgba(67,162,202,1)",
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
                            label: 'Ebert-Prelec',
                            data: [],
                            fill: false,
                            lineTension: 0,
                            backgroundColor: "rgba(255,237,160,1)",
                            borderColor: "rgba(255,237,160,1)",
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
                            label: 'Bleichrodt et al.',
                            data: [],
                            fill: false,
                            lineTension: 0,
                            backgroundColor: "rgba(44,162,95,1)",
                            borderColor: "rgba(44,162,95,1)",
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

            var mFinalDelay = Math.max( ...obj.data.x );
            var plotLast = false;

            var noiseElement = getElementByModel( obj.data.results, "Noise" );
            var expElement = getElementByModel( obj.data.results, "Exponential" );
            var hypElement = getElementByModel( obj.data.results, "Hyperbolic" );
            var bdElement = getElementByModel( obj.data.results, "Beta-Delta" );
            var mgElement = getElementByModel( obj.data.results, "Green-Myerson" );
            var rachElement = getElementByModel( obj.data.results, "Rachlin" );
            var lpElement = getElementByModel( obj.data.results, "Loewstein-Prelec" );
            var epElement = getElementByModel( obj.data.results, "Ebert-Prelec" );
            var belElement = getElementByModel( obj.data.results, "Beleichrodt" );

            // Deep copy
            const dataSetCopy = this.state.data.datasets.slice( 0 );

            const noiseCopy = dataSetCopy[ INDEX_NOISE ].data.slice( 0 );
            const expCopy = dataSetCopy[ INDEX_EXPONENTIAL ].data.slice( 0 );
            const hypCopy = dataSetCopy[ INDEX_HYPERBOLIC ].data.slice( 0 );
            const qhCopy = dataSetCopy[ INDEX_QUASI_HYPERBOLIC ].data.slice( 0 );
            const mgCopy = dataSetCopy[ INDEX_MYERSON_GREEN ].data.slice( 0 );
            const rachCopy = dataSetCopy[ INDEX_RACHLIN ].data.slice( 0 );
            const lpCopy = dataSetCopy[ INDEX_LOUWENSTEIN ].data.slice( 0 );
            const epCopy = dataSetCopy[ INDEX_EBERT_PRELEC ].data.slice( 0 );
            const beleichCopy = dataSetCopy[ INDEX_BELEICHRODT ].data.slice( 0 );
            const rawCopy = dataSetCopy[ INDEX_RAW_DATA ].data.slice( 0 );

            var mDelay;

            for ( var j = 0; j < obj.data.x.length; j++ ) {
                mDelay = parseFloat( obj.data.x[ j ] );
                mDelay = ( mDelay <= 0 ) ? 0.01 : mDelay;

                rawCopy.push( {
                    x: mDelay,
                    y: parseFloat( obj.data.y[ j ] )
                } );
            }

            for ( var i = 1; i <= mFinalDelay; ) {
                noiseCopy.push( {
                    x: i,
                    y: parseFloat( noiseElement.Params[ 0 ] )
                } );

                if ( expElement ) {
                    expCopy.push( {
                        x: i,
                        y: getExponentialProjection( i, expElement.Params )
                    } );
                }

                if ( hypElement ) {
                    hypCopy.push( {
                        x: i,
                        y: getHyperbolicProjection( i, hypElement.Params )
                    } );
                }

                if ( bdElement ) {
                    qhCopy.push( {
                        x: i,
                        y: getQuasiHyperbolicProjection( i, bdElement.Params )
                    } );

                }

                if ( mgElement ) {
                    mgCopy.push( {
                        x: i,
                        y: getMyersonProjection( i, mgElement.Params )
                    } );
                }

                if ( rachElement ) {
                    rachCopy.push( {
                        x: i,
                        y: getRachlinProjection( i, rachElement.Params )
                    } );
                }

                if ( lpElement ) {
                    lpCopy.push( {
                        x: i,
                        y: getRodriguezLogueProjection( i, lpElement.Params )
                    } );
                }

                if ( epElement ) {
                    epCopy.push( {
                        x: i,
                        y: getEbertPrelecProjection( i, epElement.Params )
                    } );
                }

                if ( belElement ) {
                    beleichCopy.push( {
                        x: i,
                        y: getbleichrodtProjection( i, belElement.Params )
                    } );
                }

                /* Scaling increases here */

                if ( i > 0 && i <= 10 ) i = i + 1;
                else if ( i > 10 && i <= 100 ) i = i + 10;
                else if ( i > 100 && i <= 1000 ) i = i + 100;
                else if ( i > 1000 && i <= 10000 ) i = i + 1000;
                else if ( i > 10000 && i <= 100000 ) i = i + 10000;
                else if ( i > 100000 && i <= 1000000 ) i = i + 100000;
                else if ( i > 1000000 && i <= 10000000 ) i = i + 1000000;

                if ( plotLast ) {
                    i = mFinalDelay + 1;
                }
                else if ( i > mFinalDelay ) {
                    i = mFinalDelay;
                    plotLast = true;
                }
            }

            dataSetCopy[ INDEX_NOISE ].data = noiseCopy;
            dataSetCopy[ INDEX_EXPONENTIAL ].data = expCopy;
            dataSetCopy[ INDEX_HYPERBOLIC ].data = hypCopy;
            dataSetCopy[ INDEX_QUASI_HYPERBOLIC ].data = qhCopy;
            dataSetCopy[ INDEX_MYERSON_GREEN ].data = mgCopy;
            dataSetCopy[ INDEX_RACHLIN ].data = rachCopy;
            dataSetCopy[ INDEX_LOUWENSTEIN ].data = lpCopy;
            dataSetCopy[ INDEX_EBERT_PRELEC ].data = epCopy;
            dataSetCopy[ INDEX_BELEICHRODT ].data = beleichCopy;

            dataSetCopy[ INDEX_RAW_DATA ].data = rawCopy;

            this.setState( {
                data: Object.assign( {}, this.state.data, {
                    datasets: dataSetCopy
                } ),
                canSubmit: true,
                isBusy: false,
                submitText: "Fit Models"
            } );

            for ( var i = 0; i < obj.data.results.length; i++ ) {
                this.getHeadingContent( obj.data.results[ i ], i );
            }

            var hiddenTitles = document.querySelectorAll( '.hiddenTitles' );

            [].forEach.call( hiddenTitles, function ( title ) {
                title.style.display = "block";
            } );

        } else {
            this.setState( {
                submitText: obj.data.msg
            } );
        }
    }

    startCalculation( event ) {
        if ( this.state.isBusy ) return;
        if ( !window.Worker ) {
            alert( "Please use a modern web-broswer with Web-Worker support" );

            return;
        }

        this.clearChart();

        var mX = [];
        var mY = [];

        var mFinalDelay = -1;

        for ( var i = 0; i < this.state.settings.data.length; i++ ) {
            var temp = this.state.settings.data[ i ];

            if ( this.isNumeric( parseFloat( temp[ 0 ] ) ) && this.isNumeric( parseFloat( temp[ 1 ] ) ) ) {
                if ( parseFloat( temp[ 0 ] ) < 0 ) {
                    alert( 'Please enter positive delay points.' );
                    return;
                }

                if ( parseFloat( temp[ 1 ] ) > 1 ) {
                    alert( 'Please enter value points within 0-1.' );
                    return;
                }

                if ( parseFloat( temp[ 0 ] ) > mFinalDelay ) {
                    mFinalDelay = parseFloat( temp[ 0 ] );
                }

                mX.push( temp[ 0 ] );
                mY.push( temp[ 1 ] );
            }
        }

        if ( mX.length < 3 || mY.length < 3 ) {
            alert( 'Not enough data was entered' );

            return;
        }

        /*
        $('p.clearHelper').empty();
        $('h4.hiddenTitles').hide();
        */

        this.setState( {
            canSubmit: false,
            submitText: "Please Wait..."
        }, () => this.performMethods() );
    }

    performMethods() {
        var mX = [];
        var mY = [];

        var mFinalDelay = -1;

        for ( var i = 0; i < this.state.settings.data.length; i++ ) {
            var temp = this.state.settings.data[ i ];

            if ( this.isNumeric( parseFloat( temp[ 0 ] ) ) && this.isNumeric( parseFloat( temp[ 1 ] ) ) ) {
                if ( parseFloat( temp[ 0 ] ) < 0 ) {
                    alert( 'Please enter positive delay points.' );

                    return;
                }

                if ( parseFloat( temp[ 1 ] ) > 1 ) {
                    alert( 'Please enter value points within 0-1.' );

                    return;
                }

                if ( parseFloat( temp[ 0 ] ) > mFinalDelay ) {
                    mFinalDelay = parseFloat( temp[ 0 ] );
                }

                mX.push( temp[ 0 ] );
                mY.push( temp[ 1 ] );
            }
        }

        this.state.worker.postMessage( {
            boundRachlin: this.state.selectBound !== "Do not Bound",
            maxIterations: 500,
            x: mX,
            y: mY
        } );
    }

    onChangeFunc( selectName, selectedOption ) {
        this.setState( {
            [ selectName ]: selectedOption
        } );
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="jumbotron">
                            <h2 className="h2-responsive">Discounting Model Selector </h2><br />
                            <p className="lead">The Discounting Model Selector (Web) is a web-based tool for applying approximate Bayesian model selection for delay discounting applications. This program allows researchers and clinicians with to perform an empirical comparison of Discounting models for individual series of data. This method has been simplified by Discounting Model Selector through the use of an easy-to-use interface resembling common spreadsheet software. At present, the online version of the DMS is performed with only one discounting series at a time.</p>
                            <p className="lead"><strong>Published:</strong><br />Gilroy, S. P. &amp; Hantula, D. A. (2018). Discounting model selection with area-based measures: A case for numerical integration. <i>Journal of the Experimental Analysis of Behavior</i>. <a href="https://doi.org/10.1002/jeab.318">https://doi.org/10.1002/jeab.318</a></p>
                            <p className="lead">Gilroy, S. P., Franck, C. T. &amp; Hantula, D. A. (2017). The discounting model selector: Statistical software for delay discounting applications. <i>Journal of the Experimental Analysis of Behavior, 107(3)</i>, 388-401. <a href="https://doi.org/10.1002/jeab.257">https://doi.org/10.1002/jeab.257</a></p>
                            <p className="lead">Franck, C. T., Koffarnus, M. N., House, L. L., &amp; Bickel, W. K. (2015). Accurate characterization of delay discounting: a multiple model approach using approximate Bayesian model selection and a unified discounting measure. <i>Journal of the Experimental Analysis of Behavior, 103(1)</i>, 218-233. <a href="https://doi.org/10.1002/jeab.128">https://doi.org/10.1002/jeab.128</a></p>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <h3 className="panel-title">Discounting Model Selection</h3>
                            </div>
                            <div className="panel-body">
                                <p className="lead">This tool automates discounting model fitting, Approximate Bayesian Model Selection, model selection, and calculation of the Effective Delay 50 (ED50).</p>
                                <p className="lead">To perform model selection, input at least 3 pairs (x and y) of discounting data. At least three pairs of data are necessary to proceed.</p>
                                <p className="lead">Delay values (x) can be any number, though values must be between 0-1. This should be calculated as a proportion (i.e., the Y value divided by the Maximum Value). Any higher numbers will prevent you from proceeding.</p>

                                <br />

                                <div className="read-more">
                                    <button id="loadSampleBtn" className="btn btn-primary btn-block btn-raised" onClick={ ( e ) => this.setDefaultValues( e ) }>Load Sample Data</button>
                                </div>

                                <br />

                                <HotTable root="hot" settings={ this.state.settings } />

                                <div className="form-group">
                                    <label htmlFor="selectAcq" className="lead">Select Rachlin Behavior:</label>
                                    <select className="form-control"
                                        id="selectBound"
                                        name="selectBound"
                                        value={ this.state.selectBound }
                                        onChange={ e => this.onChangeFunc( e.target.name, e.target.value ) }
                                        style={ fullHeightStyle } >
                                        <option defaultValue>Do not Bound</option>
                                        <option>Drop if s is greater than 1</option>
                                    </select>
                                </div>

                                <button id="scoreBtn"
                                    className="btn btn-primary btn-block btn-raised"
                                    disabled={ !this.state.canSubmit }
                                    onClick={ ( e ) => this.startCalculation( e ) }> { this.state.submitText } </button>

                                <br />

                                <p className="lead">The <a href="https://github.com/miyamot0/miyamot0.github.io">Discounting Model Selector (Web)</a> uses the following tools to function:</p>

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

                            <h3 className="hiddenTitles" style={ hiddenStyle }>Most Probable Model</h3>
                            <p id="modelRank0" className="card-text clearHelper"></p>
                            <h3 className="hiddenTitles" style={ hiddenStyle }>Second Most Probable Model</h3>
                            <p id="modelRank1" className="card-text clearHelper"></p>
                            <h3 className="hiddenTitles" style={ hiddenStyle }>Third Most Probable Model</h3>
                            <p id="modelRank2" className="card-text clearHelper"></p>
                            <h3 className="hiddenTitles" style={ hiddenStyle }>Fourth Most Probable Model</h3>
                            <p id="modelRank3" className="card-text clearHelper"></p>
                            <h3 className="hiddenTitles" style={ hiddenStyle }>Fifth Most Probable Model</h3>
                            <p id="modelRank4" className="card-text clearHelper"></p>
                            <h3 className="hiddenTitles" style={ hiddenStyle }>Sixth Most Probable Model</h3>
                            <p id="modelRank5" className="card-text clearHelper"></p>
                            <h3 className="hiddenTitles" style={ hiddenStyle }>Seventh Most Probable Model</h3>
                            <p id="modelRank6" className="card-text clearHelper"></p>
                            <h3 className="hiddenTitles" style={ hiddenStyle }>Eighth Most Probable Model</h3>
                            <p id="modelRank7" className="card-text clearHelper"></p>
                            <h3 className="hiddenTitles" style={ hiddenStyle }>Ninth Most Probable Model</h3>
                            <p id="modelRank8" className="card-text clearHelper"></p>

                        </div>
                    </div>
                </div>

                <script src="js/Chart.min.js" type="text/javascript"></script>

                <link href="css/handsontable.full.min.css" rel="stylesheet" />
                <script src="js/handsontable.full.min.js" type="text/javascript"></script>

                <script src="js/ui_discounting.js" type="text/javascript"></script>

            </div>
        )
    }
}

export default DiscountingModelSelector;