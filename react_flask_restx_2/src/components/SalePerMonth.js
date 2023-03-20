import React, { useEffect, useState } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: 'Chart.js Line Chart',
      },
    },
  };

export default function SalePerMonth() {
    const [customerData, setCustomerData] = useState([])
    const [apiData, setApiData] = useState([])
    const [failData, setFailData] = useState('')

    async function api_call() {
        const res = await fetch('http://127.0.0.1:5000/api/customers')

        const result = await res.json()
        if (result.data) {
            setCustomerData(result.data)
        }
    }

    useEffect(() => {
        api_call();
    }, [])

    async function selectHandler(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        const data = {
            name: formJson['customer'],
            month: formJson['month']
        }

        const res1 = await fetch('http://127.0.0.1:5000/api/sale_per_month', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const api_result = await res1.json()
        if (api_result === 'No data found for selected customer and month') {
            setFailData(api_result)
          } else {
            setApiData(api_result)
            setFailData('')
          }
    }

    const lineData =
        {
            labels: [],
            datasets: apiData
        }

    return (
        <div className=" container form-group mt-5  border border-success p-5">
            <h2>Customer Sale Report - Monthwise</h2>
            <form method="post" onSubmit={selectHandler}>
                <div className="row">
                    <div className="col-md-2"> <strong>Customer</strong> </div>
                    <div className="col-md-10">
                        <select
                            className="form-control"
                            name="customer"
                        >
                            {customerData.map((item, index) => (
                                <option key={index} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-2"> <strong>Month</strong> </div>
                    <div className="col-md-10">
                        <select
                            className="form-control"
                            name="month"
                        >
                            <option value="1">January</option>
                            <option value="2">February</option>
                            <option value="3">March</option>
                            <option value="4">April</option>
                            <option value="5">May</option>
                            <option value="6">June</option>
                            <option value="7">July</option>
                            <option value="8">August</option>
                            <option value="9">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>
                        </select>
                    </div>
                </div>
                <button className="btn btn-info mt-3 mb-5" type="submit">Submit</button>
            </form>

            {/* <Line className="mt-5" options={options} data={lineData} /> */}
            {failData!=='' ? failData : <Line options={options} data={lineData} />}
        </div>
    )
}
