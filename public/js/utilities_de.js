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

var generator;
var random;

/* Const for BIC/AIC */
var M_PI = 3.14159265358979323846;

/* DE Heuristics */ 
var populationSize = 1000;
var populationAgents = [];
var populationAgentsCost = [];

/* DE Parameters */ 
var mutationFactor = 0.8;
var crossoverRate = 0.9;

/* Comparison Holders */
var lowestRecordedCost = Number.MAX_VALUE;
var lowestLossIndex = 0;

/* Data, Settings */
var xValues, yValues, yValuesBak;
var maxits;

var boundsU = [];
var boundsL = [];

var boundUpper, boundLower, hiP, loP;

/* Calculate and assign AIC */
function CalculateAIC(result)
{
    var N = xValues.length;
    var DF = result.Params.length + 1;
    var SSR = result.MSE * N;

    result.AIC = N + N * Math.log(2 * M_PI) + N * Math.log(SSR/N) + 2 * (DF);
}

/* Calculate and assign BIC */
function CalculateBIC(result)
{
    var N = xValues.length;
    var DF = result.Params.length + 1;
    var SSR = result.MSE * N;

    result.BIC = N + N * Math.log(2 * M_PI) + N * Math.log(SSR/N) + Math.log(N) * (DF);
}

/* Shell of fx for calculating model costs */
function costFunctionShell(inputs, func)
{
    var val = 0.0;
    var tempDelay, tempValue;

    var temp;

    for (var j = 0; j < xValues.length; j++)
    {
        tempDelay = xValues[j];
        tempValue = yValues[j];

        temp = tempValue - func(inputs, tempDelay);

        val = val + (temp * temp);
    }

    val = val / parseFloat(xValues.length);

    return val;
}

/* Check if values are within limits */
function checkConstraints(par, low, upp)
{
	for (var i = 0; i < par.length; i++)
	{
		if (par[i] > upp[i]) return true;

		if (par[i] < low[i]) return true;
	}

	return false;
}

/* Get best population agent */
function GetBestAgent() { return populationAgents[lowestLossIndex]; }

/* Get best population agent cost */
function GetBestCost() { return populationAgentsCost[lowestLossIndex]; }

/* DE Methods */
function Optimize(costFunc)
{
    populationAgents = new Array(populationSize);
    populationAgentsCost = new Array(populationSize);

    for ( var i = 0; i < populationSize; i++)
    {
        populationAgents[i] = new Array(boundsU.length);

        for ( var j = 0; j < boundsU.length; j++)
            populationAgents[i][j] = random.real(boundsL[j], boundsU[j]);
    }

    for ( var i = 0; i < populationSize; i++)
    {
        populationAgentsCost[i] = costFunctionShell(populationAgents[i], costFunc);

        if (populationAgentsCost[i] < lowestRecordedCost)
        {
            lowestRecordedCost = populationAgentsCost[i];
            lowestLossIndex = i;
        }
    }

    for ( var i = 0; i < maxits; i++)
        ProcessGeneration(costFunc, boundsU.length);
}

/*.Iterate through agents and apply MF/CR */
function ProcessGeneration(costFunc, nParams)
{
    var minCost = populationAgentsCost[0];
    var bestAgentIndex = 0;

    for (var x = 0; x < populationSize; x++)
    {
        var a = x;
        var b = x;
        var c = x;

        while (a == x || b == x || c == x || 
        	   a == b || a == c || b == c)
        {
            a = random.integer(0, populationSize - 1);
            b = random.integer(0, populationSize - 1);
            c = random.integer(0, populationSize - 1);
        }

        var z = new Array(nParams);
        for (var i = 0; i < nParams; i ++)
            z[i] = populationAgents[a][i] + mutationFactor * (populationAgents[b][i] - populationAgents[c][i]);

        var R = random.integer(0, nParams - 1);

        var r = new Array(nParams);

        for (var i = 0; i < nParams; i++)
            r[i] = random.real(0, 1);

        var newX = new Array(nParams);

        for (var i = 0; i < nParams; i++)
        {
            if (r[i] < crossoverRate || i == R)
                newX[i] = z[i];
            else
                newX[i] = populationAgents[x][i];
        }

        if (checkConstraints(newX, boundsL, boundsU))
        {
            x--;

            continue;
        }

        var newCost = costFunctionShell(newX, costFunc);

        if (newCost < populationAgentsCost[x])
        {
            populationAgents[x] = newX;
            populationAgentsCost[x] = newCost;
        }

        if (populationAgentsCost[x] < minCost)
        {
            minCost = populationAgentsCost[x];
            bestAgentIndex = x;
        }
    }

    lowestRecordedCost = minCost;
    lowestLossIndex = bestAgentIndex;
}