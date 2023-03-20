import React, { useEffect, useState } from 'react'
import 'chart.js/auto'; 
import PieChartProdCount from './PieChartProdCount';

export default function CategProductCount() {

    const [prodCountData, setProdCountdata] = useState([])
    const [chartData, setChartData] = useState({})

    async function api_call() {
        const res = await fetch('http://127.0.0.1:5000/api/categwise_prod_count')

        const result = await res.json()

        if (result) {
            setProdCountdata(result)
            setChartData({
                labels: result.map((data) => data.category),
                datasets: [
                    {
                        label: "Category",
                        data: result.map((data) => data.count),
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
                        // borderColor: "black",
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
    }

    useEffect(() => {
        api_call();
    }, [])

  return (
    <div className= "container form-group mt-5 border border-success p-5">
       {prodCountData.length > 0 ? (<PieChartProdCount chartData={chartData}/>) : 'No data to display!!'}
    </div>
  )
}
