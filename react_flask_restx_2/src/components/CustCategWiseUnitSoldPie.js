import React from 'react'
import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  
  import ChartDataLabels from 'chartjs-plugin-datalabels';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ChartDataLabels,
    Title,
    Tooltip,
    Legend
  );

export default function CustCategWiseUnitSoldPie({ chartData }) {
    console.log(chartData)
    return (
        <div className='row'>
            <div className='col-md-3'></div>
            <div className="chart-container col-md-6 mt-5">
                <h2 style={{ textAlign: "center" }}>Customer- Category Wise Unit Sold</h2>
                <Pie
                    data={chartData}
                    
                    options={{
                        plugins: {
                            title: {
                                display: false,
                                text: "Sales Data"
                            },
                            // datalabels: {
                            //     display: true,
                            // },
                            datalabels: {
                                formatter: (value, ctx) => {
                                    let sum = 0;
                                    let dataArr = ctx.chart.data.datasets[0].data;
                                    dataArr.map(data => {
                                        sum += data;
                                    });
                                    let percentage = (value*100 / sum).toFixed(1)+"%";
                                    return percentage;
                                },
                                color: '#fff',
                            }
                        }
                    }}
                />
            </div>
        </div>
    )
}
