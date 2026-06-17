// inputNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const InputNode = ({ id, data, selected }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

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
      <div className="flex flex-col gap-2.5">
        <label className="flex flex-col gap-1 font-medium text-slate-500 text-[11px]">
          Name:
          <input 
            type="text" 
            value={currName} 
            onChange={handleNameChange}
            className="px-2.5 py-1.5 rounded-md border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 outline-none text-xs text-slate-700 bg-white transition-all duration-150"
          />
        </label>
        <label className="flex flex-col gap-1 font-medium text-slate-500 text-[11px]">
          Type:
          <select 
            value={inputType} 
            onChange={handleTypeChange}
            className="px-2.5 py-1.5 rounded-md border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 outline-none text-xs text-slate-700 bg-white cursor-pointer transition-all duration-150"
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};
