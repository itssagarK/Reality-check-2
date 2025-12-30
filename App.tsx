import React, { useState } from 'react';
import { AppState } from './types';
import { analyzePlan } from './services/geminiService';
import { INITIAL_INPUT_PLACEHOLDER } from './constants';
import ReportCard from './components/ReportCard';
import DecisionPathPanel from './components/DecisionPathPanel';
import { Sparkles, Loader2, AlertOctagon } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    status: 'idle',
    data: null,
    error: null,
    input: ''
  });
  
  const [isPathPanelOpen, setIsPathPanelOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.input.trim()) return;

    setState(prev => ({ ...prev, status: 'analyzing', error: null }));

    try {
      const result = await analyzePlan(state.input);
      setState(prev => ({ ...prev, status: 'complete', data: result }));
    } catch (err: any) {
      setState(prev => ({ 
        ...prev, 
        status: 'error', 
        error: err.message || 'An unexpected error occurred while analyzing the plan.' 
      }));
    }
  };

  const resetAnalysis = () => {
    setState({
        status: 'idle',
        data: null,
        error: null,
        input: ''
    });
    setIsPathPanelOpen(false);
  };

  return (
    <div className="min-h-screen text-gray-100 font-sans selection:bg-purple-500/30">
      
      {/* Navigation / Header */}
      <nav className="fixed top-0 w-full z-40 border-b border-white/5 bg-[#050505]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={resetAnalysis}>
            <div className="w-8 h-8 rounded bg-gradient-to-tr from-purple-600 to-blue-600 flex items-center justify-center">
                <Sparkles size={16} className="text-white" />
            </div>
            <h1 className="font-mono font-bold text-lg tracking-tight">Reality Check AI</h1>
          </div>
          <div className="text-xs text-gray-500 font-mono">v1.0.0</div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="pt-24 px-4 pb-12 max-w-6xl mx-auto min-h-[calc(100vh-64px)] flex flex-col items-center">
        
        {state.status === 'idle' && (
          <div className="w-full max-w-2xl mt-12 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-500">
              Audit your ambition.
            </h2>
            <p className="text-center text-gray-400 mb-10 text-lg">
              Evidence-based feasibility analysis for your next big project. 
              No motivation, just data.
            </p>
            
            <form onSubmit={handleSubmit} className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl opacity-50 group-hover:opacity-75 transition duration-500 blur"></div>
              <div className="relative glass-panel rounded-2xl p-2">
                <textarea
                  value={state.input}
                  onChange={(e) => setState(prev => ({ ...prev, input: e.target.value }))}
                  placeholder={INITIAL_INPUT_PLACEHOLDER}
                  className="w-full h-40 bg-transparent text-white p-4 text-lg focus:outline-none placeholder:text-gray-600 resize-none font-mono"
                />
                <div className="flex justify-end px-2 pb-2">
                  <button
                    type="submit"
                    disabled={!state.input.trim()}
                    className="px-6 py-2 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    Run Audit
                    <Sparkles size={16} />
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {state.status === 'analyzing' && (
            <div className="flex flex-col items-center justify-center mt-32">
                <Loader2 size={48} className="text-purple-500 animate-spin mb-6" />
                <h3 className="text-xl font-bold text-white mb-2">Analyzing Constraints...</h3>
                <p className="text-gray-400 animate-pulse">Checking feasibility against known benchmarks</p>
            </div>
        )}

        {state.status === 'error' && (
             <div className="w-full max-w-2xl mt-12 glass-panel border-red-500/30 p-8 rounded-2xl flex flex-col items-center text-center">
                <AlertOctagon size={48} className="text-red-500 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Analysis Failed</h3>
                <p className="text-red-300 mb-6">{state.error}</p>
                <button 
                    onClick={() => setState(prev => ({...prev, status: 'idle', error: null}))}
                    className="px-6 py-2 border border-white/20 hover:bg-white/10 rounded-lg transition-colors"
                >
                    Try Again
                </button>
             </div>
        )}

        {state.status === 'complete' && state.data && (
            <>
                <ReportCard 
                    data={state.data} 
                    onOpenPaths={() => setIsPathPanelOpen(true)}
                />
                
                <DecisionPathPanel 
                    isOpen={isPathPanelOpen}
                    onClose={() => setIsPathPanelOpen(false)}
                    paths={state.data.alternative_paths}
                />
            </>
        )}

      </main>
    </div>
  );
};

export default App;