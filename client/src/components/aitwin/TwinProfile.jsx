


'use client';
import React from 'react';

export default function TwinProfile({ profile, onInsight, onFocus, focusActive }) {
  if (!profile) return <div className="text-zinc-500 p-7 bg-zinc-950 border border-zinc-800/50 rounded-sm text-sm">Syncing Intelligence Node...</div>;

  return (
    <div className="bg-[#09090b] border border-zinc-800 rounded-sm p-7 w-full box-border">
      <div className="flex flex-col md:flex-row gap-7 items-start">
        <div className="w-24 height-24 w-24 h-24 rounded-sm bg-white flex items-center justify-center text-4xl font-bold text-black flex-shrink-0">
          <span>{profile.learningStyle?.[0] || 'M'}</span>
        </div>

        <div className="flex-1 min-w-0 w-full">
          <div className="text-[9px] uppercase tracking-wider text-zinc-500 font-semibold mb-1.5">Cognitive Mirror Model</div>
          <h2 className="text-xl font-semibold tracking-tight text-white mb-1.5">Aethelgard Twin Instance</h2>
          <p className="text-sm text-zinc-400 mb-4 leading-relaxed">
            Optimized for <span className="text-white font-medium">{profile.learningStyle}</span>. Peak processing window operates around {profile.bestFocusWindow}.
          </p>

          <div className="flex flex-wrap gap-2 mb-5">
            {profile.strongTopics?.map((topic, i) => (
              <span key={i} className="text-xs px-2.5 py-1 rounded-sm font-mono bg-zinc-900 text-zinc-300 border border-zinc-800">▲ {topic}</span>
            ))}
            {profile.weakTopics?.map((topic, i) => (
              <span key={i} className="text-xs px-2.5 py-1 rounded-sm font-mono bg-zinc-950 text-zinc-500 border border-zinc-900/50">▼ {topic}</span>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <div className="bg-zinc-950 border border-zinc-900 rounded-sm p-3.5 flex flex-col gap-1">
              <span className="text-[9px] font-semibold tracking-wider uppercase text-zinc-500">Focus Depth</span>
              <span className="text-base font-bold text-white font-mono">{profile.focusDepth}/10</span>
            </div>
            <div className="bg-zinc-950 border border-zinc-900 rounded-sm p-3.5 flex flex-col gap-1">
              <span className="text-[9px] font-semibold tracking-wider uppercase text-zinc-500">Retention</span>
              <span className="text-base font-bold text-white font-mono">{profile.retention}%</span>
            </div>
            <div className="bg-zinc-950 border border-zinc-900 rounded-sm p-3.5 flex flex-col gap-1">
              <span className="text-[9px] font-semibold tracking-wider uppercase text-zinc-500">Current Streak</span>
              <span className="text-base font-bold text-white font-mono">{profile.currentStreak} Days</span>
            </div>
            <div className="bg-zinc-950 border border-zinc-900 rounded-sm p-3.5 flex flex-col gap-1">
              <span className="text-[9px] font-semibold tracking-wider uppercase text-zinc-500">Hours Studied</span>
              <span className="text-base font-bold text-white font-mono">{profile.hoursStudiedThisWeek}h</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button className="bg-transparent border border-zinc-700 hover:border-white text-white px-[18px] py-2.5 rounded-sm text-xs font-semibold cursor-pointer transition-colors duration-150" onClick={onInsight}>
              Request Neural Insights
            </button>
            <button className={`px-[18px] py-2.5 rounded-sm text-xs font-semibold cursor-pointer transition-colors duration-150 ${focusActive ? 'bg-red-600 border border-red-600 text-white' : 'bg-white text-black hover:bg-zinc-200'}`} onClick={onFocus}>
              {focusActive ? 'Terminating Sequence...' : 'Initialize Focus Sequence'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}