# Assignment 1

## Objectives

* Introduction to programming with Javascript.
* Using Javascript to populate the DOM given a dataset.
* Introduction to the basic SVG elements we will use to create graphical marks: groups, circles, rectangles, and lines, as well as how to set their attributes.

## Description

This assignment is about the most basic technique for designing data visualizations: using the 2D plane to position graphical marks. Provided is a dataset consisting of a list of **point** marks, and a list of **bar** marks. Each of these lists contains their _2D positions_, relative to pre-specified **group elements** that already exist in the DOM, in addition to other attributes specific to the mark, namely the _radius_ and _fill color_ for points, and the _width_, _height_, and _fill color_ for bars.

You will work in `assignment1.js`. Within `index.html`, point and bar marks will be read in as arrays `points_data` and `bars_data`, respectively. The function `plot_it` is what will be executed from `index.html`. In this function, you will be expected to populate the DOM from the given data, using helper functions that have been provided, and filling in TODO stubs placed for guidance.

More specifically, you will create [SVG circle elements](https://www.w3schools.com/graphics/svg_circle.asp) for point marks, and [SVG rectangle elements](https://www.w3schools.com/graphics/svg_rect.asp) for bar marks. This requires the following:
* The creation of the element.
* Modifying that element's attributes.
* Adding the element to an existing group element. There already exist group elements for the point and bar marks that you should use for this purpose.

In setting attributes for circles, each object in `points_data` has the following properties that you should directly use:
* _cx_: the x coordinate of the circle's center
* _cy_: the y coordinate of the circle's center
* _r_: the radius of the circle
* _fill_: the fill color for the circle

Likewise, each object in `bars_data` has the following properties that you should directly use:
* _x_: the x coordinate of the rectangle's corner
* _y_: the y coordinate of the rectangle's corner
* _width_: the width of the rectangle
* _height_: the height of the rectangle
* _fill_: the fill color for the rectangle

Note that the property names directly correspond to the SVG elements' attribute names. For each circle/rectangle created, it should be added as a child to its corresponding **group**, namely `point_group` and `bar_group`, respectively.

## Undergraduate Extra Credit (10 points) / Graduate Student Requirement

In addition to simple mark types (circles, rectangles), we can also represent more complicated data using **composite marks**, where a single data item is composed of multiple primitive graphical marks. To this end, you will be responsible for creating a certain type of composite mark, namely a **box plot**. The data can be found in `boxes_data`. Your objective is to represent each composite mark as a single group element, where simple marks -- namely lines and a rectangle -- are added as children to this group element. Once the group element has been properly set up, you are then to add this group element to the appropriate box group, analogous to how we previously added points and rectangles to the point group and rectangle group, respectively.

More specifically, each object of `boxes_data` is comprised of the following properties:
* _translate_: this specifies how much to translate in the x axis for the composite mark, and its group element's `transform` attribute should be set to this translation
* _fullrange_: an object, that corresponds to a line that will extend vertically
* _min_: an object, that corresponds to a horizontal line that will be drawn on the bottom
* _max_: an object, that corresponds to a horizontal line that will be drawn on the top
* _quartiles_: an object, that corresponds to a rectangle that will represent the inner range of a distribution
* _median_: an object, that corresponds to a horizontal line that will be drawn in the center (the median of the distribution)

To create an [SVG line element](https://www.w3schools.com/graphics/svg_line.asp), you will need to fill in the appropriate TODO stub in the code, where an object corresponding to a line has the following properties:
* _x1_: the x-coordinate of the starting position
* _y1_: the y-coordinate of the starting position
* _x2_: the x-coordinate of the ending position
* _y2_: the y-coordinate of the ending position
* _stroke_: the stroke color of the line
* _stroke-width_: the line thickness

## Undergraduate Grading Criteria

* Scatterplot (50%)
	* Adding circles to appropriate group (15%)
	* Correctly setting position (15%)
	* Correctly setting radius (10%)
	* Correctly setting fill (10%)
* Bar plot (50%)
	* Adding rectangles to appropriate group (15%)
	* Correctly setting position (15%)
	* Correctly setting width and height (10%)
	* Correctly setting fill (10%)
* Box plot (10%)
	* Setting up group element (2%)
	* Correctly creating/setting rectangle mark (3%)
	* Correctly creating/setting line marks (5%)

## Graduate Student Grading Criteria

* Scatterplot (40%)
	* Adding circles to appropriate group (10%)
	* Correctly setting position (10%)
	* Correctly setting radius (10%)
	* Correctly setting fill (10%)
* Bar plot (40%)
	* Adding rectangles to appropriate group (10%)
	* Correctly setting position (10%)
	* Correctly setting width and height (10%)
	* Correctly setting fill (10%)
* Box plot (20%)
	* Setting up group element (5%)
	* Correctly creating/setting rectangle mark (5%)
	* Correctly creating/setting line marks (10%)
