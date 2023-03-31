import React, { useState, useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Edit from "@mui/icons-material/Edit";

export default function Table1(props) {
    // const [positionData, setPositionData] = useState([])
    // async function get_position_data() {
    //     const res = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/position')

    //     const response = await res.json()
    //     if (response) {
    //         setPositionData(response)
    //     }
    // }

    // useEffect(() => {
    //     get_position_data();
    // }, [])
    const data1 = props.position

    const editHandle = (e) => {
        // console.log(e.target.value)
        console.log(e.currentTarget.getAttribute("data-id"));
        console.log(e.currentTarget.getAttribute("data-exp"));
    }

    // const rows = [
    //     { id: 1, name: "abhi", fat: 100 },
    //     { id: 2, name: "abhi", fat: 100 },
    //     { id: 3, name: "abhi", fat: 100 }
    // ];
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 50 }} size="small" aria-label="a dense table">
                <TableBody>
                    {data1.map((row) => (
                        <TableRow
                            hover={true}
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell sx={{ width: 5 }} size="small" component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell sx={{ width: 5 }} size="small" align="left">+{row.quantity}x</TableCell>
                            <TableCell sx={{ width: 100, padding: 0, margin: 0 }} size="small" align="left">{row.expiry_date}</TableCell>
                            <TableCell sx={{ width: 100, padding: 0, margin: 0 }} size="small" align="left">{row.strike_price}{row.option_type}</TableCell>
                            <TableCell size="small" align="left">{row.entry_price}</TableCell>
                            
                            <TableCell size="small" align="left"><a data-id={row.id} data-exp={row.expiry_date} onClick={editHandle}><Edit color="primary" className="icon1" /></a></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
// const [positionData, setPositionData] = useState([])
// async function get_position_data() {
//     const res = await fetch('http://127.0.0.1:7010/tradeapp/api/v1/option_chain/position')

//     const response = await res.json()
//     if (response) {
//         setPositionData(response)
//     }
// }

// useEffect(() => {
//     get_position_data();
// }, [])
// const data1 = props.position
// const ref = props.refresh

// return (
//         <div id="Table">
//             <table>
//                 {/* <thead>
//                 <tr>
//                     <th>ID</th>
//                     <th>Expiry</th>
//                     <th>Strike</th>
//                     <th>Option Type</th>
//                     <th>Entry Price</th>
//                 </tr>
//             </thead> */}
//                 <tbody>
//                     {
//                         data1.map((data, index) => {
//                             return (
//                                 <tr>
//                                     <td>{data.quantity}</td>
//                                     <td>{data.expiry_date}</td>
//                                     <td>{data.strike_price}{data.option_type}</td>
//                                     {/* <td>{data.option_type}</td> */}
//                                     <td>{data.entry_price}</td>
//                                 </tr>
//                             )
//                         })
//                     }
//                 </tbody>

//             </table>
//         </div>
// )
// }


// var newData = expense.map((dt, i) => {
//     let action = parse("<button id=" + dt.id + "></button>", {
//         replace: ({ attribs }) => {
//             if (attribs) {
//                 return <><a data-value={attribs.id} onClick={editHandle}><EditIcon color="primary" /></a>&nbsp;&nbsp;&nbsp;<a data-value={attribs.id} onClick={deleteHandle}><DeleteIcon sx={{ color: pink[500] }} /></a>
//                 </>;
//             }
//         }
//     })
//     return ({ ...dt, action });

// })
