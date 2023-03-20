import React, { useEffect, useState } from 'react'
import Piechart from "./Piechart";
import 'chart.js/auto';

export default function ProductsQty() {
    const [proddata, setProddata] = useState([])
    // const [qtydata, setQtydata] = useState([])
    const [chartData, setChartData] = useState({})

    async function api_call() {
        const res = await fetch('http://127.0.0.1:5000/api/productstock')
        const result = await res.json()
        console.log(result)
        if (result) {
            setProddata(result)


            setChartData({
                labels: result.map((data) => data.product),
                datasets: [
                    {
                        label: "Product Qunatity Data ",
                        data: result.map((data) => data.quantity),
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
    }

    useEffect(() => {
        api_call();
    }, [])


    return (
        <div>
            ProductsQty
            {proddata.length > 0 ? (<Piechart chartData={chartData} />) : 'No data to display!!'}
            {/* // <Piechart chartData={chartData} /> */}
        </div>
    )
}
