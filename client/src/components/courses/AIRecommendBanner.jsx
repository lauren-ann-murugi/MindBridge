// 'use client';
// import { useState } from 'react';

// export default function AIRecommendBanner({ recommendation, onJoin, onViewCurriculum }) {
//   const [dismissed, setDismissed] = useState(false);

//   if (dismissed) return null;

//   return (
//     <div className="ai-banner">
//       <div className="ai-banner__image">
//         {recommendation?.image && (
//           <img src={recommendation.image} alt={recommendation.title} />
//         )}
//       </div>

//       <div className="ai-banner__content">
//         <span className="ai-banner__eyebrow">RECOMMENDED AI TWIN ACTIVITY</span>
//         <h2 className="ai-banner__title">{recommendation?.title}</h2>
//         <p className="ai-banner__description">{recommendation?.description}</p>

//         <div className="ai-banner__actions">
//           <button
//             className="ai-banner__btn ai-banner__btn--primary"
//             onClick={() => onJoin?.(recommendation)}
//           >
//             Join Session Now
//           </button>
//           <button
//             className="ai-banner__btn ai-banner__btn--ghost"
//             onClick={() => onViewCurriculum?.(recommendation)}
//           >
//             View Full Curriculum
//           </button>
//         </div>
//       </div>

//       <button
//         className="ai-banner__close"
//         onClick={() => setDismissed(true)}
//         aria-label="Dismiss recommendation"
//       >
//         ×
//       </button>

//       <style jsx>{`
//         .ai-banner {
//           position: relative;
//           display: flex;
//           gap: 0;
//           background: #1a1a1a;
//           border: 1px solid #2a2a2a;
//           border-radius: 4px;
//           overflow: hidden;
//           min-height: 200px;
//         }
//         .ai-banner__image {
//           width: 180px;
//           flex-shrink: 0;
//           background: #111;
//           overflow: hidden;
//         }
//         .ai-banner__image img {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//           filter: grayscale(0.3);
//         }
//         .ai-banner__content {
//           flex: 1;
//           padding: 28px 32px;
//           display: flex;
//           flex-direction: column;
//           justify-content: center;
//         }
//         .ai-banner__eyebrow {
//           font-size: 9px;
//           font-weight: 700;
//           letter-spacing: 0.15em;
//           text-transform: uppercase;
//           color: #666;
//           margin-bottom: 10px;
//           display: block;
//         }
//         .ai-banner__title {
//           font-family: 'Georgia', serif;
//           font-size: 28px;
//           font-weight: 400;
//           color: #fff;
//           margin: 0 0 12px;
//           line-height: 1.2;
//         }
//         .ai-banner__description {
//           font-size: 13px;
//           color: #888;
//           margin: 0 0 22px;
//           line-height: 1.6;
//           max-width: 480px;
//         }
//         .ai-banner__actions {
//           display: flex;
//           gap: 16px;
//           align-items: center;
//         }
//         .ai-banner__btn {
//           font-size: 12px;
//           font-weight: 600;
//           letter-spacing: 0.04em;
//           padding: 9px 20px;
//           border-radius: 2px;
//           cursor: pointer;
//           transition: all 0.15s;
//         }
//         .ai-banner__btn--primary {
//           background: #fff;
//           color: #000;
//           border: 1px solid #fff;
//         }
//         .ai-banner__btn--primary:hover {
//           background: #e0e0e0;
//           border-color: #e0e0e0;
//         }
//         .ai-banner__btn--ghost {
//           background: transparent;
//           color: #999;
//           border: none;
//           padding: 9px 0;
//           text-decoration: underline;
//           text-underline-offset: 3px;
//         }
//         .ai-banner__btn--ghost:hover {
//           color: #fff;
//         }
//         .ai-banner__close {
//           position: absolute;
//           top: 12px;
//           right: 16px;
//           background: none;
//           border: none;
//           color: #444;
//           font-size: 22px;
//           cursor: pointer;
//           line-height: 1;
//           transition: color 0.15s;
//         }
//         .ai-banner__close:hover {
//           color: #fff;
//         }
//       `}</style>
//     </div>
//   );
// }







// 'use client';
// import { useState } from 'react';

// export default function AIRecommendBanner({ recommendation, onJoin, onViewCurriculum }) {
//   const [dismissed, setDismissed] = useState(false);

//   if (dismissed) return null;

//   return (
//     <div className="ai-banner">
//       <div className="ai-banner__image">
//         {recommendation?.image ? (
//           <img src={recommendation.image} alt={recommendation.title} />
//         ) : (
//           <div className="ai-banner__image-fallback">♔</div>
//         )}
//       </div>

//       <div className="ai-banner__content">
//         <span className="ai-banner__eyebrow">RECOMMENDED AI TWIN ACTIVITY</span>
//         <h2 className="ai-banner__title">{recommendation?.title}</h2>
//         <p className="ai-banner__description">{recommendation?.description}</p>

//         <div className="ai-banner__actions">
//           <button
//             className="ai-banner__btn ai-banner__btn--primary"
//             onClick={() => onJoin?.(recommendation)}
//           >
//             Join Session Now
//           </button>
//           <button
//             className="ai-banner__btn ai-banner__btn--ghost"
//             onClick={() => onViewCurriculum?.(recommendation)}
//           >
//             View Full Curriculum
//           </button>
//         </div>
//       </div>

//       <button
//         className="ai-banner__close"
//         onClick={() => setDismissed(true)}
//         aria-label="Dismiss recommendation"
//       >
//         ×
//       </button>

//       <style jsx>{`
//         .ai-banner {
//           position: relative;
//           display: flex;
//           gap: 0;
//           background: #0b0b0e;
//           border: 1px solid rgba(255, 255, 255, 0.04);
//           border-radius: 16px;
//           overflow: hidden;
//           min-height: 180px;
//         }
//         .ai-banner__image {
//           width: 240px;
//           flex-shrink: 0;
//           background: #09090b;
//           overflow: hidden;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           border-right: 1px solid rgba(255, 255, 255, 0.03);
//         }
//         .ai-banner__image img {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//         }
//         .ai-banner__image-fallback {
//           font-size: 72px;
//           opacity: 0.85;
//           filter: grayscale(100%);
//           color: #fff;
//           user-select: none;
//         }
//         .ai-banner__content {
//           flex: 1;
//           padding: 32px 40px;
//           display: flex;
//           flex-direction: column;
//           justify-content: center;
//         }
//         .ai-banner__eyebrow {
//           font-size: 9px;
//           font-weight: 700;
//           letter-spacing: 0.08em;
//           text-transform: uppercase;
//           color: rgba(255, 255, 255, 0.4);
//           margin-bottom: 6px;
//           display: block;
//         }
//         .ai-banner__title {
//           font-family: 'Cormorant Garamond', serif;
//           font-size: 24px;
//           font-weight: 400;
//           color: #fff;
//           margin: 0 0 10px;
//           line-height: 1.2;
//         }
//         .ai-banner__description {
//           font-size: 13px;
//           color: rgba(255, 255, 255, 0.45);
//           margin: 0 0 24px;
//           line-height: 1.5;
//           max-width: 600px;
//         }
//         .ai-banner__actions {
//           display: flex;
//           gap: 12px;
//           align-items: center;
//         }
//         .ai-banner__btn {
//           font-size: 12px;
//           font-weight: 600;
//           letter-spacing: 0.02em;
//           padding: 8px 20px;
//           border-radius: 6px;
//           cursor: pointer;
//           transition: all 0.15s ease;
//         }
//         .ai-banner__btn--primary {
//           background: #fff;
//           color: #000;
//           border: none;
//         }
//         .ai-banner__btn--primary:hover {
//           background: #e0e0e0;
//         }
//         .ai-banner__btn--ghost {
//           background: rgba(255, 255, 255, 0.03);
//           color: #fff;
//           border: 1px solid rgba(255, 255, 255, 0.08);
//         }
//         .ai-banner__btn--ghost:hover {
//           background: rgba(255, 255, 255, 0.06);
//           border-color: rgba(255, 255, 255, 0.15);
//         }
//         .ai-banner__close {
//           position: absolute;
//           top: 12px;
//           right: 16px;
//           background: none;
//           border: none;
//           color: rgba(255, 255, 255, 0.2);
//           font-size: 22px;
//           cursor: pointer;
//           line-height: 1;
//           transition: color 0.15s;
//         }
//         .ai-banner__close:hover {
//           color: #fff;
//         }
//       `}</style>
//     </div>
//   );
// }







'use client';

import { useState } from 'react';

export default function AIRecommendBanner({ recommendation, onJoin, onViewCurriculum }) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="relative flex gap-0 bg-[#0b0b0e] border border-[rgba(255,255,255,0.04)] rounded-2xl overflow-hidden min-h-[180px]">
      <div className="w-[240px] flex-shrink-0 bg-[#09090b] overflow-hidden flex items-center justify-center border-r border-[rgba(255,255,255,0.03)]">
        {recommendation?.image ? (
          <img src={recommendation.image} alt={recommendation.title} className="w-full h-full object-cover" />
        ) : (
          <div className="text-[72px] opacity-85 grayscale text-white select-none">♔</div>
        )}
      </div>
      
      <div className="flex-1 px-10 py-8 flex flex-col justify-center">
        <span className="text-[9px] font-bold tracking-[0.08em] uppercase text-[rgba(255,255,255,0.4)] mb-1.5 block">
          RECOMMENDED AI TWIN ACTIVITY
        </span>
        <h2 className="font-['Cormorant_Garamond'] text-2xl font-light text-white m-0 mb-2.5 leading-[1.2]">
          {recommendation?.title}
        </h2>
        <p className="text-[13px] text-[rgba(255,255,255,0.45)] m-0 mb-6 leading-[1.5] max-w-[600px]">
          {recommendation?.description}
        </p>
        <div className="flex gap-3 items-center">
          <button 
            className="text-xs font-semibold tracking-[0.02em] px-5 py-2 rounded-md cursor-pointer transition-all duration-150 bg-white text-black border-none hover:bg-[#e0e0e0]"
            onClick={() => onJoin?.(recommendation)}
          >
            Join Session Now
          </button>
          <button 
            className="text-xs font-semibold tracking-[0.02em] px-5 py-2 rounded-md cursor-pointer transition-all duration-150 bg-[rgba(255,255,255,0.03)] text-white border border-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.15)]"
            onClick={() => onViewCurriculum?.(recommendation)}
          >
            View Full Curriculum
          </button>
        </div>
      </div>

      <button 
        className="absolute top-3 right-4 bg-none border-none text-[rgba(255,255,255,0.2)] text-[22px] cursor-pointer leading-none transition-colors duration-150 hover:text-white"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss recommendation"
      >
        ×
      </button>
    </div>
  );
}