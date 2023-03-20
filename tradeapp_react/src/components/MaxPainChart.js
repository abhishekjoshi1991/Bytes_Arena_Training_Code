import React, { useEffect, useState } from 'react'
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  } from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
const options={
    // indexAxis:'x',
    // elements:{
    //   bar:{
    //     borderWidth:0,
    //   },
    // },
    responsive:true,
    interaction:{
      mode:'index',
      intersect:false
    },
    scales:{
      x:{
        stacked:true
      },
      y:{
        stacked:true
      }
    },
    plugins:{
      legend:{
        position:'bottom'
      },
      title:{
        display:true,
        text:'Max Pain chart'
      }
    }
  };

export default function MaxPainChart() {
    const [expiryDateData, setExpiryDateData] = useState([])
    const [symbolData, setSymbolData] = useState([])
    const [labelData, setLabelData] = useState([])
    const [dataset, setDataSet] = useState([])

    async function api_call() {
        const res = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/max_pain_chart')

        const result = await res.json()
        if (result) {
            setExpiryDateData(result)
        }
        const symbol = ["NIFTY"]
        setSymbolData(symbol)
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
            expiry: formJson['expiry'],
            symbol: formJson['symbol']
        }
        const res1 = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/max_pain_chart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const api_result = await res1.json()
        if (api_result) {
            setLabelData(api_result['labels'])
            setDataSet(api_result['dataset'])
        }
    }
    console.log(labelData)
    console.log(dataset)
    const chartData =
        {
            labels: labelData,
            datasets: dataset
        }


  return (
      <div className="mt-2">
            <h3>Max Pain Chart</h3>
            <form method="post" onSubmit={selectHandler}>
                <div className="row mb-5 mt-3   ">
                    
                    <div className="col-md-2"> <strong>Symbol</strong> </div>
                    <div className="col-md-3">
                        <select
                            className="form-control"
                            name="symbol"
                        >
                            {symbolData.map((item, index) => (
                                <option key={index} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-2"> <strong>Expiry</strong> </div>
                    <div className="col-md-3">
                        <select
                            className="form-control"
                            name="expiry"
                        >
                            {expiryDateData.map((item, index) => (
                                <option key={index} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-2"><button className="btn btn-info" type="submit">Submit</button></div>
                </div>

                
            </form>

            {/* <CoPoBarChartGraph chartData={lineData}/> */}
            <Bar options={options} data={chartData} />;
    </div>
  )
}
