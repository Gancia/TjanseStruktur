import React from 'react';
import { 
  ChevronUp, ChevronDown, Users2, User, Star, X, Lock, Unlock, 
  Loader2, Rocket, Dice5, Ghost, Wand2, Heart, Sparkles, Shuffle,
  Layout
} from 'lucide-react';

const TaskCard = ({ 
  task, isEditMode, theme, highContrast, roundClass, buttonRoundClass, c, 
  moveTask, updateTask, setTasks, tasks, 
  renderIcon, animationType, isShuffling, shufflingTasks, tempNames, assignments, 
  lockedSlots, toggleLock, handleManualAssignment, students, getBuddies, getExclusions,
  iconPages, setIconPages, AVAILABLE_ICONS, ICONS_PER_PAGE, countdown
}) => {
  return (
    <div className={`${theme === 'night' ? 'bg-slate-800 text-white' : 'bg-white'} ${roundClass} shadow-sm ${highContrast ? 'border-4 border-black' : `border-2 ${task.isGlobal ? c.border : task.priority ? 'border-amber-200' : 'border-slate-100'}`} overflow-hidden flex flex-col transition-all duration-300 relative print-card`}>
      <div className={`p-4 flex ${isEditMode ? 'flex-col items-stretch gap-4' : 'items-center justify-between'} ${task.isGlobal ? c.light : task.priority ? 'bg-amber-50/50' : c.light} print-card-header`}>
        <div className={`flex items-center gap-4 ${isEditMode ? 'w-full' : 'flex-1'}`}>
          {isEditMode && (
            <div className="flex flex-col gap-0.5 no-print mr-1">
              <button onClick={() => moveTask(task.id, 'up')} className="text-slate-400 hover:text-indigo-500 transition-colors p-0.5"><ChevronUp size={16} /></button>
              <button onClick={() => moveTask(task.id, 'down')} className="text-slate-400 hover:text-indigo-500 transition-colors p-0.5"><ChevronDown size={16} /></button>
            </div>
          )}
          <div className={`p-3 bg-white rounded-xl ${c.text} shadow-sm print-icon ${highContrast ? 'border-2 border-black' : ''}`}>
            {renderIcon(task.icon)}
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            {isEditMode ? (
              <>
                <input 
                  type="text" 
                  value={task.name} 
                  onChange={(e) => updateTask(task.id, { name: e.target.value })}
                  placeholder="Navn på tjans..."
                  className={`text-xl font-bold bg-white/50 px-2 py-1 rounded border-b-2 border-dashed ${c.border} focus:outline-none w-full ${theme === 'night' ? 'text-slate-100 bg-slate-700/50' : 'text-slate-700'}`}
                />
                <input 
                  type="text" 
                  value={task.goal || ""} 
                  onChange={(e) => updateTask(task.id, { goal: e.target.value })}
                  placeholder="Mål (f.eks. 'Bordene er tørre')..."
                  className={`text-xs italic bg-white/30 px-2 py-1 rounded border-b border-dashed border-slate-300 focus:outline-none w-full mt-2 ${theme === 'night' ? 'text-slate-400 bg-slate-700/30' : 'text-slate-500'}`}
                />
              </>
            ) : (
              <>
                <h3 className={`text-xl font-bold ${theme === 'night' && !task.isGlobal && !task.priority ? 'text-slate-100' : 'text-slate-700'} leading-tight ${highContrast ? 'font-black text-black' : ''} break-words`}>{task.name}</h3>
                {task.goal && <span className="text-[10px] italic text-slate-400 font-medium break-words block mt-0.5">{task.goal}</span>}
              </>
            )}
          </div>
        </div>
        {isEditMode && (
          <div className="flex items-center justify-end gap-2 no-print text-slate-400 pt-3 border-t border-slate-200/50">
            <button onClick={() => updateTask(task.id, { isGlobal: !task.isGlobal })} className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${task.isGlobal ? `${c.text} ${c.light} ring-1 ring-current` : 'hover:bg-slate-50'}`} title="Skift til tekstfelt">
                <Users2 size={16} /> {task.isGlobal ? 'Frit felt' : 'Elever'}
            </button>
            <button onClick={() => updateTask(task.id, { singleSlot: !task.singleSlot })} className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${task.singleSlot ? `${c.text} ${c.light} ring-1 ring-current` : 'hover:bg-slate-50'}`} title="Enkelt elev">
                <User size={16} /> {task.singleSlot ? '1 elev' : '2 elever'}
            </button>
            <button onClick={() => updateTask(task.id, { priority: !task.priority })} className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${task.priority ? 'text-amber-600 bg-amber-50 ring-1 ring-amber-200' : 'hover:bg-slate-50'}`} title="Marker som vigtig">
                <Star size={16} fill={task.priority ? "currentColor" : "none"} /> Vigtig
            </button>
            <div className="flex-1"></div>
            <button onClick={() => { if(window.confirm('Slet tjans?')) setTasks(tasks.filter(t => t.id !== task.id)); }} className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-[10px] font-bold uppercase text-red-400 hover:bg-red-50 transition-all" title="Slet">
                <X size={16} /> Slet
            </button>
          </div>
        )}
      </div>

      {isEditMode && (
        <div className="p-4 bg-white border-b border-slate-100 no-print">
          <div className="grid grid-cols-6 gap-3 mb-4 min-h-[160px]">
            {AVAILABLE_ICONS.slice((iconPages[task.id] || 0) * ICONS_PER_PAGE, ((iconPages[task.id] || 0) + 1) * ICONS_PER_PAGE).map((i) => (
              <button key={i.id} onClick={() => { updateTask(task.id, {icon: i.id}); }} className={`p-2 rounded-lg transition-all flex flex-col items-center justify-center gap-1 ${task.icon === i.id ? `ring-2 ring-indigo-500 ${c.light} ${c.text} scale-105 z-10 shadow-sm` : 'text-slate-400 hover:bg-slate-50'}`} title={i.label}>
                <i.icon size={20} />
                <span className="text-[8px] truncate w-full text-center font-medium">{i.label}</span>
              </button>
            ))}
          </div>
          <div className="flex justify-between items-center pt-3 border-t border-slate-100">
            <button onClick={() => setIconPages(prev => ({...prev, [task.id]: Math.max(0, (prev[task.id] || 0) - 1)}))} disabled={(iconPages[task.id] || 0) === 0} className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${(iconPages[task.id] || 0) === 0 ? 'text-slate-200 bg-slate-50 cursor-not-allowed' : 'text-slate-500 bg-slate-100 hover:bg-slate-200 active:scale-95'}`}>Forrige</button>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Side {(iconPages[task.id] || 0) + 1} / {Math.ceil(AVAILABLE_ICONS.length / ICONS_PER_PAGE)}</span>
            <button onClick={() => setIconPages(prev => ({...prev, [task.id]: Math.min(Math.ceil(AVAILABLE_ICONS.length / ICONS_PER_PAGE) - 1, (prev[task.id] || 0) + 1)}))} disabled={((iconPages[task.id] || 0) + 1) * ICONS_PER_PAGE >= AVAILABLE_ICONS.length} className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${((iconPages[task.id] || 0) + 1) * ICONS_PER_PAGE >= AVAILABLE_ICONS.length ? 'text-slate-200 bg-slate-50 cursor-not-allowed' : 'text-slate-500 bg-slate-100 hover:bg-slate-200 active:scale-95'}`}>Næste</button>
          </div>
        </div>
      )}

      <div className="p-4 flex gap-4 h-full items-end">
        {task.isGlobal ? (
            <div className="flex-1">
                <input type="text" value={assignments[task.id]?.[0] || ""} onChange={(e) => handleManualAssignment(task.id, 0, e.target.value)} placeholder="Skriv her..." className={`w-full p-4 ${c.light} ${buttonRoundClass} border-2 border-dashed ${c.border} text-center text-xl font-black ${c.text} tracking-widest focus:outline-none no-print ${highContrast ? 'border-black border-solid' : ''}`} />
                <div className={`hidden print-student-name p-3 border-2 border-dashed ${c.border} ${buttonRoundClass} ${c.light} text-center font-black text-2xl min-h-[50px] flex items-center justify-center ${c.text} ${highContrast ? 'border-black border-solid text-black' : ''}`}>{assignments[task.id]?.[0] || "ALLE ELEVER"}</div>
            </div>
        ) : (
            [0, 1].filter(slot => slot === 0 || !task.singleSlot).map((slot) => {
                const isSlot = animationType === 'slot';
                const isThisTaskShuffling = isSlot ? shufflingTasks.has(task.id) : isShuffling;
                const s = isThisTaskShuffling ? tempNames[task.id]?.[slot] : assignments[task.id]?.[slot];
                
                const lock = lockedSlots[`${task.id}-${slot}`];
                const role = slot === 0 ? task.role1 : task.role2;
                return (
                  <div key={slot} className="flex-1 flex flex-col gap-1">
                    <div className="flex items-center justify-between no-print text-[9px] font-bold text-slate-400 uppercase tracking-widest px-1">
                      {isEditMode ? (
                        <input 
                          type="text" 
                          value={role || ""} 
                          onChange={(e) => updateTask(task.id, slot === 0 ? {role1: e.target.value} : {role2: e.target.value})}
                          placeholder={task.singleSlot ? "Opgave..." : `Rolle ${slot + 1}...`}
                          className="bg-transparent border-b border-dashed border-slate-200 focus:outline-none focus:border-indigo-400 w-24"
                        />
                      ) : (
                        <span>{role || (task.singleSlot ? "Elev" : `Makker ${slot + 1}`)}</span>
                      )}
                      <button onClick={() => toggleLock(task.id, slot)} className={`p-1 rounded-md transition-all ${lock ? `${c.text} ${c.light}` : 'text-slate-300 hover:text-slate-400'}`}>{lock ? <Lock size={10} /> : <Unlock size={10} />}</button>
                    </div>
                    <div className="no-print relative">
                      <div className={`w-full p-3 ${buttonRoundClass} border-2 text-sm transition-all flex items-center justify-center min-h-[44px] ${
                        isShuffling 
                        ? (lock ? 'bg-emerald-50 border-emerald-200 text-emerald-800 font-bold' : (animationType === 'spinner' ? 'bg-slate-50 border-slate-200' : animationType === 'pulse' ? 'bg-indigo-50 border-indigo-200 animate-calm-pulse' : animationType === 'rocket' ? `bg-slate-900 border-indigo-500/50 shadow-inner overflow-hidden ${countdown === 0 ? 'animate-extreme-shake' : ''}` : 'bg-slate-100 border-slate-200'))
                        : s ? `bg-emerald-50 border-emerald-200 text-emerald-800 font-bold ${animationType === 'fade' ? 'animate-soft-fade' : ''}` 
                        : `${theme === 'night' ? 'bg-slate-700 border-slate-600' : 'bg-slate-50 border-slate-200'} border-dashed text-slate-400`
                      } ${lock ? `border-indigo-300` : ''} ${highContrast ? 'border-black border-solid' : ''}`}>
                        {isShuffling && !lock ? (
                            animationType === 'spinner' ? <Loader2 className="animate-spin text-indigo-400" size={18} /> : 
                            animationType === 'flicker' ? <span className="text-indigo-600 font-bold">{s}</span> :
                            animationType === 'rocket' ? (
                                <div className="flex flex-col items-center relative h-full w-full justify-center">
                                    {countdown > 0 ? (
                                        <span key={countdown} className="text-2xl font-black text-white animate-countdown inline-block">{countdown}</span>
                                    ) : (
                                        <div className="animate-rocket-launch relative flex flex-col items-center z-10">
                                            <Rocket className="text-white relative z-20" size={32} />
                                            <div className="rocket-fire z-10"></div>
                                            {[...Array(12)].map((_, i) => {
                                                const angle = (i / 12) * Math.PI + Math.PI;
                                                const dist = 30 + Math.random() * 60;
                                                return <div key={i} className="smoke-particle z-0" style={{ animationDelay: `${Math.random() * 0.1}s`, '--tx': `${Math.cos(angle) * dist}px`, '--ty': `${Math.abs(Math.sin(angle)) * dist}px` }}></div>
                                            })}
                                            <span className="text-[9px] mt-3 text-red-400 font-black uppercase tracking-widest opacity-90 drop-shadow-[0_0_5px_rgba(239,68,68,0.8)]">Blast Off!</span>
                                        </div>
                                    )}
                                </div>
                            ) :
                            animationType === 'slot' ? (
                                <div className={`w-full h-10 slot-reel-container ${buttonRoundClass} transition-all duration-500 ${shufflingTasks.has(task.id) ? 'border-amber-400' : 'bg-emerald-50 border-emerald-200 shadow-none'}`}>
                                    {shufflingTasks.has(task.id) && <div className="slot-reel-glass"></div>}
                                    {shufflingTasks.has(task.id) && <div className="slot-reel-side-mark left-0"></div>}
                                    {shufflingTasks.has(task.id) && <div className="slot-reel-side-mark right-0"></div>}
                                    <div className="flex flex-col items-center justify-center h-full w-full">
                                        {shufflingTasks.has(task.id) && !assignments[task.id]?.[slot] ? (
                                            <div className="animate-slot-machine flex flex-col items-center gap-2 py-1">
                                                {[...students, ...students, ...students].slice(0, 20).map((st, idx) => (
                                                    <span key={idx} className="text-[10px] font-black text-slate-400 uppercase tracking-tighter h-3 flex items-center justify-center">{st}</span>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="animate-slot-reveal flex flex-col items-center justify-center">
                                                <span className="text-emerald-800 font-black uppercase text-sm tracking-tight drop-shadow-sm">
                                                    {assignments[task.id]?.[slot] || s}
                                                </span>
                                                {!shufflingTasks.has(task.id) && <div className="h-0.5 w-8 bg-emerald-500/20 rounded-full mt-0.5"></div>}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) :
                            animationType === 'ghost' ? (
                                <div className="flex flex-col items-center relative">
                                    <Ghost className="animate-spooky-float text-slate-400/50" size={28} />
                                    <span className="absolute -top-4 text-[8px] font-black text-slate-500 animate-pulse uppercase tracking-tighter">Hvem der?</span>
                                    <span className="text-sm mt-1 text-slate-700 font-black animate-ghost-glow drop-shadow-[0_0_10px_rgba(255,255,255,1)] z-50">
                                        {s}
                                    </span>
                                </div>
                            ) :
                            animationType === 'magic' ? <div className="flex flex-col items-center"><Wand2 className="animate-magic" size={24} style={{ color: '#fbbf24' }} /><span className="text-[8px] mt-1 text-amber-500 font-black uppercase">Abracadabra...</span></div> :
                            animationType === 'pulse' ? <Heart className="animate-calm-pulse text-rose-400" size={24} /> :
                            animationType === 'fade' ? <span className="text-slate-300 animate-pulse font-black">...</span> :
                            <Shuffle className="text-indigo-300" size={18} />
                        ) : (
                            <div className="relative w-full group">
                                <select value={s || ''} disabled={isShuffling && lock} onChange={(e) => handleManualAssignment(task.id, slot, e.target.value)} className="bg-transparent w-full text-center appearance-none focus:outline-none cursor-pointer">
                                    <option value="">—</option>
                                    {students.sort((a,b) => a.localeCompare(b)).map(st => <option key={st} value={st}>{st}</option>)}
                                </select>
                                {isEditMode && s && !isShuffling && (
                                    <div className="absolute -bottom-5 left-0 right-0 flex justify-center gap-1 no-print pointer-events-none">
                                        {getBuddies(s).map(b => <div key={b} className="bg-indigo-500 text-white p-0.5 rounded-full shadow-sm" title={`Makker: ${b}`}><Users2 size={8}/></div>)}
                                        {getExclusions(s).map(ex => <div key={ex} className="bg-red-500 text-white p-0.5 rounded-full shadow-sm" title={`Udelukker: ${ex}`}><UserMinus size={8}/></div>)}
                                    </div>
                                )}
                            </div>
                        )}
                      </div>
                    </div>
                    <div className={`hidden print-student-name p-3 border-2 border-slate-100 ${buttonRoundClass} bg-slate-50 text-center font-bold text-xl min-h-[50px] flex flex-col items-center justify-center text-slate-700 print-student-name`}>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">{role || (task.singleSlot ? "Elev" : `Makker ${slot + 1}`)}</span>
                        {s || "—"}
                    </div>
                  </div>
                );
              })
        )}
      </div>
    </div>
  );
};

export default TaskCard;
