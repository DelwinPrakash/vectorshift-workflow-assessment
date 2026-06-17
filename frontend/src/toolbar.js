// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div className="bg-slate-900 border-b border-slate-800 px-6 py-4.5 flex flex-col md:flex-row md:items-center justify-between gap-4 font-sans select-none shadow-sm">
            <div>
                <h1 className="text-white font-bold text-base tracking-wide flex items-center gap-2">
                    Pipeline Builder
                </h1>
                <p className="text-[11px] text-slate-400 mt-0.5">
                    Drag and drop nodes onto the canvas to construct your workflow
                </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
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
