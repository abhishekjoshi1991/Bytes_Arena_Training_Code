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


export default function FutureIntradaySingleStrikeLayout(props) {
    const [hiddenColumns, setHiddenColumns] = useState([]);


    const handleChange = (event) => {
        const { value } = event.target;
        setHiddenColumns(value);
    };

    const main_header_columns = [
        { id: 'time_inter_main', label: '', minWidth: 170, span: 1, color: '#cc99ff', top: '1px solid grey', bottom: 'none', left: '1px solid grey', right: '1px solid grey' },
        { id: 'fut_main', label: 'Futures', minWidth: 170, span: 13, color: '#002060', top: '1px solid grey', bottom: 'none', left: 'none', right: '1px solid grey' },
    ]

    const header_columns = [
        { id: 'time_inter', label: 'Time', minWidth: 120, span: 1, color: '#cc99ff', top: '', bottom: 'none', left: '1px solid grey', right: '1px solid grey' },
        { id: 'fut_price', label: 'Price', minWidth: 170, span: 8, color: '#deebf7', top: '1px solid grey', bottom: 'none', left: 'none', right: '1px solid grey' },
        { id: 'fut_open_int', label: 'Open Interest', minWidth: 170, span: 4, color: '#deebf7', top: '1px solid grey', bottom: 'none', left: 'none', right: '1px solid grey' },
        { id: 'fut_volume', label: 'Volume', minWidth: 170, span: 1, color: '#deebf7', top: '1px solid grey', bottom: 'none', left: 'none', right: '1px solid grey' },
    ]

    const columns = [
        { id: 'time_interval', label: '', minWidth: 70, color: '#cc99ff', parent: 'time', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'last_price', label: 'Price', minWidth: 70, color: '#deebf7', parent: 'future', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'price_change', label: 'Price Change', minWidth: 70, color: '#deebf7', parent: 'future', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'price_pchange', label: 'Price % Change', minWidth: 70, color: '#deebf7', parent: 'future', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'vwap', label: 'ATP/VWAP', minWidth: 70, color: '#deebf7', parent: 'future', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'day_high', label: 'Day High', minWidth: 70, color: '#deebf7', parent: 'future', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'day_low', label: 'Day Low', minWidth: 70, color: '#deebf7', parent: 'future', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'oh', label: 'OH', minWidth: 70, color: '#deebf7', parent: 'future', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'ol', label: 'OL', minWidth: 70, color: '#deebf7', parent: 'future', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'build_up', label: 'Build-up', minWidth: 70, color: '#deebf7', parent: 'future', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'open_interest', label: 'OI', minWidth: 70, color: '#deebf7', parent: 'future', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'oi_change', label: 'OI Change', minWidth: 70, color: '#deebf7', parent: 'future', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'oi_pchange', label: 'OI % Change', minWidth: 70, color: '#deebf7', parent: 'future', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'num_of_contracts_traded', label: '', minWidth: 70, color: '#deebf7', parent: 'future', top: '', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
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
                {header_columns.map((column) => (
                    <MenuItem key={column.id} value={column.id}>
                        <Checkbox checked={!hiddenColumns.includes(column.id)} />
                        {column.label}
                    </MenuItem>
                ))}
            </Select>
            <TableContainer className='mt-2'>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {main_header_columns.map((column) => (
                                hiddenColumns.includes(column.id) ? null : (
                                    <TableCell
                                        key={column.id}
                                        align='center'
                                        colSpan={column.span}
                                        sx={{
                                            padding: "2px 2px",
                                            borderTop: column.top,
                                            borderBottom: column.bottom,
                                            borderLeft: column.left,
                                            borderRight: column.right,
                                            fontWeight: "bold",
                                            backgroundColor: column.color,
                                            height: '35px',
                                            color: 'white'
                                        }}
                                    >
                                        {column.label}
                                    </TableCell>)
                            ))}
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
                                            borderTop: column.top,
                                            borderBottom: column.bottom,
                                            borderLeft: column.left,
                                            borderRight: column.right,
                                            fontWeight: "bold",
                                            backgroundColor: column.color,
                                            height: '35px'
                                        }}
                                    >
                                        {column.label}
                                    </TableCell>)
                            ))}
                        </TableRow>
                        <TableRow>
                            {columns.map((column) => (
                                hiddenColumns.includes(column.id) ? null : (
                                    <TableCell
                                        key={column.id}
                                        align='center'
                                        sx={{
                                            padding: "2px 2px",
                                            borderTop: column.top,
                                            borderBottom: column.bottom,
                                            borderLeft: column.left,
                                            borderRight: column.right,
                                            fontWeight: "bold",
                                            backgroundColor: column.color,
                                            height: '35px'
                                            // align: 'center'
                                        }}
                                        style={{ minWidth: column.minWidth, fontSize: 12 }}

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
                                                        height: '25px',
                                                        padding: "0px 0px",
                                                        border: "1px solid #F8F8F8",
                                                        height: '30px',
                                                        // backgroundColor: column.id === 'ce_build_up' ? row.ce_color : column.id === 'pe_build_up' ? row.pe_color : '',
                                                        backgroundColor: row.ce_moneyness === 'ITM' && column.parent === 'ce' ? '#e7e6e6' : row.pe_moneyness === 'ITM' && column.parent === 'pe' ? '#e7e6e6' : '',
                                                        color: column.id === 'ce_changein_open_interest' && value > 0 ? "#ff0000" : column.id === 'ce_changein_open_interest' && value < 0 ? '#00cc00' : column.id === 'pe_changein_open_interest' && value > 0 ? '#00cc00' : column.id === 'pe_changein_open_interest' && value < 0 ? '#ff0000' : column.label === 'LTP Change' && value > 0 ? '#00cc00' : column.label === 'LTP Change' && value < 0 ? '#ff0000' : ''
                                                    }}>
                                                        <div className='m-2 rounded' style={column.id === 'build_up' ? { backgroundColor: row.color } : { backgroundColor: '' }} >
                                                            {value}
                                                        </div>

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
