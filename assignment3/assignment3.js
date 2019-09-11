function plot_it()  {

	// these are global layout parameters - width and height of plot, along with some padding to allow for plotting scales
	var width = 850, height = 750;
	d3.select('body').append('svg').attr('width', width).attr('height', height);
	var pad = 50;
	var actual_width = width-2*pad, actual_height = height-2*pad;

	// these are spatial layout and size parameters for the individual plots, which are to be used when constructing scales
	// Note: each plot will already be translated to its appropriate position within the svg element, so you only need to concern yourself
	// with the width/height parameters
	var scatter_x = 0, scatter_y = 0, scatter_width = actual_height/2, scatter_height = actual_height/2;
	var bar_x = 0, bar_y = scatter_height+pad, bar_width = scatter_width, bar_height = actual_height-scatter_height-3*pad;
	var min_r = 0.5, max_r = 7.0;

	// (optional UG / grad student) these are the layout parameters for the month-temperature plot
	var month_bar_x = scatter_width+pad, month_bar_y = 0, month_bar_width = width - month_bar_x - 3*pad, month_bar_height = scatter_height;

	// IMPORTANT: these are the groups which will contain your marks, accessible by the id name; namely:
	// * wind-temperature scatterplot (`windtemps`)
	// * wind-by-weather bar plot (`weatherwinds`)
	// * monthly temperature bar plot (`timetemps`)
	d3.select('svg').append('g').attr('transform', 'translate('+(pad+scatter_x)+','+(pad+scatter_y)+')').attr('id', 'windtemps')
	d3.select('svg').append('g').attr('transform', 'translate('+(pad+bar_x)+','+(pad+bar_y)+')').attr('id', 'weatherwinds')
	d3.select('svg').append('g').attr('transform', 'translate('+(pad+month_bar_x)+','+(pad+month_bar_y)+')').attr('id', 'timetemps')

	// data formatting: convert to floats where necessary, and construct time objects
	// the property `date` is a Date object, which you will use for accessing the month of a given date
	var time_parser = d3.timeParse('%Y-%m-%d')
	seattle_data.forEach(d => {
		d.date = time_parser(d.date);
		d.precipitation = +d.precipitation;
		d.temp_low = +d.temp_low;
		d.temp_high = +d.temp_high;
	});

	// TODO: our weather bar plots will be average wind speed, grouped by weather type.
	// Use `d3.nest` for this purpose, grouping by `weather`, and performing a `rollup` to compute the mean

	// (optional UG / grad student) TODO: our month bar plot will show the average of per-day lows and average of per-day highs, grouped by month.
	// Use `d3.nest` for this purpose, grouping by the month -> here, note that for a Date object you can access its month number (in the interval [0,11]) via method `getMonth`
	// You will need to return a somewhat more complicated object in your rollup function, computing and returning the average of low temps, and average of high temps

	// TODO: setup all of your scales
	// Note: the x scale for your scatterplot can be shared with the weather bar plot, and the y scale for your scatterplot can be shared with the monthly temperature bar plot
	// And don't forget the scale for your circle radii! (use the `min_r` and `max_r` above for the range)

	// (optional UG / grad student) TODO: setup your scale for months
	// Note: you will need to construct an array where each object is a Date object, containing the ordered months
	// There is a simple way to do this using the data returned by your nest from above and the built-in `map` function




	// TODO: create the scatterplot, for wind speed (x) and average day temperature (y)
	// First: add a rectangle that fills up the entire spatial range of the plot, with a fill of '#f2f2f2'

	// Next, perform a data join with `seattle_data`, creating new circles, and appropriately setting their attributes (from the above scales)
	// This means the `cx`, `cy`, and `r` attributes are a function of your data. You should also set the `fill` (color) and `opacity` ([0,1]) attributes to
	// constant values that will help better read the visualization

	// Plot your scales: a scale on the bottom axis, and a scale on the left axis

	// And last, label your axes


	// TODO: create the bar plot, for wind speed (x) and weather type (y)
	// First: add a rectangle that fills up the entire spatial range of the plot, with a fill of '#f2f2f2'

	// Next, perform a data join with the result of your nest, creating new rects, and appropriately setting their attributes (from the above scales)

	// Plot your scales: a scale on the bottom axis, and a scale on the left axis

	// And last, label your axes


	// TODO: create the bar plot, for month (x) and temperature spans (y)
	// First: add a rectangle that fills up the entire spatial range of the plot, with a fill of '#f2f2f2'

	// Next, perform a data join with the result of your nest, creating new rects, and appropriately setting their attributes (from the above scales)
	// Recall: the band scale should be composed of Date objects in its domain, so we need to pass in a Date object given the month, with arbitrary year/day

	// Plot your scales: a scale on the bottom axis, and a scale on the left axis

	// And last, label your axes

}
