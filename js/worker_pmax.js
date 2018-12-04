var running = false;

var currentRow = 0;
var lastRow = 0;
var looper = 0;

var sheetData = null;
var tempData = null;

var Q, A, K, oldPmax;

// num (object)  : value in cell
// Return (bool) : Determine if these are actually numbers
function isValidNumber(num)
{
	return !isNaN(parseFloat(num));
}

/*
  Q (float) : Fitted Q0
  A (float) : Fitted alpha
  K (float) : Fitted/derived constant K
*/
function renderOriginalPmax(Q, A, K) 
{
  return (1/(Q * A * (Math.pow(K, 1.5)))) * (0.083 * K + 0.65);
}

function beginLooper()
{
	running = true;

	while (running && (currentRow < lastRow))
	{
		tempData = sheetData[currentRow];

		// Check, are these as they should be?
		Q = parseFloat(tempData[0]);
		A = parseFloat(tempData[1]);
		K = parseFloat(tempData[2]);

		if (isValidNumber(Q) && isValidNumber(A) && isValidNumber(K))
		{
			// Hursh approx
			oldPmax = renderOriginalPmax(Q, A, K);

			// Gilroy et al, (In testing)
			lambertResult = gsl_sf_lambert_W0_e(-1/Math.log(Math.pow(10,K)));

			postMessage({
				row: currentRow,
				passed: true,
				approx: oldPmax,
				lambertConverge: lambertResult.success,
				lambertValue: -lambertResult.val,
				Q: Q,
				A: A,
				K: K,
				exact: (-lambertResult.val/(A*Q)),
				done: false
			});
		}
		else
		{
			postMessage({
				row: currentRow,
				passed: false,
				approx: '---',
				exact: '---',
				done: true
			});

			running = false;
		}

		currentRow++;
	}

	postMessage({
		done: true
	});
}

onmessage = function(passer)
{
	sheetData = passer.data.data;
	lastRow = passer.data.data.length;

	beginLooper();
}

// ===========================================================================

/*
  lambertw by protobi
  Source: https://github.com/protobi/lambertw

  Javascript port of the Lambert W function from the GNU Scientific Library
  Original Source: https://www.gnu.org/software/gsl/

  Licensed by the General Public License - Version 3
*/

const GSL_DBL_EPSILON = 2.2204460492503131e-16;
const one_over_E = 1 / Math.E;

function halley_iteration(x, w_initial, max_iters) {
  var w = w_initial, i;

  var result = {};

  for (i = 0; i < max_iters; i++) {
    var tol;
    var e = Math.exp(w);
    var p = w + 1.0;
    var t = w * e - x;

    if (w > 0) {
      t = (t / p) / e;
      /* Newton iteration */
    } else {
      t /= e * p - 0.5 * (p + 1.0) * t / p;
      /* Halley iteration */
    }

    w -= t;

    tol = GSL_DBL_EPSILON * Math.max(Math.abs(w), 1.0 / (Math.abs(p) * e));

    if (Math.abs(t) < tol) {
      return {
        val: w,
        err: 2.0 * tol,
        iters: i,
        success: true
      }
    }
  }
  /* should never get here */

  return {
    val: w,
    err: Math.abs(w),
    iters: i,
    success: false
  }
}

/* series which appears for q near zero;
 * only the argument is different for the different branches
 */
function series_eval(r) {
  const c = [
    -1.0,
    2.331643981597124203363536062168,
    -1.812187885639363490240191647568,
    1.936631114492359755363277457668,
    -2.353551201881614516821543561516,
    3.066858901050631912893148922704,
    -4.175335600258177138854984177460,
    5.858023729874774148815053846119,
    -8.401032217523977370984161688514,
    12.250753501314460424,
    -18.100697012472442755,
    27.029044799010561650];

  const t_8 = c[8] + r * (c[9] + r * (c[10] + r * c[11]));
  const t_5 = c[5] + r * (c[6] + r * (c[7] + r * t_8));
  const t_1 = c[1] + r * (c[2] + r * (c[3] + r * (c[4] + r * t_5)));
  return c[0] + r * t_1;
}

/*-*-*-*-*-*-*-*-*-*-*-* Functions with Error Codes *-*-*-*-*-*-*-*-*-*-*-*/
function gsl_sf_lambert_W0_e(x) {
  const one_over_E = 1.0 / Math.E;
  const q = x + one_over_E;

  var result = {};

  if (x == 0.0) {
    result.val = 0.0;
    result.err = 0.0;
    result.success = true;

    return result;
  }
  else if (q < 0.0) {
    /* Strictly speaking this is an error. But because of the
     * arithmetic operation connecting x and q, I am a little
     * lenient in case of some epsilon overshoot. The following
     * answer is quite accurate in that case. Anyway, we have
     * to return GSL_EDOM.
     */
    result.val = -1.0;
    result.err = Math.sqrt(-q);
    result.success = false; // GSL_EDOM

    return result;
  }
  else if (q == 0.0) {
    result.val = -1.0;
    result.err = GSL_DBL_EPSILON;
    /* cannot error is zero, maybe q == 0 by "accident" */
    result.success = true;

    return result;
  }
  else if (q < 1.0e-03) {
    /* series near -1/E in sqrt(q) */
    const r = Math.sqrt(q);
    result.val = series_eval(r);
    result.err = 2.0 * GSL_DBL_EPSILON * Math.abs(result.val);
    result.success = true;

    return result;
  }
  else {
    const MAX_ITERS = 100;
    
    var w;

    if (x < 1.0) {
      /* obtain initial approximation from series near x=0;
       * no need for extra care, since the Halley iteration
       * converges nicely on this branch
       */
      const p = Math.sqrt(2.0 * Math.E * q);
      w = -1.0 + p * (1.0 + p * (-1.0 / 3.0 + p * 11.0 / 72.0));
    }
    else {
      /* obtain initial approximation from rough asymptotic */
      w = Math.log(x);
      if (x > 3.0) w -= Math.log(w);
    }

    return halley_iteration(x, w, MAX_ITERS, result);
  }
}

function gsl_sf_lambert_W0(x)
{
  return gsl_sf_lambert_W0_e(x).val;
}
