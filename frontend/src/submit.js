// submit.js

import { useState } from 'react';
import { useStore } from './store';

export const SubmitButton = () => {
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);
    const resetAll = useStore((state) => state.resetAll);
    const [result, setResult] = useState(null);

    const handleSubmit = async () => {
        const payload = { nodes, edges };
        
        const formData = new FormData();
        formData.append('pipeline', JSON.stringify(payload));

        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Server returned status ${response.status}`);
            }

            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error('Failed to submit pipeline:', error);
            alert('Failed to submit pipeline. Please check if the backend server is running.');
        }
    };

    return (
        <div className="flex items-center justify-center gap-4 py-5 bg-slate-50 border-t border-slate-200 relative">
            {/* Help tooltip for node deletion */}
            <div className="absolute left-6 bottom-1/2 translate-y-1/2 group">
                <button 
                    type="button"
                    className="flex items-center justify-center p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-amber-600 transition-all duration-200 cursor-help border border-slate-200/60 shadow-sm focus:outline-none"
                    aria-label="Help"
                >
                    {/* Caution / Warning Icon */}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                </button>

                {/* Tooltip Popup */}
                <div className="absolute bottom-full left-0 mb-3 w-64 p-4 bg-slate-900/95 text-slate-100 text-xs rounded-xl shadow-xl border border-slate-800 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50 backdrop-blur-xs">
                    <div className="font-bold text-white mb-2 flex items-center gap-1.5 tracking-wide text-xs">
                        <svg className="w-4 h-4 text-amber-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                        </svg>
                        Deleting a node
                    </div>
                    <p className="text-slate-300 leading-relaxed font-sans text-xs">
                        Select the node, then hold <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px] font-mono text-white">Ctrl</kbd> and press <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px] font-mono text-white">Backspace</kbd> twice to delete it.
                    </p>
                </div>
            </div>

            <button 
                type="button"
                onClick={handleSubmit}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm rounded-lg shadow-sm hover:shadow hover:ring-2 hover:ring-indigo-500/10 active:scale-98 transition-all duration-150 cursor-pointer"
            >
                Submit Pipeline
            </button>

            <button 
                type="button"
                onClick={resetAll}
                className="px-6 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold text-sm rounded-lg shadow-sm hover:shadow hover:ring-2 hover:ring-slate-500/10 active:scale-98 transition-all duration-150 cursor-pointer"
            >
                Reset All
            </button>

            {/* Glassmorphic Modal Overlay */}
            {result && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/30 backdrop-blur-sm transition-all duration-300">
                    <div className="relative w-full max-w-sm p-6 mx-4 bg-white/75 border border-white/40 rounded-2xl shadow-2xl backdrop-blur-md font-sans overflow-hidden">
                        {/* Decorative background glows */}
                        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-28 h-28 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
                        <div className="absolute bottom-0 left-0 -ml-12 -mb-12 w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

                        {/* Modal Header */}
                        <div className="flex items-center justify-between mb-5 relative z-10">
                            <h3 className="text-base font-bold text-slate-800 tracking-tight">Pipeline Analysis</h3>
                            <button
                                onClick={() => setResult(null)}
                                className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-full hover:bg-slate-100/50"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Metrics Grid */}
                        <div className="grid grid-cols-2 gap-4 mb-5 relative z-10">
                            <div className="p-3.5 rounded-xl bg-white/50 border border-slate-100 flex flex-col items-center justify-center text-center">
                                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Nodes</span>
                                <span className="text-3xl font-extrabold text-indigo-600 font-mono">{result.num_nodes}</span>
                            </div>
                            <div className="p-3.5 rounded-xl bg-white/50 border border-slate-100 flex flex-col items-center justify-center text-center">
                                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Edges</span>
                                <span className="text-3xl font-extrabold text-indigo-600 font-mono">{result.num_edges}</span>
                            </div>
                        </div>

                        {/* DAG Status Banner */}
                        <div className={`p-4 rounded-xl border flex items-center gap-3.5 relative z-10 ${
                            result.is_dag
                                ? 'bg-emerald-50/60 border-emerald-200/50 text-emerald-800'
                                : 'bg-rose-50/60 border-rose-200/50 text-rose-800'
                        }`}>
                            <div className={`p-1.5 rounded-lg ${
                                result.is_dag ? 'bg-emerald-500/10' : 'bg-rose-500/10'
                            }`}>
                                {result.is_dag ? (
                                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                )}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">DAG Status</span>
                                <span className="text-xs font-bold leading-tight">
                                    {result.is_dag
                                        ? 'Directed Acyclic Graph'
                                        : 'Cycles Detected (Invalid)'}
                                </span>
                            </div>
                        </div>

                        {/* Close Action */}
                        <div className="mt-5 relative z-10">
                            <button
                                onClick={() => setResult(null)}
                                className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 active:bg-slate-900 text-white font-semibold text-xs rounded-xl transition-all duration-150 active:scale-[0.98] shadow-sm hover:shadow"
                            >
                                Dismiss
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

