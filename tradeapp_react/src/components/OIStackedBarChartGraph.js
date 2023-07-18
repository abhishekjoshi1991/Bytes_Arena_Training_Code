import { Bar } from "react-chartjs-2";

export default function OIStackedBarChartGraph({ chartData }) {
    return (
        <div className="">
            <Bar
                width='2000'
                height='700'
                data={chartData}
                options={{
                    scales: {
                        x: {
                            stacked: true,
                            grid: {
                                display: false
                            }
                        },
                        y: {
                            stacked: true
                        }
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: "OI",
                            position: 'left'
                        },
                        legend: {
                            onClick: (e, legendItem) => {
                                e.stopPropagation(); // Prevent the default behavior of legend click
                            },
                            display: true,
                            align: 'end',
                            labels: {
                                filter: (legendItem, chartData) =>
                                    !['Dataset1', 'Dataset2'].includes(legendItem.text),
                            },
                        },
                        datalabels:
                        {
                            color: 'black',
                            display: false,

                        },
                        tooltip: {
                            yAlign: "bottom",
                            callbacks: {
                                label: function (context) {
                                    let label = "";
                                    return label;
                                },

                                footer: (tooltipItem) => {
                                    let call_sum = 0;
                                    let put_sum = 0;
                                    let call_text;
                                    let put_text;
                                    tooltipItem.slice(0, 3).forEach(function (tooltipItem) {
                                        call_sum += tooltipItem.parsed.y;
                                    });
                                    tooltipItem.slice(3, 6).forEach(function (tooltipItem) {
                                        put_sum += tooltipItem.parsed.y;
                                    });
                                    // call_text
                                    if (tooltipItem[0].parsed._stacks.y[2] === 0)
                                        call_text =
                                            "Call: " +
                                            call_sum +
                                            " (+" +
                                            tooltipItem[0].parsed._stacks.y[1] +
                                            ")";
                                    else
                                        call_text =
                                            "Call: " +
                                            tooltipItem[0].parsed._stacks.y[0] +
                                            " (-" +
                                            tooltipItem[0].parsed._stacks.y[2] +
                                            ")";
                                    console.log(tooltipItem)
                                    // put text
                                    if (tooltipItem[3].parsed._stacks.y[5] === 0)
                                        put_text =
                                            "Put: " +
                                            put_sum +
                                            " (+" +
                                            tooltipItem[3].parsed._stacks.y[4] +
                                            ")";
                                    else
                                        put_text =
                                            "Put: " +
                                            tooltipItem[3].parsed._stacks.y[3] +
                                            " (-" +
                                            tooltipItem[3].parsed._stacks.y[5] +
                                            ")";
                                    return call_text + "\n" + put_text;
                                }
                            }
                        }
                    },
                    responsive: true,
                    interaction: {
                        mode: "index",
                        intersect: false
                    }
                }}
            />
        </div>
    );
};
