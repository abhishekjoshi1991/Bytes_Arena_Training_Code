import React from 'react'

export default function SideTable(props) {
    const data1 = props.profitlossdata[0]

    return (
        <div>
            <div className='row mt-4    '>
                <div className='col-md-8'>
                    <strong>Prob. of Profit
                    </strong>
                </div>
                <div className='col-md-4'>
                    0
                </div>
            </div>
            <div className='row mt-3'>
                <div className='col-md-8'>
                    <strong>Max. Profit</strong>
                </div>
                <div className='col-md-4'>
                    {data1['max_profit']}
                </div>
            </div>
            <div className='row mt-3'>
                <div className='col-md-8'>
                    <strong>Max. Loss</strong>
                </div>
                <div className='col-md-4'>
                    {data1['min_profit']}
                </div>
            </div>
            <div className='row mt-3'>
                <div className='col-md-8'>
                    <strong>Max Return:Risk Ratio
                    </strong>
                </div>
                <div className='col-md-4'>
                    0
                </div>
            </div>
            <div className='row mt-3'>
                <div className='col-md-8'>
                    <strong>Break-evens['expiry']

                    </strong>
                </div>
                <div className='col-md-4'>
                    {data1['break_even_points_expiry']}
                </div>
            </div>
            <div className='row mt-3'>
                <div className='col-md-8'>
                    <strong>Break-evens['t_0']

                    </strong>
                </div>
                <div className='col-md-4'>
                    {data1['break_even_points_t_0']}
                </div>
            </div>
            <div className='row mt-3'>
                <div className='col-md-8'>
                    <strong>Current Profit/Loss
                    </strong>
                </div>
                <div className='col-md-4'>
                    {data1['current_pl']}
                </div>
            </div>
            <div className='row mt-3'>
                <div className='col-md-8'>
                    <strong>Net Credit / (-)Debit
                    </strong>
                </div>
                <div className='col-md-4'>
                    {data1['net_credit']}
                </div>
            </div>
            <div className='row mt-3'>
                <div className='col-md-8'>
                    <strong>Estimated Margin/Premium
                    </strong>
                </div>
                <div className='col-md-4'>
                    0
                </div>
            </div>
        </div>
    );
}

