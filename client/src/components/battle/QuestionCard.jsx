// 'use client';
// import { useState, useEffect } from 'react';

// export default function QuestionCard({
//   question,
//   questionNumber,
//   totalQuestions,
//   options = [],
//   onAnswer,
//   competitorSelections = {},
//   timeLeft = 15,
//   maxTime = 15,
// }) {
//   const [selected, setSelected] = useState(null);
//   const [answered, setAnswered] = useState(false);

//   useEffect(() => {
//     setSelected(null);
//     setAnswered(false);
//   }, [question]);

//   const handleSelect = (optionKey) => {
//     if (answered) return;
//     setSelected(optionKey);
//     setAnswered(true);
//     onAnswer?.(optionKey);
//   };

//   const timerPct = (timeLeft / maxTime) * 100;
//   const timerColor = timerPct > 50 ? '#fff' : timerPct > 25 ? '#f0a500' : '#e05252';

//   return (
//     <div className="qcard">
//       <div className="qcard__header">
//         <span className="qcard__counter">QUESTION {questionNumber} OF {totalQuestions}</span>
//       </div>

//       <div className="qcard__question">
//         {question}
//       </div>

//       <div className="qcard__options">
//         {options.map((opt) => {
//           const competitors = Object.entries(competitorSelections)
//             .filter(([, v]) => v === opt.key)
//             .map(([name]) => name);

//           const isSelected = selected === opt.key;

//           return (
//             <button
//               key={opt.key}
//               className={`qcard__option ${isSelected ? 'selected' : ''} ${answered && !isSelected ? 'dimmed' : ''}`}
//               onClick={() => handleSelect(opt.key)}
//               disabled={answered}
//             >
//               <span className="qcard__option-label">Option {opt.key}</span>
//               <span className="qcard__option-text">{opt.text}</span>
//               {competitors.length > 0 && (
//                 <span className="qcard__option-hint">
//                   {competitors.join(', ')} Selecting...
//                 </span>
//               )}
//             </button>
//           );
//         })}
//       </div>

//       <div className="qcard__timer-bar">
//         <div
//           className="qcard__timer-fill"
//           style={{ width: `${timerPct}%`, background: timerColor }}
//         />
//         <span className="qcard__timer-label">{timeLeft}s</span>
//       </div>

//       <style jsx>{`
//         .qcard {
//           background: #1e1e1e;
//           border-radius: 6px;
//           padding: 36px 32px 0;
//           display: flex;
//           flex-direction: column;
//           gap: 0;
//         }
//         .qcard__header {
//           margin-bottom: 16px;
//         }
//         .qcard__counter {
//           font-size: 10px;
//           font-weight: 700;
//           letter-spacing: 0.14em;
//           text-transform: uppercase;
//           color: #666;
//         }
//         .qcard__question {
//           font-family: 'Georgia', serif;
//           font-size: 30px;
//           font-weight: 400;
//           color: #fff;
//           line-height: 1.25;
//           margin-bottom: 36px;
//           text-align: center;
//           padding: 0 8px;
//         }
//         .qcard__options {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 10px;
//           margin-bottom: 32px;
//         }
//         .qcard__option {
//           position: relative;
//           background: #2a2a2a;
//           border: 1px solid #333;
//           border-radius: 4px;
//           padding: 18px 16px;
//           text-align: left;
//           cursor: pointer;
//           transition: border-color 0.15s, background 0.15s;
//           display: flex;
//           flex-direction: column;
//           gap: 4px;
//         }
//         .qcard__option:hover:not(:disabled) {
//           border-color: #555;
//           background: #333;
//         }
//         .qcard__option.selected {
//           background: #fff;
//           border-color: #fff;
//         }
//         .qcard__option.selected .qcard__option-label,
//         .qcard__option.selected .qcard__option-text {
//           color: #000;
//         }
//         .qcard__option.dimmed {
//           opacity: 0.4;
//         }
//         .qcard__option-label {
//           font-size: 9px;
//           font-weight: 700;
//           letter-spacing: 0.1em;
//           text-transform: uppercase;
//           color: #666;
//         }
//         .qcard__option-text {
//           font-size: 15px;
//           font-weight: 600;
//           color: #fff;
//         }
//         .qcard__option-hint {
//           font-size: 9px;
//           color: #888;
//           letter-spacing: 0.04em;
//           margin-top: 4px;
//         }
//         .qcard__timer-bar {
//           position: relative;
//           height: 4px;
//           background: #2a2a2a;
//           display: flex;
//           align-items: center;
//         }
//         .qcard__timer-fill {
//           height: 100%;
//           border-radius: 2px;
//           transition: width 1s linear, background 0.3s;
//         }
//         .qcard__timer-label {
//           position: absolute;
//           right: 0;
//           top: -18px;
//           font-size: 11px;
//           color: #777;
//           font-weight: 600;
//         }
//       `}</style>
//     </div>
//   );
// }









// 'use client';
// import { useState, useEffect } from 'react';

// export default function QuestionCard({
//   question,
//   questionNumber,
//   totalQuestions,
//   options = {}, // Default changed to object to be safe
//   onAnswer,
//   competitorSelections = {},
//   timeLeft = 15,
//   maxTime = 15,
// }) {
//   const [selected, setSelected] = useState(null);
//   const [answered, setAnswered] = useState(false);

//   // Normalize options: ensure it is always an array of {key, text} objects
//   // This handles both [ {key: 'A', text: '...'} ] and { A: '...' } formats
//   const normalizedOptions = Array.isArray(options) 
//     ? options 
//     : Object.entries(options).map(([key, text]) => ({ key, text }));

//   useEffect(() => {
//     setSelected(null);
//     setAnswered(false);
//   }, [question]);

//   const handleSelect = (optionKey) => {
//     if (answered) return;
//     setSelected(optionKey);
//     setAnswered(true);
//     onAnswer?.(optionKey);
//   };

//   const timerPct = (timeLeft / maxTime) * 100;
//   const timerColor = timerPct > 50 ? '#fff' : timerPct > 25 ? '#f0a500' : '#e05252';

//   return (
//     <div className="qcard">
//       <div className="qcard__header">
//         <span className="qcard__counter">QUESTION {questionNumber} OF {totalQuestions}</span>
//       </div>

//       <div className="qcard__question">
//         {question}
//       </div>

//       <div className="qcard__options">
//         {normalizedOptions.map((opt) => {
//           const competitors = Object.entries(competitorSelections)
//             .filter(([, v]) => v === opt.key)
//             .map(([name]) => name);

//           const isSelected = selected === opt.key;

//           return (
//             <button
//               key={opt.key}
//               className={`qcard__option ${isSelected ? 'selected' : ''} ${answered && !isSelected ? 'dimmed' : ''}`}
//               onClick={() => handleSelect(opt.key)}
//               disabled={answered}
//             >
//               <span className="qcard__option-label">Option {opt.key}</span>
//               <span className="qcard__option-text">{opt.text}</span>
//               {competitors.length > 0 && (
//                 <span className="qcard__option-hint">
//                   {competitors.join(', ')} Selecting...
//                 </span>
//               )}
//             </button>
//           );
//         })}
//       </div>

//       <div className="qcard__timer-bar">
//         <div
//           className="qcard__timer-fill"
//           style={{ width: `${timerPct}%`, background: timerColor }}
//         />
//         <span className="qcard__timer-label">{timeLeft}s</span>
//       </div>

//       <style jsx>{`
//         .qcard { background: #1e1e1e; border-radius: 6px; padding: 36px 32px 0; display: flex; flex-direction: column; gap: 0; }
//         .qcard__header { margin-bottom: 16px; }
//         .qcard__counter { font-size: 10px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #666; }
//         .qcard__question { font-family: 'Georgia', serif; font-size: 30px; font-weight: 400; color: #fff; line-height: 1.25; margin-bottom: 36px; text-align: center; padding: 0 8px; }
//         .qcard__options { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 32px; }
//         .qcard__option { position: relative; background: #2a2a2a; border: 1px solid #333; border-radius: 4px; padding: 18px 16px; text-align: left; cursor: pointer; transition: border-color 0.15s, background 0.15s; display: flex; flex-direction: column; gap: 4px; }
//         .qcard__option:hover:not(:disabled) { border-color: #555; background: #333; }
//         .qcard__option.selected { background: #fff; border-color: #fff; }
//         .qcard__option.selected .qcard__option-label, .qcard__option.selected .qcard__option-text { color: #000; }
//         .qcard__option.dimmed { opacity: 0.4; }
//         .qcard__option-label { font-size: 9px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #666; }
//         .qcard__option-text { font-size: 15px; font-weight: 600; color: #fff; }
//         .qcard__option-hint { font-size: 9px; color: #888; letter-spacing: 0.04em; margin-top: 4px; }
//         .qcard__timer-bar { position: relative; height: 4px; background: #2a2a2a; display: flex; align-items: center; }
//         .qcard__timer-fill { height: 100%; border-radius: 2px; transition: width 1s linear, background 0.3s; }
//         .qcard__timer-label { position: absolute; right: 0; top: -18px; font-size: 11px; color: #777; font-weight: 600; }
//       `}</style>
//     </div>
//   );
// }





'use client';
import { useState, useEffect } from 'react';

export default function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  options = {}, // Defaulting to object to handle API key-value pairs
  onAnswer,
  competitorSelections = {},
  timeLeft = 15,
  maxTime = 15,
}) {
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);

  // DATA NORMALIZATION: Converts {A: "Text"} to [{key: "A", text: "Text"}]
  const normalizedOptions = Array.isArray(options) 
    ? options 
    : Object.entries(options).map(([key, text]) => ({ key, text }));

  useEffect(() => {
    setSelected(null);
    setAnswered(false);
  }, [question]);

  const handleSelect = (optionKey) => {
    if (answered) return;
    setSelected(optionKey);
    setAnswered(true);
    onAnswer?.(optionKey);
  };

  const timerPct = (timeLeft / maxTime) * 100;

  return (
    <div className="qcard">
      <div className="qcard__meta">
        QUESTION {String(questionNumber).padStart(2, '0')} OF {String(totalQuestions).padStart(2, '0')}
      </div>

      <h2 className="qcard__question">
        {question}
      </h2>

      <div className="qcard__options">
        {normalizedOptions.map((opt) => {
          const isSelected = selected === opt.key;
          
          return (
            <button
              key={opt.key}
              className={`qcard__option ${isSelected ? 'selected' : ''}`}
              onClick={() => handleSelect(opt.key)}
              disabled={answered}
            >
              <span className="qcard__option-label">Option {opt.key}</span>
              <span className="qcard__option-text">{opt.text}</span>
            </button>
          );
        })}
      </div>

      {/* Visual Timer Progress Bar */}
      <div className="qcard__timer-bar">
        <div className="qcard__timer-fill" style={{ width: `${timerPct}%` }} />
      </div>

      <style jsx>{`
        .qcard {
          background: #0d0d0d;
          border: 1px solid #1a1a1a;
          border-radius: 12px;
          padding: 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }
        .qcard__meta {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: #555;
          margin-bottom: 2rem;
        }
        .qcard__question {
          font-family: serif; /* Matches Screenshot 2026-05-29 095111.jpg */
          font-size: 2.2rem;
          font-weight: 400;
          color: #fff;
          text-align: center;
          line-height: 1.3;
          margin-bottom: 3rem;
        }
        .qcard__options {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          width: 100%;
        }
        .qcard__option {
          background: #151515;
          border: 1px solid #222;
          border-radius: 8px;
          padding: 24px;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .qcard__option:hover { border-color: #444; }
        .qcard__option.selected {
          background: #fff;
          border-color: #fff;
        }
        .qcard__option.selected .qcard__option-label,
        .qcard__option.selected .qcard__option-text {
          color: #000;
        }
        .qcard__option-label {
          display: block;
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #666;
          margin-bottom: 4px;
        }
        .qcard__option-text {
          font-size: 1rem;
          font-weight: 600;
          color: #fff;
        }
        .qcard__timer-bar {
          width: 100%;
          height: 3px;
          background: #1a1a1a;
          margin-top: 3rem;
          border-radius: 2px;
        }
        .qcard__timer-fill {
          height: 100%;
          background: #ff7e7e;
          transition: width 1s linear;
        }
      `}</style>
    </div>
  );
}