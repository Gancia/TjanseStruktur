import React, { useState, useEffect, useRef } from 'react';
import { 
  Wind, Eraser, Droplets, Trash2, BookOpen, Apple, Users, Shuffle, Plus, X, 
  Settings, Layout, ArrowRightLeft, Printer, Loader2, Star, Lightbulb, 
  Lock, Unlock, Download, Upload, Users2, Laptop, Sun, Dumbbell, Mic, 
  Bell, Key, Archive, Music, Coffee, Smile, HelpCircle, Calendar, Palette, Eye,
  Layers, Sun as SunIcon, CheckCircle2, UserCircle2, Type, Info, MousePointer2, Save,
  Zap, Loader, Sparkles, Heart
} from 'lucide-react';

const LOCAL_STORAGE_KEY = 'duksetavle-state-v13';

const THEME_COLORS = {
  nature: { primary: 'bg-emerald-600', hover: 'hover:bg-emerald-700', text: 'text-emerald-600', light: 'bg-emerald-50', border: 'border-emerald-200', hex: '#10b981', lightHex: '#f0fdf4' },
  ocean: { primary: 'bg-blue-600', hover: 'hover:bg-blue-700', text: 'text-blue-600', light: 'bg-blue-50', border: 'border-blue-200', hex: '#2563eb', lightHex: '#eff6ff' },
  warm: { primary: 'bg-orange-600', hover: 'hover:bg-orange-700', text: 'text-orange-600', light: 'bg-orange-50', border: 'border-orange-200', hex: '#ea580c', lightHex: '#fff7ed' },
  night: { primary: 'bg-slate-700', hover: 'hover:bg-slate-800', text: 'text-slate-700', light: 'bg-slate-100', border: 'border-slate-300', hex: '#334155', lightHex: '#f1f5f9' },
  harmony: { primary: 'bg-purple-600', hover: 'hover:bg-purple-700', text: 'text-purple-600', light: 'bg-purple-50', border: 'border-purple-200', hex: '#9333ea', lightHex: '#faf5ff' }
};

const getISOWeek = () => {
  const date = new Date();
  const dayNum = (date.getDay() + 6) % 7;
  date.setDate(date.getDate() - dayNum + 3);
  const firstThursday = date.getTime();
  date.setMonth(0, 1);
  if (date.getDay() !== 4) date.setMonth(0, 1 + ((4 - date.getDay()) + 7) % 7);
  return 1 + Math.ceil((firstThursday - date) / 604800000);
};

const AVAILABLE_ICONS = [
  { id: 'Wind', icon: Wind, label: 'Feje' }, { id: 'Eraser', icon: Eraser, label: 'Aftørring' },
  { id: 'Droplets', icon: Droplets, label: 'Vand' }, { id: 'Trash2', icon: Trash2, label: 'Skrald' },
  { id: 'BookOpen', icon: BookOpen, label: 'Bøger' }, { id: 'Apple', icon: Apple, label: 'Mad/Frugt' },
  { id: 'Laptop', icon: Laptop, label: 'IT/PC' }, { id: 'Sun', icon: Sun, label: 'Ude' },
  { id: 'Dumbbell', icon: Dumbbell, label: 'Idræt' }, { id: 'Mic', icon: Mic, label: 'Samling' },
  { id: 'Bell', icon: Bell, label: 'Klokke' }, { id: 'Key', icon: Key, label: 'Nøgler' },
  { id: 'Archive', icon: Archive, label: 'Orden' }, { id: 'Music', icon: Music, label: 'Musik' },
  { id: 'Coffee', icon: Coffee, label: 'Køkken' }, { id: 'Smile', icon: Smile, label: 'Trivsel' },
  { id: 'Layout', icon: Layout, label: 'Andet' }
];

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isShuffling, setIsShuffling] = useState(false);
  const [students, setStudents] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [assignments, setAssignments] = useState({});
  const [lockedSlots, setLockedSlots] = useState({}); 
  const [history, setHistory] = useState({}); 
  const [isEditMode, setIsEditMode] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  
  const [appTitle, setAppTitle] = useState('Duksetavle');
  const [useAnimation, setUseAnimation] = useState(true);
  const [animationType, setAnimationType] = useState('spinner'); 
  const [autoAllowDuplicates, setAutoAllowDuplicates] = useState(false);
  const [theme, setTheme] = useState('ocean');
  const [highContrast, setHighContrast] = useState(false);
  const [useSoftCorners, setUseSoftCorners] = useState(true);
  const [showPattern, setShowPattern] = useState(false);
  const [weekNumber, setWeekNumber] = useState(getISOWeek().toString());
  const [showWeekOnPrint, setShowWeekOnPrint] = useState(true);

  const [newStudentName, setNewStudentName] = useState('');
  const [newTaskName, setNewTaskName] = useState('');
  const [iconPickerTaskId, setIconPickerTaskId] = useState(null);
  const [tempNames, setTempNames] = useState({});
  
  const fileInputRef = useRef(null);
  const c = THEME_COLORS[theme] || THEME_COLORS.ocean;

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setStudents(data.students || []);
        setTasks(data.tasks || []);
        setAssignments(data.assignments || {});
        setHistory(data.history || {});
        setLockedSlots(data.lockedSlots || {});
        setAppTitle(data.appTitle || 'Duksetavle');
        setUseAnimation(data.useAnimation !== undefined ? data.useAnimation : true);
        setAnimationType(data.animationType || 'spinner');
        setAutoAllowDuplicates(data.autoAllowDuplicates || false);
        setTheme(data.theme || 'ocean');
        setHighContrast(data.highContrast || false);
        setUseSoftCorners(data.useSoftCorners !== undefined ? data.useSoftCorners : true);
        setShowPattern(data.showPattern || false);
        setWeekNumber(data.weekNumber || getISOWeek().toString());
        setShowWeekOnPrint(data.showWeekOnPrint !== undefined ? data.showWeekOnPrint : true);
      } catch (e) { loadDefaults(); }
    } else { loadDefaults(); }
    setLoading(false);
  }, []);

  const loadDefaults = () => {
    setTasks([
      { id: '1', name: 'Feje gulv', icon: 'Wind', priority: true, isGlobal: false, role1: 'Fejer', role2: 'Samler op', goal: 'Ingen krummer under bordene' },
      { id: '2', name: 'Tørre borde af', icon: 'Eraser', priority: true, isGlobal: false, role1: 'Vasker', role2: 'Tørrer efter', goal: 'Bordene er tørre og rene' },
      { id: '3', name: 'Sætte PC i skab', icon: 'Laptop', priority: false, isGlobal: true, goal: 'Alle computere i stik' },
    ]);
    setStudents(['Sofie', 'Lukas', 'Emma', 'Noah', 'Ida', 'Victor', 'Maja', 'Oliver']);
    setAssignments({});
  };

  const saveToLocalStorage = (newData) => {
    const currentState = { students, tasks, assignments, history, lockedSlots, showWeekOnPrint, theme, highContrast, useSoftCorners, showPattern, appTitle, useAnimation, animationType, autoAllowDuplicates, weekNumber };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ ...currentState, ...newData }));
  };

  const exportData = () => {
    const data = { students, tasks, assignments, history, lockedSlots, showWeekOnPrint, theme, highContrast, useSoftCorners, showPattern, appTitle, useAnimation, animationType, autoAllowDuplicates, weekNumber };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `duksetavle-backup.json`;
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
        setStudents(data.students || []);
        setTasks(data.tasks || []);
        setAssignments(data.assignments || {});
        setHistory(data.history || {});
        setLockedSlots(data.lockedSlots || {});
        setAppTitle(data.appTitle || 'Duksetavle');
        setTheme(data.theme || 'ocean');
        setAnimationType(data.animationType || 'spinner');
        saveToLocalStorage(data);
        alert("Data genoprettet!");
      } catch (err) { alert("Fejl ved indlæsning."); }
    };
    reader.readAsText(file);
  };

  const randomize = () => {
    if (isShuffling || students.length === 0) return;
    const normalTasks = tasks.filter(t => !t.isGlobal);
    let neededCount = 0;
    normalTasks.forEach(t => {
        if (!lockedSlots[`${t.id}-0`]) neededCount++;
        if (t.priority && !lockedSlots[`${t.id}-1`]) neededCount++;
    });

    if (neededCount > students.length && !autoAllowDuplicates) {
        if (!confirm(`Der er ${neededCount} pladser, men kun ${students.length} elever. Skal elever have to tjanser?`)) return;
    }

    const performRandomize = () => {
        let pool = students.filter(s => {
            let isLocked = false;
            tasks.forEach(t => { 
              if(!t.isGlobal && lockedSlots[`${t.id}-0`] && assignments[t.id]?.[0] === s) isLocked = true; 
              if(!t.isGlobal && lockedSlots[`${t.id}-1`] && assignments[t.id]?.[1] === s) isLocked = true; 
            });
            return !isLocked;
        }).sort(() => Math.random() - 0.5);
        
        let backupPool = [...students].sort(() => Math.random() - 0.5);
        const newAssignments = { ...assignments };

        const getCandidate = (taskId, forbidden) => {
          if (pool.length === 0) {
              let idx = backupPool.findIndex(s => !forbidden.includes(s));
              return backupPool[idx === -1 ? 0 : idx];
          }
          const lastWeek = history[taskId] || [];
          let idx = pool.findIndex(s => !lastWeek.includes(s) && !forbidden.includes(s));
          if (idx === -1) idx = pool.findIndex(s => !forbidden.includes(s));
          return pool.length > 0 ? pool.splice(idx === -1 ? 0 : idx, 1)[0] : null;
        };

        tasks.forEach(task => {
          if (task.isGlobal) return;
          if (!newAssignments[task.id]) newAssignments[task.id] = [null, null];
          if (!lockedSlots[`${task.id}-0`]) newAssignments[task.id] = [getCandidate(task.id, []), newAssignments[task.id][1]];
          if (!lockedSlots[`${task.id}-1`]) {
              if (task.priority || pool.length > 0 || autoAllowDuplicates || neededCount > students.length) {
                  newAssignments[task.id] = [newAssignments[task.id][0], getCandidate(task.id, [newAssignments[task.id][0]])];
              } else { newAssignments[task.id] = [newAssignments[task.id][0], null]; }
          }
        });
        setAssignments(newAssignments);
        saveToLocalStorage({ assignments: newAssignments });
        setIsShuffling(false);
    };

    if (useAnimation) {
        setIsShuffling(true);
        const interval = setInterval(() => {
          const animationData = {};
          tasks.forEach(t => {
            if (animationType === 'classic') {
                animationData[t.id] = t.isGlobal ? [assignments[t.id]?.[0] || 'ALLE ELEVER', ''] : [
                    students[Math.floor(Math.random() * students.length)],
                    students[Math.floor(Math.random() * students.length)]
                ];
            } else {
                animationData[t.id] = ['...', '...'];
            }
          });
          setTempNames(animationData);
        }, 80);
        setTimeout(() => { clearInterval(interval); performRandomize(); }, 2000);
    } else {
        performRandomize();
    }
  };

  const handlePrint = () => {
    const newHistory = {};
    Object.keys(assignments).forEach(tid => { 
        if (!tasks.find(t => t.id === tid)?.isGlobal) {
            newHistory[tid] = (assignments[tid] || []).filter(s => s && students.includes(s)); 
        }
    });
    setHistory(newHistory);
    saveToLocalStorage({ history: newHistory });
    window.print();
  };

  const updateTask = (id, fields) => {
    const up = tasks.map(t => t.id === id ? { ...t, ...fields } : t);
    setTasks(up);
    saveToLocalStorage({ tasks: up });
  };

  const renderIcon = (iconId, size = 32) => {
    const iconObj = AVAILABLE_ICONS.find(i => i.id === iconId);
    const IconComp = iconObj ? iconObj.icon : Layout;
    return <IconComp size={size} />;
  };

  if (loading) return <div className="flex h-screen items-center justify-center text-slate-500 animate-spin"><Loader2 size={48} /></div>;

  const roundClass = useSoftCorners ? 'rounded-3xl' : 'rounded-none';
  const buttonRoundClass = useSoftCorners ? 'rounded-xl' : 'rounded-none';

  return (
    <div className={`min-h-screen p-4 md:p-8 font-sans transition-colors duration-500 ${theme === 'night' ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'} ${showPattern ? 'bg-dot-pattern' : ''}`}>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .bg-dot-pattern { background-image: radial-gradient(#cbd5e1 1px, transparent 1px); background-size: 20px 20px; }
        @media print {
            * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
            body { background-color: white !important; color: black !important; padding: 0 !important; margin: 0 !important; }
            .no-print { display: none !important; }
            .print-grid { display: grid !important; grid-template-columns: repeat(2, 1fr) !important; gap: 1rem !important; }
            .print-card { border: 2px solid #e2e8f0 !important; break-inside: avoid; background-color: white !important; }
        }
        @keyframes softFade { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
        .animate-soft-fade { animation: softFade 0.5s ease-out forwards; }
        @keyframes calmPulse { 0% { opacity: 0.4; transform: scale(0.98); } 50% { opacity: 0.8; transform: scale(1); } 100% { opacity: 0.4; transform: scale(0.98); } }
        .animate-calm-pulse { animation: calmPulse 1.5s infinite ease-in-out; }
      `}} />

      {showWeekOnPrint && weekNumber && (
          <div className="hidden print:block text-center mb-8">
              <h2 className={`text-4xl font-black ${c.text} uppercase tracking-widest border-b-4 ${c.border} pb-4`}>{appTitle} - Uge {weekNumber}</h2>
          </div>
      )}

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center mb-8 gap-4 no-print">
        <div>
          <h1 className={`text-3xl font-bold ${c.text} flex items-center gap-3`}>
            <Users className={c.text} /> {appTitle}
          </h1>
          <p className="text-slate-500 italic text-sm">Visuel struktur & støtte</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <button onClick={() => setShowHelp(true)} className={`flex items-center gap-2 px-4 py-2 bg-white text-slate-500 border border-slate-200 ${buttonRoundClass} font-medium hover:bg-slate-50 transition-all shadow-sm`}>
            <HelpCircle size={20} /> Hjælp
          </button>
          <button onClick={handlePrint} className={`flex items-center gap-2 px-4 py-2 ${c.primary} text-white ${buttonRoundClass} font-medium ${c.hover} shadow-md transition-all active:scale-95`}>
            <Printer size={20} /> Print
          </button>
          <button onClick={() => setIsEditMode(!isEditMode)} className={`flex items-center gap-2 px-4 py-2 transition-all shadow-md ${isEditMode ? `${c.primary} text-white` : `bg-white ${c.text} border ${c.border} hover:bg-slate-50`} ${buttonRoundClass} font-medium`}>
            <Settings size={20} /> {isEditMode ? 'Færdig' : 'Indstillinger'}
          </button>
          <button onClick={randomize} disabled={isShuffling} className={`flex items-center gap-2 px-4 py-2 ${buttonRoundClass} font-medium shadow-md transition-all active:scale-95 ${isShuffling ? 'bg-slate-400' : 'bg-emerald-500 hover:bg-emerald-600'} text-white`}>
            {isShuffling ? <Loader2 className="animate-spin" size={20} /> : <Shuffle size={20} />} Bland elever
          </button>
        </div>
      </div>

      {showHelp && (
          <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center z-50 p-4 no-print backdrop-blur-sm">
              <div className={`bg-white ${roundClass} shadow-2xl max-w-4xl w-full overflow-hidden text-slate-800`}>
                  <div className={`${c.primary} p-6 flex justify-between items-center text-white`}>
                      <h2 className="text-xl font-bold flex items-center gap-2"><Info /> Vejledning & Overvejelser</h2>
                      <button onClick={() => setShowHelp(false)} className="hover:bg-white/20 p-1 rounded-lg transition-colors"><X /></button>
                  </div>
                  <div className="p-8 space-y-8 max-h-[80vh] overflow-y-auto custom-scrollbar text-sm leading-relaxed">
                      <section className="space-y-4">
                          <h3 className="font-black text-lg flex items-center gap-2 text-slate-800 border-b-2 pb-2"><Shuffle size={20} className={c.text}/> Animationer & Arousal</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <p className="text-slate-600">Nogle elever elsker spændingen ved det flimrende navneskift, mens det for andre skaber angst. Ved at vælge en <strong>Rolig Spinner</strong> eller <strong>Puls</strong> fjerner vi det visuelle kaos, men bevarer en indikation af, at systemet arbejder.</p>
                              <div className="bg-slate-50 p-4 rounded-xl space-y-2 text-xs">
                                  <p><strong>• Flimmer:</strong> Høj arousal og spænding.</p>
                                  <p><strong>• Spinner:</strong> Neutral venten, faktuelt fokus.</p>
                                  <p><strong>• Puls:</strong> Beroligende rytme.</p>
                                  <p><strong>• Indfasning:</strong> Blid overgang.</p>
                              </div>
                          </div>
                      </section>
                      <section className="space-y-4 bg-indigo-50 p-6 rounded-2xl">
                          <h3 className="font-black text-lg flex items-center gap-2 text-indigo-800 border-b-2 pb-2 border-indigo-100"><UserCircle2 size={20}/> Social Tryghed & Roller</h3>
                          <p className="text-indigo-700">Vi har tilføjet muligheden for at definere <strong>Roller</strong> (f.eks. 'Fejer' / 'Samler op'). Dette mindsker behovet for social forhandling i øjeblikket og skaber ro i makkerskabet fra start.</p>
                      </section>
                      <button onClick={() => setShowHelp(false)} className={`w-full ${c.primary} text-white font-bold py-4 ${buttonRoundClass} hover:opacity-90 transition-all shadow-lg`}>Forstået</button>
                  </div>
              </div>
          </div>
      )}

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6 print-grid">
          {tasks.map((task) => (
            <div key={task.id} className={`${theme === 'night' ? 'bg-slate-800' : 'bg-white'} ${roundClass} shadow-sm ${highContrast ? 'border-4 border-black' : `border-2 ${task.isGlobal ? c.border : task.priority ? 'border-amber-200' : 'border-slate-100'}`} overflow-hidden flex flex-col transition-all duration-300 relative print-card`}>
              <div className={`p-4 flex items-center justify-between ${task.isGlobal ? c.light : task.priority ? 'bg-amber-50/50' : c.light} print-card-header`}>
                <div className="flex items-center gap-4">
                  <div onClick={() => isEditMode && setIconPickerTaskId(iconPickerTaskId === task.id ? null : task.id)} className={`p-3 bg-white rounded-xl ${c.text} shadow-sm print-icon ${isEditMode ? 'cursor-pointer' : ''} ${highContrast ? 'border-2 border-black' : ''}`}>
                    {renderIcon(task.icon)}
                  </div>
                  <div className="flex flex-col">
                    <h3 className={`text-xl font-bold ${theme === 'night' && !task.isGlobal && !task.priority ? 'text-slate-100' : 'text-slate-700'} leading-tight ${highContrast ? 'font-black text-black' : ''}`}>{task.name}</h3>
                    {task.goal && <span className="text-[10px] italic text-slate-400 font-medium">Mål: {task.goal}</span>}
                  </div>
                </div>
                {isEditMode && (
                  <div className="flex items-center gap-2 no-print text-slate-400">
                    <button onClick={() => updateTask(task.id, { isGlobal: !task.isGlobal })} className={`p-2 rounded-lg ${task.isGlobal ? `${c.text} ${c.light}` : 'hover:text-indigo-500'}`}><Users2 size={20} /></button>
                    <button onClick={() => updateTask(task.id, { priority: !task.priority })} className={`p-2 rounded-lg ${task.priority ? 'text-amber-500 bg-amber-100' : 'hover:text-amber-400'}`}><Star size={20} fill={task.priority ? "currentColor" : "none"} /></button>
                    <button onClick={() => { if(confirm('Slet?')) setTasks(tasks.filter(t => t.id !== task.id)); }} className="hover:text-red-500 p-1"><X size={20} /></button>
                  </div>
                )}
              </div>

              {isEditMode && (
                  <div className="px-4 py-2 bg-slate-50/50 border-b border-slate-100 grid grid-cols-2 gap-2 no-print">
                      <div className="col-span-2"><input type="text" placeholder="Succeskriterie (Mål)..." value={task.goal || ""} onChange={(e) => updateTask(task.id, {goal: e.target.value})} className="w-full text-[10px] p-1.5 border border-slate-200 rounded-md focus:outline-none" /></div>
                      {!task.isGlobal && (
                          <>
                            <input type="text" placeholder="Rolle Makker 1..." value={task.role1 || ""} onChange={(e) => updateTask(task.id, {role1: e.target.value})} className="text-[10px] p-1.5 border border-slate-200 rounded-md" />
                            <input type="text" placeholder="Rolle Makker 2..." value={task.role2 || ""} onChange={(e) => updateTask(task.id, {role2: e.target.value})} className="text-[10px] p-1.5 border border-slate-200 rounded-md" />
                          </>
                      )}
                  </div>
              )}

              {isEditMode && iconPickerTaskId === task.id && (
                <div className="p-4 bg-white border-b border-slate-100 grid grid-cols-6 gap-3 no-print max-h-48 overflow-y-auto custom-scrollbar">
                  {AVAILABLE_ICONS.map((i) => <button key={i.id} onClick={() => { updateTask(task.id, {icon: i.id}); setIconPickerTaskId(null); }} className={`p-2 rounded-lg hover:bg-indigo-50 flex items-center justify-center ${task.icon === i.id ? `${c.light} ${c.text}` : 'text-slate-400'}`}><i.icon size={20} /></button>)}
                </div>
              )}

              <div className="p-4 flex gap-4 h-full items-end">
                {task.isGlobal ? (
                    <div className="flex-1">
                        <input type="text" value={assignments[task.id]?.[0] || ""} onChange={(e) => { const up = {...assignments, [task.id]: [e.target.value, ""]}; setAssignments(up); saveToLocalStorage({assignments: up}); }} placeholder="Skriv her..." className={`w-full p-4 ${c.light} ${buttonRoundClass} border-2 border-dashed ${c.border} text-center text-xl font-black ${c.text} uppercase tracking-widest focus:outline-none no-print ${highContrast ? 'border-black border-solid' : ''}`} />
                        <div className={`hidden print-student-name p-3 border-2 border-dashed ${c.border} ${buttonRoundClass} ${c.light} text-center font-black text-2xl min-h-[50px] flex items-center justify-center ${c.text} uppercase ${highContrast ? 'border-black border-solid text-black' : ''}`}>{assignments[task.id]?.[0] || "ALLE ELEVER"}</div>
                    </div>
                ) : (
                    [0, 1].map((slot) => {
                        const s = isShuffling ? tempNames[task.id]?.[slot] : assignments[task.id]?.[slot];
                        const lock = lockedSlots[`${task.id}-${slot}`];
                        const role = slot === 0 ? task.role1 : task.role2;
                        return (
                          <div key={slot} className="flex-1 flex flex-col gap-1">
                            <div className="flex items-center justify-between no-print text-[9px] font-bold text-slate-400 uppercase tracking-widest px-1">
                              <span>{role || `Makker ${slot + 1}`}</span>
                              {isEditMode && <button onClick={() => { const k = `${task.id}-${slot}`; const nl = {...lockedSlots, [k]: !lockedSlots[k]}; setLockedSlots(nl); saveToLocalStorage({lockedSlots: nl}); }} className={`p-1 rounded-md ${lock ? `${c.text} ${c.light}` : 'text-slate-300'}`}>{lock ? <Lock size={10} /> : <Unlock size={10} />}</button>}
                            </div>
                            <div className="no-print relative">
                              <div className={`w-full p-3 ${buttonRoundClass} border-2 text-sm transition-all flex items-center justify-center min-h-[44px] ${
                                isShuffling 
                                ? (animationType === 'spinner' ? 'bg-slate-50 border-slate-200' : animationType === 'pulse' ? 'bg-indigo-50 border-indigo-200 animate-calm-pulse' : 'bg-slate-100 border-slate-200')
                                : s ? `bg-emerald-50 border-emerald-200 text-emerald-800 font-bold ${animationType === 'fade' ? 'animate-soft-fade' : ''}` 
                                : `${theme === 'night' ? 'bg-slate-700 border-slate-600' : 'bg-slate-50 border-slate-200'} border-dashed text-slate-400`
                              } ${lock ? `border-indigo-300` : ''} ${highContrast ? 'border-black border-solid' : ''}`}>
                                {isShuffling ? (
                                    animationType === 'spinner' ? <Loader2 className="animate-spin text-indigo-400" size={18} /> : 
                                    animationType === 'classic' ? <span className="text-indigo-600">{s}</span> :
                                    <Shuffle className="text-indigo-300" size={18} />
                                ) : (
                                    <select value={s || ''} onChange={(e) => { const up = {...assignments, [task.id]: assignments[task.id].map((v, i) => i === slot ? e.target.value : v)}; setAssignments(up); saveToLocalStorage({assignments: up}); }} className="bg-transparent w-full text-center appearance-none focus:outline-none cursor-pointer">
                                        <option value="">—</option>
                                        {students.sort((a,b) => a.localeCompare(b)).map(st => <option key={st} value={st}>{st}</option>)}
                                    </select>
                                )}
                              </div>
                            </div>
                            <div className={`hidden print-student-name p-3 border-2 border-slate-100 ${buttonRoundClass} bg-slate-50 text-center font-bold text-xl min-h-[50px] flex flex-col items-center justify-center text-slate-700 ${highContrast ? 'border-black border-solid font-black text-black' : ''}`}>
                                <span className="text-[10px] font-bold text-slate-400 uppercase">{role || `Makker ${slot + 1}`}</span>
                                {s || "—"}
                            </div>
                          </div>
                        );
                      })
                )}
              </div>
            </div>
          ))}
          {isEditMode && (
             <div className={`border-2 border-dashed ${c.border} ${roundClass} p-6 flex flex-col items-center justify-center ${c.light} opacity-60 no-print`}><form onSubmit={(e) => { e.preventDefault(); if (newTaskName.trim()) { const id = Date.now().toString(); const nt = [...tasks, { id, name: newTaskName.trim(), icon: 'Layout', priority: false, isGlobal: false }]; setTasks(nt); setAssignments({...assignments, [id]: [null, null]}); saveToLocalStorage({ tasks: nt }); setNewTaskName(''); } }} className="w-full max-w-xs"><div className={`flex gap-2 ${theme === 'night' ? 'bg-slate-700' : 'bg-white'} p-2 ${buttonRoundClass} shadow-sm`}><input type="text" value={newTaskName} onChange={(e) => setNewTaskName(e.target.value)} placeholder="Ny opgave..." className="flex-1 p-2 text-sm focus:outline-none bg-transparent" /><button type="submit" className={`${c.primary} text-white p-2 ${buttonRoundClass}`}><Plus size={20} /></button></div></form></div>
          )}
        </div>

        <div className="lg:col-span-1 space-y-6 no-print">
          <div className={`${theme === 'night' ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'} p-6 ${roundClass} shadow-md border-2`}>
            <h2 className={`text-lg font-black mb-4 flex items-center justify-between uppercase tracking-tight border-b-2 ${theme === 'night' ? 'border-slate-700' : 'border-slate-200'} pb-2`}>
              <div className="flex items-center gap-2"><Users size={20} className={c.text} /> Klassen</div>
              <span className={`text-xs ${c.primary} px-2 py-1 rounded-full text-white font-bold`}>{students.length}</span>
            </h2>
            <div className={`space-y-1 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar ${theme === 'night' ? 'bg-slate-900/50' : 'bg-white/50'} rounded-xl p-2 border ${theme === 'night' ? 'border-slate-700' : 'border-slate-200'}`}>
              {students.sort((a,b) => a.localeCompare(b)).map((n) => (
                <div key={n} className={`flex items-center justify-between p-2 rounded-lg hover:bg-white/10 text-sm font-bold ${theme === 'night' ? 'text-slate-300' : 'text-slate-700'}`}><span>{n}</span>{isEditMode && <button onClick={() => { const nl = students.filter(s => s !== n); setStudents(nl); saveToLocalStorage({ students: nl }); }} className="text-slate-400 hover:text-red-500"><X size={16} /></button>}</div>
              ))}
            </div>
            {isEditMode && (
              <form onSubmit={(e) => { e.preventDefault(); if (newStudentName.trim() && !students.includes(newStudentName.trim())) { const nl = [...students, newStudentName.trim()]; setStudents(nl); saveToLocalStorage({ students: nl }); setNewStudentName(''); } }} className={`mt-4 pt-4 border-t-2 ${theme === 'night' ? 'border-slate-700' : 'border-slate-200'}`}>
                <div className={`flex gap-2 ${theme === 'night' ? 'bg-slate-700' : 'bg-white'} p-1 rounded-lg border ${theme === 'night' ? 'border-slate-600' : 'border-slate-300'}`}><input type="text" placeholder="Navn..." value={newStudentName} onChange={(e) => setNewStudentName(e.target.value)} className="flex-1 bg-transparent px-3 py-2 text-sm focus:outline-none" /><button type="submit" className={`${c.primary} text-white p-2 ${buttonRoundClass}`}><Plus size={18} /></button></div>
                <div className={`mt-6 space-y-4 pt-4`}>
                    <div className="bg-white/50 p-3 rounded-xl border border-slate-200 space-y-2">
                        <h4 className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-1"><Type size={12}/> Titel</h4>
                        <input type="text" value={appTitle} onChange={(e) => {setAppTitle(e.target.value); saveToLocalStorage({appTitle: e.target.value});}} className="w-full text-xs p-2 border border-slate-200 rounded-md focus:outline-none" />
                    </div>
                    <div className="flex gap-2">{Object.entries(THEME_COLORS).map(([k, v]) => (<button key={k} onClick={() => {setTheme(k); saveToLocalStorage({theme: k});}} className={`w-6 h-6 rounded-full border-2 ${theme === k ? 'border-white scale-120 shadow-md' : 'border-transparent'} ${v.primary}`} />))}</div>
                    <div className="space-y-2 pt-2 border-t border-slate-200">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500"><input type="checkbox" id="anim" checked={useAnimation} onChange={(e) => { setUseAnimation(e.target.checked); saveToLocalStorage({ useAnimation: e.target.checked }); }} className="w-4 h-4 accent-indigo-600" /><label htmlFor="anim" className="text-[10px] uppercase">Animation</label></div>
                        {useAnimation && (
                            <div className="grid grid-cols-2 gap-1 ml-6">
                                {[
                                    {id: 'classic', icon: Zap, label: 'Flimmer'},
                                    {id: 'spinner', icon: Loader, label: 'Spinner'},
                                    {id: 'fade', icon: Sparkles, label: 'Indfase'},
                                    {id: 'pulse', icon: Heart, label: 'Puls'}
                                ].map(a => (
                                    <button key={a.id} type="button" onClick={() => {setAnimationType(a.id); saveToLocalStorage({animationType: a.id});}} className={`flex items-center gap-1 p-1.5 text-[9px] font-black uppercase border rounded-md transition-all ${animationType === a.id ? `${c.primary} text-white border-transparent` : 'bg-white text-slate-400 border-slate-200'}`}>
                                        <a.icon size={10}/> {a.label}
                                    </button>
                                ))}
                            </div>
                        )}
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500"><input type="checkbox" id="contrast" checked={highContrast} onChange={(e) => { setHighContrast(e.target.checked); saveToLocalStorage({ highContrast: e.target.checked }); }} className="w-4 h-4 accent-indigo-600" /><label htmlFor="contrast" className="text-[10px] uppercase">Kontrast</label></div>
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500"><input type="checkbox" id="dups" checked={autoAllowDuplicates} onChange={(e) => { setAutoAllowDuplicates(e.target.checked); saveToLocalStorage({ autoAllowDuplicates: e.target.checked }); }} className="w-4 h-4 accent-indigo-600" /><label htmlFor="dups" className="text-[10px] uppercase">Genbrug navne</label></div>
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500"><input type="checkbox" id="corners" checked={useSoftCorners} onChange={(e) => { setUseSoftCorners(e.target.checked); saveToLocalStorage({ useSoftCorners: e.target.checked }); }} className="w-4 h-4 accent-indigo-600" /><label htmlFor="corners" className="text-[10px] uppercase">Bløde former</label></div>
                    </div>
                    <div className="pt-2 flex flex-col gap-2">
                        <button type="button" onClick={exportData} className="text-[10px] font-bold text-slate-400 hover:text-indigo-600 flex items-center gap-1 uppercase tracking-widest"><Download size={12}/> Backup</button>
                        <button type="button" onClick={() => fileInputRef.current.click()} className="text-[10px] font-bold text-slate-400 hover:text-indigo-600 flex items-center gap-1 uppercase tracking-widest"><Upload size={12}/> Gendan</button>
                        <input type="file" ref={fileInputRef} onChange={importData} accept=".json" className="hidden" />
                    </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
