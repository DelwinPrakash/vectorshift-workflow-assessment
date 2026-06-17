// BaseNode.js
import React from 'react';
import { Handle } from 'reactflow';

export const BaseNode = ({
  id,
  selected,
  title,
  headerColor = '#4f46e5',
  handles = [],
  children,
  style = {},
}) => {
  return (
    <div
      className={`min-w-[220px] bg-white border rounded-xl shadow-sm transition-all duration-200 flex flex-col overflow-hidden font-sans ${
        selected
          ? 'ring-2 ring-indigo-500/30 border-indigo-500 shadow-md scale-[1.01]'
          : 'border-slate-200 hover:border-slate-300 hover:shadow'
      }`}
      style={style}
    >
      {/* Handles rendering */}
      {handles.map((handle, index) => (
        <Handle
          key={handle.id || `${handle.type}-${index}`}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={{
            background: headerColor,
            width: '10px',
            height: '10px',
            border: '2px solid #ffffff',
            boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
            zIndex: 10,
            cursor: 'crosshair',
            ...handle.style,
          }}
          className="hover:scale-125 transition-transform"
        />
      ))}

      {/* Node Header */}
      <div
        className="flex items-center justify-between px-3 py-2 border-b border-slate-100"
        style={{
          background: `linear-gradient(135deg, ${headerColor}0d, ${headerColor}1a)`,
          color: '#1e293b',
        }}
      >
        <div className="flex items-center gap-2 font-semibold text-xs">
          <span 
            className="w-2 h-2 rounded-full" 
            style={{ backgroundColor: headerColor }}
          />
          <span>{title}</span>
        </div>
        <span className="text-[9px] text-slate-400 font-mono tracking-wider uppercase">
          {id.split('-')[0]}
        </span>
      </div>

      {/* Node Content */}
      <div className="p-3.5 flex flex-col gap-3 bg-slate-50/50 flex-1 text-xs text-slate-600">
        {children}
      </div>
    </div>
  );
};
