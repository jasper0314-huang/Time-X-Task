/* Histogram.js */
import React, { Component } from 'react'
import { Histogram, DensitySeries, BarSeries, withParentSize, XAxis, YAxis } from '@data-ui/histogram';
import { font, svgFont, label, size, color, chartTheme, allColors } from '@data-ui/theme';

export class MyHistogram extends Component {
	render() {
		// const rawData = Array(100).fill().map(() => Math.round(Math.random() * 100) / 10);
		// const rawData = (this.props.data !== [] || this.props.data === undefined) ? 
		// 	(this.props.data) : 
		// 	(Array(100).fill().map(() => Math.round(Math.random() * 100) / 10));
		// const rawData = [1,2,3];
		const rawData = this.props.data;
		console.log(this.props.data);
		// const data = this.props.data;
		// console.log(data);
		return (
			<Histogram
			theme={chartTheme}
			width={450}
			height={450}
			ariaLabel="My histogram of ..."
			orientation="vertical"
			cumulative={false}
			normalized={false}
			binCount={25}
			valueAccessor={datum => datum}
			binType="numeric"
			renderTooltip={({ event, datum, data, color }) => (
			  <div>
				<strong style={{ color }}>{datum.bin0} to {datum.bin1}</strong>
				<div><strong>count </strong>{datum.count}</div>
				<div><strong>cumulative </strong>{datum.cumulative}</div>
				<div><strong>density </strong>{datum.density}</div>
			  </div>
			)}
		  >
			<BarSeries animated rawData={rawData} />
			<DensitySeries animated rawData={rawData} />
			<XAxis
			  label="hrs"
			  fontsize={20}
			/>
			<YAxis
			  label="#people"
			/>
		  </Histogram>
		);
	}
}

export default MyHistogram