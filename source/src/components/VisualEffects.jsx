import React from 'react';
import { Ghost, Rocket, Gift, Snowflake, Star, Sparkles, Bell } from 'lucide-react';

const seeded = (i, salt = 1) => {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

const VisualEffects = ({ activeEffect, countdown, spookyText, christmasText, students, assignments, tasks, shufflingTasks, tempNames }) => {
  if (!activeEffect) return null;

  return (
    <>
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

      {activeEffect === 'spooky' && (
        <div className="fixed inset-0 z-[350] pointer-events-none overflow-hidden bg-slate-950/90 backdrop-blur-[1px]">
          <div className="absolute inset-0 animate-lightning" />
          <div className="moon-container">
            <div className="full-moon" />
            <div className="moon-ghosts">
              <div className="moon-ghost moon-ghost-1"><Ghost size={24} className="text-slate-100/30 filter blur-[1px]" /></div>
              <div className="moon-ghost moon-ghost-2"><Ghost size={20} className="text-slate-100/20 filter blur-[2px]" /></div>
              <div className="moon-ghost moon-ghost-3"><Ghost size={28} className="text-slate-100/25 filter blur-[1.5px]" /></div>
              <div className="moon-ghost moon-ghost-4"><Ghost size={22} className="text-slate-100/15 filter blur-[2.5px]" /></div>
            </div>
          </div>

          {[...Array(150)].map((_, i) => (
            <div key={i} className="rain-drop" style={{
              left: Math.random() * 100 + '%',
              top: '-10vh',
              animationDelay: '-' + (Math.random() * 2) + 's',
              animationDuration: (0.4 + Math.random() * 0.3) + 's',
              opacity: 0.1 + Math.random() * 0.3
            }} />
          ))}

          {[...Array(3)].map((_, i) => (
            <div key={i} className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-slate-100/10 to-transparent animate-fog" style={{
              animationDelay: i * 2 + 's',
              animationDuration: (6 + i * 2) + 's',
              bottom: (i * -20) + 'px',
              filter: `blur(${10 + i * 10}px)`
            }} />
          ))}

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center animate-spooky-float">
              <Ghost size={160} className="text-slate-200/10 filter blur-[2px]" />
              {spookyText && (
                <span className="text-5xl font-black text-slate-100/10 uppercase tracking-[0.3em] mt-8 italic animate-ghost-text">
                  {spookyText}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {activeEffect === 'jackpot' && (
        <div className="fixed inset-0 z-[400] pointer-events-none overflow-hidden flex items-center justify-center">
          {[...Array(80)].map((_, i) => {
            const isGold = Math.random() > 0.4;
            const angle = (Math.random() * Math.PI) + Math.PI; 
            const force = 200 + Math.random() * 400;
            const tx = Math.cos(angle) * force + 'px';
            const ty = (Math.sin(angle) * force - 100) + 'px';
            const dur = (2 + Math.random() * 2) + 's';
            return (
              <div key={i} className={`coin ${isGold ? 'coin-gold' : 'coin-silver'} animate-coin-fountain`} style={{ 
                '--tx': tx, 
                '--ty': ty,
                '--dur': dur,
                animationDelay: (Math.random() * 1) + 's'
              }}>
                {isGold ? 'kr' : '€'}
              </div>
            );
          })}
          <div className="animate-winner-text flex flex-col items-center">
            <span className="text-8xl md:text-9xl font-black text-amber-500 tracking-tighter uppercase drop-shadow-[0_0_30px_rgba(251,191,36,0.8)] italic">JACKPOT!</span>
          </div>
        </div>
      )}
      {activeEffect === 'christmas' && (
        <div className="fixed inset-0 z-[350] pointer-events-none overflow-hidden bg-gradient-to-b from-slate-950/90 via-indigo-950/80 to-emerald-950/85 backdrop-blur-[1px]">
          {/* Nordlys (Aurora Borealis) */}
          <div className="absolute -top-10 -left-1/4 w-[150%] h-56 animate-aurora-1" />
          <div className="absolute top-12 -left-1/4 w-[150%] h-48 animate-aurora-2" />

          {/* Blinkende julelys-guirlande langs toppen */}
          <div className="absolute top-0 left-0 right-0 flex justify-around items-start px-2 z-30">
            {[...Array(24)].map((_, i) => {
              const bulbColors = [
                'bg-red-500 shadow-[0_0_16px_#ef4444]',
                'bg-amber-300 shadow-[0_0_16px_#fcd34d]',
                'bg-emerald-400 shadow-[0_0_16px_#34d399]',
                'bg-sky-400 shadow-[0_0_16px_#38bdf8]',
              ];
              return (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-0.5 h-3 bg-emerald-900" />
                  <div
                    className={`w-3.5 h-5 rounded-full christmas-bulb ${bulbColors[i % bulbColors.length]}`}
                    style={{ animationDelay: `${(i % 4) * 0.22}s` }}
                  />
                </div>
              );
            })}
          </div>

          {/* Funklende stjernehimmel */}
          {[...Array(45)].map((_, i) => (
            <div
              key={`star-${i}`}
              className="absolute bg-amber-100 rounded-full animate-star"
              style={{
                width: (1.5 + seeded(i, 1) * 2.5) + 'px',
                height: (1.5 + seeded(i, 1) * 2.5) + 'px',
                left: (seeded(i, 2) * 100) + '%',
                top: (seeded(i, 3) * 55) + '%',
                animationDelay: (seeded(i, 4) * 2) + 's',
              }}
            />
          ))}

          {/* Stor Julestjerne øverst til højre */}
          <div className="absolute top-14 right-12 z-20 animate-christmas-star">
            <Star size={72} className="text-amber-300 fill-amber-200" />
          </div>

          {/* Julemandens kane & Rudolf der flyver over himlen */}
          <div className="absolute top-8 left-0 z-25 animate-sleigh-fly">
            <svg width="260" height="80" viewBox="0 0 260 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_12px_rgba(251,191,36,0.6)]">
              <circle cx="15" cy="52" r="2.5" fill="#fde047" opacity="0.8" />
              <circle cx="28" cy="48" r="2" fill="#fbbf24" opacity="0.6" />
              <circle cx="8" cy="45" r="1.5" fill="#fef08a" opacity="0.7" />
              <path d="M35 55 Q45 66 85 62 L95 58" stroke="#fbbf24" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M40 42 L82 42 L76 56 L44 56 Z" fill="#dc2626" stroke="#fbbf24" strokeWidth="2" />
              <circle cx="52" cy="36" r="8" fill="#15803d" />
              <circle cx="68" cy="34" r="7" fill="#dc2626" />
              <circle cx="68" cy="25" r="5" fill="#fde68a" />
              <path d="M63 23 L68 15 L74 23 Z" fill="#dc2626" />
              <circle cx="68" cy="14" r="2.2" fill="#ffffff" />
              <path d="M82 44 Q120 48 160 40 L215 36" stroke="#fde047" strokeWidth="1.2" opacity="0.85" />
              <ellipse cx="165" cy="42" rx="12" ry="6" fill="#92400e" />
              <circle cx="177" cy="35" r="4.5" fill="#92400e" />
              <path d="M176 31 L173 23 M178 31 L182 23" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M157 47 L153 56 M172 47 L176 56" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />
              <ellipse cx="212" cy="38" rx="13" ry="6.5" fill="#b45309" />
              <circle cx="225" cy="31" r="5" fill="#b45309" />
              <path d="M224 26 L220 17 M226 26 L231 17" stroke="#fbbf24" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M204 43 L199 53 M219 43 L224 53" stroke="#92400e" strokeWidth="2" strokeLinecap="round" />
              <circle cx="231" cy="31" r="3.5" fill="#ef4444" className="animate-rudolph-nose" />
            </svg>
          </div>

          {/* Kæmpe Snestorm (snefnug + lucide Snowflakes) */}
          {[...Array(110)].map((_, i) => {
            const isIcon = i % 5 === 0;
            const size = isIcon ? 12 + seeded(i, 5) * 14 : 3 + seeded(i, 5) * 6;
            return (
              <div
                key={`snow-${i}`}
                className="snowflake-particle"
                style={{
                  left: (seeded(i, 6) * 100) + '%',
                  '--snow-dur': (2.6 + seeded(i, 7) * 3.2) + 's',
                  '--snow-sway': ((seeded(i, 8) - 0.5) * 80) + 'px',
                  '--snow-opacity': 0.5 + seeded(i, 9) * 0.5,
                  animationDelay: '-' + (seeded(i, 10) * 5) + 's',
                }}
              >
                {isIcon ? (
                  <Snowflake size={size} className="text-sky-100/80 drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]" />
                ) : (
                  <div
                    className="rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                    style={{ width: size + 'px', height: size + 'px' }}
                  />
                )}
              </div>
            );
          })}

          {/* Center Julemagi-badge */}
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="flex flex-col items-center text-center px-6">
              <div className="flex items-center gap-5 mb-4">
                <Bell size={44} className="text-amber-300 animate-gift-jiggle drop-shadow-[0_0_15px_rgba(251,191,36,0.9)]" />
                <Gift size={84} className="text-red-500 fill-red-600/30 animate-gift-jiggle drop-shadow-[0_0_25px_rgba(239,68,68,0.9)]" />
                <Sparkles size={44} className="text-emerald-300 animate-pulse drop-shadow-[0_0_15px_rgba(52,211,153,0.9)]" />
              </div>
              <span className="text-5xl md:text-7xl font-black text-amber-300 uppercase tracking-wider animate-christmas-text select-none">
                {christmasText || 'GLÆDELIG JUL!'}
              </span>
              <span className="mt-3 text-sm md:text-base font-black uppercase tracking-[0.35em] text-emerald-200/90 drop-shadow">
                Nisserne fordeler tjanserne...
              </span>
            </div>
          </div>

          {/* Vinterlandskab med juletræer i bunden */}
          <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white/90 via-sky-100/70 to-transparent z-10" />
          <div className="absolute bottom-2 left-6 flex items-end gap-4 z-20 opacity-90">
            <div className="w-0 h-0 border-l-[24px] border-l-transparent border-r-[24px] border-r-transparent border-b-[56px] border-b-emerald-700 relative">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500 absolute -left-2 top-8 shadow-[0_0_8px_#ef4444]" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-300 absolute left-1 top-10 shadow-[0_0_8px_#fcd34d]" />
            </div>
            <div className="w-0 h-0 border-l-[32px] border-l-transparent border-r-[32px] border-r-transparent border-b-[76px] border-b-emerald-800 relative">
              <div className="w-3 h-3 rounded-full bg-amber-300 absolute -left-1.5 top-5 shadow-[0_0_8px_#fcd34d]" />
              <div className="w-3 h-3 rounded-full bg-red-500 absolute -left-4 top-11 shadow-[0_0_8px_#ef4444]" />
              <div className="w-3 h-3 rounded-full bg-sky-400 absolute left-2 top-13 shadow-[0_0_8px_#38bdf8]" />
            </div>
          </div>
          <div className="absolute bottom-2 right-8 flex items-end gap-4 z-20 opacity-90">
            <div className="w-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent border-b-[70px] border-b-emerald-800 relative">
              <div className="w-3 h-3 rounded-full bg-red-500 absolute -left-2 top-6 shadow-[0_0_8px_#ef4444]" />
              <div className="w-3 h-3 rounded-full bg-amber-300 absolute left-1 top-12 shadow-[0_0_8px_#fcd34d]" />
            </div>
          </div>
        </div>
      )}

      {activeEffect === 'christmas_finale' && (
        <div className="fixed inset-0 z-[400] pointer-events-none overflow-hidden flex items-center justify-center">
          {[...Array(90)].map((_, i) => {
            const icons = ['🎁', '❄️', '⭐', '🔔', '🎄', '🍬', '🦌', '✨'];
            const angle = (seeded(i, 11) * Math.PI * 2);
            const force = 180 + seeded(i, 12) * 420;
            const tx = Math.cos(angle) * force + 'px';
            const ty = (Math.sin(angle) * force - 120) + 'px';
            const dur = (1.8 + seeded(i, 13) * 1.4) + 's';
            return (
              <div
                key={`xmas-burst-${i}`}
                className="fixed left-1/2 top-1/2 text-2xl md:text-3xl select-none animate-christmas-burst"
                style={{
                  '--tx': tx,
                  '--ty': ty,
                  '--dur': dur,
                  animationDelay: (seeded(i, 14) * 0.35) + 's',
                }}
              >
                {icons[i % icons.length]}
              </div>
            );
          })}
          <div className="animate-winner-text flex flex-col items-center bg-gradient-to-r from-red-700/90 via-emerald-800/90 to-red-700/90 px-10 py-6 rounded-3xl border-4 border-amber-300 shadow-[0_0_60px_rgba(251,191,36,0.85)]">
            <span className="text-5xl md:text-7xl font-black text-amber-300 tracking-tight uppercase drop-shadow-[0_0_25px_rgba(253,224,71,0.9)] italic">
              GLÆDELIG JUL!
            </span>
            <span className="text-xs md:text-sm font-black uppercase tracking-[0.3em] text-white mt-2">
              Tjanserne er pakket ud!
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default VisualEffects;
