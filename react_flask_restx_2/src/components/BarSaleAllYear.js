import React, { useEffect, useState } from 'react'
import 'chart.js/auto'; 
import BarCharSaleAllYear from './BarCharSaleAllYear';

export default function BarSaleAllYear() {
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
        const response2 = await fetch('http://127.0.0.1:5000/api/bar_sale_all_year', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(e.target.value)
        })
        const result1 = await response2.json()
        const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'];

        if (result1) {
            SetQtySold(result1)
            setChartData({
                labels: labels,
                datasets: result1
            })
        }
    };

  return (
    <div className=" container form-group mt-5 border border-success p-5">
            <h2>Sales Data All Year - Bar Chart</h2>
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
            {qtySold.length > 0 ? (<BarCharSaleAllYear chartData={chartData}/>) : 'No data to display!!'}
        </div>
  )
}
