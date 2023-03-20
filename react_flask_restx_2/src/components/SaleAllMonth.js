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

export default function CustomerDropdown() {
    const [dropdata, setDropdata] = useState([])
    const [apiData, setApiData] = useState([])
    const [failData, setFailData] = useState('')

    async function api_call() {
        const response1 = await fetch('http://127.0.0.1:5000/api/customers')

        const result1 = await response1.json()
        if (result1.data) {
            setDropdata(result1.data)
        }
    }

    useEffect(() => {
        api_call();
    }, [])

    async function selectHandler(e) {
        const response2 = await fetch('http://127.0.0.1:5000/api/sale_all_month', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(e.target.value)
        })
        const result2 = await response2.json()
        console.log(result2)

        if (result2 === 'No data found for selected customer and month') {
            setFailData(result2)
          } else {
            setApiData(result2)
            setFailData('')
          }
    };

    const lineData =
        {
            labels: [],
            datasets: apiData
        }

    return (
        <div className=" container form-group mt-5 border border-success p-5">
            <h2>Customer Sale Report</h2>
            <div className="row mb-5">
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
            {failData!=='' ? failData : <Line options={options} data={lineData} />}
        </div>
    )
}