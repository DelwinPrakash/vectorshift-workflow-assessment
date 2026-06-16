// apiNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const APINode = ({ id, data, selected }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const [currName, setCurrName] = useState(data?.apiName || id.replace('api-', 'api_'));
  const [apiUrl, setApiUrl] = useState(data?.apiUrl || '');
  const [apiMethod, setApiMethod] = useState(data?.apiMethod || 'GET');

  const handleNameChange = (e) => {
    const value = e.target.value;
    setCurrName(value);
    updateNodeField(id, 'apiName', value);
  };

  const handleUrlChange = (e) => {
    const value = e.target.value;
    setApiUrl(value);
    updateNodeField(id, 'apiUrl', value);
  };

  const handleMethodChange = (e) => {
    const value = e.target.value;
    setApiMethod(value);
    updateNodeField(id, 'apiMethod', value);
  };

  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-request`,
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-response`,
    }
  ];

  return (
    <BaseNode
      id={id}
      selected={selected}
      title="API"
      headerColor="#06b6d4"
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
          Endpoint:
          <input 
            type="text" 
            placeholder="https://api.example.com"
            value={apiUrl} 
            onChange={handleUrlChange}
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
          Method:
          <select 
            value={apiMethod} 
            onChange={handleMethodChange}
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
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};
