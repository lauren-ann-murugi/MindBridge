

'use client';
import React, { useState } from 'react';

export default function RetentionWave({ data }) {
  const [activeDataset, setActiveDataset] = useState(1);
  if (!data || !data.datasets) return <div className="text-zinc-500 p-7 bg-zinc-950 border border-zinc-800/50 rounded-sm">Parsing Wave Envelopes...</div>;

  const currentDataset = data.datasets[activeDataset];
  const maxValue = Math.max(...currentDataset.data, 100);

  return (
    <div className="bg-[#09090b] border border-zinc-800 rounded-sm p-7 w-full box-border">
      <div className="flex flex-col sm:flex-row justify-between items-start border-b border-zinc-900 pb-5 mb-6 gap-4">
        <div>
          <span className="text-[9px] uppercase tracking-wider text-zinc-500 font-semibold block mb-1">Analytics Engine</span>
          <h3 className="text-base font-semibold text-white mb-1">Retention Curve Mapping</h3>
          <p className="text-xs text-zinc-400 leading-normal">Empirical knowledge persistence index over longitudinal weekly vectors</p>
        </div>
        <div className="flex bg-zinc-900 border border-zinc-800 p-[2px] rounded-sm flex-shrink-0">
          {data.datasets.map((dataset, idx) => (
            <button 
              key={idx} 
              className={`text-[10px] font-semibold px-3 py-1.5 rounded-sm cursor-pointer uppercase tracking-wider transition-all duration-150 ${activeDataset === idx ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-white'}`}
              onClick={() => setActiveDataset(idx)}
            >
              {dataset.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-end justify-between gap-3 h-[140px] mt-3">
        {data.labels.map((label, idx) => {
          const currentVal = currentDataset.data[idx];
          const heightPct = (currentVal / maxValue) * 100;
          return (
            <div key={idx} className="flex flex-col  items-center gap-2.5 flex-1 h-full justify-end">
              <div className="w-full max-w-[32px] h-[110px] bg-zinc-900/40 rounded-sm flex items-end relative group">
                <div 
                  className="w-full rounded-t-sm relative transition-all duration-300 group-hover:brightness-125" 
                  style={{ height: `${heightPct}%`, backgroundColor: activeDataset === 0 ? 'rgba(255,255,255,0.2)' : '#ffffff' }}
                >
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-mono font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none">{currentVal}%</span>
                </div>
              </div>
              <span className="text-[11px] text-zinc-500 font-mono">{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}