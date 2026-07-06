//WORKING BUT NOT AT ALL

// 'use client';
// import { useState, useEffect } from 'react';
// import FlashCard from '@/components/revision/FlashCard';
// import QuizCard from '@/components/revision/QuizCard';
// import RevisionTimeline from '@/components/revision/RevisionTimeline';
// import WeakTopicsTracker from '@/components/revision/WeakTopicsTracker';
// import AIInsightCard from '@/components/revision/AIInsightCard';
// import api from '@/services/api';
// import {
//   getFlashcards,
//   getQuizzes,
//   getWeakTopics,
//   getRevisionTimeline,
//   getAIInsights,
//   markFlashcardKnown,
//   markFlashcardUnknown,
//   startQuiz,
//   startDeepDive,
// } from '@/services/revisionService';

// export default function RevisionPage() {
//   const [flashcards, setFlashcards] = useState([]);
//   const [quizzes, setQuizzes] = useState([]);
//   const [weakTopics, setWeakTopics] = useState([]);
//   const [timeline, setTimeline] = useState([]);
//   const [insights, setInsights] = useState([]);

//   const [currentCardIdx, setCurrentCardIdx] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [generating, setGenerating] = useState(false);
//   const [notification, setNotification] = useState('');

//   // Hydrate data collections
//   const loadRevisionData = async () => {
//     try {
//       setLoading(true);
//       const [
//         flashcardsData,
//         weakTopicsData,
//         quizzesData,
//         timelineData,
//         insightsData,
//       ] = await Promise.all([
//         getFlashcards().catch(() => []),
//         getWeakTopics().catch(() => []),
//         getQuizzes().catch(() => []),
//         getRevisionTimeline().catch(() => []),
//         getAIInsights().catch(() => []),
//       ]);

//       setFlashcards(Array.isArray(flashcardsData) ? flashcardsData : []);
//       setQuizzes(Array.isArray(quizzesData) ? quizzesData : []);
//       setInsights(Array.isArray(insightsData) ? insightsData : []);

//       /* ========================================================================
//          THE REAL FIX: PROCESS REAL BACKEND TIMELINE DATA FOR INSTANT INTERACTION
//          ======================================================================== */
//       if (Array.isArray(timelineData)) {
//         const processedTimeline = timelineData.map((item) => {
//           const isOngoingSession = String(item.time || '').toLowerCase().includes('ongoing') || 
//                                    String(item.status_text || '').toLowerCase().includes('ongoing');
//           return {
//             ...item,
//             // Ensure any uncompleted, ongoing core timeline track evaluates as an actionable item
//             is_active: item.is_active !== undefined ? item.is_active : (!item.completed && isOngoingSession)
//           };
//         });
//         setTimeline(processedTimeline);
//       } else {
//         setTimeline([]);
//       }

//       if (Array.isArray(weakTopicsData)) {
//         const transformedTopics = weakTopicsData.map((lesson, idx) => ({
//           id: lesson.lesson_id || lesson.id,
//           name: lesson.title || lesson.name,
//           description: lesson.description || '',
//           percentage: lesson.retention_rate || Math.max(35, 78 - (idx * 12)) 
//         }));
//         setWeakTopics(transformedTopics);
//       } else {
//         setWeakTopics([]);
//       }
//     } catch (error) {
//       console.error('Failed to resolve database structural payloads:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const token = typeof window !== 'undefined' ? localStorage.getItem('mb_token') : null;
//     if (!token) {
//       setLoading(false);
//       return;
//     }
//     loadRevisionData();
//   }, []);

//   const handleGenerateAIQuiz = async () => {
//     try {
//       setGenerating(true);
//       showNotification('🧠 AI Twin scanning Smart Library materials...');
//       const response = await api.post('/revision/generate-quiz', {});
//       showNotification(`🎉 AI generated ${response.data?.questions_count || 'multiple'} fresh assessment questions!`);
//       await loadRevisionData();
//     } catch (error) {
//       console.error('AI quiz generation cycle faulted:', error);
//       showNotification('✕ Generation failed. Ensure materials exist in your Smart Library.');
//     } finally {
//       setGenerating(false);
//     }
//   };

//   /* ========================================================================
//      REAL TIMELINE RUNTIME COORDINATOR
//      ======================================================================== */
//   const handleTimelineAction = async (item) => {
//     try {
//       showNotification(`Initializing execution cluster for: ${item.title}...`);
      
//       // Determine if the timeline event represents a Quiz or a Deep Dive / Core Track Run
//       if (item.type === 'quiz' || item.quiz_id) {
//         const result = await startQuiz(item.quiz_id || quizzes[0]?.id);
//         showNotification(`Assessment environment linked: ${result?.title || 'Active Track'}`);
//       } else {
//         // Run deep dive sequence directly into Core Track Adaptive Assessment
//         const result = await startDeepDive(item.title || 'Core Track Adaptive Assessment Run');
//         showNotification('🎯 Core Track session initialized successfully!');
//       }
//     } catch (error) {
//       console.error('Failed to resolve timeline pipeline target:', error);
//       showNotification('✕ Unable to link live session runtime vectors.');
//     }
//   };

//   const handleCardKnow = async (cardId) => {
//     try {
//       await markFlashcardKnown(cardId);
//       showNotification('✓ Marked as retained in tracking matrix');
//       nextCard();
//     } catch (error) {
//       console.error('Failed to sync card state:', error);
//     }
//   };

//   const handleCardDontKnow = async (cardId) => {
//     try {
//       await markFlashcardUnknown(cardId);
//       showNotification('Added to target adaptive review queue');
//       nextCard();
//     } catch (error) {
//       console.error('Failed to sync review queue context:', error);
//     }
//   };

//   const nextCard = () => {
//     if (flashcards.length > 0 && currentCardIdx < flashcards.length - 1) {
//       setCurrentCardIdx(currentCardIdx + 1);
//     } else {
//       showNotification('🎉 Flashcard interaction cycle complete!');
//       setCurrentCardIdx(0);
//     }
//   };

//   const handleStartQuiz = async (quizId) => {
//     try {
//       const result = await startQuiz(quizId);
//       showNotification(`Quiz started: ${result?.title || 'Interactive Session'}`);
//     } catch (error) {
//       console.error('Failed to initialize quiz instance:', error);
//     }
//   };

//   const handleFocusWeakTopic = async (topic) => {
//     try {
//       await startDeepDive(topic.name);
//       showNotification(`🎯 Deep Dive started for: ${topic.name}`);
//     } catch (error) {
//       console.error('Failed to loop focus path trace:', error);
//     }
//   };

//   const handleInsightAction = async (insight) => {
//     try {
//       await startDeepDive(insight.message || insight.text || 'Distributed Systems Calibration');
//       showNotification('Syncing workspace to AI path target...');
//     } catch (error) {
//       console.error('Failed to direct tracking node:', error);
//     }
//   };

//   const showNotification = (message) => {
//     setNotification(message);
//     setTimeout(() => setNotification(''), 4500);
//   };

//   if (loading) {
//     return (
//       <div className="page-loading">
//         <div className="spinner" />
//         <p>Syncing persistent database revision metrics...</p>
//         <style jsx>{`
//           .page-loading { min-height: 100vh; background: #050505; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #888; font-family: monospace; font-size: 13px; }
//           .spinner { width: 36px; height: 36px; border: 2px solid #111; border-top-color: #fff; border-radius: 50%; margin-bottom: 20px; animation: spin 0.75s linear infinite; }
//           @keyframes spin { to { transform: rotate(360deg); } }
//         `}</style>
//       </div>
//     );
//   }

//   const currentCard = flashcards[currentCardIdx];

//   return (
//     <div className="revision-page">
//       {/* Header Banner Section */}
//       <div className="page-header">
//         <h1 className="page-title">Revision <span className="title-accent">Hub</span></h1>
//         <p className="page-subtitle">
//           Reinforce your knowledge through real-time AI-driven insights and adaptive tracking metrics synced directly to your Smart Library resources.
//         </p>
//       </div>

//       {/* Main Grid Layout */}
//       <div className="dashboard-grid">
        
//         {/* Left Sidebar Stack */}
//         <div className="sidebar-stack">
//           <div className="dark-panel component-group-box">
//             <div className="title-action-header">
//               <h3 className="group-label">⚡ Quick Quizzes</h3>
//               <button 
//                 className="ai-generation-btn" 
//                 onClick={handleGenerateAIQuiz}
//                 disabled={generating}
//               >
//                 {generating ? 'Parsing Library Vectors...' : '✨ Auto-Generate AI Quiz'}
//               </button>
//             </div>

//             <div className="quizzes-inner-stack">
//               {quizzes.length > 0 ? (
//                 quizzes.map((quiz, index) => (
//                   <QuizCard key={quiz.id || index} quiz={quiz} onStart={handleStartQuiz} />
//                 ))
//               ) : (
//                 <div className="nested-empty-card">
//                   <p>No active assessment tracks generated yet.</p>
//                   <span>Click the button above to analyze your Smart Library records.</span>
//                 </div>
//               )}
//             </div>
//           </div>

//           <WeakTopicsTracker topics={weakTopics} onFocusTopic={handleFocusWeakTopic} />
//         </div>

//         {/* Right Main Content Column */}
//         <div className="main-content-stack">
          
//           {/* Active Recall Panel */}
//           <div className="active-recall-outer-box">
//             {currentCard ? (
//               <div className="card-card-outer">
//                 <div className="card-counter-badge">
//                   {currentCardIdx + 1} / {flashcards.length}
//                 </div>
//                 <FlashCard
//                   card={currentCard}
//                   onKnow={() => handleCardKnow(currentCard.id)}
//                   onDontKnow={() => handleCardDontKnow(currentCard.id)}
//                   onNext={nextCard}
//                 />
//               </div>
//             ) : (
//               <div className="empty-recall-fallback">
//                 <h4 className="fallback-header">Active Recall Terminal</h4>
//                 <p className="fallback-text">No active flashcard variables found inside this tracking node. Upload structural materials in your workspace directories to auto-generate review decks.</p>
//               </div>
//             )}
//           </div>

//           {/* AI Insights Split Grid */}
//           <div className="insights-row-container">
//             {insights.length > 0 ? (
//               insights.map((insight, idx) => (
//                 <AIInsightCard key={insight.id || idx} insight={insight} onAction={handleInsightAction} />
//               ))
//             ) : (
//               /* The Fix: Dynamic tracking metrics connected right into fallback panel click state */
//               <div className="dark-panel empty-insight-placeholder-box">
//                 <div className="card-heading-badge">
//                   <span className="node-icon spark-glow">✦</span>
//                   <h5>MindBridge AI Twin Insight</h5>
//                 </div>
//                 <p className="insight-text">"Your concept execution vectors show performance slipping in distributed architectures. Let's shore up those gaps."</p>
//                 <button 
//                   className="path-action-btn" 
//                   onClick={() => {
//                     handleInsightAction({ message: "Distributed Architectures Calibration Review" });
//                   }}
//                 >
//                   Start Deep Dive ↗
//                 </button>
//               </div>
//             )}
            
//             <div className="dark-panel optimal-path-static-card">
//               <div className="card-heading-badge">
//                 <span className="node-icon tint-green">📈</span>
//                 <h5>Optimal Path Matrix</h5>
//               </div>
//               <p className="path-text">"Suggested: 20-minute focus session on newly processed vector sources followed by an active self-evaluation test session."</p>
//               <button 
//                 className="path-action-btn variant-filled" 
//                 onClick={async () => {
//                   try {
//                     showNotification('🧠 AI Scanning Smart Library vector profiles...');
//                     await startDeepDive('Vector Source Optimal Path Routing');
//                     showNotification('➔ Calibration sequence initialized successfully!');
//                   } catch (err) {
//                     showNotification('✕ Vector analysis update failed.');
//                   }
//                 }}
//               >
//                 Follow Path ➔
//               </button>
//             </div>
//           </div>

//           {/* Operational Timeline Segment Linked with dynamic events handler */}
//           <RevisionTimeline timeline={timeline} onActionClick={handleTimelineAction} />

//         </div>
//       </div>

//       {/* Global Interactive Notification Alert Toast */}
//       {notification && <div className="toast-alert-notification">{notification}</div>}

//       <style jsx>{`
//         .revision-page {
//           min-height: 100vh;
//           background: #030303;
//           padding: 48px 56px;
//           color: #ffffff;
//           font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif;
//           -webkit-font-smoothing: antialiased;
//         }
        
//         .page-header { 
//           margin-bottom: 44px; 
//           border-bottom: 1px solid #121212; 
//           padding-bottom: 32px;
//         }
//         .page-title { 
//           font-size: 34px; 
//           font-weight: 700; 
//           margin: 0 0 10px 0; 
//           letter-spacing: -0.03em; 
//           color: #ffffff;
//         }
//         .title-accent { font-weight: 300; color: #888888; font-style: italic; }
//         .page-subtitle { font-size: 14.5px; color: #808080; max-width: 760px; line-height: 1.65; margin: 0; }
        
//         .dashboard-grid {
//           display: grid;
//           grid-template-columns: 360px 1fr;
//           gap: 44px;
//           align-items: start;
//         }
        
//         .sidebar-stack { display: flex; flex-direction: column; gap: 32px; }
        
//         .dark-panel {
//           background: #090909; 
//           border: 1px solid #141414;
//           border-radius: 14px;
//           padding: 32px;
//           box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);
//           transition: border-color 0.2s;
//         }
//         .dark-panel:hover { border-color: #1c1c1c; }
        
//         .component-group-box { display: flex; flex-direction: column; }
//         .title-action-header { display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px; }
//         .group-label { font-size: 11px; font-weight: 700; color: #555555; letter-spacing: 0.14em; text-transform: uppercase; margin: 0; }
        
//         .ai-generation-btn, .path-action-btn {
//           width: 100%;
//           height: 42px;
//           background: #ffffff;
//           color: #000000;
//           border: 1px solid transparent;
//           border-radius: 8px;
//           font-size: 13px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: background 0.2s, border-color 0.2s, color 0.2s;
//           display: inline-flex;
//           align-items: center;
//           justify-content: center;
//           box-sizing: border-box;
//         }
//         .ai-generation-btn:hover:not(:disabled) { background: #e5e5e5; }
//         .ai-generation-btn:disabled { background: #121212; color: #444; cursor: not-allowed; }
        
//         .path-action-btn {
//           background: transparent;
//           border-color: #222222;
//           color: #888888;
//         }
//         .path-action-btn:hover {
//           border-color: #555555;
//           color: #ffffff;
//           background: #111111;
//         }
//         .path-action-btn.variant-filled {
//           background: #ffffff;
//           color: #000000;
//           border: none;
//         }
//         .path-action-btn.variant-filled:hover {
//           background: #e5e5e5;
//         }
        
//         .quizzes-inner-stack { display: flex; flex-direction: column; gap: 14px; }
//         .nested-empty-card { font-size: 12px; color: #555; text-align: center; padding: 32px 16px; border: 1px dashed #141414; border-radius: 10px; line-height: 1.6; }
//         .nested-empty-card p { margin: 0 0 6px 0; font-weight: 600; color: #777; }
//         .nested-empty-card span { color: #444; font-size: 11px; }
        
//         .main-content-stack { display: flex; flex-direction: column; gap: 40px; }
        
//         .active-recall-outer-box { position: relative; width: 100%; }
//         .active-recall-outer-box :global(.active-recall-wrapper) { background: #090909 !important; border: 1px solid #141414 !important; border-radius: 14px !important; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6) !important; padding: 36px !important; }
//         .active-recall-outer-box :global(.flashcard-container) { height: 290px !important; margin-bottom: 24px !important; }
//         .active-recall-outer-box :global(.card-face) { background: #0d0d0d !important; border: 1px solid #1a1a1a !important; border-radius: 12px !important; padding: 44px !important; }
//         .active-recall-outer-box :global(.card-back) { background: #0f0f0f !important; border-color: #222222 !important; }
//         .active-recall-outer-box :global(.card-text) { font-size: 18px !important; color: #ffffff !important; font-weight: 400; line-height: 1.65 !important; }
//         .active-recall-outer-box :global(.card-badge) { background: #161616; padding: 6px 12px; border-radius: 6px; font-size: 11px !important; color: #666 !important; border: 1px solid #222; }
//         .active-recall-outer-box :global(.flip-hint) { color: #444 !important; font-size: 12px !important; margin-top: 36px !important; letter-spacing: 0.02em; }
        
//         .active-recall-outer-box :global(.action-button-group) { gap: 16px !important; display: flex !important; }
//         .active-recall-outer-box :global(.btn) { height: 44px !important; padding: 0 28px !important; font-size: 13px !important; border-radius: 8px !important; font-weight: 600 !important; display: inline-flex !important; align-items: center !important; justify-content: center !important; flex: 1 !important; transition: background 0.2s, border-color 0.2s !important; }
//         .active-recall-outer-box :global(.btn-dont-know) { background: #120a0a !important; border: 1px solid #2d1414 !important; color: #ef4444 !important; }
//         .active-recall-outer-box :global(.btn-dont-know:hover) { background: #1f0f10 !important; border-color: #451a1c !important; }
//         .active-recall-outer-box :global(.btn-know) { background: #0a120c !important; border: 1px solid #142d1b !important; color: #22c55e !important; }
//         .active-recall-outer-box :global(.btn-know:hover) { background: #0f1f14 !important; border-color: #1a4527 !important; }
//         .active-recall-outer-box :global(.btn-next) { background: #ffffff !important; color: #000000 !important; font-weight: 700 !important; border: none !important; }
//         .active-recall-outer-box :global(.btn-next:hover) { background: #e5e5e5; }

//         .card-counter-badge { position: absolute; top: 36px; right: 36px; font-size: 11px; font-weight: 700; color: #555; background: #121212; padding: 5px 12px; border-radius: 30px; z-index: 10; border: 1px solid #1c1c1c; letter-spacing: 0.05em; }
        
//         .empty-recall-fallback { background: #090909; border: 1px solid #141414; border-radius: 14px; padding: 64px 32px; text-align: center; }
//         .fallback-header { font-size: 20px; margin: 0 0 10px 0; color: #fff; font-weight: 500; letter-spacing: -0.01em; }
//         .fallback-text { font-size: 13.5px; color: #555; max-width: 460px; margin: 0 auto; line-height: 1.65; }
        
//         .insights-row-container { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; min-height: 240px; }
//         .insights-row-container :global(.insight-card-container) { background: #090909 !important; border: 1px solid #141414 !important; border-radius: 14px !important; padding: 32px !important; display: flex !important; flex-direction: column !important; justify-content: space-between !important; height: 100% !important; box-sizing: border-box !important; }
//         .insights-row-container :global(.insight-card-title) { font-size: 14px !important; color: #fff !important; font-weight: 600 !important; margin: 0 !important; }
//         .insights-row-container :global(.insight-body-text) { font-size: 13.5px !important; color: #888888 !important; line-height: 1.6 !important; margin: 14px 0 24px 0 !important; font-style: italic; }
//         .insights-row-container :global(.insight-action-trigger) { width: 100% !important; height: 42px !important; background: transparent !important; color: #ffffff !important; font-size: 13px !important; font-weight: 600 !important; border: 1px solid #222222 !important; padding: 0 !important; border-radius: 8px !important; display: inline-flex !important; align-items: center !important; justify-content: center !important; transition: all 0.2s !important; text-decoration: none !important; }
//         .insights-row-container :global(.insight-action-trigger:hover) { background: #111111 !important; border-color: #555555 !important; }

//         .empty-insight-placeholder-box, .optimal-path-static-card { display: flex; flex-direction: column; align-items: flex-start; justify-content: space-between; box-sizing: border-box; height: 100%; }
//         .card-heading-badge { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
//         .node-icon { font-size: 15px; color: #fff; }
//         .spark-glow { color: #fff; text-shadow: 0 0 8px rgba(255,255,255,0.3); }
//         .empty-insight-placeholder-box h5, .optimal-path-static-card h5 { font-size: 14px; font-weight: 600; color: #ffffff; margin: 0; letter-spacing: -0.01em; }
//         .insight-text, .path-text { font-size: 13.5px; color: #888; line-height: 1.6; margin: 0 0 24px 0; font-style: italic; }

//         :global(.timeline-container-card) { background: #090909 !important; border: 1px solid #141414 !important; border-radius: 14px !important; padding: 36px !important; box-shadow: 0 10px 40px rgba(0,0,0,0.6) !important; }
//         :global(.weak-topics-box) { background: #090909 !important; border: 1px solid #141414 !important; border-radius: 14px !important; padding: 32px !important; max-width: 100% !important; box-shadow: 0 10px 40px rgba(0,0,0,0.6) !important; }
//         :global(.tracker-title) { color: #555555 !important; font-size: 11px !important; font-weight: 700 !important; letter-spacing: 0.14em !important; text-transform: uppercase !important; }
//         :global(.topic-name-label) { font-size: 14px !important; color: #fff !important; font-weight: 600 !important; }
//         :global(.progress-bar-track) { background: #141414 !important; height: 5px !important; border-radius: 10px !important; }
//         :global(.topic-inline-action) { color: #666666 !important; font-size: 12px !important; margin-top: 6px !important; transition: color 0.2s !important; }
//         :global(.topic-inline-action:hover) { color: #ffffff !important; }

//         .toast-alert-notification {
//           position: fixed;
//           bottom: 36px;
//           right: 36px;
//           background: #090909;
//           border: 1px solid #ffffff;
//           color: #ffffff;
//           padding: 16px 28px;
//           border-radius: 8px;
//           font-size: 13px;
//           font-weight: 600;
//           z-index: 5000;
//           box-shadow: 0 16px 50px rgba(0, 0, 0, 0.8);
//           animation: slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
//           font-family: monospace;
//         }
//         @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

//         @media (max-width: 1240px) {
//           .dashboard-grid { grid-template-columns: 1fr; gap: 36px; }
//           .revision-page { padding: 36px 24px; }
//         }
//         @media (max-width: 768px) {
//           .insights-row-container { grid-template-columns: 1fr; gap: 24px; }
//         }
//       `}</style>
//     </div>
//   );
// }












'use client';
import { useState, useEffect } from 'react';
import FlashCard from '@/components/revision/FlashCard';
import QuizCard from '@/components/revision/QuizCard';
import RevisionTimeline from '@/components/revision/RevisionTimeline';
import WeakTopicsTracker from '@/components/revision/WeakTopicsTracker';
import AIInsightCard from '@/components/revision/AIInsightCard';
import api from '@/services/api';
import {
  getFlashcards,
  getQuizzes,
  getWeakTopics,
  getRevisionTimeline,
  getAIInsights,
  markFlashcardKnown,
  markFlashcardUnknown,
  startQuiz,
  startDeepDive,
} from '@/services/revisionService';

export default function RevisionPage() {
  const [flashcards, setFlashcards] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [weakTopics, setWeakTopics] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [insights, setInsights] = useState([]);

  const [currentCardIdx, setCurrentCardIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [notification, setNotification] = useState('');

  const loadRevisionData = async () => {
    try {
      setLoading(true);
      const [
        flashcardsData,
        weakTopicsData,
        quizzesData,
        timelineData,
        insightsData,
      ] = await Promise.all([
        getFlashcards().catch(() => []),
        getWeakTopics().catch(() => []),
        getQuizzes().catch(() => []),
        getRevisionTimeline().catch(() => []),
        getAIInsights().catch(() => []),
      ]);

      setFlashcards(Array.isArray(flashcardsData) ? flashcardsData : []);
      setQuizzes(Array.isArray(quizzesData) ? quizzesData : []);
      setInsights(Array.isArray(insightsData) ? insightsData : []);

      if (Array.isArray(timelineData)) {
        const processedTimeline = timelineData.map((item) => {
          const isOngoingSession = String(item.time || '').toLowerCase().includes('ongoing') || 
                                   String(item.status_text || '').toLowerCase().includes('ongoing');
          return {
            ...item,
            is_active: item.is_active !== undefined ? item.is_active : (!item.completed && isOngoingSession)
          };
        });
        setTimeline(processedTimeline);
      } else {
        setTimeline([]);
      }

      if (Array.isArray(weakTopicsData)) {
        const transformedTopics = weakTopicsData.map((lesson, idx) => ({
          id: lesson.lesson_id || lesson.id,
          name: lesson.title || lesson.name,
          description: lesson.description || '',
          percentage: lesson.retention_rate || Math.max(35, 78 - (idx * 12)) 
        }));
        setWeakTopics(transformedTopics);
      } else {
        setWeakTopics([]);
      }
    } catch (error) {
      console.error('Failed to resolve database structural payloads:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('mb_token') : null;
    if (!token) {
      setLoading(false);
      return;
    }
    loadRevisionData();
  }, []);

  const handleGenerateAIQuiz = async () => {
    try {
      setGenerating(true);
      showNotification('🧠 AI Twin scanning Smart Library materials...');
      
      const response = await api.post('/revision/generate-quiz', {});
      
      showNotification(`🎉 AI generated ${response.data?.questions_count || 'multiple'} fresh assessment questions!`);
      await loadRevisionData();
    } catch (error) {
      console.error('AI quiz generation cycle faulted:', error);
      
      // Check for specific backend error
      const errorMessage = error?.response?.data?.error || '';
      if (errorMessage.includes('No lessons exist')) {
        showNotification('✕ No lessons found. Please complete some lessons in the Smart Library first.');
      } else {
        showNotification('✕ Generation failed. Ensure materials exist in your Smart Library.');
      }
    } finally {
      setGenerating(false);
    }
  };

  const handleTimelineAction = async (item) => {
    try {
      showNotification(`Initializing execution cluster for: ${item.title}...`);
      if (item.type === 'quiz' || item.quiz_id) {
        const result = await startQuiz(item.quiz_id || quizzes[0]?.id);
        showNotification(`Assessment environment linked: ${result?.title || 'Active Track'}`);
      } else {
        const result = await startDeepDive(item.title || 'Core Track Adaptive Assessment Run');
        showNotification('🎯 Core Track session initialized successfully!');
      }
    } catch (error) {
      console.error('Failed to resolve timeline pipeline target:', error);
      showNotification('✕ Unable to link live session runtime vectors.');
    }
  };

  const handleCardKnow = async (cardId) => {
    try {
      await markFlashcardKnown(cardId);
      showNotification('✓ Marked as retained in tracking matrix');
      nextCard();
    } catch (error) {
      console.error('Failed to sync card state:', error);
    }
  };

  const handleCardDontKnow = async (cardId) => {
    try {
      await markFlashcardUnknown(cardId);
      showNotification('Added to target adaptive review queue');
      nextCard();
    } catch (error) {
      console.error('Failed to sync review queue context:', error);
    }
  };

  const nextCard = () => {
    if (flashcards.length > 0 && currentCardIdx < flashcards.length - 1) {
      setCurrentCardIdx(currentCardIdx + 1);
    } else {
      showNotification('🎉 Flashcard interaction cycle complete!');
      setCurrentCardIdx(0);
    }
  };

  const handleStartQuiz = async (quizId) => {
    try {
      const result = await startQuiz(quizId);
      showNotification(`Quiz started: ${result?.title || 'Interactive Session'}`);
    } catch (error) {
      console.error('Failed to initialize quiz instance:', error);
    }
  };

  const handleFocusWeakTopic = async (topic) => {
    try {
      await startDeepDive(topic.name);
      showNotification(`🎯 Deep Dive started for: ${topic.name}`);
    } catch (error) {
      console.error('Failed to loop focus path trace:', error);
    }
  };

  const handleInsightAction = async (insight) => {
    try {
      await startDeepDive(insight.message || insight.text || 'Distributed Systems Calibration');
      showNotification('Syncing workspace to AI path target...');
    } catch (error) {
      console.error('Failed to direct tracking node:', error);
    }
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 4500);
  };

  if (loading) {
    return (
      <div className="page-loading">
        <div className="spinner" />
        <p>Syncing persistent database revision metrics...</p>
        <style jsx>{`
          .page-loading { min-height: 100vh; background: #050505; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #888; font-family: monospace; font-size: 13px; }
          .spinner { width: 36px; height: 36px; border: 2px solid #111; border-top-color: #fff; border-radius: 50%; margin-bottom: 20px; animation: spin 0.75s linear infinite; }
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
      </div>
    );
  }

  const currentCard = flashcards[currentCardIdx];

  return (
    <div className="revision-page">
      <div className="page-header">
        <h1 className="page-title">Revision <span className="title-accent">Hub</span></h1>
        <p className="page-subtitle">
          Reinforce your knowledge through real-time AI-driven insights and adaptive tracking metrics synced directly to your Smart Library resources.
        </p>
      </div>

      <div className="dashboard-grid">
        <div className="sidebar-stack">
          <div className="dark-panel component-group-box">
            <div className="title-action-header">
              <h3 className="group-label">⚡ Quick Quizzes</h3>
              <button 
                className="ai-generation-btn" 
                onClick={handleGenerateAIQuiz}
                disabled={generating}
              >
                {generating ? 'Parsing Library Vectors...' : '✨ Auto-Generate AI Quiz'}
              </button>
            </div>

            <div className="quizzes-inner-stack">
              {quizzes.length > 0 ? (
                quizzes.map((quiz, index) => (
                  <QuizCard key={quiz.id || index} quiz={quiz} onStart={handleStartQuiz} />
                ))
              ) : (
                <div className="nested-empty-card">
                  <p>No active assessment tracks generated yet.</p>
                  <span>Click the button above to analyze your Smart Library records.</span>
                </div>
              )}
            </div>
          </div>

          <WeakTopicsTracker topics={weakTopics} onFocusTopic={handleFocusWeakTopic} />
        </div>

        <div className="main-content-stack">
          <div className="active-recall-outer-box">
            {currentCard ? (
              <div className="card-card-outer">
                <div className="card-counter-badge">
                  {currentCardIdx + 1} / {flashcards.length}
                </div>
                <FlashCard
                  card={currentCard}
                  onKnow={() => handleCardKnow(currentCard.id)}
                  onDontKnow={() => handleCardDontKnow(currentCard.id)}
                  onNext={nextCard}
                />
              </div>
            ) : (
              <div className="empty-recall-fallback">
                <h4 className="fallback-header">Active Recall Terminal</h4>
                <p className="fallback-text">No active flashcard variables found inside this tracking node. Upload structural materials in your workspace directories to auto-generate review decks.</p>
              </div>
            )}
          </div>

          <div className="insights-row-container">
            {insights.length > 0 ? (
              insights.map((insight, idx) => (
                <AIInsightCard key={insight.id || idx} insight={insight} onAction={handleInsightAction} />
              ))
            ) : (
              <div className="dark-panel empty-insight-placeholder-box">
                <div className="card-heading-badge">
                  <span className="node-icon spark-glow">✦</span>
                  <h5>MindBridge AI Twin Insight</h5>
                </div>
                <p className="insight-text">"Your concept execution vectors show performance slipping in distributed architectures. Let's shore up those gaps."</p>
                <button 
                  className="path-action-btn" 
                  onClick={() => {
                    handleInsightAction({ message: "Distributed Architectures Calibration Review" });
                  }}
                >
                  Start Deep Dive ↗
                </button>
              </div>
            )}
            
            <div className="dark-panel optimal-path-static-card">
              <div className="card-heading-badge">
                <span className="node-icon tint-green">📈</span>
                <h5>Optimal Path Matrix</h5>
              </div>
              <p className="path-text">"Suggested: 20-minute focus session on newly processed vector sources followed by an active self-evaluation test session."</p>
              <button 
                className="path-action-btn variant-filled" 
                onClick={async () => {
                  try {
                    showNotification('🧠 AI Scanning Smart Library vector profiles...');
                    await startDeepDive('Vector Source Optimal Path Routing');
                    showNotification('➔ Calibration sequence initialized successfully!');
                  } catch (err) {
                    showNotification('✕ Vector analysis update failed.');
                  }
                }}
              >
                Follow Path ➔
              </button>
            </div>
          </div>

          <RevisionTimeline timeline={timeline} onActionClick={handleTimelineAction} />
        </div>
      </div>

      {notification && <div className="toast-alert-notification">{notification}</div>}

      <style jsx>{`
        .revision-page { min-height: 100vh; background: #030303; padding: 48px 56px; color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif; -webkit-font-smoothing: antialiased; }
        .page-header { margin-bottom: 44px; border-bottom: 1px solid #121212; padding-bottom: 32px; }
        .page-title { font-size: 34px; font-weight: 700; margin: 0 0 10px 0; letter-spacing: -0.03em; color: #ffffff; }
        .title-accent { font-weight: 300; color: #888888; font-style: italic; }
        .page-subtitle { font-size: 14.5px; color: #808080; max-width: 760px; line-height: 1.65; margin: 0; }
        .dashboard-grid { display: grid; grid-template-columns: 360px 1fr; gap: 44px; align-items: start; }
        .sidebar-stack { display: flex; flex-direction: column; gap: 32px; }
        .dark-panel { background: #090909; border: 1px solid #141414; border-radius: 14px; padding: 32px; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6); transition: border-color 0.2s; }
        .dark-panel:hover { border-color: #1c1c1c; }
        .component-group-box { display: flex; flex-direction: column; }
        .title-action-header { display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px; }
        .group-label { font-size: 11px; font-weight: 700; color: #555555; letter-spacing: 0.14em; text-transform: uppercase; margin: 0; }
        .ai-generation-btn, .path-action-btn { width: 100%; height: 42px; background: #ffffff; color: #000000; border: 1px solid transparent; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; transition: background 0.2s, border-color 0.2s, color 0.2s; display: inline-flex; align-items: center; justify-content: center; box-sizing: border-box; }
        .ai-generation-btn:hover:not(:disabled) { background: #e5e5e5; }
        .ai-generation-btn:disabled { background: #121212; color: #444; cursor: not-allowed; }
        .path-action-btn { background: transparent; border-color: #222222; color: #888888; }
        .path-action-btn:hover { border-color: #555555; color: #ffffff; background: #111111; }
        .path-action-btn.variant-filled { background: #ffffff; color: #000000; border: none; }
        .path-action-btn.variant-filled:hover { background: #e5e5e5; }
        .quizzes-inner-stack { display: flex; flex-direction: column; gap: 14px; }
        .nested-empty-card { font-size: 12px; color: #555; text-align: center; padding: 32px 16px; border: 1px dashed #141414; border-radius: 10px; line-height: 1.6; }
        .nested-empty-card p { margin: 0 0 6px 0; font-weight: 600; color: #777; }
        .nested-empty-card span { color: #444; font-size: 11px; }
        .main-content-stack { display: flex; flex-direction: column; gap: 40px; }
        .active-recall-outer-box { position: relative; width: 100%; }
        .active-recall-outer-box :global(.active-recall-wrapper) { background: #090909 !important; border: 1px solid #141414 !important; border-radius: 14px !important; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6) !important; padding: 36px !important; }
        .active-recall-outer-box :global(.flashcard-container) { height: 290px !important; margin-bottom: 24px !important; }
        .active-recall-outer-box :global(.card-face) { background: #0d0d0d !important; border: 1px solid #1a1a1a !important; border-radius: 12px !important; padding: 44px !important; }
        .active-recall-outer-box :global(.card-back) { background: #0f0f0f !important; border-color: #222222 !important; }
        .active-recall-outer-box :global(.card-text) { font-size: 18px !important; color: #ffffff !important; font-weight: 400; line-height: 1.65 !important; }
        .active-recall-outer-box :global(.card-badge) { background: #161616; padding: 6px 12px; border-radius: 6px; font-size: 11px !important; color: #666 !important; border: 1px solid #222; }
        .active-recall-outer-box :global(.flip-hint) { color: #444 !important; font-size: 12px !important; margin-top: 36px !important; letter-spacing: 0.02em; }
        .active-recall-outer-box :global(.action-button-group) { gap: 16px !important; display: flex !important; }
        .active-recall-outer-box :global(.btn) { height: 44px !important; padding: 0 28px !important; font-size: 13px !important; border-radius: 8px !important; font-weight: 600 !important; display: inline-flex !important; align-items: center !important; justify-content: center !important; flex: 1 !important; transition: background 0.2s, border-color 0.2s !important; }
        .active-recall-outer-box :global(.btn-dont-know) { background: #120a0a !important; border: 1px solid #2d1414 !important; color: #ef4444 !important; }
        .active-recall-outer-box :global(.btn-dont-know:hover) { background: #1f0f10 !important; border-color: #451a1c !important; }
        .active-recall-outer-box :global(.btn-know) { background: #0a120c !important; border: 1px solid #142d1b !important; color: #22c55e !important; }
        .active-recall-outer-box :global(.btn-know:hover) { background: #0f1f14 !important; border-color: #1a4527 !important; }
        .active-recall-outer-box :global(.btn-next) { background: #ffffff !important; color: #000000 !important; font-weight: 700 !important; border: none !important; }
        .active-recall-outer-box :global(.btn-next:hover) { background: #e5e5e5; }
        .card-counter-badge { position: absolute; top: 36px; right: 36px; font-size: 11px; font-weight: 700; color: #555; background: #121212; padding: 5px 12px; border-radius: 30px; z-index: 10; border: 1px solid #1c1c1c; letter-spacing: 0.05em; }
        .empty-recall-fallback { background: #090909; border: 1px solid #141414; border-radius: 14px; padding: 64px 32px; text-align: center; }
        .fallback-header { font-size: 20px; margin: 0 0 10px 0; color: #fff; font-weight: 500; letter-spacing: -0.01em; }
        .fallback-text { font-size: 13.5px; color: #555; max-width: 460px; margin: 0 auto; line-height: 1.65; }
        .insights-row-container { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; min-height: 240px; }
        .insights-row-container :global(.insight-card-container) { background: #090909 !important; border: 1px solid #141414 !important; border-radius: 14px !important; padding: 32px !important; display: flex !important; flex-direction: column !important; justify-content: space-between !important; height: 100% !important; box-sizing: border-box !important; }
        .insights-row-container :global(.insight-card-title) { font-size: 14px !important; color: #fff !important; font-weight: 600 !important; margin: 0 !important; }
        .insights-row-container :global(.insight-body-text) { font-size: 13.5px !important; color: #888888 !important; line-height: 1.6 !important; margin: 14px 0 24px 0 !important; font-style: italic; }
        .insights-row-container :global(.insight-action-trigger) { width: 100% !important; height: 42px !important; background: transparent !important; color: #ffffff !important; font-size: 13px !important; font-weight: 600 !important; border: 1px solid #222222 !important; padding: 0 !important; border-radius: 8px !important; display: inline-flex !important; align-items: center !important; justify-content: center !important; transition: all 0.2s !important; text-decoration: none !important; }
        .insights-row-container :global(.insight-action-trigger:hover) { background: #111111 !important; border-color: #555555 !important; }
        .empty-insight-placeholder-box, .optimal-path-static-card { display: flex; flex-direction: column; align-items: flex-start; justify-content: space-between; box-sizing: border-box; height: 100%; }
        .card-heading-badge { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
        .node-icon { font-size: 15px; color: #fff; }
        .spark-glow { color: #fff; text-shadow: 0 0 8px rgba(255,255,255,0.3); }
        .empty-insight-placeholder-box h5, .optimal-path-static-card h5 { font-size: 14px; font-weight: 600; color: #ffffff; margin: 0; letter-spacing: -0.01em; }
        .insight-text, .path-text { font-size: 13.5px; color: #888; line-height: 1.6; margin: 0 0 24px 0; font-style: italic; }
        :global(.timeline-container-card) { background: #090909 !important; border: 1px solid #141414 !important; border-radius: 14px !important; padding: 36px !important; box-shadow: 0 10px 40px rgba(0,0,0,0.6) !important; }
        :global(.weak-topics-box) { background: #090909 !important; border: 1px solid #141414 !important; border-radius: 14px !important; padding: 32px !important; max-width: 100% !important; box-shadow: 0 10px 40px rgba(0,0,0,0.6) !important; }
        :global(.tracker-title) { color: #555555 !important; font-size: 11px !important; font-weight: 700 !important; letter-spacing: 0.14em !important; text-transform: uppercase !important; }
        :global(.topic-name-label) { font-size: 14px !important; color: #fff !important; font-weight: 600 !important; }
        :global(.progress-bar-track) { background: #141414 !important; height: 5px !important; border-radius: 10px !important; }
        :global(.topic-inline-action) { color: #666666 !important; font-size: 12px !important; margin-top: 6px !important; transition: color 0.2s !important; }
        :global(.topic-inline-action:hover) { color: #ffffff !important; }
        .toast-alert-notification { position: fixed; bottom: 36px; right: 36px; background: #090909; border: 1px solid #ffffff; color: #ffffff; padding: 16px 28px; border-radius: 8px; font-size: 13px; font-weight: 600; z-index: 5000; box-shadow: 0 16px 50px rgba(0, 0, 0, 0.8); animation: slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1); font-family: monospace; }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @media (max-width: 1240px) { .dashboard-grid { grid-template-columns: 1fr; gap: 36px; } .revision-page { padding: 36px 24px; } }
        @media (max-width: 768px) { .insights-row-container { grid-template-columns: 1fr; gap: 24px; } }
      `}</style>
    </div>
  );
}









