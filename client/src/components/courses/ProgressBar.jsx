// 'use client';

// export default function ProgressBar({ value = 0, color = '#fff', height = 2, showLabel = false }) {
//   const clamped = Math.min(100, Math.max(0, value));

//   return (
//     <div className="progress-bar-wrap">
//       {showLabel && (
//         <div className="progress-bar-label">
//           <span>Progress</span>
//           <span>{clamped}%</span>
//         </div>
//       )}
//       <div className="progress-bar-track">
//         <div
//           className="progress-bar-fill"
//           style={{ width: `${clamped}%` }}
//         />
//       </div>

//       <style jsx>{`
//         .progress-bar-wrap {
//           width: 100%;
//         }
//         .progress-bar-label {
//           display: flex;
//           justify-content: space-between;
//           font-size: 10px;
//           color: #666;
//           margin-bottom: 4px;
//         }
//         .progress-bar-track {
//           width: 100%;
//           height: ${height}px;
//           background: #2a2a2a;
//           border-radius: 999px;
//           overflow: hidden;
//         }
//         .progress-bar-fill {
//           height: 100%;
//           background: ${color};
//           border-radius: 999px;
//           transition: width 0.5s ease;
//         }
//       `}</style>
//     </div>
//   );
// }













// 'use client';

// export default function ProgressBar({ value = 0, color = '#fff', height = 2, showLabel = false }) {
//   const clamped = Math.min(100, Math.max(0, value));

//   return (
//     <div className="progress-bar-wrap">
//       {showLabel && (
//         <div className="progress-bar-label">
//           <span>Progress</span>
//           <span>{clamped}%</span>
//         </div>
//       )}
//       <div className="progress-bar-track">
//         <div
//           className="progress-bar-fill"
//           style={{ width: `${clamped}%` }}
//         />
//       </div>

//       <style jsx>{`
//         .progress-bar-wrap {
//           width: 100%;
//         }
//         .progress-bar-label {
//           display: flex;
//           justify-content: space-between;
//           font-size: 10px;
//           color: rgba(255, 255, 255, 0.4);
//           margin-bottom: 4px;
//         }
//         .progress-bar-track {
//           width: 100%;
//           height: ${height}px;
//           background: rgba(255, 255, 255, 0.06);
//           border-radius: 1px;
//           overflow: hidden;
//         }
//         .progress-bar-fill {
//           height: 100%;
//           background: ${color};
//           border-radius: 1px;
//           transition: width 0.5s ease;
//         }
//       `}</style>
//     </div>
//   );
// }







'use client';

export default function ProgressBar({ value = 0, color = '#fff', height = 2, showLabel = false }) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between text-[10px] text-[rgba(255,255,255,0.4)] mb-1">
          <span>Progress</span>
          <span>{clamped}%</span>
        </div>
      )}
      <div className="w-full bg-[rgba(255,255,255,0.06)] rounded-[1px] overflow-hidden" style={{ height: `${height}px` }}>
        <div 
          className="h-full rounded-[1px] transition-[width] duration-500 ease"
          style={{ width: `${clamped}%`, background: color }}
        />
      </div>
    </div>
  );
}