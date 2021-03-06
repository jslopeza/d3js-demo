window.onload = function(){
	
	var h = 100;
	var w = 400;

	function buildLine(ds){
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

	d3.json("MonthlySalesbyCategoryMultiple.json", function(error, data){

		if(error){
			console.log(error);
		} else {
			console.log(data);
			ds = data;
		}

		data.contents.forEach(function(ds){
			console.log(ds);
			showHeader(ds);
			buildLine(ds);
		});
	});
};