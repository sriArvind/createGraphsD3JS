import React from 'react';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import * as d3 from 'd3';

const BarChart = () => {

    const apiData = useSelector((state) => state.fetchData.items);

    const humanCharacters = apiData.filter((item) => {
        let species = item.species.toLowerCase();
        return species === 'human';
    });

    const humanCharactersCount = humanCharacters.reduce((counter, object) => {
        if (object) counter += 1;
        return counter;
    }, 0);

    const alienCharacters = apiData.filter((item) => {
        let species = item.species.toLowerCase();
        return species === 'alien';
    });

    const alienCharactersCount = alienCharacters.reduce((counter, object) => {
        if (object) counter += 1;
        return counter;
    }, 0);

    const data = [
        {
            species: 'Human',
            count: humanCharactersCount
        },
        {
            species: 'Alien',
            count: alienCharactersCount
        }
    ];

    const barChart = useRef();

    // Set the dimensions and margins of the graph;
    const margin = { top: 30, right: 30, bottom: 70, left: 60 };
    const width = 460 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Append the svg object to the body of the page;
    const svg = d3.select(barChart.current)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // set the color scale
    const color = d3.scaleOrdinal()
        .domain(data)
        .range(d3.schemeSet2);

    // Add X axis;
    const x = d3.scaleBand()
        .range([0, width])
        .domain(data.map(function (d) { return d.species; }))
        .padding(0.2);

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .style("text-anchor", "middle")
        .style("font-size", "1.2rem")
        .style("font-weight", "500");

    // Add Y axis
    const y = d3.scaleLinear()
        .domain([0, 20])
        .range([height, 0]);

    svg.append("g")
        .call(d3.axisLeft(y));

    // Bars
    svg.selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) { return x(d.species); })
        .attr("y", function (d) { return y(d.count); })
        .attr("width", x.bandwidth())
        .attr("height", function (d) { return height - y(d.count); })
        .attr("fill", function (d) { return (color(d.species)); })

    return (
        <div>
            <div ref={barChart}></div>
            <h4>Bar Chart</h4>
            <h5>Showcasing the Distribution of Characters</h5>
            <h6>Based on Species</h6>
        </div>
    );

};

export default BarChart;