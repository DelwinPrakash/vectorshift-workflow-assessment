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
      <div className="flex flex-col gap-2.5">
        <span className="text-[11px] text-slate-500 leading-normal">
          Pauses the pipeline execution flow.
        </span>
        <label className="flex flex-col gap-1 font-medium text-slate-500 text-[11px]">
          Delay (seconds):
          <input 
            type="number" 
            min="0"
            value={delay} 
            onChange={handleDelayChange}
            className="px-2.5 py-1.5 rounded-md border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 outline-none text-xs text-slate-700 bg-white transition-all duration-150"
          />
        </label>
      </div>
    </BaseNode>
  );
};
