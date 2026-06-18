// textNode.js

import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { Position, useUpdateNodeInternals } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

const extractVariables = (text) => {
  if (!text) return [];
  const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
  const matches = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    matches.push(match[1]);
  }
  return Array.from(new Set(matches));
};

export const TextNode = ({ id, data, selected }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const updateNodeInternals = useUpdateNodeInternals();

  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [dimensions, setDimensions] = useState({ width: 200, height: 44 });
  const textareaRef = useRef(null);

  const handleTextChange = (e) => {
    const value = e.target.value;
    setCurrText(value);
    updateNodeField(id, 'text', value);
  };

  useLayoutEffect(() => {
    if (textareaRef.current) {
      // Temporarily reset to auto to calculate new dimensions
      textareaRef.current.style.width = 'auto';
      textareaRef.current.style.height = 'auto';

      const lines = currText.split('\n');
      const maxLineLength = Math.max(...lines.map(line => line.length), 0);
      
      // Calculate responsive width (characters count * approx width factor + padding)
      const newWidth = Math.min(500, Math.max(200, maxLineLength * 8 + 24));
      
      // Set width temporarily to measure the scrollHeight accurately (taking word wrapping into account)
      textareaRef.current.style.width = `${newWidth}px`;
      const newHeight = Math.min(300, Math.max(44, textareaRef.current.scrollHeight));
      textareaRef.current.style.height = `${newHeight}px`;

      setDimensions({ width: newWidth, height: newHeight });
    }
  }, [currText]);

  const variables = extractVariables(currText);

  // Notify React Flow when handles or dimensions change so that edge connections match the updated layout
  useEffect(() => {
    updateNodeInternals(id);
  }, [id, dimensions.width, dimensions.height, variables.join(','), updateNodeInternals]);

  // Generate target handles on the left for each unique variable
  const variableHandles = variables.map((variable, index) => ({
    type: 'target',
    position: Position.Left,
    id: `${id}-${variable}`,
    label: variable,
    style: {
      top: `${((index + 1) / (variables.length + 1)) * 100}%`,
    },
  }));

  // Combine with the default source handle on the right
  const handles = [
    ...variableHandles,
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-output`,
    },
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
          <textarea 
            ref={textareaRef}
            value={currText} 
            onChange={handleTextChange}
            className="px-2.5 py-1.5 rounded-md border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 outline-none text-xs text-slate-700 bg-white transition-all duration-150 resize-none overflow-hidden"
            style={{
              width: `${dimensions.width}px`,
              height: `${dimensions.height}px`,
            }}
          />
        </label>
      </div>
    </BaseNode>
  );
};

