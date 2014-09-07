window.onload = function(){

	var h = window.innerHeight;
	var w = window.innerWidth;

	function buildLine(ds){

		var xScale = d3.scale.linear()
						.domain([
							d3.min(ds.monthlySales, function(d){
								return d.month;
							}),
							d3.max(ds.monthlySales, function(d){
								return d.month;
							})
						])
						.range([0, w]);

		var yScale = d3.scale.linear()
						.domain([
							0,
							d3.max(ds.monthlySales, function(d){
								return d.sales;
							})
						])
						.range([h, 0]);

		var lineFun = d3.svg.line()
			.x(function(d){
				return xScale(d.month);
			})
			.y(function(d){
				return yScale(d.sales);
			})
			.interpolate('linear');

		var svg = d3.select('body').append('svg').attr({width : w, height : h});

		var viz = svg.append('path')
			.attr({
				d : lineFun(ds.monthlySales),
				'stroke' : 'purple',
				'stroke-width' : 2,
				'fill' : 'none'
			});
	}

	function showHeader(ds){
		d3.select('body').append('h1')
			.text(ds.category + " Sales (2013)");
	}

	d3.json("https://api.github.com/repos/binoy14/d3js-resources/contents/MonthlySalesbyCategoryMultiple.json", function(error, data){

		if(error){
			console.log(error);
		} else {
			console.log(data);
			ds = data;
		}

		var decodedData = JSON.parse(window.atob(data.content));
		console.log(decodedData.contents);

		decodedData.contents.forEach(function(ds){
			console.log(ds);
			showHeader(ds);
			buildLine(ds);
		});
	});
};