import { Bar } from "react-chartjs-2";
import { useEffect } from "react";

export default function CoPoChangeBarChartGraph({ chartData, index, dataIndex, OI_change_chart_ref, clear, sendDataToOIChangeChart }) {
    const chartRef2 = OI_change_chart_ref;

    useEffect(() => {
        const chart2 = chartRef2.current;
        if (chartRef2.current) {
            if (clear === 1) {
                chart2.tooltip.setActiveElements([], { x: 0, y: 0 })
                chart2.setActiveElements([])
                chart2.update()
            }
            else {
                if (dataIndex >= 0) {
                    const d1=dataIndex
                    const d2=(d1==1? 0 : 1);
                    chart2.tooltip.setActiveElements([
                        {
                            datasetIndex: d1,
                            index: index
                        },
                        {
                            datasetIndex: d2,
                            index: index
                        },

                    ]);

                    chart2.setActiveElements([
                        {
                            datasetIndex: d1,
                            index: index
                        },
                        {
                            datasetIndex: d2,
                            index: index
                        },
                    ]);
                    chart2.update()
                }

            }

            const handleHover = (e) => {
                const point = chart2.getElementsAtEventForMode(
                    e,
                    "nearest",
                    {
                        intersect: true
                    },
                    true
                );
                if (point[0]) {
                    sendDataToOIChangeChart(chartRef2, point[0]['datasetIndex'], point[0]['index'], 0)
                }
                else {
                    chart2.tooltip.setActiveElements([], { x: 0, y: 0 })
                    chart2.setActiveElements([])
                    chart2.update()
                    sendDataToOIChangeChart(chartRef2, 0, 0, 1)
                }
            };
            chart2.canvas.onmousemove = handleHover;
        }
    }, [index])

    return (
        <div className="">
            <Bar
                ref={chartRef2}
                width='2000'
                height='500'
                data={chartData}
                options={{
                    scales: {
                        x: {
                            grid: {
                                display: false
                            },
                        }
                    },
                    plugins: {

                        title: {
                            display: true,
                            text: "OI Change",
                            position: "left"
                        },
                        legend: {
                            display: true,
                            position: "bottom",
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