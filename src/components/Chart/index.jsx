import React, { useRef, useEffect } from "react";
import Highcharts from "highcharts";

const Chart = ({ chartData }) => {
    const chartContainerRef = useRef(null);

    useEffect(() => {
        if (chartContainerRef.current) {
            Highcharts.chart(chartContainerRef.current, {
                chart: {
                    type: chartData.type,
                },
                title: {
                    text: "",
                },
                series: chartData.series,
                xAxis: {
                    title: {
                        text: chartData.xAxisTitle,
                    },
                },
                yAxis: {
                    title: {
                        text: chartData.yAxisTitle,
                    },
                },
            });
        }
    }, [chartData]);

    return <div ref={chartContainerRef} />;
};

export default Chart;
