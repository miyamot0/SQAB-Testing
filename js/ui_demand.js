/*
   Copyright 2018 Shawn Gilroy

   This file is part of Small N Stats.

   Small N Stats is free software: you can redistribute it and/or modify
   it under the terms of the GNU General Public License as published by
   the Free Software Foundation, version 3.

   Small N Stats is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU General Public License for more details.

   You should have received a copy of the GNU General Public License
   along with Small N Stats.  If not, see http://www.gnu.org/licenses/.
*/

var worker = undefined;
var isBusy = false;

function getExponentialProjection(x, obj)
{
    var k = (obj.FitK) ? obj.Params[2] : obj.SetK;

    return Math.pow(10, (Math.log10(obj.Params[0]) + k * (Math.exp(-obj.Params[1] * obj.Params[0] * x) - 1)));
}

function getExponentiatedProjection(x, obj)
{
    var k = (obj.FitK) ? obj.Params[2] : obj.SetK;

    return obj.Params[0] * Math.pow(10, (k * (Math.exp(-obj.Params[1] * obj.Params[0] * x) - 1)));
}

function constructExponentialChart()
{
  var ctx = document.getElementById('chart').getContext('2d');

  Chart.defaults.global.defaultFontColor='black';

  window.myChart = new Chart(ctx, {
      type: 'line',
      data: {
          datasets: []
      },
      responsive: false,
      maintainAspectRatio: true,
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
                xAxes: [{
                  titleFontColor: "black",
                  scaleLabel: {
                    display: true,
                    labelString: 'Unit Price'
                  },
                  type: 'logarithmic',
                  position: 'bottom',
                  scaleLineColor: "black",
                  gridLines: { 
                    display:false
                  },
                  ticks: {      
                    maxRotation: 90,
                    minRotation: 90,
                    callback: function(value, index, values) {
                      var mValue = value.toString();

                      var isValid = /^[01]*$/.test(mValue);

                      var isValid2 = (value == 0.1 || value == 0.01 || value == 0.001);

                      if (isValid || isValid2)
                      {
                        return Number(mValue);
                      }
                      else
                      {
                        return null;
                      }                          
                    }
                  }
              }],
              yAxes: [{
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: 'Consumption',
                },
                type: 'logarithmic',
                ticks: {
                    min: 0.1,
                    fontColor: "black",
                    callback: function(value, index, values) {
                      var mValue = value.toString();

                      var isValid = /^[01]*$/.test(mValue);

                      var isValid2 = (value == 0.1 || value == 0.01 || value == 0.001);

                      if (isValid || isValid2)
                      {
                        return Number(mValue);
                      }
                      else
                      {
                        return null;
                      }                          
                    }
                },
                scaleLineColor: "black",
                gridLines: { 
                  display:false
                }
            }]
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
  });    
}

function constructExponentiatedChart()
{
  var ctx = document.getElementById('chart').getContext('2d');

  Chart.defaults.global.defaultFontColor='black';

  window.myChart = new Chart(ctx, {
      type: 'line',
      data: {
          datasets: []
      },
      responsive: false,
      maintainAspectRatio: true,
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
                xAxes: [{
                  titleFontColor: "black",
                  scaleLabel: {
                    display: true,
                    labelString: 'Unit Price'
                  },
                  type: 'logarithmic',
                  position: 'bottom',
                  scaleLineColor: "black",
                  gridLines: { 
                    display:false
                  },
                  ticks: {
                    beginAtZero: true,
                    maxRotation: 90,
                    minRotation: 90,
                    callback: function(value, index, values) {
                      var mValue = value.toString();

                      var isValid = /^[01]*$/.test(mValue);

                      var isValid2 = (value == 0.1 || value == 0.01 || value == 0.001);

                      if (isValid || isValid2)
                      {
                        return Number(mValue);
                      }
                      else
                      {
                        return null;
                      }                          
                    }
                  }
              }],
              yAxes: [{
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
                  display:false
                }
            }]
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
  });    
}

function clearChart()
{
    window.myChart.data.datasets = 
    [
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
    ];

    window.myChart.options.scales.xAxes["0"].gridLines.display = true;
    window.myChart.options.scales.yAxes["0"].gridLines.display = true;       

    window.myChart.update(50, true);
}

function performMethods()
{
    if (isBusy) return;

    var thing = $('#sheet').handsontable('getData');

    var mX = [];
    var mY = [];

    for (var i = 0; i < thing.length; i++)
    {
      var temp = thing[i];

      if ($.isNumeric(parseFloat(temp[0])) && $.isNumeric(parseFloat(temp[1])))
      {
        if (parseFloat(temp[0]) < 0)
        {
           alert('Please enter prices.');

           return;
        }
        
        mX.push(temp[0]);
        mY.push(temp[1]);
      }
    }

    $('p.clearHelper').empty();
    $('h4.hiddenTitles').hide();       

    $('#scoreBtn').attr("disabled","disabled");
    $('#scoreBtn').text("Please Wait...");

    var isExponential   = ($("#selectModel").prop('selectedIndex') == 0);
    var isExponentiated = ($("#selectModel").prop('selectedIndex') == 1);

    var kLogRange       = ($("#selectK").prop('selectedIndex') == 0);
    var kFit            = ($("#selectK").prop('selectedIndex') == 1);
    var kValue          = ($("#selectK").prop('selectedIndex') == 2);

    if (isExponential)
        constructExponentialChart();
    else
        constructExponentiatedChart();

    clearChart();

    $("#resultsTitle").empty();
    $("#resultsBody").empty();

    var kText = $("#customK").val();

    isBusy = true;

    worker.postMessage(
    {
        maxIterations: 1000,
        x: mX,
        y: mY,
        Exponential: isExponential,
        Exponentiated: isExponentiated,
        KFit: kFit,
        KLogRange: kLogRange,
        KValue: kValue,
        SetK: kText
    });

    if (typeof ga !== 'undefined') 
    {
      ga('send', {
        hitType: 'event',
        eventCategory: 'DMSWeb',
        eventAction: 'Model Selection'
      });
    }
}

function handleWorkerOutput(obj)
{
    if (obj.data.done)
    {
        isBusy = false;

        $(".hiddenTitles").show();

        mPoints = [];

        var mPrices       = obj.data.x.slice();
        var mConsumption  = obj.data.y.slice();
        var mConsumptionY = [];

        var mPointsObject = {};
        mPointsObject.label = "Raw Data";
        mPointsObject.data = new Array();

        var lowestPrice =  Math.min(...mPrices)
        var mFinalPrice =  Math.max(...mPrices)

        var mPrice;

        for (var i=0; i<mPrices.length; i++)
        {
          mPrice = parseFloat(mPrices[i]);
          mPrice = (mPrice <= 0) ? 0.01 : mPrice;

          window.myChart.data.datasets[2].data.push({
              x: mPrice, 
              y: parseFloat(mConsumption[i])
          });
        }

        lowestPrice = (lowestPrice == 0) ? 0.01 : lowestPrice;

        var mDelta = 3;

        for (var i = lowestPrice; i <= mFinalPrice; )
        {
          if (obj.data.Exponential)
          {
            window.myChart.data.datasets[0].data.push(
            {
              x: i, 
              y: getExponentialProjection(i, obj.data.results)
            });

            window.myChart.data.datasets[1].data.push(
            {
              x: i, 
              y: getExponentialProjection(i, obj.data.results) * i 
            });                

            getExponentialProjection(i, obj.data.results);
          }
          else if (obj.data.Exponentiated)
          {
            window.myChart.data.datasets[0].data.push(
            {
              x: i, 
              y: getExponentiatedProjection(i, obj.data.results)
            });

            window.myChart.data.datasets[1].data.push(
            {
              x: i, 
              y: getExponentiatedProjection(i, obj.data.results) * i
            });
          }

          if (i >= 0 && i <= 0.1)
          {
            i = i + 0.01 / mDelta;
          }
          else if (i > 0.1 && i <= 1)
          {
            i = i + 0.1 / mDelta;
          }
          else if (i > 1 && i <= 10)
          {
            i = i + 1 / mDelta;
          }
          else if (i > 10 && i <= 100)
          {
            i = i + 10 / mDelta;
          }
          else if (i > 100 && i <= 1000)
          {
            i = i + 100 / mDelta;
          }
          else if (i > 1000 && i <= 10000)
          {
            i = i + 1000 / mDelta;
          }
          else if (i > 10000 && i <= 100000)
          {
            i = i + 10000 / mDelta;
          }
          else if (i > 100000 && i <= 1000000)
          {
            i = i + 100000 / mDelta;
          }
          else if (i > 1000000 && i <= 10000000)
          {
            i = i + 1000000 / mDelta;
          }
        }

        window.myChart.update();

        var k = (obj.data.results.FitK) ? obj.data.results.Params[2] : obj.data.SetK;
        var approxPmax = obj.data.results.HurshPmax;
        var approxOmax;

        if (obj.data.Exponential)
        {
            approxOmax = getExponentialProjection(approxPmax, obj.data.results) * approxPmax;

            $("#resultsTitle").html("Exponential Model of Demand");
        }
        else if (obj.data.Exponentiated)
        {
            approxOmax = getExponentiatedProjection(approxPmax, obj.data.results) * approxPmax;

            $("#resultsTitle").html("Exponentiated Model of Demand");
        }

        var innerHtml = "";

        innerHtml += "<strong>Results of Fitting:</strong><br>";
        innerHtml += "<strong>Alpha: </strong> " + obj.data.results.Params[1] + "<br>";
        innerHtml += "<strong>Q0: </strong> " + obj.data.results.Params[0] + "<br>";
        innerHtml += "<strong>K: </strong> " + k + "<br>";
        innerHtml += "<strong>K Fitted: </strong> " + obj.data.results.FitK + "<br>";
        innerHtml += "<strong>Omaxd: </strong> " + approxOmax + "<br>";
        innerHtml += "<strong>Pmaxd: </strong> " + approxPmax + "<br>";
        innerHtml += "<strong>RMS Error: </strong> " + obj.data.results.RMSE + "<br>";
        innerHtml += "<strong>Avg error: </strong> " + obj.data.results.MSE + "<br>";

        $("#resultsBody").html(innerHtml);

        $('#scoreBtn').text("Fit Models");
        $("#scoreBtn").attr("disabled", false);
    }
    else
    {

    }
}

function getFittings(obj)
{
  var returner = {};
  returner.Model = obj.Model;
  returner.K = (obj.FitK) ? obj.Params[2] : obj.SetK;
  returner.A = obj.Params[1];
  returner.Q0 = obj.Params[0];

  return returner;
}

function initWorker()
{
    if (!window.Worker) 
    {
        alert("Please use a modern web-broswer with Web-Worker support");

        return;
    }

    worker = undefined;
    worker = new Worker('js/worker_demand.js');
    worker.onmessage = handleWorkerOutput;

    $("#scoreBtn").attr("disabled", false);

    clearChart();
}

function modelIndexChanged(e) 
{
    var mIndex = $("#selectModel").prop('selectedIndex');

    if (mIndex == 0)
    {
      $("#selectX").prop('selectedIndex', 1);
      $("#selectY").prop('selectedIndex', 0);

      $("#kSelectDiv").removeClass("hidden");
    }
    else if (mIndex == 1)
    {
      $("#selectX").prop('selectedIndex', 1);
      $("#selectY").prop('selectedIndex', 1);

      $("#kSelectDiv").removeClass("hidden");
    }
}

function beginCalculation()
{
    clearChart();

    var thing = $('#sheet').handsontable('getData');

    var mX = [];
    var mY = [];

    for (var i = 0; i < thing.length; i++)
    {
        var temp = thing[i];

        if ($.isNumeric(parseFloat(temp[0])) && $.isNumeric(parseFloat(temp[1])))
        {
            if (parseFloat(temp[0]) < 0)
            {
               alert('Please enter positive prices.');
               return;
            }

            mX.push(temp[0]);
            mY.push(temp[1]);
        }
    }

    if (mX.length < 3 || mY.length < 3)
    {
        alert('Not enough data was entered');

        return;
    }      

    $('p.clearHelper').empty();
    $('h4.hiddenTitles').hide();       

    $('#scoreBtn').text("Please Wait...");
    $('#scoreBtn').attr("disabled","disabled");

    performMethods();
}

function loadSampleValues()
{
    $('#sheet').handsontable('setDataAtCell', 0, 0, "0.0");
    $('#sheet').handsontable('setDataAtCell', 1, 0, "0.5");
    $('#sheet').handsontable('setDataAtCell', 2, 0, "1.0");
    $('#sheet').handsontable('setDataAtCell', 3, 0, "1.5");
    $('#sheet').handsontable('setDataAtCell', 4, 0, "2.0");
    $('#sheet').handsontable('setDataAtCell', 5, 0, "2.5");
    $('#sheet').handsontable('setDataAtCell', 6, 0, "3.0");
    $('#sheet').handsontable('setDataAtCell', 7, 0, "4.0");
    $('#sheet').handsontable('setDataAtCell', 8, 0, "5.0");
    $('#sheet').handsontable('setDataAtCell', 9, 0, "10.0");
    $('#sheet').handsontable('setDataAtCell',10, 0, "15.0");

    $('#sheet').handsontable('setDataAtCell', 0, 1, "1000");
    $('#sheet').handsontable('setDataAtCell', 1, 1, "1000");
    $('#sheet').handsontable('setDataAtCell', 2, 1, "1000");
    $('#sheet').handsontable('setDataAtCell', 3, 1, "800");
    $('#sheet').handsontable('setDataAtCell', 4, 1, "800");
    $('#sheet').handsontable('setDataAtCell', 5, 1, "700");
    $('#sheet').handsontable('setDataAtCell', 6, 1, "600");
    $('#sheet').handsontable('setDataAtCell', 7, 1, "500");
    $('#sheet').handsontable('setDataAtCell', 8, 1, "400");
    $('#sheet').handsontable('setDataAtCell', 9, 1, "200");
    $('#sheet').handsontable('setDataAtCell',10, 1, "100");
}

function loadUpResources()
{
    var ctx = document.getElementById('chart').getContext('2d');

    Chart.defaults.global.defaultFontColor='black';

    window.myChart = new Chart(ctx, 
    {
        type: 'line',
        data: {
            datasets: []
        },
        responsive: false,
        maintainAspectRatio: true,
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
                  xAxes: [{
                    titleFontColor: "black",
                    scaleLabel: {
                      display: true,
                      labelString: 'Delay'
                    },
                    type: 'logarithmic',
                    position: 'bottom',
                    scaleLineColor: "black",
                    gridLines: { 
                      color: "#000000" 
                    },
                    ticks: {      
                      maxRotation: 90,
                      minRotation: 90,
                      callback: function(value, index, values) {
                        var mValue = value.toString();

                        var isValid = /^[01]*$/.test(mValue);

                        if (isValid)
                        {
                          return Number(mValue);
                        }
                        else
                        {
                          return null;
                        }                          
                      }
                    }
                }],
                yAxes: [{
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
                    color: "#000000" 
                  }
              }]
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
    });

    initWorker();

    $( "#scoreBtn" ).on('click', beginCalculation);

    $( "#loadSampleBtn" ).on('click', loadSampleValues);

    $( "#selectModel" ).change(modelIndexChanged);

    $( "#selectX" ).change(function(e) {
        if ($("#selectX").prop('selectedIndex') == 2)
          $("#customXvalue").removeClass("hidden");      
        else 
          $("#customXvalue").addClass("hidden");
    });

    $( "#selectY" ).change(function(e) {
        if ($("#selectY").prop('selectedIndex') == 4)
          $("#customYvalue").removeClass("hidden");      
        else 
          $("#customYvalue").addClass("hidden");
    });

    $( "#selectK" ).change(function(e) {
        if ($("#selectK").prop('selectedIndex') == 2)
          $("#customKvalue").removeClass("hidden");      
        else 
          $("#customKvalue").addClass("hidden");
    });

    $( "#sheet" ).handsontable(
    {
        data: [["",""],["",""],["",""],
        ["",""],["",""],["",""],
        ["",""],["",""],["",""]],
        colHeaders: ['Price/Unit Price', 'Consumption'],
        rowHeaders: false,
        stretchH: 'all',
        columnSorting: false,
        columns: [
          {data: 0, type: 'text'},
          {data: 1, type: 'text'}
        ],
        contextMenu: true
    });
}

window.addEventListener('load', loadUpResources(), true);


//window.addEventListener('load', loadUpResources(), true);