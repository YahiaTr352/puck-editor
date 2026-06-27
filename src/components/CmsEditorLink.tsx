import React from 'react'

export const CmsEditorLink: React.FC = () => {
  return (
    <div style={{ boxSizing: 'border-box', width: '100%', marginBottom: '24px' }}>
      <style>{`
        .cms-card {
          background-color: var(--theme-bg-elevation-50);
          border: 1px solid var(--theme-border);
          border-radius: 4px;
          padding: 24px;
          display: flex;
          align-items: center;
          position: relative;
          transition: border-color 0.15s ease, background-color 0.15s ease;
          min-height: 100px;
          box-sizing: border-box;
          text-decoration: none !important;
          color: var(--theme-text) !important;
          width: 100%;
        }
        .cms-card:hover {
          border-color: var(--theme-border-hover);
          background-color: var(--theme-bg-elevation-100);
        }
        .cms-card-info {
          display: flex;
          flex-direction: column;
          gap: 6px;
          text-align: right;
          width: 100%;
        }
        .cms-card-title {
          font-size: 18px;
          font-weight: 600;
          margin: 0;
          color: var(--theme-text);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .cms-card-description {
          font-size: 13px;
          color: var(--theme-text-muted);
          margin: 0;
        }
      `}</style>

      <a href="/admin" className="cms-card">
        <div className="cms-card-info">
          <h3 className="cms-card-title">
            <span>✏️</span>
            <span>المحرر البصري</span>
          </h3>
        </div>
      </a>
    </div>
  )
}
