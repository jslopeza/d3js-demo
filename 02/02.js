window.onload = function(){
	
	var h = 100;
	var w = 400;
	var ds; // global var for data
	var salesTotal = 0.0;
	var salesAvg = 0.0;
	var metrics = [];

	function buildLine(){
		var lineFun = d3.svg.line()
			.x(function(d){
				return ((d.month-20130001)/3.25);
			})
			.y(function(d){
				return h-d.sales;
			})
			.interpolate('linear');

		var svg = d3.select('body').append('svg').attr({width : w, height : h});

		var viz = svg.append('path')
			.attr({
				d : lineFun(ds),
				'stroke' : 'purple',
				'stroke-width' : 2,
				'fill' : 'none'
			});
	}

	function showTotals(){
		var t = d3.select('body').append('table');

		// get total
		for(var i=0; i < ds.length; i++){
			salesTotal += ds[i].sales*1; // convert to number
		} 

		salesAvg = salesTotal / ds.length;
		// add metrics to array

		metrics.push("Sales Total: " + salesTotal);
		metrics.push("Sales Avg: " + salesAvg.toFixed(2));

		// add total to table
		var tr = t.selectAll('tr')
			.data(metrics)
			.enter()
			.append('tr')
			.append('td')
			.text(function(d){
				return d;
			});
	}

	d3.json("MonthlySales.json", function(error, data){

		if(error){
			console.log(error);
		} else {
			console.log(data);
			ds = data;
		}

		buildLine();
		showTotals();
	});
};