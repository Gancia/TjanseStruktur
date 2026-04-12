import React from 'react';
import { 
  Users, Pencil, X, Plus, Type, Users2, UserMinus, Download, Upload, 
  SunMedium, Zap, Loader, Sparkles, Heart, Rocket, Dice5, Ghost, Wand2
} from 'lucide-react';

const Sidebar = ({ 
  theme, roundClass, c, students, isEditingClass, setIsEditingClass, setStudents, 
  saveToLocalStorage, newStudentName, setNewStudentName, isEditMode, appTitle, setAppTitle,
  pairedStudents, setPairedStudents, excludedPairs, setExcludedPairs, THEME_COLORS, setTheme,
  useAnimation, setUseAnimation, animationType, setAnimationType, highContrast, setHighContrast,
  autoAllowDuplicates, setAutoAllowDuplicates, useSoftCorners, setUseSoftCorners, 
  showPattern, setShowPattern, showWeekOnPrint, setShowWeekOnPrint, exportData, 
  fileInputRef, importData, getBuddy, getExclusions, buttonRoundClass
}) => {
  return (
    <div className="lg:col-span-1 space-y-6 no-print">
      <div className={`${theme === 'night' ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'} p-6 ${roundClass} shadow-md border-2`}>
        <h2 className={`text-lg font-black mb-4 flex items-center justify-between uppercase tracking-tight border-b-2 ${theme === 'night' ? 'border-slate-700' : 'border-slate-200'} pb-2`}>
          <div className="flex items-center gap-2"><Users size={20} className={c.text} /> Klassen</div>
          <div className="flex items-center gap-2">
            <span className={`text-xs ${c.primary} px-2 py-1 rounded-full text-white font-bold`}>{students.length}</span>
            <button onClick={() => setIsEditingClass(!isEditingClass)} className={`p-1.5 rounded-lg transition-all ${isEditingClass ? `${c.primary} text-white` : 'text-slate-400 hover:bg-slate-200'}`} title="Rediger klassen">
                <Pencil size={14}/>
            </button>
          </div>
        </h2>
        <div className={`space-y-1 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar ${theme === 'night' ? 'bg-slate-900/50' : 'bg-white/50'} rounded-xl p-2 border ${theme === 'night' ? 'border-slate-700' : 'border-slate-200'}`}>
          {students.sort((a,b) => a.localeCompare(b)).map((n) => {
            const buddy = getBuddy(n);
            const exclusions = getExclusions(n);
            return (
              <div key={n} className={`flex items-center justify-between p-2 rounded-lg hover:bg-white/10 text-sm font-bold ${theme === 'night' ? 'text-slate-300' : 'text-slate-700'}`}>
                  <div className="flex flex-col min-w-0">
                    <span className="truncate">{n}</span>
                    {isEditMode && (buddy || exclusions.length > 0) && (
                        <div className="flex flex-wrap gap-1 mt-0.5">
                            {buddy && <div className="flex items-center gap-0.5 text-[7px] bg-indigo-50 text-indigo-500 px-1 rounded border border-indigo-100 uppercase" title={`Makker: ${buddy}`}><Users2 size={8}/> {buddy}</div>}
                            {exclusions.map(ex => <div key={ex} className="flex items-center gap-0.5 text-[7px] bg-red-50 text-red-400 px-1 rounded border border-red-100 uppercase" title={`Må ikke være sammen med: ${ex}`}><UserMinus size={8}/> {ex}</div>)}
                        </div>
                    )}
                  </div>
                  {isEditingClass && <button onClick={() => { const nl = students.filter(s => s !== n); setStudents(nl); saveToLocalStorage({ students: nl }); setNewStudentName(''); }} className="text-slate-400 hover:text-red-500 transition-colors ml-2"><X size={16} /></button>}
              </div>
            );
          })}
        </div>
        <div className={`mt-4 pt-4 border-t-2 ${theme === 'night' ? 'border-slate-700' : 'border-slate-200'}`}>
            <form onSubmit={(e) => { e.preventDefault(); if (newStudentName.trim() && !students.includes(newStudentName.trim())) { const nl = [...students, newStudentName.trim()]; setStudents(nl); saveToLocalStorage({ students: nl }); setNewStudentName(''); } }} className={`flex gap-2 ${theme === 'night' ? 'bg-slate-700' : 'bg-white'} p-1 rounded-lg border ${theme === 'night' ? 'border-slate-600' : 'border-slate-300'}`}>
              <input type="text" placeholder="Elevens navn..." value={newStudentName} onChange={(e) => setNewStudentName(e.target.value)} className="flex-1 bg-transparent px-3 py-2 text-sm focus:outline-none" />
              <button type="submit" className={`${c.primary} text-white p-2 ${buttonRoundClass}`}><Plus size={18} /></button>
            </form>
            {isEditMode && (
                <div className={`mt-6 space-y-4 border-t ${theme === 'night' ? 'border-slate-700' : 'border-slate-200'} pt-4`}>
                    <div className="bg-white/50 p-3 rounded-xl border border-slate-200 space-y-2">
                        <h4 className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-1"><Type size={12}/> Titel</h4>
                        <input type="text" value={appTitle} onChange={(e) => {setAppTitle(e.target.value); saveToLocalStorage({appTitle: e.target.value});}} className="w-full text-xs p-2 border border-slate-200 rounded-md focus:outline-none" />
                    </div>
                    
                    <div className="bg-white/50 p-3 rounded-xl border border-slate-200 space-y-3">
                        <h4 className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-1"><Users2 size={12}/> Faste makkere</h4>
                        <div className="space-y-1">
                            {pairedStudents.map((pair, idx) => (
                                <div key={idx} className="flex items-center justify-between bg-white p-1.5 rounded-md text-[10px] font-bold border border-slate-100">
                                    <span className="truncate">{pair[0]} + {pair[1]}</span>
                                    <button onClick={() => { const np = pairedStudents.filter((_, i) => i !== idx); setPairedStudents(np); saveToLocalStorage({pairedStudents: np}); }} className="text-red-400 hover:text-red-600"><X size={12}/></button>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-1">
                            <select id="pair1" className="flex-1 text-[10px] p-1 border rounded bg-white">
                                <option value="">Elev 1</option>
                                {students.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                            <select id="pair2" className="flex-1 text-[10px] p-1 border rounded bg-white">
                                <option value="">Elev 2</option>
                                {students.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                            <button onClick={() => {
                                const s1 = document.getElementById('pair1').value;
                                const s2 = document.getElementById('pair2').value;
                                if(s1 && s2 && s1 !== s2) {
                                    const np = [...pairedStudents, [s1, s2]];
                                    setPairedStudents(np);
                                    saveToLocalStorage({pairedStudents: np});
                                    document.getElementById('pair1').value = "";
                                    document.getElementById('pair2').value = "";
                                }
                            }} className={`${c.primary} text-white p-1 rounded`}><Plus size={14}/></button>
                        </div>
                    </div>

                    <div className="bg-white/50 p-3 rounded-xl border border-slate-200 space-y-3">
                        <h4 className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-1"><UserMinus size={12}/> Aldrig sammen</h4>
                        <div className="space-y-1">
                            {excludedPairs.map((pair, idx) => (
                                <div key={idx} className="flex items-center justify-between bg-white p-1.5 rounded-md text-[10px] font-bold border border-slate-100">
                                    <span className="truncate text-red-500">{pair[0]} ≠ {pair[1]}</span>
                                    <button onClick={() => { const np = excludedPairs.filter((_, i) => i !== idx); setExcludedPairs(np); saveToLocalStorage({excludedPairs: np}); }} className="text-red-400 hover:text-red-600"><X size={12}/></button>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-1">
                            <select id="ex1" className="flex-1 text-[10px] p-1 border rounded bg-white">
                                <option value="">Elev 1</option>
                                {students.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                            <select id="ex2" className="flex-1 text-[10px] p-1 border rounded bg-white">
                                <option value="">Elev 2</option>
                                {students.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                            <button onClick={() => {
                                const s1 = document.getElementById('ex1').value;
                                const s2 = document.getElementById('ex2').value;
                                if(s1 && s2 && s1 !== s2) {
                                    const np = [...excludedPairs, [s1, s2]];
                                    setExcludedPairs(np);
                                    saveToLocalStorage({excludedPairs: np});
                                    document.getElementById('ex1').value = "";
                                    document.getElementById('ex2').value = "";
                                }
                            }} className="bg-red-500 text-white p-1 rounded"><Plus size={14}/></button>
                        </div>
                    </div>

                    <div className="flex gap-2">{Object.entries(THEME_COLORS).map(([k, v]) => (<button key={k} onClick={() => {setTheme(k); saveToLocalStorage({theme: k});}} className={`w-6 h-6 rounded-full border-2 ${theme === k ? 'border-white scale-120 shadow-md' : 'border-transparent'} ${v.primary}`} />))}</div>
                    <div className="space-y-2 pt-2 border-t border-slate-200">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500"><input type="checkbox" id="anim" checked={useAnimation} onChange={(e) => { setUseAnimation(e.target.checked); saveToLocalStorage({ useAnimation: e.target.checked }); }} className="w-4 h-4 accent-indigo-600" /><label htmlFor="anim" className="text-[10px] uppercase">Animation</label></div>
                        {useAnimation && (
                            <div className="ml-6 space-y-4">
                                <div className="space-y-2">
                                    <h5 className="text-[9px] font-black uppercase text-blue-500 flex items-center gap-1 tracking-widest"><SunMedium size={12}/> Rolige</h5>
                                    <div className="grid grid-cols-2 gap-1">
                                        {[
                                            {id: 'flicker', icon: Zap, label: 'Flimmer'},
                                            {id: 'spinner', icon: Loader, label: 'Spinner'},
                                            {id: 'fade', icon: Sparkles, label: 'Indfase'},
                                            {id: 'pulse', icon: Heart, label: 'Puls'}
                                        ].map(a => (
                                            <button key={a.id} type="button" onClick={() => {setAnimationType(a.id); saveToLocalStorage({animationType: a.id});}} className={`flex items-center gap-1 p-1.5 text-[9px] font-black uppercase border rounded-md transition-all ${animationType === a.id ? `bg-blue-500 text-white border-transparent shadow-sm scale-[1.02]` : 'bg-white text-slate-400 border-slate-200 hover:bg-slate-50'}`}>
                                                <a.icon size={10}/> {a.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <h5 className="text-[9px] font-black uppercase text-orange-500 flex items-center gap-1 tracking-widest"><Zap size={12}/> Action</h5>
                                    <div className="grid grid-cols-2 gap-1">
                                        {[
                                            {id: 'rocket', icon: Rocket, label: 'Raket'},
                                            {id: 'slot', icon: Dice5, label: 'Tromle'},
                                            {id: 'ghost', icon: Ghost, label: 'Spøgelse'},
                                            {id: 'magic', icon: Wand2, label: 'Magi'}
                                        ].map(a => (
                                            <button key={a.id} type="button" onClick={() => {setAnimationType(a.id); saveToLocalStorage({animationType: a.id});}} className={`flex items-center gap-1 p-1.5 text-[9px] font-black uppercase border rounded-md transition-all ${animationType === a.id ? `bg-orange-500 text-white border-transparent shadow-sm scale-[1.02]` : 'bg-white text-slate-400 border-slate-200 hover:bg-slate-50'}`}>
                                                <a.icon size={10}/> {a.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500"><input type="checkbox" id="contrast" checked={highContrast} onChange={(e) => { setHighContrast(e.target.checked); saveToLocalStorage({ highContrast: e.target.checked }); }} className="w-4 h-4 accent-indigo-600" /><label htmlFor="contrast" className="text-[10px] uppercase">Kontrast</label></div>
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500"><input type="checkbox" id="dups" checked={autoAllowDuplicates} onChange={(e) => { setAutoAllowDuplicates(e.target.checked); saveToLocalStorage({ autoAllowDuplicates: e.target.checked }); }} className="w-4 h-4 accent-indigo-600" /><label htmlFor="dups" className="text-[10px] uppercase">Genbrug navne</label></div>
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500"><input type="checkbox" id="corners" checked={useSoftCorners} onChange={(e) => { setUseSoftCorners(e.target.checked); saveToLocalStorage({ useSoftCorners: e.target.checked }); }} className="w-4 h-4 accent-indigo-600" /><label htmlFor="corners" className="text-[10px] uppercase">Bløde former</label></div>
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500"><input type="checkbox" id="pattern" checked={showPattern} onChange={(e) => { setShowPattern(e.target.checked); saveToLocalStorage({ showPattern: e.target.checked }); }} className="w-4 h-4 accent-indigo-600" /><label htmlFor="pattern" className="text-[10px] uppercase">Struktur</label></div>
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500"><input type="checkbox" id="showWeek" checked={showWeekOnPrint} onChange={(e) => { setShowWeekOnPrint(e.target.checked); saveToLocalStorage({ showWeekOnPrint: e.target.checked }); }} className="w-4 h-4 accent-indigo-600" /><label htmlFor="showWeek" className="text-[10px] uppercase">Uge på print</label></div>
                    </div>
                    <div className="pt-2 flex flex-col gap-2">
                        <button type="button" onClick={exportData} className="text-[10px] font-bold text-slate-400 hover:text-indigo-600 flex items-center gap-1 uppercase tracking-widest"><Download size={12}/> Backup</button>
                        <button type="button" onClick={() => fileInputRef.current.click()} className="text-[10px] font-bold text-slate-400 hover:text-indigo-600 flex items-center gap-1 uppercase tracking-widest"><Upload size={12}/> Gendan</button>
                        <input type="file" ref={fileInputRef} onChange={importData} accept=".json" className="hidden" />
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
