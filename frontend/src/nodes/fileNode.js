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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span style={{ fontSize: '11px', color: '#64748b' }}>
          Reads text content from a file source.
        </span>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontWeight: '500', color: '#64748b' }}>
          File Format:
          <select 
            value={fileType} 
            onChange={handleFileTypeChange}
            style={{
              padding: '6px 8px',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              outline: 'none',
              fontSize: '12px',
              backgroundColor: '#ffffff',
              cursor: 'pointer',
              transition: 'border-color 0.15s ease',
            }}
          >
            <option value="TXT">Plain Text (.txt)</option>
            <option value="PDF">PDF Document (.pdf)</option>
            <option value="CSV">CSV Spreadsheet (.csv)</option>
            <option value="JSON">JSON File (.json)</option>
          </select>
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontWeight: '500', color: '#64748b' }}>
          File Path/Name:
          <input 
            type="text" 
            placeholder="data/document.txt"
            value={filePath} 
            onChange={handleFilePathChange}
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
