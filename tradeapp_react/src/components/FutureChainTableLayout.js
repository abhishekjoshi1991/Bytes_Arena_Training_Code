import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import { BorderTop } from '@mui/icons-material';

export default function FutureChainTableLayout(props) {
    const [hiddenColumns, setHiddenColumns] = useState([]);

    const handleChange = (event) => {
        const { value } = event.target;
        setHiddenColumns(value);
    };

    const columns1 = [
        { id: 'expiry', label: '', minWidth: 170, span: 1, color: '#deebf7', top: '1px solid grey', bottom: 'none', left: '1px solid grey', right: '1px solid grey' },
        { id: 'lot_size', label: '', minWidth: 170, span: 1, color: '#deebf7', top: '1px solid grey', bottom: 'none', left: 'none', right: 'none' },
        { id: 'price', label: 'Price', minWidth: 170, span: 8, color: '#deebf7', top: '1px solid grey', bottom: '1px solid grey', left: '1px solid grey', right: 'none' },
        { id: 'open_int', label: 'Open Interest', minWidth: 100, span: 5, color: '#deebf7', top: '1px solid grey', bottom: '1px solid grey', left: '1px solid grey', right: '1px solid grey' },
    ]

    const columns = [
        { id: 'expiry_date', label: 'Expiry', minWidth: 30, color: '#deebf7', top: 'none', bottom: '1px solid grey', left: '1px solid grey', right: '1px solid grey' },
        { id: 'market_lot', label: 'Lot Size', minWidth: 70, color: '#deebf7', top: 'none', bottom: '1px solid grey', left: 'none', right: 'none' },
        { id: 'last_price', label: 'Price', minWidth: 70, color: '#deebf7', top: 'none', bottom: '1px solid grey', left: '1px solid grey', right: '1px solid grey' },
        // { id: 'price_change', label: 'LTP Change', minWidth: 70, color: '#deebf7', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        // { id: 'change', label: 'Price Change', minWidth: 70, color: '#deebf7', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        // { id: 'price_pchange', label: 'LTP % Change', minWidth: 70, color: '#deebf7', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        // { id: 'pchange', label: 'Price % Change', minWidth: 70, color: '#deebf7', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'ltp_chg_combined', label: 'Price Change', minWidth: 70, color: '#deebf7', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'vwap', label: 'ATP/VWAP', minWidth: 70, color: '#deebf7', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'open_price', label: 'Day Open', minWidth: 70, color: '#deebf7', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'day_high_price', label: 'Day High', minWidth: 70, color: '#deebf7', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'day_low_price', label: 'Day Low', minWidth: 70, color: '#deebf7', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'oh', label: 'OH', minWidth: 70, color: '#deebf7', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'ol', label: 'OL', minWidth: 70, color: '#deebf7', top: 'none', bottom: '1px solid grey', left: 'none', right: '' },
        { id: 'build_up', label: 'Build-up', minWidth: 70, color: '#deebf7', top: 'none', bottom: '1px solid grey', left: '1px solid grey', right: '1px solid grey' },
        { id: 'open_interest', label: 'OI', minWidth: 70, color: '#deebf7', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        // { id: 'change_in_open_interest', label: 'OI Change', minWidth: 70, color: '#deebf7', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        // { id: 'pchange_open_interest', label: 'OI % Change', minWidth: 70, color: '#deebf7', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'oi_chg_combined', label: 'OI Change', minWidth: 70, color: '#deebf7', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'num_of_contracts_traded', label: 'Volume', minWidth: 70, color: '#deebf7', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
    ];

    const rows = props.tableData

    return (

        <div sx={{ width: '100%' }}>
            <Select
                multiple
                value={hiddenColumns}
                onChange={handleChange}
                renderValue={(selected) => selected.join(', ')}
                className='mb-5'
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
                        <TableRow>
                            {columns1.map((column) => (
                                hiddenColumns.includes(column.id) ? null : (
                                    <TableCell
                                        key={column.id}
                                        align='center'
                                        colSpan={column.span}
                                        sx={{
                                            padding: "2px 2px",
                                            borderBottom: column.bottom,
                                            borderTop: column.top,
                                            borderLeft: column.left,
                                            borderRight: column.right,
                                            fontWeight: "bold",
                                            backgroundColor: column.color,
                                            height: '40px'
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
                                        style={{ minWidth: column.minWidth, fontSize: 12 }}
                                        sx={{
                                            padding: "2px 2px",
                                            borderBottom: column.bottom,
                                            borderTop: column.top,
                                            borderLeft: column.left,
                                            borderRight: column.right,
                                            fontWeight: "bold",
                                            backgroundColor: column.color,
                                            height: '35px'

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
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code} sx={{
                                            height: '35px'
                                        }}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    hiddenColumns.includes(column.id) ? null : (
                                                        <TableCell key={column.id} align='center' size='small' sx={{
                                                            padding: "0px 0px",
                                                            border: "1px solid #e0e0dc",
                                                            color: column.id === 'ltp_chg_combined' ? row.ltp_chg_color : ''
                                                        }}>
                                                            <div className='m-1 rounded' style={column.id === 'build_up' ? { backgroundColor: row.build_up_color } : { backgroundColor: '' }} >
                                                                {value}
                                                            </div>
                                                        </TableCell>)
                                                );
                                            })}
                                        </TableRow>
                                    )
                                }
                                else {
                                    return (<TableRow hover role="checkbox" tabIndex={-1} key={row.code} sx={{
                                        height: '30px'
                                    }}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                hiddenColumns.includes(column.id) ? null : (
                                                    <TableCell key={column.id} align='center' size='small' sx={{
                                                        padding: "0px 0px",
                                                        backgroundColor: '#cfcfcf',
                                                        fontWeight: 'bold'
                                                    }}>
                                                        {value}
                                                    </TableCell>)
                                            );
                                        })}
                                    </TableRow>)
                                }
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

