import React, { useEffect, useState } from 'react'
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import { Pie } from 'react-chartjs-2';
import Piechart from './Piechart';
import 'chart.js/auto'; 
// ChartJS.register(ArcElement, Tooltip, Legend);


export default function SalePie() {
    const [dropdata, setDropdata] = useState([])
    const [salesData, setSalesData] = useState([])
    const [chartData, setChartData] = useState({})

    async function api_call() {
        const res = await fetch('http://127.0.0.1:5000/api/customers')

        const result = await res.json()
        if (result.data) {
            setDropdata(result.data)
        }
    }

    useEffect(() => {
        api_call();
    }, [])

    async function selectHandler(e) {
        const response2 = await fetch('http://127.0.0.1:5000/api/sale_all_month_pie', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(e.target.value)
        })
        const result1 = await response2.json()
        if (result1) {
            setSalesData(result1)
            setChartData({
                labels: result1.map((data) => data.month),
                datasets: [
                    {
                        label: "Total Sale",
                        data: result1.map((data) => data.sale),
                        backgroundColor: result1.map((data) => data.color),
                        borderColor: "black",
                        borderWidth: 0,
                        datalabels: {
                            color: 'black',
                            font : {
                                weight: 'bold'
                            }
                        }
                    }
                ]
            })
        }
    };

    return (
        <div className=" container form-group mt-5 border border-success p-5">
            <h2>Customer Sale Report - Pie Chart</h2>
            <div className="row">
                <div className="col-md-2"> <strong>Customer</strong> </div>
                <div className="col-md-10">
                    <select
                        className="form-control"
                        onChange={e => selectHandler(e)}
                    >
                        <option defaultValue>Select</option>
                        {dropdata.map((item, index) => (
                            <option key={index} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            {/* <Piechart chartData={chartData} /> */}
            {salesData.length > 0 ? (<Piechart chartData={chartData}/>) : 'No data to display!!'}
            {/* <BarCharSales chartData={chartData}/> */}
        </div>
    )
}
