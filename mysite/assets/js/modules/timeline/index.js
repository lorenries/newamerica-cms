import $ from 'jquery';

import { axisBottom } from 'd3-axis';
import { scaleLinear, scalePoint, scaleQuantize } from 'd3-scale';
import { extent, ascending } from 'd3-array';
import { select, selectAll } from 'd3-selection';
import { nest } from 'd3-collection';
import { timeFormat } from 'd3-time-format';
import { timeDay, timeMonth, timeYear } from 'd3-time';

const dotRadius = 8,
	dotOffset = 5,
	margin = { left: 15, right: 15, top: 20, bottom: 50},
	strokeColor = "#c0c1c3",
	strokeSelectedColor = "#2c2f35",
	fillColor = "#fff",
	fillSelectedColor = "#2c2f35";

class Timeline {
	constructor() {
		this.svg = select(".timeline__nav")
				.append("svg")
				.attr("class", "timeline__nav__container")
				.attr("width", "100%"); 

		this.g = this.svg.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		this.xScale = scaleQuantize()
			.domain(extent(eventList, (d) => { return new Date(d.start_date) }));
		this.yScale = scaleLinear();

		this.xAxis = this.svg.append("g")
			.attr("class", "timeline__nav__axis")
			.attr("class", "axis axis-x");

		this.hoverInfo = this.svg.append("g")
			.attr("class", "timeline__nav__hover-info")
			.classed("hidden", true);
		this.hoverInfoText = this.hoverInfo.append("text");
		
		this.setTimeFormat();
		this.currSelected = 0;
		select("#event-0").classed("visible", true);

		this.render();

		window.addEventListener('resize', this.resize.bind(this));

	}

	render() {
		this.setWidth();
		this.setXRange();
		this.setDataNest();
		this.setHeight();
		this.setYScale();
		this.setCircles();
	}

	setWidth() {
		this.w = $(".timeline__nav").width() - margin.left - margin.right;

		this.g
			.attr("width", this.h);
	}

	setHeight() {
		this.h = this.numRows * (dotRadius*2 + dotOffset);
		this.svg
			.attr("height", this.h + margin.top + margin.bottom);

		this.g
			.attr("height", this.h);

		this.xAxis
			.attr("transform", "translate(" + margin.left + "," + (this.h + margin.top + dotRadius + dotOffset) + ")")
			.call(axisBottom(this.xScale).tickPadding(10).tickSizeOuter(0).tickFormat(this.timeFormat));
	}

	setXRange() {
		const numCols = Math.floor(this.w/(2*dotRadius + dotOffset));
		let colBins = [];

		let linearXScale = scaleLinear()
			.domain([0, numCols])
			.range([0, this.w]);

		for (let i = 0; i < numCols; i++) {
			colBins[i] = linearXScale(i);
		}

		this.xScale.range(colBins);
	}

	setYScale() {
		console.log(this.numRows, this.h)
		this.yScale
			.domain([0, this.numRows])
			.range([this.h, 0]);
	}

	setDataNest() {
		let startXPos, endXPos, yIndex;
		let yOffsets = {},
			maxY = 0;

		for (let bin of this.xScale.range()) {
			yOffsets[bin] = 0;
		}

		eventList.map((d) => {
			startXPos = this.xScale(new Date(d.start_date));
			endXPos = d.end_date ? this.xScale(new Date(d.start_date)) : null;

			yIndex = yOffsets[startXPos];
			yOffsets[startXPos]++;

			if (endXPos) {
				for (let bin of this.xScale.range()) {
					if (bin > startXPos && bin <= endXPos) {
						yOffsets[bin]++;
					}
				}
			}

			d.yIndex = yIndex;
			d.startXPos = startXPos;
		})

		this.numRows = 5;

		
	}

	setCircles() {
		this.g.selectAll("rect")
			.data(eventList)
			.enter().append("rect")
		    .attr("x", (d) => { return d.xPos - dotOffset; })
		    .attr("y", (d) => { return this.yScale(d.yIndex) - dotOffset; })
		    .attr("height", dotRadius*2)
		    .attr("width", (d) => { return d.end_date ? this.xScale(new Date(d.end_date)) - this.xScale(new Date(d.start_date)) - dotOffset : dotRadius*2; })
		    .attr("rx", dotRadius)
		    .attr("ry", dotRadius)
		    .attr("class", "timeline__nav__dot")
		    .classed("selected", (d) => { return d.id == this.currSelected })
		    .on("mouseover", (d, index, paths) => { return this.mouseover(d, paths[index]); })
		    .on("mouseout", (d, index, paths) => { return this.mouseout(paths[index]); })
		    .on("click", (d, index, paths) => { return this.clicked(d, paths[index]); });
	}

	setTimeFormat() {
		const [minTime, maxTime] = this.xScale.domain();

		if (timeMonth.count(minTime, maxTime) < 6) {
			this.timeFormat = timeFormat("%B %d, %Y");
		} else if (timeMonth.count(maxTime - minTime) < 18) {
			this.timeFormat = timeFormat("%B %Y");
		} else {
			this.timeFormat = timeFormat("%Y");
		}
	}

	resize() {
		console.log("resizing");

		this.g.selectAll("rect").remove();

		this.render()
	}

	mouseover(datum, path) {
		let elem = select(path);
		elem.classed("hovered", true);

		this.hoverInfo
			.classed("hidden", false)
			.attr("transform", "translate(" + elem.attr("x") + "," + 10 + ")");

		this.hoverInfoText.text(datum.title);
	}

	mouseout(path) {
		select(path).classed("hovered", false);

		this.hoverInfo.classed("hidden", true);
	}

	clicked(datum, path) {
		const { id } = datum;
		select("#event-" + this.currSelected).classed("visible", false);
		select(".timeline__nav__dot.selected").classed("selected", false);
		this.currSelected = id;
		select("#event-" + id).classed("visible", true);
		select(path).classed("selected", true);
	}
}

export default function() {
	console.log("loaded script!");
	console.log(eventList);
	const timeline = new Timeline();

	
}