import React, { useEffect, useState } from 'react'
import CustCategWiseUnitSoldPie from './CustCategWiseUnitSoldPie';
import 'chart.js/auto'; 


export default function CustCategWiseUnitSold() {
    const [dropdata, setDropdata] = useState([])
    const [qtySold, SetQtySold] = useState([])
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
        const response2 = await fetch('http://127.0.0.1:5000/api/cust_categ_wise_unit_sold', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(e.target.value)
        })
        const result1 = await response2.json()
        if (result1) {
            SetQtySold(result1)
            setChartData({
                labels: result1.map((data) => data.category),
                datasets: [
                    {
                        label: "Category",
                        data: result1.map((data) => data.quantity),
                        offset: result1.map((data) => data.offset),
                        backgroundColor: [
                            "rgba(75,192,192,1)",
                            "#3498eb",
                            "#54ded9",
                            "#88c4cf",
                            "#4575d6",
                            "#9db7eb",
                            "#1a5b5e",
                            "#6a9c9e"
                        ],
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
            <h2>Customer-Category Wise Unit Sold - Pie Chart</h2>
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
            {qtySold.length > 0 ? (<CustCategWiseUnitSoldPie chartData={chartData}/>) : 'No data to display!!'}
        </div>
    )
}
