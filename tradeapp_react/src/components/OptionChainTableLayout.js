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
        { id: 'premium', label: 'Premium', minWidth: 100, span: 15, color: '#ffcc99' },
        { id: 'strike', label: 'Strike', minWidth: 100, span: 1, color: '#ffff66' },
        { id: 'put_premium', label: 'Premium', minWidth: 100, span: 15, color: "#99ff99" },
        { id: 'put_volume', label: 'Volume', minWidth: 100, span: 1, color: "#99ff99" },
        { id: 'put_open_int', label: 'Open Interest', minWidth: 100, span: 4, color: "#99ff99" },
        { id: 'put_greeks', label: 'Greeks', minWidth: 100, span: 4, color: "#99ff99" },
        { id: 'oi_analysis', label: 'OI Analysis', minWidth: 100, span: 3, color: "#ffccff" },
        { id: 'straddle_prc', label: '', minWidth: 100, span: 1, color: "#ffccff" },
    ]

    const columns = [
        { id: 'ce_vega', label: 'Vega', minWidth: 5, color: '#ffcc99', parent: 'ce' },
        { id: 'ce_theta', label: 'Theta', minWidth: 5, color: '#ffcc99', parent: 'ce' },
        { id: 'ce_gamma', label: 'Gamma', minWidth: 5, color: '#ffcc99', parent: 'ce' },
        { id: 'ce_delta', label: 'Delta', minWidth: 5, color: '#ffcc99', parent: 'ce' },
        { id: 'ce_build_up', label: 'Build-up', minWidth: 5, color: '#ffcc99', parent: 'ce' },
        { id: 'ce_open_interest', label: 'OI', minWidth: 5, color: '#ffcc99', parent: 'ce' },
        { id: 'ce_changein_open_interest', label: 'OI Change', minWidth: 5, color: '#ffcc99', parent: 'ce' },
        { id: 'ce_pchangein_open_interest', label: 'OI % Change', minWidth: 5, color: '#ffcc99', parent: 'ce' },
        { id: 'ce_total_traded_volume', label: 'Volume', minWidth: 5, color: '#ffcc99', parent: 'ce' },
        { id: 'ce_iv_change', label: 'IV Change', minWidth: 5, color: '#ffcc99', parent: 'ce' },
        { id: 'ce_implied_volatility', label: 'IV', minWidth: 5, color: '#ffcc99', parent: 'ce' },
        { id: 'ce_time_value', label: 'Time Value', minWidth: 5, color: '#ffcc99', parent: 'ce' },
        { id: 'ce_intrinsic_value', label: 'Intrinsic Value', minWidth: 5, color: '#ffcc99', parent: 'ce' },
        { id: 'ce_moneyness', label: 'Moneyness', minWidth: 5, color: '#ffcc99', parent: 'ce' },
        { id: 'ce_last_price', label: 'LTP', minWidth: 5, color: '#ffcc99', parent: 'ce' },
        { id: 'ce_ltp_change', label: 'LTP Change', minWidth: 5, color: '#ffcc99', parent: 'ce' },
        { id: 'ce_ltp_percentage_change', label: 'LTP % Change', minWidth: 5, color: '#ffcc99', parent: 'ce' },
        { id: 'call_atp', label: 'VWAP/ATP', minWidth: 5, color: '#ffcc99', parent: 'ce' },
        { id: 'ce_high_price', label: 'Day High', minWidth: 5, color: '#ffcc99', parent: 'ce' },
        { id: 'ce_low_price', label: 'Day Low', minWidth: 5, color: '#ffcc99', parent: 'ce' },
        { id: 'ce_oh', label: 'OH', minWidth: 5, color: '#ffcc99', parent: 'ce' },
        { id: 'ce_ol', label: 'OL', minWidth: 5, color: '#ffcc99', parent: 'ce' },
        { id: 'ce_bidprice', label: 'Bid price', minWidth: 5, color: '#ffcc99', parent: 'ce' },
        { id: 'ce_ask_price', label: 'Ask Price', minWidth: 5, color: '#ffcc99', parent: 'ce' },

        { id: 'strike_price', label: 'Strike', minWidth: 5, color: '#ffff66' },

        { id: 'pe_bidprice', label: 'Bid Price', minWidth: 5, color: '#99ff99', parent: 'pe' },
        { id: 'pe_ask_price', label: 'Ask Price', minWidth: 5, color: '#99ff99', parent: 'pe' },
        { id: 'pe_oh', label: 'OH', minWidth: 5, color: '#99ff99', parent: 'pe' },
        { id: 'pe_ol', label: 'OL', minWidth: 5, color: '#99ff99', parent: 'pe' },
        { id: 'pe_high_price', label: 'Day High', minWidth: 5, color: '#99ff99', parent: 'pe' },
        { id: 'pe_low_price', label: 'Day Low', minWidth: 5, color: '#99ff99', parent: 'pe' },
        { id: 'put_atp', label: 'VWAP /ATP', minWidth: 5, color: '#99ff99', parent: 'pe' },
        { id: 'pe_ltp_percentage_change', label: 'LTP % Change', minWidth: 5, color: '#99ff99', parent: 'pe' },
        { id: 'pe_ltp_change', label: 'LTP Change', minWidth: 5, color: '#99ff99', parent: 'pe' },
        { id: 'pe_last_price', label: 'LTP', minWidth: 5, color: '#99ff99', parent: 'pe' },
        { id: 'pe_moneyness', label: 'Moneyness', minWidth: 5, color: '#99ff99', parent: 'pe' },
        { id: 'pe_intrinsic_value', label: 'Intrinsic Value', minWidth: 5, color: '#99ff99', parent: 'pe' },
        { id: 'pe_time_value', label: 'Time Value', minWidth: 5, color: '#99ff99', parent: 'pe' },
        { id: 'pe_implied_volatility', label: 'IV', minWidth: 5, color: '#99ff99', parent: 'pe' },
        { id: 'pe_iv_change', label: 'IV Change', minWidth: 5, color: '#99ff99', parent: 'pe' },
        { id: 'pe_total_traded_volume', label: 'Volume', minWidth: 5, color: '#99ff99', parent: 'pe' },
        { id: 'pe_pchangein_open_interest', label: 'OI % Change', minWidth: 5, color: '#99ff99', parent: 'pe' },
        { id: 'pe_changein_open_interest', label: 'OI Change', minWidth: 5, color: '#99ff99', parent: 'pe' },
        { id: 'pe_open_interest', label: 'OI', minWidth: 5, color: '#99ff99', parent: 'pe' },
        { id: 'pe_build_up', label: 'Build-up', minWidth: 5, color: '#99ff99', parent: 'pe' },
        { id: 'put_delta', label: 'Delta', minWidth: 5, color: '#99ff99', parent: 'pe' },
        { id: 'put_gamma', label: 'Gamma', minWidth: 5, color: '#99ff99', parent: 'pe' },
        { id: 'put_theta', label: 'Theta', minWidth: 5, color: '#99ff99', parent: 'pe' },
        { id: 'put_vega', label: 'Vega', minWidth: 5, color: '#99ff99', parent: 'pe' },

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
                                            border: column.id !== 'strike' ? "1px solid grey" : '',
                                            fontWeight: "bold",
                                            backgroundColor: column.color,
                                        }}
                                    // style={{ top: 57, minWidth: column.minWidth }}

                                    >
                                        {column.id !== 'strike' ? column.label : ''}
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
                                            border: column.id !== 'strike_price' ? "1px solid grey" : '',
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
                                                        // backgroundColor: column.id === 'ce_build_up' ? row.ce_color : column.id === 'pe_build_up' ? row.pe_color : '',
                                                        backgroundColor: row.ce_moneyness === 'ITM' && column.parent === 'ce' ? '#e7e6e6' : row.pe_moneyness === 'ITM' && column.parent === 'pe' ? '#e7e6e6' : '',
                                                        color: column.id === 'ce_changein_open_interest' && value > 0 ? "#ff0000" : column.id === 'ce_changein_open_interest' && value < 0 ? '#00cc00' : column.id === 'pe_changein_open_interest' && value > 0 ? '#00cc00' : column.id === 'pe_changein_open_interest' && value < 0 ? '#ff0000' : column.label === 'LTP Change' && value > 0 ? '#00cc00' : column.label === 'LTP Change' && value < 0 ? '#ff0000' : ''
                                                    }}><div style={column.id === 'ce_build_up' ? { backgroundColor: row.ce_color } : column.id === 'pe_build_up' ? { backgroundColor: row.pe_color } : { backgroundColor: '' }} > {value}</div>

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
