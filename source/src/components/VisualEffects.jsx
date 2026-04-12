import React from 'react';
import { Ghost, Rocket } from 'lucide-react';

const VisualEffects = ({ activeEffect, countdown, spookyText, students, assignments, tasks, shufflingTasks, tempNames }) => {
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
    </>
  );
};

export default VisualEffects;
