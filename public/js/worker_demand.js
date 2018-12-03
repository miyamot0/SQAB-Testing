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
self.importScripts('utilities_demand.js');
self.importScripts('utilities_de.js');

var boundUpper, boundLower, hiP, loP;

var setK = null;

function beginLooper(obj)
{
    var returnObj = {};

    if (obj.Exponential)
    {
    	if (obj.KFit)
    	{
		    boundsU = [ hiP*2,  Math.pow(10, -1),   Math.log10(hiP)];
		    boundsL = [ 1,      Math.pow(10, -10),  0.5];

		    Optimize(costFunctionExponentialWithK);
    	}
    	else
    	{
	    	if (obj.KValue)
	    	{
	    		setK = parseFloat(obj.SetK);
	    	}
	    	else if (obj.KLogRange)
	    	{
	    		setK = Math.log10(hiP) - 
	    			   Math.log10(loP) + 0.5;
	    	}

		    boundsU = [ hiP*2,  Math.pow(10, -1)];
		    boundsL = [ 1,      Math.pow(10, -10)];

		    Optimize(costFunctionExponential);
    	}
    }

    if (obj.Exponentiated)
    {
    	if (obj.KFit)
    	{
		    boundsU = [ hiP*2,  Math.pow(10, -1),   Math.log10(hiP)];
		    boundsL = [ 1,      Math.pow(10, -10),  0.5];

		    Optimize(costFunctionExponentiatedWithK);
    	}
    	else
    	{
	    	if (obj.KValue)
	    	{
	    		setK = parseFloat(obj.SetK);
	    	}
	    	else if (obj.KLogRange)
	    	{
	    		setK = Math.log10(hiP) - 
	    			   Math.log10(loP) + 0.5;
	    	}

		    boundsU = [ hiP*2,  Math.pow(10, -1)];
		    boundsL = [ 1,      Math.pow(10, -10)];

		    Optimize(costFunctionExponentiated);
    	}
    }

    returnObj = 
    {
        Model: getModelTag(obj),
        FitK: obj.KFit,
        SetK: setK,
        Params: GetBestAgent(),
        MSE: GetBestCost(),
        RMSE: Math.sqrt(GetBestCost()),
    };

    CalculateAIC(returnObj);
    CalculateBIC(returnObj);
	CalculateHurshPmax(returnObj);

    postMessage({
        done: true,
        results: returnObj,
        SetK: setK,
        x: xValues,
        y: yValuesBak,
        Exponential: obj.Exponential,
        Exponentiated: obj.Exponentiated,
        KFit: obj.KFit
    });
}

onmessage = function(passer)
{
    generator      = Random.engines.mt19937().seed(123);
    random         = new Random(generator);
    maxits         = passer.data.maxIterations;
    xValues        = passer.data.x;
    yValues        = passer.data.y.slice();
    yValuesBak	   = passer.data.y.slice();

    for (var i = 0; i < yValues.length; i++)
    {
	    if (passer.data.Linear)
	    	yValues[i] = Math.log(yValues[i]);
	    else if (passer.data.Exponential)
	    	yValues[i] = Math.log10(yValues[i]);
    }

    hiP = Math.max(...passer.data.y);
    loP = Math.min(...passer.data.y);

    postMessage({ done: false, msg: "Fitting Demand Model" });

    beginLooper(passer.data);
}