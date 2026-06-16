// llmNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, selected }) => {
  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-system`,
      style: { top: '33.33%' },
    },
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-prompt`,
      style: { top: '66.66%' },
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-response`,
    },
  ];

  return (
    <BaseNode
      id={id}
      selected={selected}
      title="LLM"
      headerColor="#8b5cf6"
      handles={handles}
    >
      <div style={{ padding: '6px 0', color: '#475569', fontSize: '12px' }}>
        <span>This is a LLM.</span>
      </div>
    </BaseNode>
  );
};
