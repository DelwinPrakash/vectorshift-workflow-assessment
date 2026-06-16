// mergeNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const MergeNode = ({ id, data, selected }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [mergeType, setMergeType] = useState(data?.mergeType || 'concatenate');

  const handleMergeTypeChange = (e) => {
    const val = e.target.value;
    setMergeType(val);
    updateNodeField(id, 'mergeType', val);
  };

  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-input-a`,
      style: { top: '33.33%' },
    },
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-input-b`,
      style: { top: '66.66%' },
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-merged`,
    }
  ];

  return (
    <BaseNode
      id={id}
      selected={selected}
      title="Merge"
      headerColor="#6366f1"
      handles={handles}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span style={{ fontSize: '11px', color: '#64748b' }}>
          Combines two inputs into a single output.
        </span>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontWeight: '500', color: '#64748b' }}>
          Merge Strategy:
          <select 
            value={mergeType} 
            onChange={handleMergeTypeChange}
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
            <option value="concatenate">Concatenate Text</option>
            <option value="zip">Zip Objects</option>
            <option value="json_merge">JSON Merge</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};
