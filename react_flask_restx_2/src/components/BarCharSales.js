import { Bar } from "react-chartjs-2";

export default function BarCharSales({ chartData, name }) {
    return (
        <div className="chart-container mt-5 row">
            <div className="col-md-2"></div>
            <div className="col-md-8">
                <h2 style={{ textAlign: "center" }}>Sales Chart</h2>

                <Bar
                    data={chartData}
                    options={{
                        plugins: {
                            title: {
                                display: true,
                                text: "Sales Data for " + name
                            },
                            legend: {
                                display: false
                            }
                        }
                    }}
                />
            </div>
        </div>
    );
};


