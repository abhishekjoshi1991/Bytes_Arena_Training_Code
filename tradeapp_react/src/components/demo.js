// import React from 'react';

// const MyComponent = () => {
//   const initialData = [
//     { id: 10, lot: 50 },
//     { id: 20, lot: 60 },
//     { id: 20, lot: 60 },
//     { id: 10, lot: 50 },
//   ];

//   const summedData = initialData.reduce((accumulator, current) => {
//     const existingItem = accumulator.find(item => item.id === current.id);

//     if (existingItem) {
//       existingItem.lot += current.lot;
// //     } else {
// //       accumulator.push({ id: current.id, lot: current.lot });
// //     }

// //     return accumulator;
// //   }, []);

// //   console.log(summedData);

// //   // Rest of your component content...
// // };

// // export default MyComponent;

// import React, { useState } from 'react';

// const MyComponent = () => {
//   const [data, setData] = useState([
//     { id: 1, lot: 1 },
//     { id: 1, lot: 2 },
//     { id: 2, lot: 1 },
//     { id: 1, lot: 10 },
//   ]);

//   const updateLastLotValue = (targetId, newValue) => {
//     const updatedData = data.map(item => {
//       if (item.id === targetId) {
//         return { ...item };
//       }
//       return item;
//     });

//     for (let i = updatedData.length - 1; i >= 0; i--) {
//       if (updatedData[i].id === targetId) {
//         updatedData[i].lot = newValue;
//         break;
//       }
//     }

//     setData(updatedData);
//   };

//   // Usage
//   const targetId = 1;
//   const newValue = 50;
//   updateLastLotValue(targetId, newValue);

//   return (
//     <div>
//       {/* Render your content */}
//       <pre>{JSON.stringify(data, null, 2)}</pre>
//     </div>
//   );
// };

// export default MyComponent;

import React, { useState } from 'react';

function MyComponent() {
  const [rowData, setRowData] = useState([
    { id: 1, lot: 5, selectedValue: 1 }, // For example
    { id: 2, lot: 3, selectedValue: 1 },
    // ... other rows
  ]);

  const handleSelectChange = (event, rowId) => {
    const updatedRowData = rowData.map(row => {
      if (row.id === rowId) {
        return { ...row, selectedValue: parseInt(event.target.value) };
      }
      return row;
    });
    setRowData(updatedRowData);
  };

  const handleExitButtonClick = (rowId) => {
    // Perform action on exit button click for the specific row
    console.log(`Exit button clicked with selected value  ${rowId}`);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Lot</th>
          <th>Selected Value</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {rowData.map(row => (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.lot}</td>
            <td>
              <select value={row.selectedValue} onChange={(e) => handleSelectChange(e, row.id)}>
                {[...Array(row.lot)].map((_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <button onClick={() => handleExitButtonClick(row.selectedValue)}>Exit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MyComponent;

