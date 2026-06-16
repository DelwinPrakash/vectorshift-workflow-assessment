// outputNode.js

import { useState, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const OutputNode = ({ id, data, selected }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  useEffect(() => {
    if (!data?.outputName) {
      updateNodeField(id, 'outputName', currName);
    }
    if (!data?.outputType) {
      updateNodeField(id, 'outputType', outputType);
    }
  }, [id, data, currName, outputType, updateNodeField]);

  const handleNameChange = (e) => {
    const value = e.target.value;
    setCurrName(value);
    updateNodeField(id, 'outputName', value);
  };

  const handleTypeChange = (e) => {
    const value = e.target.value;
    setOutputType(value);
    updateNodeField(id, 'outputType', value);
  };

  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-value`,
    }
  ];

  return (
    <BaseNode
      id={id}
      selected={selected}
      title="Output"
      headerColor="#10b981"
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
            value={outputType} 
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
            <option value="File">Image</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};
