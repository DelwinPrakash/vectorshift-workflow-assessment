// textNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const TextNode = ({ id, data, selected }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const [currText, setCurrText] = useState(data?.text || '{{input}}');

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
      <div className="flex flex-col gap-2.5">
        <label className="flex flex-col gap-1 font-medium text-slate-500 text-[11px]">
          Text:
          <input 
            type="text" 
            value={currText} 
            onChange={handleTextChange}
            className="px-2.5 py-1.5 rounded-md border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 outline-none text-xs text-slate-700 bg-white transition-all duration-150"
          />
        </label>
      </div>
    </BaseNode>
  );
};
