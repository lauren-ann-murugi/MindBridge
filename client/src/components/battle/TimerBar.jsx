'use client';
import { useEffect, useRef, useState } from 'react';

export default function TimerBar({ duration = 15, onExpire, running = true }) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const intervalRef = useRef(null);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (!running) {
      clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(intervalRef.current);
          onExpire?.();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [running, onExpire]);

  const pct = (timeLeft / duration) * 100;
  const barColor = pct > 50 ? '#ffffff' : pct > 25 ? '#f0a500' : '#e05252';

  return (
    <div className="timer-bar">
      <div className="timer-bar__track">
        <div
          className="timer-bar__fill"
          style={{ width: `${pct}%`, background: barColor }}
        />
      </div>
      <span className="timer-bar__label">{timeLeft}s</span>

      <style jsx>{`
        .timer-bar {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
        }
        .timer-bar__track {
          flex: 1;
          height: 4px;
          background: #2a2a2a;
          border-radius: 2px;
          overflow: hidden;
        }
        .timer-bar__fill {
          height: 100%;
          border-radius: 2px;
          transition: width 1s linear, background 0.3s;
        }
        .timer-bar__label {
          font-size: 12px;
          font-weight: 700;
          color: #666;
          width: 28px;
          text-align: right;
          flex-shrink: 0;
        }
      `}</style>
    </div>
  );
}