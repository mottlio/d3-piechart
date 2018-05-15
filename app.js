var minYear = d3.min(birthData, d => d.year);
var maxYear = d3.max(birthData, d => d.year);
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

//INPUT - range

d3.select('input')
    .property('min', minYear)
    .property('max', maxYear)
    .property('value', minYear)

//making a PIECHART - D3 translates data into angle values

var arcs = d3.pie()
                .value(d => d.births)
                (yearData);

// using d3.arc() method to translate JavaScript object into valid SVG path

var path = d3.arc()
            .outerRadius(width / 2 - 10)
            .innerRadius(width / 4);

// use d3 data method to bind arcs to data elements, hop into 
// the enter selection and for each arc append 

d3.select(".chart")
        .selectAll(".arc")
        .data(arcs)
        .enter()
        .append("path")
            .classed("arc", true)
            .attr("fill", d => colorScale(d.data.continent))
            .attr("stroke", "black")
            .attr("d", path); // path is a function thet will be invodek once for each item and will return a d path command
