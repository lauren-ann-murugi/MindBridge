
'use client';
import React, { useState, useEffect } from 'react';
import TwinProfile from '@/components/aitwin/TwinProfile';
import RetentionWave from '@/components/aitwin/RetentionWave';
import MasteryFlow from '@/components/aitwin/MasteryFlow';
import NeuralLogs from '@/components/aitwin/NeuralLogs';
import TrophyGrid from '@/components/aitwin/TrophyGrid';

import { 
  getTwinProfile, 
  getRetentionWave, 
  getMasteryFlow, 
  getNeuralLogs, 
  getTrophies, 
  syncTwinNow 
} from '@/services/aitwinService'; 

import { generateTwinInsight, getFocusRecommendation } from '@/services/groqService';

export default function AITwinDashboard() {
  const [profile, setProfile] = useState(null);
  const [wave, setWave] = useState(null);
  const [flow, setFlow] = useState(null);
  const [logs, setLogs] = useState([]);
  const [trophies, setTrophies] = useState([]);
  const [mounted, setMounted] = useState(false);

  const [inferenceModalText, setInferenceModalText] = useState(null);
  const [inferenceLoading, setInferenceLoading] = useState(false);
  const [focusSequenceActive, setFocusSequenceActive] = useState(false);

  async function hydrateDashboardData() {
    const p = await getTwinProfile();
    const w = await getRetentionWave();
    const f = await getMasteryFlow();
    const l = await getNeuralLogs();
    const t = await getTrophies();

    setProfile(p);
    setWave(w);
    setFlow(f);
    setLogs(l);
    setTrophies(t);
  }

  useEffect(() => {
    hydrateDashboardData();
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-black" />;
  }

  const handleSystemSync = async () => {
    await syncTwinNow();
    await hydrateDashboardData();
  };

  const handleRequestInsights = async () => {
    if (!profile) return;
    setInferenceLoading(true);
    try {
      const metricQueryString = `Focus Level: ${profile.focusDepth}, Retention Percent: ${profile.retention}%, Weak Topics: ${profile.weakTopics?.join(', ')}`;
      const outputInsightText = await generateTwinInsight(metricQueryString, profile);
      setInferenceModalText({ title: "Aethelgard Core Analytical Diagnostic Output", body: outputInsightText });
    } catch (err) {
      setInferenceModalText({ title: "Inference Failure", body: "Engine connection timeout." });
    } finally {
      setInferenceLoading(false);
    }
  };

  const handleToggleFocusSequence = async () => {
    if (focusSequenceActive) {
      setFocusSequenceActive(false);
      await hydrateDashboardData();
      return;
    }

    setFocusSequenceActive(true);
    setInferenceLoading(true);
    try {
      const focusPromptBreakdown = await getFocusRecommendation(flow?.courseName || 'Behavioral Economic Modeling', 45);
      setInferenceModalText({ title: "AI Focus Pipeline Blueprint Initialized", body: focusPromptBreakdown });
      setProfile(prev => ({ ...prev, focusDepth: 10 }));
    } catch (err) {
      setFocusSequenceActive(false);
    } finally {
      setInferenceLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1120px] mx-auto px-5 py-6 bg-black min-h-screen box-border text-white antialiased">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-5 mb-2">
        <div>
          <h1 className="text-2xl font-semibold text-white tracking-tight mb-1">MindBridge AI Twin</h1>
          <p className="text-sm text-zinc-500 leading-normal">Continuous cognitive mirror mapping execution matrix, focus horizons, and velocity profiling.</p>
        </div>
        <button className="bg-zinc-950 border border-zinc-800 text-white px-5 py-2.5 rounded-sm text-xs font-semibold cursor-pointer transition-colors duration-150 hover:bg-white hover:text-black hover:border-white flex-shrink-0" onClick={handleSystemSync}>
          Sync System State
        </button>
      </div>

      <div className="w-full">
        <TwinProfile 
          profile={profile} 
          onInsight={handleRequestInsights} 
          onFocus={handleToggleFocusSequence} 
          focusActive={focusSequenceActive}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <RetentionWave data={wave} />
        <MasteryFlow flow={flow} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6 w-full">
        <NeuralLogs logs={logs} />
        <TrophyGrid trophies={trophies} />
      </div>

      {/* Global Inference Overlay */}
      {(inferenceModalText || inferenceLoading) && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-50 p-5 backdrop-blur-xs" onClick={() => !inferenceLoading && setInferenceModalText(null)}>
          <div className="bg-[#09090b] border border-zinc-800 rounded-sm max-w-[580px] w-full p-6 box-border flex flex-col max-h-[85vh]" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4 border-b border-zinc-900 pb-3">
              <h4 className="text-sm text-white font-semibold">{inferenceLoading ? "Executing Inference Core..." : inferenceModalText?.title}</h4>
              {!inferenceLoading && <button className="bg-transparent border-none text-zinc-500 cursor-pointer text-base hover:text-white" onClick={() => setInferenceModalText(null)}>✕</button>}
            </div>
            <div className="overflow-y-auto flex-1 mb-5 pr-1 scrollbar-thin">
              {inferenceLoading ? (
                <div className="flex flex-col items-center justify-center gap-4 py-10 text-center text-xs text-zinc-500">
                  <div className="w-3 h-3 bg-white rounded-full animate-ping" />
                  <span>Computing Predictive Diagnostics via Groq API Engine...</span>
                </div>
              ) : (
                <p className="text-xs text-zinc-300 leading-relaxed whitespace-pre-wrap font-sans">{inferenceModalText?.body}</p>
              )}
            </div>
            {!inferenceLoading && (
              <button className="w-full bg-white text-black border-none p-3 text-xs font-semibold rounded-sm cursor-pointer hover:bg-zinc-200" onClick={() => setInferenceModalText(null)}>
                Dismiss Telemetry Breakdown
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}