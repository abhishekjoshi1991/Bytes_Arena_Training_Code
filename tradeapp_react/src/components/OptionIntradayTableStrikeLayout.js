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


export default function OptionIntradayTableStrikeLayout(props) {
    const [hiddenColumns, setHiddenColumns] = useState([]);
    // const [combinedColSpan, setCombinedColSpan] = useState(4);
    // const [straddleStrangle, setStraddleStrangle] = useState('Straddle Price');

    const rows = props.tableData
    const ce_strike = props.cestrike
    const pe_strike = props.pestrike

    const handleChange = (event) => {
        const { value } = event.target;
        setHiddenColumns(value);
    };

    const main_header_columns = [
        { id: 'time', label: '', minWidth: 170, span: 1, color: '#cc99ff', top: '1px solid grey', bottom: 'none', left: '1px solid grey', right: 'none' },
        { id: 'ce', label: 'CE ' + ce_strike, minWidth: 170, span: 26, color: '#c00000', top: '1px solid grey', bottom: 'none', left: '1px solid grey', right: '1px solid grey' },
        { id: 'pe', label: 'PE ' + pe_strike, minWidth: 170, span: 26, color: '#008000', top: '1px solid grey', bottom: 'none', left: 'none', right: '1px solid grey' },
        { id: 'combo', label: 'CE & PE Combined', minWidth: 170, span: 4, color: '#c0004e', top: '1px solid grey', bottom: 'none', left: 'none', right: '1px solid grey' },
    ]

    const straddle_header = [
    { id: 'oi_analysis', label: 'OI Analysis', minWidth: 100, span: 3, color: "#ffccff", top: '1px solid grey', bottom: 'none', left: 'none', right: '1px solid grey' },
    { id: 'straddle_prc', label: '', minWidth: 100, span: 1, color: "#ffccff", top: '1px solid grey', bottom: 'none', left: 'none', right: '1px solid grey' },
    ]

    const header_columns = [
        { id: 'time_int', label: '', minWidth: 80, span: 1, color: '#cc99ff', top: '', bottom: 'none', left: '1px solid grey', right: '1px solid grey' },
        { id: 'greeks', label: 'Greeks', minWidth: 80, span: 4, color: '#ffcc99', top: '1px solid grey', bottom: 'none', left: 'none', right: '1px solid grey' },
        { id: 'volatility', label: 'Volatility', minWidth: 80, span: 3, color: '#ffcc99', top: '1px solid grey', bottom: 'none', left: 'none', right: '1px solid grey' },
        { id: 'open_int', label: 'Open Interest', minWidth: 80, span: 5, color: '#ffcc99', top: '1px solid grey', bottom: 'none', left: 'none', right: '1px solid grey' },
        { id: 'volume', label: 'Volume', minWidth: 80, span: 2, color: '#ffcc99', top: '1px solid grey', bottom: 'none', left: 'none', right: '1px solid grey' },
        { id: 'premium', label: 'Premium', minWidth: 100, span: 12, color: '#ffcc99', top: '1px solid grey', bottom: 'none', left: 'none', right: '1px solid grey' },
        { id: 'put_premium', label: 'Premium', minWidth: 100, span: 12, color: "#99ff99", top: '1px solid grey', bottom: 'none', left: 'none', right: '1px solid grey' },
        { id: 'put_volume', label: 'Volume', minWidth: 100, span: 2, color: "#99ff99", top: '1px solid grey', bottom: 'none', left: 'none', right: '1px solid grey' },
        { id: 'put_open_int', label: 'Open Interest', minWidth: 100, span: 5, color: "#99ff99", top: '1px solid grey', bottom: 'none', left: 'none', right: '1px solid grey' },
        { id: 'put_volatility', label: 'Volatility', minWidth: 100, span: 3, color: "#99ff99", top: '1px solid grey', bottom: 'none', left: 'none', right: '1px solid grey' },
        { id: 'put_greeks', label: 'Greeks', minWidth: 100, span: 4, color: "#99ff99", top: '1px solid grey', bottom: 'none', left: 'none', right: '1px solid grey' },
        ...(Number(ce_strike) === Number(pe_strike) ? straddle_header : straddle_header.slice(1, 2))

    ]

    const straddle = [
        { id: 'pe_oi_minus_ce_oi', label: 'PE OI (-)CE OI', minWidth: 70, color: '#ffccff', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'pcr_oi', label: 'PCR (OI)', minWidth: 70, color: '#ffccff', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey',show_ce_dash : true, show_ce_not_traded_dash: true, show_pe_dash : true, show_pe_not_traded_dash: true  },
        { id: 'pe_oi_change_minus_ce_oi_change', label: 'PE OI Chg (-) CE OI Chg', minWidth: 90, color: '#ffccff', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'straddle_price', label: 'Straddle Price', minWidth: 70, color: '#ffccff', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_ce_dash : true, show_ce_not_traded_dash: true, show_pe_dash : true, show_pe_not_traded_dash: true  },
    ]

    const strangle = [
        { id: 'straddle_price', label: 'Strangle Price', minWidth: 70, color: '#ffccff', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_ce_dash : true, show_ce_not_traded_dash: true, show_pe_dash : true, show_pe_not_traded_dash: true  },
    ]

    const columns = [
        { id: 'time_interval', label: 'Time', minWidth: 80, color: '#cc99ff', parent: 'time', top: 'none', bottom: 'none', left: '1px solid grey', right: '1px solid grey' },

        { id: 'ce_vega', label: 'Vega', minWidth: 70, color: '#ffcc99', parent: 'ce', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_ce_dash: true, show_ce_not_traded_dash: true },
        { id: 'ce_theta', label: 'Theta', minWidth: 70, color: '#ffcc99', parent: 'ce', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_ce_dash: true , show_ce_not_traded_dash: true },
        { id: 'ce_gamma', label: 'Gamma', minWidth: 70, color: '#ffcc99', parent: 'ce', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_ce_dash: true, show_ce_not_traded_dash: true  },
        { id: 'ce_delta', label: 'Delta', minWidth: 70, color: '#ffcc99', parent: 'ce', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_ce_dash: true, show_ce_not_traded_dash: true },
        { id: 'ce_iv_change', label: 'IV Change (Previous Time)', minWidth: 70, color: '#ffcc99', parent: 'ce', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_ce_dash: true, show_ce_not_traded_dash: true  },
        { id: 'previous_day_ce_iv_change', label: 'IV Change (Previous Day)', minWidth: 70, color: '#ffcc99', parent: 'ce', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_ce_dash: true, show_ce_not_traded_dash: true  },
        { id: 'ce_iv_calculated', label: 'IV', minWidth: 70, color: '#ffcc99', parent: 'ce', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_ce_dash: true, show_ce_not_traded_dash: true  },
        { id: 'ce_build_up', label: 'Build-up (Previous Time)', minWidth: 70, color: '#ffcc99', parent: 'ce', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_ce_dash: true, show_ce_not_traded_dash: true  },
        { id: 'ce_build_up_previous_day', label: 'Build-up (Previous Day)', minWidth: 70, color: '#ffcc99', parent: 'ce', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_ce_dash: true, show_ce_not_traded_dash: true  },
        { id: 'ce_open_interest', label: 'OI', minWidth: 70, color: '#ffcc99', parent: 'ce', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_ce_dash: true, show_ce_oi_greater_zero:true  },
        // { id: 'ce_oi_change', label: 'OI Change', minWidth: 70, color: '#ffcc99', parent: 'ce', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        // { id: 'ce_oi_pchange', label: 'OI % Change', minWidth: 70, color: '#ffcc99', parent: 'ce', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'ce_oi_chg_combined', label: 'OI Chg (Previous Time)', minWidth: 120, color: '#ffcc99', parent: 'ce', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_ce_dash: true, show_ce_not_traded_dash: true  },
        { id: 'ce_oi_chg_combined_wrt_previous_day', label: 'OI Chg (Previous Day)', minWidth: 120, color: '#ffcc99', parent: 'ce', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_ce_dash: true, show_ce_not_traded_dash: true  },
        { id: 'ce_volume_actual', label: 'Volume (Time Interval)', minWidth: 70, color: '#ffcc99', parent: 'ce', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_ce_dash: true, show_ce_not_traded_dash: true  },
        { id: 'ce_total_traded_volume', label: 'Volume (Day)', minWidth: 70, color: '#ffcc99', parent: 'ce', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_ce_dash: true, show_ce_not_traded_dash: true  },
        
        { id: 'ce_new_time_value', label: 'Time Value', minWidth: 70, color: '#ffcc99', parent: 'ce', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_ce_dash: true },
        { id: 'ce_new_intrinsic_value', label: 'Intrinsic Value', minWidth: 70, color: '#ffcc99', parent: 'ce', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey'},
        // { id: 'ce_moneyness', label: 'Moneyness', minWidth: 70, color: '#ffcc99', parent: 'ce', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_ce_dash: true, show_ce_not_traded_dash: true  },
        { id: 'ce_last_price', label: 'LTP', minWidth: 70, color: '#ffcc99', parent: 'ce', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_ce_dash: true, show_ce_not_traded_dash: true  },
        // { id: 'ce_ltp_change', label: 'LTP Change', minWidth: 70, color: '#ffcc99', parent: 'ce', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        // { id: 'ce_ltp_pchange', label: 'LTP % Change', minWidth: 70, color: '#ffcc99', parent: 'ce', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        { id: 'ce_ltp_chg_combined', label: 'LTP Chg (Previous Time)', minWidth: 120, color: '#ffcc99', parent: 'ce', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_ce_dash: true, show_ce_not_traded_dash: true  },
        { id: 'combined_ce_ltp_change_wrt_previous_day', label: 'LTP Chg (Previous Day)', minWidth: 120, color: '#ffcc99', parent: 'ce', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_ce_dash: true, show_ce_not_traded_dash: true  },
        { id: 'ce_vwap', label: 'VWAP /ATP', minWidth: 70, color: '#ffcc99', parent: 'ce', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_ce_dash: true, show_ce_not_traded_dash: true  },
        { id: 'ce_high_price', label: 'Day High', minWidth: 70, color: '#ffcc99', parent: 'ce', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_ce_dash: true, show_ce_not_traded_dash: true },
        { id: 'ce_low_price', label: 'Day Low', minWidth: 70, color: '#ffcc99', parent: 'ce', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_ce_dash: true , show_ce_not_traded_dash: true },
        { id: 'ce_oh', label: 'OH', minWidth: 70, color: '#ffcc99', parent: 'ce', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_ce_dash: true, show_ce_not_traded_dash: true  },
        { id: 'ce_ol', label: 'OL', minWidth: 70, color: '#ffcc99', parent: 'ce', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_ce_dash: true, show_ce_not_traded_dash: true },
        { id: 'ce_bidprice', label: 'Bid price', minWidth: 70, color: '#ffcc99', parent: 'ce', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_ce_dash: true},
        { id: 'ce_ask_price', label: 'Ask Price', minWidth: 70, color: '#ffcc99', parent: 'ce', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_ce_dash: true},

        { id: 'pe_bidprice', label: 'Bid Price', minWidth: 70, color: '#99ff99', parent: 'pe', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_pe_dash: true},
        { id: 'pe_ask_price', label: 'Ask Price', minWidth: 70, color: '#99ff99', parent: 'pe', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_pe_dash: true},
        { id: 'pe_oh', label: 'OH', minWidth: 70, color: '#99ff99', parent: 'pe', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_pe_dash: true, show_pe_not_traded_dash: true},
        { id: 'pe_ol', label: 'OL', minWidth: 70, color: '#99ff99', parent: 'pe', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_pe_dash: true, show_pe_not_traded_dash: true},
        { id: 'pe_high_price', label: 'Day High', minWidth: 70, color: '#99ff99', parent: 'pe', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_pe_dash: true, show_pe_not_traded_dash: true},
        { id: 'pe_low_price', label: 'Day Low', minWidth: 70, color: '#99ff99', parent: 'pe', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_pe_dash: true, show_pe_not_traded_dash: true},
        { id: 'pe_vwap', label: 'VWAP /ATP', minWidth: 70, color: '#99ff99', parent: 'pe', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_pe_dash: true, show_pe_not_traded_dash: true},
        { id: 'combined_pe_ltp_change_wrt_previous_day', label: 'LTP Chg (Previous Day)', minWidth: 120, color: '#99ff99', parent: 'pe', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_pe_dash: true, show_pe_not_traded_dash: true},
        { id: 'pe_ltp_chg_combined', label: 'LTP Chg (Previous Time)', minWidth: 120, color: '#99ff99', parent: 'pe', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_pe_dash: true, show_pe_not_traded_dash: true},
        // { id: 'pe_ltp_pchange', label: 'LTP % Change', minWidth: 70, color: '#99ff99', parent: 'pe', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_pe_dash: true},
        // { id: 'pe_ltp_change', label: 'LTP Change', minWidth: 70, color: '#99ff99', parent: 'pe', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_pe_dash: true},
        { id: 'pe_last_price', label: 'LTP', minWidth: 70, color: '#99ff99', parent: 'pe', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_pe_dash: true, show_pe_not_traded_dash: true},
        // { id: 'pe_moneyness', label: 'Moneyness', minWidth: 70, color: '#99ff99', parent: 'pe', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_pe_dash: true, show_pe_not_traded_dash: true},
        { id: 'pe_new_intrinsic_value', label: 'Intrinsic Value', minWidth: 70, color: '#99ff99', parent: 'pe', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey'},
        { id: 'pe_new_time_value', label: 'Time Value', minWidth: 70, color: '#99ff99', parent: 'pe', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_pe_dash: true},
        
        { id: 'pe_total_traded_volume', label: 'Volume (Day)', minWidth: 70, color: '#99ff99', parent: 'pe', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_pe_dash: true, show_pe_not_traded_dash: true},
        { id: 'pe_volume_actual', label: 'Volume (Time Interval)', minWidth: 70, color: '#99ff99', parent: 'pe', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_pe_dash: true, show_pe_not_traded_dash: true},
        { id: 'pe_oi_chg_combined_wrt_previous_day', label: 'OI Chg (Previous Day)', minWidth: 120, color: '#99ff99', parent: 'pe', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_pe_dash: true, show_pe_not_traded_dash: true},
        { id: 'pe_oi_chg_combined', label: 'OI Chg (Previous Time)', minWidth: 120, color: '#99ff99', parent: 'pe', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_pe_dash: true, show_pe_not_traded_dash: true},
        // { id: 'pe_oi_pchange', label: 'OI % Change', minWidth: 70, color: '#99ff99', parent: 'pe', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_pe_dash: true},
        // { id: 'pe_oi_change', label: 'OI Change', minWidth: 70, color: '#99ff99', parent: 'pe', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_pe_dash: true},
        { id: 'pe_open_interest', label: 'OI', minWidth: 70, color: '#99ff99', parent: 'pe', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_pe_dash: true, show_pe_oi_greater_zero: true},
        { id: 'pe_build_up_previous_day', label: 'Build-up (Previous Day)', minWidth: 70, color: '#99ff99', parent: 'pe', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_pe_dash: true, show_pe_not_traded_dash: true},
        { id: 'pe_build_up', label: 'Build-up (Previous Time)', minWidth: 70, color: '#99ff99', parent: 'pe', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_pe_dash: true, show_pe_not_traded_dash: true},
        { id: 'pe_iv_calculated', label: 'IV', minWidth: 70, color: '#99ff99', parent: 'pe', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_pe_dash: true, show_pe_not_traded_dash: true},
        { id: 'previous_day_pe_iv_change', label: 'IV Change (Previous Day)', minWidth: 70, color: '#99ff99', parent: 'pe', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_pe_dash: true, show_pe_not_traded_dash: true},
        { id: 'pe_iv_change', label: 'IV Change (Previous Time)', minWidth: 70, color: '#99ff99', parent: 'pe', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_pe_dash: true, show_pe_not_traded_dash: true},
        { id: 'pe_delta', label: 'Delta', minWidth: 70, color: '#99ff99', parent: 'pe', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_pe_dash: true, show_pe_not_traded_dash: true},
        { id: 'pe_gamma', label: 'Gamma', minWidth: 70, color: '#99ff99', parent: 'pe', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_pe_dash: true, show_pe_not_traded_dash: true},
        { id: 'pe_theta', label: 'Theta', minWidth: 70, color: '#99ff99', parent: 'pe', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_pe_dash: true, show_pe_not_traded_dash: true},
        { id: 'pe_vega', label: 'Vega', minWidth: 70, color: '#99ff99', parent: 'pe', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey', show_pe_dash: true, show_pe_not_traded_dash: true},
        ...(Number(ce_strike) === Number(pe_strike) ? straddle : strangle)

        // { id: 'pe_oi_minus_ce_oi', label: 'PE OI (-)CE OI', minWidth: 70, color: '#ffccff', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        // { id: 'pcr_oi', label: 'PCR (OI)', minWidth: 70, color: '#ffccff', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        // { id: 'pe_oi_change_minus_ce_oi_change', label: 'PE OI Chg (-) CE OI Chg', minWidth: 90, color: '#ffccff', top: '1px solid grey', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
        // { id: 'straddle_price', label: 'Straddle /Strangle Price', minWidth: 70, color: '#ffccff', top: 'none', bottom: '1px solid grey', left: 'none', right: '1px solid grey' },
    ];


    return (
        <div sx={{ width: '100%' }}>
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
                                        }}
                                        style={{ minWidth: column.minWidth, fontSize: 12 }}

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
                                            borderTop: column.top,
                                            borderBottom: column.bottom,
                                            borderLeft: column.left,
                                            borderRight: column.right,
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
                                                    <TableCell
                                                        key={column.id}
                                                        align='center'
                                                        size='small'
                                                        style={{ fontSize: 13 }}
                                                        sx={{
                                                            padding: "0px 0px",
                                                            border: "1px solid #F8F8F8",
                                                            height: '35px',
                                                            // backgroundColor: column.id === 'ce_build_up' ? row.ce_color : column.id === 'pe_build_up' ? row.pe_color : '',
                                                            backgroundColor: row.ce_moneyness === 'ITM' && column.parent === 'ce' ? '#e7e6e6' : row.pe_moneyness === 'ITM' && column.parent === 'pe' ? '#e7e6e6' : row.ce_moneyness === 'ATM' && column.parent === 'ce' ? '#f7f7a3' :  row.pe_moneyness === 'ATM' && column.parent === 'pe' ? '#f7f7a3' : '',
                                                            color: column.id === 'ce_oi_chg_combined' ? row.ce_oi_chg_color : column.id === 'pe_oi_chg_combined' ? row.pe_oi_chg_color : column.id === 'ce_ltp_chg_combined' ? row.ce_ltp_chg_color : column.id === 'pe_ltp_chg_combined' ? row.pe_ltp_chg_color : column.id === 'ce_oi_chg_combined_wrt_previous_day' ? row.ce_oi_chg_color_wrt_previous : column.id === 'pe_oi_chg_combined_wrt_previous_day' ? row.pe_oi_chg_color_wrt_previous : column.id === 'combined_ce_ltp_change_wrt_previous_day' ? row.ce_ltp_change_wrt_previous_day_color : column.id === 'combined_pe_ltp_change_wrt_previous_day' ? row.pe_ltp_change_wrt_previous_day_color : ''
                                                            // color: column.id === 'ce_changein_open_interest' && value > 0 ? "#ff0000" : column.id === 'ce_changein_open_interest' && value < 0 ? '#00cc00' : column.id === 'pe_changein_open_interest' && value > 0 ? '#00cc00' : column.id === 'pe_changein_open_interest' && value < 0 ? '#ff0000' : column.label === 'LTP Change' && value > 0 ? '#00cc00' : column.label === 'LTP Change' && value < 0 ? '#ff0000' : ''
                                                        }}>
                                                        <div className='m-1 rounded' style={column.id === 'ce_build_up' ? { backgroundColor: row.ce_color } : column.id === 'pe_build_up' ? { backgroundColor: row.pe_color } : column.id === 'ce_build_up_previous_day' ? { backgroundColor: row.ce_color_previous } : column.id === 'pe_build_up_previous_day' ? { backgroundColor: row.pe_color_previous } : { backgroundColor: '' }} >
                                                            {row.ce_ltp_chg_combined === '0.0 (-0.0%)' && column.id === 'ce_ltp_chg_combined' && row.ce_not_traded === false ? '0' : row.pe_ltp_chg_combined === '0.0 (-0.0%)' && column.id === 'pe_ltp_chg_combined' && row.pe_not_traded === false ? '0' : (row.ce_not_traded === true && column.show_ce_dash === true) ?  '-' : (row.pe_not_traded === true && column.show_pe_dash === true) ?  '-' : (row.ce_total_traded_volume === 0 && column.show_ce_not_traded_dash === true) ? '-' : (row.pe_total_traded_volume === 0 && column.show_pe_not_traded_dash === true) ? '-' : (row.ce_open_interest === 0 && column.show_ce_oi_greater_zero === true) ? '-' : (row.pe_open_interest === 0 && column.show_pe_oi_greater_zero === true) ? '-' : value}
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
        </div>
    );
}
