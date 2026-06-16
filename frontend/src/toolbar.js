// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div style={{ padding: '10px' }}>
            <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='apiNode' label='API' />
                <DraggableNode type='delayNode' label='Delay' />
                <DraggableNode type='filterNode' label='Filter' />
                <DraggableNode type='mergeNode' label='Merge' />
                <DraggableNode type='fileNode' label='File Reader' />
            </div>
        </div>
    );
};
