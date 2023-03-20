import React, { useEffect, useState } from 'react'

export default function Hello(props) {
    const [data, setData] = useState()
    async function api_call() {
        const response = await fetch('http://127.0.0.1:5000/api/hello')

        const result = await response.json()
        if (result.message) (
            setData(result.message)
        )
    }
    useEffect(() => {
        api_call();
    }, [])

    return (
        <div className='mt-5'>
            <h1>{data}</h1>
        </div>
    )
}
