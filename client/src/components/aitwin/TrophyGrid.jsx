




'use client';
import React, { useState } from 'react';

export default function TrophyGrid({ trophies }) {
  const [activeTrophy, setActiveTrophy] = useState(null);
  if (!trophies) return <div className="text-zinc-500 p-7 bg-zinc-950 border border-zinc-800/50 rounded-sm">Syncing Vault...</div>;

  return (
    <div className="bg-[#09090b] border border-zinc-800 rounded-sm p-7 w-full box-border flex flex-col">
      <div className="border-b border-zinc-900 pb-5 mb-5">
        <span className="text-[9px] uppercase tracking-wider text-zinc-500 font-semibold block mb-1">Milestone Showcase</span>
        <h3 className="text-base font-semibold text-white">Trophy Case Verification</h3>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-5">
        {trophies.map((trophy) => (
          <div 
            key={trophy.id} 
            className={`h-16 bg-zinc-950/40 border rounded-sm flex items-center justify-center cursor-pointer transition-all duration-150 hover:bg-zinc-900 ${trophy.achieved ? 'border-zinc-800' : 'opacity-20 border-dashed border-zinc-800'} ${activeTrophy?.id === trophy.id ? 'border-white bg-zinc-900/60' : ''}`}
            onClick={() => setActiveTrophy(activeTrophy?.id === trophy.id ? null : trophy)}
          >
            <span className="text-2xl">{trophy.icon}</span>
          </div>
        ))}
      </div>

      {activeTrophy ? (
        <div className="bg-zinc-950 border border-zinc-900 p-4 rounded-sm transition-all duration-150">
          <div className="flex justify-between items-center text-xs font-semibold mb-2 text-white">
            <span>{activeTrophy.name}</span>
            <span className={`text-[9px] uppercase px-1.5 py-0.5 rounded-xs font-mono font-bold ${activeTrophy.achieved ? 'bg-white text-black' : 'border border-zinc-800 text-zinc-500'}`}>
              {activeTrophy.achieved ? 'Achieved' : 'Incomplete'}
            </span>
          </div>
          <p className="text-xs text-zinc-400 leading-normal">{activeTrophy.description}</p>
        </div>
      ) : (
        <div className="text-xs text-zinc-500 text-center p-6 border border-dashed border-zinc-900 rounded-sm leading-normal">
          Select an achievement cell matrix node to inspect milestone parameters.
        </div>
      )}
    </div>
  );
}