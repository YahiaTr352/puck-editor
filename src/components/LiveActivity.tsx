"use client";

import React, { useState, useEffect } from "react";
import { Icon } from "../puck/icons";

const LA_EVENTS = [
  { type: 'review', name: 'أ. منيرة العتيبي', role: 'معلمة رياضيات', avatar: 'م',
    body: 'كنت أقضي ٣ ساعات لإعداد اختبار — الآن في ١٠ دقائق بجودة أعلى.' },
  { type: 'subscribe', name: 'خالد من الرياض', plan: 'الباقة الاحترافية', avatar: 'خ', role: 'معلم رياضيات' },
  { type: 'create', name: 'معلّم في جدة', subject: 'علوم · سادس ابتدائي', avatar: 'ج', count: 24, role: 'معلم علوم' },

  { type: 'review', name: 'د. عبدالله الحربي', role: 'مدير مدرسة', avatar: 'ع',
    body: 'التقارير على مستوى المادة والفصل غيّرت طريقة اتخاذ قراراتنا.' },
  { type: 'subscribe', name: 'نورة من الدمام', plan: 'باقة المدارس', avatar: 'ن', role: 'مديرة مدرسة' },
  { type: 'create', name: 'معلّمة في أبها', subject: 'لغة عربية · متوسط', avatar: 'أ', count: 18, role: 'معلمة لغة عربية' },

  { type: 'review', name: 'أ. سارة القحطاني', role: 'مشرفة لغة عربية', avatar: 'س',
    body: 'الربط بنواتج التعلم الرسمية وفّر علينا أسابيع كاملة.' },
  { type: 'subscribe', name: 'فهد من مكة', plan: 'الباقة الاحترافية', avatar: 'ف', role: 'معلم فيزياء' },
  { type: 'create', name: 'معلّم في تبوك', subject: 'فيزياء · ثانوي', avatar: 'ت', count: 30, role: 'معلم فيزياء' },

  { type: 'review', name: 'أ. خالد الزهراني', role: 'معلم علوم', avatar: 'خ',
    body: 'نماذج (A/B) جعلت التصحيح عادلاً ومنعت الغش — تحفة.' },
  { type: 'subscribe', name: 'هند من القصيم', plan: 'باقة المدارس', avatar: 'ه', role: 'معلمة' },
  { type: 'create', name: 'معلّمة في حائل', subject: 'رياضيات · رابع ابتدائي', avatar: 'ح', count: 15, role: 'معلمة رياضيات' },
];

const LA_CONFIG = {
  review:    { tag: 'رأي معلم',        icon: 'Quote' as const,       hue: 'var(--brand)' },
  subscribe: { tag: 'اشتراك جديد',     icon: 'CheckCircle' as const, hue: 'var(--brand)' },
  create:    { tag: 'تم إنشاء اختبار', icon: 'Edit' as const,        hue: 'var(--accent)' },
};

const LA_AVATAR_COLORS = [
  { c1: '#00E08A', c2: '#00B873', on: '#06120E' },
  { c1: '#38BDF8', c2: '#0284C7', on: '#06121A' },
  { c1: '#FBBF24', c2: '#D97706', on: '#1A1206' },
  { c1: '#A78BFA', c2: '#7C3AED', on: '#FFFFFF' },
  { c1: '#2DD4BF', c2: '#0D9488', on: '#06120E' },
  { c1: '#FB7185', c2: '#E11D48', on: '#FFFFFF' },
];

const VISIBLE_MS = 6200;
const GAP_MS = 5200;
const FIRST_DELAY_MS = 4500;

interface LiveActivityCardProps {
  ev: typeof LA_EVENTS[0];
  idx: number;
  onClose: () => void;
}

const LiveActivityCard = ({ ev, idx = 0, onClose }: LiveActivityCardProps) => {
  const cfg = LA_CONFIG[ev.type as keyof typeof LA_CONFIG];
  const pal = LA_AVATAR_COLORS[idx % LA_AVATAR_COLORS.length];
  
  // Resolve icon component dynamically
  const IconCmp = (Icon as any)[cfg.icon] || Icon.Sparkles;

  let title = ev.name;
  let sub = "";
  if (ev.type === 'review') {
    sub = ev.role;
  } else if (ev.type === 'subscribe') {
    sub = `اشترك في ${(ev as any).plan}`;
  } else {
    sub = `${(ev as any).subject} · ${(ev as any).count} سؤال`;
  }

  return (
    <div className="la-card" role="status" aria-live="polite">
      <div className="la-top">
        <span className="la-tag" style={{ color: cfg.hue }}>
          <span className="la-livedot" style={{ background: cfg.hue }} />
          {cfg.tag}
        </span>
        <button className="la-close" onClick={onClose} aria-label="إغلاق">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" />
          </svg>
        </button>
      </div>

      <div className="la-body">
        <div className="la-avatar" style={{
          background: `linear-gradient(145deg, ${pal.c1}, ${pal.c2})`,
          boxShadow: `0 6px 16px -6px color-mix(in oklch, ${pal.c1} 60%, transparent)`,
        }}>
          <span className="la-avatar-letter" style={{ color: pal.on }}>{ev.avatar}</span>
          <span className="la-avatar-badge" style={{ background: pal.c2 }}>
            <IconCmp width="11" height="11" style={{ color: pal.on }} />
          </span>
        </div>
        <div className="la-text">
          <div className="la-title">{title}</div>
          {ev.type === 'review'
            ? <div className="la-quote">{(ev as any).body}</div>
            : <div className="la-sub">{sub}</div>}
          {ev.type !== 'review' && <div className="la-role">{ev.role}</div>}
          {ev.type === 'review' && <div className="la-role">{sub}</div>}
        </div>
      </div>

      <div className="la-progress">
        <span className="la-progress-fill" />
      </div>
    </div>
  );
};

export const LiveActivity = () => {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(true); // default to true, load client-side

  useEffect(() => {
    // If inside an iframe (like Puck preview canvas) or in admin route, disable live activity
    if (typeof window !== "undefined") {
      try {
        const isIframe = window.self !== window.top;
        const isAdmin = window.location.pathname.includes("/admin") || 
                        (window.parent && window.parent.location.pathname.includes("/admin")) ||
                        window.location.search.includes("puck") ||
                        (window.parent && window.parent.location.search.includes("puck")) ||
                        !!document.querySelector(".puck-editor-theme-override") ||
                        (window.parent && !!window.parent.document.querySelector(".puck-editor-theme-override"));
        const isFaq = window.location.pathname.includes("/faq") ||
                      (window.parent && window.parent.location.pathname.includes("/faq"));
        if (isIframe || isAdmin || isFaq) {
          setDismissed(true);
          return;
        }
      } catch (err) {
        console.warn("Editor check error:", err);
      }
    }

    // Session storage check on client mount
    try {
      const isDismissed = sessionStorage.getItem('examy_la_dismissed') === '1';
      setDismissed(isDismissed);
    } catch {
      setDismissed(false);
    }
  }, []);

  useEffect(() => {
    if (dismissed) return;
    const t: NodeJS.Timeout[] = [];
    const lead = idx === 0 ? FIRST_DELAY_MS : GAP_MS;
    t.push(setTimeout(() => setVisible(true), lead));
    t.push(setTimeout(() => setVisible(false), lead + VISIBLE_MS));
    t.push(setTimeout(() => setIdx(i => (i + 1) % LA_EVENTS.length), lead + VISIBLE_MS + 650));
    return () => t.forEach(clearTimeout);
  }, [idx, dismissed]);

  if (dismissed) return null;

  const close = () => {
    setVisible(false);
    setDismissed(true);
    try { sessionStorage.setItem('examy_la_dismissed', '1'); } catch {}
  };

  const ev = LA_EVENTS[idx];

  return (
    <div
      className={'la-wrap' + (visible ? ' la-in' : '')}
      aria-hidden={!visible}
    >
      <LiveActivityCard key={idx} ev={ev} idx={idx} onClose={close} />

      <style>{`
        .la-wrap {
          position: fixed !important;
          bottom: 22px;
          inset-inline-end: 22px;
          width: 340px;
          max-width: calc(100vw - 32px);
          z-index: 8000 !important;
          opacity: 0;
          transform: translateY(14px) scale(0.97);
          transition: opacity .4s ease, transform .4s ease;
          pointer-events: none;
          font-family: var(--font-body, system-ui);
        }
        .la-wrap.la-in {
          pointer-events: auto;
          animation: laReveal .5s cubic-bezier(.16,1,.3,1) forwards;
        }
        @keyframes laReveal {
          from { opacity: 0; transform: translateY(14px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        body[data-anims="off"] .la-wrap.la-in { animation: none !important; opacity: 1; transform: none; }

        .la-card {
          position: relative;
          background: color-mix(in oklch, var(--bg-elev-2) 88%, transparent);
          -webkit-backdrop-filter: blur(18px) saturate(1.3);
          backdrop-filter: blur(18px) saturate(1.3);
          border: 1px solid var(--border-strong);
          border-radius: 18px;
          padding: 14px 16px 16px;
          box-shadow: 0 1px 0 rgba(255,255,255,0.05) inset,
                      0 24px 60px -24px rgba(0,0,0,0.75),
                      0 0 0 1px rgba(0,0,0,0.18);
          overflow: hidden;
        }
        .la-card::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(120% 80% at 100% 0%, color-mix(in oklch, var(--brand) 12%, transparent), transparent 60%);
          pointer-events: none;
        }

        .la-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; position: relative; }
        .la-tag {
          display: inline-flex; align-items: center; gap: 7px;
          font-size: 11.5px; font-weight: 700; letter-spacing: .01em;
        }
        .la-livedot {
          width: 7px; height: 7px; border-radius: 50%;
          box-shadow: 0 0 0 0 currentColor;
          animation: laPing 1.8s ease-out infinite;
        }
        @keyframes laPing {
          0% { box-shadow: 0 0 0 0 color-mix(in oklch, var(--brand) 60%, transparent); }
          70% { box-shadow: 0 0 0 7px transparent; }
          100% { box-shadow: 0 0 0 0 transparent; }
        }
        .la-close {
          width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;
          border-radius: 7px; color: var(--text-subtle);
          transition: background .15s, color .15s;
          cursor: pointer;
        }
        .la-close:hover { background: var(--bg-elev-1); color: var(--text); }

        .la-body { display: flex; gap: 13px; align-items: flex-start; position: relative; }
        .la-avatar {
          position: relative; flex-shrink: 0;
          width: 46px; height: 46px; border-radius: 13px;
          display: flex; align-items: center; justify-content: center;
        }
        .la-avatar-letter { font-weight: 800; font-size: 19px; }
        .la-avatar-badge {
          position: absolute; bottom: -4px; inset-inline-start: -4px;
          width: 20px; height: 20px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          border: 2.5px solid var(--bg-elev-2);
        }

        .la-text { min-width: 0; flex: 1; padding-top: 1px; text-align: right; }
        .la-title { font-weight: 700; font-size: 14.5px; color: var(--text); line-height: 1.3; }
        .la-quote {
          font-size: 13px; line-height: 1.55; color: var(--text-muted); margin-top: 4px;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
        }
        .la-sub { font-size: 13.5px; color: var(--text); margin-top: 3px; font-weight: 500; }
        .la-role { font-size: 12px; color: var(--text-subtle); margin-top: 3px; }

        .la-progress {
          position: absolute; bottom: 0; inset-inline-start: 0; inset-inline-end: 0;
          height: 3px; background: var(--border);
        }
        .la-progress-fill {
          display: block; height: 100%;
          background: linear-gradient(90deg, var(--brand), var(--accent));
          transform-origin: inline-start;
          animation: laProgress ${VISIBLE_MS}ms linear forwards;
        }
        @keyframes laProgress { from { width: 100%; } to { width: 0%; } }

        body[data-anims="off"] .la-livedot,
        body[data-anims="off"] .la-progress-fill { animation: none !important; }
        body[data-anims="off"] .la-progress-fill { width: 100%; }

        @media (max-width: 600px) {
          .la-wrap { bottom: 14px; inset-inline-end: 14px; inset-inline-start: 14px; width: auto; }
        }
        @media print { .la-wrap { display: none !important; } }
      `}</style>
    </div>
  );
};
