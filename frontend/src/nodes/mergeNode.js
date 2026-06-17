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
      <div className="flex flex-col gap-2.5">
        <span className="text-[11px] text-slate-500 leading-normal">
          Combines two inputs into a single output.
        </span>
        <label className="flex flex-col gap-1 font-medium text-slate-500 text-[11px]">
          Merge Strategy:
          <select 
            value={mergeType} 
            onChange={handleMergeTypeChange}
            className="px-2.5 py-1.5 rounded-md border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 outline-none text-xs text-slate-700 bg-white cursor-pointer transition-all duration-150"
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
