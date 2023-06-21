// import React, { useState } from 'react';

// const EditableExitTable = () => {
//   const [tableData, setTableData] = useState([
//     { id: 1, content: 'B', exit: '', originalExit: '', showExitField: false },
//     { id: 2, content: 'B', exit: '', originalExit: '', showExitField: false },
//     { id: 3, content: 'B', exit: '', originalExit: '', showExitField: false },
//   ]);

//   const handleExitButtonClick = (id) => {
//     const updatedData = tableData.map((row) => {
//       if (row.id === id) {
//         return { ...row, showExitField: true, originalExit: row.exit };
//       }
//       return row;
//     });
//     setTableData(updatedData);
//   };

//   const handleExitInputChange = (event, id) => {
//     const { value } = event.target;
//     const updatedData = tableData.map((row) => {
//       if (row.id === id) {
//         return { ...row, exit: value };
//       }
//       return row;
//     });
//     setTableData(updatedData);
//   };

//   const handleYesButtonClick = (id) => {
//     const updatedData = tableData.map((row) => {
//       if (row.id === id) {
//         return { ...row, showExitField: false };
//       }
//       return row;
//     });
//     setTableData(updatedData);
//   };

//   const handleNoButtonClick = (id) => {
//     const updatedData = tableData.map((row) => {
//       if (row.id === id) {
//         return { ...row, showExitField: false, exit: row.originalExit };
//       }
//       return row;
//     });
//     setTableData(updatedData);
//   };

//   return (
//     <table>
//       <tbody>
//         {tableData.map((row) => (
//           <tr key={row.id}>
//             <td>{row.content}</td>
//             <td>{row.showExitField ? <input type="text" value={row.exit} onChange={(event) => handleExitInputChange(event, row.id)} /> : row.exit}</td>
//             <td>
//               {row.showExitField ? (
//                 <>
//                   <button onClick={() => handleYesButtonClick(row.id)}>Yes</button>
//                   <button onClick={() => handleNoButtonClick(row.id)}>No</button>
//                 </>
//               ) : (
//                 <button onClick={() => handleExitButtonClick(row.id)}>Exit</button>
//               )}
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default EditableExitTable;
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button } from '@mui/material';

const EditableExitTable = () => {
  const [tableData, setTableData] = useState([
    { id: 1, content: 'B', showExitField: false },
    { id: 2, content: 'B', showExitField: false },
    { id: 3, content: 'B', showExitField: false },
  ]);

  const handleExitButtonClick = (id) => {
    const updatedData = tableData.map((row) => {
      if (row.id === id) {
        return { ...row, showExitField: true, originalExit: row.exit };
      }
      return row;
    });
    setTableData(updatedData);
  };

  const handleExitInputChange = (event, id) => {
    const { value } = event.target;
    const updatedData = tableData.map((row) => {
      if (row.id === id) {
        return { ...row, exit: value };
      }
      return row;
    });
    setTableData(updatedData);
  };

  const handleYesButtonClick = (id) => {
    const updatedData = tableData.map((row) => {
      if (row.id === id) {
        return { ...row, showExitField: false };
      }
      return row;
    });
    setTableData(updatedData);
  };

  const handleNoButtonClick = (id) => {
    const updatedData = tableData.map((row) => {
      if (row.id === id) {
        return { ...row, showExitField: false};
      }
      return row;
    });
    setTableData(updatedData);
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Content</TableCell>
            <TableCell>Exit</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row) => (
            <React.Fragment key={row.id}>
              <TableRow>
                <TableCell>{row.content}</TableCell>
                <TableCell>
                  {row.showExitField ? (
                    <TextField
                      value={row.exit}
                      onChange={(event) => handleExitInputChange(event, row.id)}
                    />
                  ) : (
                    row.exit
                  )}
                </TableCell>
                <TableCell>

                  <Button onClick={() => handleExitButtonClick(row.id)}>Exit</Button>

                </TableCell>
              </TableRow>
              {row.showExitField && (
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                {/* // <div className='row'> */}
                {/* //   <div className='col-md-8'></div> */}
                {/* //   <div className='col-md-4'> */}
                    <TextField
                      value={row.exit}
                      onChange={(event) => handleExitInputChange(event, row.id)}
                    />
                    <Button onClick={() => handleYesButtonClick(row.id)}>Yes</Button>
                    <Button onClick={() => handleNoButtonClick(row.id)}>No</Button>
                {/* //   </div>
                // </div> */}

                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EditableExitTable

