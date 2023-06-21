import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
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

    const header_columns = [
        // { id: 'ltp_time', label: '', color: '', span: 1, top: '1px solid grey', bottom: 'none', left: '1px solid grey', right: '1px solid grey' },
        { id: 'ce', label: 'CE', color: '#c00000', span: 24, top: '1px solid grey', bottom: 'none', left: '1px solid grey', right: '1px solid grey' },
        { id: 'str', label: '', color: '#ffff66', span: 1, top: '1px solid grey', bottom: 'none', left: '', right: '1px solid grey' },
        { id: 'pe', label: 'PE', color: '#008000', span: 24, top: '1px solid grey', bottom: 'none', left: '', right: '1px solid grey' },
        { id: 'combo', label: 'CE & PE Combined', color: '#c0004e', span: 4, top: '1px solid grey', bottom: 'none', left: '', right: '1px solid grey' },
    ]

    const columns1 = [
        { id: 'ce_time_ltp', label: '', minWidth: 100, span: 1, color: '#ffcc99', top: '1px solid grey', bottom: 'none', left: '1px solid grey', right: '1px solid grey' },
        { id: 'greeks', label: 'Greeks', minWidth: 170, span: 4, color: '#ffcc99', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'open_int', label: 'Open Interest', minWidth: 100, span: 3, color: '#ffcc99', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'volume', label: 'Volume', minWidth: 100, span: 1, color: '#ffcc99', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'premium', label: 'Premium', minWidth: 100, span: 15, color: '#ffcc99', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'strike', label: 'Strike', minWidth: 100, span: 1, color: '#ffff66', top: 'none', bottom: 'none', left: 'none', right: '1px solid grey' },
        { id: 'put_premium', label: 'Premium', minWidth: 100, span: 15, color: "#99ff99", top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'put_volume', label: 'Volume', minWidth: 100, span: 1, color: "#99ff99", top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'put_open_int', label: 'Open Interest', minWidth: 100, span: 3, color: "#99ff99", top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'put_greeks', label: 'Greeks', minWidth: 100, span: 4, color: "#99ff99", top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'pe_time_ltp', label: '', minWidth: 100, span: 1, color: "#99ff99", top: '1px solid grey', bottom: 'none', left: 'none', right: '1px solid grey' },
        { id: 'oi_analysis', label: 'OI Analysis', minWidth: 100, span: 3, color: "#ffccff", top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'straddle_prc', label: '', minWidth: 100, span: 1, color: "#ffccff", top: '1px solid grey', bottom: 'none', left: 'none', right: '1px solid grey' },
    ]

    const columns = [
        { id: 'ce_ltp_time', label: 'LTP Time', minWidth: 70, color: '#ffcc99', parent: 'ce', top: 'none', bottom: '1px solid grey', left: '1px solid grey', right: '1px solid grey' },
        { id: 'ce_vega', label: 'Vega', minWidth: 70, color: '#ffcc99', parent: 'ce', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'ce_theta', label: 'Theta', minWidth: 70, color: '#ffcc99', parent: 'ce', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'ce_gamma', label: 'Gamma', minWidth: 70, color: '#ffcc99', parent: 'ce', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'ce_delta', label: 'Delta', minWidth: 70, color: '#ffcc99', parent: 'ce', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'ce_build_up', label: 'Build-up', minWidth: 70, color: '#ffcc99', parent: 'ce', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'ce_open_interest', label: 'OI', minWidth: 70, color: '#ffcc99', parent: 'ce', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'ce_oi_chg_combined', label: 'OI Chg', minWidth: 120, color: '#ffcc99', parent: 'ce', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        // { id: 'ce_changein_open_interest', label: 'OI Chg', minWidth: 70, color: '#ffcc99', parent: 'ce', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        // { id: 'ce_pchangein_open_interest', label: 'OI % Chg', minWidth: 70, color: '#ffcc99', parent: 'ce', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'ce_total_traded_volume', label: 'Volume', minWidth: 70, color: '#ffcc99', parent: 'ce', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'ce_iv_change', label: 'IV Change', minWidth: 70, color: '#ffcc99', parent: 'ce', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'ce_iv', label: 'IV', minWidth: 70, color: '#ffcc99', parent: 'ce', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'ce_time_value', label: 'Time Value', minWidth: 70, color: '#ffcc99', parent: 'ce', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'ce_intrinsic_value', label: 'Intrinsic Value', minWidth: 70, color: '#ffcc99', parent: 'ce', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'ce_moneyness', label: 'Moneyness', minWidth: 70, color: '#ffcc99', parent: 'ce', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'ce_last_price', label: 'LTP', minWidth: 70, color: '#ffcc99', parent: 'ce', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'ce_ltp_chg_combined', label: 'LTP Chg', minWidth: 120, color: '#ffcc99', parent: 'ce', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        // { id: 'ce_ltp_change', label: 'LTP Chg', minWidth: 70, color: '#ffcc99', parent: 'ce', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        // { id: 'ce_pchange', label: 'LTP % Chg', minWidth: 70, color: '#ffcc99', parent: 'ce', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'ce_vwap', label: 'VWAP/ATP', minWidth: 70, color: '#ffcc99', parent: 'ce', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'ce_open_price', label: 'Day Open', minWidth: 70, color: '#ffcc99', parent: 'ce', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'ce_high_price', label: 'Day High', minWidth: 70, color: '#ffcc99', parent: 'ce', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'ce_low_price', label: 'Day Low', minWidth: 70, color: '#ffcc99', parent: 'ce', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'ce_oh', label: 'OH', minWidth: 70, color: '#ffcc99', parent: 'ce', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'ce_ol', label: 'OL', minWidth: 70, color: '#ffcc99', parent: 'ce', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'ce_bidprice', label: 'Bid price', minWidth: 70, color: '#ffcc99', parent: 'ce', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'ce_ask_price', label: 'Ask Price', minWidth: 70, color: '#ffcc99', parent: 'ce', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },

        { id: 'strike_price', label: 'Strike', minWidth: 70, color: '#ffff66', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },

        { id: 'pe_bidprice', label: 'Bid Price', minWidth: 70, color: '#99ff99', parent: 'pe', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'pe_ask_price', label: 'Ask Price', minWidth: 70, color: '#99ff99', parent: 'pe', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'pe_oh', label: 'OH', minWidth: 70, color: '#99ff99', parent: 'pe', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'pe_ol', label: 'OL', minWidth: 70, color: '#99ff99', parent: 'pe', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'pe_high_price', label: 'Day High', minWidth: 70, color: '#99ff99', parent: 'pe', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'pe_low_price', label: 'Day Low', minWidth: 70, color: '#99ff99', parent: 'pe', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'pe_open_price', label: 'Day Open', minWidth: 70, color: '#99ff99', parent: 'pe', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'pe_vwap', label: 'VWAP /ATP', minWidth: 70, color: '#99ff99', parent: 'pe', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        // { id: 'pe_pchange', label: 'LTP % Chg', minWidth: 70, color: '#99ff99', parent: 'pe', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        // { id: 'pe_ltp_change', label: 'LTP Chg', minWidth: 70, color: '#99ff99', parent: 'pe', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'pe_ltp_chg_combined', label: 'LTP Chg', minWidth: 120, color: '#99ff99', parent: 'pe', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'pe_last_price', label: 'LTP', minWidth: 70, color: '#99ff99', parent: 'pe', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'pe_moneyness', label: 'Moneyness', minWidth: 70, color: '#99ff99', parent: 'pe', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'pe_intrinsic_value', label: 'Intrinsic Value', minWidth: 70, color: '#99ff99', parent: 'pe', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'pe_time_value', label: 'Time Value', minWidth: 70, color: '#99ff99', parent: 'pe', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'pe_iv', label: 'IV', minWidth: 70, color: '#99ff99', parent: 'pe', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'pe_iv_change', label: 'IV Change', minWidth: 70, color: '#99ff99', parent: 'pe', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'pe_total_traded_volume', label: 'Volume', minWidth: 70, color: '#99ff99', parent: 'pe', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        // { id: 'pe_pchangein_open_interest', label: 'OI % Chg', minWidth: 70, color: '#99ff99', parent: 'pe', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        // { id: 'pe_changein_open_interest', label: 'OI Chg', minWidth: 70, color: '#99ff99', parent: 'pe', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'pe_oi_chg_combined', label: 'OI Chg', minWidth: 120, color: '#99ff99', parent: 'pe', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'pe_open_interest', label: 'OI', minWidth: 70, color: '#99ff99', parent: 'pe', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'pe_build_up', label: 'Build-up', minWidth: 70, color: '#99ff99', parent: 'pe', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'pe_delta', label: 'Delta', minWidth: 70, color: '#99ff99', parent: 'pe', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'pe_gamma', label: 'Gamma', minWidth: 70, color: '#99ff99', parent: 'pe', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'pe_theta', label: 'Theta', minWidth: 70, color: '#99ff99', parent: 'pe', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'pe_vega', label: 'Vega', minWidth: 70, color: '#99ff99', parent: 'pe', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'pe_ltp_time', label: 'LTP Time', minWidth: 70, color: '#99ff99', parent: 'pe', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },

        { id: 'pe_oi_minus_ce_oi', label: 'PE OI (-) CE OI', minWidth: 70, color: '#ffccff', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'pcr_oi', label: 'PCR (OI)', minWidth: 70, color: '#ffccff', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'pe_oi_change_minus_ce_oi_change', label: 'PE OI Chg (-) CE OI Chg', minWidth: 90, color: '#ffccff', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'straddle_price', label: 'Straddle Price', minWidth: 70, color: '#ffccff', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },

    ];

    const rows = props.tableData
    let lotorqty = props.lotqty

    return (

        <Paper sx={{ width: '100%' }} className='mt-2'>
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
            <TableContainer className='mt-2' sx={{ maxHeight: 1000 }} >
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {header_columns.map((column) => (
                                hiddenColumns.includes(column.id) ? null : (
                                    <TableCell
                                        key={column.id}
                                        align='center'
                                        colSpan={column.span}
                                        // style={{ minWidth: column.minWidth }}
                                        sx={{
                                            padding: "2px 2px",
                                            borderTop: column.top,
                                            borderBottom: column.bottom,
                                            borderLeft: column.left,
                                            borderRight: column.right,
                                            fontWeight: "bold",
                                            color: 'white',
                                            backgroundColor: column.color,
                                        }}

                                    >
                                        {column.id !== 'strike' ? column.label : ''}
                                    </TableCell>)
                            ))}
                        </TableRow>
                        <TableRow>
                            {columns1.map((column) => (
                                hiddenColumns.includes(column.id) ? null : (
                                    <TableCell
                                        key={column.id}
                                        align='center'
                                        colSpan={column.span}
                                        // style={{ minWidth: column.minWidth }}
                                        style={{ minWidth: column.minWidth, fontSize: 12 }}
                                        sx={{
                                            padding: "2px 2px",
                                            borderTop: column.top,
                                            borderBottom: column.bottom,
                                            borderLeft: column.left,
                                            borderRight: column.right,
                                            fontWeight: "bold",
                                            backgroundColor: column.color,
                                        }}
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
                                        // style={{ maxWidth: column.minWidth }}
                                        style={{ minWidth: column.minWidth, fontSize: 12 }}
                                        sx={{
                                            padding: "2px 2px",
                                            // border: column.id !== 'strike_price' ? "1px solid grey" : '',
                                            borderTop: column.top,
                                            borderBottom: column.bottom,
                                            borderLeft: column.left,
                                            borderRight: column.right,
                                            fontWeight: "bold",
                                            backgroundColor: column.color,
                                            // width: 150,
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
                                if (row.total !== 'yes') {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    hiddenColumns.includes(column.id) ? null : (
                                                        <TableCell key={column.id} align='center' size='small'
                                                            style={{ fontSize: 13 }}
                                                            sx={{
                                                                padding: "0px 0px",
                                                                border: "1px solid #F8F8F8",
                                                                height: '35px',
                                                                // backgroundColor: column.id === 'ce_build_up' ? row.ce_color : column.id === 'pe_build_up' ? row.pe_color : '',
                                                                backgroundColor: row.ce_moneyness === 'ITM' && column.parent === 'ce' ? '#e7e6e6' : row.pe_moneyness === 'ITM' && column.parent === 'pe' ? '#e7e6e6' : row.ce_moneyness === 'ATM' || column.id === 'strike_price' ? '#ffff66' : '',
                                                                color: column.id === 'ce_oi_chg_combined' ? row.ce_oi_chg_color : column.id === 'pe_oi_chg_combined' ? row.pe_oi_chg_color : column.id === 'ce_ltp_chg_combined' ? row.ce_ltp_chg_color : column.id === 'pe_ltp_chg_combined' ? row.pe_ltp_chg_color : ''
                                                                // color: column.id === 'ce_changein_open_interest' && value > 0 ? "#ff0000" : column.id === 'ce_changein_open_interest' && value < 0 ? '#00cc00' : column.id === 'pe_changein_open_interest' && value > 0 ? '#00cc00' : column.id === 'pe_changein_open_interest' && value < 0 ? '#ff0000' : column.label === 'LTP Change' && value > 0 ? '#00cc00' : column.label === 'LTP Change' && value < 0 ? '#ff0000' : ''
                                                            }}>
                                                            <div className='m-1 rounded' style={column.id === 'ce_build_up' ? { backgroundColor: row.ce_color } : column.id === 'pe_build_up' ? { backgroundColor: row.pe_color } : { backgroundColor: '' }} >
                                                                {/* {value} */}
                                                                {lotorqty === 'qty' && (column.id === 'ce_open_interest' || column.id === 'ce_changein_open_interest' || column.id === 'ce_total_traded_volume' || column.id === 'pe_open_interest' || column.id === 'pe_changein_open_interest' || column.id === 'pe_total_traded_volume') ? value * 50 : value}
                                                            </div>

                                                        </TableCell>)
                                                );
                                            })}
                                        </TableRow>
                                    )
                                }
                                else {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    hiddenColumns.includes(column.id) ? null : (
                                                        <TableCell key={column.id} align='center' size='small' sx={{
                                                            padding: "0px 0px",
                                                            backgroundColor: '#cfcfcf',
                                                            height: '30px',
                                                            fontWeight: 'bold'
                                                        }}>
                                                            <div style={column.id === 'ce_build_up' ? { backgroundColor: row.ce_color } : column.id === 'pe_build_up' ? { backgroundColor: row.pe_color } : { backgroundColor: '' }} >
                                                                {/* {value} */}
                                                                {lotorqty === 'qty' && (column.id === 'ce_open_interest' || column.id === 'ce_changein_open_interest' || column.id === 'ce_total_traded_volume' || column.id === 'pe_open_interest' || column.id === 'pe_changein_open_interest' || column.id === 'pe_total_traded_volume') ? value * 50 : value}
                                                            </div>

                                                        </TableCell>)
                                                );
                                            })}
                                        </TableRow>
                                    )
                                }
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
