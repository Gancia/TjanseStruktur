import React, { useRef } from 'react';
import { 
  Users, History, HelpCircle, Printer, Settings, Shuffle, Loader2, Plus,
  CheckCircle2, AlertCircle, Info, Layout
} from 'lucide-react';
import { useDukseLogic } from './hooks/useDukseLogic';
import { THEME_COLORS, AVAILABLE_ICONS, ICONS_PER_PAGE } from './constants';
import VisualEffects from './components/VisualEffects';
import { HelpModal, HistoryModal, AddTaskModal, WarningsModal } from './components/Modals';
import TaskCard from './components/TaskCard';
import Sidebar from './components/Sidebar';

const App = () => {
  const logic = useDukseLogic();
  const fileInputRef = useRef(null);

  if (logic.loading) {
    return (
      <div className="flex h-screen items-center justify-center text-slate-500 animate-spin">
        <Loader2 size={48} />
      </div>
    );
  }

  const c = THEME_COLORS[logic.theme] || THEME_COLORS.ocean;
  const roundClass = logic.useSoftCorners ? 'rounded-3xl' : 'rounded-none';
  const buttonRoundClass = logic.useSoftCorners ? 'rounded-xl' : 'rounded-none';

  const exportData = () => {
    const data = { 
      students: logic.students, tasks: logic.tasks, assignments: logic.assignments, 
      history: logic.history, lockedSlots: logic.lockedSlots, showWeekOnPrint: logic.showWeekOnPrint, 
      theme: logic.theme, highContrast: logic.highContrast, useSoftCorners: logic.useSoftCorners, 
      showPattern: logic.showPattern, appTitle: logic.appTitle, useAnimation: logic.useAnimation, 
      animationType: logic.animationType, autoAllowDuplicates: logic.autoAllowDuplicates, 
      weekNumber: logic.weekNumber, pairedStudents: logic.pairedStudents, excludedPairs: logic.excludedPairs 
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `tjansestruktur-backup.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        logic.setStudents((data.students || []).map(s => s.trim()));
        logic.setTasks(data.tasks || []);
        logic.setAssignments(data.assignments || {});
        logic.setHistory(data.history || {});
        logic.setLockedSlots(data.lockedSlots || {});
        logic.setAppTitle(data.appTitle || 'Tjansestruktur');
        logic.setTheme(data.theme || 'ocean');
        logic.setPairedStudents(data.pairedStudents || []);
        logic.setExcludedPairs(data.excludedPairs || []);
        logic.saveToLocalStorage(data);
        logic.showToast("Data genoprettet!");
      } catch (err) { logic.showToast("Fejl ved indlæsning.", "error"); }
    };
    reader.readAsText(file);
  };

  const renderIcon = (iconId, size = 32) => {
    const iconObj = AVAILABLE_ICONS.find(i => i.id === iconId);
    const IconComp = iconObj ? iconObj.icon : Layout;
    return <IconComp size={size} />;
  };

  return (
    <div className={`min-h-screen p-4 md:p-8 font-sans transition-colors duration-500 ${logic.theme === 'night' ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'} ${logic.showPattern ? 'bg-dot-pattern' : ''} ${logic.activeEffect === 'space' ? 'bg-slate-950 overflow-hidden' : ''}`}>
      
      <VisualEffects 
        activeEffect={logic.activeEffect} 
        countdown={logic.countdown} 
        spookyText={logic.spookyText}
      />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center mb-8 gap-4 no-print">
        <div>
          <h1 className={`text-3xl font-bold ${c.text} flex items-center gap-3`}>
            <Users className={c.text} /> {logic.appTitle}
          </h1>
          <p className="text-slate-500 italic text-sm">Visuel struktur & støtte</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {logic.assignmentWarnings.length > 0 && (
            <button onClick={() => logic.setShowWarningsModal(true)} className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-xl text-[10px] font-black uppercase border border-amber-200 animate-soft-fade shadow-sm hover:bg-amber-100 transition-all">
              <Info size={14} /> OBS ({logic.assignmentWarnings.length})
            </button>
          )}
          <button onClick={() => logic.setShowHistoryModal(true)} className={`flex items-center gap-2 px-4 py-2 bg-white ${c.text} border ${c.border} ${buttonRoundClass} font-bold hover:bg-slate-50 transition-all shadow-sm`}>
            <History size={20} /> Sidste uge
          </button>
          <button onClick={() => logic.setShowHelp(true)} className={`flex items-center gap-2 px-4 py-2 bg-white text-slate-500 border border-slate-200 ${buttonRoundClass} font-medium hover:bg-slate-50 transition-all shadow-sm`}>
            <HelpCircle size={20} /> Vejledning
          </button>
          <button onClick={() => window.print()} className={`flex items-center gap-2 px-4 py-2 ${c.primary} text-white ${buttonRoundClass} font-medium ${c.hover} shadow-md transition-all active:scale-95`}>
            <Printer size={20} /> Print
          </button>
          <button onClick={() => logic.setIsEditMode(!logic.isEditMode)} className={`flex items-center gap-2 px-4 py-2 transition-all shadow-md ${logic.isEditMode ? `${c.primary} text-white` : `bg-white ${c.text} border ${c.border} hover:bg-slate-50`} ${buttonRoundClass} font-medium`}>
            <Settings size={20} /> {logic.isEditMode ? 'Færdig' : 'Indstillinger'}
          </button>
          <button onClick={logic.randomize} disabled={logic.isShuffling} className={`flex items-center gap-2 px-4 py-2 ${buttonRoundClass} font-medium shadow-md transition-all active:scale-95 ${logic.isShuffling ? 'bg-slate-400' : 'bg-emerald-500 hover:bg-emerald-600'} text-white`}>
            {logic.isShuffling ? <Loader2 className="animate-spin" size={20} /> : <Shuffle size={20} />} Bland elever
          </button>
        </div>
      </div>

      {logic.showWeekOnPrint && logic.weekNumber && (
        <div className="hidden print:block text-center mb-8">
          <h2 className={`text-4xl font-black ${c.text} uppercase tracking-widest border-b-4 ${c.border} pb-4`}>{logic.appTitle} - Uge {logic.weekNumber}</h2>
        </div>
      )}

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6 print-grid">
          {logic.tasks.map((task) => (
            <TaskCard 
              key={task.id} 
              task={task} 
              {...logic} 
              c={c} 
              roundClass={roundClass} 
              buttonRoundClass={buttonRoundClass}
              renderIcon={renderIcon}
              AVAILABLE_ICONS={AVAILABLE_ICONS}
              ICONS_PER_PAGE={ICONS_PER_PAGE}
            />
          ))}
          {logic.isEditMode && (
            <div onClick={() => logic.setIsAddTaskModalOpen(true)} className={`border-4 border-dashed ${c.border} ${roundClass} p-8 flex flex-col items-center justify-center ${c.light} opacity-60 no-print hover:opacity-100 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]`}>
              <Plus size={48} className={c.text} />
              <span className={`mt-2 font-black uppercase tracking-widest ${c.text}`}>Tilføj ny tjans</span>
            </div>
          )}
        </div>

        <Sidebar 
          {...logic} 
          c={c} 
          roundClass={roundClass} 
          buttonRoundClass={buttonRoundClass}
          exportData={exportData}
          importData={importData}
          fileInputRef={fileInputRef}
          THEME_COLORS={THEME_COLORS}
        />
      </div>

      <HelpModal showHelp={logic.showHelp} setShowHelp={logic.setShowHelp} c={c} roundClass={roundClass} buttonRoundClass={buttonRoundClass} />
      <HistoryModal {...logic} c={c} roundClass={roundClass} buttonRoundClass={buttonRoundClass} renderIcon={renderIcon} />
      <AddTaskModal {...logic} c={c} roundClass={roundClass} buttonRoundClass={buttonRoundClass} />
      <WarningsModal {...logic} c={c} roundClass={roundClass} buttonRoundClass={buttonRoundClass} />

      {logic.toast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] no-print animate-soft-fade">
          <div className={`px-6 py-3 rounded-2xl shadow-2xl border-2 flex items-center gap-3 ${logic.toast.type === 'error' ? 'bg-red-50 border-red-200 text-red-700' : 'bg-white border-slate-200 text-slate-700'}`}>
            {logic.toast.type === 'error' ? <AlertCircle size={20} /> : <CheckCircle2 className={c.text} size={20} />}
            <span className="font-bold text-sm">{logic.toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
