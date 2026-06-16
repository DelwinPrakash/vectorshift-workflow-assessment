// inputNode.js

import { useState, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const InputNode = ({ id, data, selected }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  useEffect(() => {
    if (!data?.inputName) {
      updateNodeField(id, 'inputName', currName);
    }
    if (!data?.inputType) {
      updateNodeField(id, 'inputType', inputType);
    }
  }, [id, data, currName, inputType, updateNodeField]);

  const handleNameChange = (e) => {
    const value = e.target.value;
    setCurrName(value);
    updateNodeField(id, 'inputName', value);
  };

  const handleTypeChange = (e) => {
    const value = e.target.value;
    setInputType(value);
    updateNodeField(id, 'inputType', value);
  };

  const handles = [
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-value`,
    }
  ];

  return (
    <BaseNode
      id={id}
      selected={selected}
      title="Input"
      headerColor="#3b82f6"
      handles={handles}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontWeight: '500', color: '#64748b' }}>
          Name:
          <input 
            type="text" 
            value={currName} 
            onChange={handleNameChange}
            style={{
              padding: '6px 8px',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              outline: 'none',
              fontSize: '12px',
              transition: 'border-color 0.15s ease',
            }}
          />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontWeight: '500', color: '#64748b' }}>
          Type:
          <select 
            value={inputType} 
            onChange={handleTypeChange}
            style={{
              padding: '6px 8px',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              outline: 'none',
              fontSize: '12px',
              backgroundColor: '#ffffff',
              cursor: 'pointer',
              transition: 'border-color 0.15s ease',
            }}
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};
