import React from 'react'

import { Table } from 'rsuite';
const { Column, ColumnGroup, HeaderCell, Cell } = Table;

const data = [
    {
        id: 1,
        call_vega: 1,
        call_theta: 2,
        call_gamma: 3,
        call_delta: 4,
        call_bulid_up: 5,
        call_oi: 6,
        call_oi_change: 7,
        call_oi_pchange: 8,
        call_volume: 9,
        call_iv_change: 10,
        call_iv: 11,
        call_time_value: 12,
        call_intrinsic_value: 13,
        call_moneyness: 14,
        call_ltp: 15,
        call_ltp_pchange: 16,
        call_vwap: 17,
        call_day_high: 18,
        call_day_low: 19,
        call_oh: 20,
        call_ol: 21,
        call_bid_price: 22,
        call_ask_price: 23,
        call_strike: 24,
        put_bid_price:25,
        put_ask_price:26,
        put_oh:27,
        put_ol:28,
        put_day_high:29,
        put_day_low:30,
        put_vwap:31,
        put_ltp_pchange:32,
        put_ltp:33,
        put_moneyness:34,
        put_intrinsic_value:35,
        put_time_value:36,
        put_iv:37,
        put_iv_change:38,
        put_volume:37,
        put_oi_pchange:38,
        put_oi_change:39,
        put_oi:40,
        put_buildup:41,
        put_delta:42,
        put_gamma:43,
        put_theta:44,
        put_vega:45,
        // call_ask_price: '',
        // call_ask_price: '',
        // call_ask_price: '',
        // call_ask_price: '',
        // call_ask_price: '',



        email: 'Leora13@yahoo.com',
        firstName: 'Ernest Schuppe Anderson',
        lastName: null,
        city: 'New Gust',
        companyName: 'Lebsack - Nicolas'
    }
];

export default function OptionChainTableLayoutRsuite() {
    return (
        <Table bordered cellBordered height={420} headerHeight={80} data={data}>
            {/* <ColumnGroup header="CE" align='center'> */}
            {/* <Column width={70} align="center">
                    <HeaderCell>Id</HeaderCell>
                    <Cell dataKey="id" />
                </Column> */}
            <ColumnGroup header="Greeks" align='center'>
                <Column width={70}>
                    <HeaderCell>Vega</HeaderCell>
                    <Cell dataKey="call_vega" />
                </Column>
                <Column width={70}>
                    <HeaderCell>Theta</HeaderCell>
                    <Cell dataKey="call_theta" />
                </Column>
                <Column width={70}>
                    <HeaderCell>Gamma</HeaderCell>
                    <Cell dataKey="call_gamma" />
                </Column>
                <Column width={70}>
                    <HeaderCell>Delta</HeaderCell>
                    <Cell dataKey="call_delta" />
                </Column>

            </ColumnGroup>
            <ColumnGroup header="Open Interest" align='center'>
                <Column width={70}>
                    <HeaderCell>Build-up</HeaderCell>
                    <Cell dataKey="call_bulid_up" />
                </Column>
                <Column width={70}>
                    <HeaderCell>OI</HeaderCell>
                    <Cell dataKey="call_oi" />
                </Column>
                <Column width={70}>
                    <HeaderCell>OI Change</HeaderCell>
                    <Cell dataKey="call_oi_change" />
                </Column>
                <Column width={70}>
                    <HeaderCell>OI % Change</HeaderCell>
                    <Cell dataKey="call_oi_pchange" />
                </Column>
            </ColumnGroup>
            <ColumnGroup header="Volumn" align='center'>
                <Column width={70} colSpan={2}>
                    <HeaderCell>Volumn</HeaderCell>
                    <Cell dataKey="call_volume" />
                </Column>
            </ColumnGroup>
            <ColumnGroup header="Premium" align='center'>
                <Column width={70} colSpan={2}>
                    <HeaderCell>IV Change</HeaderCell>
                    <Cell dataKey="call_iv_change" />
                </Column>
                <Column width={70} colSpan={2}>
                    <HeaderCell>IV</HeaderCell>
                    <Cell dataKey="call_iv" />
                </Column>
                <Column width={70} colSpan={2}>
                    <HeaderCell>Time Val</HeaderCell>
                    <Cell dataKey="call_time_value" />
                </Column>
                <Column width={70} colSpan={2}>
                    <HeaderCell>Intrinsic Value</HeaderCell>
                    <Cell dataKey="call_intrinsic_value" />
                </Column>
                <Column width={70} colSpan={2}>
                    <HeaderCell>Moneyness</HeaderCell>
                    <Cell dataKey="call_moneyness" />
                </Column>
                <Column width={70} colSpan={2}>
                    <HeaderCell>LTP</HeaderCell>
                    <Cell dataKey="call_ltp" />
                </Column>
                <Column width={70} colSpan={2}>
                    <HeaderCell>LTP % Change</HeaderCell>
                    <Cell dataKey="call_ltp_pchange" />
                </Column>
                <Column width={70} colSpan={2}>
                    <HeaderCell>VWAP/ATP</HeaderCell>
                    <Cell dataKey="call_vwap" />
                </Column>
                <Column width={70} colSpan={2}>
                    <HeaderCell>Day High</HeaderCell>
                    <Cell dataKey="call_day_high" />
                </Column>
                <Column width={70} colSpan={2}>
                    <HeaderCell>Day Low</HeaderCell>
                    <Cell dataKey="call_day_low" />
                </Column>
                <Column width={70} colSpan={2}>
                    <HeaderCell>OH</HeaderCell>
                    <Cell dataKey="call_oh" />
                </Column>
                <Column width={70} colSpan={2}>
                    <HeaderCell>OL</HeaderCell>
                    <Cell dataKey="call_ol" />
                </Column>
                <Column width={70} colSpan={2}>
                    <HeaderCell>Bid Price</HeaderCell>
                    <Cell dataKey="call_bid_price" />
                </Column>
                <Column width={70} colSpan={2}>
                    <HeaderCell>Ask Price</HeaderCell>
                    <Cell dataKey="call_ask_price" />
                </Column>
            </ColumnGroup>
            <Column width={70} colSpan={2}>
                <HeaderCell>Strike</HeaderCell>
                <Cell dataKey="call_strike" />
            </Column>

            <ColumnGroup header="Premium" align='center'>
                <Column width={70} colSpan={2}>
                    <HeaderCell>Bid Price</HeaderCell>
                    <Cell dataKey="put_bid_price" />
                </Column>
                <Column width={70} colSpan={2}>
                    <HeaderCell>Ask Price</HeaderCell>
                    <Cell dataKey="put_ask_price" />
                </Column>
                <Column width={70} colSpan={2}>
                    <HeaderCell>OH</HeaderCell>
                    <Cell dataKey="put_oh" />
                </Column>
                <Column width={70} colSpan={2}>
                    <HeaderCell>OL</HeaderCell>
                    <Cell dataKey="put_ol" />
                </Column>
                <Column width={70} colSpan={2}>
                    <HeaderCell>Day High</HeaderCell>
                    <Cell dataKey="put_day_high" />
                </Column>
                <Column width={70} colSpan={2}>
                    <HeaderCell>Day Low</HeaderCell>
                    <Cell dataKey="put_day_low" />
                </Column>
                <Column width={70} colSpan={2}>
                    <HeaderCell>VWAP/ATP</HeaderCell>
                    <Cell dataKey="put_vwap" />
                </Column>
                <Column width={70} colSpan={2}>
                    <HeaderCell>LTP % Change</HeaderCell>
                    <Cell dataKey="put_ltp_pchange" />
                </Column>
                <Column width={70} colSpan={2}>
                    <HeaderCell>LTP</HeaderCell>
                    <Cell dataKey="put_ltp" />
                </Column>
                <Column width={70} colSpan={2}>
                    <HeaderCell>Moneyness</HeaderCell>
                    <Cell dataKey="put_moneyness" />
                </Column>
                <Column width={70} colSpan={2}>
                    <HeaderCell>Intrinsic Value</HeaderCell>
                    <Cell dataKey="put_intrinsic_value" />
                </Column>
                <Column width={70} colSpan={2}>
                    <HeaderCell>Time Value</HeaderCell>
                    <Cell dataKey="put_time_value" />
                </Column>
                <Column width={70} colSpan={2}>
                    <HeaderCell>IV</HeaderCell>
                    <Cell dataKey="put_iv" />
                </Column>
                <Column width={70} colSpan={2}>
                    <HeaderCell>IV Change</HeaderCell>
                    <Cell dataKey="put_iv_change" />
                </Column>
            </ColumnGroup>
            {/* <ColumnGroup header="Name">
                    <Column width={200} colSpan={2}>
                        <HeaderCell>Address</HeaderCell>
                        <Cell dataKey="city" />
                    </Column>

                    <Column width={200} flexGrow={1}>
                        <HeaderCell>Company Name</HeaderCell>
                        <Cell dataKey="companyName" />
                    </Column>
                </ColumnGroup> */}
            {/* </ColumnGroup> */}
        </Table>
    )
}
