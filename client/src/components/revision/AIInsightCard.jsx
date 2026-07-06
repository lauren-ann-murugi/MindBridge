// 'use client';
// import { useState } from 'react';

// export default function AIInsightCard({ insight, onAction }) {
//   const [clicked, setClicked] = useState(false);

//   const handleAction = () => {
//     setClicked(true);
//     onAction?.(insight);
//     setTimeout(() => setClicked(false), 1500);
//   };

//   const getCardColor = () => {
//     if (insight.type === 'warning') return 'warning';
//     if (insight.type === 'suggestion') return 'suggestion';
//     return 'default';
//   };

//   return (
//     <div className={`ai-insight-card ${getCardColor()}`}>
//       <div className="ai-insight-header">
//         <h4 className="ai-insight-title">{insight.title}</h4>
//         <span className={`ai-insight-badge ${insight.type}`}>
//           {insight.type === 'warning' && '⚠'}
//           {insight.type === 'suggestion' && '✓'}
//         </span>
//       </div>

//       <p className="ai-insight-content">{insight.content}</p>

//       <button
//         className="ai-insight-btn"
//         onClick={handleAction}
//         disabled={clicked}
//       >
//         {clicked ? 'Applied ✓' : insight.action}
//       </button>

//       <style jsx>{`
//         .ai-insight-card {
//           background: #1a1a1a;
//           border: 1px solid #2a2a2a;
//           border-radius: 4px;
//           padding: 16px;
//           transition: all 0.2s;
//         }

//         .ai-insight-card.warning {
//           border-left: 3px solid #e05252;
//           background: rgba(224, 82, 82, 0.05);
//         }

//         .ai-insight-card.suggestion {
//           border-left: 3px solid #5edc6f;
//           background: rgba(94, 220, 111, 0.05);
//         }

//         .ai-insight-card:hover {
//           border-color: #333;
//         }

//         .ai-insight-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 10px;
//         }

//         .ai-insight-title {
//           font-size: 12px;
//           font-weight: 700;
//           color: #fff;
//           margin: 0;
//           letter-spacing: 0.05em;
//         }

//         .ai-insight-badge {
//           font-size: 14px;
//         }

//         .ai-insight-badge.warning {
//           color: #e05252;
//         }

//         .ai-insight-badge.suggestion {
//           color: #5edc6f;
//         }

//         .ai-insight-content {
//           font-size: 12px;
//           color: #888;
//           margin: 0 0 12px;
//           line-height: 1.5;
//         }

//         .ai-insight-btn {
//           width: 100%;
//           padding: 8px 12px;
//           background: transparent;
//           border: 1px solid #333;
//           color: #666;
//           font-size: 11px;
//           font-weight: 600;
//           border-radius: 3px;
//           cursor: pointer;
//           transition: all 0.2s;
//           letter-spacing: 0.04em;
//           text-transform: uppercase;
//         }

//         .ai-insight-card.warning .ai-insight-btn {
//           border-color: #e05252;
//           color: #e05252;
//         }

//         .ai-insight-card.warning .ai-insight-btn:hover:not(:disabled) {
//           background: rgba(224, 82, 82, 0.1);
//         }

//         .ai-insight-card.suggestion .ai-insight-btn {
//           border-color: #5edc6f;
//           color: #5edc6f;
//         }

//         .ai-insight-card.suggestion .ai-insight-btn:hover:not(:disabled) {
//           background: rgba(94, 220, 111, 0.1);
//         }

//         .ai-insight-btn:disabled {
//           opacity: 0.7;
//           cursor: default;
//         }

//         @media (max-width: 768px) {
//           .ai-insight-card {
//             padding: 14px;
//           }

//           .ai-insight-title {
//             font-size: 11px;
//           }

//           .ai-insight-content {
//             font-size: 11px;
//           }

//           .ai-insight-btn {
//             padding: 7px 10px;
//             font-size: 10px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }











// 'use client';

// export default function AIInsightCard({ insight, onAction }) {
//   if (!insight) return null;

//   return (
//     <div className="insight-card-container">
//       <div className="insight-card-header">
//         <span className="insight-icon-spark">✦</span>
//         <h4 className="insight-card-title">{insight.type || "AI Insight"}</h4>
//       </div>
      
//       <p className="insight-body-text">
//         "{insight.message || "Review recommendations are being compiled dynamically."}"
//       </p>
      
//       <button className="insight-action-trigger" onClick={() => onAction(insight)}>
//         {insight.action_text || "Start Deep Dive"} ↗
//       </button>

//       <style jsx>{`
//         .insight-card-container {
//           background: #141414;
//           border: 1px solid #222;
//           border-radius: 6px;
//           padding: 20px;
//           display: flex;
//           flex-direction: column;
//           align-items: flex-start;
//           transition: border-color 0.2s;
//         }
//         .insight-card-container:hover { border-color: #333; }
//         .insight-card-header { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; }
//         .insight-icon-spark { color: #fff; font-size: 14px; }
//         .insight-card-title { font-size: 13px; font-weight: 600; color: #fff; margin: 0; letter-spacing: 0.02em; }
//         .insight-body-text { font-size: 13px; color: #888; line-height: 1.5; margin: 0 0 16px 0; font-style: normal; }
//         .insight-action-trigger {
//           background: none;
//           border: none;
//           color: #fff;
//           font-size: 12px;
//           font-weight: 600;
//           padding: 0;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           gap: 4px;
//         }
//         .insight-action-trigger:hover { text-decoration: underline; }
//       `}</style>
//     </div>
//   );
// }









'use client';

export default function AIInsightCard({ insight, onAction }) {
  if (!insight) return null;

  return (
    <div className="insight-card-container">
      <div className="insight-card-header">
        <span className="insight-icon-spark">✦</span>
        <h4 className="insight-card-title">{insight.type || "MindBridge AI Twin Insight"}</h4>
      </div>
      
      <p className="insight-body-text">
        "{insight.message || insight.text || "Review recommendations are being compiled dynamically."}"
      </p>
      
      <button className="insight-action-trigger" onClick={() => onAction(insight)}>
        {insight.action_text || "Start Deep Dive"} ↗
      </button>

      <style jsx>{`
        .insight-card-container {
          background: #0d0d0d;
          border: 1px solid #161616;
          border-radius: 12px;
          padding: 28px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: space-between;
          height: 100%;
          box-shadow: 0 4px 24px rgba(0,0,0,0.4);
        }
        .insight-card-header { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
        .insight-icon-spark { color: #ffffff; font-size: 14px; text-shadow: 0 0 8px rgba(255,255,255,0.4); }
        .insight-card-title { font-size: 14px; font-weight: 600; color: #fff; margin: 0; letter-spacing: -0.01em; }
        .insight-body-text { font-size: 13px; color: #888888; line-height: 1.6; margin: 0 0 24px 0; font-style: italic; }
        .insight-action-trigger {
          background: none;
          color: #ffffff;
          font-size: 12px;
          font-weight: 600;
          border: 1px solid #222;
          padding: 6px 14px;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s;
        }
        .insight-action-trigger:hover { background: #161616; border-color: #444; }
      `}</style>
    </div>
  );
}