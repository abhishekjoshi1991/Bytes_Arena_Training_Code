// import React, { useState } from 'react';
// import { Table, TableBody, TableCell, TableRow, Button, Select, MenuItem } from '@mui/material';

// const MyTable = () => {
//   const [selectedOptions, setSelectedOptions] = useState({});
//   const [selectedNumbers, setSelectedNumbers] = useState({});

//   const handleButtonSelect = (rowIndex, option) => {
//     // console.log(rowIndex, option)
//     setSelectedOptions((prevSelectedOptions) => ({
//       ...prevSelectedOptions,
//       [rowIndex]: option,
//     }));
//   };

//   const handleButtonClick = (rowIndex, option) => {
//     console.log(rowIndex, option)
//     if (selectedOptions[rowIndex] === option) {
//       console.log('if called')
//       handleButtonUnselect(rowIndex);
//     } else {
//       console.log('else called')
//       handleButtonSelect(rowIndex, option);
//     }
//   };

//   const handleButtonUnselect = (rowIndex) => {
//     setSelectedOptions((prevSelectedOptions) => {
//       const updatedOptions = { ...prevSelectedOptions };
//       delete updatedOptions[rowIndex];
//       return updatedOptions;
//     });
//   };

//   const handleNumberChange = (rowIndex, value) => {
//     setSelectedNumbers((prevSelectedNumbers) => ({
//       ...prevSelectedNumbers,
//       [rowIndex]: value,
//     }));
//   };

//   const isOptionSelected = (rowIndex, option) => {
//     return selectedOptions[rowIndex] === option;
//   };

//   const renderNumberDropdown = (rowIndex) => {
//     if (selectedOptions[rowIndex]) {
//       return (
//         <Select
//           value={selectedNumbers[rowIndex] || ''}
//           onChange={(e) => handleNumberChange(rowIndex, e.target.value)}
//         >
//           <MenuItem value={10}>10</MenuItem>
//           <MenuItem value={20}>20</MenuItem>
//           <MenuItem value={30}>30</MenuItem>
//           {/* Add more number options as needed */}
//         </Select>
//       );
//     }
//     return null;
//   };

//   // Sample data for the table
//   const rows = [
//     { name: 'Item 1', price: 100 },
//     { name: 'Item 2', price: 150 },
//     { name: 'Item 3', price: 200 },
//     // Add more rows as needed
//   ];
//   console.log('selectedOptions', selectedOptions)
//   console.log('selectedNumbers', selectedNumbers)

//   return (
//     <Table>
//       <TableBody>
//         {rows.map((row, rowIndex) => (
//           <TableRow key={rowIndex}>
//             <TableCell>{row.name}</TableCell>
//             <TableCell>
//               <Button
//                 variant={isOptionSelected(rowIndex, 'buy') ? 'contained' : 'outlined'}
//                 onClick={() => handleButtonClick(rowIndex, 'buy')}
//               >
//                 Buy
//               </Button>
//             </TableCell>
//             <TableCell>
//               <Button
//                 variant={isOptionSelected(rowIndex, 'sell') ? 'contained' : 'outlined'}
//                 onClick={() => handleButtonClick(rowIndex, 'sell')}
//               >
//                 Sell
//               </Button>
//             </TableCell>
//             <TableCell>{renderNumberDropdown(rowIndex)}</TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   );
// };

// export default MyTable;

// 2
// import React, { useState } from 'react';
// import { Table, TableBody, TableCell, TableRow, Button, Select, MenuItem } from '@mui/material';

// const MyTable = () => {
//   const [selectedOptions, setSelectedOptions] = useState([]);

//   const handleButtonSelect = (rowIndex, option) => {
//     setSelectedOptions((prevSelectedOptions) => {
//       const updatedOptions = [...prevSelectedOptions];
//       updatedOptions.push({ index: rowIndex, option });
//       return updatedOptions;
//     });
//   };

//   const handleButtonClick = (rowIndex, option) => {
//     const isSelected = selectedOptions.some(
//       (selectedOption) => selectedOption.index === rowIndex && selectedOption.option === option
//     );

//     if (isSelected) {
//       handleButtonUnselect(rowIndex, option);
//     } else {
//       handleButtonSelect(rowIndex, option);
//     }
//   };

//   const handleButtonUnselect = (rowIndex, option) => {
//     setSelectedOptions((prevSelectedOptions) => {
//       const updatedOptions = prevSelectedOptions.filter(
//         (selectedOption) => !(selectedOption.index === rowIndex && selectedOption.option === option)
//       );
//       return updatedOptions;
//     });
//   };

//   const handleNumberChange = (rowIndex, value) => {
//     // Implement number dropdown selection handling here if needed
//   };

//   const isOptionSelected = (rowIndex, option) => {
//     return selectedOptions.some(
//       (selectedOption) => selectedOption.index === rowIndex && selectedOption.option === option
//     );
//   };

//   // Sample data for the table
//   const rows = [
//     { name: 'Item 1', price: 100 },
//     { name: 'Item 2', price: 150 },
//     { name: 'Item 3', price: 200 },
//     // Add more rows as needed
//   ];
//   console.log(selectedOptions)
//   return (
//     <Table>
//       <TableBody>
//         {rows.map((row, rowIndex) => (
//           <TableRow key={rowIndex}>
//             <TableCell>{row.name}</TableCell>
//             <TableCell>
//               <Button
//                 variant={isOptionSelected(rowIndex, 'buy') ? 'contained' : 'outlined'}
//                 onClick={() => handleButtonClick(rowIndex, 'buy')}
//               >
//                 Buy
//               </Button>
//             </TableCell>
//             <TableCell>
//               <Button
//                 variant={isOptionSelected(rowIndex, 'sell') ? 'contained' : 'outlined'}
//                 onClick={() => handleButtonClick(rowIndex, 'sell')}
//               >
//                 Sell
//               </Button>
//             </TableCell>
//             <TableCell>
//               {isOptionSelected(rowIndex, 'buy') || isOptionSelected(rowIndex, 'sell') ? (
//                 <Select
//                   value={selectedOptions.find(
//                     (selectedOption) => selectedOption.index === rowIndex
//                   )?.option}
//                   onChange={(e) => handleNumberChange(rowIndex, e.target.value)}
//                 >
//                   <MenuItem value={10}>10</MenuItem>
//                   <MenuItem value={20}>20</MenuItem>
//                   <MenuItem value={30}>30</MenuItem>
//                   {/* Add more number options as needed */}
//                 </Select>
//               ) : null}
//             </TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   );
// };

// export default MyTable;

// 3
// import React, { useState } from 'react';
// import { Table, TableBody, TableCell, TableRow, Button, Select, MenuItem } from '@mui/material';

// const MyTable = () => {
//   const [selectedOptions, setSelectedOptions] = useState([]);

//   const handleButtonSelect = (rowIndex, option) => {
//     setSelectedOptions((prevSelectedOptions) => {
//       const updatedOptions = [...prevSelectedOptions];
//       updatedOptions.push({ index: rowIndex, option });
//       return updatedOptions;
//     });
//   };

//   const handleButtonClick = (rowIndex, option) => {
//     const isSelected = selectedOptions.some(
//       (selectedOption) => selectedOption.index === rowIndex && selectedOption.option === option
//     );

//     if (isSelected) {
//       handleButtonUnselect(rowIndex, option);
//     } else {
//       handleButtonSelect(rowIndex, option);
//     }
//   };

//   const handleButtonUnselect = (rowIndex, option) => {
//     setSelectedOptions((prevSelectedOptions) => {
//       const updatedOptions = prevSelectedOptions.filter(
//         (selectedOption) => !(selectedOption.index === rowIndex && selectedOption.option === option)
//       );
//       return updatedOptions;
//     });
//   };

//   const handleNumberChange = (rowIndex, value) => {
//     setSelectedOptions((prevSelectedOptions) => {
//       const updatedOptions = prevSelectedOptions.map((selectedOption) => {
//         if (selectedOption.index === rowIndex) {
//           return { ...selectedOption, lot: value };
//         }
//         return selectedOption;
//       });
//       return updatedOptions;
//     });
//   };

//   const isOptionSelected = (rowIndex, option) => {
//     return selectedOptions.some(
//       (selectedOption) => selectedOption.index === rowIndex && selectedOption.option === option
//     );
//   };

//   // Sample data for the table
//   const rows = [
//     { name: 'Item 1', price: 100 },
//     { name: 'Item 2', price: 150 },
//     { name: 'Item 3', price: 200 },
//     // Add more rows as needed
//   ];
//   console.log(selectedOptions)
//   return (
//     <Table>
//       <TableBody>
//         {rows.map((row, rowIndex) => (
//           <TableRow key={rowIndex}>
//             <TableCell>{row.name}</TableCell>
//             <TableCell>
//               <Button
//                 variant={isOptionSelected(rowIndex, 'buy') ? 'contained' : 'outlined'}
//                 onClick={() => handleButtonClick(rowIndex, 'buy')}
//               >
//                 Buy
//               </Button>
//             </TableCell>
//             <TableCell>
//               <Button
//                 variant={isOptionSelected(rowIndex, 'sell') ? 'contained' : 'outlined'}
//                 onClick={() => handleButtonClick(rowIndex, 'sell')}
//               >
//                 Sell
//               </Button>
//             </TableCell>
//             <TableCell>
//               {isOptionSelected(rowIndex, 'buy') || isOptionSelected(rowIndex, 'sell') ? (
//                 <Select
//                   value={
//                     selectedOptions.find((selectedOption) => selectedOption.index === rowIndex)
//                       ?.lot || 10
//                   }
//                   onChange={(e) => handleNumberChange(rowIndex, e.target.value)}
//                 >
//                   <MenuItem value={10}>10</MenuItem>
//                   <MenuItem value={20}>20</MenuItem>
//                   <MenuItem value={30}>30</MenuItem>
//                   {/* Add more number options as needed */}
//                 </Select>
//               ) : null}
//             </TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   );
// };

// export default MyTable;

// final code onsided
// import React, { useState, useEffect } from 'react';
// import { Table, TableBody, TableCell, TableRow, Button, Select, MenuItem } from '@mui/material';

// const MyTable = () => {
//   const [selectedOptions, setSelectedOptions] = useState([]);

//   const handleButtonSelect = (rowIndex, option) => {
//     setSelectedOptions((prevSelectedOptions) => {
//       const updatedOptions = prevSelectedOptions.filter(
//         (selectedOption) => !(selectedOption.index === rowIndex)
//       );
//       updatedOptions.push({ index: rowIndex, option, lot: 10 });
//       return updatedOptions;
//     });
//   };

//   const handleButtonClick = (rowIndex, option) => {
//     const isSelected = selectedOptions.some(
//       (selectedOption) => selectedOption.index === rowIndex && selectedOption.option === option
//     );

//     if (isSelected) {
//       handleButtonUnselect(rowIndex, option);
//     } else {
//       handleButtonSelect(rowIndex, option);
//     }
//   };

//   const handleButtonUnselect = (rowIndex, option) => {
//     setSelectedOptions((prevSelectedOptions) => {
//       const updatedOptions = prevSelectedOptions.filter(
//         (selectedOption) => !(selectedOption.index === rowIndex && selectedOption.option === option)
//       );
//       return updatedOptions;
//     });
//   };

//   const handleNumberChange = (rowIndex, value) => {
//     setSelectedOptions((prevSelectedOptions) => {
//       const updatedOptions = prevSelectedOptions.map((selectedOption) => {
//         if (selectedOption.index === rowIndex) {
//           return { ...selectedOption, lot: value };
//         }
//         return selectedOption;
//       });
//       return updatedOptions;
//     });
//   };

//   const isOptionSelected = (rowIndex, option) => {
//     return selectedOptions.some(
//       (selectedOption) => selectedOption.index === rowIndex && selectedOption.option === option
//     );
//   };

//   // Sample data for the table
//   const rows = [
//     { name: 'Item 1', price: 100 },
//     { name: 'Item 2', price: 150 },
//     { name: 'Item 3', price: 200 },
//     // Add more rows as needed
//   ];
//   console.log(selectedOptions)
//   return (
//     <Table>
//       <TableBody>
//         {rows.map((row, rowIndex) => (
//           <TableRow key={rowIndex}>
//             <TableCell>{row.name}</TableCell>
//             <TableCell>
//               <Button
//                 variant={isOptionSelected(rowIndex, 'buy') ? 'contained' : 'outlined'}
//                 onClick={() => handleButtonClick(rowIndex, 'buy')}
//               >
//                 Buy
//               </Button>
//             </TableCell>
//             <TableCell>
//               <Button
//                 variant={isOptionSelected(rowIndex, 'sell') ? 'contained' : 'outlined'}
//                 onClick={() => handleButtonClick(rowIndex, 'sell')}
//               >
//                 Sell
//               </Button>
//             </TableCell>
//             <TableCell>
//               {isOptionSelected(rowIndex, 'buy') || isOptionSelected(rowIndex, 'sell') ? (
//                 <Select
//                   value={
//                     selectedOptions.find((selectedOption) => selectedOption.index === rowIndex)
//                       ?.lot || 10
//                   }
//                   onChange={(e) => handleNumberChange(rowIndex, e.target.value)}
//                 >
//                   <MenuItem value={10}>10</MenuItem>
//                   <MenuItem value={20}>20</MenuItem>
//                   <MenuItem value={30}>30</MenuItem>
//                   {/* Add more number options as needed */}
//                 </Select>
//               ) : null}
//             </TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   );
// };

// export default MyTable;


import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableRow, Button, Select, MenuItem } from '@mui/material';

const MyTable = () => {
  const [leftSelectedOptions, setLeftSelectedOptions] = useState([]);
  const [rightSelectedOptions, setRightSelectedOptions] = useState([]);

  const handleButtonSelect = (rowIndex, option, side) => {
    if (side === 'left') {
      setLeftSelectedOptions((prevSelectedOptions) => {
        const updatedOptions = prevSelectedOptions.filter(
          (selectedOption) => !(selectedOption.index === rowIndex)
        );
        updatedOptions.push({ index: rowIndex, option, lot: 10 });
        return updatedOptions;
      });
    } else if (side === 'right') {
      setRightSelectedOptions((prevSelectedOptions) => {
        const updatedOptions = prevSelectedOptions.filter(
          (selectedOption) => !(selectedOption.index === rowIndex)
        );
        updatedOptions.push({ index: rowIndex, option, lot: 10 });
        return updatedOptions;
      });
    }
  };

  const handleButtonClick = (rowIndex, option, side) => {
    if (side === 'left') {
      const isSelected = leftSelectedOptions.some(
        (selectedOption) => selectedOption.index === rowIndex && selectedOption.option === option
      );
      if (isSelected) {
        handleButtonUnselect(rowIndex, option, side);
      } else {
        handleButtonSelect(rowIndex, option, side);
      }
    } else if (side === 'right') {
      const isSelected = rightSelectedOptions.some(
        (selectedOption) => selectedOption.index === rowIndex && selectedOption.option === option
      );
      if (isSelected) {
        handleButtonUnselect(rowIndex, option, side);
      } else {
        handleButtonSelect(rowIndex, option, side);
      }
    }
  };

  const handleButtonUnselect = (rowIndex, option, side) => {
    if (side === 'left') {
      setLeftSelectedOptions((prevSelectedOptions) => {
        const updatedOptions = prevSelectedOptions.filter(
          (selectedOption) => !(selectedOption.index === rowIndex && selectedOption.option === option)
        );
        return updatedOptions;
      });
    } else if (side === 'right') {
      setRightSelectedOptions((prevSelectedOptions) => {
        const updatedOptions = prevSelectedOptions.filter(
          (selectedOption) => !(selectedOption.index === rowIndex && selectedOption.option === option)
        );
        return updatedOptions;
      });
    }
  };

  const handleNumberChange = (rowIndex, value, side) => {
    if (side === 'left') {
      setLeftSelectedOptions((prevSelectedOptions) => {
        const updatedOptions = prevSelectedOptions.map((selectedOption) => {
          if (selectedOption.index === rowIndex) {
            return { ...selectedOption, lot: value };
          }
          return selectedOption;
        });
        return updatedOptions;
      });
    } else if (side === 'right') {
      setRightSelectedOptions((prevSelectedOptions) => {
        const updatedOptions = prevSelectedOptions.map((selectedOption) => {
          if (selectedOption.index === rowIndex) {
            return { ...selectedOption, lot: value };
          }
          return selectedOption;
        });
        return updatedOptions;
      });
    }
  };

  const isOptionSelected = (rowIndex, option, side) => {
    if (side === 'left') {
      return leftSelectedOptions.some(
        (selectedOption) => selectedOption.index === rowIndex && selectedOption.option === option
      );
    } else if (side === 'right') {
      return rightSelectedOptions.some(
        (selectedOption) => selectedOption.index === rowIndex && selectedOption.option === option
      );
    }
    return false;
  };

  // Sample data for the table
  const rows = [
    { name: '20000', price: 100 },
    { name: '20500', price: 150 },
    { name: '21000', price: 200 },
    { name: '21500', price: 250 },
    { name: '22000', price: 300 },
    // Add more rows as needed
  ];
  console.log('l',leftSelectedOptions)
  console.log('r',rightSelectedOptions)
  return (
    <Table>
      <TableBody>
        {rows.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            
            <TableCell>
              <Button
                variant={isOptionSelected(rowIndex, 'buy', 'left') ? 'contained' : 'outlined'}
                onClick={() => handleButtonClick(rowIndex, 'buy', 'left')}
              >
                Buy (Left)
              </Button>
            </TableCell>
            <TableCell>
              <Button
                variant={isOptionSelected(rowIndex, 'sell', 'left') ? 'contained' : 'outlined'}
                onClick={() => handleButtonClick(rowIndex, 'sell', 'left')}
              >
                Sell (Left)
              </Button>
            </TableCell>

            <TableCell>
              {isOptionSelected(rowIndex, 'buy', 'left') || isOptionSelected(rowIndex, 'sell', 'left') ? (
                <Select
                  value={
                    leftSelectedOptions.find((selectedOption) => selectedOption.index === rowIndex)
                      ?.lot || 10
                  }
                  onChange={(e) => handleNumberChange(rowIndex, e.target.value, 'left')}
                >
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                  <MenuItem value={30}>30</MenuItem>
                  {/* Add more number options as needed */}
                </Select>
              ) : null}
            </TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.price}</TableCell>
            <TableCell>
              <Button
                variant={isOptionSelected(rowIndex, 'buy', 'right') ? 'contained' : 'outlined'}
                onClick={() => handleButtonClick(rowIndex, 'buy', 'right')}
              >
                Buy (Right)
              </Button>
            </TableCell>
            <TableCell>
              <Button
                variant={isOptionSelected(rowIndex, 'sell', 'right') ? 'contained' : 'outlined'}
                onClick={() => handleButtonClick(rowIndex, 'sell', 'right')}
              >
                Sell (Right)
              </Button>
            </TableCell>
            <TableCell>
              {isOptionSelected(rowIndex, 'buy', 'right') || isOptionSelected(rowIndex, 'sell', 'right') ? (
                <Select
                  value={
                    rightSelectedOptions.find((selectedOption) => selectedOption.index === rowIndex)
                      ?.lot || 10
                  }
                  onChange={(e) => handleNumberChange(rowIndex, e.target.value, 'right')}
                >
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                  <MenuItem value={30}>30</MenuItem>
                  {/* Add more number options as needed */}
                </Select>
              ) : null}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MyTable;
