'use client';

export default function Leaderboard({ players = [] }) {
  const sorted = [...players].sort((a, b) => b.xp - a.xp);

  return (
    <div className="leaderboard">
      <h3 className="leaderboard__title">REAL-TIME RANK</h3>

      <ol className="leaderboard__list">
        {sorted.map((player, idx) => (
          <li
            key={player.id || player.name}
            className={`leaderboard__item ${player.isYou ? 'you' : ''}`}
          >
            <span className="leaderboard__rank">{idx + 1}</span>
            <span className="leaderboard__name">
              {player.name}
              {player.isYou && <span className="leaderboard__you-tag">YOU</span>}
            </span>
            <span className="leaderboard__xp">{player.xp.toLocaleString()}</span>
          </li>
        ))}
      </ol>

      <style jsx>{`
        .leaderboard {
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
          border-radius: 4px;
          padding: 20px;
        }
        .leaderboard__title {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #555;
          margin: 0 0 16px;
        }
        .leaderboard__list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .leaderboard__item {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .leaderboard__item.you .leaderboard__name {
          color: #fff;
          font-weight: 700;
        }
        .leaderboard__rank {
          font-size: 11px;
          color: #444;
          font-weight: 600;
          width: 14px;
          flex-shrink: 0;
        }
        .leaderboard__name {
          flex: 1;
          font-size: 13px;
          color: #aaa;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .leaderboard__you-tag {
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 0.1em;
          color: #555;
          background: #2a2a2a;
          padding: 2px 5px;
          border-radius: 2px;
        }
        .leaderboard__xp {
          font-size: 13px;
          font-weight: 600;
          color: #ccc;
        }
      `}</style>
    </div>
  );
}