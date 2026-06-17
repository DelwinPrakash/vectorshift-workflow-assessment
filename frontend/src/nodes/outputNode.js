// outputNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const OutputNode = ({ id, data, selected }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

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
            value={outputType} 
            onChange={handleTypeChange}
            className="px-2.5 py-1.5 rounded-md border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 outline-none text-xs text-slate-700 bg-white cursor-pointer transition-all duration-150"
          >
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};
