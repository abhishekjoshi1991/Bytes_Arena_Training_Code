import React, { useEffect, useState } from 'react'

export default function Test() {
    const [demoData, setDemoData] = useState([])
    async function demo_api() {

        const response = await fetch('https://api.sampleapis.com/countries/countries')
        const data = await response.json()
        setDemoData(data)
    }
    console.log(demoData)

    useEffect(() => {
        demo_api()
    }, [])

    return (
        <div>
            {/* {demoData}
         */}
            hello
        </div>
    )
}
