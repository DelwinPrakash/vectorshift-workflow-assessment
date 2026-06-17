// draggableNode.js

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className={`${type} cursor-grab select-none px-3.5 py-2.5 flex items-center justify-center rounded-lg border border-slate-200 bg-white shadow-sm hover:shadow hover:border-indigo-400 hover:text-indigo-600 transition-all duration-150 text-[12px] font-semibold text-slate-700`}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        draggable
      >
        <span>{label}</span>
      </div>
    );
  };
  