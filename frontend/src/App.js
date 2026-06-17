import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between overflow-hidden">
      <div className="flex flex-col flex-1">
        <PipelineToolbar />
        <PipelineUI />
      </div>
      <SubmitButton />
    </div>
  );
}

export default App;
