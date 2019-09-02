# Assignment 2

## Objectives

* Introduction to working with data in Javascript.
* Introduction to anonymous functions and closures.
* The creation, and use, of scales, in order to map from a given data domain to a user-constructed visual range

## Description

In the previous assignment, you were provided the **visual range** of the graphical marks, in particular, their spatial positions and spatial extents. However, in data visualization, we are rarely given such data. Instead, we start from raw data, and it is our responsibility to map from the **data domain** to the **visual range**. We achieve this using **scales**.

The objective of this assignment is to replicate the scatterplot and bar plot from Assignment 1, given actual data. In particular, the data corresponds to weather-based measurements. There are two arrays of data that you will be using:

* `temp_data`: an array of objects, where each object represents a given day, and has fields:
	* `temp_low`: the low temperature for the day (treat as quantitative)
	* `temp_high`: the high temperature for the day (treat as quantitative)
* `weather_data`: an array of objects, where each object represents a given type of weather, and has fields:
	* `weather`: the name of the weather (treat as nominal, namely a string)
	* `temp`: the expected temperature for the given type of weather (treat as quantitative)

The assignment is broken up into three small chunks.

## Creating Scales

Your first objective is to create an object for a **linear** scale, and an object for a **band** scale.

For the linear scale, code has been provided to set/get the `domain` (an array of two elements, the min and max of quantitative data), and the `range` (also an array of two elements, the min and max). It is your responsibility to implement the `scale` function: map from the domain to the range.

For the band scale, code has been provided to set/get the `domain` (an array of elements, for nominal/ordinal data), the `range` (also an array of two elements, the min and max), `paddingInner` (a float corresponding to the percentage to inner pad bands), and `paddingOuter` (a float corresponding to the percentage to outer pad bands). It is your responsibility to complete the following:

* `compute_padding`: set the `step` variable, namely, the spacing (in the units of `range`) between consecutive bands.
* `bandwidth`: return the width of a band, in units of `range`
* `scale`: given an element of the `domain`, return its corresponding (continuous) value in the `range`. This should be the starting position of the band for the element.

The above terminology follows from D3's definition of a band scale, see the following diagram:

![Band Scale](https://raw.githubusercontent.com/d3/d3-scale/master/img/band.png "Band Scale")

## Setting up Scales

Your next objective is to create the above scales, given your data.

In particular, you will create individual linear scales for the x and y spatial positions for the `temp_low` and `temp_high` fields in `temp_data`, respectively. You will also create a band scale for the x spatial position using the `weather` field in `weather_data`, as well as a linear scale for the y position using the `temp` field in `weather_data`.

The creation of a scale requires knowledge of the extents of the domain and range. The range extents are provided to you. It is your responsibility to compute the domain extents for each scale - namely, the minimum and maximum for linear scales, and all unique elements for the band scale. **Note**: for the bar mark, ensure that the minimum data value for `temp` is 0 when constructing the scale.

## Using Scales

Once the scales have been set up, your last step is to use the scales. To this end, you will build off of the previous assignment's creation of graphical marks. Given an individual datum, and corresponding spatial scales for the x and y axes, you will populate the specified mark (`circle` or `rect`), mapping each datum's field to the appropriate visual range.

## Undergraduate Extra Credit (10 points) / Graduate Student Requirement

The `temp_data` array actually has one more field: `wind`, corresponding to the wind speed for a given day. We would like to visualize the wind speed using the scatterplot, but we have used up our spatial variables! What to do?

We will turn to our other visual channels, and map `wind` to **size**, namely the radius of the circle. One may be tempted to use a linear scale to map from `wind` to radius. However, we do not perceive variations in radius, but rather, **area**. Hence, we should use a **square root** scale instead, to ensure our visual mapping adheres to our perception. To this end, you are expected to do the following:

* Copy and paste the linear scale object as a new object, and call it `scaleSqrt`. In the function `scale`, implement a **square root** scale.
* Setup and construct this scale for the `wind` field.
* Use this scale to assign a radius to each circle. You should replace `create_circle_element` with `create_sized_circle_element`.

## Suggestions

* Recall that the SVG coordinate system's origin begins at the upper-left. However, we typically read quantitative values in a visualization assuming that the minimum value is at the bottom-left. Thus, the y-axis needs to be reflected: the minimum of your domain should map to the maximum of your range, and vice versa. There is a very simple way of handling this in how you set up your scale's range.
* Computing the height for a bar is a bit tricky: you need to know the _minimum_ of the range to compute the appropriate difference. Also be aware of the above point...
* Computing minima and maxima from specific fields from objects in an array can be easily accomplished with D3 using [min](https://github.com/d3/d3-array#min) and [max](https://github.com/d3/d3-array#max), respectively, or both with one call using [extent](https://github.com/d3/d3-array#extent). You also need a way to extract all unique strings from `weather`, and set them in an array to construct our ordinal scale (we tend to treat nominal data as ordinal when encoding with space, not without its issues).

## Undergraduate Grading Criteria

* Scales (20%)
	* Correct implementation of linear scale (10%)
	* Correct implementation of band scale (10%)
* Scatterplot (40%)
	* Compute extents (min and max) for each data attribute (10%)
	* Correctly setup the scales (20%)
	* Create circle elements, set their attributes using data and scales, add to appropriate group element (10%)
* Bar plot (40%)
	* Compute extents (min and max) for each data attribute (10%)
	* Correctly setup the scales (20%)
	* Create rect elements, set their attributes using data and scales, add to appropriate group element (10%)

## Graduate Student Grading Criteria

* Scales (15%)
	* Correct implementation of linear scale (7.5%)
	* Correct implementation of band scale (7.5%)
* Scatterplot (35%)
	* Compute extents (min and max) for each data attribute (10%)
	* Correctly setup the scales (15%)
	* Create circle elements, set their attributes using data and scales, add to appropriate group element (10%)
* Bar plot (35%)
	* Compute extents (min and max) for each data attribute (10%)
	* Correctly setup the scales (15%)
	* Create rect elements, set their attributes using data and scales, add to appropriate group element (10%)
* Size visual channel (15%)
	* Correct implementation of square root scale (5%)
	* Correctly setting up scale (includes computing extents) (5%)
	* Correctly creating/setting attributes/adding circle elements to appropriate group element (5%)
