function plot_it()  {
	// NOTE: "points" refers, collectively, to the "Two_Points" and "Three_Points" properties, while "activities" collectively refers to the "Steal", "Assist" and "Block" properties

	// convert to numbers
	nba_data.forEach(d => {
		d.Salary = +d.Salary;
		d.Block = +d.Block;
		d.Assist = +d.Assist;
		d.Steal = +d.Steal;
		d.Two_Points = +d['Two Points'];
		d.Three_Points = +d['Three Points'];
	});

	// sort players by salary
	nba_data.sort((a,b) => {
		if(a['Salary'] < b['Salary'])
			return -1;
		return 1;
	});

	// `all_mins` and `all_maxs` are objects whose keys are the data attribute names, and values are the minimum and maximum for the corresponding attribute
	all_mins = {}, all_maxs = {};
	['Salary', 'Block', 'Assist', 'Steal', 'Two_Points', 'Three_Points'].forEach(key => {
		all_mins[key] = d3.min(nba_data, d => d[key]);
		all_maxs[key] = d3.max(nba_data, d => d[key]);
	});

	// global layout parameters - please see the accompanying illustration on the assignment's GitHub page
	var row_height = 20;
	var pad = 40;
	var width = 1000, height = 2*pad + row_height*nba_data.length;
	d3.select('body').append('svg').attr('width', width).attr('height', height);
	var full_width = width-2*pad, actual_height = height-2*pad;
	var diverging_bar_pos = 2*full_width/3;
	var name_bar_pos = full_width/5;
	var activities_width = diverging_bar_pos - name_bar_pos;
	var points_width = full_width - diverging_bar_pos;

	var min_bar = 4;

	// TODO: set up your linear scales for all of your data attributes - one scale for each variable ("Salary", "Steal", "Assist", "Block", "Two_Points", and "Three_Points")
	// Note: the visual range should be **length**.
	// You should use the above min/max objects to setup the domain, as well as uniformly split up each range based on the above defined widths,
	// where the range of each should begin with `min_bar`.

	// TODO: additionally, setup a band scale to map each player name (`Name`) to a y position - use `actual_height` for the range min, and 0 for the range max (recall: coordinate system begins at the upper left, y-axis points down)
	// You should also give it a small amount of inner padding, to separate individual rows
	// NOTE: order matters here - the nba_data array is sorted in increasing salary, so the player with highest salary (last object in array) should be shown on top, and the player with lowest salary (first object in array) at the bottom

	// TODO: setup a `d3.stack` for the right-hand side of the diverging bar chart, namely, "Two_Points" and "Three_Points" (your keys)
	// Hint: consider the `value` function, in order to convert the data into their visual ranges

	// TODO: setup a `d3.stack` for the left-hand side of the diverging bar chart, namely, "Block", "Assist", and "Steal" (your keys)
	// Hint: consider the `value` function, in order to convert the data into their visual ranges

	// TODO: create a color for each attribute

	// text labels
	d3.select('svg').append('text').attr('x', (pad+diverging_bar_pos-150)).attr('y', 3*pad/4)
		.text('Steal').attr('text-anchor', 'middle')
	d3.select('svg').append('text').attr('x', (pad+diverging_bar_pos-75)).attr('y', 3*pad/4)
		.text('Assist').attr('text-anchor', 'middle')
	d3.select('svg').append('text').attr('x', (pad+diverging_bar_pos)).attr('y', 3*pad/4)
		.text('Block').attr('text-anchor', 'end')
	d3.select('svg').append('text').attr('x', (pad+diverging_bar_pos+points_width/4)).attr('y', 3*pad/4)
		.text('Two Pointers').attr('text-anchor', 'middle')
	d3.select('svg').append('text').attr('x', (pad+diverging_bar_pos+3*points_width/4)).attr('y', 3*pad/4)
		.text('Three Pointers').attr('text-anchor', 'middle')

	// create a group element to store player names -> NOTE: text, background rectangles, and salary bars should be added as children to this group element
	d3.select('svg').append('g').attr('transform', 'translate('+(pad)+','+(pad)+')').attr('id', 'players')
	// TODO: perform a data join on `nba_data`, in order, to:
	// 1) create a rectangle for each player, that spans the full_width of the view, with a fill of '#ddd' for odd indices, and a fill of '#fff' for even indices
	// 2) create a bar for the salary attribute (see accompanying illustration on GitHub assignment page for reference)
	// 3) position text that begins at the left side of the view (e.g. starts at 0 in the local coordinate system of the parent group element), use the property `Name` to specify the text

	// make a line to divide player names from bar marks
	d3.select('#players').append('line')
		.attr('y1',0).attr('y2',actual_height).attr('x1',name_bar_pos).attr('x2',name_bar_pos).attr('stroke', '#bbb').attr('stroke-width', 1.5)
	d3.selectAll('text').attr('font-size', 16).attr('font-family', 'sans-serif')

	// create a group element for 2- and 3-pointer bars -> NOTE: bars for 'Two_Points' and 'Three_Points' should be added as children to this group element
	d3.select('svg').append('g').attr('transform', 'translate('+(pad+diverging_bar_pos)+','+(pad)+')').attr('id', 'points')
	// TODO: perform data join on your stacked points data. Note that this is an array of length 2, for each of 'Two_Points' and 'Three_Points'
	// You will then, subsequently, need to perform a nested data join, in order to populate the individual player data. Recall how stack structures data...

	// create a group element for activities bars -> NOTE: bars for 'Blocks', 'Assists', and 'Steals' should be added as children to this group element
	d3.select('svg').append('g').attr('transform', 'translate('+(pad+name_bar_pos)+','+(pad)+')').attr('id', 'activities')
	// TODO: perform data join on your stacked activities data. Note that this is an array of length 3, for each of 'Block', 'Assist' and 'Steal'
	// You will then, subsequently, need to perform a nested data join, in order to populate the individual player data.
}
