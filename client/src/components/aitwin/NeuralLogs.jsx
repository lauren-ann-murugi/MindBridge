

'use client';
import React from 'react';

export default function NeuralLogs({ logs }) {
  if (!logs) return <div className="text-zinc-500 p-7 bg-zinc-950 border border-zinc-800/50 rounded-sm">Streaming Log Pipelines...</div>;

  return (
    <div className="bg-[#09090b] border border-zinc-800 rounded-sm p-7 w-full box-border">
      <div className="border-b border-zinc-900 pb-5 mb-6">
        <span className="text-[9px] uppercase tracking-wider text-zinc-500 font-semibold block mb-1">Activity Log</span>
        <h3 className="text-base font-semibold text-white">Neural Stream Logs</h3>
      </div>

      <div className="flex flex-col gap-5 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-zinc-800">
        {logs.map((log) => (
          <div key={log.id} className="flex gap-4 items-start pb-5 border-b border-zinc-900/60 last:pb-0 last:border-b-0">
            <div className="w-9 h-9 bg-zinc-950 border border-zinc-800 rounded-sm flex items-center justify-center flex-shrink-0">
              <span className="text-sm">{log.icon || '📝'}</span>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 mb-1.5">
                <div className="flex items-center gap-2 min-w-0">
                  <h4 className="text-sm font-semibold text-white truncate">{log.title}</h4>
                  <span className={`text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-xs border ${log.importance === 'HIGH' ? 'bg-white/10 text-white border-white/20' : log.importance === 'MEDIUM' ? 'bg-transparent text-zinc-400 border-zinc-800' : 'bg-transparent text-zinc-600 border-transparent'}`}>
                    {log.importance}
                  </span>
                </div>
                <span className="text-[11px] text-zinc-500 font-mono flex-shrink-0">{log.timestamp}</span>
              </div>
              <p className="text-xs text-zinc-400 mb-1.5 leading-relaxed">{log.description}</p>
              <div className="text-[10px] font-mono text-zinc-500 uppercase">Impact Trace: {log.impactScore}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}