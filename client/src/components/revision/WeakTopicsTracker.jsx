// 'use client';
// import { useState } from 'react';

// export default function WeakTopicsTracker({ topics, onFocusTopic }) {
//   const [selectedId, setSelectedId] = useState(null);

//   const handleFocus = (topic) => {
//     setSelectedId(topic.id);
//     onFocusTopic?.(topic);
//   };

//   if (!topics || topics.length === 0) {
//     return <div className="weak-topics">No weak topics identified yet.</div>;
//   }

//   return (
//     <div className="weak-topics">
//       <h3 className="weak-topics__title">WEAK TOPICS TRACKER</h3>

//       <div className="weak-topics__list">
//         {topics.map((topic) => (
//           <div key={topic.id} className="weak-topic-item">
//             <div className="weak-topic-info">
//               <span className="weak-topic-name">{topic.name}</span>
//               <div className="weak-topic-stats">
//                 <span className="weak-topic-percentage">{topic.percentage}%</span>
//                 <span className={`weak-topic-status ${topic.status}`}>
//                   {topic.status === 'weak' && '●'}
//                   {topic.status === 'struggling' && '●'}
//                   {topic.status === 'fair' && '●'}
//                 </span>
//               </div>
//             </div>

//             <div className="weak-topic-bar">
//               <div
//                 className="weak-topic-fill"
//                 style={{ width: `${topic.percentage}%`, background: topic.color }}
//               />
//             </div>

//             <button
//               className="weak-topic-btn"
//               onClick={() => handleFocus(topic)}
//               disabled={selectedId === topic.id}
//             >
//               {selectedId === topic.id ? 'Focusing...' : 'Focus Here'}
//             </button>
//           </div>
//         ))}
//       </div>

//       <style jsx>{`
//         .weak-topics {
//           background: #1a1a1a;
//           border: 1px solid #2a2a2a;
//           border-radius: 6px;
//           padding: 24px;
//         }

//         .weak-topics__title {
//           font-size: 10px;
//           font-weight: 700;
//           letter-spacing: 0.14em;
//           text-transform: uppercase;
//           color: #555;
//           margin: 0 0 20px;
//         }

//         .weak-topics__list {
//           display: flex;
//           flex-direction: column;
//           gap: 16px;
//         }

//         .weak-topic-item {
//           display: flex;
//           flex-direction: column;
//           gap: 8px;
//           padding: 14px;
//           background: #111;
//           border: 1px solid #2a2a2a;
//           border-radius: 4px;
//           transition: border-color 0.2s;
//         }

//         .weak-topic-item:hover {
//           border-color: #333;
//         }

//         .weak-topic-info {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//         }

//         .weak-topic-name {
//           font-size: 13px;
//           font-weight: 500;
//           color: #ccc;
//         }

//         .weak-topic-stats {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//         }

//         .weak-topic-percentage {
//           font-size: 12px;
//           font-weight: 700;
//           color: #999;
//         }

//         .weak-topic-status {
//           font-size: 8px;
//           color: #999;
//         }

//         .weak-topic-status.weak {
//           color: #e05252;
//         }

//         .weak-topic-status.struggling {
//           color: #f0a500;
//         }

//         .weak-topic-status.fair {
//           color: #999;
//         }

//         .weak-topic-bar {
//           width: 100%;
//           height: 6px;
//           background: #2a2a2a;
//           border-radius: 3px;
//           overflow: hidden;
//         }

//         .weak-topic-fill {
//           height: 100%;
//           border-radius: 3px;
//           transition: width 0.5s ease;
//         }

//         .weak-topic-btn {
//           align-self: flex-start;
//           padding: 6px 12px;
//           background: transparent;
//           border: 1px solid #333;
//           color: #666;
//           font-size: 11px;
//           font-weight: 600;
//           border-radius: 3px;
//           cursor: pointer;
//           transition: all 0.2s;
//           letter-spacing: 0.04em;
//         }

//         .weak-topic-btn:hover:not(:disabled) {
//           border-color: #555;
//           color: #ccc;
//         }

//         .weak-topic-btn:disabled {
//           border-color: #5edc6f;
//           color: #5edc6f;
//           cursor: default;
//           background: rgba(94, 220, 111, 0.05);
//         }

//         @media (max-width: 768px) {
//           .weak-topics {
//             padding: 16px;
//           }

//           .weak-topics__list {
//             gap: 12px;
//           }

//           .weak-topic-item {
//             padding: 12px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }










// 'use client';

// export default function WeakTopicsTracker({ topics, onFocusTopic }) {
//   // Safe helper to evaluate status bar fill color
//   const getProgressColor = (rate) => {
//     if (rate < 50) return '#f87171'; // Red
//     if (rate < 75) return '#fbbf24'; // Yellow
//     return '#34d399'; // Green
//   };

//   return (
//     <div className="weak-topics-box">
//       <h3 className="tracker-title">WEAK TOPICS TRACKER</h3>
      
//       <div className="topics-list-container">
//         {topics && topics.length > 0 ? (
//           topics.map((topic, index) => {
//             const rate = topic.retention_rate || topic.percentage || 0;
//             return (
//               <div key={topic.id || index} className="topic-row-item">
//                 <div className="topic-info-header">
//                   <span className="topic-name-label">{topic.name || "Unknown Concept"}</span>
//                   <span className="topic-percentage-label" style={{ color: getProgressColor(rate) }}>
//                     {rate}%
//                   </span>
//                 </div>
                
//                 <div className="progress-bar-track">
//                   <div 
//                     className="progress-bar-fill" 
//                     style={{ 
//                       width: `${rate}%`, 
//                       backgroundColor: getProgressColor(rate) 
//                     }} 
//                   />
//                 </div>

//                 <button className="topic-inline-action" onClick={() => onFocusTopic(topic)}>
//                   Trigger AI Deep Dive ➔
//                 </button>
//               </div>
//             );
//           })
//         ) : (
//           <p className="empty-tracker-notice">No tracked topics currently recorded.</p>
//         )}
//       </div>

//       <style jsx>{`
//         .weak-topics-box {
//           background: #121212;
//           border: 1px solid #1a1a1a;
//           border-radius: 8px;
//           padding: 24px;
//           max-width: 360px;
//           width: 100%;
//         }
//         .tracker-title {
//           font-size: 11px;
//           font-weight: 700;
//           color: #666;
//           letter-spacing: 0.12em;
//           margin: 0 0 20px 0;
//         }
//         .topics-list-container { display: flex; flex-direction: column; gap: 20px; }
//         .topic-row-item { display: flex; flex-direction: column; }
//         .topic-info-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
//         .topic-name-label { font-size: 14px; color: #fff; font-weight: 400; }
//         .topic-percentage-label { font-size: 13px; font-weight: 600; }
        
//         .progress-bar-track {
//           height: 4px;
//           background: #1c1c1c;
//           border-radius: 2px;
//           width: 100%;
//           overflow: hidden;
//           margin-bottom: 6px;
//         }
//         .progress-bar-fill { height: 100%; border-radius: 2px; transition: width 0.4s ease; }
        
//         .topic-inline-action {
//           background: none;
//           border: none;
//           color: #444;
//           font-size: 11px;
//           text-align: left;
//           padding: 0;
//           cursor: pointer;
//           font-weight: 600;
//           transition: color 0.2s;
//         }
//         .topic-inline-action:hover { color: #fff; }
//         .empty-tracker-notice { font-size: 13px; color: #444; margin: 0; }
//       `}</style>
//     </div>
//   );
// }







'use client';

export default function WeakTopicsTracker({ topics, onFocusTopic }) {
  const getProgressColor = (rate) => {
    if (rate < 50) return '#f87171'; // Warning Core Red
    if (rate < 75) return '#fbbf24'; // Warning Caution Amber
    return '#34d399'; // Stable Matrix Green
  };

  return (
    <div className="weak-topics-box">
      <h3 className="tracker-title">Weak Topics Tracker</h3>
      
      <div className="topics-list-container">
        {topics && topics.length > 0 ? (
          topics.map((topic, index) => {
            const rate = topic.retention_rate || topic.percentage || 0;
            return (
              <div key={topic.id || index} className="topic-row-item">
                <div className="topic-info-header">
                  <span className="topic-name-label">{topic.name || "Unknown Track Unit"}</span>
                  <span className="topic-percentage-label" style={{ color: getProgressColor(rate) }}>
                    {rate}% retention
                  </span>
                </div>
                
                <div className="progress-bar-track">
                  <div 
                    className="progress-bar-fill" 
                    style={{ 
                      width: `${rate}%`, 
                      backgroundColor: getProgressColor(rate) 
                    }} 
                  />
                </div>

                <button className="topic-inline-action" onClick={() => onFocusTopic(topic)}>
                  Trigger AI Deep Dive ➔
                </button>
              </div>
            );
          })
        ) : (
          <p className="empty-tracker-notice">No tracking anomalies recorded. All retention metrics are nominal.</p>
        )}
      </div>

      <style jsx>{`
        .weak-topics-box {
          background: #0d0d0d;
          border: 1px solid #161616;
          border-radius: 12px;
          padding: 28px;
          width: 100%;
          box-shadow: 0 4px 24px rgba(0,0,0,0.4);
        }
        .tracker-title {
          font-size: 11px;
          font-weight: 700;
          color: #444444;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin: 0 0 24px 0;
        }
        .topics-list-container { display: flex; flex-direction: column; gap: 24px; }
        .topic-row-item { display: flex; flex-direction: column; }
        .topic-info-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
        .topic-name-label { font-size: 14px; color: #ffffff; font-weight: 500; letter-spacing: -0.01em; }
        .topic-percentage-label { font-size: 12px; font-weight: 600; }
        
        .progress-bar-track {
          height: 5px;
          background: #161616;
          border-radius: 10px;
          width: 100%;
          overflow: hidden;
          margin-bottom: 8px;
        }
        .progress-bar-fill { height: 100%; border-radius: 10px; transition: width 0.5s ease-out; }
        
        .topic-inline-action {
          background: none;
          border: none;
          color: #555;
          font-size: 11px;
          text-align: left;
          padding: 0;
          cursor: pointer;
          font-weight: 600;
          transition: color 0.2s;
        }
        .topic-inline-action:hover { color: #ffffff; }
        .empty-tracker-notice { font-size: 13px; color: #444; margin: 0; font-style: italic; line-height: 1.5; }
      `}</style>
    </div>
  );
}