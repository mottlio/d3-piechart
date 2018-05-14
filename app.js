var minYear = d3.min(birthData, d => d.year);
var width = 600;
var height = 600;
var yearData = birthData.filter(d => d.year === minYear);

var continents = [];
for(var i = 0; i < birthData.length; i++){
    var continent = birthData[i].continent;
    if(continents.indexOf(continent) == -1){
        continents.push(continent)
    }
}

//mapping continents to colors

var colorScale = d3.scaleOrdinal()
                    .domain(continents)
                    .range(d3.schemeCategory10);

//moving the piechart to center of SVG - otherwise center in corner

d3.select("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + ", " + height / 2 + ")")
    .classed("chart", true);

//making a PIECHART - D3 translates data into angle values

var arcs = d3.pie()
                .value(d => d.births)
                (yearData);

// using d3.arc() method to translate JavaScript object into valid SVG path