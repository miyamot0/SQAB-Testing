/*
   Copyright 2018 Shawn Gilroy

   This file is part of Demand Curve Analyzer, web port.

   Demand Curve Analyzer is free software: you can redistribute it and/or modify
   it under the terms of the GNU General Public License as published by
   the Free Software Foundation, version 3.

   Demand Curve Analyzer is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU General Public License for more details.

   You should have received a copy of the GNU General Public License
   along with Demand Curve Analyzer.  If not, see http://www.gnu.org/licenses/.
*/

self.importScripts('random.min.js');
self.importScripts('math.min.js');
self.importScripts('utilities_discounting.js');
self.importScripts('utilities_de.js');

var boundedRachlin;

function beginLooper(obj)
{
    var returnArray = [];

    // Noise Model
    boundsL = [ 0 ];
    boundsU = [ 1 ];
    Optimize(costFunctionNoise);
        var noiseResult = {
            Model: "Noise",
            Params: [parseFloat(GetBestAgent())],
            MSE: GetBestCost(),
            RMSE: Math.sqrt(GetBestCost()),
            done: false
        };

        returnArray.push(noiseResult);

        postMessage({ done: false, msg: "Calculating Exponential" });

    // Exponential Model
    boundsL = [ -50 ];
    boundsU = [  50 ];
    Optimize(costFunctionExponential);
        var expResult = {
            Model: "Exponential",
            Params: [Math.exp(GetBestAgent())],
            MSE: GetBestCost(),
            RMSE: Math.sqrt(GetBestCost()),
            done: false
        };

        returnArray.push(expResult);

        postMessage({ done: false, msg: "Calculating Hyperbolic" });

    // Hyperbolic Model
    boundsL = [ -50 ];
    boundsU = [  50 ];
    Optimize(costFunctionHyperbolic);
        var hypResult = {
            Model: "Hyperbolic",
            Params: [Math.exp(GetBestAgent())],
            MSE: GetBestCost(),
            RMSE: Math.sqrt(GetBestCost()),
            done: false
        };

        returnArray.push(hypResult);

        postMessage({ done: false, msg: "Calculating Beta-Delta" });

    // Beta-Delta Model
    boundsL = [ -1000, -1000 ];
    boundsU = [   500,   500 ];
    Optimize(costFunctionBetaDelta);
        var bdResult = {
            Model: "Beta-Delta",
            Params: GetBestAgent().map(function(obj) { return InvIt(obj) }),
            MSE: GetBestCost(),
            RMSE: Math.sqrt(GetBestCost()),
            done: false
        };

        returnArray.push(bdResult);

        postMessage({ done: false, msg: "Calculating Green-Myerson" });

    // Green-Myerson Model
    boundsL = [ -50, -50 ];
    boundsU = [  50,  50 ];
    Optimize(costFunctionGreenMyerson);
        var gmResult = {
            Model: "Green-Myerson",
            Params: GetBestAgent().map(function(obj) { return Math.exp(obj) }),
            MSE: GetBestCost(),
            RMSE: Math.sqrt(GetBestCost()),
            done: false
        };

        returnArray.push(gmResult);

        postMessage({ done: false, msg: "Calculating Rachlin" });

    // Rachlin Model
    boundsL = [ -50, -50 ];
    boundsU = [  50,  50 ];
    Optimize(costFunctionRachlin);
        var rachResult = {
            Model: "Rachlin",
            Params: GetBestAgent().map(function(obj) { return Math.exp(obj) }),
            MSE: GetBestCost(),
            RMSE: Math.sqrt(GetBestCost()),
            done: false
        };

    if (!boundedRachlin || (boundedRachlin && (rachResult.Params[1] <= 1 && rachResult.Params[1] >= 0)))
        returnArray.push(rachResult);

    postMessage({ done: false, msg: "Calculating Loewstein-Prelec" });

    // Ebert-Prelec
    boundsL = [ -100, -100 ];
    boundsU = [  100,  100 ];
    Optimize(costFunctionGeneralizedHyperbolic);
        var lpResult = {
            Model: "Loewstein-Prelec",
            Params: GetBestAgent().map(function(obj) { return Math.exp(obj) }),
            MSE: GetBestCost(),
            RMSE: Math.sqrt(GetBestCost()),
            done: false
        };

        returnArray.push(lpResult);

    postMessage({ done: false, msg: "Calculating Ebert-Prelec" });

    // Ebert-Prelec
    boundsL = [ -10, -10 ];
    boundsU = [  10,  10 ];
    Optimize(costFunctionEbertPrelec);
        var epResult = {
            Model: "Ebert-Prelec",
            Params: GetBestAgent().map(function(obj) { return Math.exp(obj) }),
            MSE: GetBestCost(),
            RMSE: Math.sqrt(GetBestCost()),
            done: false
        };

        returnArray.push(epResult);

    postMessage({ done: false, msg: "Calculating Beleichrodt et al." });

    // Ebert-Prelec
    boundsL = [ -100, -100, -100 ];
    boundsU = [  100,  100,  100 ];
    Optimize(costFunctionBeleichrodt);
        var belResult = {
            Model: "Beleichrodt",
            Params: GetBestAgent(),
            MSE: GetBestCost(),
            RMSE: Math.sqrt(GetBestCost()),
            done: false
        };

        restoreBeleichrodt(belResult)

        returnArray.push(belResult);

        postMessage({ done: false, msg: "Calculating Supplemental Measures" });

    // Information Criteria
    for (var i = 0; i < returnArray.length; i++)
    {
        CalculateAIC(returnArray[i]);
        CalculateBIC(returnArray[i]);
    }

    var bfSum = 0;

    // Bayes factors
    for (var i = 0; i < returnArray.length; i++)
    {
        CalculateBF(returnArray[i], returnArray[0].BIC);

        bfSum = bfSum + returnArray[i].BF;
    }

    // Model probabilities
    for (var i = 0; i < returnArray.length; i++)
    {
        CalculateProbabilities(returnArray[i], bfSum);
    }

    returnArray.sort(SortResults);  

    var loX = Math.min(...xValues.map(Number))
    var hiX = Math.max(...xValues.map(Number))

    CalculateAUC(returnArray[0], loX, hiX);
    CalculateAUClog10(returnArray[0], loX, hiX);
    CalculateED50(returnArray[0], loX, hiX);

    // Fire completed event
    postMessage({
        done: true,
        results: returnArray,
        x: xValues.map(Number),
        y: yValues.map(Number)
    });
}

onmessage = function(passer)
{
    generator      = Random.engines.mt19937().seed(123);
    random         = new Random(generator);
    maxits         = passer.data.maxIterations;
    xValues        = passer.data.x;
    yValues        = passer.data.y;
    boundedRachlin = passer.data.boundRachlin;

    postMessage({ done: false, msg: "Calculating Noise" });

    beginLooper(passer.data);
}