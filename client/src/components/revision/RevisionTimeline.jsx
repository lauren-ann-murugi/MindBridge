// 'use client';

// export default function RevisionTimeline({ timeline }) {
//   if (!timeline) {
//     return <div className="revision-timeline">Loading...</div>;
//   }

//   return (
//     <div className="revision-timeline">
//       <h3 className="revision-timeline__title">Revision Timeline</h3>

//       <div className="timeline-items">
//         {timeline.map((item, idx) => (
//           <div key={item.id} className={`timeline-item ${item.status}`}>
//             {idx < timeline.length - 1 && (
//               <div className="timeline-connector" />
//             )}

//             <div className="timeline-marker">{item.icon}</div>

//             <div className="timeline-content">
//               <h4 className="timeline-item-title">{item.title}</h4>
//               <p className="timeline-timestamp">{item.timestamp}</p>
//               <p className="timeline-details">{item.details}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       <style jsx>{`
//         .revision-timeline {
//           background: #1a1a1a;
//           border: 1px solid #2a2a2a;
//           border-radius: 6px;
//           padding: 24px;
//         }

//         .revision-timeline__title {
//           font-family: 'Georgia', serif;
//           font-size: 18px;
//           font-weight: 400;
//           margin: 0 0 24px;
//           color: #fff;
//         }

//         .timeline-items {
//           display: flex;
//           flex-direction: column;
//           position: relative;
//         }

//         .timeline-item {
//           display: flex;
//           gap: 16px;
//           padding: 16px 0;
//           position: relative;
//         }

//         .timeline-connector {
//           position: absolute;
//           left: 19px;
//           top: 48px;
//           width: 2px;
//           height: calc(100% - 20px);
//           background: #2a2a2a;
//         }

//         .timeline-item.completed .timeline-connector {
//           background: #5edc6f;
//         }

//         .timeline-item:last-child {
//           padding-bottom: 0;
//         }

//         .timeline-marker {
//           width: 40px;
//           height: 40px;
//           border-radius: 50%;
//           background: #111;
//           border: 2px solid #2a2a2a;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           flex-shrink: 0;
//           font-size: 16px;
//           z-index: 1;
//         }

//         .timeline-item.completed .timeline-marker {
//           background: rgba(94, 220, 111, 0.1);
//           border-color: #5edc6f;
//         }

//         .timeline-item.active .timeline-marker {
//           background: rgba(94, 220, 111, 0.15);
//           border-color: #5edc6f;
//           animation: pulse 2s ease-in-out infinite;
//         }

//         .timeline-item.scheduled .timeline-marker {
//           background: #1a1a1a;
//           border-color: #333;
//         }

//         @keyframes pulse {
//           0%, 100% {
//             box-shadow: none;
//           }
//           50% {
//             box-shadow: 0 0 0 4px rgba(94, 220, 111, 0.2);
//           }
//         }

//         .timeline-content {
//           flex: 1;
//           min-width: 0;
//           padding-top: 4px;
//         }

//         .timeline-item-title {
//           font-size: 13px;
//           font-weight: 600;
//           color: #fff;
//           margin: 0 0 4px;
//         }

//         .timeline-timestamp {
//           font-size: 11px;
//           color: #666;
//           margin: 0 0 6px;
//           font-weight: 500;
//         }

//         .timeline-details {
//           font-size: 12px;
//           color: #888;
//           margin: 0;
//           line-height: 1.4;
//         }

//         @media (max-width: 768px) {
//           .revision-timeline {
//             padding: 16px;
//           }

//           .timeline-item {
//             gap: 12px;
//             padding: 12px 0;
//           }

//           .timeline-marker {
//             width: 36px;
//             height: 36px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }















// 'use client';

// export default function RevisionTimeline({ timeline }) {
//   return (
//     <div className="timeline-container-card">
//       <h3 className="timeline-section-title">Revision Timeline</h3>
      
//       <div className="timeline-stack">
//         {timeline && timeline.length > 0 ? (
//           timeline.map((item, index) => (
//             <div key={item.id || index} className={`timeline-node-row ${item.completed ? 'node-done' : ''}`}>
//               <div className="node-left-track">
//                 <div className="node-indicator-circle">
//                   {item.completed && <span className="checkmark-icon">✓</span>}
//                 </div>
//                 {index < timeline.length - 1 && <div className="vertical-connector-line" />}
//               </div>

//               <div className="node-content-block">
//                 <div className="node-text-group">
//                   <h4 className="node-title">{item.title || "Study Session"}</h4>
//                   <p className="node-timestamp">
//                     {item.status_text || (item.completed ? "Completed" : "Scheduled")} • {item.time || "12:00 PM"}
//                   </p>
//                 </div>
                
//                 {item.xp_reward && (
//                   <span className="timeline-xp-badge">+{item.xp_reward} XP</span>
//                 )}
                
//                 {!item.completed && item.is_active && (
//                   <button className="timeline-join-action-btn">Join Now</button>
//                 )}
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="empty-timeline-notice">No revision operations mapped for today's schedule.</p>
//         )}
//       </div>

//       <style jsx>{`
//         .timeline-container-card {
//           background: #121212;
//           border: 1px solid #1a1a1a;
//           border-radius: 8px;
//           padding: 24px;
//           width: 100%;
//         }
//         .timeline-section-title {
//           font-family: 'Georgia', serif;
//           font-size: 20px;
//           font-weight: 400;
//           margin: 0 0 24px 0;
//           color: #fff;
//         }
//         .timeline-stack { display: flex; flex-direction: column; }
//         .timeline-node-row { display: flex; gap: 16px; min-height: 70px; }
        
//         .node-left-track { display: flex; flex-direction: column; align-items: center; width: 16px; }
//         .node-indicator-circle {
//           width: 16px;
//           height: 16px;
//           border-radius: 50%;
//           border: 1px solid #444;
//           background: #121212;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           z-index: 2;
//         }
//         .node-done .node-indicator-circle { background: #fff; border-color: #fff; }
//         .checkmark-icon { color: #000; font-size: 10px; font-weight: 900; }
//         .vertical-connector-line { width: 1px; background: #222; flex: 1; margin: 4px 0; }
        
//         .node-content-block {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           flex: 1;
//           padding-bottom: 20px;
//         }
//         .node-title { font-size: 14px; font-weight: 600; color: #fff; margin: 0 0 4px 0; }
//         .node-timestamp { font-size: 12px; color: #666; margin: 0; }
        
//         .timeline-xp-badge { font-size: 11px; font-weight: 600; color: #888; letter-spacing: 0.02em; }
//         .timeline-join-action-btn {
//           background: #fff;
//           color: #000;
//           border: none;
//           padding: 6px 14px;
//           font-size: 12px;
//           font-weight: 700;
//           border-radius: 20px;
//           cursor: pointer;
//         }
//         .timeline-join-action-btn:hover { background: #e5e5e5; }
//         .empty-timeline-notice { font-size: 13px; color: #444; }
//       `}</style>
//     </div>
//   );
// }










// 'use client';

// export default function RevisionTimeline({ timeline }) {
//   return (
//     <div className="timeline-container-card">
//       <h3 className="timeline-section-title">Revision Timeline</h3>
      
//       <div className="timeline-stack">
//         {timeline && timeline.length > 0 ? (
//           timeline.map((item, index) => (
//             <div key={item.id || index} className={`timeline-node-row ${item.completed ? 'node-done' : ''}`}>
//               <div className="node-left-track">
//                 <div className="node-indicator-circle">
//                   {item.completed && <span className="checkmark-icon">✓</span>}
//                 </div>
//                 {index < timeline.length - 1 && <div className="vertical-connector-line" />}
//               </div>

//               <div className="node-content-block">
//                 <div className="node-text-group">
//                   <h4 className="node-title">{item.title || "Study Session Pipeline"}</h4>
//                   <p className="node-timestamp">
//                     {item.status_text || (item.completed ? "Completed" : "Scheduled")} • {item.time || "12:00 PM"}
//                   </p>
//                 </div>
                
//                 {item.xp_reward && (
//                   <span className="timeline-xp-badge">+{item.xp_reward} XP</span>
//                 )}
                
//                 {!item.completed && item.is_active && (
//                   <button className="timeline-join-action-btn">Join Session</button>
//                 )}
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="empty-timeline-notice">No model activity logs recorded for this validation schedule.</p>
//         )}
//       </div>

//       <style jsx>{`
//         .timeline-container-card {
//           background: #0d0d0d;
//           border: 1px solid #161616;
//           border-radius: 12px;
//           padding: 32px;
//           width: 100%;
//           box-shadow: 0 4px 24px rgba(0,0,0,0.4);
//         }
//         .timeline-section-title {
//           font-size: 15px;
//           font-weight: 600;
//           margin: 0 0 28px 0;
//           color: #fff;
//           letter-spacing: -0.01em;
//         }
//         .timeline-stack { display: flex; flex-direction: column; }
//         .timeline-node-row { display: flex; gap: 20px; min-height: 76px; }
        
//         .node-left-track { display: flex; flex-direction: column; align-items: center; width: 16px; }
//         .node-indicator-circle {
//           width: 16px;
//           height: 16px;
//           border-radius: 50%;
//           border: 1px solid #262626;
//           background: #111111;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           z-index: 2;
//         }
//         .node-done .node-indicator-circle { background: #ffffff; border-color: #ffffff; }
//         .checkmark-icon { color: #000000; font-size: 10px; font-weight: 900; }
//         .vertical-connector-line { width: 1px; background: #1c1c1c; flex: 1; margin: 6px 0; }
        
//         .node-content-block {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           flex: 1;
//           padding-bottom: 24px;
//           border-bottom: 1px solid #141414;
//         }
//         .timeline-node-row:last-child .node-content-block { border-bottom: none; }
        
//         .node-title { font-size: 14px; font-weight: 500; color: #fff; margin: 0 0 6px 0; }
//         .node-timestamp { font-size: 12px; color: #555; margin: 0; }
        
//         .timeline-xp-badge { font-size: 11px; font-weight: 600; color: #888; background: #161616; padding: 4px 8px; border-radius: 4px; }
//         .timeline-join-action-btn {
//           background: #ffffff;
//           color: #000000;
//           border: none;
//           padding: 8px 16px;
//           font-size: 12px;
//           font-weight: 700;
//           border-radius: 6px;
//           cursor: pointer;
//           transition: background 0.2s;
//         }
//         .timeline-join-action-btn:hover { background: #e5e5e5; }
//         .empty-timeline-notice { font-size: 13px; color: #444; margin: 0; font-style: italic; }
//       `}</style>
//     </div>
//   );
// }








// 'use client';

// export default function RevisionTimeline({ timeline, onActionClick }) {
//   return (
//     <div className="timeline-container-card">
//       <h3 className="timeline-section-title">Revision Timeline</h3>
      
//       <div className="timeline-stack">
//         {timeline && timeline.length > 0 ? (
//           timeline.map((item, index) => {
//             // Treat the item as active if it's explicitly marked true, 
//             // OR if it's not completed and contains "Ongoing"/"Scheduled" states
//             const isActiveNode = 
//               item.is_active || 
//               (!item.completed && String(item.status_text || item.title).toLowerCase().includes('ongoing')) ||
//               (!item.completed && String(item.time || '').toLowerCase().includes('ongoing'));

//             return (
//               <div key={item.id || index} className={`timeline-node-row ${item.completed ? 'node-done' : ''}`}>
//                 <div className="node-left-track">
//                   <div className="node-indicator-circle">
//                     {item.completed && <span className="checkmark-icon">✓</span>}
//                   </div>
//                   {index < timeline.length - 1 && <div className="vertical-connector-line" />}
//                 </div>

//                 <div className="node-content-block">
//                   <div className="node-text-group">
//                     <h4 className="node-title">{item.title || "Study Session Pipeline"}</h4>
//                     <p className="node-timestamp">
//                       {item.status_text || (item.completed ? "Completed" : "Scheduled")} • {item.time || "12:00 PM"}
//                     </p>
//                   </div>
                  
//                   <div className="node-actions-area">
//                     {item.xp_reward && (
//                       <span className="timeline-xp-badge">+{item.xp_reward} XP</span>
//                     )}
                    
//                     {!item.completed && isActiveNode && (
//                       <button 
//                         type="button"
//                         className="timeline-join-action-btn"
//                         onClick={(e) => {
//                           e.preventDefault();
//                           if (onActionClick) {
//                             onActionClick(item);
//                           } else {
//                             console.warn("Timeline action clicked, but 'onActionClick' handler property is uninitialized.");
//                           }
//                         }}
//                       >
//                         Join Session
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             );
//           })
//         ) : (
//           <p className="empty-timeline-notice">No model activity logs recorded for this validation schedule.</p>
//         )}
//       </div>

//       <style jsx>{`
//         .timeline-container-card {
//           background: #090909;
//           border: 1px solid #141414;
//           border-radius: 14px;
//           padding: 32px;
//           width: 100%;
//           box-shadow: 0 10px 40px rgba(0,0,0,0.6);
//         }
//         .timeline-section-title {
//           font-size: 15px;
//           font-weight: 600;
//           margin: 0 0 28px 0;
//           color: #fff;
//           letter-spacing: -0.01em;
//         }
//         .timeline-stack { display: flex; flex-direction: column; }
//         .timeline-node-row { display: flex; gap: 20px; min-height: 80px; }
        
//         .node-left-track { display: flex; flex-direction: column; align-items: center; width: 16px; }
//         .node-indicator-circle {
//           width: 16px;
//           height: 16px;
//           border-radius: 50%;
//           border: 1px solid #222222;
//           background: #090909;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           z-index: 2;
//           transition: all 0.2s;
//         }
//         .node-done .node-indicator-circle { background: #ffffff; border-color: #ffffff; }
//         .checkmark-icon { color: #000000; font-size: 10px; font-weight: 900; }
//         .vertical-connector-line { width: 1px; background: #141414; flex: 1; margin: 6px 0; }
        
//         .node-content-block {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           flex: 1;
//           padding-bottom: 24px;
//           border-bottom: 1px solid #121212;
//         }
//         .timeline-node-row:last-child .node-content-block { border-bottom: none; }
        
//         .node-text-group { display: flex; flex-direction: column; }
//         .node-title { font-size: 14px; font-weight: 600; color: #fff; margin: 0 0 6px 0; letter-spacing: -0.01em; }
//         .node-timestamp { font-size: 12.5px; color: #666; margin: 0; }
        
//         .node-actions-area { display: flex; align-items: center; gap: 16px; }
//         .timeline-xp-badge { 
//           font-size: 11px; 
//           font-weight: 600; 
//           color: #888; 
//           background: #121212; 
//           padding: 5px 10px; 
//           border-radius: 6px; 
//           border: 1px solid #1c1c1c;
//           font-family: monospace;
//         }
        
//         .timeline-join-action-btn {
//           height: 36px;
//           background: #ffffff;
//           color: #000000;
//           border: none;
//           padding: 0 18px;
//           font-size: 12.5px;
//           font-weight: 600;
//           border-radius: 8px;
//           cursor: pointer;
//           transition: background 0.2s, transform 0.1s;
//           display: inline-flex;
//           align-items: center;
//           justify-content: center;
//         }
//         .timeline-join-action-btn:hover { background: #e5e5e5; }
//         .timeline-join-action-btn:active { transform: scale(0.98); }
        
//         .empty-timeline-notice { font-size: 13.5px; color: #555; margin: 0; font-style: italic; }
//       `}</style>
//     </div>
//   );
// }










'use client';

export default function RevisionTimeline({ timeline, onActionClick }) {
  return (
    <div className="timeline-container-card">
      <h3 className="timeline-section-title">Revision Timeline</h3>
      
      <div className="timeline-stack">
        {timeline && timeline.length > 0 ? (
          timeline.map((item, index) => (
            <div key={item.id || index} className={`timeline-node-row ${item.completed ? 'node-done' : ''}`}>
              <div className="node-left-track">
                <div className="node-indicator-circle">
                  {item.completed && <span className="checkmark-icon">✓</span>}
                </div>
                {index < timeline.length - 1 && <div className="vertical-connector-line" />}
              </div>

              <div className="node-content-block">
                <div className="node-text-group">
                  <h4 className="node-title">{item.title || "Study Session Pipeline"}</h4>
                  <p className="node-timestamp">
                    {item.status_text || (item.completed ? "Completed" : "Scheduled")} • {item.time || "12:00 PM"}
                  </p>
                </div>
                
                <div className="node-actions-area">
                  {item.xp_reward && (
                    <span className="timeline-xp-badge">+{item.xp_reward} XP</span>
                  )}
                  
                  {/* The Critical Fix: Attaching the onActionClick wrapper */}
                  {!item.completed && (item.is_active || String(item.time).toLowerCase().includes('ongoing')) && (
                    <button 
                      type="button"
                      className="timeline-join-action-btn"
                      onClick={() => onActionClick && onActionClick(item)}
                    >
                      Join Session
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="empty-timeline-notice">No model activity logs recorded for this validation schedule.</p>
        )}
      </div>

      <style jsx>{`
        .timeline-container-card { background: #090909; border: 1px solid #141414; border-radius: 14px; padding: 32px; width: 100%; box-shadow: 0 10px 40px rgba(0,0,0,0.6); }
        .timeline-section-title { font-size: 15px; font-weight: 600; margin: 0 0 28px 0; color: #fff; letter-spacing: -0.01em; }
        .timeline-stack { display: flex; flex-direction: column; }
        .timeline-node-row { display: flex; gap: 20px; min-height: 80px; }
        .node-left-track { display: flex; flex-direction: column; align-items: center; width: 16px; }
        .node-indicator-circle { width: 16px; height: 16px; border-radius: 50%; border: 1px solid #222222; background: #090909; display: flex; align-items: center; justify-content: center; z-index: 2; }
        .node-done .node-indicator-circle { background: #ffffff; border-color: #ffffff; }
        .checkmark-icon { color: #000000; font-size: 10px; font-weight: 900; }
        .vertical-connector-line { width: 1px; background: #141414; flex: 1; margin: 6px 0; }
        .node-content-block { display: flex; justify-content: space-between; align-items: center; flex: 1; padding-bottom: 24px; border-bottom: 1px solid #121212; }
        .timeline-node-row:last-child .node-content-block { border-bottom: none; }
        .node-text-group { display: flex; flex-direction: column; }
        .node-title { font-size: 14px; font-weight: 600; color: #fff; margin: 0 0 6px 0; letter-spacing: -0.01em; }
        .node-timestamp { font-size: 12.5px; color: #666; margin: 0; }
        .node-actions-area { display: flex; align-items: center; gap: 16px; }
        .timeline-xp-badge { font-size: 11px; font-weight: 600; color: #888; background: #121212; padding: 5px 10px; border-radius: 6px; border: 1px solid #1c1c1c; font-family: monospace; }
        .timeline-join-action-btn { height: 36px; background: #ffffff; color: #000000; border: none; padding: 0 18px; font-size: 12.5px; font-weight: 600; border-radius: 8px; cursor: pointer; transition: background 0.2s, transform 0.1s; display: inline-flex; align-items: center; justify-content: center; }
        .timeline-join-action-btn:hover { background: #e5e5e5; }
        .timeline-join-action-btn:active { transform: scale(0.98); }
        .empty-timeline-notice { font-size: 13.5px; color: #555; margin: 0; font-style: italic; }
      `}</style>
    </div>
  );
}