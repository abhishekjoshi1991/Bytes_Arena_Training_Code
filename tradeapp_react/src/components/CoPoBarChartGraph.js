import { Bar } from "react-chartjs-2";

export default function CoPoBarChartGraph({ chartData }) {
    return (
        <div className="">
                {/* <h2 style={{ textAlign: "center" }}>CO PO Chart</h2> */}

                <Bar
                    data={chartData}
                    options={{
                        plugins: {
                            title: {
                                display: true,
                                text: "OI Chart"
                            },
                            legend: {
                                display: true
                            },
                            datalabels:
                            {
                                color: 'black',
                                display: false,

                            }
                        }
                    }}
                />
        </div>
    );
};