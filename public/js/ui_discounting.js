/*
   Copyright 2017 Shawn Gilroy

   This file is part of Discounting Model Selector, web port.

   Discounting Model Selector is free software: you can redistribute it and/or modify
   it under the terms of the GNU General Public License as published by
   the Free Software Foundation, version 3.

   Discounting Model Selector is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU General Public License for more details.

   You should have received a copy of the GNU General Public License
   along with Discounting Model Selector.  If not, see http://www.gnu.org/licenses/.
*/

var worker = undefined;

function getExponentialProjection(x, k) { return Math.exp(-k[0] * x); }

function getHyperbolicProjection(x, k) { return Math.pow((1 + k[0] * x), -1); }

function getQuasiHyperbolicProjection(x, k) { return k[0] * Math.pow(k[1], x); }

function getMyersonProjection(x, k) { return Math.pow((1+k[0]*x), -k[1]); }

function getRachlinProjection(x, k) { return Math.pow((1 + k[0] * Math.pow(x, k[1])), -1); }

function getRodriguezLogueProjection(x, k) { return Math.pow((1 + x * k[0]),(-k[1] / k[0])); }

function getEbertPrelecProjection(x, k) { return Math.exp(-Math.pow((k[0] * x),k[1])); }

function getbleichrodtProjection(x, k) { return k[2] * Math.exp(-k[0] * Math.pow(x, k[1])); }

function getReference(i) { return $("#modelRank" + i); }

function getNoise(obj, isTop)
{
  var mReturn = "";
  mReturn += "Noise Mean (c): " + parseFloat(obj.Params[0]).toFixed(6) + "<br>";
  mReturn += "Noise AIC: " + obj.AIC.toFixed(6) + "<br>";
  mReturn += "Noise BIC: " + obj.BIC.toFixed(6) + "<br>";
  mReturn += "Noise RMS error: " + obj.RMSE.toFixed(6) + "<br>";
  mReturn += "Noise avg error: " + obj.MSE.toFixed(6) + "<br>";
  mReturn += "<b>Noise Probability: " + obj.Probability.toFixed(6) + "</b><br>";

  if (isTop)
  {
    mReturn += "<b>Noise Area (Natural): " + obj.AUC.toFixed(6) + "</b><br>";
    mReturn += "<b>Noise Area (Log10 Scale): " + obj.AUClog10.toFixed(6) + "</b><br>";
  }

  return mReturn;
}

function getExponential(obj, isTop)
{
  var mReturn = "";
  mReturn += "Exponential (k): " + obj.Params[0].toFixed(6) + "<br>";
  mReturn += "Exponential AIC: " + obj.AIC.toFixed(6) + "<br>";
  mReturn += "Exponential BIC: " + obj.BIC.toFixed(6) + "<br>";
  mReturn += "Exponential RMS error: " + obj.RMSE.toFixed(6) + "<br>";
  mReturn += "Exponential avg error: " + obj.MSE.toFixed(6) + "<br>";
  mReturn += "<b>Exponential Probability: " + obj.Probability.toFixed(6) + "</b><br>";

  if (isTop)
  {
    mReturn += "<b>Exponential ln(ED50): " + obj.ED50.toFixed(6) + "</b><br>";
    mReturn += "<b>Exponential Area (Natural): " + obj.AUC.toFixed(6) + "</b><br>";
    mReturn += "<b>Exponential Area (Log10 Scale): " + obj.AUClog10.toFixed(6) + "</b><br>";
  }

  return mReturn;
}

function getHyperbolic(obj, isTop)
{
  var mReturn = "";
  mReturn += "Hyperbolic (k): " + obj.Params[0].toFixed(6) + "<br>";
  mReturn += "Hyperbolic AIC: " + obj.AIC.toFixed(6) + "<br>";
  mReturn += "Hyperbolic BIC: " + obj.BIC.toFixed(6) + "<br>";
  mReturn += "Hyperbolic RMS error: " + obj.RMSE.toFixed(6) + "<br>";
  mReturn += "Hyperbolic avg error: " + obj.MSE.toFixed(6) + "<br>";
  mReturn += "<b>Hyperbolic Probability: " + obj.Probability.toFixed(6) + "</b><br>";

  if (isTop)
  {
    mReturn += "<b>Hyperbolic ln(ED50): " + obj.ED50.toFixed(6) + "</b><br>";
    mReturn += "<b>Hyperbolic Area (Natural): " + obj.AUC.toFixed(6) + "</b><br>";
    mReturn += "<b>Hyperbolic Area (Log10 Scale): " + obj.AUClog10.toFixed(6) + "</b><br>";
  }

  return mReturn;
}

function getQuasiHyperbolic(obj, isTop)
{
  var mReturn = "";
  mReturn += "Quasi Hyperbolic (b): " + obj.Params[0].toFixed(6) + "<br>";
  mReturn += "Quasi Hyperbolic (d): " + obj.Params[1].toFixed(6) + "<br>";
  mReturn += "Quasi Hyperbolic AIC: " + obj.AIC.toFixed(6) + "<br>";
  mReturn += "Quasi Hyperbolic BIC: " + obj.BIC.toFixed(6) + "<br>";
  mReturn += "Quasi Hyperbolic RMS error: " + obj.RMSE.toFixed(6) + "<br>";
  mReturn += "Quasi Hyperbolic avg error: " + obj.MSE.toFixed(6) + "<br>";
  mReturn += "<b>Quasi Hyperbolic Probability: " + obj.Probability.toFixed(6) + "</b><br>";

  if (isTop)
  {
    mReturn += "<b>Quasi Hyperbolic ln(ED50): " + obj.ED50.toFixed(6) + "</b><br>";
    mReturn += "<b>Quasi Hyperbolic Area (Natural): " + obj.AUC.toFixed(6) + "</b><br>";
    mReturn += "<b>Quasi Hyperbolic Area (Log10 Scale): " + obj.AUClog10.toFixed(6) + "</b><br>";
  }

  return mReturn;
}

function getRachlin(obj, isTop)
{
  var mReturn = "";
  mReturn += "Rachlin (k): " + obj.Params[0].toFixed(6) + "<br>";
  mReturn += "Rachlin (s): " + obj.Params[1].toFixed(6) + "<br>";
  mReturn += "Rachlin AIC: " + obj.AIC.toFixed(6) + "<br>";
  mReturn += "Rachlin BIC: " + obj.BIC.toFixed(6) + "<br>";
  mReturn += "Rachlin RMSE error: " + obj.RMSE.toFixed(6) + "<br>";
  mReturn += "Rachlin avg error: " + obj.MSE.toFixed(6) + "<br>";
  mReturn += "<b>Rachlin Probability: " + obj.Probability.toFixed(6) + "</b><br>";

  if (isTop)
  {
    mReturn += "<b>Rachlin ln(ED50): " + obj.ED50.toFixed(6) + "</b><br>";
    mReturn += "<b>Rachlin Area (Natural): " + obj.AUC.toFixed(6) + "</b><br>";
    mReturn += "<b>Rachlin Area (Log10 Scale): " + obj.AUClog10.toFixed(6) + "</b><br>";
  }

  return mReturn;
}

function getMyerson(obj, isTop)
{
  var mReturn = "";
  mReturn += "Myerson (k): " + obj.Params[0].toFixed(6) + "<br>";
  mReturn += "Myerson (s): " + obj.Params[1].toFixed(6) + "<br>";
  mReturn += "Myerson AIC: " + obj.AIC.toFixed(6) + "<br>";
  mReturn += "Myerson BIC: " + obj.BIC.toFixed(6) + "<br>";
  mReturn += "Myerson RMS error: " + obj.RMSE.toFixed(6) + "<br>";
  mReturn += "Myerson avg error: " + obj.MSE.toFixed(6) + "<br>";
  mReturn += "<b>Myerson Probability: " + obj.Probability.toFixed(6) + "</b><br>";

  if (isTop)
  {
    mReturn += "<b>Myerson ln(ED50): " + obj.ED50.toFixed(6) + "</b><br>";
    mReturn += "<b>Myerson Area (Natural): " + obj.AUC.toFixed(6) + "</b><br>";
    mReturn += "<b>Myerson Area (Log10 Scale): " + obj.AUClog10.toFixed(6) + "</b><br>";
  }

  return mReturn;
}

function getRodriguezLogue(obj, isTop)
{
  var mReturn = "";
  mReturn += "Loewenstein & Prelec (k): " + obj.Params[0].toFixed(6) + "<br>";
  mReturn += "Loewenstein & Prelec (b): " + obj.Params[1].toFixed(6) + "<br>";
  mReturn += "Loewenstein & Prelec AIC: " + obj.AIC.toFixed(6) + "<br>";
  mReturn += "Loewenstein & Prelec BIC: " + obj.BIC.toFixed(6) + "<br>";
  mReturn += "Loewenstein & Prelec RMS error: " + obj.RMSE.toFixed(6) + "<br>";
  mReturn += "Loewenstein & Prelec avg error: " + obj.MSE.toFixed(6) + "<br>";
  mReturn += "<b>Loewenstein & Prelec Probability: " + obj.Probability.toFixed(6) + "</b><br>";

  if (isTop)
  {
    mReturn += "<b>Loewenstein & Prelec ln(ED50): " + obj.ED50.toFixed(6) + "</b><br>";
    mReturn += "<b>Loewenstein & Prelec Area (Natural): " + obj.AUC.toFixed(6) + "</b><br>";
    mReturn += "<b>Loewenstein & Prelec Area (Log10 Scale): " + obj.AUClog10.toFixed(6) + "</b><br>";
  }

  return mReturn;    
}

function getEbertPrelec(obj, isTop)
{
  var mReturn = "";
  mReturn += "Ebert & Prelec (k): " + obj.Params[0].toFixed(6) + "<br>";
  mReturn += "Ebert & Prelec (s): " + obj.Params[1].toFixed(6) + "<br>";
  mReturn += "Ebert & Prelec AIC: " + obj.AIC.toFixed(6) + "<br>";
  mReturn += "Ebert & Prelec BIC: " + obj.BIC.toFixed(6) + "<br>";
  mReturn += "Ebert & Prelec RMS error: " + obj.RMSE.toFixed(6) + "<br>";
  mReturn += "Ebert & Prelec avg error: " + obj.MSE.toFixed(6) + "<br>";
  mReturn += "<b>Ebert & Prelec Probability: " + obj.Probability.toFixed(6) + "</b><br>";

  if (isTop)
  {
    mReturn += "<b>Ebert & Prelec ln(ED50): " + obj.ED50.toFixed(6) + "</b><br>";
    mReturn += "<b>Ebert & Prelec Area (Natural): " + obj.AUC.toFixed(6) + "</b><br>";
    mReturn += "<b>Ebert & Prelec Area (Log10 Scale): " + obj.AUClog10.toFixed(6) + "</b><br>";
  }

  return mReturn;    
}

function getBleichrodt(obj, isTop)
{
  var mReturn = "";
  mReturn += "Beleichrodt et al. (b): " + obj.Params[2].toFixed(6) + "<br>";
  mReturn += "Beleichrodt et al. (k): " + obj.Params[0].toFixed(6) + "<br>";
  mReturn += "Beleichrodt et al. (s): " + obj.Params[1].toFixed(6) + "<br>";
  mReturn += "Beleichrodt et al. AIC: " + obj.AIC.toFixed(6) + "<br>";
  mReturn += "Beleichrodt et al. BIC: " + obj.BIC.toFixed(6) + "<br>";
  mReturn += "Beleichrodt et al. RMS error: " + obj.RMSE.toFixed(6) + "<br>";
  mReturn += "Beleichrodt et al. avg error: " + obj.MSE.toFixed(6) + "<br>";
  mReturn += "<b>Beleichrodt et al. Probability: " + obj.Probability.toFixed(6) + "</b><br>";

  if (isTop)
  {
    mReturn += "<b>Beleichrodt et al. ln(ED50): " + obj.ED50.toFixed(6) + "</b><br>";
    mReturn += "<b>Beleichrodt et al. Area (Natural): " + obj.AUC.toFixed(6) + "</b><br>";
    mReturn += "<b>Beleichrodt et al. Area (Log10 Scale): " + obj.AUClog10.toFixed(6) + "</b><br>";
  }

  return mReturn;
}

function getHeadingContent(obj, i)
{
  var mRef = getReference(i);

  var isTop = (i == 0);

  if (obj.Model == "Noise")
  {
    mRef.html(getNoise(obj, isTop));
  }
  else if (obj.Model == "Exponential")
  {
    mRef.html(getExponential(obj, isTop));
  }
  else if (obj.Model == "Hyperbolic")
  {
    mRef.html(getHyperbolic(obj, isTop));
  }
  else if (obj.Model == "Beta-Delta")
  {
    mRef.html(getQuasiHyperbolic(obj, isTop));
  }
  else if (obj.Model == "Green-Myerson")
  {
    mRef.html(getMyerson(obj, isTop));
  }
  else if (obj.Model == "Rachlin")
  {
    mRef.html(getRachlin(obj, isTop));
  }
  else if (obj.Model == "Loewstein-Prelec")
  {
    mRef.html(getRodriguezLogue(obj, isTop));
  }
  else if (obj.Model == "Ebert-Prelec")
  {
    mRef.html(getEbertPrelec(obj, isTop));
  }
  else if (obj.Model == "Beleichrodt")
  {
    mRef.html(getBleichrodt(obj, isTop));
  }
}

function clearChart()
{
    window.myChart.data.datasets = 
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
    ];

    window.myChart.options.scales.xAxes["0"].gridLines.display = false;
    window.myChart.options.scales.yAxes["0"].gridLines.display = false;       

    window.myChart.update(50, true);
}

function performMethods()
{
    var thing = $('#sheet').handsontable('getData');

    var mX = [];
    var mY = [];

    var mFinalDelay = -1;

    for (var i = 0; i < thing.length; i++)
    {
      var temp = thing[i];

      if ($.isNumeric(parseFloat(temp[0])) && $.isNumeric(parseFloat(temp[1])))
      {
        if (parseFloat(temp[0]) < 0)
        {
           alert('Please enter positive delay points.');

           return;
        }
        
        if (parseFloat(temp[1]) > 1)
        {
           alert('Please enter value points within 0-1.');

           return;
        }

        if (parseFloat(temp[0]) > mFinalDelay)
        {
          mFinalDelay = parseFloat(temp[0]);
        }

        mX.push(temp[0]);
        mY.push(temp[1]);
      }
    }

    worker.postMessage(
    {
        boundRachlin: $("#selectBound").prop('selectedIndex') == 1,
        maxIterations: 500,
        x: mX,
        y: mY
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

function getElementByModel(arr, value) 
{

  var result  = arr.filter(function(o){return o.Model == value;} );

  return result? result[0] : null;
}

function handleWorkerOutput(obj)
{
    if (obj.data.done)
    {
        $('#scoreBtn').text("Fit Models");
        $("#scoreBtn").attr("disabled", false);

        var mFinalDelay   = Math.max(...obj.data.x);
        var plotLast      = false;

        var noiseElement  = getElementByModel(obj.data.results, "Noise");
        var expElement    = getElementByModel(obj.data.results, "Exponential");
        var hypElement    = getElementByModel(obj.data.results, "Hyperbolic");
        var bdElement     = getElementByModel(obj.data.results, "Beta-Delta");
        var mgElement     = getElementByModel(obj.data.results, "Green-Myerson");
        var rachElement   = getElementByModel(obj.data.results, "Rachlin");
        var lpElement     = getElementByModel(obj.data.results, "Loewstein-Prelec");
        var epElement     = getElementByModel(obj.data.results, "Ebert-Prelec");
        var belElement    = getElementByModel(obj.data.results, "Beleichrodt");

        // Map points
        for (var i = 0; i < obj.data.x.length; i++)
        {
            window.myChart.data.datasets[9].data.push(
            {
                x: obj.data.x[i],
                y: obj.data.y[i]
            });
        }

        for (var i = 1; i <= mFinalDelay; )
        {
            window.myChart.data.datasets[0].data.push(
            {
                x: i, 
                y: parseFloat(noiseElement.Params[0])
            });

            if (expElement)
            {
                window.myChart.data.datasets[1].data.push(
                {
                    x: i, 
                    y: getExponentialProjection(i, expElement.Params)
                });
            }

            if (hypElement)
            {
                window.myChart.data.datasets[2].data.push(
                {
                    x: i, 
                    y: getHyperbolicProjection(i, hypElement.Params)
                });            
            }

            if (bdElement)
            {
                window.myChart.data.datasets[3].data.push(
                {
                    x: i, 
                    y: getQuasiHyperbolicProjection(i, bdElement.Params)
                });

            }

            if (mgElement)
            {
                window.myChart.data.datasets[4].data.push(
                {
                    x: i, 
                    y: getMyersonProjection(i, mgElement.Params)
                });            
            }

            if (rachElement)
            {
                window.myChart.data.datasets[5].data.push(
                {
                    x: i, 
                    y: getRachlinProjection(i, rachElement.Params)
                });            
            }

            if (lpElement)
            {
                window.myChart.data.datasets[6].data.push(
                {
                    x: i, 
                    y: getRodriguezLogueProjection(i, lpElement.Params)
                });              
            }

            if (epElement)
            {
                window.myChart.data.datasets[7].data.push(
                {
                    x: i, 
                    y: getEbertPrelecProjection(i, epElement.Params)
                });
            }

            if (belElement)
            {
                window.myChart.data.datasets[8].data.push(
                {
                    x: i, 
                    y: getbleichrodtProjection(i, belElement.Params)
                });              
            }

            if      (i > 0 && i <= 10) i = i + 1;
            else if (i > 10 && i <= 100) i = i + 10;
            else if (i > 100 && i <= 1000) i = i + 100;
            else if (i > 1000 && i <= 10000) i = i + 1000;
            else if (i > 10000 && i <= 100000) i = i + 10000;
            else if (i > 100000 && i <= 1000000) i = i + 100000;
            else if (i > 1000000 && i <= 10000000) i = i + 1000000;

            if (plotLast)
            {
                i = mFinalDelay + 1;
            }
            else if (i > mFinalDelay)
            {
                i = mFinalDelay;
                plotLast = true;
            }
        }

        $(".hiddenTitles").show();

        for (var i = 0; i < obj.data.results.length; i++)
        {
          getHeadingContent(obj.data.results[i], i);
        }

        window.myChart.update();
    }
    else
    {
        $('#scoreBtn').text(obj.data.msg);
    }
}

function initWorker()
{
    if (!window.Worker) 
    {
        alert("Please use a modern web-broswer with Web-Worker support");

        return;
    }

    worker = undefined;
    worker = new Worker('js/worker_discounting.js');
    worker.onmessage = handleWorkerOutput;

    $("#scoreBtn").attr("disabled", false);

    clearChart();
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

    $( "#scoreBtn" ).on('click', function()
    {
        clearChart();

        var thing = $('#sheet').handsontable('getData');

        var mX = [];
        var mY = [];

        var mFinalDelay = -1;

        for (var i = 0; i < thing.length; i++)
        {
            var temp = thing[i];

            if ($.isNumeric(parseFloat(temp[0])) && $.isNumeric(parseFloat(temp[1])))
            {
                if (parseFloat(temp[0]) < 0)
                {
                   alert('Please enter positive delay points.');
                   return;
                }
                
                if (parseFloat(temp[1]) > 1)
                {
                   alert('Please enter value points within 0-1.');
                   return;
                }

                if (parseFloat(temp[0]) > mFinalDelay)
                {
                    mFinalDelay = parseFloat(temp[0]);
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
    });

    $( "#loadSampleBtn" ).on('click', function()
    {
        $('#sheet').handsontable('setDataAtCell', 0, 0, "1");
        $('#sheet').handsontable('setDataAtCell', 1, 0, "30");
        $('#sheet').handsontable('setDataAtCell', 2, 0, "180");
        $('#sheet').handsontable('setDataAtCell', 3, 0, "540");
        $('#sheet').handsontable('setDataAtCell', 4, 0, "1080");
        $('#sheet').handsontable('setDataAtCell', 5, 0, "2160");
        $('#sheet').handsontable('setDataAtCell', 6, 0, "4320");
        $('#sheet').handsontable('setDataAtCell', 7, 0, "8640");
        $('#sheet').handsontable('setDataAtCell', 8, 0, "17280");

        $('#sheet').handsontable('setDataAtCell', 0, 1, "1.0");
        $('#sheet').handsontable('setDataAtCell', 1, 1, "0.9");
        $('#sheet').handsontable('setDataAtCell', 2, 1, "0.8");
        $('#sheet').handsontable('setDataAtCell', 3, 1, "0.7");
        $('#sheet').handsontable('setDataAtCell', 4, 1, "0.6");
        $('#sheet').handsontable('setDataAtCell', 5, 1, "0.5");
        $('#sheet').handsontable('setDataAtCell', 6, 1, "0.4");
        $('#sheet').handsontable('setDataAtCell', 7, 1, "0.3");
        $('#sheet').handsontable('setDataAtCell', 8, 1, "0.2");
    });

    $('#sheet').handsontable(
    {
        data: [["",""],["",""],["",""],
        ["",""],["",""],["",""],
        ["",""],["",""],["",""]],
        colHeaders: ['Delays', 'Values'],
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