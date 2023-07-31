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
import { Android, Opacity } from '@mui/icons-material';
import LinearProgress from "@mui/material/LinearProgress"
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        color_ce: {
            main: '#f77560',
        },
        color_pe: {
            main: '#94eb78',
        },
    },
});


export default function OptionChainTableLayout(props) {
    const [hiddenColumns, setHiddenColumns] = useState([]);

    const handleChange = (event) => {
        console.log(event.target)
        const { value } = event.target;
        setHiddenColumns(value);
    };

    // Note**: shoe_ce_dash or show_pe_dash isused when strike in not traded for call but traded for put or vice versa and
    // show_ce_not_traded_dash and show_pe_not_traded_dash is used when option is not traded throughout the day
    const header_columns = [
        // { id: 'ltp_time', label: '', color: '', span: 1, top: '1px solid grey', bottom: 'none', left: '1px solid grey', right: '1px solid grey' },
        { id: 'ce', label: 'CE', color: '#c00000', span: 23, top: '1px solid grey', bottom: 'none', left: '1px solid grey', right: '1px solid grey' },
        { id: 'str', label: '', color: '#f7f7a3', span: 1, top: '1px solid grey', bottom: 'none', left: '', right: '1px solid grey' },
        { id: 'pe', label: 'PE', color: '#008000', span: 23, top: '1px solid grey', bottom: 'none', left: '', right: '1px solid grey' },
        { id: 'combo', label: 'CE & PE Combined', color: '#c0004e', span: 4, top: '1px solid grey', bottom: 'none', left: '', right: '1px solid grey' },
    ]

    const columns1 = [
        { id: 'ce_time_ltp', label: '', minWidth: 100, span: 1, color: '#ffcc99', top: '1px solid grey', bottom: 'none', left: '1px solid grey', right: '1px solid grey' },
        { id: 'greeks', label: 'Greeks', minWidth: 170, span: 4, color: '#ffcc99', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'volatility', label: 'Volatility', minWidth: 100, span: 2, color: '#ffcc99', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'open_int', label: 'Open Interest', minWidth: 100, span: 3, color: '#ffcc99', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'volume', label: 'Volume', minWidth: 100, span: 1, color: '#ffcc99', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'premium', label: 'Premium', minWidth: 100, span: 12, color: '#ffcc99', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'strike', label: 'Strike', minWidth: 100, span: 1, color: '#f7f7a3', top: 'none', bottom: 'none', left: 'none', right: '1px solid grey' },
        { id: 'put_premium', label: 'Premium', minWidth: 100, span: 12, color: "#99ff99", top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'put_volume', label: 'Volume', minWidth: 100, span: 1, color: "#99ff99", top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'put_open_int', label: 'Open Interest', minWidth: 100, span: 3, color: "#99ff99", top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'put_volatility', label: 'Volatility', minWidth: 100, span: 2, color: "#99ff99", top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'put_greeks', label: 'Greeks', minWidth: 100, span: 4, color: "#99ff99", top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'pe_time_ltp', label: '', minWidth: 100, span: 1, color: "#99ff99", top: '1px solid grey', bottom: 'none', left: 'none', right: '1px solid grey' },
        { id: 'oi_analysis', label: 'OI Analysis', minWidth: 100, span: 3, color: "#ffccff", top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'straddle_prc', label: '', minWidth: 100, span: 1, color: "#ffccff", top: '1px solid grey', bottom: 'none', left: 'none', right: '1px solid grey' },
    ]

    const columns = [
        { id: 'ce_ltp_time', label: 'LTP Time', minWidth: 70, color: '#ffcc99', parent: 'ce', top: 'none', bottom: '1px solid grey', left: '1px solid grey', right: '1px solid grey', show_ce_dash: true, show_ce_not_traded_dash: true },
        { id: 'ce_vega', label: 'Vega', minWidth: 70, color: '#ffcc99', parent: 'ce', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_ce_dash: true, show_ce_not_traded_dash: true },
        { id: 'ce_theta', label: 'Theta', minWidth: 70, color: '#ffcc99', parent: 'ce', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_ce_dash: true, show_ce_not_traded_dash: true },
        { id: 'ce_gamma', label: 'Gamma', minWidth: 70, color: '#ffcc99', parent: 'ce', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_ce_dash: true, show_ce_not_traded_dash: true },
        { id: 'ce_delta', label: 'Delta', minWidth: 70, color: '#ffcc99', parent: 'ce', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_ce_dash: true, show_ce_not_traded_dash: true },
        { id: 'ce_iv_change', label: 'IV Change', minWidth: 70, color: '#ffcc99', parent: 'ce', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_ce_dash: true, show_ce_not_traded_dash: true },
        { id: 'ce_iv_calculated', label: 'IV', minWidth: 70, color: '#ffcc99', parent: 'ce', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_ce_dash: true, show_ce_not_traded_dash: true },
        { id: 'ce_build_up', label: 'Build-up', minWidth: 70, color: '#ffcc99', parent: 'ce', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        // { id: 'ce_open_interest', label: 'OI', minWidth: 70, color: '#ffcc99', parent: 'ce', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_ce_dash: true, show_ce_oi_greater_zero: true },
        { id: 'ce_oi_bar', label: 'OI', minWidth: 150, color: '#ffcc99', parent: 'ce', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_ce_dash: true },
        { id: 'ce_oi_chg_combined', label: 'OI Chg', minWidth: 120, color: '#ffcc99', parent: 'ce', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_ce_dash: true, show_ce_not_traded_dash: true },
        { id: 'ce_total_traded_volume', label: 'Volume', minWidth: 70, color: '#ffcc99', parent: 'ce', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_ce_dash: true, show_ce_not_traded_dash: true },

        { id: 'ce_time_value', label: 'Time Value', minWidth: 70, color: '#ffcc99', parent: 'ce', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_ce_dash: true },
        { id: 'ce_intrinsic_value', label: 'Intrinsic Value', minWidth: 70, color: '#ffcc99', parent: 'ce', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'ce_last_price', label: 'LTP', minWidth: 70, color: '#ffcc99', parent: 'ce', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_ce_dash: true, show_ce_not_traded_dash: true },
        { id: 'ce_ltp_chg_combined', label: 'LTP Chg', minWidth: 120, color: '#ffcc99', parent: 'ce', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_ce_dash: true, show_ce_not_traded_dash: true },
        { id: 'ce_vwap', label: 'VWAP/ATP', minWidth: 70, color: '#ffcc99', parent: 'ce', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_ce_dash: true, show_ce_not_traded_dash: true },
        { id: 'ce_open_price', label: 'Day Open', minWidth: 70, color: '#ffcc99', parent: 'ce', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_ce_dash: true, show_ce_not_traded_dash: true },
        { id: 'ce_high_price', label: 'Day High', minWidth: 70, color: '#ffcc99', parent: 'ce', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_ce_dash: true, show_ce_not_traded_dash: true },
        { id: 'ce_low_price', label: 'Day Low', minWidth: 70, color: '#ffcc99', parent: 'ce', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_ce_dash: true, show_ce_not_traded_dash: true },
        { id: 'ce_oh', label: 'OH', minWidth: 70, color: '#ffcc99', parent: 'ce', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'ce_ol', label: 'OL', minWidth: 70, color: '#ffcc99', parent: 'ce', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'ce_bidprice', label: 'Bid price', minWidth: 70, color: '#ffcc99', parent: 'ce', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_ce_dash: true },
        { id: 'ce_ask_price', label: 'Ask Price', minWidth: 70, color: '#ffcc99', parent: 'ce', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_ce_dash: true },

        { id: 'strike_price', label: 'Strike', minWidth: 70, color: '#f7f7a3', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },

        { id: 'pe_bidprice', label: 'Bid Price', minWidth: 70, color: '#99ff99', parent: 'pe', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_pe_dash: true },
        { id: 'pe_ask_price', label: 'Ask Price', minWidth: 70, color: '#99ff99', parent: 'pe', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_pe_dash: true },
        { id: 'pe_oh', label: 'OH', minWidth: 70, color: '#99ff99', parent: 'pe', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'pe_ol', label: 'OL', minWidth: 70, color: '#99ff99', parent: 'pe', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'pe_high_price', label: 'Day High', minWidth: 70, color: '#99ff99', parent: 'pe', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_pe_dash: true, show_pe_not_traded_dash: true },
        { id: 'pe_low_price', label: 'Day Low', minWidth: 70, color: '#99ff99', parent: 'pe', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_pe_dash: true, show_pe_not_traded_dash: true },
        { id: 'pe_open_price', label: 'Day Open', minWidth: 70, color: '#99ff99', parent: 'pe', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_pe_dash: true, show_pe_not_traded_dash: true },
        { id: 'pe_vwap', label: 'VWAP /ATP', minWidth: 70, color: '#99ff99', parent: 'pe', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_pe_dash: true, show_pe_not_traded_dash: true },
        { id: 'pe_ltp_chg_combined', label: 'LTP Chg', minWidth: 120, color: '#99ff99', parent: 'pe', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_pe_dash: true, show_pe_not_traded_dash: true },
        { id: 'pe_last_price', label: 'LTP', minWidth: 70, color: '#99ff99', parent: 'pe', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_pe_dash: true, show_pe_not_traded_dash: true },
        { id: 'pe_intrinsic_value', label: 'Intrinsic Value', minWidth: 70, color: '#99ff99', parent: 'pe', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'pe_time_value', label: 'Time Value', minWidth: 70, color: '#99ff99', parent: 'pe', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_pe_dash: true },
        { id: 'pe_total_traded_volume', label: 'Volume', minWidth: 70, color: '#99ff99', parent: 'pe', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_pe_dash: true, show_pe_not_traded_dash: true },
        { id: 'pe_oi_chg_combined', label: 'OI Chg', minWidth: 120, color: '#99ff99', parent: 'pe', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_pe_dash: true, show_pe_not_traded_dash: true },
        { id: 'pe_oi_bar', label: 'OI', minWidth: 150, color: '#99ff99', parent: 'pe', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_pe_dash: true },
        // { id: 'pe_open_interest', label: 'OI', minWidth: 70, color: '#99ff99', parent: 'pe', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_pe_dash: true, show_pe_oi_greater_zero: true },
        { id: 'pe_build_up', label: 'Build-up', minWidth: 70, color: '#99ff99', parent: 'pe', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'pe_iv_calculated', label: 'IV', minWidth: 70, color: '#99ff99', parent: 'pe', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_pe_dash: true, show_pe_not_traded_dash: true },
        { id: 'pe_iv_change', label: 'IV Change', minWidth: 70, color: '#99ff99', parent: 'pe', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_pe_dash: true, show_pe_not_traded_dash: true },
        { id: 'pe_delta', label: 'Delta', minWidth: 70, color: '#99ff99', parent: 'pe', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_pe_dash: true, show_pe_not_traded_dash: true },
        { id: 'pe_gamma', label: 'Gamma', minWidth: 70, color: '#99ff99', parent: 'pe', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_pe_dash: true, show_pe_not_traded_dash: true },
        { id: 'pe_theta', label: 'Theta', minWidth: 70, color: '#99ff99', parent: 'pe', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_pe_dash: true, show_pe_not_traded_dash: true },
        { id: 'pe_vega', label: 'Vega', minWidth: 70, color: '#99ff99', parent: 'pe', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_pe_dash: true, show_pe_not_traded_dash: true },
        { id: 'pe_ltp_time', label: 'LTP Time', minWidth: 70, color: '#99ff99', parent: 'pe', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_pe_dash: true, show_pe_not_traded_dash: true },

        { id: 'pe_oi_minus_ce_oi', label: 'PE OI (-) CE OI', minWidth: 70, color: '#ffccff', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'pcr_oi', label: 'PCR (OI)', minWidth: 70, color: '#ffccff', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_ce_dash: true, show_ce_not_traded_dash: true, show_pe_dash: true, show_pe_not_traded_dash: true },
        { id: 'pe_oi_change_minus_ce_oi_change', label: 'PE OI Chg (-) CE OI Chg', minWidth: 90, color: '#ffccff', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'straddle_price', label: 'Straddle Price', minWidth: 70, color: '#ffccff', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_ce_dash: true, show_ce_not_traded_dash: true, show_pe_dash: true, show_pe_not_traded_dash: true },
    ];

    const rows = props.tableData
    let lotorqty = props.lotqty
    let atmstrike = props.atmStrike

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
                                                                // border: "1px solid #F8F8F8",
                                                                height: '35px',
                                                                // backgroundColor: row.ce_moneyness === 'ITM' && column.parent === 'ce' ? '#e7e6e6' : row.pe_moneyness === 'ITM' && column.parent === 'pe' ? '#e7e6e6' : row.ce_moneyness === 'ATM' || column.id === 'strike_price' ? '#f7f7a3' : '',
                                                                backgroundColor: row.strike_price < atmstrike && column.parent === 'ce' ? '#e7e6e6' : row.strike_price > atmstrike && column.parent === 'pe' ? '#e7e6e6' : row.strike_price === atmstrike || column.id === 'strike_price' ? '#f7f7a3' : '',
                                                                color: column.id === 'ce_oi_chg_combined' ? row.ce_oi_chg_color : column.id === 'pe_oi_chg_combined' ? row.pe_oi_chg_color : column.id === 'ce_ltp_chg_combined' ? row.ce_ltp_chg_color : column.id === 'pe_ltp_chg_combined' ? row.pe_ltp_chg_color : ''
                                                            }}>
                                                            <div className='m-1 rounded' style={column.id === 'ce_build_up' ? { backgroundColor: row.ce_color } : column.id === 'pe_build_up' ? { backgroundColor: row.pe_color } : { backgroundColor: '' }} >
                                                                {/* {value} */}
                                                                {lotorqty === 'qty' && (column.id === 'ce_open_interest' || column.id === 'ce_changein_open_interest' || column.id === 'ce_total_traded_volume' || column.id === 'pe_open_interest' || column.id === 'pe_changein_open_interest' || column.id === 'pe_total_traded_volume') ? value * 50 : (row.ce_not_traded === true && column.show_ce_dash === true) ? '-' : (row.pe_not_traded === true && column.show_pe_dash === true) ? '-' : (row.ce_total_traded_volume === 0 && column.show_ce_not_traded_dash === true) ? '-' : (row.pe_total_traded_volume === 0 && column.show_pe_not_traded_dash === true) ? '-' : (row.ce_open_interest === 0 && column.show_ce_oi_greater_zero === true) ? '-' : (row.pe_open_interest === 0 && column.show_pe_oi_greater_zero === true) ? '-' : column.id == 'ce_oi_bar' ? '' : column.id === 'pe_oi_bar' ? '' : value}

                                                            </div>
                                                            {(column.id === 'ce_oi_bar' || column.id === 'pe_oi_bar') &&
                                                                <div className='m-2'>
                                                                    <ThemeProvider theme={theme}>
                                                                        <div style={{position:'relative'}}>
                                                                            <div style={{position:'absolute', width:'100%', height:'100%', zIndex:'1'}} className={column.id === 'ce_oi_bar' ? 'text-start' : 'text-end'}> {column.id === 'ce_oi_bar' ? row['ce_open_interest'] : row['pe_open_interest']} </div>
                                                                            <div style={{zIndex:'1', opacity:'0.5'}}>
                                                                                <LinearProgress
                                                                                    color={column.id === 'ce_oi_bar' ? 'color_ce' : 'color_pe'}
                                                                                    sx={{
                                                                                        'height': 20, backgroundColor: row.strike_price < atmstrike && column.parent === 'ce' ? '#e7e6e6' : row.strike_price === atmstrike || column.id === 'strike_price' ? '#f7f7a3' : row.strike_price > atmstrike && column.parent === 'pe' ? '#e7e6e6' : 'white',
                                                                                        transform: column.id === 'ce_oi_bar' && 'rotate(180deg)',
                                                                                        '& .MuiLinearProgress-bar': {
                                                                                            transform: 'rotate(180deg)',
                                                                                        }
                                                                                    }}
                                                                                    variant="determinate"
                                                                                    value={value}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </ThemeProvider>
                                                                </div>}

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
