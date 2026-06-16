// filterNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const FilterNode = ({ id, data, selected }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [property, setProperty] = useState(data?.property || 'status');
  const [condition, setCondition] = useState(data?.condition || 'equals');
  const [value, setValue] = useState(data?.value || '');

  const handlePropertyChange = (e) => {
    const val = e.target.value;
    setProperty(val);
    updateNodeField(id, 'property', val);
  };

  const handleConditionChange = (e) => {
    const val = e.target.value;
    setCondition(val);
    updateNodeField(id, 'condition', val);
  };

  const handleValueChange = (e) => {
    const val = e.target.value;
    setValue(val);
    updateNodeField(id, 'value', val);
  };

  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-input`,
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-true`,
      style: { top: '33.33%' },
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-false`,
      style: { top: '66.66%' },
    }
  ];

  return (
    <BaseNode
      id={id}
      selected={selected}
      title="Filter"
      headerColor="#f43f5e"
      handles={handles}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span style={{ fontSize: '11px', color: '#64748b' }}>
          Routes data based on a condition.
        </span>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontWeight: '500', color: '#64748b' }}>
          Property:
          <input 
            type="text" 
            placeholder="status"
            value={property} 
            onChange={handlePropertyChange}
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
          Condition:
          <select 
            value={condition} 
            onChange={handleConditionChange}
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
            <option value="equals">Equals</option>
            <option value="contains">Contains</option>
            <option value="greater_than">Greater Than</option>
            <option value="less_than">Less Than</option>
          </select>
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontWeight: '500', color: '#64748b' }}>
          Value:
          <input 
            type="text" 
            placeholder="active"
            value={value} 
            onChange={handleValueChange}
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
      </div>
    </BaseNode>
  );
};
