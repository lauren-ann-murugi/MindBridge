'use client';
import ProgressBar from '../courses/ProgressBar';

export default function CompetitorCard({ competitor, isYou = false }) {
  const maxXP = 1000;
  const pct = Math.min(100, (competitor.xp / maxXP) * 100);

  return (
    <div className={`competitor-card ${isYou ? 'you' : ''}`}>
      <div className="competitor-card__avatar">
        {competitor.avatar
          ? <img src={competitor.avatar} alt={competitor.name} />
          : <span>{competitor.name?.[0]}</span>
        }
      </div>
      <div className="competitor-card__info">
        <div className="competitor-card__name">
          {competitor.name}
          {isYou && <span className="competitor-card__you">(You)</span>}
        </div>
        <ProgressBar value={pct} color={isYou ? '#fff' : '#555'} height={2} />
        <span className="competitor-card__xp">{competitor.xp} XP</span>
      </div>

      {competitor.status && (
        <span className="competitor-card__status">{competitor.status}</span>
      )}

      <style jsx>{`
        .competitor-card {
          display: flex;
          align-items: center;
          gap: 14px;
          background: #1e1e1e;
          border: 1px solid #2a2a2a;
          border-radius: 4px;
          padding: 14px 16px;
          transition: border-color 0.15s;
          position: relative;
        }
        .competitor-card.you {
          border-color: #444;
        }
        .competitor-card__avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #333;
          overflow: hidden;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: 700;
          color: #fff;
        }
        .competitor-card__avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .competitor-card__info {
          flex: 1;
          min-width: 0;
        }
        .competitor-card__name {
          font-size: 14px;
          font-weight: 600;
          color: #fff;
          margin-bottom: 6px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .competitor-card__you {
          font-size: 11px;
          color: #666;
          font-weight: 400;
        }
        .competitor-card__xp {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: #555;
          margin-top: 4px;
          display: block;
        }
        .competitor-card__status {
          position: absolute;
          top: 8px;
          right: 12px;
          font-size: 9px;
          letter-spacing: 0.08em;
          color: #666;
          background: #111;
          padding: 2px 8px;
          border-radius: 20px;
          border: 1px solid #2a2a2a;
          white-space: nowrap;
        }
      `}</style>
    </div>
  );
}