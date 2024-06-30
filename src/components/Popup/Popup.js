import React, { useState } from 'react';
import './popup.css';

function Popup({ segmentName, setSegmentName, schemas, availableSchemas, addSchema, handleSaveSegment, togglePopup }) {
  const [selectedSchema, setSelectedSchema] = useState('');

  const handleAddSchema = () => {
    const schemaToAdd = availableSchemas.find(schema => schema.value === selectedSchema);
    if (schemaToAdd) {
      addSchema(schemaToAdd);
      setSelectedSchema('');
    }
  };

  const handleChange = (index, value) => {
    const updatedSchemas = [...schemas];
    updatedSchemas[index] = { ...updatedSchemas[index], value };
    addSchema(updatedSchemas);
  };

  const getAvailableOptions = () => {
    return availableSchemas.filter(schema => !schemas.find(s => s.value === schema.value));
  };

  const getAvailableOptionsForNewSchema = () => {
    // Get options that are not already selected in any schema
    const selectedValues = schemas.map(schema => schema.value);
    return availableSchemas.filter(schema => !selectedValues.includes(schema.value));
  };

  return (
    <div>
            <div className="segment-name-input">
      <label className="nam">Enter the Segment Name<br/>
        <input 
          type="text"
          value={segmentName}
          onChange={(e) => setSegmentName(e.target.value)}
          placeholder="Enter the Name of the Segment"
        />
      </label>
      </div>
      
              
        <div className="popup nam2">
      <h2>Saving Segment</h2>

      <div className="schemas nam2">
        {schemas.map((schema, index) => (
          <div key={index} className="schema-dropdown">
            <select value={schema.value} onChange={(e) => handleChange(index, e.target.value)}>
              <option value="">{schema.label}</option>
              {getAvailableOptions().map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <select
        value={selectedSchema}
        onChange={(e) => setSelectedSchema(e.target.value)}
      >
        <option value="">Add schema to segment</option>
        {getAvailableOptionsForNewSchema().map((schema) => (
          <option key={schema.value} value={schema.value}>{schema.label}</option>
        ))}
      </select>
      <div className="add-schema" onClick={handleAddSchema}>+ Add new schema</div>
      <div className="button-group">
        <button className="cancel-button" onClick={togglePopup}>Cancel</button>
        <button className="save-button" onClick={handleSaveSegment}>Save segment</button>
      </div>
    </div>


    </div>
      );
}

export default Popup;
