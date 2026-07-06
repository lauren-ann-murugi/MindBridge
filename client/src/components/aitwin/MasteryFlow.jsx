
'use client';
import React from 'react';

export default function MasteryFlow({ flow }) {
  if (!flow) return <div className="text-zinc-500 p-7 bg-zinc-950 border border-zinc-800/50 rounded-sm">Hydrating Target Vectors...</div>;

  return (
    <div className="bg-[#09090b] border border-zinc-800 rounded-sm p-7 flex flex-col w-full box-border justify-between">
      <div className="border-b border-zinc-900 pb-5 mb-5">
        <span className="text-[9px] uppercase tracking-wider text-zinc-500 font-semibold block mb-1">Live Stream Horizon</span>
        <h3 className="text-base font-semibold text-white">Velocity Flow Paths</h3>
      </div>

      <div className="flex flex-col gap-5 flex-1 justify-between">
        <div className="bg-zinc-950 border border-zinc-900 p-3.5 rounded-sm">
          <span className="text-[9px] uppercase tracking-wider text-zinc-600 block mb-0.5">Active Core Track</span>
          <h4 className="text-sm text-white font-semibold">{flow.courseName}</h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <div className="bg-zinc-950 border border-zinc-900 p-2.5 rounded-sm flex flex-col gap-1">
            <span className="text-[9px] uppercase tracking-wider text-zinc-500">Knowledge Depth</span>
            <span className="text-xs font-semibold text-white font-mono">{flow.knowledgeDepth}</span>
          </div>
          <div className="bg-zinc-950 border border-zinc-900 p-2.5 rounded-sm flex flex-col gap-1">
            <span className="text-[9px] uppercase tracking-wider text-zinc-500">Velocity Vector</span>
            <span className="text-xs font-semibold text-white font-mono">{flow.velocityVector}</span>
          </div>
          <div className="bg-zinc-950 border border-zinc-900 p-2.5 rounded-sm flex flex-col gap-1">
            <span className="text-[9px] uppercase tracking-wider text-zinc-500">Projections</span>
            <span className="text-xs font-semibold text-white font-mono">{flow.predictedDaysToMastery} Days Left</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-zinc-400">Path Mastery Calibration</span>
            <span className="text-sm font-mono font-semibold text-white">{flow.completionPercentage}%</span>
          </div>
          <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
            <div className="h-full bg-white transition-all duration-500 ease-out" style={{ width: `${flow.completionPercentage}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}