import React, { useEffect, useState } from 'react'
import BarCharSales from './BarCharSales'
import 'chart.js/auto';

export default function CustomDropdown() {
    const [dropdata, setDropdata] = useState([])
    const [salesData, setSalesData] = useState([])
    const [chartData, setChartData] = useState({})
    const [name, setName] = useState({})

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
        const res1 = await fetch('http://127.0.0.1:5000/api/customer_sale', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(e.target.value)
        })
        setName(e.target.value)
        const result1 = await res1.json()
        if (result1) {
            setSalesData(result1)
            setChartData({
                labels: result1.map((data) => data.year),
                datasets: [
                    {
                        label: "Sales Count",
                        data: result1.map((data) => data.sales_count),
                        backgroundColor: [
                            "rgba(75,192,192,1)",
                            "#11d3ed",
                            "#50AF95",
                            "#f3ba2f",
                            "#2a71d0"
                        ],
                    }
                ]
            })
        }
    };



    return (
        <div className=" container form-group mt-5">
            <h2>Customer Sale Report - Yearwise</h2>
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
            {salesData.length > 0 ? (<BarCharSales chartData={chartData} name={name} />) : 'No data to display!!'}
            {/* <BarCharSales chartData={chartData}/> */}
        </div>
    )
}
