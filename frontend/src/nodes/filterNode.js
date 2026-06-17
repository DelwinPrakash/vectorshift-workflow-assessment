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
      <div className="flex flex-col gap-2.5">
        <span className="text-[11px] text-slate-500 leading-normal">
          Routes data based on a condition.
        </span>
        <label className="flex flex-col gap-1 font-medium text-slate-500 text-[11px]">
          Property:
          <input 
            type="text" 
            placeholder="status"
            value={property} 
            onChange={handlePropertyChange}
            className="px-2.5 py-1.5 rounded-md border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 outline-none text-xs text-slate-700 bg-white transition-all duration-150"
          />
        </label>
        <label className="flex flex-col gap-1 font-medium text-slate-500 text-[11px]">
          Condition:
          <select 
            value={condition} 
            onChange={handleConditionChange}
            className="px-2.5 py-1.5 rounded-md border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 outline-none text-xs text-slate-700 bg-white cursor-pointer transition-all duration-150"
          >
            <option value="equals">Equals</option>
            <option value="contains">Contains</option>
            <option value="greater_than">Greater Than</option>
            <option value="less_than">Less Than</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 font-medium text-slate-500 text-[11px]">
          Value:
          <input 
            type="text" 
            placeholder="active"
            value={value} 
            onChange={handleValueChange}
            className="px-2.5 py-1.5 rounded-md border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 outline-none text-xs text-slate-700 bg-white transition-all duration-150"
          />
        </label>
      </div>
    </BaseNode>
  );
};
