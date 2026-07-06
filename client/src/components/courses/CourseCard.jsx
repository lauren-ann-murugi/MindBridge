// 'use client';
// import { useState } from 'react';
// import ProgressBar from './ProgressBar';

// export default function CourseCard({ course, onResume }) {
//   const [hovered, setHovered] = useState(false);

//   return (
//     <div
//       className={`course-card ${hovered ? 'hovered' : ''}`}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//     >
//       <div
//         className="course-card__image"
//         style={{ backgroundImage: `url(${course.image})` }}
//       >
//         <span className="course-card__tag">{course.tag}</span>
//       </div>

//       <div className="course-card__body">
//         <h3 className="course-card__title">{course.title}</h3>
//         <p className="course-card__module">{course.module}</p>

//         <div className="course-card__progress">
//           <span className="course-card__progress-label">Overall Progress</span>
//           <span className="course-card__progress-value">{course.progress}%</span>
//         </div>
//         <ProgressBar value={course.progress} />

//         <div className="course-card__footer">
//           <span className="course-card__last-accessed">
//             LAST ACCESSED<br />
//             <strong>{course.lastAccessed}</strong>
//           </span>
//           <button
//             className="course-card__btn"
//             onClick={() => onResume?.(course)}
//           >
//             Resume
//           </button>
//         </div>
//       </div>

//       <style jsx>{`
//         .course-card {
//           background: #1a1a1a;
//           border: 1px solid #2a2a2a;
//           border-radius: 4px;
//           overflow: hidden;
//           transition: border-color 0.2s, transform 0.2s;
//           cursor: pointer;
//         }
//         .course-card.hovered {
//           border-color: #444;
//           transform: translateY(-2px);
//         }
//         .course-card__image {
//           position: relative;
//           height: 140px;
//           background-size: cover;
//           background-position: center;
//           background-color: #111;
//         }
//         .course-card__tag {
//           position: absolute;
//           top: 10px;
//           right: 10px;
//           font-size: 9px;
//           font-weight: 700;
//           letter-spacing: 0.12em;
//           text-transform: uppercase;
//           color: #fff;
//           background: rgba(0,0,0,0.6);
//           padding: 3px 8px;
//           border-radius: 2px;
//         }
//         .course-card__body {
//           padding: 18px;
//         }
//         .course-card__title {
//           font-family: 'Georgia', serif;
//           font-size: 18px;
//           font-weight: 400;
//           color: #fff;
//           margin: 0 0 6px;
//           line-height: 1.25;
//         }
//         .course-card__module {
//           font-size: 10px;
//           font-weight: 700;
//           letter-spacing: 0.1em;
//           text-transform: uppercase;
//           color: #666;
//           margin: 0 0 16px;
//         }
//         .course-card__progress {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 6px;
//         }
//         .course-card__progress-label {
//           font-size: 10px;
//           color: #666;
//           letter-spacing: 0.05em;
//         }
//         .course-card__progress-value {
//           font-size: 10px;
//           color: #999;
//           font-weight: 600;
//         }
//         .course-card__footer {
//           display: flex;
//           justify-content: space-between;
//           align-items: flex-end;
//           margin-top: 14px;
//         }
//         .course-card__last-accessed {
//           font-size: 9px;
//           letter-spacing: 0.06em;
//           text-transform: uppercase;
//           color: #555;
//           line-height: 1.5;
//         }
//         .course-card__last-accessed strong {
//           color: #888;
//           font-weight: 600;
//         }
//         .course-card__btn {
//           background: transparent;
//           border: 1px solid #fff;
//           color: #fff;
//           font-size: 11px;
//           font-weight: 600;
//           letter-spacing: 0.05em;
//           padding: 6px 16px;
//           border-radius: 2px;
//           cursor: pointer;
//           transition: background 0.15s, color 0.15s;
//         }
//         .course-card__btn:hover {
//           background: #fff;
//           color: #000;
//         }
//       `}</style>
//     </div>
//   );
// }









// 'use client';
// import { useState } from 'react';
// import ProgressBar from './ProgressBar';

// export default function CourseCard({ course, onResume }) {
//   const [hovered, setHovered] = useState(false);

//   return (
//     <div
//       className={`course-card ${hovered ? 'hovered' : ''}`}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//     >
//       <div
//         className="course-card__image"
//         style={{ background: course.image.startsWith('linear-gradient') ? course.image : `url(${course.image})` }}
//       >
//         <span className="course-card__tag">{course.tag}</span>
//       </div>

//       <div className="course-card__body">
//         <h3 className="course-card__title">{course.title}</h3>
//         <p className="course-card__module">{course.module}</p>

//         <div className="course-card__progress">
//           <span className="course-card__progress-label">Overall Progress</span>
//           <span className="course-card__progress-value">{course.progress}%</span>
//         </div>
//         <ProgressBar value={course.progress} color="#fff" height={2} />

//         <div className="course-card__footer">
//           <span className="course-card__last-accessed">
//             LAST ACCESSED<br />
//             <strong>{course.lastAccessed}</strong>
//           </span>
//           <button
//             className="course-card__btn"
//             onClick={(e) => {
//               e.stopPropagation();
//               onResume?.(course);
//             }}
//           >
//             Resume
//           </button>
//         </div>
//       </div>

//       <style jsx>{`
//         .course-card {
//           background: #0b0b0e;
//           border: 1px solid rgba(255, 255, 255, 0.03);
//           border-radius: 12px;
//           overflow: hidden;
//           transition: border-color 0.15s ease, transform 0.15s ease;
//           display: flex;
//           flex-direction: column;
//         }
//         .course-card.hovered {
//           border-color: rgba(255, 255, 255, 0.08);
//           transform: translateY(-2px);
//         }
//         .course-card__image {
//           position: relative;
//           height: 130px;
//           background-size: cover;
//           background-position: center;
//           padding: 16px;
//           display: flex;
//           align-items: flex-start;
//         }
//         .course-card__tag {
//           font-size: 9px;
//           font-weight: 700;
//           color: rgba(255, 255, 255, 0.8);
//           letter-spacing: 0.06em;
//           text-transform: uppercase;
//           border: 1px solid rgba(255, 255, 255, 0.2);
//           padding: 3px 8px;
//           border-radius: 4px;
//           background: rgba(0, 0, 0, 0.4);
//           backdrop-filter: blur(4px);
//         }
//         .course-card__body {
//           padding: 20px;
//           flex: 1;
//           display: flex;
//           flex-direction: column;
//           justify-content: space-between;
//         }
//         .course-card__title {
//           font-family: 'Cormorant Garamond', serif;
//           font-size: 17px;
//           font-weight: 500;
//           color: #fff;
//           margin: 0 0 6px;
//           line-height: 1.35;
//         }
//         .course-card__module {
//           font-size: 10px;
//           font-weight: 600;
//           color: rgba(255, 255, 255, 0.35);
//           letter-spacing: 0.03em;
//           text-transform: uppercase;
//           margin: 0 0 20px;
//         }
//         .course-card__progress {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 6px;
//         }
//         .course-card__progress-label {
//           font-size: 11px;
//           color: rgba(255, 255, 255, 0.4);
//         }
//         .course-card__progress-value {
//           font-size: 11px;
//           color: #fff;
//           font-weight: 600;
//         }
//         .course-card__footer {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           border-top: 1px solid rgba(255, 255, 255, 0.03);
//           padding-top: 14px;
//           margin-top: 20px;
//         }
//         .course-card__last-accessed {
//           font-size: 9px;
//           letter-spacing: 0.02em;
//           text-transform: uppercase;
//           color: rgba(255, 255, 255, 0.25);
//           line-height: 1.4;
//         }
//         .course-card__last-accessed strong {
//           color: rgba(255, 255, 255, 0.6);
//           font-weight: 400;
//           display: block;
//           font-size: 11px;
//         }
//         .course-card__btn {
//           background: #fff;
//           border: none;
//           color: #000;
//           font-size: 11px;
//           font-weight: 600;
//           padding: 6px 14px;
//           border-radius: 4px;
//           cursor: pointer;
//           transition: background 0.15s ease;
//         }
//         .course-card__btn:hover {
//           background: #e0e0e0;
//         }
//       `}</style>
//     </div>
//   );
// }





'use client';

import { useState } from 'react';
import ProgressBar from './ProgressBar';

export default function CourseCard({ course, onResume }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div 
      className={`bg-[#0b0b0e] border border-[rgba(255,255,255,0.03)] rounded-xl overflow-hidden transition-all duration-150 flex flex-col ${
        hovered ? 'border-[rgba(255,255,255,0.08)] -translate-y-0.5' : ''
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div 
        className="relative h-[130px] bg-cover bg-center p-4 flex items-start"
        style={{ background: course.image.startsWith('linear-gradient') ? course.image : `url(${course.image})` }}
      >
        <span className="text-[9px] font-bold text-[rgba(255,255,255,0.8)] tracking-[0.06em] uppercase border border-[rgba(255,255,255,0.2)] px-2 py-0.5 rounded-[4px] bg-[rgba(0,0,0,0.4)] backdrop-blur-[4px]">
          {course.tag}
        </span>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <h3 className="font-['Cormorant_Garamond'] text-[17px] font-medium text-white m-0 mb-1.5 leading-[1.35]">
          {course.title}
        </h3>
        <p className="text-[10px] font-semibold text-[rgba(255,255,255,0.35)] tracking-[0.03em] uppercase m-0 mb-5">
          {course.module}
        </p>

        <div className="flex justify-between items-center mb-1.5">
          <span className="text-[11px] text-[rgba(255,255,255,0.4)]">Overall Progress</span>
          <span className="text-[11px] text-white font-semibold">{course.progress}%</span>
        </div>
        
        <ProgressBar value={course.progress} color="#fff" height={2} />

        <div className="flex justify-between items-center border-t border-[rgba(255,255,255,0.03)] pt-3.5 mt-5">
          <span className="text-[9px] tracking-[0.02em] uppercase text-[rgba(255,255,255,0.25)] leading-[1.4]">
            LAST ACCESSED<br />
            <strong className="text-[rgba(255,255,255,0.6)] font-light block text-[11px]">{course.lastAccessed}</strong>
          </span>
          <button 
            className="bg-white border-none text-black text-[11px] font-semibold px-3.5 py-1.5 rounded-[4px] cursor-pointer transition-colors duration-150 hover:bg-[#e0e0e0]"
            onClick={(e) => {
              e.stopPropagation();
              onResume?.(course);
            }}
          >
            Resume
          </button>
        </div>
      </div>
    </div>
  );
}