// 'use client';
// import { useState } from 'react';

// export default function FlashCard({ card, onKnow, onDontKnow, onNext }) {
//   const [flipped, setFlipped] = useState(false);

//   const handleKnow = () => {
//     onKnow?.(card.id);
//     setFlipped(false);
//   };

//   const handleDontKnow = () => {
//     onDontKnow?.(card.id);
//     setFlipped(false);
//   };

//   const handleNext = () => {
//     onNext?.();
//     setFlipped(false);
//   };

//   return (
//     <div className="flashcard-container">
//       <div
//         className={`flashcard ${flipped ? 'flipped' : ''}`}
//         onClick={() => setFlipped(!flipped)}
//       >
//         <div className="flashcard-inner">
//           {/* Front */}
//           <div className="flashcard-front">
//             <p className="flashcard-text">{card.front}</p>
//             <span className="flashcard-hint">Click to reveal answer</span>
//           </div>

//           {/* Back */}
//           <div className="flashcard-back">
//             <p className="flashcard-text">{card.back}</p>
//             <span className="flashcard-hint">Click to hide</span>
//           </div>
//         </div>
//       </div>

//       <div className="flashcard-actions">
//         <button className="flashcard-btn dont-know" onClick={handleDontKnow}>
//           Don't Know
//         </button>
//         <button className="flashcard-btn know" onClick={handleKnow}>
//           Know
//         </button>
//         <button className="flashcard-btn next" onClick={handleNext}>
//           Skip
//         </button>
//       </div>

//       <style jsx>{`
//         .flashcard-container {
//           display: flex;
//           flex-direction: column;
//           gap: 16px;
//           max-width: 500px;
//           margin: 0 auto;
//         }

//         .flashcard {
//           position: relative;
//           width: 100%;
//           aspect-ratio: 2;
//           cursor: pointer;
//           perspective: 1000px;
//         }

//         .flashcard-inner {
//           position: relative;
//           width: 100%;
//           height: 100%;
//           transition: transform 0.6s;
//           transform-style: preserve-3d;
//         }

//         .flashcard.flipped .flashcard-inner {
//           transform: rotateY(180deg);
//         }

//         .flashcard-front,
//         .flashcard-back {
//           position: absolute;
//           width: 100%;
//           height: 100%;
//           backface-visibility: hidden;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           padding: 32px;
//           text-align: center;
//           border-radius: 8px;
//           border: 1px solid #2a2a2a;
//         }

//         .flashcard-front {
//           background: #1a1a1a;
//         }

//         .flashcard-back {
//           background: linear-gradient(135deg, #1a1a1a, #222);
//           transform: rotateY(180deg);
//         }

//         .flashcard-text {
//           font-size: 20px;
//           font-weight: 500;
//           color: #fff;
//           margin: 0 0 16px;
//           line-height: 1.5;
//         }

//         .flashcard-hint {
//           font-size: 11px;
//           color: #555;
//           letter-spacing: 0.05em;
//           text-transform: uppercase;
//           margin-top: auto;
//         }

//         .flashcard-actions {
//           display: flex;
//           gap: 12px;
//           justify-content: center;
//         }

//         .flashcard-btn {
//           padding: 10px 20px;
//           border-radius: 4px;
//           border: 1px solid #333;
//           font-size: 12px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.2s;
//           background: transparent;
//           color: #888;
//         }

//         .flashcard-btn:hover {
//           border-color: #555;
//           color: #ccc;
//         }

//         .flashcard-btn.know {
//           background: rgba(94, 220, 111, 0.1);
//           color: #5edc6f;
//           border-color: #5edc6f;
//         }

//         .flashcard-btn.know:hover {
//           background: rgba(94, 220, 111, 0.2);
//         }

//         .flashcard-btn.dont-know {
//           background: rgba(224, 82, 82, 0.1);
//           color: #e05252;
//           border-color: #e05252;
//         }

//         .flashcard-btn.dont-know:hover {
//           background: rgba(224, 82, 82, 0.2);
//         }

//         .flashcard-btn.next {
//           color: #999;
//         }

//         @media (max-width: 768px) {
//           .flashcard {
//             aspect-ratio: 1.5;
//           }

//           .flashcard-front,
//           .flashcard-back {
//             padding: 24px;
//           }

//           .flashcard-text {
//             font-size: 16px;
//           }

//           .flashcard-actions {
//             gap: 8px;
//           }

//           .flashcard-btn {
//             padding: 8px 16px;
//             font-size: 11px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }








// 'use client';
// import { useState, useEffect } from 'react';

// export default function FlashCard({ card, onKnow, onDontKnow, onNext }) {
//   const [isFlipped, setIsFlipped] = useState(false);

//   // Reset flip state when the parent cycles to a new card
//   useEffect(() => {
//     setIsFlipped(false);
//   }, [card]);

//   if (!card) return null;

//   return (
//     <div className="active-recall-wrapper">
//       <div className="active-recall-header">
//         <span className="recall-subtitle">Active Recall</span>
//         <h4 className="recall-meta">Reviewing cards matching your core track</h4>
//       </div>

//       <div 
//         className={`flashcard-container ${isFlipped ? 'flipped' : ''}`}
//         onClick={() => setIsFlipped(!isFlipped)}
//       >
//         <div className="card-face card-front">
//           <span className="card-badge">PROMPT</span>
//           <p className="card-text">{card.question || card.front || "No prompt content found."}</p>
//           <span className="flip-hint">Click to flip</span>
//         </div>

//         <div className="card-face card-back">
//           <span className="card-badge back-badge">ANSWER</span>
//           <p className="card-text">{card.answer || card.back || "No answer provided."}</p>
//           <span className="flip-hint">Click to show prompt</span>
//         </div>
//       </div>

//       <div className="action-button-group">
//         <button className="btn btn-dont-know" onClick={(e) => { e.stopPropagation(); onDontKnow(); }}>
//           ✕ Forgot
//         </button>
//         <button className="btn btn-know" onClick={(e) => { e.stopPropagation(); onKnow(); }}>
//           ✓ Retained
//         </button>
//         <button className="btn btn-next" onClick={(e) => { e.stopPropagation(); onNext(); }}>
//           Next Card ➔
//         </button>
//       </div>

//       <style jsx>{`
//         .active-recall-wrapper {
//           background: #121212;
//           border: 1px solid #1a1a1a;
//           border-radius: 8px;
//           padding: 24px;
//           width: 100%;
//         }
//         .active-recall-header { margin-bottom: 20px; }
//         .recall-subtitle { font-size: 18px; color: #fff; font-family: 'Georgia', serif; }
//         .recall-meta { font-size: 12px; color: #666; font-weight: 400; margin: 4px 0 0; }
        
//         .flashcard-container {
//           height: 260px;
//           perspective: 1000px;
//           cursor: pointer;
//           position: relative;
//           margin-bottom: 20px;
//         }
//         .card-face {
//           position: absolute;
//           width: 100%;
//           height: 100%;
//           backface-visibility: hidden;
//           background: #161616;
//           border: 1px solid #222;
//           border-radius: 6px;
//           display: flex;
//           flex-direction: column;
//           justify-content: center;
//           align-items: center;
//           padding: 32px;
//           transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
//           text-align: center;
//         }
//         .card-front { transform: rotateY(0deg); }
//         .card-back { transform: rotateY(180deg); background: #1a1a1a; border-color: #333; }
//         .flashcard-container.flipped .card-front { transform: rotateY(-180deg); }
//         .flashcard-container.flipped .card-back { transform: rotateY(0deg); }
        
//         .card-badge { font-size: 10px; font-weight: 700; color: #555; letter-spacing: 0.1em; margin-bottom: 16px; }
//         .back-badge { color: #888; }
//         .card-text { font-size: 15px; color: #dfdfdf; line-height: 1.6; max-width: 500px; margin: 0; }
//         .flip-hint { font-size: 11px; color: #444; font-style: italic; margin-top: 24px; }
        
//         .action-button-group { display: flex; gap: 12px; justify-content: flex-end; }
//         .btn { padding: 10px 18px; font-size: 13px; font-weight: 600; border: none; border-radius: 4px; cursor: pointer; transition: all 0.2s; }
//         .btn-dont-know { background: #221414; color: #f87171; border: 1px solid #451a1a; }
//         .btn-dont-know:hover { background: #3b1818; }
//         .btn-know { background: #142216; color: #4ade80; border: 1px solid #1a3a21; }
//         .btn-know:hover { background: #1a351f; }
//         .btn-next { background: #fff; color: #000; font-weight: 700; margin-left: auto; }
//         .btn-next:hover { background: #e5e5e5; }
//       `}</style>
//     </div>
//   );
// }





'use client';
import { useState, useEffect } from 'react';

export default function FlashCard({ card, onKnow, onDontKnow, onNext }) {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    setIsFlipped(false);
  }, [card]);

  if (!card) return null;

  return (
    <div className="active-recall-wrapper">
      <div className="active-recall-header">
        <span className="recall-subtitle">Active Recall Matrix</span>
        <h4 className="recall-meta">Calibrating knowledge vectors via spaced repetition</h4>
      </div>

      <div 
        className={`flashcard-container ${isFlipped ? 'flipped' : ''}`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className="card-face card-front">
          <span className="card-badge">PROMPT SOURCE</span>
          <p className="card-text">{card.question || card.front || "No prompt vector found."}</p>
          <span className="flip-hint">Click to flip structure</span>
        </div>

        <div className="card-face card-back">
          <span className="card-badge back-badge">SYNTHESIZED ANSWER</span>
          <p className="card-text">{card.answer || card.back || "No resolution compiled."}</p>
          <span className="flip-hint">Click to review prompt</span>
        </div>
      </div>

      <div className="action-button-group">
        <button className="btn btn-dont-know" onClick={(e) => { e.stopPropagation(); onDontKnow(); }}>
          ✕ Forgot
        </button>
        <button className="btn btn-know" onClick={(e) => { e.stopPropagation(); onKnow(); }}>
          ✓ Retained
        </button>
        <button className="btn btn-next" onClick={(e) => { e.stopPropagation(); onNext(); }}>
          Next Card ➔
        </button>
      </div>

      <style jsx>{`
        .active-recall-wrapper {
          background: #0d0d0d;
          border: 1px solid #161616;
          border-radius: 12px;
          padding: 32px;
          width: 100%;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4);
        }
        .active-recall-header { margin-bottom: 24px; }
        .recall-subtitle { font-size: 16px; color: #fff; font-weight: 600; letter-spacing: -0.01em; }
        .recall-meta { font-size: 12px; color: #555; font-weight: 400; margin: 4px 0 0; }
        
        .flashcard-container {
          height: 260px;
          perspective: 1200px;
          cursor: pointer;
          position: relative;
          margin-bottom: 24px;
        }
        .card-face {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          background: #121212;
          border: 1px solid #1e1e1e;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 40px;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          text-align: center;
        }
        .card-front { transform: rotateY(0deg); }
        .card-back { transform: rotateY(180deg); background: #151515; border-color: #262626; }
        .flashcard-container.flipped .card-front { transform: rotateY(-180deg); }
        .flashcard-container.flipped .card-back { transform: rotateY(0deg); }
        
        .card-badge { font-size: 10px; font-weight: 700; color: #666; letter-spacing: 0.08em; margin-bottom: 20px; background: #161616; padding: 4px 8px; border-radius: 4px; }
        .back-badge { color: #888; }
        .card-text { font-size: 16px; color: #ffffff; line-height: 1.6; max-width: 520px; margin: 0; font-weight: 400; }
        .flip-hint { font-size: 11px; color: #444; font-style: italic; margin-top: 28px; }
        
        .action-button-group { display: flex; gap: 14px; justify-content: flex-end; }
        .btn { padding: 12px 22px; font-size: 13px; font-weight: 600; border: none; border-radius: 6px; cursor: pointer; transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1); }
        .btn-dont-know { background: #1a0f0f; color: #f87171; border: 1px solid #3d1414; }
        .btn-dont-know:hover { background: #2d1414; }
        .btn-know { background: #0f1a12; color: #4ade80; border: 1px solid #143d22; }
        .btn-know:hover { background: #142d1b; }
        .btn-next { background: #fff; color: #000; font-weight: 700; margin-left: auto; }
        .btn-next:hover { background: #e5e5e5; transform: translateX(1px); }
      `}</style>
    </div>
  );
}