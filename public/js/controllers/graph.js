angular.module('proDucts').controller('graphController', ['$scope', '$http', 'productsService',  function($scope, $http, productsService){

(function(){console.log(productsService.getSelectedIndex())})();

var margin = {top: 20, right: 5, bottom: 30, left: 40},
    width = 1370 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var scale = d3.scale.linear()
    .range([0, -30])
    .domain([0, 100]);

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickValues([10,20,30,40,50,60,70,80,90,100]);

var svg = d3.select("#content").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



d3.json('/products/'+productsService.getProductId(productsService.getSelectedIndex())+'/grades/',function(error, json) {
	var data = json;
  	x.domain(data.map(function(d) { return d.feature; }));
  	y.domain([0, 100]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .style("text-anchor", "top")
      .text("grade");

  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("class", function(d) {var cls="bar "; if (d.grade < 60) {cls += "barRed";} if ((d.grade >= 60) && (d.grade < 80)) {cls += "barYellow";} if (d.grade >= 80) {cls += "barGreen";}  return cls;})
      .attr("x", function(d) { return x(d.feature); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.grade); })
      .attr("height", function(d) { return height - y(d.grade); });
      
svg.selectAll("label")
      .data(data)
    .enter()
      .append("text")
      .attr("x", function(d,i) {
      		console.log(x.rangeBand() * i);
		    return x(d.feature) + (x.rangeBand() / 2 + 20);
		    // return (i * (1370 / 14) + x.rangeBand())
		})
		.attr("y", function(d,i) {
		    return y(d.grade) + 20;
		})
      .text(function(d) {if (d.grade > 0) {return d.grade;} else return "";});

	});

}])