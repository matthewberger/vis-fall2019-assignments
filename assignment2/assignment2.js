function create_dom_element(element_name)  {
	return document.createElementNS('http://www.w3.org/2000/svg', element_name);
}

function get_single_element_by_name(element_name)  {
	return document.getElementsByTagName(element_name)[0];
}

// TODO: create and return a circle element from the given `temp_datum` object, which has 2 properties:
// `temp_low`: the low temperature for a given day
// `temp_high`: the high temperature for a given day
// You should use `scale_x` to compute the x coordinate given `temp_low`, and `scale_y` to compute the y coordinate given `temp_high`
// Furthermore, set the 'r' and 'fill' attributes of the circle to 2 and '#555', respectively
function create_circle_element(temp_datum, scale_x, scale_y)  {
}

// (optional UG / grad student) TODO: create and return a circle element from the given `temp_datum` object, which has 3 properties:
// `temp_low`: the low temperature for a given day
// `temp_high`: the high temperature for a given day
// `wind`: the wind speed reading for a given day
// You should use `scale_x` to compute the x coordinate given `temp_low`, `scale_y` to compute the y coordinate given `temp_high`,
// and `wind` to compute the radius given `wind`
// Furthermore, set the 'fill' attribute of the circle to '#555'
function create_sized_circle_element(temp_datum, scale_x, scale_y, scale_r)  {
}

// TODO: create and return a rectangle element from the given `weather_datum` object, which has 2 properties:
// `weather`: the name of a type of weather
// `temp`: the expected temperature for the weather
// You should use `scale_x` to compute the x coordinate and width given `weather, and `scale_y` to compute the y coordinate and height given `temp`
// Furthermore, set the 'fill' attribute of the circle to '#555'
function create_rect_element(weather_datum, scale_x, scale_y)  {
}

function scaleLinear()  {
	var domain=[0,1], range=[0,1];

	// TODO: given `x` which lives in the interval of `domain`, transform it into the `range` interval using a linear scale
	function scale(x)  {
		var normalized_x = (x-domain[0])/(domain[1]-domain[0]);
		return (1-normalized_x)*range[0] + normalized_x*range[1];
	}

	scale.domain = function(domain_arr)  {
		domain[0] = domain_arr[0];
		domain[1] = domain_arr[1];
		return scale;
	}

	scale.range = function(range_arr)  {
		range[0] = range_arr[0];
		range[1] = range_arr[1];
		return scale;
	}

	return scale;
}

function scaleBand()  {
	var domain=[0,1], range=[0,1];
	var paddingInner = 0.0, paddingOuter = 0.0;
	var step = 0.0;

	// TODO: given `x` which belongs to one of the elements in `domain`, transform it into the `range`, and return this amount
	function scale(x)  {
	}

	// TODO: assume that the domain, range, paddingInner, and paddingOuter have been set by the user, compute the `step` variable
	function compute_padding()  {
	}

	// TODO: return the width of a band, in units of `range`
	scale.bandwidth = function()  {
	}

	scale.domain = function(domain_arr)  {
		domain = [];
		for(var i = 0; i < domain_arr.length; i++)
			domain.push(domain_arr[i]);
		compute_padding();
		return scale;
	}

	scale.range = function(range_arr)  {
		range[0] = range_arr[0];
		range[1] = range_arr[1];
		compute_padding();
		return scale;
	}

	scale.paddingInner = function(inner_param)  {
		paddingInner = inner_param;
		compute_padding();
		return scale;
	}

	scale.paddingOuter = function(outer_param)  {
		paddingOuter = outer_param;
		compute_padding();
		return scale;
	}

	return scale;
}

function plot_it()  {
	var svg_element = get_single_element_by_name('svg');

	var temp_group = create_dom_element('g');
	temp_group.setAttribute('transform', 'translate(40,40)');
	var weather_group = create_dom_element('g');
	weather_group.setAttribute('transform', 'translate(40,560)');

	svg_element.appendChild(temp_group);
	svg_element.appendChild(weather_group);

	// You will need to use these when setting the scale ranges below. Note that for positional scales, marks constructed will be _relative_ to their parent group transformations
	// assume a minimum value of 0 for all ranges (except for radius)
	var scatterplot_width = 520, scatterplot_height = 480;
	var barplot_width = 220, barplot_height = 200, bar_inner_pad = 0.4, bar_outer_pad = 0.2;
	var min_radius = 1.5, max_radius = 4;

	// NOTE: temp_data is an array of objects, where each object has fields `temp_low`, `temp_high`, and `wind`.
	// NOTE: weather_data is an array of objects, where each object has fields `weather` (name of weather) and `temp` (expected temperature for given weather)

	// TODO: for `temp_low` and `temp_high` (temp_data), compute the minima and maxima of these individual fields, and construct scales accordingly - all linear scales
	// For the UG bonus / grad students, also set up your scale that maps wind to circle radius

	// TODO: for the weather data (weather_data), extract the names of the different types of weather, compute the maximum over all temperatures, and
	// construct scales accordingly - a band scale for `weather`, and a linear scale for `temp`
	// NOTE: since we are using bar marks, for the y scale, set the domain minimum to be 0

	// TODO: create circle marks for `temp_data` using the scales you constructed above, producing a scatterplot - add all marks to `temp_group`
	// NOTE: if mapping wind to radius, then use `create_sized_circle_element` ONLY; otherwise, use `create_circle_element`

	// TODO: create rectangle marks for `weather_data` using the scales you constructed above, producing a bar plot - add all marks to `weather_group`
}
