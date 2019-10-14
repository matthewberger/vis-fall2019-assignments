# Assignment 5

## Objectives

* Visually encoding data with line marks and heatmaps.
* Introduction to linked and coordinated views.
* Transitions between views.

## Description

The objective of this assignment is to design an interactive visualization that can help us analyze a word-level neural language model. Specifically, we will analyze a recurrent neural network (in particular a long short-term memory (LSTM) model) that has been trained to predict a word given a preceding sequence of words. The data that we will be visualizing are the individual activations of the (last) hidden state produced at each word in a given sentence - the higher the value, the stronger the activation at a given word. We would like our visualization to help us answer the following questions:

* How do hidden state activations correspond to certain linguistic features, e.g. nouns, verbs, adjectives, etc..?
* What word subsequences tend to have high activations?
* Are there particular words (punctuation, rare words) that result in strange behavior?
* How do the activations change for different sentences?

The visualization design for this assignment is inspired by [LSTMVis](https://arxiv.org/pdf/1606.07461.pdf). Please see below for specifics.

## Data

The data that you will be working with are hidden states in a recurrent neural network. You can think of this as sequential data: words are ordered by their position in the sentence, and for each word, we are provided a high-dimensional vector, which you can think of as a set of quantitative values, and each dimension corresponds to a value for each word. The data that you will be responsible for visualizing will be populated in two variables (both of which have global scope):

* `sentence`: an array that consists of a sequence of words (array of strings).
* `lstm_states`: a 2D array of numbers, where the outer array corresponds to each dimension of the hidden state vector, and the inner array corresponds to each word (ordered).

Code has already been provided to populate these variables, and in particular, _they can change_: you can select different sentences, and corresponding sequences of hidden state vectors, through the drop-down menu, and your visualization should update in response to this change.

## Visual Encodings

You will be responsible for two types of visual encodings

* **Line plot:** you will create a set of line marks, one for each object in `lstm_states`, where each mark corresponds to a single dimension of the hidden state vector, and this will be plotted against words. In other words, for a single mark: y-axis corresponds to the activation value for a single dimension, and x-axis corresponds to the sentence (sequence of words). As the x-axis should encode each word in the sentence, an appropriate scale here is `d3.scalePoint` for uniform spacing. However, you cannot use the array of words (`sentence`) for your domain, as words can repeat in a sentence! So you will need to create an alternative domain, one that is ordered, and thus allows you to identify each element in the domain with its corresponding word. Additionally, when displaying the scale via `d3.axisBottom`, you will need to map each element in the data domain to its appropriate word for proper display, which you can achieve by specifying an anonymous function in [d3.tickFormat](https://github.com/d3/d3-axis#axis_tickFormat).
* **Heatmap:** you will create a heatmap to encode the _similarity_ between all pairs of words via their hidden state vectors. This will require you to derive a new array of data which contains the similarity of each pair of words. Similarity here refers to the **dot product** between vectors. Specifically, for two words, you will gather the hidden state values for all dimensions, and then compute the sum of the products between these corresponding values. The derived dot products will then be visually encoded via a heatmap, where the x and y axes both represent words, and the color represents the dot product between the words' hidden states at a given row and column. You should devise an appropriate color scale for encoding quantitative data. In addition, you should also create text elements to label rows, where each word is positioned on the left side of your heatmap - you can do this manually via a data join, or alternatively, use an ordinal scale (point or band).

The line plot (path elements) should be added as children to a group element already created for you, with id name "lines", and the heatmap (rect elements) should be added as children to a group element already created for you, with id name "hm". Additionally, your x and y axes should be added as children to groups with ids "xaxis" and "yaxis", respectively.

## Interactions

The fundamental interaction that your visualization should support is the ability to highlight a subset of line marks, and customize their appearance to indicate that they are highlighted. The way that this should be done is as follows:

* The user should be able to: (a) select a set of words, and (b) set a threshold with regard to activation value (y-axis).
* A line is determined to be "selected" if its activation values at all of the words (a) is above the threshold (b).

In your visualization, there are three basic types of interactions that you will need to implement to support this:

* **Word Brushing:** a [d3.brushX](https://github.com/d3/d3-brush#brushX) object has been created for you, in variable `brush`, and whose geometric extents already set. You will need to setup a "brush" event on your `brush` variable, and determine what words lie in the interval of your brush. Recall that `d3.axis` generates text elements for us, and data (e.g. domain of your point scale) is bound to these elements - this, in conjunction with the point scale, allows us to access the (center) x position of each word, which you should use for the interval check. You could also compute word x positions beforehand, via the point scale, rather than invoking `Selection`/`each`. Upon obtaining the words, you should update their appearance, and consequently, update the appearance of the line marks. Note: you should _also_ make sure to update the appearance of words no longer selected.
* **Adjusting the Threshold:** a horizontal line element has been created for you, with id "lines", on which you will need to add a dragging behavior: if the user presses the mouse button down on the horizontal line, and moves the mouse, the line should move with the mouse. As the line is moving, the threshold should also update, as should the selection of line marks. This sounds complicated, but fortunately D3 handles this for us with [d3.drag](https://github.com/d3/d3-drag), where you need to simply invoke `call` on the `Selection` of the line, and pass in a `d3.drag` object. For this drag object, you need to specify an event listener for the "drag" event. Within the anonymous function that you specify for this event, you can acces the mouse position via `d3.mouse(this)`, and use the y-coordinate (2nd element of array) to update the y position of the line, as well as the threshold itself. One last note: you should call the `raise` function on the line `Selection` to ensure that it is _above_ your line marks, and thus, selectable with your mouse.
* **Heatmap Cell Selection:** you will also need to link your heatmap view with your line marks view, via the selection of _word pairs_ that correspond to a given cell. So, when a user hovers over the cell of a rectangle, you should update the appearance of the rectangle, and you should update the selected words used for selecting line marks: hovering takes precedence over brushing in selecting words. When the user hovers off of the mark, you should reset the view, based on the current word selection from your brush. Note: you should carefully consider how to access a pair of words, given a rectangle -- as you have freedom in creating your data array in the heatmap's data join, consider how to use this to your advantage.

## Transitions

Last, you will also need to support transitions: both for your line marks, and for your heatmap. Specifically, upon the specification of a new sentence, the positions of your line elements (via the path element's "d" attribute) should animate to the new data, and the colors of the heatmap should also animate. This will require separating out your `enter` `Selection` from your `update` `Selection: the update `Selection` being what is returned directly from the `data` call. You should also be sure to update the appropriate text elements (words in sentence), but you need not apply an animation to these elements.

## Design Decisions

There are several (little) decisions that you will need to address in your design:

* Opacity of line marks.
* Updating the line mark appearance when a line mark has been selected, ensuring sufficient visual discrimination from unselected line marks and the horizontal threshold line.
* Updating text appearance for selected words.
* Updating rectangle mark appearance when a rectangle has been hovered over.
* Text font size.

## Hints

* There are several ways to handle word selections (beit brushed, or via hovering the heatmap). You can maintain state via a variable that stores selected words, for which you will find the `each` call on the `Selection` of axis word elements to be useful. Alternatively, you can relegate state to the `class` attribute, and use the `classed` function of `Selection` to set whether or not a word has been selected (brushed or hovered) -- `each` is useful in this situation as well. You may also find the `filter` function of a `Selection` object useful. Please refer to the D3 notes in past lectures for examples of all of these features.
* It is also recommended to use the `class` attribute to uniquely identify certain types of elements. For instance, specifying `d3.selectAll('path')` might return path elements that you might not want, like your axis! So, you can use classes to limit your selections.
* You will need to reference `this` frequently, as part of the anonymous functions that you specify for your events. The arrow `=>` function syntax, however, will _not_ populate `this` with the appropriate context (it will be the global context instead), so you should use the `function(args) { ... }` syntax.

## Extra Credit

There are a lot of ways to improve the above visualization. You are free to implement any of the below features as extra credit, each worth 5 additional points:

* **Resetting the views:** as is, when a new sentence is selected, the new view will retain the prior selection, which is stale. You should be able to reset the view in terms of removing the brush, and setting words and line marks back to their default appearances.
* **Color legend:** create a color legend for the heatmap on the right-hand side. Note: this can be created via a data join for a (specified) discrete amount of units (rectangles), and be sure that the legend updates as the user selects sentences.
* **Diverging colormap:** for your heatmap create a diverging colormap. You will not receive any credit if you use one of D3's default diverging colormaps.
* **Heatmap linked highlighting:** when the user brushes a sequence of words, update the heatmap such that the cells in the submatrix whose rows and columns corresponding to the brushed selection are visually updated. For instance, if a brush resulted in words with indices beginning at 9 and ending at 11, then the 3x3 submatrix of cells that begin at row/column 9 should be updated. Furthermore, you should update the appearance of the words on the left side of the heatmap.

## Reference Image

For reference, here is one possible design for the visualization:

![alt text](https://github.com/matthewberger/vis-fall2019-assignments/blob/master/assignment5/reference.png "LSTM Vis")

## Submission

Please zip up the folder for this assignment, name it `last_name`-`first_name`-assignment5.zip, where `last_name` and `first_name` should be replaced with your last and first name, respectively, and submit it to Brightspace.

The assignment is due October 30, 11:59:59 PM.

## Grading Criteria

* Visual Encodings (50%)
	* Parallel coordinates: scales (5%)
	* Parallel coordinates: data join and attribute setting (10%)
	* Parallel coordinates: axes (including proper display of words) (5%)
	* Heatmap: similarity computation (10%)
	* Heatmap: scales (5%)
	* Heatmap: data join and attribute setting (10%)
	* Heatmap: text for rows (5%)
* Interactions (40%)
	* Word brush: update word appearance for those selected (10%)
	* Threshold dragging: update position of horizontal line while dragging (5%)
	* Heatmap cell hovering (5%)
	* Updating appearance of selected line marks, in response to either word brushing and heatmap hovering (20%)
* Transitions (10%)
	* Parallel coordinate transition (5%)
	* Heatmap transition (5%)
