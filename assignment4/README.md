# Assignment 4

## Objectives

* Introduction to stacking data, namely heterogeneous data.
* Introduction to nested data joins.
* Exposure to more sophisticated geometric constructions of graphical marks.

## Description

The objective of this assignment is to produce a rather specific type of visualization: a stacked and diverging bar plot. In this visualization, we use bar marks to encode quantitative data, where a single data item has multiple quantitative attributes. Each attribute will be mapped to a unique bar, and the data item itself is comprised of its set of bars. This corresponds to the "stacked" part, the "diverging" part corresponds to the fact that the attributes will be split into 2 groups, where bars will be stacked per-group, and there will exist a shared baseline between the groups such that one group of bars will be positioned along one direction (e.g. positive x), and the other group will be positioned in the opposite direction (e.g. negative x).

The data for this assignment corresponds to NBA player statistics from the 2016-2017 season (courtesy [Kaggle](https://www.kaggle.com/acasalan/nba-player-stats-201718)). Each data item (in array `nba_data`) is a player, and each player has the following attributes (set as properties of each object in the array):

* 'Name': the player's name (nominal)
* 'Salary': the player's salary for this season (quantitative)
* 'Block': average number of blocks made per game (quantitative)
* 'Assist': average number of assists made per game (quantitative)
* 'Steal': average number of steals made per game (quantitative)
* 'Two_Points': average number of two pointers made per game (quantitative)
* 'Three_Points': average number of three pointers made per game (quantitative)

Additionally, the data has already been sorted by player salary, in increasing order. Thus, we would like to use this visualization to understand how salaries might correspond to certain player statistics.

Your objective is to produce a stacked and diverging bar plot, where the above attributes should be split into the following two groups:

* 'Activities': this groups the 'Block', 'Assist', and 'Steal' attributes
* 'Points': this groups the 'Two_Points' and 'Three_Points' attributes

Bars will be horizontally aligned, and consequently, the visualization should show one player per row. In each row, bars corresponding to the 'Activities' group should be stacked going from right-to-left, and bars corresponding to the 'Points' group should be stacked going from left-to-right. Specifically, 'Block' and 'Two Pointer' should share a common baseline.

In addition, you will encode 'Salary' with a bar that is aligned to the left, shown as semi-transparent in the background of the player name.

Please see the following illustration for reference:

![alt text](https://github.com/matthewberger/vis-fall2019-assignments/blob/master/assignment4/illustration.jpg "Target Visualization")

This illustration represents a single player: the visualization will be comprised of all players, positioned vertically (from top to bottom).

In the above, **bold** names correspond to variables that have been already computed for you. Specifically, `diverging_bar_pos` is the shared baseline between the two groups of bars, where _two pointers_ and _three pointers_ are stacked to the right, while _blocks_, _assists_, and _steals_ are stacked to the left. The length of the combined 'Points' bars should not exceed `points_width`, and similarly the length of the combined 'Activities' bars should not exceed `activities_width`. The textured patterns in each bar merely indicate that they are distinct rectangles -- it is your responsibility to assign appropriate colors for each bar.

You will be responsible for completing the following tasks:

## Setting up Scales

You will first need to compute your scales. You should treat each attribute as being distinct in its data domain, and thus attributes cannot share scales. Therefore, you must compute a scale for each individual attribute. Each should be a linear scale, where the minima and maxima of all of the attributes have been computed for you, and can be found in objects `all_mins` and `all_maxs`, each having properties corresponding to the property names in `nba_data`. The range of each scale should be representing **length**, as we will be mapping attributes to the lengths of bars. Thus, the range should have a minimum length (provided as `min_bar`) and a maximum length. The maximum length should uniformly divide the space in which each attribute resides, and should be based on `activities_width` and `points_width`, which have been computed for you, and respectively represent the total width for the bars related to activities and the total width for the bars related to points (see above illustration).

You will also need a linear scale for `Salary`, whose max range should be `name_bar_pos`. Additionally, you will need to create a band scale to map a player's name to a y position. Here you should use the `actual_height` variable for your range. Using this scale should result in players with highest salary on top, and lowest salary at the bottom.

## Data Preprocessing

You will next need to use [d3.stack](https://github.com/d3/d3-shape#stacks) to derive a stacked data structure, one stack for each group ('Activities' and 'Points'). Recall that stack will organize our array of objects into a 3D array, where:
* Each object in the returned array corresponds to each property specified in `keys`. For instance, for 'Points', this would be an array for each of 'Two_Points' and 'Three_Points'. Further, each object has an accompanying `key` property, corresponding to the specific name of the key.
* Each object in the inner array corresponds to each data item, e.g. each player. This will have an additional array that corresponds to a pair of lower/upper values corresponding to the baseline, and the topline, for the particular property and item. This is the result of the cumulative sum of values along each of the groups (e.g. Activities or Points). Further, each object has an accompanying `data` property, corresponding to the original object in the `nba_data` array.

It is recommended to inspect the data structure returned by stacking in the console, so that you can be confident about its format.

Note that stack will simply accumulate the values in our array in computing the baseline/topline quantities. However, our data attributes are heterogeneous - summing up a property of 'Block' and property of 'Assist' does not make sense. Thus, what we need to do is **apply the appropriate scale when stacking**, so that stacking is computed on a homogeneous visual range. You can realize this through the [value function](https://github.com/d3/d3-shape#stack_value).

## Color

You will need to assign a color to each bar, where the specific color is a function of the data attribute (not the data value). More specifically:
* You should treat `Salary`, `Block`, `Assist`, and `Steal` as nominal data. So, your colors should ensure discrimination between these categories in the visualization. Further, you should choose colors such that their perceived lightness (luminance) is moderate (not too dark, not too bright).
* You should treat `Two_Points`, `Three_Points` as ordinal data. So, the two colors should be based on a perceptually-meaningful channel that encodes order.

## Player names and salaries

Next, you will need to perform a data join, on `nba_data`, in order to display the individual player names for each row, as well as encode their salaries through bar marks, where bars are aligned at the left (as shown in the above illustration). A group, with id 'player', has been created for you, and you should add your visual elements to this group. More specifically, your visualization should consist of the following (created in the following order):
* A rectangle for each player, that spans the full width of the view, and a fill of '#ddd' for odd indices, while a fill of '#fff' for even indices
* A rectangle that encodes the salary for each player. It is suggested to set the opacity to some value < 1, so that this bar blends in nicely with the above background rectangle. You should set its `fill` to its appropriate color.
* A text element for each player, positioned at the start of the left side of the view, where you should use the property 'Name' provided in `nba_data` to specify the text. You should use the band scale to position each text element's y position.

## Stacked bars for Points

You will then create stacked bar elements for the Points group of attributes. This will require performing a nested data join, specifically, two data joins:
* The first data join will be performed on the data structure returned by `d3.stack` A group element should be created for each data item (each of the 2 attributes).
* The second data join will simply pass along each inner array, corresponding to the array of players per property. You will create a rectangle for each data item in this array, using the band scale to compute the y position and height, and using the baseline/topline produced from stack to set the x position and width.

You should also set the fill of each bar to its appropriate color, based on the specific attribute (`Block`, `Assist`, `Steal`).

## Stacked bars for Activities

You will last create stacked bar elements for the Activities group of attributes. This will also require performing a nested data join, specifically, two data joins:
* The first data join will be performed on the data structure returned by `d3.stack` A group element should be created for each data item (each of the 3 attributes).
* The second data join will simply pass along each inner array, corresponding to the array of players per property. A similar process described above will be done to position each rectangle. However, note that the bars should be positioned going from right-to-left. Thus, you must carefully consider where the x coordinate should be positioned.

You should also set the fill of each bar to its appropriate color, based on the specific attribute (`Two_Points`, `Three_Points`).

## Extra Credit (5 points)

As described above, bars will be produced where adjacent bars will be right next to each other. This is not the most effective way to visually convey the different attribute types. Recall the Gestalt law of Enclosure: we have the ability to distinguish visual elements through boundary cues, even boundaries that are incomplete. To take advantage of this property, what we may do is insert a small amount of **padding** between bars, so that the boundary of a bar is more distinct.

To this end, create a variable called `bar_pad`, that contains the amount of padding (in pixels) to provide between bars. It is your responsibility to set the positions, and sizes, of rectangles such that this padding is achieved.

Due to the nature of stacking, this is a bit more nontrivial than you might think at first glance! You should carefully consider how the stacking geometry is constructed, and subsequently used, and how to incorporate the notion of padding in each of these stages.

## Hint

* Note what is returned by `d3.stack`: a `key` property for each of the data attributes, as well as `data` property for each player. You will need to access these properties when setting the attributes of your marks.
* You might find that setting the bar colors is a bit tricky. However, recall that we are creating a group element for each attribute, and that group elements can be used for more than just transformations - any attribute set on a group element _propagates_ to the children...

## Submission

Please zip up the folder for this assignment, name it `last_name`-`first_name`-assignment4.zip, where `last_name` and `first_name` should be replaced with your last and first name, respectively, and submit it to Brightspace.

The assignment is due October 4, 11:59:59 PM.

## Grading Criteria

* Correctly creating and setting up scales (10%)
* Correctly stacking data (both stacks) (10%)
* Proper color design for individual attributes (10%)
* Visualization of player names and salaries (20%)
	* Properly creating and setting text elements that displays names (5%)
	* Populating rectangles that span the full width of the plot, alternating in color (5%)
	* Visually encoding player salary bars (10%)
* Diverging and stacked bars for Points (25%)
	* Nested data join to create rectangles (5%)
	* Using the stack data to set rectangle geometry (15%)
	* Properly setting color for each bar (5%)
* Diverging and stacked bars for Activities (25%)
	* Nested data join to create rectangles (5%)
	* Using the stack data to set rectangle geometry (15%)
	* Properly setting color for each bar (5%)
