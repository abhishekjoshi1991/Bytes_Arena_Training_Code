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


export default function OptionIntradayMultiStrikeLayout(props) {
    const [hiddenColumns, setHiddenColumns] = useState([]);

    const handleChange = (event) => {
        const { value } = event.target;
        setHiddenColumns(value);
    };

    const header_columns = [
        { id: 'time_int', label: '', minWidth: 170, span: 1, color: '#cc99ff' },
        { id: 'open_int', label: 'Open Interest', minWidth: 100, span: 3, color: '#ffcc99' },
        { id: 'volume', label: 'Volume', minWidth: 100, span: 1, color: '#ffcc99' },
        { id: 'put_volume', label: 'Volume', minWidth: 100, span: 1, color: "#99ff99" },
        { id: 'put_open_int', label: 'Open Interest', minWidth: 100, span: 3, color: "#99ff99" },
        { id: 'oi_analysis', label: 'OI Analysis', minWidth: 100, span: 4, color: "#ffccff" },
    ]

    const columns = [
        { id: 'time_interval', label: 'Time', minWidth: 100, color: '#cc99ff', parent: 'time' },

        { id: 'ce_open_interest', label: 'OI', minWidth: 100, color: '#ffcc99', parent: 'ce' },
        { id: 'ce_oi_change', label: 'OI Change', minWidth: 100, color: '#ffcc99', parent: 'ce' },
        { id: 'ce_oi_pchange', label: 'OI % Change', minWidth: 100, color: '#ffcc99', parent: 'ce' },
        { id: 'ce_total_traded_volume', label: 'Volume', minWidth: 100, color: '#ffcc99', parent: 'ce' },

        { id: 'pe_total_traded_volume', label: 'Volume', minWidth: 100, color: '#99ff99', parent: 'pe' },
        { id: 'pe_oi_pchange', label: 'OI % Change', minWidth: 100, color: '#99ff99', parent: 'pe' },
        { id: 'pe_oi_change', label: 'OI Change', minWidth: 100, color: '#99ff99', parent: 'pe' },
        { id: 'pe_open_interest', label: 'OI', minWidth: 100, color: '#99ff99', parent: 'pe' },

        { id: 'pe_oi_minus_ce_oi', label: 'PE OI (-)CE OI', minWidth: 50, color: '#ffccff' },
        { id: 'pcr_oi', label: 'PCR (OI)', minWidth: 50, color: '#ffccff' },
        { id: 'pe_oi_change_minus_ce_oi_change', label: 'PE OI Change (-) CE OI Change', minWidth: 50, color: '#ffccff' },
        { id: 'oi_change_trend', label: 'PE OI & CE OI Change Trend', minWidth: 50, color: '#ffccff' },
    ];

    const rows = props.tableData
    const ce_strike = props.cestrike.map(obj => obj['value']).join(',')
    console.log(ce_strike)
    const pe_strike = props.pestrike.map(obj => obj['value']).join(',')

    return (

        <Paper sx={{ width: '100%' }}>
            <Select
                multiple
                value={hiddenColumns}
                onChange={handleChange}
                renderValue={(selected) => selected.join(', ')}
            >
                {header_columns.map((column) => (
                    <MenuItem key={column.id} value={column.id}>
                        <Checkbox checked={!hiddenColumns.includes(column.id)} />
                        {column.label}
                    </MenuItem>
                ))}
            </Select>
            <TableContainer style={{ position: 'fixed' }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow >
                            <TableCell align="center" colSpan={1} sx={{
                                padding: "2px 2px",
                                border: "1px solid grey",
                                backgroundColor: "#cc99ff",
                                fontWeight: "bold",
                                color: "white"
                            }}>

                            </TableCell>
                            <TableCell align="center" colSpan={4} sx={{
                                padding: "2px 2px",
                                border: "1px solid grey",
                                backgroundColor: "#c00000",
                                fontWeight: "bold",
                                color: "white"
                            }}>
                                CE {ce_strike}
                            </TableCell>
                            <TableCell align="center" width={10} colSpan={4} sx={{
                                padding: "2px 2px",
                                border: "1px solid grey",
                                fontWeight: "bold",
                                backgroundColor: "#008000",
                                color: "white",
                            }}>
                                PE {pe_strike}
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
                            {header_columns.map((column) => (
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
                                        style={{ top: 57, minWidth: column.minWidth }}
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

