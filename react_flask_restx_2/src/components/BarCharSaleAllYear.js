import { Bar } from "react-chartjs-2";

export default function BarCharSaleAllYear({ chartData }) {
    return (
        <div className="chart-container mt-5 row">
                <h2 style={{ textAlign: "center" }}>Sales Chart</h2>

                <Bar
                    data={chartData}
                    options={{
                        plugins: {
                            title: {
                                display: true,
                                text: "Sales Data"
                            },
                            legend: {
                                display: true
                            },
                            datalabels:
                            {
                                color: 'black',
                                display: true,

                            }
                        }
                    }}
                />
        </div>
    );
};


