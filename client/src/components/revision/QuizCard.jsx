// 'use client';
// import { useState } from 'react';

// export default function QuizCard({ quiz, onStart }) {
//   const [loading, setLoading] = useState(false);

//   const handleStart = async () => {
//     setLoading(true);
//     try {
//       await onStart?.(quiz.id);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="quiz-card">
//       <div className="quiz-card__icon">{quiz.icon}</div>
//       <h3 className="quiz-card__title">{quiz.title}</h3>
//       <p className="quiz-card__description">
//         <span>{quiz.questions} questions</span>
//         <span className="bullet">•</span>
//         <span>{quiz.duration}</span>
//       </p>
//       <span className="quiz-card__category">{quiz.category}</span>
//       <button
//         className="quiz-card__btn"
//         onClick={handleStart}
//         disabled={loading}
//       >
//         {loading ? 'Starting...' : 'Start Quiz'}
//       </button>

//       <style jsx>{`
//         .quiz-card {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           text-align: center;
//           background: #1a1a1a;
//           border: 1px solid #2a2a2a;
//           border-radius: 6px;
//           padding: 24px 20px;
//           transition: all 0.2s;
//         }

//         .quiz-card:hover {
//           border-color: #333;
//           background: #1e1e1e;
//         }

//         .quiz-card__icon {
//           font-size: 32px;
//           margin-bottom: 12px;
//         }

//         .quiz-card__title {
//           font-family: 'Georgia', serif;
//           font-size: 16px;
//           font-weight: 400;
//           margin: 0 0 8px;
//           color: #fff;
//         }

//         .quiz-card__description {
//           font-size: 12px;
//           color: #888;
//           margin: 0 0 12px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 6px;
//         }

//         .bullet {
//           font-size: 10px;
//         }

//         .quiz-card__category {
//           font-size: 10px;
//           font-weight: 700;
//           letter-spacing: 0.08em;
//           text-transform: uppercase;
//           color: #555;
//           background: #111;
//           padding: 4px 10px;
//           border-radius: 3px;
//           margin-bottom: 14px;
//           display: inline-block;
//         }

//         .quiz-card__btn {
//           width: 100%;
//           padding: 10px 16px;
//           background: #fff;
//           color: #000;
//           border: none;
//           border-radius: 4px;
//           font-size: 12px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.2s;
//           letter-spacing: 0.04em;
//         }

//         .quiz-card__btn:hover:not(:disabled) {
//           background: #e0e0e0;
//           transform: translateY(-1px);
//         }

//         .quiz-card__btn:disabled {
//           opacity: 0.6;
//           cursor: not-allowed;
//         }

//         @media (max-width: 768px) {
//           .quiz-card {
//             padding: 18px 16px;
//           }

//           .quiz-card__icon {
//             font-size: 28px;
//           }

//           .quiz-card__title {
//             font-size: 14px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }











// 'use client';

// export default function QuizCard({ quiz, onStart }) {
//   if (!quiz) return null;

//   return (
//     <div className="quiz-card-item" onClick={() => onStart(quiz.id)}>
//       <div className="quiz-meta-info">
//         <h4 className="quiz-title-text">{quiz.title || "Evaluation Module"}</h4>
//         <p className="quiz-sub-metrics">
//           {quiz.questions_count || quiz.total_questions || 10} Questions • {quiz.duration || 5} mins
//         </p>
//       </div>
//       <div className="arrow-action-indicator">➔</div>

//       <style jsx>{`
//         .quiz-card-item {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           background: #141414;
//           border: 1px solid #222;
//           padding: 16px;
//           border-radius: 6px;
//           cursor: pointer;
//           transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
//         }
//         .quiz-card-item:hover {
//           background: #1a1a1a;
//           border-color: #333;
//           transform: translateY(-1px);
//         }
//         .quiz-title-text { font-size: 14px; font-weight: 600; color: #fff; margin: 0 0 4px 0; }
//         .quiz-sub-metrics { font-size: 12px; color: #666; margin: 0; }
//         .arrow-action-indicator { color: #444; font-size: 14px; transition: color 0.2s; }
//         .quiz-card-item:hover .arrow-action-indicator { color: #fff; }
//       `}</style>
//     </div>
//   );
// }








'use client';

export default function QuizCard({ quiz, onStart }) {
  if (!quiz) return null;

  return (
    <div className="quiz-card-item" onClick={() => onStart(quiz.id)}>
      <div className="quiz-meta-info">
        <h4 className="quiz-title-text">{quiz.title || "Evaluation Module"}</h4>
        <p className="quiz-sub-metrics">
          {quiz.questions_count || quiz.total_questions || 10} Questions • {quiz.duration || 15} mins
        </p>
      </div>
      <div className="arrow-action-indicator">➔</div>

      <style jsx>{`
        .quiz-card-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #111111;
          border: 1px solid #1c1c1c;
          padding: 18px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .quiz-card-item:hover {
          background: #161616;
          border-color: #2b2b2b;
          transform: translateY(-1px);
        }
        .quiz-title-text { font-size: 14px; font-weight: 600; color: #ffffff; margin: 0 0 6px 0; letter-spacing: -0.01em; }
        .quiz-sub-metrics { font-size: 12px; color: #666; margin: 0; }
        .arrow-action-indicator { color: #333; font-size: 13px; transition: all 0.2s; }
        .quiz-card-item:hover .arrow-action-indicator { color: #ffffff; transform: translateX(2px); }
      `}</style>
    </div>
  );
}