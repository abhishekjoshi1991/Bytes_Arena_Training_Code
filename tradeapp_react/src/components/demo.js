import React, { useState } from 'react';
// import ChildComponent1 from './ChildComponent1';
// import ChildComponent2 from './ChildComponent2';

const ParentComponent = () => {
  const [sharedState, setSharedState] = useState('1');

  // Callback function to update the shared state from ChildComponent1
  const updateSharedStateFromChild1 = (newValue) => {
    setSharedState(newValue);
  };

  // Callback function to update the shared state from ChildComponent2
  const updateSharedStateFromChild2 = (newValue) => {
    setSharedState(newValue);
  };
  console.log('parent')
  return (
    <div>
      <ChildComponent1 sharedState={sharedState} onUpdateState={updateSharedStateFromChild1} />
      <ChildComponent2 sharedState={sharedState} onUpdateState={updateSharedStateFromChild2} />
    </div>
  );
};

export default ParentComponent;



const ChildComponent1 = ({ sharedState, onUpdateState }) => {
  // Update local state in response to user actions
  const handleInputChange = (event) => {
    // Perform some logic to update the local state
    const newValue = event.target.value;

    // Call the callback function from the parent to update the shared state
    onUpdateState(newValue);
  };
  console.log('child1')


  return (
    <div>
      <input type="text" value={sharedState} onChange={handleInputChange} />
      {/* Render other content */}
    </div>
  );
};

// export default ChildComponent1;


const ChildComponent2 = ({ sharedState, onUpdateState }) => {
  // Update local state in response to user actions
  const handleButtonClick = () => {
    // Perform some logic to update the local state
    const newValue = 10;

    // Call the callback function from the parent to update the shared state
    onUpdateState(newValue);
  };
  console.log('child2')

  return (
    <div>
      <button onClick={handleButtonClick}>Update State</button>
      {/* Render other content */}
    </div>
  );
};

// export default ChildComponent2;

