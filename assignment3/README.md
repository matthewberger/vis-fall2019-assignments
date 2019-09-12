# Assignment 3

## Objectives

* Introduction to D3:
	* scales
	* nesting data
	* data joins
	* plotting scales with axes
	* labeling axes

## Description

In this assignment we will be working with the same type of data as in the previous assignment, creating similar visualization designs. Except this time, we are starting from scratch: the _actual_ raw data, and using D3 exclusively for visualization.

The data corresponds to weather measurements over Seattle, each day, for several years. Each object in the array, `seattle_data`, has the following properties:

* `temp_low`: the low temperature for the day (treat as quantitative)
* `temp_high`: the high temperature for the day (treat as quantitative)
* `wind`: the wind speed for a given day (treat as quantitative)
* `weather`: the name of the weather (treat as nominal, namely a string)

Your objective is to produce two plots:

* A scatterplot that consists of the following:
	* The x-axis corresponds to `wind`
	* The y-axis corresponds to `temperature` -- in particular, each circle's y coordinate should correspond to the average of `temp_low` and `temp_high`
	* The radius of the circle corresponds to the _difference_ of the high and low temperature
* A bar plot that consists of the following:
	* The x-axis corresponds to `wind`, averaged over all days specific to each value of `weather`
	* The y-axis corresponds to `weather`

Similar to the previous assignments, each plot will belong to its own group.

The assignment is broken up into four small chunks.

## Data Preprocessing

For the bar plot, note that the data is not in the format as discussed above. We still need to compute the average! To achieve this, we use [d3.nest](https://github.com/d3/d3-collection#nest). More specifically, you should perform a nest on `seattle_data`, and group-by field `weather`. You will then perform a `rollup`, and specify an anonymous function that computes the mean for each given subset of data that corresponds to a unique weather. This will return an array of objects, where each object has a `key` (being the nominal weather) and `value` (being the quantitative mean).

## Setting up Scales

Next, you will set up your scales using D3 -- a scale for each visual channel in each plot. This should look pretty similar to the previous assignment. The scale for the circle radius should be a [square root scale](https://github.com/d3/d3-scale#scaleSqrt).

Note: the scale computed for `wind` can be shared between the two plots.

## Create scatterplot

To create the scatterplot, first, you should create a rectangle that fills up the entire spatial range of the plot. This will help make clear the spatial area in which our scatterplot resides.

After this, perform a data join on `seattle_data` to create `circle` elements for each item in `seattle_data`, using the scales that you previously constructed to position the points and set the circle radii. You should, additionally, set the circle's `fill` (color) and `opacity` (value from [0,1]) to constant values that will help in reading the visualization. **Note**: make sure that your circles are contained completely within the plot -- you may find it useful to expand the domain in your positional scales a bit to achieve this.

Next, you should plot your scales. This should correspond to a `d3.axisBottom` for your x scale, and `d3.axisLeft` for your y scale. You should first add a group element to the plot, set an attribute "transform" with an appropriate translation, and then finally, use `call` to generate elements for the scale's axis.

And last, you should label your axes. You will need to add a single text element for the x-axis and a single text element for the y-axis. Note that the text element for the y-axis should be rotated by 270 degrees, so that it is positioned vertically.

## Create bar plot

To create the bar plot, first, you should create a rectangle that fills up the entire spatial range of the plot. This will help make clear the spatial area in which our bar plot resides.

After this, perform a data join on the data structure returned by nest, mentioned above, to create `rect` elements for each item, using the scales that you previously constructed to position the rectangles, using the band scale's "bandwidth" for the bar height. Note: you should be using the `key` and `value` properties of the nest data structure.

Last, you should plot your scales and label your axes, in a similar manner as above, corresponding to a `d3.axisBottom` and `d3.axisLeft`.

## Undergraduate Extra Credit (10 points) / Graduate Student Requirement

For this portion of the assignment, you will be expected to produce one more additional plot. Specifically, we would like to see the average low, and average high, temperature for each month in our data. Hence, one additional property in the data is `date`: this is a [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) object, consisting of day, month, and year. The objective is to produce a type of bar plot where the bars are now unaligned, consisting of the following:

* The x-axis corresponds to month, which you should treat as ordinal
* In the y-axis, the bottom of the bar should correspond to the average low for a given month (averaged over all days and years in the month)
* In the y-axis, the top of the bar should correspond to the average high for a given month (averaged over all days and years in the month)

Similar to the above bar plot, you will need to create a nest object as well, grouping-by month, but here you must compute _both_ the average low and average high temperature and return this in an object that you will reference later when you plot the data.

You will also create a band scale for month, in positioning the bars along the x-axis: here, the domain should be a sorted list of `Date` objects corresponding to each month. You may set the day and year for each of these Date objects as arbitrary, since we will only be using month.

The quantitative scale that you used in the scatterplot for temperature may be used here as well.

You will then perform a data join on this nest object, creating `rect` elements, where the `y` attribute should be the average high (top of the bar), and the height should correspond to the difference between the average high and average low.

Last, you should plot your scales and label your axes, in a similar manner as above, corresponding to a `d3.axisBottom` and `d3.axisLeft`.

One small caveat with your band scale: you will want to do a bit of formatting to the axis, to ensure that it produces human-readable months rather than indices of months. You should use the [tickFormat](https://github.com/d3/d3-axis#axis_tickFormat) function of an axis object, formatting according to [timeFormat](https://github.com/d3/d3-time-format) with an abbreviated month format.

## Submission

Please zip up the folder for this assignment, name it `last_name`-`first_name`-assignment3.zip, where `last_name` and `first_name` should be replaced with your last and first name, respectively, and submit it to Brightspace.

The assignment is due September 18, 11:59:59 PM.

## Undergraduate Grading Criteria

* Correctly nesting data (10%)
* Correctly creating and setting up scales (10%)
* Wind-Temperature scatterplot (40%)
	* Create background rectangle, correctly perform data join and create circle elements (10%)
	* Correctly setting up x/y/radius attributes (10%)
	* Setting fill/opacity attributes so that scatterplot is readable (5%)
	* Correctly creating and adding axes to plot (10%)
	* Setting text labels to each axis (5%)
* Weather-Wind bar plot (40%)
	* Create background rectangle, correctly performing data join and create rectangle elements (10%)
	* Correctly setting up x/y/width/height attributes (15%)
	* Correctly creating and adding axes to plot (10%)
	* Setting text labels to each axis (5%)

## Graduate Student Grading Criteria

* Correctly nesting data (10%)
* Correctly creating and setting up scales (10%)
* Wind-Temperature scatterplot (35%)
	* Create background rectangle, correctly performing data join and create circle elements (10%)
	* Correctly setting up x/y/radius attributes (5%)
	* Setting fill/opacity attributes so that scatterplot is readable (5%)
	* Correctly creating and adding axes to plot (10%)
	* Setting text labels to each axis (5%)
* Weather-Wind bar plot (30%)
	* Create background rectangle, correctly performing data join and create rectangle elements (10%)
	* Correctly setting up x/y/width/height attributes (10%)
	* Correctly creating and adding axes to plot (5%)
	* Setting text labels to each axis (5%)
* Month-Temperature bar plot (15%)
	* Correctly nesting data (5%)
	* Create background rectangle, correctly perform data join, add rectangle elements, set their attributes (5%)
	* Correctly creating and adding axes to plot, setting text labels to axes (5%)
