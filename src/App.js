import React, { useState } from 'react';
import Popup from './components/Popup/Popup';
import { useSchema } from './hooks/useSchema';
import { saveSegment } from './utils/api';
import './assests/styles/App.css';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [segmentName, setSegmentName] = useState('');
  const { schemas, availableSchemas, addSchema } = useSchema();

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleSaveSegment = async () => {
    const data = {
      segment_name: segmentName,
      schema: schemas.reduce((acc, schema) => {
        acc.push({ [schema.value]: schema.label });
        return acc;
      }, []),
    };

    try {
      const response = await saveSegment(data);
      console.log(response);
    } catch (error) {
      console.error('Error saving segment:', error);
    }

    togglePopup();
  };

  return (
    <div className="App">
      <button onClick={togglePopup}>Save segment</button>
      {isOpen && (
        <Popup
          segmentName={segmentName}
          setSegmentName={setSegmentName}
          schemas={schemas}
          availableSchemas={availableSchemas}
          addSchema={addSchema}
          handleSaveSegment={handleSaveSegment}
          togglePopup={togglePopup}
        />
      )}
    </div>
  );
}

export default App;
