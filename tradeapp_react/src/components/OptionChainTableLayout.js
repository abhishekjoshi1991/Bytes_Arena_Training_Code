import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';



export default function OptionChainTableLayout(props) {
    const [hiddenColumns, setHiddenColumns] = useState([]);


    const handleChange = (event) => {
        const { value } = event.target;
        setHiddenColumns(value);
    };

    const columns1 = [
        { id: 'greeks', label: 'Greeks', minWidth: 170, span: 4, color: '#ffcc99' },
        { id: 'open_int', label: 'Open Interest', minWidth: 100, span: 4, color: '#ffcc99' },
        { id: 'volume', label: 'Volume', minWidth: 100, span: 1, color: '#ffcc99' },
        { id: 'premium', label: 'Premium', minWidth: 100, span: 15, color: '#ffcc99'},
        { id: 'strike', label: 'Strike', minWidth: 100, span: 1, color:'#ffff66' },
        { id: 'put_premium', label: 'Premium', minWidth: 100, span: 15, color:"#99ff99"},
        { id: 'put_volume', label: 'Volume', minWidth: 100, span: 1, color:"#99ff99" },
        { id: 'put_open_int', label: 'Open Interest', minWidth: 100, span: 4, color:"#99ff99" },
        { id: 'put_greeks', label: 'Greeks', minWidth: 100, span: 4, color:"#99ff99"},
        { id: 'oi_analysis', label: 'OI Analysis', minWidth: 100, span: 3, color:"#ffccff"},
        { id: 'straddle_prc', label: '', minWidth: 100, span: 1, color:"#ffccff"},
    ]

    const columns = [
        { id: 'call_vega', label: 'Vega', minWidth: 5, color: '#ffcc99'},
        { id: 'call_theta', label: 'Theta', minWidth: 5, color: '#ffcc99' },
        { id: 'call_gamma', label: 'Gamma', minWidth: 5, color: '#ffcc99' },
        { id: 'call_delta', label: 'Delta', minWidth: 5, color: '#ffcc99' },
        { id: 'call_bulid_up', label: 'Build-up', minWidth: 5, color: '#ffcc99' },
        { id: 'ce_open_interest', label: 'OI', minWidth: 5, color: '#ffcc99' },
        { id: 'ce_changein_open_interest', label: 'OI Change', minWidth: 5, color: '#ffcc99' },
        { id: 'ce_pchangein_open_interest', label: 'OI % Change', minWidth: 5, color: '#ffcc99' },
        { id: 'ce_total_traded_volume', label: 'Volume', minWidth: 5, color: '#ffcc99' },
        { id: 'call_iv_change', label: 'IV Change', minWidth: 5, color: '#ffcc99' },
        { id: 'ce_implied_volatility', label: 'IV', minWidth: 5, color: '#ffcc99' },
        { id: 'call_time_value', label: 'Time Value', minWidth: 5, color: '#ffcc99' },
        { id: 'call_intrinsic_value', label: 'Intrinsic Value', minWidth: 5, color: '#ffcc99' },
        { id: 'ce_moneyness', label: 'Moneyness', minWidth: 5, color: '#ffcc99' },
        { id: 'ce_last_price', label: 'LTP', minWidth: 5, color: '#ffcc99' },
        { id: 'ce_last_price_change', label: 'LTP Change', minWidth: 5, color: '#ffcc99' },
        { id: 'call_ltp_pchange', label: 'LTP % Change', minWidth: 5, color: '#ffcc99' },
        { id: 'call_vwap', label: 'VWAP/ATP', minWidth: 5, color: '#ffcc99' },
        { id: 'ce_high_price', label: 'Day High', minWidth: 5, color: '#ffcc99' },
        { id: 'ce_low_price', label: 'Day Low', minWidth: 5, color: '#ffcc99' },
        { id: 'call_oh', label: 'OH', minWidth: 5, color: '#ffcc99' },
        { id: 'call_ol', label: 'OL', minWidth: 5, color: '#ffcc99' },
        { id: 'ce_bidprice', label: 'Bid price', minWidth: 5, color: '#ffcc99' },
        { id: 'ce_ask_price', label: 'Ask Price', minWidth: 5, color: '#ffcc99' },

        { id: 'strike_price', label: 'Strike', minWidth: 5, color:'#ffff66'},

        { id: 'pe_bidprice', label: 'Bid Price', minWidth: 5, color: '#99ff99' },
        { id: 'pe_ask_price', label: 'Ask Price', minWidth: 5, color: '#99ff99' },
        { id: 'put_oh', label: 'OH', minWidth: 5, color: '#99ff99' },
        { id: 'put_ol', label: 'OL', minWidth: 5, color: '#99ff99' },
        { id: 'pe_high_price', label: 'Day High', minWidth: 5, color: '#99ff99' },
        { id: 'pe_low_price', label: 'Day Low', minWidth: 5, color: '#99ff99' },
        { id: 'put_vwap', label: 'VWAP /ATP', minWidth: 5, color: '#99ff99' },
        { id: 'put_ltp_pchange', label: 'LTP % Change', minWidth: 5, color: '#99ff99' },
        { id: 'pe_last_price_change', label: 'LTP Change', minWidth: 5, color: '#99ff99' },
        { id: 'pe_last_price', label: 'LTP', minWidth: 5, color: '#99ff99' },
        { id: 'pe_moneyness', label: 'Moneyness', minWidth: 5, color: '#99ff99' },
        { id: 'put_intrinsic_value', label: 'Intrinsic Value', minWidth: 5, color: '#99ff99' },
        { id: 'put_time_value', label: 'Time Value', minWidth: 5, color: '#99ff99' },
        { id: 'pe_implied_volatility', label: 'IV', minWidth: 5, color: '#99ff99' },
        { id: 'put_iv_change', label: 'IV Change', minWidth: 5, color: '#99ff99' },
        { id: 'put_volume', label: 'Volume', minWidth: 5, color: '#99ff99' },
        { id: 'pe_pchangein_open_interest', label: 'OI % Change', minWidth: 5, color: '#99ff99' },
        { id: 'pe_changein_open_interest', label: 'OI Change', minWidth: 5, color: '#99ff99' },
        { id: 'pe_open_interest', label: 'OI', minWidth: 5, color: '#99ff99' },
        { id: 'put_buildup', label: 'Build-up', minWidth: 5, color: '#99ff99' },
        { id: 'put_delta', label: 'Delta', minWidth: 5, color: '#99ff99' },
        { id: 'put_gamma', label: 'Gamma', minWidth: 5, color: '#99ff99' },
        { id: 'put_theta', label: 'Theta', minWidth: 5, color: '#99ff99' },
        { id: 'put_vega', label: 'Vega', minWidth: 5, color: '#99ff99' },

        { id: 'pe_oi_minus_ce_oi', label: 'PE OI (-)CE OI', minWidth: 5, color: '#ffccff' },
        { id: 'pcr_oi', label: 'PCR (OI)', minWidth: 5, color: '#ffccff' },
        { id: 'pe_oi_change_minus_ce_oi_change', label: 'PE OI Change (-) CE OI Change', minWidth: 5, color: '#ffccff' },
        { id: 'straddle_price', label: 'Straddle Price', minWidth: 5, color: '#ffccff' },

        // {
        //   id: 'size',
        //   label: 'Size\u00a0(km\u00b2)',
        //   minWidth: 10,
        //   align: 'right',
        //   format: (value) => value.toLocaleString('en-US'),
        // },

    ];

    console.log(props.tableData)
    const rows = props.tableData

    return (

        <Paper sx={{ width: '100%' }}>
            <Select
                multiple
                value={hiddenColumns}
                onChange={handleChange}
                renderValue={(selected) => selected.join(', ')}
            >
                {columns1.map((column) => (
                    <MenuItem key={column.id} value={column.id}>
                        <Checkbox checked={!hiddenColumns.includes(column.id)} />
                        {column.label}
                    </MenuItem>
                ))}
            </Select>
            <TableContainer >
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow >
                            <TableCell align="center" colSpan={24} sx={{
                            padding: "2px 2px",
                            border: "1px solid grey",
                            backgroundColor: "#c00000",
                            fontWeight: "bold",
                            color: "white"
                        }}>
                                CE
                            </TableCell>
                            <TableCell align="center" colSpan={1} sx={{
                            padding: "2px 2px",
                            borderTop: "1px solid grey",
                            borderBottom: "1px solid #ffff66 ",
                            fontWeight: "bold",
                            backgroundColor: "#ffff66"
                        }}>
                                
                            </TableCell>
                            <TableCell align="center" colSpan={24} sx={{
                            padding: "2px 2px",
                            border: "1px solid grey",
                            fontWeight: "bold",
                            backgroundColor: "#008000",
                            color: "white"
                        }}>
                                PE
                            </TableCell>
                            <TableCell align="center" colSpan={4} sx={{
                            padding: "2px 2px",
                            border: "1px solid grey",
                            fontWeight: "bold",
                            backgroundColor: "#c0004e",
                            color: "white"
                        }}>
                                CE & PE Combined
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            {columns1.map((column) => (
                                hiddenColumns.includes(column.id) ? null : (
                                    <TableCell
                                        key={column.id}
                                        align='center'
                                        colSpan={column.span}
                                        sx={{
                                            padding: "2px 2px",
                                            borderBottom: "1px solid #ffff66 ",
                                            border: column.id !=='strike' ? "1px solid grey" : '',
                                            fontWeight: "bold",
                                            backgroundColor: column.color,
                                        }}
                                    // style={{ top: 57, minWidth: column.minWidth }}
                                    
                                    >
                                        {column.id !=='strike' ? column.label : ''}
                                    </TableCell>)
                            ))}
                        </TableRow>
                        <TableRow>
                            {columns.map((column) => (
                                hiddenColumns.includes(column.id) ? null : (
                                    <TableCell
                                        key={column.id}
                                        align='center'
                                        // style={{ top: 57, minWidth: column.minWidth }}
                                        sx={{
                                            padding: "2px 2px",
                                            border: column.id !=='strike_price' ? "1px solid grey" : '',
                                            fontWeight: "bold",
                                            backgroundColor: column.color,
                                            // align: 'center'
                                        }}
                                    >
                                        {column.label}
                                    </TableCell>)
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                hiddenColumns.includes(column.id) ? null : (
                                                    <TableCell key={column.id} align='center' size='small' sx={{
                                                        padding: "0px 0px",
                                                        border: "1px solid #e0e0dc",
                                                    }}>
                                                        {value}
                                                    </TableCell>)
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
