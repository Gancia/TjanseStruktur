import React, { useState, useEffect, useRef } from 'react';
import { 
  Wind, Eraser, Droplets, Trash2, BookOpen, Apple, Users, Shuffle, Plus, X, 
  Settings, Layout, Printer, Loader2, Star, Lightbulb, 
  Lock, Unlock, Download, Upload, Users2, Laptop, Sun, Dumbbell, Mic, 
  Bell, Key, Archive, Music, Coffee, Smile, HelpCircle, Calendar, Palette, Eye,
  Layers, CheckCircle2, UserCircle2, Type, Info, MousePointer2, Save,
  Zap, Loader, Sparkles, Heart, Pencil, ChevronUp, ChevronDown, Utensils, 
  Milk, Paintbrush, Scissors, Hammer, Trees, Flower2, Cloud, 
  Thermometer, Gamepad2, Dice5, Puzzle, Monitor, Smartphone, Speaker, Calculator, 
  Languages, Globe, History, Ghost, Rocket, Moon, Footprints, Bike, Bus, Map, 
  Compass, Camera, Video, Mail, Phone, Clock, List, ClipboardCheck, Sticker, 
  Award, Medal, Trophy, Shirt, Search, Library, School, 
  Home, Construction, Wrench, Plug, Battery, Wifi, Volume2, VolumeX, Mic2, Ear, Brain,
  Pizza, Sandwich, IceCream, Candy, Beer, Wine, Cake, 
  Car, Train, Plane, Ship, Anchor, MapPin, Navigation, 
  Target, Swords, Shield, Wand2, FlaskConical, Microscope, 
  Brush, PenTool, Music2, Headphones, Radio,
  Tent, Mountain, Waves, Snowflake, Flame, 
  Cat, Dog, Bird, Fish, Bug,
  Gem, Gift, ShoppingBag, ShoppingCart, CreditCard, 
  Fingerprint, ShieldCheck,
  BatteryCharging, SunMedium, MoonStar,
  Timer, AlarmClock, Hourglass, 
  MessageCircle, MessageSquare, Send, Share2,
  Trash, Edit3, UserPlus, UserMinus, GlassWater, User, AlertCircle, AlertTriangle
} from 'lucide-react';

const LOCAL_STORAGE_KEY = 'tjansestruktur-state-v15';

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
  { id: 'Wind', icon: Wind, label: 'Feje' }, 
  { id: 'Eraser', icon: Eraser, label: 'Aftørring' },
  { id: 'Droplets', icon: Droplets, label: 'Vand' }, 
  { id: 'Trash2', icon: Trash2, label: 'Skrald' },
  { id: 'BookOpen', icon: BookOpen, label: 'Bøger' }, 
  { id: 'Apple', icon: Apple, label: 'Frugt' },
  { id: 'Utensils', icon: Utensils, label: 'Bestik' },
  { id: 'Milk', icon: Milk, label: 'Mælk' },
  { id: 'GlassWater', icon: GlassWater, label: 'Drikke' },
  { id: 'Laptop', icon: Laptop, label: 'IT/PC' }, 
  { id: 'Monitor', icon: Monitor, label: 'Skærm' },
  { id: 'Smartphone', icon: Smartphone, label: 'Mobil' },
  { id: 'Sun', icon: Sun, label: 'Ude' },
  { id: 'Trees', icon: Trees, label: 'Natur' },
  { id: 'Flower2', icon: Flower2, label: 'Blomster' },
  { id: 'Cloud', icon: Cloud, label: 'Vejr' },
  { id: 'Dumbbell', icon: Dumbbell, label: 'Idræt' }, 
  { id: 'Mic', icon: Mic, label: 'Samling' },
  { id: 'Bell', icon: Bell, label: 'Klokke' }, 
  { id: 'Key', icon: Key, label: 'Nøgler' },
  { id: 'Archive', icon: Archive, label: 'Orden' }, 
  { id: 'Music', icon: Music, label: 'Musik' },
  { id: 'Speaker', icon: Speaker, label: 'Lyd' },
  { id: 'Coffee', icon: Coffee, label: 'Køkken' }, 
  { id: 'Smile', icon: Smile, label: 'Trivsel' },
  { id: 'Heart', icon: Heart, label: 'Hjerte' },
  { id: 'Gamepad2', icon: Gamepad2, label: 'Spil' },
  { id: 'Dice5', icon: Dice5, label: 'Terning' },
  { id: 'Puzzle', icon: Puzzle, label: 'Puslespil' },
  { id: 'Paintbrush', icon: Paintbrush, label: 'Male' },
  { id: 'Scissors', icon: Scissors, label: 'Klippe' },
  { id: 'Calculator', icon: Calculator, label: 'Matematik' },
  { id: 'Globe', icon: Globe, label: 'Verden' },
  { id: 'History', icon: History, label: 'Historie' },
  { id: 'Rocket', icon: Rocket, label: 'Raket' },
  { id: 'Footprints', icon: Footprints, label: 'Gåtur' },
  { id: 'Bike', icon: Bike, label: 'Cykel' },
  { id: 'Bus', icon: Bus, label: 'Bus' },
  { id: 'Map', icon: Map, label: 'Kort' },
  { id: 'Camera', icon: Camera, label: 'Foto' },
  { id: 'Clock', icon: Clock, label: 'Tid' },
  { id: 'ClipboardCheck', icon: ClipboardCheck, label: 'Tjekliste' },
  { id: 'Award', icon: Award, label: 'Præmie' },
  { id: 'Trophy', icon: Trophy, label: 'Pokal' },
  { id: 'Shirt', icon: Shirt, label: 'Tøj' },
  { id: 'Lightbulb', icon: Lightbulb, label: 'Ide' },
  { id: 'Search', icon: Search, label: 'Søg' },
  { id: 'School', icon: School, label: 'Skole' },
  { id: 'Home', icon: Home, label: 'Hjem' },
  { id: 'Hammer', icon: Hammer, label: 'Værktøj' },
  { id: 'Wrench', icon: Wrench, label: 'Nøgle' },
  { id: 'Construction', icon: Construction, label: 'Bygge' },
  { id: 'Brain', icon: Brain, label: 'Hjerne' },
  { id: 'Pizza', icon: Pizza, label: 'Pizza' },
  { id: 'Sandwich', icon: Sandwich, label: 'Mad/Pause' },
  { id: 'Cake', icon: Cake, label: 'Fødselsdag' },
  { id: 'Car', icon: Car, label: 'Bil' },
  { id: 'Train', icon: Train, label: 'Tog' },
  { id: 'Plane', icon: Plane, label: 'Fly' },
  { id: 'Ship', icon: Ship, label: 'Skib' },
  { id: 'MapPin', icon: MapPin, label: 'Sted' },
  { id: 'Target', icon: Target, label: 'Mål' },
  { id: 'Swords', icon: Swords, label: 'Kamp' },
  { id: 'Shield', icon: Shield, label: 'Sikkerhed' },
  { id: 'Wand2', icon: Wand2, label: 'Magi' },
  { id: 'FlaskConical', icon: FlaskConical, label: 'Kemi' },
  { id: 'Microscope', icon: Microscope, label: 'Naturfag' },
  { id: 'Headphones', icon: Headphones, label: 'Høretelefoner' },
  { id: 'Radio', icon: Radio, label: 'Radio' },
  { id: 'Tent', icon: Tent, label: 'Lejr' },
  { id: 'Waves', icon: Waves, label: 'Vand/Svømning' },
  { id: 'Snowflake', icon: Snowflake, label: 'Sne' },
  { id: 'Cat', icon: Cat, label: 'Kat' },
  { id: 'Dog', icon: Dog, label: 'Hund' },
  { id: 'Bird', icon: Bird, label: 'Fugl' },
  { id: 'Bug', icon: Bug, label: 'Insekt' },
  { id: 'Gem', icon: Gem, label: 'Skat' },
  { id: 'Gift', icon: Gift, label: 'Gave' },
  { id: 'Timer', icon: Timer, label: 'Timer' },
  { id: 'AlarmClock', icon: AlarmClock, label: 'Vækkeur' },
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
  const [activeEffect, setActiveEffect] = useState(null); // 'poof', 'space', 'spooky'
  
  const ICONS_PER_PAGE = 24;

  const getIconPage = (iconId) => {
    const index = AVAILABLE_ICONS.findIndex(i => i.id === iconId);
    return Math.floor(Math.max(0, index) / ICONS_PER_PAGE);
  };

  const [toast, setToast] = useState(null);
  const toastTimeoutRef = useRef(null);

  const showToast = (message, type = 'success') => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToast({ message, type });
    toastTimeoutRef.current = setTimeout(() => setToast(null), 3000);
  };

  const handleToggleEditMode = () => {
    if (!isEditMode) {
      const initialPages = {};
      tasks.forEach(t => { initialPages[t.id] = getIconPage(t.icon); });
      setIconPages(initialPages);
    }
    setIsEditMode(!isEditMode);
  };
  
  const fileInputRef = useRef(null);
  const c = THEME_COLORS[theme] || THEME_COLORS.ocean;

  const getBuddies = (student) => {
    const name = student ? student.trim() : "";
    return pairedStudents.filter(p => p.map(s => s.trim()).includes(name)).map(p => p.find(s => s.trim() !== name));
  };

  const getBuddy = (student) => {
    const name = student ? student.trim() : "";
    const pair = pairedStudents.find(p => p.map(s => s.trim()).includes(name));
    return pair ? pair.find(s => s.trim() !== name) : null;
  };

  const getExclusions = (student) => {
    const name = student ? student.trim() : "";
    return excludedPairs.filter(p => p.map(s => s.trim()).includes(name)).map(p => p.find(s => s.trim() !== name));
  };

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    const currentWeek = getISOWeek().toString();
    
    if (saved) {
      try {
        const data = JSON.parse(saved);
        let loadedHistory = data.history || {};
        
        // Hvis ugen er skiftet, arkiver nuværende tildelinger til historik
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
          // Opdater localStorage med den nye arkiverede historik med det samme
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

  const loadDefaults = () => {
    setTasks([
      { id: '1', name: 'Feje gulv', icon: 'Wind', priority: true, isGlobal: false, role1: 'Fejer', role2: 'Samler op', goal: 'Ingen krummer under bordene' },
      { id: '2', name: 'Tørre borde af', icon: 'Eraser', priority: true, isGlobal: false, role1: 'Vasker', role2: 'Tørrer efter', goal: 'Bordene er tørre og rene' },
      { id: '3', name: 'Sætte PC i skab', icon: 'Laptop', priority: false, isGlobal: true, goal: 'Alle computere i stik' },
    ]);
    setStudents(['Sofie', 'Lukas', 'Emma', 'Noah', 'Ida', 'Victor', 'Maja', 'Oliver']);
    setAssignments({});
    setPairedStudents([]);
    setExcludedPairs([]);
  };

  const saveToLocalStorage = (newData) => {
    const currentState = { students, tasks, assignments, history, lockedSlots, showWeekOnPrint, theme, highContrast, useSoftCorners, showPattern, appTitle, useAnimation, animationType, autoAllowDuplicates, weekNumber, pairedStudents, excludedPairs };
    if (newData.students) newData.students = newData.students.map(s => s.trim());
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ ...currentState, ...newData }));
  };

  const exportData = () => {
    const data = { students, tasks, assignments, history, lockedSlots, showWeekOnPrint, theme, highContrast, useSoftCorners, showPattern, appTitle, useAnimation, animationType, autoAllowDuplicates, weekNumber, pairedStudents, excludedPairs };
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
        setStudents((data.students || []).map(s => s.trim()));
        setTasks(data.tasks || []);
        setAssignments(data.assignments || {});
        setHistory(data.history || {});
        setLockedSlots(data.lockedSlots || {});
        setAppTitle(data.appTitle || 'Tjansestruktur');
        setTheme(data.theme || 'ocean');
        setPairedStudents(data.pairedStudents || []);
        setExcludedPairs(data.excludedPairs || []);
        saveToLocalStorage(data);
        showToast("Data genoprettet!");
      } catch (err) { showToast("Fejl ved indlæsning.", "error"); }
    };
    reader.readAsText(file);
  };

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

        // Gem den aktuelle animationstype så vi ved hvilken effekt vi skal køre til slut
        const currentAnim = animationType;

        // 1. Initialiser og find manuelt låste elever
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

        // 2. Tvungen makker-logik for låste pladser
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

        // Bland opgaverne internt i prioritet for at undgå 'Opgave 1'-bias
        const priorityTasks = shuffleArray(tasks.filter(t => t.priority));
        const regularTasks = shuffleArray(tasks.filter(t => !t.priority));
        const sortedTasks = [...priorityTasks, ...regularTasks];

        // 4. Tildel par til ledige dobbelt-tjanser (Bland her for at undgå at par altid får prioriterede opgaver)
        const doubleSlotTasks = shuffleArray(tasks.filter(t => !t.isGlobal && !t.singleSlot));
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

        // 5. Fyld Vigtige opgaver (Sørg for at de får begge pladser før almindelige får deres første)
        const priorityTasksList = tasks.filter(t => t.priority && !t.isGlobal);
        const regularTasksList = tasks.filter(t => !t.priority && !t.isGlobal);

        // A. Fyld Vigtige - Slot 0
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

        // B. Fyld Vigtige - Slot 1 (Hvis de stadig mangler en makker)
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

        // 6. Fyld Almindelige opgaver - Slot 0
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

        // 7. Fyld Almindelige opgaver - Slot 1
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

        // 8. Fallback genbrug
        sortedTasks.forEach(task => {
            if (task.isGlobal || newAssignments[task.id][0]) return;
            const partner = newAssignments[task.id][1];
            const backupPool = shuffleArray(students).filter(s => s !== partner);
            if (backupPool.length > 0) {
                newAssignments[task.id][0] = backupPool[0];
                rawWarnings.push(`${backupPool[0]} er sat på ${task.name} (genbrug) for at fylde opgaven.`);
            }
        });

        // Opdater historik-stat og warnings
        const updatedHistory = { ...history };
        tasks.forEach(t => {
            if (t.isGlobal) return;
            const a = newAssignments[t.id] || [];
            if (a[0] && wasHereLastWeek(t.id, a[0])) rawWarnings.push(`${a[0]} har fået ${t.name} to gange i træk.`);
            if (a[1] && wasHereLastWeek(t.id, a[1])) rawWarnings.push(`${a[1]} har fået ${t.name} to gange i træk.`);
            if (a[0] && a[1] && isExcluded(a[0], a[1])) rawWarnings.push(`${a[0]} og ${a[1]} er sat sammen på ${t.name} trods udelukkelse.`);
        });

        setAssignments(newAssignments);
        setAssignmentWarnings([...new Set(rawWarnings)]);
        saveToLocalStorage({ assignments: newAssignments, history: history });
        setIsShuffling(false);
        setActiveEffect(null);

        // Trigger 'Puff' effekt hvis det var magi
        if (currentAnim === 'magic') {
            setActiveEffect('poof');
            setTimeout(() => setActiveEffect(null), 1000);
        }
    };

    if (useAnimation) {
        setIsShuffling(true);
        if (animationType === 'rocket') setActiveEffect('space');
        
        const interval = setInterval(() => {
          const animationData = {};
          tasks.forEach(t => {
            if (t.isGlobal) {
                animationData[t.id] = [assignments[t.id]?.[0] || 'ALLE ELEVER', ''];
            } else {
                animationData[t.id] = [0, 1].map(slot => {
                    if (slot === 1 && t.singleSlot) return null;
                    if (lockedSlots[`${t.id}-${slot}`]) return assignments[t.id]?.[slot] || '...';
                    const randS = students[Math.floor(Math.random() * students.length)];
                    return randS || '...';
                });
            }
          });
          setTempNames(animationData);
        }, 80);
        setTimeout(() => { clearInterval(interval); performRandomize(); }, 2500);
    } else {
        performRandomize();
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const updateTask = (id, fields) => {
    const up = tasks.map(t => t.id === id ? { ...t, ...fields } : t);
    setTasks(up);
    saveToLocalStorage({ tasks: up });
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
            // Hvis man låser op, så lås også makkeren op
            newLocks[otherKey] = false;
        }
    }
    
    setLockedSlots(newLocks);
    saveToLocalStorage({ lockedSlots: newLocks });
  };

  const handleManualAssignment = (taskId, slot, value) => {
    let newAssignments = { ...assignments, [taskId]: (assignments[taskId] || [null, null]).map((v, i) => i === slot ? value : v) };
    
    const task = tasks.find(t => t.id === taskId);
    if (task && !task.singleSlot && !task.isGlobal && value) {
        const buddy = getBuddy(value);
        const otherSlot = slot === 0 ? 1 : 0;
        if (buddy) {
            newAssignments[taskId][otherSlot] = buddy;
        }
    }
    
    setAssignments(newAssignments);
    saveToLocalStorage({ assignments: newAssignments });
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

  const renderIcon = (iconId, size = 32) => {
    const iconObj = AVAILABLE_ICONS.find(i => i.id === iconId);
    const IconComp = iconObj ? iconObj.icon : Layout;
    return <IconComp size={size} />;
  };

  if (loading) return <div className="flex h-screen items-center justify-center text-slate-500 animate-spin"><Loader2 size={48} /></div>;

  const roundClass = useSoftCorners ? 'rounded-3xl' : 'rounded-none';
  const buttonRoundClass = useSoftCorners ? 'rounded-xl' : 'rounded-none';

  return (
      <div className={`min-h-screen p-4 md:p-8 font-sans transition-colors duration-500 ${theme === 'night' ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'} ${showPattern ? 'bg-dot-pattern' : ''} ${activeEffect === 'space' ? 'bg-slate-950 overflow-hidden' : ''}`}>
      
      {/* Visual Overlays */}
      {activeEffect === 'poof' && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center pointer-events-none">
              <div className="animate-poof flex flex-col items-center">
                  <div className="w-64 h-64 bg-slate-300 rounded-full blur-3xl opacity-50" />
                  <span className="text-8xl font-black text-amber-500 drop-shadow-2xl -mt-48 select-none tracking-tighter">PUFF!</span>
              </div>
          </div>
      )}

      {activeEffect === 'space' && (
          <div className="fixed inset-0 z-[250] pointer-events-none overflow-hidden">
              {[...Array(50)].map((_, i) => (
                  <div key={i} className="absolute bg-white rounded-full animate-star" style={{
                      width: Math.random() * 3 + 'px',
                      height: Math.random() * 3 + 'px',
                      left: Math.random() * 100 + '%',
                      top: Math.random() * 100 + '%',
                      animationDelay: Math.random() * 2 + 's'
                  }} />
              ))}
          </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .bg-dot-pattern { background-image: radial-gradient(#94a3b8 1px, transparent 1px); background-size: 20px 20px; }
        @media print {
            * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
            ${showPattern ? '.bg-dot-pattern { background-image: radial-gradient(#64748b 1px, transparent 1px) !important; background-size: 20px 20px !important; background-repeat: repeat !important; }' : ''}
            body { background-color: ${theme === 'night' ? '#0f172a' : '#f8fafc'} !important; color: ${theme === 'night' ? 'white' : 'black'} !important; padding: 0 !important; margin: 0 !important; }
            .no-print { display: none !important; }
            .print-grid { display: grid !important; grid-template-columns: repeat(2, 1fr) !important; gap: 1rem !important; width: 100% !important; }
            .print-card { 
                border: ${highContrast ? '4px solid black' : `2px solid ${c.hex}44`} !important; 
                break-inside: avoid; 
                background-color: ${theme === 'night' ? '#1e293b' : 'white'} !important; 
                border-radius: ${useSoftCorners ? '1.5rem' : '0'} !important;
                box-shadow: none !important;
            }
            .print-card-header { background-color: ${c.lightHex} !important; border-bottom: ${highContrast ? '4px solid black' : '1px solid #e2e8f0'} !important; }
            .print-student-name { border: ${highContrast ? '4px solid black' : '2px solid #e2e8f0'} !important; background-color: ${theme === 'night' ? '#334155' : '#f8fafc'} !important; color: ${theme === 'night' ? 'white' : 'black'} !important; font-weight: ${highContrast ? '900' : 'bold'} !important; }
        }
        @keyframes softFade { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
        .animate-soft-fade { animation: softFade 0.5s ease-out forwards; }
        @keyframes calmPulse { 0% { opacity: 0.4; transform: scale(0.98); } 50% { opacity: 0.8; transform: scale(1); } 100% { opacity: 0.4; transform: scale(0.98); } }
        .animate-calm-pulse { animation: calmPulse 1.5s infinite ease-in-out; }
        @keyframes rocket { 0% { transform: translateY(0) rotate(0); } 10% { transform: translateY(-2px) rotate(-5deg); } 20% { transform: translateY(0) rotate(5deg); } 80% { transform: translateY(-10px); opacity: 1; } 100% { transform: translateY(-30px); opacity: 0; } }
        .animate-rocket { animation: rocket 0.6s infinite; }
        @keyframes dice { 0% { transform: rotate(0) scale(1); } 25% { transform: rotate(90deg) scale(1.1); } 50% { transform: rotate(180deg) scale(1); } 75% { transform: rotate(270deg) scale(1.1); } 100% { transform: rotate(360deg) scale(1); } }
        .animate-dice { animation: dice 0.5s infinite linear; }
        @keyframes ghost { 0% { opacity: 0.3; filter: blur(3px); transform: scale(0.9); } 50% { opacity: 0.7; filter: blur(0); transform: scale(1.05); } 100% { opacity: 0.3; filter: blur(3px); transform: scale(0.9); } }
        .animate-ghost { animation: ghost 1s infinite ease-in-out; }
        @keyframes magic { 0% { transform: scale(0.8) rotate(0); filter: hue-rotate(0deg) drop-shadow(0 0 5px #fbbf24); } 50% { transform: scale(1.2) rotate(180deg); filter: hue-rotate(180deg) drop-shadow(0 0 15px #f472b6); } 100% { transform: scale(0.8) rotate(360deg); filter: hue-rotate(360deg) drop-shadow(0 0 5px #fbbf24); } }
        .animate-magic { animation: magic 0.8s infinite linear; }
        @keyframes slotRoll { 0% { transform: translateY(0); } 100% { transform: translateY(-50%); } }
        .animate-slot-roll { animation: slotRoll 0.2s infinite linear; }
        @keyframes poof { 0% { transform: scale(0.5); opacity: 0; } 50% { transform: scale(1.2); opacity: 1; } 100% { transform: scale(1.5); opacity: 0; } }
        .animate-poof { animation: poof 0.6s ease-out forwards; }
        @keyframes starTwinkle { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
        .animate-star { animation: starTwinkle 1.5s infinite ease-in-out; }
        @keyframes spookyFloat { 0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; } 25% { transform: translate(10px, -10px) scale(1.1); opacity: 0.8; } 75% { transform: translate(-10px, 10px) scale(0.9); opacity: 0.4; } }
        .animate-spooky { animation: spookyFloat 2s infinite ease-in-out; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .theme-night .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; }
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
          {assignmentWarnings.length > 0 && (
              <button 
                onClick={() => setShowWarningsModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-xl text-[10px] font-black uppercase border border-amber-200 animate-soft-fade shadow-sm hover:bg-amber-100 transition-all"
              >
                  <Info size={14} /> OBS ({assignmentWarnings.length})
              </button>
          )}
          <button onClick={() => setShowHistoryModal(true)} className={`flex items-center gap-2 px-4 py-2 bg-white ${c.text} border ${c.border} ${buttonRoundClass} font-bold hover:bg-slate-50 transition-all shadow-sm`}>
            <History size={20} /> Sidste uge
          </button>
          <button onClick={() => setShowHelp(true)} className={`flex items-center gap-2 px-4 py-2 bg-white text-slate-500 border border-slate-200 ${buttonRoundClass} font-medium hover:bg-slate-50 transition-all shadow-sm`}>
            <HelpCircle size={20} /> Vejledning
          </button>
          <button onClick={handlePrint} className={`flex items-center gap-2 px-4 py-2 ${c.primary} text-white ${buttonRoundClass} font-medium ${c.hover} shadow-md transition-all active:scale-95`}>
            <Printer size={20} /> Print
          </button>
          <button onClick={handleToggleEditMode} className={`flex items-center gap-2 px-4 py-2 transition-all shadow-md ${isEditMode ? `${c.primary} text-white` : `bg-white ${c.text} border ${c.border} hover:bg-slate-50`} ${buttonRoundClass} font-medium`}>
            <Settings size={20} /> {isEditMode ? 'Færdig' : 'Indstillinger'}
          </button>
          <button onClick={randomize} disabled={isShuffling} className={`flex items-center gap-2 px-4 py-2 ${buttonRoundClass} font-medium shadow-md transition-all active:scale-95 ${isShuffling ? 'bg-slate-400' : 'bg-emerald-500 hover:bg-emerald-600'} text-white`}>
            {isShuffling ? <Loader2 className="animate-spin" size={20} /> : <Shuffle size={20} />} Bland elever
          </button>
        </div>
      </div>

      {showHelp && (
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
                          <h3 className="font-black text-lg flex items-center gap-2 text-slate-800 border-b-2 pb-2 border-slate-200"><Lightbulb size={20} className="text-amber-500"/> Pædagogiske Tanker & Valg</h3>
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
                                  <p className="text-xs text-slate-500 leading-relaxed">Farvetemaer og valg af former hjælper med at skabe de skarpe og forudsigelige rammer, som mange elever trives bedst med.</p>
                              </div>
                          </div>
                      </section>

                      <button onClick={() => setShowHelp(false)} className={`w-full ${c.primary} text-white font-bold py-4 ${buttonRoundClass} hover:opacity-90 transition-all shadow-lg flex items-center justify-center gap-2`}>
                          <CheckCircle2 size={20}/> Forstået
                      </button>
                  </div>
              </div>
          </div>
      )}

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6 print-grid">
          {tasks.map((task) => (
            <div key={task.id} className={`${theme === 'night' ? 'bg-slate-800 text-white' : 'bg-white'} ${roundClass} shadow-sm ${highContrast ? 'border-4 border-black' : `border-2 ${task.isGlobal ? c.border : task.priority ? 'border-amber-200' : 'border-slate-100'}`} overflow-hidden flex flex-col transition-all duration-300 relative print-card`}>
              <div className={`p-4 flex ${isEditMode ? 'flex-col items-stretch gap-4' : 'items-center justify-between'} ${task.isGlobal ? c.light : task.priority ? 'bg-amber-50/50' : c.light} print-card-header`}>
                <div className={`flex items-center gap-4 ${isEditMode ? 'w-full' : 'flex-1'}`}>
                  {isEditMode && (
                    <div className="flex flex-col gap-0.5 no-print mr-1">
                      <button onClick={() => moveTask(task.id, 'up')} className="text-slate-400 hover:text-indigo-500 transition-colors p-0.5"><ChevronUp size={16} /></button>
                      <button onClick={() => moveTask(task.id, 'down')} className="text-slate-400 hover:text-indigo-500 transition-colors p-0.5"><ChevronDown size={16} /></button>
                    </div>
                  )}
                  <div 
                    className={`p-3 bg-white rounded-xl ${c.text} shadow-sm print-icon ${highContrast ? 'border-2 border-black' : ''}`}
                  >
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
                    <button onClick={() => { if(confirm('Slet tjans?')) setTasks(tasks.filter(t => t.id !== task.id)); }} className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-[10px] font-bold uppercase text-red-400 hover:bg-red-50 transition-all" title="Slet">
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
                        <input type="text" value={assignments[task.id]?.[0] || ""} onChange={(e) => { const up = {...assignments, [task.id]: [e.target.value, ""]}; setAssignments(up); saveToLocalStorage({assignments: up}); }} placeholder="Skriv her..." className={`w-full p-4 ${c.light} ${buttonRoundClass} border-2 border-dashed ${c.border} text-center text-xl font-black ${c.text} tracking-widest focus:outline-none no-print ${highContrast ? 'border-black border-solid' : ''}`} />
                        <div className={`hidden print-student-name p-3 border-2 border-dashed ${c.border} ${buttonRoundClass} ${c.light} text-center font-black text-2xl min-h-[50px] flex items-center justify-center ${c.text} ${highContrast ? 'border-black border-solid text-black' : ''}`}>{assignments[task.id]?.[0] || "ALLE ELEVER"}</div>
                    </div>
                ) : (
                    [0, 1].filter(slot => slot === 0 || !task.singleSlot).map((slot) => {
                        const s = isShuffling ? tempNames[task.id]?.[slot] : assignments[task.id]?.[slot];
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
                                ? (lock ? 'bg-emerald-50 border-emerald-200 text-emerald-800 font-bold' : (animationType === 'spinner' ? 'bg-slate-50 border-slate-200' : animationType === 'pulse' ? 'bg-indigo-50 border-indigo-200 animate-calm-pulse' : 'bg-slate-100 border-slate-200'))
                                : s ? `bg-emerald-50 border-emerald-200 text-emerald-800 font-bold ${animationType === 'fade' ? 'animate-soft-fade' : ''}` 
                                : `${theme === 'night' ? 'bg-slate-700 border-slate-600' : 'bg-slate-50 border-slate-200'} border-dashed text-slate-400`
                              } ${lock ? `border-indigo-300` : ''} ${highContrast ? 'border-black border-solid' : ''}`}>
                                {isShuffling && !lock ? (
                                    animationType === 'spinner' ? <Loader2 className="animate-spin text-indigo-400" size={18} /> : 
                                    animationType === 'classic' ? <span className="text-indigo-600 font-bold">{s}</span> :
                                    animationType === 'rocket' ? <div className="flex flex-col items-center"><Rocket className="animate-rocket text-white" size={24} /><span className="text-[8px] mt-1 text-white font-black uppercase tracking-tighter">Launching...</span></div> :
                                    animationType === 'dice' ? (
                                        <div className="h-8 overflow-hidden relative w-full flex items-center justify-center">
                                            <div className="animate-slot-roll flex flex-col items-center gap-2">
                                                {students.slice(0, 5).map((st, idx) => <span key={idx} className="text-xs font-black text-emerald-600 uppercase">{st}</span>)}
                                                {students.slice(0, 5).map((st, idx) => <span key={idx+'_2'} className="text-xs font-black text-emerald-600 uppercase">{st}</span>)}
                                            </div>
                                        </div>
                                    ) :
                                    animationType === 'ghost' ? <div className="flex flex-col items-center relative"><Ghost className="animate-spooky text-slate-300" size={24} /><span className="absolute -top-2 -right-4 text-[10px] font-black text-slate-400 animate-bounce">BOO!</span><span className="text-[10px] mt-1 text-slate-500 font-bold blur-[0.5px]">{s}</span></div> :
                                    animationType === 'magic' ? <div className="flex flex-col items-center"><Wand2 className="animate-magic" size={24} style={{ color: '#fbbf24' }} /><span className="text-[8px] mt-1 text-amber-500 font-black uppercase">Abracadabra...</span></div> :
                                    animationType === 'pulse' ? <Heart className="animate-calm-pulse text-rose-400" size={24} /> :
                                    animationType === 'fade' ? <Sparkles className="animate-pulse text-sky-400" size={24} /> :
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
          ))}
          {isEditMode && (
             <div onClick={() => setIsAddTaskModalOpen(true)} className={`border-4 border-dashed ${c.border} ${roundClass} p-8 flex flex-col items-center justify-center ${c.light} opacity-60 no-print hover:opacity-100 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]`}>
                <Plus size={48} className={c.text} />
                <span className={`mt-2 font-black uppercase tracking-widest ${c.text}`}>Tilføj ny tjans</span>
             </div>
          )}
        </div>

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
                                <div className="grid grid-cols-2 gap-1 ml-6">
                                    {[
                                        {id: 'classic', icon: Zap, label: 'Flimmer'},
                                        {id: 'spinner', icon: Loader, label: 'Spinner'},
                                        {id: 'fade', icon: Sparkles, label: 'Indfase'},
                                        {id: 'pulse', icon: Heart, label: 'Puls'},
                                        {id: 'rocket', icon: Rocket, label: 'Raket'},
                                        {id: 'dice', icon: Dice5, label: 'Tromle'},
                                        {id: 'ghost', icon: Ghost, label: 'Spøgelse'},
                                        {id: 'magic', icon: Wand2, label: 'Magi'}
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
      </div>

      {/* History Modal */}
      {showHistoryModal && (
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
                          <button onClick={() => { if(confirm('Vil du slette al historik? Dette kan ikke fortrydes.')) { setHistory({}); saveToLocalStorage({history: {}}); } }} className="text-xs text-red-400 hover:text-red-600 font-bold uppercase tracking-wider">Nulstil historik</button>
                          <button onClick={() => setShowHistoryModal(false)} className={`py-3 px-8 ${c.primary} text-white font-bold ${buttonRoundClass} hover:opacity-90 transition-all shadow-lg`}>Luk</button>
                      </div>
                  </div>
              </div>
          </div>
      )}

      {isAddTaskModalOpen && (
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
      )}

      {/* Assignment Info Modal */}
      {showWarningsModal && (
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
      )}

      {/* Toast Notification */}
      {toast && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] no-print animate-soft-fade">
              <div className={`px-6 py-3 rounded-2xl shadow-2xl border-2 flex items-center gap-3 ${
                  toast.type === 'error' ? 'bg-red-50 border-red-200 text-red-700' : 'bg-white border-slate-200 text-slate-700'
              }`}>
                  {toast.type === 'error' ? <AlertCircle size={20} /> : <CheckCircle2 className={c.text} size={20} />}
                  <span className="font-bold text-sm">{toast.message}</span>
              </div>
          </div>
      )}

    </div>
  );
};

export default App;