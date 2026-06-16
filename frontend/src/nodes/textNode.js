// textNode.js

import { useState, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const TextNode = ({ id, data, selected }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  useEffect(() => {
    if (!data?.text) {
      updateNodeField(id, 'text', currText);
    }
  }, [id, data, currText, updateNodeField]);

  const handleTextChange = (e) => {
    const value = e.target.value;
    setCurrText(value);
    updateNodeField(id, 'text', value);
  };

  const handles = [
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
      title="Text"
      headerColor="#f59e0b"
      handles={handles}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontWeight: '500', color: '#64748b' }}>
          Text:
          <input 
            type="text" 
            value={currText} 
            onChange={handleTextChange}
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
