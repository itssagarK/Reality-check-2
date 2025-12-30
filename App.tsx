import React, { useState, useRef } from 'react';
import { AppState, AlternativePath, UserContext, HistoryItem } from './types';
import { analyzePlan } from './services/geminiService';
import ReportCard from './components/ReportCard';
import DecisionPathPanel from './components/DecisionPathPanel';
import InputSection from './components/InputSection';
import { Sparkles, Loader2, AlertOctagon, RotateCcw, Clock, X, ChevronRight } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    status: 'idle',
    data: null,
    error: null,
    input: '',
    context: {
        budget: '',
        skillLevel: 'Intermediate',
        hoursPerDay: 2
    },
    history: [],
    isHistoryOpen: false
  });
  
  const [isPathPanelOpen, setIsPathPanelOpen] = useState(false);
  const [isSidebarGlowing, setIsSidebarGlowing] = useState(false);
  const [isParametersVisible, setIsParametersVisible] = useState(true);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const performAnalysis = async (inputStr: string, contextData: UserContext) => {
    setState(prev => ({ ...prev, status: 'analyzing', error: null }));
    try {
      const result = await analyzePlan(inputStr, contextData);
      
      const newHistoryItem: HistoryItem = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        input: inputStr,
        context: contextData,
        data: result
      };

      setState(prev => ({ 
        ...prev, 
        status: 'complete', 
        data: result,
        history: [newHistoryItem, ...prev.history]
      }));
    } catch (err: any) {
      setState(prev => ({ 
        ...prev, 
        status: 'error', 
        error: err.message || 'An unexpected error occurred while analyzing the plan.' 
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.input.trim()) return;
    setIsParametersVisible(false); // Auto-hide parameters on submit
    performAnalysis(state.input, state.context);
  };

  const handleSimulatePath = (path: AlternativePath) => {
    const newInput = `Alternative Path: ${path.path_name}\n\n${path.description}`;
    
    setState(prev => ({
        ...prev,
        input: newInput
    }));
    
    setIsPathPanelOpen(false);
    performAnalysis(newInput, state.context);
  };

  const resetAnalysis = () => {
    setState(prev => ({
        ...prev,
        status: 'idle',
        data: null,
        error: null,
        input: '',
        context: {
            budget: '',
            skillLevel: 'Intermediate',
            hoursPerDay: 2
        }
    }));
    setIsParametersVisible(true);
    setIsPathPanelOpen(false);
  };

  const restoreHistory = (item: HistoryItem) => {
    setState(prev => ({
      ...prev,
      status: 'complete',
      input: item.input,
      context: item.context,
      data: item.data,
      isHistoryOpen: false
    }));
    setIsParametersVisible(true); // Reveal parameters to show context
    setIsPathPanelOpen(false);
  };

  const handleEdit = () => {
    // Reveal parameters
    setIsParametersVisible(true);
    
    // Trigger visual cue on sidebar
    setIsSidebarGlowing(true);
    setTimeout(() => setIsSidebarGlowing(false), 1500);

    // Scroll to input on mobile
    if (window.innerWidth < 768) {
       window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // Focus input on desktop
    setTimeout(() => {
        inputRef.current?.focus();
    }, 300);
  };

  const formatDate = (ts: number) => {
    return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const showSidebar = state.status !== 'idle';

  return (
    <div className="min-h-screen text-gray-100 font-sans selection:bg-purple-500/30 flex flex-col">
      
      {/* Navigation / Header */}
      <nav className="fixed top-0 w-full z-40 border-b border-white/5 bg-[#050505]/90 backdrop-blur-md">
        <div className="w-full px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={resetAnalysis}>
            <div className="w-8 h-8 rounded bg-gradient-to-tr from-purple-600 to-blue-600 flex items-center justify-center">
                <Sparkles size={16} className="text-white" />
            </div>
            <h1 className="font-mono font-bold text-lg tracking-tight hidden md:block">Reality Check AI</h1>
          </div>
          
          <div className="flex items-center gap-3">
             {state.history.length > 0 && (
                <button 
                  onClick={() => setState(prev => ({ ...prev, isHistoryOpen: true }))}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <Clock size={16} />
                  History
                </button>
             )}

             {state.status !== 'idle' && (
                <button onClick={resetAnalysis} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-black hover:bg-gray-200 transition-colors">
                    <RotateCcw size={14}/> 
                    New Audit
                </button>
             )}
          </div>
        </div>
      </nav>

      {/* Main Layout - Flex Container */}
      <div className="flex-1 flex flex-col md:flex-row pt-16 h-[calc(100vh-64px)] overflow-hidden">
        
        {/* Left Panel (Input Sidebar) */}
        <div className={`
            transition-all duration-500 ease-in-out
            ${showSidebar ? 'w-full md:w-[400px]' : 'w-full'}
            ${showSidebar ? 'h-auto md:h-full overflow-y-auto md:overflow-hidden' : 'flex items-center justify-center p-4'}
            bg-[#050505] relative z-10
        `}>
             <InputSection 
                inputRef={inputRef}
                input={state.input}
                context={state.context}
                status={state.status}
                onInputChange={(val) => setState(prev => ({ ...prev, input: val }))}
                onContextChange={(ctx) => setState(prev => ({ ...prev, context: ctx }))}
                onSubmit={handleSubmit}
                isSidebar={showSidebar}
                isGlowing={isSidebarGlowing}
                isParametersVisible={isParametersVisible}
                onToggleParameters={() => setIsParametersVisible(!isParametersVisible)}
             />
        </div>

        {/* Right Panel (Results) */}
        {showSidebar && (
            <div className="flex-1 overflow-y-auto bg-black/20 relative">
                <div className="max-w-4xl mx-auto p-4 md:p-8">
                    
                    {state.status === 'analyzing' && !state.data && (
                        <div className="flex flex-col items-center justify-center h-full min-h-[50vh]">
                            <Loader2 size={48} className="text-purple-500 animate-spin mb-6" />
                            <h3 className="text-xl font-bold text-white mb-2">Analyzing Constraints...</h3>
                            <p className="text-gray-400 animate-pulse">Checking feasibility against known benchmarks</p>
                        </div>
                    )}

                    {state.status === 'error' && (
                        <div className="glass-panel border-red-500/30 p-8 rounded-2xl flex flex-col items-center text-center mt-10">
                            <AlertOctagon size={48} className="text-red-500 mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">Analysis Failed</h3>
                            <p className="text-red-300 mb-6">{state.error}</p>
                            <button 
                                onClick={() => setState(prev => ({...prev, status: 'idle', error: null}))}
                                className="px-6 py-2 border border-white/20 hover:bg-white/10 rounded-lg transition-colors"
                            >
                                Reset System
                            </button>
                        </div>
                    )}

                    {state.data && (
                         <div className={state.status === 'analyzing' ? 'opacity-50 pointer-events-none filter blur-sm transition-all' : 'animate-fade-in'}>
                            <ReportCard 
                                data={state.data} 
                                onOpenPaths={() => setIsPathPanelOpen(true)}
                                onEdit={handleEdit}
                            />
                         </div>
                    )}
                </div>
            </div>
        )}

      </div>

      {/* Decision Path Panel (Slide Over) */}
      {state.data && (
          <DecisionPathPanel 
            isOpen={isPathPanelOpen}
            onClose={() => setIsPathPanelOpen(false)}
            paths={state.data.alternative_paths}
            onSimulatePath={handleSimulatePath}
          />
      )}

      {/* History Modal Overlay */}
      {state.isHistoryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="w-full max-w-md bg-[#0a0a0f] border border-glass-border rounded-2xl shadow-2xl max-h-[80vh] flex flex-col">
                <div className="flex items-center justify-between p-4 border-b border-white/5">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                        <Clock size={20} className="text-purple-400"/>
                        Audit History
                    </h3>
                    <button 
                        onClick={() => setState(prev => ({ ...prev, isHistoryOpen: false }))}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>
                <div className="overflow-y-auto p-4 space-y-3">
                    {state.history.map((item) => (
                        <button 
                            key={item.id}
                            onClick={() => restoreHistory(item)}
                            className="w-full text-left p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all group"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className={`text-xs font-bold px-2 py-0.5 rounded border 
                                    ${item.data.reality_score < 50 ? 'border-red-500/30 text-red-400 bg-red-500/10' : 
                                      item.data.reality_score < 70 ? 'border-yellow-500/30 text-yellow-400 bg-yellow-500/10' : 
                                      'border-green-500/30 text-green-400 bg-green-500/10'}`}>
                                    Score: {item.data.reality_score}
                                </span>
                                <span className="text-xs text-gray-500">{formatDate(item.timestamp)}</span>
                            </div>
                            <p className="text-sm text-gray-300 line-clamp-2">{item.input}</p>
                            <div className="mt-2 text-xs text-gray-500 flex items-center gap-1 group-hover:text-blue-400 transition-colors">
                                Restore this audit <ChevronRight size={12} />
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
      )}

    </div>
  );
};

export default App;