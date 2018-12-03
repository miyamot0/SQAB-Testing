
/* Differential Evolution, Helpers */
function costFunctionNoise(inputs, delay) { return inputs[0]; }
function costFunctionExponential(inputs, delay) { return Math.exp(-Math.exp(inputs[0]) * delay); }
function costFunctionHyperbolic(inputs, delay) { return (1 / (1 + Math.exp(inputs[0]) * delay)); }
function costFunctionBetaDelta(inputs, delay) { return InvIt(inputs[0]) * Math.pow(InvIt(inputs[1]), delay); }
function costFunctionGreenMyerson(inputs, delay) { return 1 / Math.pow((1 + Math.exp(inputs[0]) * delay), Math.exp(inputs[1])); }
function costFunctionRachlin(inputs, delay) { return Math.pow((1 + Math.exp(inputs[0]) * Math.pow(delay, Math.exp(inputs[1]))), -1); }
function costFunctionGeneralizedHyperbolic(inputs, delay) { return Math.pow((1 + delay * Math.exp(inputs[0])),(-(Math.exp(inputs[1]) / Math.exp(inputs[0])))); }
function costFunctionEbertPrelec(inputs, delay) { return Math.exp(-Math.pow((Math.exp(inputs[0])*delay), Math.exp(inputs[1]))); }
function costFunctionBeleichrodt(inputs, delay) { return (InvIt(inputs[2]) * Math.exp(-Math.exp(inputs[0]) * Math.pow(delay, Math.exp(inputs[1])))); }

/* Invert Transform */
function InvIt(value) { return Math.exp(value) / (Math.exp(value) + 1); }

/* Calculate and assign Bayes Factor */
function CalculateBF(result, noiseBic) { result.BF = Math.exp(-0.5 * (result.BIC - noiseBic)); }

/* Calculate and assign Probability */
function CalculateProbabilities(result, bayesSum) { result.Probability = result.BF / bayesSum; }

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

/* Re-scale wonky model parameters */
function restoreBeleichrodt(result)
{
    var replacementArray = new Array(3);

    replacementArray[0] = Math.exp(result.Params[0])
    replacementArray[1] = Math.exp(result.Params[1])
    replacementArray[2] = InvIt(result.Params[2])

    result.Params = replacementArray;
}

/* Sort by model probability */
function SortResults(a, b) 
{
  if (a.Probability < b.Probability)
    return 1;

  if (a.Probability > b.Probability)
    return -1;

  return 0;
}

/* Routing for ED50, by model */
function CalculateED50(obj, lowerX, upperX)
{
    var fitter = undefined;

    if (obj.Model == "Noise")
    {
        obj.ED50 = Number.NaN;

        return;
    }
    else if (obj.Model == "Exponential")
    {
        obj.ED50 = Math.log(Math.log(2)/obj.Params[0]);

        return;
    }
    else if (obj.Model == "Hyperbolic")
    {
        obj.ED50 = Math.log(1/(obj.Params[0]));

        return;
    }
    else if (obj.Model == "Beta-Delta")
    {
        obj.ED50 = Math.log(Math.log((1/(2*obj.Params[0])))/Math.log(obj.Params[1]));

        return;
    }
    else if (obj.Model == "Green-Myerson")
    {
        obj.ED50 = Math.log((Math.pow(2,(1/obj.Params[1]))-1)/obj.Params[0]);

        return;
    }
    else if (obj.Model == "Rachlin")
    {
        obj.ED50 = Math.log(Math.pow((1/(obj.Params[0])), (1/obj.Params[1])));

        return;
    }
    else if (obj.Model == "Loewstein-Prelec")
    {
        fitter = function(k, x) { return Math.pow((1 + x * k[0]),(-k[1] / k[0])); }
    }
    else if (obj.Model == "Ebert-Prelec")
    {
        fitter = function(k, x) { return Math.exp(-Math.pow((k[0] * x), k[1])); }
    }
    else if (obj.Model == "Beleichrodt")
    {
        fitter = function(k, x) { return k[2] * Math.exp(-k[0] * Math.pow(x, k[1])); }
    }

    obj.ED50 = empiricalED50Process(fitter, obj.Params, upperX);
}

/* Manual Hueristic for determining ED50 */
function empiricalED50Process(fitFunction, params, upperX) 
{
    var lowDelay = 0;
    var highDelay = upperX * 100;
    var i = 0;

    while ( (highDelay - lowDelay) > 0.001 && i < 100) 
    {
        var lowEst  = fitFunction( params, lowDelay);
        var midEst  = fitFunction( params, (lowDelay + highDelay) / 2);
        var highEst = fitFunction( params, highDelay);

        if ( lowEst > 0.5 && midEst > 0.5) 
        {
            //Above 50% mark range
            lowDelay  = (lowDelay+highDelay)/2;
            highDelay = highDelay;

        } 
        else if ( highEst < 0.5 && midEst < 0.5) 
        {
            //Below 50% mark range
            lowDelay  = lowDelay;
            highDelay = (lowDelay+highDelay)/2;
        }

        i++;
    }

    return Math.log((lowDelay+highDelay)/2);
}

/* Math.js */
function integrate(func, start, end, stepSize) 
{
  var area = 0;

  stepSize = stepSize || 0.01;

  for (var x = start; x < end; x += stepSize) 
    area += func(x + stepSize / 2) * stepSize;

  return area;
}

math.import({
   integrate: integrate
})

/* END Math.js */

/* Routing for MB-AUC, by model */
function CalculateAUC(obj, lowerX, upperX)
{
    var fitter = undefined;

    if (obj.Model == "Noise")
    {
        obj.AUC = parseFloat(obj.Params[0]);

        return
    }
    else if ( obj.Model == "Exponential")
        fitter = function(x) { return Math.exp(-obj.Params[0] * x); }
    else if ( obj.Model == "Hyperbolic")
        fitter = function(x) { return 1/(1 + obj.Params[0] * x); }
    else if ( obj.Model == "Beta-Delta")
        fitter = function(x) { return obj.Params[0] * Math.exp(-(1.0-obj.Params[1]) * x); }
    else if ( obj.Model == "Green-Myerson")
        fitter = function(x) { return 1/Math.pow((1 + obj.Params[0]*x), obj.Params[1]); }
    else if ( obj.Model == "Rachlin")
        fitter = function(x) { return Math.pow((1+obj.Params[0]*(Math.pow(x,obj.Params[1]))),(-1)); }
    else if ( obj.Model == "Loewstein-Prelec")
        fitter = function(x) { return Math.pow((1 + x * obj.Params[0]),(-obj.Params[1] / obj.Params[0])); }
    else if ( obj.Model == "Ebert-Prelec")
        fitter = function(x) { return Math.exp(-Math.pow((obj.Params[0]*x), obj.Params[1])); }
    else if ( obj.Model == "Beleichrodt")
        fitter = function(x) { return obj.Params[2] * Math.exp(-(obj.Params[0] * Math.pow(x,obj.Params[1]))); }

    var area = math.integrate( fitter, lowerX, upperX);
    obj.AUC = area / (upperX - lowerX);
}

/* Routing for MB-AUC, by model */
function CalculateAUClog10(obj, lowerX, upperX)
{
    var fitter = undefined;

    if ( obj.Model == "Noise")
    {
        obj.AUClog10 = parseFloat(obj.Params[0]);

        return
    }
    else if ( obj.Model == "Exponential")
        fitter = function(x) { return Math.exp(-obj.Params[0] * Math.pow(10, x)); }
    else if ( obj.Model == "Hyperbolic")
        fitter = function(x) { return 1/(1 + obj.Params[0] * Math.pow(10, x)); }
    else if ( obj.Model == "Beta-Delta")
        fitter = function(x) { return obj.Params[0] * Math.exp(-(1.0-obj.Params[1]) * Math.pow(10, x)); }
    else if ( obj.Model == "Green-Myerson")
        fitter = function(x) { return 1/Math.pow((1 + obj.Params[0]*Math.pow(10, x)), obj.Params[1]); }
    else if ( obj.Model == "Rachlin")
        fitter = function(x) { return Math.pow((1+obj.Params[0]*(Math.pow(Math.pow(10, x),obj.Params[1]))),(-1)); }
    else if ( obj.Model == "Loewstein-Prelec")
        fitter = function(x) { return Math.pow((1 + Math.pow(10, x) * obj.Params[0]),(-obj.Params[1] / obj.Params[0])); }
    else if ( obj.Model == "Ebert-Prelec")
        fitter = function(x) { return Math.exp(-Math.pow((obj.Params[0]*Math.pow(10, x)), obj.Params[1])); }
    else if ( obj.Model == "Beleichrodt")
        fitter = function(x) { return obj.Params[2] * Math.exp(-(obj.Params[0] * Math.pow(Math.pow(10, x), obj.Params[1]))); }

    if (lowerX <= 1)
    {
        lowerX = Math.log10(1);
        upperX = Math.log10((upperX + 1));
    }

    var area = math.integrate( fitter, lowerX, upperX);
    obj.AUClog10 = area / (upperX - lowerX);
}