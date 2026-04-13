import React, { useState, useRef, useEffect } from 'react';
import { AppState, AlternativePath, UserContext, HistoryItem } from './types';
import { analyzePlan } from './services/geminiService';
import ReportCard from './components/ReportCard';
import DecisionPathPanel from './components/DecisionPathPanel';
import InputSection from './components/InputSection';
import Logo from './components/Logo';
import { Loader2, AlertOctagon, RotateCcw, Clock, X, ChevronRight, SlidersHorizontal, Share2, Check, ShieldCheck } from 'lucide-react';
import LZString from 'lz-string';
import { motion, AnimatePresence } from 'motion/react';

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
    setIsInputCollapsed(false);
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
    setIsInputCollapsed(true);
  };

  const handleEdit = () => {
    if (isInputCollapsed) {
        setIsInputCollapsed(false);
        setIsParametersVisible(true);
        setIsSidebarGlowing(true);
        setTimeout(() => setIsSidebarGlowing(false), 1500);
        if (window.innerWidth < 768) {
           window.scrollTo({ top: 0, behavior: 'smooth' });
        }
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
    <div className="min-h-screen text-slate-900 font-sans selection:bg-sky-500/30 flex flex-col overflow-hidden relative">
      
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Navigation / Header */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full z-50 border-b border-slate-200 bg-white/80 backdrop-blur-xl h-16"
      >
        <div className="w-full px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={resetAnalysis}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow-[0_0_20px_rgba(56,189,248,0.2)] border border-sky-200 group-hover:scale-110 transition-transform">
                <Logo size={22} className="text-white" />
            </div>
            <h1 className="font-display font-bold text-xl tracking-tight hidden md:flex items-center gap-1 text-slate-900">
              Reality<span className="text-sky-600">Check</span><span className="text-slate-500 text-sm ml-0.5">.ai</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
             <AnimatePresence>
               {state.status !== 'idle' && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex items-center gap-2"
                  >
                    <button 
                      onClick={handleEdit}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all uppercase tracking-wider
                         ${!isInputCollapsed 
                            ? 'bg-sky-50 text-sky-600 border border-sky-200' 
                            : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
                         }`}
                    >
                      <SlidersHorizontal size={14} />
                      <span className="hidden sm:inline">Parameters</span>
                    </button>

                    {state.history.length > 0 && (
                      <button 
                        onClick={() => setState(prev => ({ ...prev, isHistoryOpen: true }))}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors uppercase tracking-wider"
                      >
                        <Clock size={16} />
                        <span className="hidden sm:inline">History</span>
                      </button>
                    )}

                    {state.data && (
                      <button 
                        onClick={handleShare}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold text-sky-600 hover:text-sky-700 hover:bg-sky-50 transition-colors uppercase tracking-wider border border-sky-200"
                      >
                        {isCopied ? <Check size={14} /> : <Share2 size={14} />}
                        <span className="hidden sm:inline">{isCopied ? 'Copied' : 'Share'}</span>
                      </button>
                    )}

                    <button onClick={resetAnalysis} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors uppercase tracking-wider shadow-lg shadow-slate-200">
                        <RotateCcw size={14}/> 
                        <span className="hidden sm:inline">New Audit</span>
                    </button>
                  </motion.div>
               )}
             </AnimatePresence>
          </div>
        </div>
      </motion.nav>

      {/* Main Layout */}
      <div className="flex-1 flex flex-col md:flex-row pt-16 h-screen overflow-hidden relative z-10">
        
        {/* Left Panel (Input Sidebar) */}
        <motion.div 
          layout
          className={`
            relative z-30 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
            bg-white/60 backdrop-blur-md border-r border-slate-200 flex flex-col
            ${showSidebar 
                ? (isInputCollapsed ? 'w-full md:w-[80px]' : 'w-full md:w-[700px]') 
                : 'w-full'
            }
            ${showSidebar ? 'h-[60px] md:h-full' : 'h-full'}
            overflow-hidden
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
        </motion.div>

        {/* Right Panel (Results) */}
        <AnimatePresence mode="wait">
          {showSidebar && (
              <motion.div 
                key="results"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className={`flex-1 overflow-y-auto bg-slate-50/40 relative transition-all duration-500 scrollbar-hide`}
              >
                  <div className={`mx-auto p-4 md:p-12 pb-32 transition-all duration-500 ${isInputCollapsed ? 'max-w-[1600px]' : 'max-w-5xl'}`}>
                      
                      {state.status === 'analyzing' && !state.data && (
                          <div className="flex flex-col items-center justify-center h-[70vh]">
                              <div className="relative">
                                <Loader2 size={64} className="text-sky-500 animate-spin mb-8" />
                                <div className="absolute inset-0 blur-xl bg-sky-500/20 animate-pulse"></div>
                              </div>
                              <h3 className="text-2xl font-display font-bold text-slate-900 mb-2 tracking-widest uppercase">Initializing Audit</h3>
                              <p className="text-slate-500 animate-pulse text-sm font-mono">Synthesizing constraints and market benchmarks...</p>
                              
                              <div className="mt-12 w-64 h-1 bg-slate-200 rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ x: '-100%' }}
                                  animate={{ x: '100%' }}
                                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                                  className="w-full h-full bg-gradient-to-r from-transparent via-sky-500 to-transparent"
                                />
                              </div>
                          </div>
                      )}

                      {state.status === 'error' && (
                          <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="glass-panel p-12 rounded-2xl flex flex-col items-center text-center mt-20 border-red-200"
                          >
                              <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-6 border border-red-100">
                                <AlertOctagon size={40} className="text-red-500" />
                              </div>
                              <h3 className="text-2xl font-display font-bold text-slate-900 mb-4 uppercase tracking-wider">System Breach</h3>
                              <p className="text-red-600 mb-8 font-mono text-sm max-w-md">{state.error}</p>
                              <button 
                                  onClick={() => setState(prev => ({...prev, status: 'idle', error: null}))}
                                  className="px-8 py-3 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 rounded-xl transition-all uppercase text-xs font-bold tracking-widest"
                              >
                                  Reboot Analysis
                              </button>
                          </motion.div>
                      )}

                      {state.data && (
                           <motion.div 
                            layout
                            className={state.status === 'analyzing' ? 'opacity-50 pointer-events-none filter blur-sm transition-all' : ''}
                           >
                              <ReportCard 
                                  data={state.data} 
                                  onOpenPaths={() => setIsPathPanelOpen(true)}
                                  onEdit={handleEdit}
                              />
                           </motion.div>
                      )}
                  </div>
              </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Decision Path Panel */}
      <AnimatePresence>
        {isPathPanelOpen && (
          <DecisionPathPanel 
            isOpen={isPathPanelOpen}
            onClose={() => setIsPathPanelOpen(false)}
            paths={state.data?.alternative_paths || []}
            onSimulatePath={handleSimulatePath}
          />
        )}
      </AnimatePresence>

      {/* History Modal */}
      <AnimatePresence>
        {state.isHistoryOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-white/80 backdrop-blur-md p-4"
          >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="w-full max-w-lg glass-panel rounded-2xl shadow-2xl max-h-[85vh] flex flex-col bg-white"
              >
                  <div className="flex items-center justify-between p-6 border-b border-slate-100">
                      <h3 className="font-display font-bold text-xl flex items-center gap-3 text-slate-900">
                          <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center">
                            <Clock size={18} className="text-sky-600"/>
                          </div>
                          Audit Archives
                      </h3>
                      <button 
                          onClick={() => setState(prev => ({ ...prev, isHistoryOpen: false }))}
                          className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
                      >
                          <X size={20} />
                      </button>
                  </div>
                  <div className="overflow-y-auto p-6 space-y-4 scrollbar-hide">
                      {state.history.map((item) => (
                          <button 
                              key={item.id}
                              onClick={() => restoreHistory(item)}
                              className="w-full text-left p-5 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all group rounded-xl relative overflow-hidden"
                          >
                              <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center gap-2">
                                    <ShieldCheck size={14} className={item.data.reality_score > 70 ? 'text-green-600' : 'text-orange-600'} />
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider
                                        ${item.data.reality_score < 50 ? 'text-red-700 bg-red-100' : 
                                          item.data.reality_score < 70 ? 'text-yellow-700 bg-yellow-100' : 
                                          'text-green-700 bg-green-100'}`}>
                                        Score: {item.data.reality_score}
                                    </span>
                                  </div>
                                  <span className="text-xs text-slate-500 font-mono">{formatDate(item.timestamp)}</span>
                              </div>
                              <p className="text-base text-slate-800 line-clamp-2 font-sans mb-3">{item.input}</p>
                              <div className="text-[10px] text-slate-500 flex items-center gap-1 group-hover:text-sky-600 transition-colors font-bold uppercase tracking-widest">
                                  Restore Session <ChevronRight size={12} />
                              </div>
                          </button>
                      ))}
                  </div>
              </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default App;