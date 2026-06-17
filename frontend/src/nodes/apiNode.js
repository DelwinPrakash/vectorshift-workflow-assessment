// apiNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const APINode = ({ id, data, selected }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const [currName, setCurrName] = useState(data?.apiName || id.replace('api-', 'api_'));
  const [apiUrl, setApiUrl] = useState(data?.apiUrl || '');
  const [apiMethod, setApiMethod] = useState(data?.apiMethod || 'GET');

  const handleNameChange = (e) => {
    const value = e.target.value;
    setCurrName(value);
    updateNodeField(id, 'apiName', value);
  };

  const handleUrlChange = (e) => {
    const value = e.target.value;
    setApiUrl(value);
    updateNodeField(id, 'apiUrl', value);
  };

  const handleMethodChange = (e) => {
    const value = e.target.value;
    setApiMethod(value);
    updateNodeField(id, 'apiMethod', value);
  };

  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-request`,
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-response`,
    }
  ];

  return (
    <BaseNode
      id={id}
      selected={selected}
      title="API"
      headerColor="#06b6d4"
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
          Endpoint:
          <input 
            type="text" 
            placeholder="https://api.example.com"
            value={apiUrl} 
            onChange={handleUrlChange}
            className="px-2.5 py-1.5 rounded-md border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 outline-none text-xs text-slate-700 bg-white transition-all duration-150"
          />
        </label>
        <label className="flex flex-col gap-1 font-medium text-slate-500 text-[11px]">
          Method:
          <select 
            value={apiMethod} 
            onChange={handleMethodChange}
            className="px-2.5 py-1.5 rounded-md border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 outline-none text-xs text-slate-700 bg-white cursor-pointer transition-all duration-150"
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};
