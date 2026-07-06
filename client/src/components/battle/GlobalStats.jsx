'use client';

export default function GlobalStats({ stats = {} }) {
  const items = [
    { label: 'Avg. Accuracy', value: stats.avgAccuracy ?? '—', suffix: stats.avgAccuracy ? '%' : '' },
    { label: 'Quickest Resp.', value: stats.quickestResp ?? '—', suffix: stats.quickestResp ? 's' : '' },
    { label: 'Active Battles', value: stats.activeBattles ?? '—', isLive: true },
  ];

  return (
    <div className="global-stats">
      <h3 className="global-stats__title">GLOBAL STATS</h3>
      <div className="global-stats__list">
        {items.map((item) => (
          <div key={item.label} className="global-stats__item">
            <span className="global-stats__label">{item.label}</span>
            <span className="global-stats__value">
              {item.isLive && <span className="global-stats__dot" />}
              {item.value}{item.suffix}
            </span>
          </div>
        ))}
      </div>

      <style jsx>{`
        .global-stats {
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
          border-radius: 4px;
          padding: 18px 20px;
        }
        .global-stats__title {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #555;
          margin: 0 0 14px;
        }
        .global-stats__list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .global-stats__item {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .global-stats__label {
          font-size: 12px;
          color: #666;
        }
        .global-stats__value {
          font-size: 13px;
          font-weight: 700;
          color: #ccc;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .global-stats__dot {
          width: 7px;
          height: 7px;
          background: #e05252;
          border-radius: 50%;
          animation: pulse 1.5s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}