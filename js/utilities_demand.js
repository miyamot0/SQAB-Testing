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

function costFunctionExponential(inputs, cost)
{
	return Math.log10(inputs[0]) + setK * (Math.exp(-inputs[1] * inputs[0] * cost) - 1);
}

function costFunctionExponentialWithK(inputs, cost)
{
	return Math.log10(inputs[0]) + inputs[2] * (Math.exp(-inputs[1] * inputs[0] * cost) - 1);
}

function costFunctionExponentiated(inputs, cost)
{
    return inputs[0] * Math.pow(10, (setK * (Math.exp(-inputs[1] * inputs[0] * cost) - 1) ));
}

function costFunctionExponentiatedWithK(inputs, cost)
{
    return inputs[0] * Math.pow(10, (inputs[2] * (Math.exp(-inputs[1] * inputs[0] * cost) - 1) ));
}

function CalculateHurshPmax(result)
{
	var k = (result.FitK) ? result.Params[2] : result.SetK;

	result.HurshPmax = (1/(result.Params[0] * result.Params[1] * Math.pow(k, (1.5)))) * (0.083 * k + 0.65);
}

function getModelTag(obj)
{
	var tag = (obj.Exponential) ? "Exponential" : "Exponentiated";

	tag = (obj.KFit) ? tag + " w/ K" : tag + " w/o K";

	return tag;
}