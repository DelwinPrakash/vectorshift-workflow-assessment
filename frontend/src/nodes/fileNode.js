// fileNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const FileNode = ({ id, data, selected }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [fileType, setFileType] = useState(data?.fileType || 'TXT');
  const [filePath, setFilePath] = useState(data?.filePath || '');

  const handleFileTypeChange = (e) => {
    const value = e.target.value;
    setFileType(value);
    updateNodeField(id, 'fileType', value);
  };

  const handleFilePathChange = (e) => {
    const value = e.target.value;
    setFilePath(value);
    updateNodeField(id, 'filePath', value);
  };

  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-trigger`,
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-content`,
    }
  ];

  return (
    <BaseNode
      id={id}
      selected={selected}
      title="File Reader"
      headerColor="#14b8a6"
      handles={handles}
    >
      <div className="flex flex-col gap-2.5">
        <span className="text-[11px] text-slate-500 leading-normal">
          Reads text content from a file source.
        </span>
        <label className="flex flex-col gap-1 font-medium text-slate-500 text-[11px]">
          File Format:
          <select 
            value={fileType} 
            onChange={handleFileTypeChange}
            className="px-2.5 py-1.5 rounded-md border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 outline-none text-xs text-slate-700 bg-white cursor-pointer transition-all duration-150"
          >
            <option value="TXT">Plain Text (.txt)</option>
            <option value="PDF">PDF Document (.pdf)</option>
            <option value="CSV">CSV Spreadsheet (.csv)</option>
            <option value="JSON">JSON File (.json)</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 font-medium text-slate-500 text-[11px]">
          File Path/Name:
          <input 
            type="text" 
            placeholder="data/document.txt"
            value={filePath} 
            onChange={handleFilePathChange}
            className="px-2.5 py-1.5 rounded-md border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 outline-none text-xs text-slate-700 bg-white transition-all duration-150"
          />
        </label>
      </div>
    </BaseNode>
  );
};
