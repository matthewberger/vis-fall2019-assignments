var sentence = null; // an array of words
var lstm_states = null; // 2-dimensional array: first dimension represents each hidden state value; second dimension refers to word

// widths and heights for our plots - you should use these in constructing scales
var lines_width = 1000, lines_height = 400;
var left_pad = 100, right_pad = 25, y_pad = 40
var lines_width = lines_width-(left_pad+right_pad), lines_height = lines_height-2*y_pad;

// initialize brush
var brush = d3.brushX()

function populate_sentences()  {
	d3.select('body').append('div').text('Select a sentence!')
	d3.select('body').append('div').append('select').selectAll('sentences').data(lstm_data).enter().append('option')
		.text(d => d.sentence.join(' ')).attr('value', (d,i) => i)
	d3.select('select')
		.on('change', function(d,i)  {
			var datum = d3.select(this).property('value');
			sentence = lstm_data[datum].sentence;
			lstm_states = lstm_data[datum].lstm;
			setup_vis(); // this is what you will implement - called each time a new sentence is chosen
		})
}

function plot_it()  {
	sentence = lstm_data[0].sentence;
	lstm_states = lstm_data[0].lstm;

	populate_sentences();

	d3.select('body').append('svg').attr('width', 1000).attr('height', 1000).attr('transform', 'translate(5,5)')
	// group that will contain line plot (id: lines)
	d3.select('svg').append('g').attr('transform', 'translate('+left_pad+','+y_pad+')').attr('id', 'lines')
	// group that will contain heatmap (id: hm)
	d3.select('svg').append('g').attr('transform', 'translate('+left_pad+','+(20+y_pad+lines_height)+')').attr('id', 'hm')

	// group that will contain y axis for our line plot (id: yaxis)
	d3.select('#lines').append('g').attr('id', 'yaxis')
	// group that will contain x axis for both our line plot and heatmap (id: xaxis)
	d3.select('#lines').append('g').attr('id', 'xaxis')

	// plot labels
	d3.select('#lines').append('text').text('LSTM Visual Analysis')
		.attr('transform', 'translate('+(lines_width/2)+',-15)').attr('text-anchor', 'middle').attr('fill', '#000').attr('font-size', '20px')
	d3.select('#lines').append('text').text('Hidden State Activations')
		.attr('transform', 'translate('+(-35)+','+(lines_height/2)+') rotate(270)').attr('text-anchor', 'middle').attr('fill', '#000')

	// setup brush - its geometric extent, and add it to our lines group
	brush.extent([[0,lines_height],[lines_width,lines_height+20.5]])
	d3.select('#lines').call(brush)

	// this will be our horizontal line for the threshold (id: threshold)
	d3.select('#lines').append('line').attr('id', 'threshold')
		.attr('x1', 0).attr('x2', lines_width).attr('y1', lines_height/4).attr('y2', lines_height/4)
		.attr('fill', 'None').attr('stroke', d3.hcl(70,40,15)).attr('stroke-width', 6).attr('opacity', 0.8)

	setup_vis();
}

function setup_vis()  {
	// TODO: setup scales, as well as your d3.line. For simplicity: for your y scale set the domain to [-1,1],

	// TODO: perform data join for lines: here, you should have separate selections for enter, and update -> the update selection should perform a transition as well

	// TODO: create axes; for the x axis, you will need to ensure that the text displayed are the words from `sentence`: use d3.tickFormat for this purpose

	// TODO: construct your similarity matrix that will serve as the data for your heatmap -> a matrix that is sentence.length x sentence.length
	// Note: there are different ways to create a heatmap, as we discussed in class - use the one that you think would be most appropriate here

	// TODO: construct color scale(s) for your heatmap

	// TODO: data join for your heatmap

	// TODO: data join to display words vertically, to the left of the heatmap

	// Strongly recommended TODO: write a function that takes in a set of word indices, identifies hidden state dimensions (e.g. lines) whose values at these words
	// are greater than or equal to the current threshold, and modifies the appearance of these lines -> this function will be called multiple times

	// TODO: setup event listener for the 'brush' event on your brush object - here you should determine what words have been selected by the brush,
	// modify the appearance of these words, and finally, update the lines

	// TODO: setup event listener for modifying the threshold; use d3.drag for this purpose -> update appearance of lines after setting new threshold

	// TODO: setup event listeners for heatmap interaction: mousing over, and mousing out -> update appearance of lines for the selected pair of words
}
