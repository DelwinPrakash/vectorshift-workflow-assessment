// delayNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const DelayNode = ({ id, data, selected }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [delay, setDelay] = useState(data?.delay || 5);

  const handleDelayChange = (e) => {
    const value = parseInt(e.target.value, 10) || 0;
    setDelay(value);
    updateNodeField(id, 'delay', value);
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
      id: `${id}-output`,
    }
  ];

  return (
    <BaseNode
      id={id}
      selected={selected}
      title="Delay"
      headerColor="#ec4899"
      handles={handles}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span style={{ fontSize: '11px', color: '#64748b' }}>
          Pauses the pipeline execution flow.
        </span>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontWeight: '500', color: '#64748b' }}>
          Delay (seconds):
          <input 
            type="number" 
            min="0"
            value={delay} 
            onChange={handleDelayChange}
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
