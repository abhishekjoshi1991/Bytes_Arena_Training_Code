import { useEffect } from "react";
import { Bar } from "react-chartjs-2";

export default function CoPoBarChartGraph({ chartData, index, dataIndex, OI_chart_ref, clear, sendDataToOIChart }) {
    const chartRef1 = OI_chart_ref;

    useEffect(() => {
        const chart1 = chartRef1.current;
        if (chartRef1.current) {
            if (clear === 1) {
                chart1.tooltip.setActiveElements([], { x: 0, y: 0 })
                chart1.setActiveElements([])
                chart1.update()
            }
            else {
                const d1 = dataIndex
                const d2 = (d1 == 1 ? 0 : 1);
                if (dataIndex >= 0) {
                    chart1.tooltip.setActiveElements([
                        {
                            datasetIndex: d1,
                            index: index
                        },
                        {
                            datasetIndex: d2,
                            index: index
                        },
                    ]);

                    chart1.setActiveElements([
                        {
                            datasetIndex: d1,
                            index: index
                        },
                        {
                            datasetIndex: d2,
                            index: index
                        },
                    ]);
                    chart1.update()
                }
            }

            const handleHover = (e) => {
                const point = chart1.getElementsAtEventForMode(
                    e,
                    "nearest",
                    {
                        intersect: true
                    },
                    true
                );
                if (point[0]) {
                    sendDataToOIChart(chartRef1, point[0]['datasetIndex'], point[0]['index'], 0)
                }
                else {
                    chart1.tooltip.setActiveElements([], { x: 0, y: 0 })
                    chart1.setActiveElements([])
                    chart1.update()
                    sendDataToOIChart(chartRef1, 0, 0, 1)

                };
            }
            chart1.canvas.onmousemove = handleHover;
        }
    }, [index])

    return (
        <div className="">
            {/* <h2 style={{ textAlign: "center" }}>CO PO Chart</h2> */}
            <Bar
                ref={chartRef1}
                width='2000'
                height='500'
                data={chartData}
                options={{
                    scales: {
                        x: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                display: false
                            }
                        }
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: "OI",
                            position: 'left'
                        },
                        legend: {
                            display: true,
                            align: 'end'
                        },
                        datalabels:
                        {
                            color: 'black',
                            display: false,

                        },
                        tooltip: {
                            yAlign: 'bottom'
                        }
                    },
                    interaction: {
                        mode: "index",
                        intersect: true
                    }
                }}
            />
        </div>
    );
};