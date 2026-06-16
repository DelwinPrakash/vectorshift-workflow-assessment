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
      style={{
        minWidth: '220px',
        backgroundColor: '#ffffff',
        border: selected ? '2px solid #4f46e5' : '1px solid #e2e8f0',
        borderRadius: '12px',
        boxShadow: selected
          ? '0 0 0 3px rgba(79, 70, 229, 0.2), 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)'
          : '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        ...style,
      }}
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
        />
      ))}

      {/* Node Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 12px',
          borderBottom: '1px solid #a4b1beff',
          background: `linear-gradient(135deg, ${headerColor}0a, ${headerColor}15)`,
          color: '#1e293b',
          fontWeight: '600',
          fontSize: '13px',
          borderTopLeftRadius: '11px',
          borderTopRightRadius: '11px',
          userSelect: 'none',
        }}
      >
        <span>{title}</span>
      </div>

      {/* Node Content */}
      <div
        style={{
          padding: '12px 14px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          fontSize: '12px',
          color: '#475569',
          backgroundColor: '#fafafa',
        }}
      >
        {children}
      </div>
    </div>
  );
};
