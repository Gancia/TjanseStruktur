import { useState, useEffect, useRef, useCallback } from 'react';

const LOCAL_STORAGE_KEY = 'tjansestruktur-state-v15';

export const getISOWeek = () => {
  const date = new Date();
  const dayNum = (date.getDay() + 6) % 7;
  date.setDate(date.getDate() - dayNum + 3);
  const firstThursday = date.getTime();
  date.setMonth(0, 1);
  if (date.getDay() !== 4) date.setMonth(0, 1 + ((4 - date.getDay()) + 7) % 7);
  return 1 + Math.ceil((firstThursday - date) / 604800000);
};

export const useDukseLogic = () => {
  const [loading, setLoading] = useState(true);
  const [isShuffling, setIsShuffling] = useState(false);
  const [students, setStudents] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [assignments, setAssignments] = useState({});
  const [lockedSlots, setLockedSlots] = useState({}); 
  const [history, setHistory] = useState({}); 
  const [isEditMode, setIsEditMode] = useState(false);
  const [isEditingClass, setIsEditingClass] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [assignmentWarnings, setAssignmentWarnings] = useState([]);
  const [showWarningsModal, setShowWarningsModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  
  const [appTitle, setAppTitle] = useState('Tjansestruktur');
  const [useAnimation, setUseAnimation] = useState(true);
  const [animationType, setAnimationType] = useState('spinner'); 
  const [autoAllowDuplicates, setAutoAllowDuplicates] = useState(false);
  const [theme, setTheme] = useState('ocean');
  const [highContrast, setHighContrast] = useState(false);
  const [useSoftCorners, setUseSoftCorners] = useState(true);
  const [showPattern, setShowPattern] = useState(false);
  const [weekNumber, setWeekNumber] = useState(getISOWeek().toString());
  const [showWeekOnPrint, setShowWeekOnPrint] = useState(true);

  const [pairedStudents, setPairedStudents] = useState([]); 
  const [excludedPairs, setExcludedPairs] = useState([]);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  const [newStudentName, setNewStudentName] = useState('');
  const [newTaskName, setNewTaskName] = useState('');
  const [iconPages, setIconPages] = useState({});
  const [tempNames, setTempNames] = useState({});
  const [activeEffect, setActiveEffect] = useState(null); 
  const [countdown, setCountdown] = useState(null);
  const [shufflingTasks, setShufflingTasks] = useState(new Set());
  const [spookyText, setSpookyText] = useState('');
  
  const [toast, setToast] = useState(null);
  const toastTimeoutRef = useRef(null);

  const showToast = useCallback((message, type = 'success') => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToast({ message, type });
    toastTimeoutRef.current = setTimeout(() => setToast(null), 3000);
  }, []);

  const saveToLocalStorage = useCallback((newData) => {
    setStudents(prevStudents => {
        setTasks(prevTasks => {
            setAssignments(prevAssignments => {
                setHistory(prevHistory => {
                    setLockedSlots(prevLockedSlots => {
                        const currentState = { 
                            students: prevStudents, 
                            tasks: prevTasks, 
                            assignments: prevAssignments, 
                            history: prevHistory, 
                            lockedSlots: prevLockedSlots, 
                            showWeekOnPrint, theme, highContrast, useSoftCorners, showPattern, appTitle, useAnimation, animationType, autoAllowDuplicates, weekNumber, pairedStudents, excludedPairs 
                        };
                        const merged = { ...currentState, ...newData };
                        if (merged.students) merged.students = merged.students.map(s => s.trim());
                        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(merged));
                        return prevLockedSlots;
                    });
                    return prevHistory;
                });
                return prevAssignments;
            });
            return prevTasks;
        });
        return prevStudents;
    });
  }, [showWeekOnPrint, theme, highContrast, useSoftCorners, showPattern, appTitle, useAnimation, animationType, autoAllowDuplicates, weekNumber, pairedStudents, excludedPairs]);

  const loadDefaults = () => {
    const defaultTasks = [
      { id: '1', name: 'Feje gulv', icon: 'Wind', priority: true, isGlobal: false, role1: 'Fejer', role2: 'Samler op', goal: 'Ingen krummer under bordene' },
      { id: '2', name: 'Tørre borde af', icon: 'Eraser', priority: true, isGlobal: false, role1: 'Vasker', role2: 'Tørrer efter', goal: 'Bordene er tørre og rene' },
      { id: '3', name: 'Sætte PC i skab', icon: 'Laptop', priority: false, isGlobal: true, goal: 'Alle computere i stik' },
    ];
    const defaultStudents = ['Sofie', 'Lukas', 'Emma', 'Noah', 'Ida', 'Victor', 'Maja', 'Oliver'];
    setTasks(defaultTasks);
    setStudents(defaultStudents);
    setAssignments({});
    setPairedStudents([]);
    setExcludedPairs([]);
  };

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    const currentWeek = getISOWeek().toString();
    
    if (saved) {
      try {
        const data = JSON.parse(saved);
        let loadedHistory = data.history || {};
        
        if (data.weekNumber && data.weekNumber !== currentWeek) {
          const oldAssignments = data.assignments || {};
          const archivedHistory = { ...loadedHistory };
          Object.keys(oldAssignments).forEach(tid => {
            const task = (data.tasks || []).find(t => t.id === tid);
            if (task && !task.isGlobal) {
              archivedHistory[tid] = (oldAssignments[tid] || []).filter(s => s && typeof s === 'string' && s !== "");
            }
          });
          loadedHistory = archivedHistory;
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ ...data, history: loadedHistory, weekNumber: currentWeek }));
        }

        setStudents((data.students || []).map(s => s.trim()));
        setTasks(data.tasks || []);
        setAssignments(data.assignments || {});
        setHistory(loadedHistory);
        setLockedSlots(data.lockedSlots || {});
        setAppTitle(data.appTitle || 'Tjansestruktur');
        setUseAnimation(data.useAnimation !== undefined ? data.useAnimation : true);
        setAnimationType(data.animationType || 'spinner');
        setAutoAllowDuplicates(data.autoAllowDuplicates || false);
        setTheme(data.theme || 'ocean');
        setHighContrast(data.highContrast || false);
        setUseSoftCorners(data.useSoftCorners !== undefined ? data.useSoftCorners : true);
        setShowPattern(data.showPattern || false);
        setWeekNumber(currentWeek);
        setShowWeekOnPrint(data.showWeekOnPrint !== undefined ? data.showWeekOnPrint : true);
        setPairedStudents(data.pairedStudents || []);
        setExcludedPairs(data.excludedPairs || []);
      } catch (e) { loadDefaults(); }
    } else { 
      loadDefaults(); 
      setWeekNumber(currentWeek);
    }
    setLoading(false);
  }, []);

  // Bug Fix 3: Sørg for at ugeskift opdages selvom appen står åben
  useEffect(() => {
    const checkWeek = () => {
        const currentWeek = getISOWeek().toString();
        if (weekNumber !== currentWeek) {
            window.location.reload(); // Enkel løsning: genindlæs for at trigge useEffect logikken
        }
    };
    const interval = setInterval(checkWeek, 3600000); // Tjek hver time
    document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === 'visible') checkWeek();
    });
    return () => clearInterval(interval);
  }, [weekNumber]);

  const getBuddy = useCallback((student) => {
    const name = student ? student.trim() : "";
    const pair = pairedStudents.find(p => p.map(s => s.trim()).includes(name));
    return pair ? pair.find(s => s.trim() !== name) : null;
  }, [pairedStudents]);

  const getBuddies = useCallback((student) => {
    const name = student ? student.trim() : "";
    return pairedStudents.filter(p => p.map(s => s.trim()).includes(name)).map(p => p.find(s => s.trim() !== name));
  }, [pairedStudents]);

  const getExclusions = useCallback((student) => {
    const name = student ? student.trim() : "";
    return excludedPairs.filter(p => p.map(s => s.trim()).includes(name)).map(p => p.find(s => s.trim() !== name));
  }, [excludedPairs]);

  const randomize = () => {
    if (isShuffling || students.length === 0) return;
    
    const shuffleArray = (array) => {
        const newArr = [...array];
        for (let i = newArr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
        }
        return newArr;
    };

    const performRandomize = () => {
        const newAssignments = {};
        const rawWarnings = [];
        const usedStudents = new Set();
        const currentAnim = animationType;

        tasks.forEach(task => {
            if (task.isGlobal) {
                newAssignments[task.id] = assignments[task.id] || ["", ""];
                return;
            }
            newAssignments[task.id] = [
                lockedSlots[`${task.id}-0`] ? assignments[task.id]?.[0] : null,
                lockedSlots[`${task.id}-1`] ? assignments[task.id]?.[1] : null
            ];
            if (newAssignments[task.id][0]) usedStudents.add(newAssignments[task.id][0].trim());
            if (newAssignments[task.id][1]) usedStudents.add(newAssignments[task.id][1].trim());
        });

        tasks.forEach(task => {
            if (task.isGlobal || task.singleSlot) return;
            [0, 1].forEach(slot => {
                const partner = newAssignments[task.id][slot];
                if (partner) {
                    const buddy = getBuddy(partner);
                    const otherSlot = slot === 0 ? 1 : 0;
                    if (buddy && !newAssignments[task.id][otherSlot] && !usedStudents.has(buddy.trim())) {
                        newAssignments[task.id][otherSlot] = buddy;
                        usedStudents.add(buddy.trim());
                    }
                }
            });
        });

        let availableStudents = shuffleArray(students.filter(s => !usedStudents.has(s.trim())));
        
        const isExcluded = (s1, s2) => {
            if (!s1 || !s2) return false;
            return excludedPairs.some(p => 
                (p[0].trim() === s1.trim() && p[1].trim() === s2.trim()) || 
                (p[0].trim() === s2.trim() && p[1].trim() === s1.trim())
            );
        };
        const wasHereLastWeek = (tid, student) => (history[tid] || []).map(s => s.trim()).includes(student.trim());

        // Bug Fix 1: Bland opgaverne for at undgå bias
        const priorityTasksList = shuffleArray(tasks.filter(t => t.priority && !t.isGlobal));
        const regularTasksList = shuffleArray(tasks.filter(t => !t.priority && !t.isGlobal));

        const doubleSlotTasks = shuffleArray(priorityTasksList.concat(regularTasksList).filter(t => !t.singleSlot));
        doubleSlotTasks.forEach(task => {
            if (newAssignments[task.id][0] || newAssignments[task.id][1]) return;
            const pairCandidateIdx = availableStudents.findIndex(s => {
                const b = getBuddy(s);
                return b && availableStudents.includes(b) && !wasHereLastWeek(task.id, s) && !wasHereLastWeek(task.id, b);
            });
            if (pairCandidateIdx > -1) {
                const s1 = availableStudents[pairCandidateIdx];
                const s2 = getBuddy(s1);
                newAssignments[task.id] = [s1, s2];
                availableStudents = availableStudents.filter(s => s !== s1 && s !== s2);
            }
        });

        priorityTasksList.forEach(task => {
            if (newAssignments[task.id][0]) return;
            let candidates = availableStudents.filter(s => !wasHereLastWeek(task.id, s));
            const individuals = candidates.filter(s => !getBuddy(s));
            if (individuals.length > 0) candidates = individuals;
            let chosen = candidates.length > 0 ? candidates[0] : (availableStudents.length > 0 ? availableStudents[0] : null);
            if (chosen) {
                newAssignments[task.id][0] = chosen;
                availableStudents = availableStudents.filter(s => s !== chosen);
                const b = getBuddy(chosen);
                if (b && !task.singleSlot && !newAssignments[task.id][1] && availableStudents.includes(b)) {
                    newAssignments[task.id][1] = b;
                    availableStudents = availableStudents.filter(s => s !== b);
                }
            }
        });

        priorityTasksList.forEach(task => {
            if (task.singleSlot || newAssignments[task.id][1] || availableStudents.length === 0) return;
            const partner = newAssignments[task.id][0];
            let candidates = availableStudents.filter(s => !isExcluded(s, partner) && !wasHereLastWeek(task.id, s));
            const individuals = candidates.filter(s => !getBuddy(s));
            if (individuals.length > 0) candidates = individuals;
            let chosen = candidates.length > 0 ? candidates[0] : (availableStudents.filter(s => !isExcluded(s, partner)).length > 0 ? availableStudents.filter(s => !isExcluded(s, partner))[0] : null);
            if (chosen) {
                newAssignments[task.id][1] = chosen;
                availableStudents = availableStudents.filter(s => s !== chosen);
            }
        });

        regularTasksList.forEach(task => {
            if (newAssignments[task.id][0]) return;
            let candidates = availableStudents.filter(s => !wasHereLastWeek(task.id, s));
            const individuals = candidates.filter(s => !getBuddy(s));
            if (individuals.length > 0) candidates = individuals;
            let chosen = candidates.length > 0 ? candidates[0] : (availableStudents.length > 0 ? availableStudents[0] : null);
            if (chosen) {
                newAssignments[task.id][0] = chosen;
                availableStudents = availableStudents.filter(s => s !== chosen);
                const b = getBuddy(chosen);
                if (b && !task.singleSlot && !newAssignments[task.id][1] && availableStudents.includes(b)) {
                    newAssignments[task.id][1] = b;
                    availableStudents = availableStudents.filter(s => s !== b);
                }
            }
        });

        regularTasksList.forEach(task => {
            if (task.singleSlot || newAssignments[task.id][1] || availableStudents.length === 0) return;
            const partner = newAssignments[task.id][0];
            let candidates = availableStudents.filter(s => !isExcluded(s, partner) && !wasHereLastWeek(task.id, s));
            const individuals = candidates.filter(s => !getBuddy(s));
            if (individuals.length > 0) candidates = individuals;
            let chosen = candidates.length > 0 ? candidates[0] : (availableStudents.filter(s => !isExcluded(s, partner)).length > 0 ? availableStudents.filter(s => !isExcluded(s, partner))[0] : null);
            if (chosen) {
                newAssignments[task.id][1] = chosen;
                availableStudents = availableStudents.filter(s => s !== chosen);
            }
        });

        tasks.forEach(task => {
            if (task.isGlobal || newAssignments[task.id][0]) return;
            const partner = newAssignments[task.id][1];
            const backupPool = shuffleArray(students).filter(s => s !== partner);
            if (backupPool.length > 0) {
                newAssignments[task.id][0] = backupPool[0];
                rawWarnings.push(`${backupPool[0]} er sat på ${task.name} (genbrug) for at fylde opgaven.`);
            }
        });

        tasks.forEach(t => {
            if (t.isGlobal) return;
            const a = newAssignments[t.id] || [];
            if (a[0] && wasHereLastWeek(t.id, a[0])) rawWarnings.push(`${a[0]} har fået ${t.name} to gange i træk.`);
            if (a[1] && wasHereLastWeek(t.id, a[1])) rawWarnings.push(`${a[1]} har fået ${t.name} to gange i træk.`);
            if (a[0] && a[1] && isExcluded(a[0], a[1])) rawWarnings.push(`${a[0]} og ${a[1]} er sat sammen på ${t.name} trods udelukkelse.`);
        });

        setAssignmentWarnings([...new Set(rawWarnings)]);

        if (currentAnim === 'slot') {
            const taskIds = tasks.map(t => t.id);
            taskIds.forEach((tid, idx) => {
                setTimeout(() => {
                    setAssignments(prev => ({ ...prev, [tid]: newAssignments[tid] }));
                    setTimeout(() => {
                        setShufflingTasks(prev => {
                            const next = new Set(prev);
                            next.delete(tid);
                            return next;
                        });
                        if (idx === taskIds.length - 1) {
                            setActiveEffect('jackpot');
                            setTimeout(() => {
                                setIsShuffling(false);
                                setActiveEffect(null);
                                saveToLocalStorage({ assignments: newAssignments });
                            }, 3000);
                        }
                    }, 1000); 
                }, idx * 500); 
            });
        } else {
            setAssignments(newAssignments);
            saveToLocalStorage({ assignments: newAssignments });
            setIsShuffling(false);
            setActiveEffect(null);
            if (currentAnim === 'magic') {
                setActiveEffect('poof');
                setTimeout(() => setActiveEffect(null), 1000);
            }
        }
    };

    if (useAnimation) {
        setIsShuffling(true);
        let duration = 2500;
        let countInterval = null;

        if (animationType === 'slot') {
            setShufflingTasks(new Set(tasks.map(t => t.id)));
            setAssignments({});
            duration = 2000;
        }

        if (animationType === 'rocket') {
            setActiveEffect('space');
            duration = 4000;
            setCountdown(5);
            countInterval = setInterval(() => {
                setCountdown(prev => (prev !== null && prev > 0 ? prev - 1 : 0));
            }, 600);
        }

        if (animationType === 'ghost') {
            setActiveEffect('spooky');
            const words = ['Bøøøh!', 'Uh-uh...', 'Hvem der?', 'Er her nogen?', 'Gys!', 'Uhyggeligt...', 'Spøgelser!'];
            setSpookyText(words[Math.floor(Math.random() * words.length)]);
            duration = 5000;
        }
        
        const interval = setInterval(() => {
          const animationData = {};
          tasks.forEach(t => {
            if (t.isGlobal) {
                animationData[t.id] = [assignments[t.id]?.[0] || 'ALLE ELEVER', ''];
            } else {
                animationData[t.id] = [0, 1].map(slot => {
                    if (slot === 1 && t.singleSlot) return null;
                    if (lockedSlots[`${t.id}-${slot}`]) return assignments[t.id]?.[slot] || '...';
                    return students[Math.floor(Math.random() * students.length)] || '...';
                });
            }
          });
          setTempNames(animationData);
        }, 80);

        setTimeout(() => { 
            clearInterval(interval); 
            if (countInterval) clearInterval(countInterval);
            performRandomize(); 
            setCountdown(null);
        }, duration);
    } else {
        performRandomize();
    }
  };

  const handleManualAssignment = (taskId, slot, value) => {
    // Bug Fix 2: Tjek for dubletter
    if (value && !autoAllowDuplicates) {
        const isAlreadyAssigned = Object.entries(assignments).some(([tid, names]) => {
            return tid !== taskId && names.some(n => n && n.trim() === value.trim());
        });
        if (isAlreadyAssigned) {
            showToast(`${value} er allerede tildelt en anden opgave!`, "error");
            // Vi tillader det stadig hvis brugeren insisterer (ved at vælge igen), eller vi kan stoppe det.
            // Her vælger jeg at advare men lade dem gøre det.
        }
    }

    let newAssignments = { ...assignments, [taskId]: (assignments[taskId] || [null, null]).map((v, i) => i === slot ? value : v) };
    const task = tasks.find(t => t.id === taskId);
    if (task && !task.singleSlot && !task.isGlobal && value) {
        const buddy = getBuddy(value);
        const otherSlot = slot === 0 ? 1 : 0;
        if (buddy) newAssignments[taskId][otherSlot] = buddy;
    }
    setAssignments(newAssignments);
    saveToLocalStorage({ assignments: newAssignments });
  };

  const toggleLock = (taskId, slot) => {
    const key = `${taskId}-${slot}`;
    const isNowLocked = !lockedSlots[key];
    const newLocks = { ...lockedSlots, [key]: isNowLocked };
    
    const task = tasks.find(t => t.id === taskId);
    if (task && !task.singleSlot && !task.isGlobal) {
        const student = assignments[taskId]?.[slot];
        const buddy = student ? getBuddy(student) : null;
        const otherSlot = slot === 0 ? 1 : 0;
        const otherKey = `${taskId}-${otherSlot}`;
        
        if (isNowLocked && buddy) {
            const currentAssignments = assignments[taskId] || [null, null];
            const updatedAssignments = { ...assignments, [taskId]: currentAssignments.map((s, i) => i === otherSlot ? buddy : s) };
            setAssignments(updatedAssignments);
            newLocks[otherKey] = true;
            saveToLocalStorage({ assignments: updatedAssignments, lockedSlots: newLocks });
        } else if (!isNowLocked && buddy) {
            newLocks[otherKey] = false;
        }
    }
    setLockedSlots(newLocks);
    saveToLocalStorage({ lockedSlots: newLocks });
  };

  const updateTask = (id, fields) => {
    const up = tasks.map(t => t.id === id ? { ...t, ...fields } : t);
    setTasks(up);
    saveToLocalStorage({ tasks: up });
  };

  const moveTask = (id, direction) => {
    const index = tasks.findIndex(t => t.id === id);
    if (index < 0) return;
    const newTasks = [...tasks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newTasks.length) return;
    [newTasks[index], newTasks[targetIndex]] = [newTasks[targetIndex], newTasks[index]];
    setTasks(newTasks);
    saveToLocalStorage({ tasks: newTasks });
  };

  return {
    loading, isShuffling, students, setStudents, tasks, setTasks, assignments, setAssignments,
    lockedSlots, setLockedSlots, history, setHistory, isEditMode, setIsEditMode,
    isEditingClass, setIsEditingClass, showHelp, setShowHelp, assignmentWarnings,
    showWarningsModal, setShowWarningsModal, showHistoryModal, setShowHistoryModal,
    appTitle, setAppTitle, useAnimation, setUseAnimation, animationType, setAnimationType,
    autoAllowDuplicates, setAutoAllowDuplicates, theme, setTheme, highContrast, setHighContrast,
    useSoftCorners, setUseSoftCorners, showPattern, setShowPattern, weekNumber,
    showWeekOnPrint, setShowWeekOnPrint, pairedStudents, setPairedStudents,
    excludedPairs, setExcludedPairs, isAddTaskModalOpen, setIsAddTaskModalOpen,
    newStudentName, setNewStudentName, newTaskName, setNewTaskName, iconPages, setIconPages,
    tempNames, activeEffect, setActiveEffect, countdown, shufflingTasks, toast, showToast,
    spookyText,
    saveToLocalStorage, randomize, handleManualAssignment, toggleLock, updateTask, moveTask,
    getBuddy, getBuddies, getExclusions
  };
};
