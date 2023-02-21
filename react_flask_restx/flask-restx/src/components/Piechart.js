import React from 'react'
import { Bar } from "react-chartjs-2";

export default function Piechart({chartData}) {
    return (
        <div className="chart-container">
            <h2 style={{ textAlign: "center" }}>Pie Chart</h2>
            <Bar
                    data={chartData}
                    options={{
                        plugins: {
                            title: {
                                display: true,
                                text: "Sales Data for "
                            },
                            legend: {
                                display: false
                            }
                        }
                    }}
                />
        </div>
    )
}
