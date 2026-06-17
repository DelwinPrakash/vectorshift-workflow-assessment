// submit.js

export const SubmitButton = () => {

    return (
        <div className="flex items-center justify-center py-5 bg-slate-50 border-t border-slate-200">
            <button 
                type="submit"
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm rounded-lg shadow-sm hover:shadow hover:ring-2 hover:ring-indigo-500/10 active:scale-98 transition-all duration-150 cursor-pointer"
            >
                Submit Pipeline
            </button>
        </div>
    );
}
