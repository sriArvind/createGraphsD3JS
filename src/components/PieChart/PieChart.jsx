import React from 'react';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import * as d3 from 'd3';

const PieChart = () => {

    const apiData = useSelector((state) => state.fetchData.items);

    const maleCharacters = apiData.filter((item) => {
        let gender = item.gender.toLowerCase();
        return gender === 'male';
    });

    const maleCharactersCount = maleCharacters.reduce((counter, object) => {
        if (object) counter += 1;
        return counter;
    }, 0);

    const femaleCharacters = apiData.filter((item) => {
        let gender = item.gender.toLowerCase();
        return gender === 'female';
    });

    const femaleCharactersCount = femaleCharacters.reduce((counter, object) => {
        if (object) counter += 1;
        return counter;
    }, 0);

    const genderUnknownCharacters = apiData.filter((item) => {
        let gender = item.gender.toLowerCase();
        return gender === 'unknown';
    });

    const genderUnknownCharactersCount = genderUnknownCharacters.reduce((counter, object) => {
        if (object) counter += 1;
        return counter;
    }, 0);

    const data = [
        {
            gender: 'Male',
            count: maleCharactersCount
        },
        {
            gender: 'Female',
            count: femaleCharactersCount
        },
        {
            gender: 'Unknown',
            count: genderUnknownCharactersCount
        }
    ];

    const pieChart = useRef();

    // set the dimensions and margins of the graph;
    const width = 450;
    const height = 450;
    const margin = 40;

    // The radius of the pieplot is half the width or half the height (smallest one); 
    // I subtract a bit of margin;
    const radius = Math.min(width, height) / 2 - margin;

    // append the svg object to the div called 'my_dataviz'
    const svg = d3.select(pieChart.current)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // set the color scale
    const color = d3.scaleOrdinal()
        .domain(data)
        .range(d3.schemeSet2);

    // Compute the position of each group on the pie:
    const pieData = d3.pie().value(d => d.count)(data);

    // shape helper to build arcs:
    const arcGenerator = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

    // Build the pie chart; 
    // Basically, each part of the pie is a path that we build using the arc function;
    svg
        .selectAll('mySlices')
        .data(pieData)
        .enter()
        .append('path')
        .attr('d', arcGenerator)
        .attr('fill', function (d) { return (color(d.data.gender)) })
        .attr("stroke", "#ffffff")
        .style("stroke-width", "2px")
        .style("opacity", 0.7);

    // Now add the annotation. Use the centroid method to get the best coordinates
    svg
        .selectAll('mySlices')
        .data(pieData)
        .enter()
        .append('text')
        .text(function (d) { return `${d.data.gender}: ${d.data.count}` })
        .attr("transform", function (d) { return "translate(" + arcGenerator.centroid(d) + ")"; })
        .style("text-anchor", "middle")
        .style("font-size", "1.2rem")
        .style("font-weight", "500");

    return (
        <div>
            <div ref={pieChart}></div>
            <h4>Pie Chart</h4>
            <h5>Showcasing the Distribution of Characters</h5>
            <h6>Based on Gender</h6>
        </div>
    );

};

export default PieChart;