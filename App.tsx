import React, { useState, useRef, useEffect } from 'react';
import { AppState, AlternativePath, UserContext, HistoryItem } from './types';
import { analyzePlan } from './services/geminiService';
import ReportCard from './components/ReportCard';
import DecisionPathPanel from './components/DecisionPathPanel';
import InputSection from './components/InputSection';
import Logo from './components/Logo';
import { Loader2, AlertOctagon, RotateCcw, Clock, X, ChevronRight, SlidersHorizontal, Share2, Check } from 'lucide-react';
import LZString from 'lz-string';

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
  const [isInputCollapsed, setIsInputCollapsed] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      try {
        const decompressed = LZString.decompressFromEncodedURIComponent(hash);
        if (decompressed) {
          const parsed = JSON.parse(decompressed);
          if (parsed && parsed.input && parsed.context && parsed.data) {
            setState(prev => ({
              ...prev,
              status: 'complete',
              input: parsed.input,
              context: parsed.context,
              data: parsed.data
            }));
            setIsInputCollapsed(true);
          }
        }
      } catch (err) {
        console.error('Failed to parse shared report:', err);
      }
    }
  }, []);

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
      
      // Collapse input sidebar on success for "slide back" effect
      setIsInputCollapsed(true);
      
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
    performAnalysis(state.input, state.context);
  };

  const handleSimulatePath = (path: AlternativePath) => {
    const newInput = `Alternative Path: ${path.path_name}\n\n${path.description}`;
    
    setState(prev => ({
        ...prev,
        input: newInput
    }));
    
    setIsPathPanelOpen(false);
    setIsInputCollapsed(false); // Re-open input for context
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
    setIsInputCollapsed(false);
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
    setIsParametersVisible(true); 
    setIsPathPanelOpen(false);
    setIsInputCollapsed(true); // Keep result focused
  };

  const handleEdit = () => {
    if (isInputCollapsed) {
        setIsInputCollapsed(false);
        setIsParametersVisible(true);
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
    } else {
        setIsInputCollapsed(true);
    }
  };

  const handleShare = async () => {
    if (!state.data) return;
    try {
      const shareData = {
        input: state.input,
        context: state.context,
        data: state.data
      };
      const compressed = LZString.compressToEncodedURIComponent(JSON.stringify(shareData));
      const url = `${window.location.origin}${window.location.pathname}#${compressed}`;
      await navigator.clipboard.writeText(url);
      window.location.hash = compressed;
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  const formatDate = (ts: number) => {
    return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const showSidebar = state.status !== 'idle';

  return (
    <div className="min-h-screen text-gray-100 font-sans selection:bg-cyan-500/30 flex flex-col overflow-hidden">
      
      {/* Navigation / Header */}
      <nav className="fixed top-0 w-full z-40 border-b border-white/5 bg-[#050505]/90 backdrop-blur-md h-16">
        <div className="w-full px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={resetAnalysis}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)] border border-white/20">
                <Logo size={20} className="text-white" />
            </div>
            <h1 className="font-mono font-bold text-xl tracking-tight hidden md:flex items-center gap-1">
              Reality<span className="text-cyan-400">Check</span><span className="text-gray-500 text-sm ml-0.5">.ai</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
             
             {/* Parameters Toggle (Moved here) */}
             {state.status !== 'idle' && (
                <button 
                  onClick={handleEdit}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-sm text-xs font-bold transition-all uppercase tracking-wider
                     ${!isInputCollapsed 
                        ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' 
                        : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                     }`}
                >
                  <SlidersHorizontal size={14} />
                  Parameters
                </button>
             )}

             {state.history.length > 0 && (
                <button 
                  onClick={() => setState(prev => ({ ...prev, isHistoryOpen: true }))}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-sm text-xs font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-colors uppercase tracking-wider"
                >
                  <Clock size={16} />
                  History
                </button>
             )}

             {state.data && (
                <button 
                  onClick={handleShare}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-sm text-xs font-bold text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 transition-colors uppercase tracking-wider border border-cyan-500/30"
                >
                  {isCopied ? <Check size={14} /> : <Share2 size={14} />}
                  {isCopied ? 'Copied URL' : 'Share Report'}
                </button>
             )}

             {state.status !== 'idle' && (
                <button onClick={resetAnalysis} className="flex items-center gap-2 px-3 py-1.5 rounded-sm text-xs font-bold bg-white text-black hover:bg-gray-200 transition-colors uppercase tracking-wider">
                    <RotateCcw size={14}/> 
                    New Audit
                </button>
             )}
          </div>
        </div>
      </nav>

      {/* Main Layout - Flex Container */}
      <div className="flex-1 flex flex-col md:flex-row pt-16 h-screen overflow-hidden">
        
        {/* Left Panel (Input Sidebar) */}
        <div className={`
            relative z-30 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
            bg-[#050505] border-r border-white/5 flex flex-col
            ${showSidebar 
                ? (isInputCollapsed ? 'w-full md:w-[60px]' : 'w-full md:w-[700px]') 
                : 'w-full'
            }
            ${showSidebar ? 'h-[60px] md:h-full' : 'h-full'}
            ${isInputCollapsed ? 'overflow-hidden' : 'overflow-hidden'}
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
                isCollapsed={isInputCollapsed}
                onToggleCollapse={() => setIsInputCollapsed(!isInputCollapsed)}
             />
        </div>

        {/* Right Panel (Results) */}
        {showSidebar && (
            <div className={`flex-1 overflow-y-auto bg-black/20 relative transition-all duration-500`}>
                <div className={`mx-auto p-4 md:p-12 pb-32 transition-all duration-500 ${isInputCollapsed ? 'max-w-[1600px]' : 'max-w-5xl'}`}>
                    
                    {state.status === 'analyzing' && !state.data && (
                        <div className="flex flex-col items-center justify-center h-[60vh] animate-fade-in">
                            <Loader2 size={48} className="text-cyan-500 animate-spin mb-6" />
                            <h3 className="text-xl font-bold text-white mb-2 font-mono uppercase tracking-widest">Analyzing Constraints</h3>
                            <p className="text-gray-400 animate-pulse text-sm">Checking feasibility against known benchmarks...</p>
                        </div>
                    )}

                    {state.status === 'error' && (
                        <div className="border border-red-500/30 bg-red-500/5 p-8 rounded-none flex flex-col items-center text-center mt-20">
                            <AlertOctagon size={48} className="text-red-500 mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2 font-mono uppercase">Analysis Failed</h3>
                            <p className="text-red-300 mb-6 font-mono text-sm">{state.error}</p>
                            <button 
                                onClick={() => setState(prev => ({...prev, status: 'idle', error: null}))}
                                className="px-6 py-2 border border-white/20 hover:bg-white/10 rounded-none transition-colors uppercase text-sm font-bold"
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
            <div className="w-full max-w-md bg-[#0a0a0f] border border-glass-border rounded-lg shadow-2xl max-h-[80vh] flex flex-col">
                <div className="flex items-center justify-between p-4 border-b border-white/5">
                    <h3 className="font-bold text-lg flex items-center gap-2 font-mono">
                        <Clock size={20} className="text-cyan-400"/>
                        HISTORY
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
                            className="w-full text-left p-4 bg-white/5 hover:bg-white/10 border border-white/5 transition-all group rounded-sm"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className={`text-[10px] font-bold px-2 py-0.5 border uppercase tracking-wider
                                    ${item.data.reality_score < 50 ? 'border-red-500/30 text-red-400 bg-red-500/10' : 
                                      item.data.reality_score < 70 ? 'border-yellow-500/30 text-yellow-400 bg-yellow-500/10' : 
                                      'border-green-500/30 text-green-400 bg-green-500/10'}`}>
                                    Score: {item.data.reality_score}
                                </span>
                                <span className="text-xs text-gray-500 font-mono">{formatDate(item.timestamp)}</span>
                            </div>
                            <p className="text-sm text-gray-300 line-clamp-2 font-mono">{item.input}</p>
                            <div className="mt-2 text-xs text-gray-500 flex items-center gap-1 group-hover:text-cyan-400 transition-colors font-mono">
                                Restore <ChevronRight size={12} />
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