'use client';

const REWARD_ICONS = {
  trophy: '🏆',
  bolt: '⚡',
  sparkle: '✦',
  lock: '🔒',
  star: '★',
  book: '📖',
};

export default function EarnedRewards({ rewards = [], onRewardClick }) {
  return (
    <div className="rewards">
      <span className="rewards__label">EARNED REWARDS</span>
      <div className="rewards__grid">
        {rewards.map((reward, idx) => (
          <button
            key={idx}
            className={`rewards__item ${reward.locked ? 'locked' : 'earned'}`}
            title={reward.name}
            onClick={() => !reward.locked && onRewardClick?.(reward)}
            disabled={reward.locked}
          >
            <span className="rewards__icon">
              {REWARD_ICONS[reward.icon] || reward.icon || '?'}
            </span>
          </button>
        ))}
      </div>

      <style jsx>{`
        .rewards {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .rewards__label {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #555;
        }
        .rewards__grid {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .rewards__item {
          width: 38px;
          height: 38px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: border-color 0.15s, transform 0.1s;
          background: #1e1e1e;
          border: 1px solid #333;
          font-size: 16px;
        }
        .rewards__item.earned {
          border-color: #444;
        }
        .rewards__item.earned:hover {
          border-color: #888;
          transform: translateY(-1px);
        }
        .rewards__item.locked {
          opacity: 0.3;
          cursor: default;
          filter: grayscale(1);
        }
        .rewards__icon {
          line-height: 1;
        }
      `}</style>
    </div>
  );
}