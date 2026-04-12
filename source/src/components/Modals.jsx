import React from 'react';
import { 
  X, Info, History, MousePointer2, Users2, ShieldCheck, Target, Zap, Layout, 
  Plus, CheckCircle2, Archive, UserMinus, Type, SunMedium, Loader, Sparkles, 
  Heart, Rocket, Dice5, Ghost, Wand2, Download, Upload, AlertCircle
} from 'lucide-react';

export const HelpModal = ({ showHelp, setShowHelp, c, roundClass, buttonRoundClass }) => {
  if (!showHelp) return null;
  return (
    <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center z-50 p-4 no-print backdrop-blur-sm">
      <div className={`bg-white ${roundClass} shadow-2xl max-w-5xl w-full overflow-hidden text-slate-800`}>
        <div className={`${c.primary} p-6 flex justify-between items-center text-white`}>
          <h2 className="text-xl font-bold flex items-center gap-2"><Info /> Vejledning & Pædagogisk Grundlag</h2>
          <button onClick={() => setShowHelp(false)} className="hover:bg-white/20 p-1 rounded-lg transition-colors"><X /></button>
        </div>
        <div className="p-8 space-y-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
          <section className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <h3 className="font-black text-lg flex items-center gap-2 text-slate-800 border-b-2 pb-2 border-slate-200"><MousePointer2 size={20} className={c.text}/> Teknisk Brugervejledning</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm text-slate-600 leading-relaxed">
              <div className="space-y-3">
                <p><strong>1. Klasselisten:</strong> Skriv elevernes navne i højre kolonne. Tryk + eller Enter. Antallet af elever opdateres automatisk.</p>
                <p><strong>2. Ret & Tilføj:</strong> Tryk på <strong>'Indstillinger'</strong>. Nu kan du rette eksisterende opgaver eller bruge den store <strong>plus-knap (+)</strong> i bunden til at oprette helt nye tjanser.</p>
                <p><strong>3. Roller & Mål:</strong> Under hver opgave kan du skrive specifikke roller til hver makker og sætte et konkret mål (f.eks. "Bordene skal være helt tørre").</p>
                <p><strong>4. Tekstfelt (Voksne):</strong> Tryk på 👥 ikonet for at skifte til et frit tekstfelt - ideelt til navne på voksne eller f.eks. "Hele klassen".</p>
              </div>
              <div className="space-y-3">
                <p><strong>5. Manuelt valg & Lås:</strong> Du kan vælge en elev manuelt i drop-down menuen og derefter trykke på 🔓 for at låse dem fast, før du trykker 'Bland elever' for resten.</p>
                <p><strong>6. Backup:</strong> Dine data gemmes i din browser. Brug <strong>'Backup'</strong> i indstillinger til at gemme en fil, så du aldrig mister dine opsætninger.</p>
                <p><strong>7. Historik:</strong> Systemet husker hvem der havde opgaven sidst og undgår gengangere. Dette sker automatisk hver mandag, eller manuelt via knappen <strong>'Sidste uge'</strong>.</p>
              </div>
            </div>
          </section>

          <section className="space-y-4 bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100">
            <h3 className="font-black text-lg flex items-center gap-2 text-indigo-900 border-b-2 pb-2 border-indigo-200"><Users2 size={20} className="text-indigo-600"/> Makkerskaber & Udelukkelser</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-slate-600 leading-relaxed">
              <div>
                <p className="font-bold text-indigo-900 mb-1">Faste makkere:</p>
                <p>Under indstillinger kan du binde to elever sammen. Hvis den ene elev trækkes til en tjans, følger den faste makker altid automatisk med for at skabe social tryghed.</p>
              </div>
              <div>
                <p className="font-bold text-red-900 mb-1">Aldrig sammen:</p>
                <p>Definer par som aldrig må arbejde sammen. Systemet vil sikre, at disse to elever aldrig bliver parret i en lodtrækning.</p>
              </div>
            </div>
          </section>

          <section className="space-y-6 p-2">
            <h3 className="font-black text-lg flex items-center gap-2 text-slate-800 border-b-2 pb-2 border-slate-200"><Info size={20} className="text-amber-500"/> Pædagogiske Tanker & Valg</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h4 className="font-bold text-slate-700 flex items-center gap-2"><ShieldCheck size={18} className="text-emerald-500"/> Social Tryghed via Roller</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Neurodivergerende elever bruger ofte energi på social forhandling. Ved at definere faste Roller fjerner vi denne forhandling og skaber ro i makkerskabet.</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-slate-700 flex items-center gap-2"><Target size={18} className="text-blue-500"/> The Power of Done (Mål)</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Mange elever ved ikke, hvornår en opgave er slut. 'Målet' fungerer som et konkret stoppunkt, der gør det muligt at afslutte aktiviteten med succes.</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-slate-700 flex items-center gap-2"><Zap size={18} className="text-amber-500"/> Arousal & Animation</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Visuel flimren kan skabe angst. Muligheden for Rolige Animationer (Spinner/Puls) sikrer, at skiftet bliver en rolig og faktuel oplysning.</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-slate-700 flex items-center gap-2"><Layout size={18} className="text-purple-500"/> Visuel Ro & Struktur</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Farvetemaer og valg af former hjælper med at skabe de skarpe og forudsigelige rammer, som many elever trives bedst med.</p>
              </div>
            </div>
          </section>

          <button onClick={() => setShowHelp(false)} className={`w-full ${c.primary} text-white font-bold py-4 ${buttonRoundClass} hover:opacity-90 transition-all shadow-lg flex items-center justify-center gap-2`}>
            <CheckCircle2 size={20}/> Forstået
          </button>
        </div>
      </div>
    </div>
  );
};

export const HistoryModal = ({ showHistoryModal, setShowHistoryModal, history, setHistory, assignments, tasks, saveToLocalStorage, showToast, c, roundClass, buttonRoundClass, renderIcon }) => {
  if (!showHistoryModal) return null;
  return (
    <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center z-[110] p-4 no-print backdrop-blur-sm">
      <div className={`bg-white ${roundClass} shadow-2xl max-w-2xl w-full overflow-hidden text-slate-800 animate-soft-fade`}>
        <div className={`${c.primary} p-6 flex justify-between items-center text-white`}>
          <h2 className="text-xl font-bold flex items-center gap-2"><History /> Tidligere tildelinger</h2>
          <button onClick={() => setShowHistoryModal(false)} className="hover:bg-white/20 p-1 rounded-lg transition-colors"><X /></button>
        </div>
        <div className="p-8 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <p className="text-sm text-slate-600 leading-relaxed">
            Her kan du se hvilke elever, der havde opgaverne i sidste uge. Systemet bruger disse data til automatisk at undgå gengangere.
          </p>
          <div className="flex justify-end mb-2">
            <button 
              onClick={() => {
                const archivedHistory = { ...history };
                Object.keys(assignments).forEach(tid => {
                  const task = tasks.find(t => t.id === tid);
                  if (task && !task.isGlobal) {
                    archivedHistory[tid] = (assignments[tid] || []).filter(s => s && s !== "");
                  }
                });
                setHistory(archivedHistory);
                saveToLocalStorage({ history: archivedHistory });
                showToast("Nuværende plan er nu gemt som historik!");
              }}
              className={`px-3 py-1.5 ${c.light} ${c.text} border ${c.border} rounded-lg text-[10px] font-black uppercase hover:bg-white transition-all shadow-sm flex items-center gap-2`}
            >
              <Archive size={14} /> Arkiver denne uge manuelt
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tasks.filter(t => !t.isGlobal).map(task => (
              <div key={task.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2 mb-2">
                  {renderIcon(task.icon, 16)}
                  <span className="font-bold text-sm text-slate-700">{task.name}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {(history[task.id] || []).length > 0 ? (
                    history[task.id].map(s => <span key={s} className="px-2 py-0.5 bg-white border border-slate-200 rounded-md text-[10px] font-medium text-slate-500">{s}</span>)
                  ) : (
                    <span className="text-[10px] italic text-slate-400">Ingen data gemt</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="pt-4 flex justify-between gap-4">
            <button onClick={() => { if(window.confirm('Vil du slette al historik? Dette kan ikke fortrydes.')) { setHistory({}); saveToLocalStorage({history: {}}); } }} className="text-xs text-red-400 hover:text-red-600 font-bold uppercase tracking-wider">Nulstil historik</button>
            <button onClick={() => setShowHistoryModal(false)} className={`py-3 px-8 ${c.primary} text-white font-bold ${buttonRoundClass} hover:opacity-90 transition-all shadow-lg`}>Luk</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AddTaskModal = ({ isAddTaskModalOpen, setIsAddTaskModalOpen, newTaskName, setNewTaskName, tasks, setTasks, assignments, setAssignments, saveToLocalStorage, c, roundClass, buttonRoundClass }) => {
  if (!isAddTaskModalOpen) return null;
  return (
    <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center z-[100] p-4 no-print backdrop-blur-sm">
      <div className={`bg-white ${roundClass} shadow-2xl max-w-md w-full overflow-hidden text-slate-800 animate-soft-fade`}>
        <div className={`${c.primary} p-6 flex justify-between items-center text-white`}>
          <h2 className="text-xl font-bold flex items-center gap-2"><Plus /> Tilføj ny tjans</h2>
          <button onClick={() => setIsAddTaskModalOpen(false)} className="hover:bg-white/20 p-1 rounded-lg transition-colors"><X /></button>
        </div>
        <form onSubmit={(e) => { 
          e.preventDefault(); 
          if (newTaskName.trim()) { 
            const id = Date.now().toString(); 
            const nt = [...tasks, { id, name: newTaskName.trim(), icon: 'Layout', priority: false, isGlobal: false }]; 
            setTasks(nt); 
            setAssignments({...assignments, [id]: [null, null]}); 
            saveToLocalStorage({ tasks: nt }); 
            setNewTaskName(''); 
            setIsAddTaskModalOpen(false);
          } 
        }} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-slate-400 tracking-widest">Navn på tjansen</label>
            <input 
              type="text" 
              autoFocus
              value={newTaskName} 
              onChange={(e) => setNewTaskName(e.target.value)} 
              placeholder="F.eks. 'Hente mælk'..." 
              className={`w-full p-4 bg-slate-50 border-2 border-slate-200 ${buttonRoundClass} focus:outline-none focus:border-indigo-500 font-bold text-lg`}
            />
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={() => setIsAddTaskModalOpen(false)} className={`flex-1 py-4 px-6 border-2 border-slate-200 ${buttonRoundClass} font-bold text-slate-400 hover:bg-slate-50 transition-all uppercase tracking-widest text-xs`}>Annuller</button>
            <button type="submit" disabled={!newTaskName.trim()} className={`flex-1 py-4 px-6 ${c.primary} text-white ${buttonRoundClass} font-bold hover:opacity-90 transition-all uppercase tracking-widest text-xs shadow-lg disabled:opacity-50`}>Opret tjans</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const WarningsModal = ({ showWarningsModal, setShowWarningsModal, assignmentWarnings, c, roundClass, buttonRoundClass }) => {
  if (!showWarningsModal) return null;
  return (
    <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center z-[110] p-4 no-print backdrop-blur-sm">
      <div className={`bg-white ${roundClass} shadow-2xl max-w-md w-full overflow-hidden text-slate-800 animate-soft-fade`}>
        <div className={`${c.primary} p-6 flex justify-between items-center text-white`}>
          <h2 className="text-xl font-bold flex items-center gap-2"><Info /> OBS</h2>
          <button onClick={() => setShowWarningsModal(false)} className="hover:bg-white/20 p-1 rounded-lg transition-colors"><X /></button>
        </div>
        <div className="p-8 space-y-4">
          <p className="text-sm text-slate-600 leading-relaxed font-medium">
            Systemet har gjort følgende for at få planen til at gå op:
          </p>
          <div className="space-y-2">
            {assignmentWarnings.map((warning, i) => (
              <div key={i} className="flex gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-700">
                <div className="text-indigo-500 mt-0.5">•</div>
                <span>{warning}</span>
              </div>
            ))}
          </div>
          <button onClick={() => setShowWarningsModal(false)} className={`w-full mt-4 py-3 ${c.primary} text-white font-bold ${buttonRoundClass} hover:opacity-90 transition-all`}>
            Det er modtaget
          </button>
        </div>
      </div>
    </div>
  );
};
