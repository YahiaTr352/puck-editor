import React, { useState, useEffect, useRef } from "react";
import { Config } from "@puckeditor/core";
import { Icon } from "./icons";

/* ────────────────────────────────────────────────────────────────────────
   Helper Sub-components & Assets
   ──────────────────────────────────────────────────────────────────────── */

// Real "اختباري · EXAMY" logo lockup
export const Logo = ({ size = 36, color }: { size?: number; color?: string }) => {
  const height = size * 1.05;
  const width = height * (1046 / 374);
  const maskUrl = "/assets/logo-mask.png";
  return (
    <div
      style={{
        width,
        height,
        backgroundColor: color || "var(--brand)",
        WebkitMaskImage: `url(${maskUrl})`,
        maskImage: `url(${maskUrl})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        flexShrink: 0,
      }}
      aria-label="اختباري Examy"
    />
  );
};

// Animated number counter
export const Counter = ({
  to,
  suffix = "",
  duration = 1400,
  decimals = 0,
}: {
  to: number;
  suffix?: string;
  duration?: number;
  decimals?: number;
}) => {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(to * eased);
            if (p < 1) requestAnimationFrame(tick);
            else setVal(to);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to, duration]);

  const display =
    decimals > 0
      ? val.toFixed(decimals)
      : Math.round(val).toLocaleString("en-US");
  return (
    <span ref={ref} className="num-ticker">
      {display}
      {suffix}
    </span>
  );
};

/* ── Hero AIPanel Animation ────────────────────────────────── */
const HeroAIPanel = () => {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % 4), 3000);
    return () => clearInterval(id);
  }, []);

  const subjects = ["الرياضيات", "العلوم", "اللغة العربية", "الفيزياء"];
  const grades = [
    "الصف الثالث متوسط",
    "الصف الأول ثانوي",
    "الصف السادس ابتدائي",
    "الصف الثاني ثانوي",
  ];
  const counts = [10, 15, 20, 25];

  return (
    <div
      style={{
        background: "var(--bg-elev-1)",
        border: "1px solid var(--border-strong)",
        borderRadius: 18,
        padding: 22,
        boxShadow:
          "0 30px 80px -20px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.02)",
        width: "100%",
        maxWidth: 460,
        textAlign: "right",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <div style={{ display: "flex", gap: 6 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#FF5F57",
            }}
          />
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#FEBC2E",
            }}
          />
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#28C840",
            }}
          />
        </div>
        <div
          style={{
            fontSize: 11,
            color: "var(--text-subtle)",
            fontFamily: "monospace",
          }}
        >
          examy.sa/new
        </div>
        <div style={{ width: 16 }} />
      </div>

      <div
        style={{
          fontSize: 13,
          color: "var(--text-muted)",
          marginBottom: 8,
        }}
      >
        إنشاء اختبار جديد
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 16,
        }}
      >
        <Icon.Sparkles width="18" height="18" style={{ color: "var(--brand)" }} />
        <div style={{ fontSize: 15, fontWeight: 600 }}>
          وصف باستخدام الذكاء الاصطناعي
        </div>
      </div>

      <div
        style={{
          background: "var(--bg-elev-2)",
          border: "1px solid var(--border)",
          borderRadius: 12,
          padding: 14,
          fontSize: 14,
          minHeight: 70,
        }}
      >
        <div style={{ color: "var(--text)" }}>
          أنشئ اختبار{" "}
          <span
            style={{ color: "var(--brand)", fontWeight: 600 }}
            key={step}
          >
            {subjects[step]}
          </span>{" "}
          لـ
          <span style={{ color: "var(--brand)", fontWeight: 600 }}>
            {" "}
            {grades[step]}
          </span>
          ، عدد{" "}
          <span style={{ color: "var(--brand)", fontWeight: 600 }}>
            {counts[step]}
          </span>{" "}
          أسئلة، متنوّع المستويات.
          <span
            style={{
              display: "inline-block",
              width: 2,
              height: 16,
              background: "var(--brand)",
              verticalAlign: "middle",
              marginInlineStart: 2,
              animation: "glowPulse 1s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
        {["اختيار من متعدد", "صح/خطأ", "مقالي", "بلوم: تطبيق"].map((chip, i) => (
          <div
            key={i}
            style={{
              fontSize: 11,
              padding: "5px 10px",
              borderRadius: 8,
              background: i === step % 4 ? "var(--brand-soft)" : "var(--bg-elev-2)",
              color: i === step % 4 ? "var(--brand)" : "var(--text-muted)",
              border: `1px solid ${
                i === step % 4
                  ? "color-mix(in oklch, var(--brand) 30%, transparent)"
                  : "var(--border)"
              }`,
              fontWeight: 500,
              transition: "all 0.3s",
            }}
          >
            {chip}
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          gap: 8,
          marginTop: 16,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontSize: 12,
            color: "var(--text-subtle)",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--brand)",
              animation: "glowPulse 1.4s ease-in-out infinite",
            }}
          />
          جاهز خلال 8 ثوانٍ
        </div>
        <button
          className="btn btn-primary"
          style={{ padding: "8px 14px", fontSize: 13 }}
        >
          توليد الاختبار
          <Icon.Bolt width="14" height="14" />
        </button>
      </div>
    </div>
  );
};

/* ── Hero Pick Panel Choice Picker ────────────────────────── */
const HeroPickPanel = ({ wide = false }: { wide?: boolean }) => {
  const [subject, setSubject] = useState(1);
  const [grade, setGrade] = useState(2);
  const [count, setCount] = useState(2);
  const [types, setTypes] = useState([0, 2]);
  const [bloom, setBloom] = useState([1, 2]);

  const toggle = (arr: number[], setArr: React.Dispatch<React.SetStateAction<number[]>>, i: number) =>
    setArr(arr.includes(i) ? arr.filter((x) => x !== i) : [...arr, i]);

  const Chip = ({
    active,
    onClick,
    children,
    accent,
  }: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
    accent?: boolean;
  }) => (
    <button
      type="button"
      onClick={onClick}
      style={{
        fontSize: 12,
        padding: "6px 11px",
        borderRadius: 8,
        background: active
          ? accent
            ? "var(--brand-soft)"
            : "var(--brand)"
          : "var(--bg-elev-2)",
        color: active
          ? accent
            ? "var(--brand)"
            : "var(--brand-on)"
          : "var(--text-muted)",
        border: `1px solid ${
          active
            ? "color-mix(in oklch, var(--brand) 35%, transparent)"
            : "var(--border)"
        }`,
        fontWeight: 600,
        transition: "all 0.15s",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );

  const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div style={{ marginBottom: 12 }}>
      <div
        style={{
          fontSize: 11,
          color: "var(--text-subtle)",
          marginBottom: 6,
          fontWeight: 600,
          letterSpacing: "0.02em",
          textAlign: "right",
        }}
      >
        {label}
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", direction: "rtl" }}>
        {children}
      </div>
    </div>
  );

  return (
    <div
      style={{
        background: "var(--bg-elev-1)",
        border: "1px solid var(--border-strong)",
        borderRadius: 18,
        padding: 24,
        boxShadow:
          "0 30px 80px -20px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.02)",
        width: "100%",
        maxWidth: wide ? "100%" : 460,
        textAlign: "right",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <div style={{ display: "flex", gap: 6 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#FF5F57",
            }}
          />
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#FEBC2E",
            }}
          />
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#28C840",
            }}
          />
        </div>
        <div
          style={{
            fontSize: 11,
            color: "var(--text-subtle)",
            fontFamily: "monospace",
          }}
        >
          examy.sa/new
        </div>
        <div style={{ width: 16 }} />
      </div>

      <div
        style={{
          fontSize: 13,
          color: "var(--text-muted)",
          marginBottom: 8,
        }}
      >
        إنشاء اختبار جديد
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 16,
        }}
      >
        <Icon.Layers width="18" height="18" style={{ color: "var(--brand)" }} />
        <div style={{ fontSize: 15, fontWeight: 600 }}>
          اختيار الخانات يدوياً
        </div>
      </div>

      <div
        style={{
          display: wide ? "grid" : "block",
          gridTemplateColumns: wide
            ? "repeat(auto-fit, minmax(240px, 1fr))"
            : undefined,
          gap: wide ? "4px 28px" : undefined,
        }}
      >
        <Row label="المادة">
          {["الرياضيات", "العلوم", "اللغة العربية", "الفيزياء"].map((s, i) => (
            <Chip key={i} active={subject === i} onClick={() => setSubject(i)}>
              {s}
            </Chip>
          ))}
        </Row>
        <Row label="الصف">
          {["سادس", "أول متوسط", "ثالث متوسط", "أول ثانوي"].map((s, i) => (
            <Chip key={i} active={grade === i} onClick={() => setGrade(i)}>
              {s}
            </Chip>
          ))}
        </Row>
        <Row label="عدد الأسئلة">
          {[10, 15, 20, 25].map((s, i) => (
            <Chip key={i} active={count === i} onClick={() => setCount(i)}>
              {s}
            </Chip>
          ))}
        </Row>
        <Row label="أنواع الأسئلة (اختر متعدد)">
          {["اختيار من متعدد", "صح/خطأ", "مقالي", "تكميل"].map((s, i) => (
            <Chip
              key={i}
              accent
              active={types.includes(i)}
              onClick={() => toggle(types, setTypes, i)}
            >
              {types.includes(i) ? "✓ " : ""}
              {s}
            </Chip>
          ))}
        </Row>
        <Row label="مستوى بلوم">
          {["تذكّر", "فهم", "تطبيق", "تحليل"].map((s, i) => (
            <Chip
              key={i}
              accent
              active={bloom.includes(i)}
              onClick={() => toggle(bloom, setBloom, i)}
            >
              {bloom.includes(i) ? "✓ " : ""}
              {s}
            </Chip>
          ))}
        </Row>
      </div>

      <div
        style={{
          display: "flex",
          gap: 8,
          marginTop: 16,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontSize: 12,
            color: "var(--text-subtle)",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--brand)",
              animation: "glowPulse 1.4s ease-in-out infinite",
            }}
          />
          {types.length + bloom.length} خيار محدّد
        </div>
        <button
          className="btn btn-primary"
          style={{ padding: "8px 14px", fontSize: 13 }}
        >
          توليد الاختبار
          <Icon.Bolt width="14" height="14" />
        </button>
      </div>
    </div>
  );
};

/* ── Feature Tabs Mock Visuals ────────────────────────────── */
const FT_box = {
  background: "var(--bg-elev-2)",
  border: "1px solid var(--border)",
  borderRadius: 12,
};

const VisualCurriculum = () => (
  <div
    style={{
      ...FT_box,
      padding: 18,
      display: "flex",
      flexDirection: "column",
      gap: 12,
      height: "100%",
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <span style={{ fontSize: 13.5, fontWeight: 700 }}>نواتج التعلم الرسمية</span>
      <span
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: "var(--brand)",
          background: "var(--brand-soft)",
          padding: "4px 10px",
          borderRadius: 999,
        }}
      >
        المنهج ١٤٤٧هـ
      </span>
    </div>
    {[
      "الجبر والمعادلات الخطية",
      "الهندسة الإحداثية",
      "الدوال والمتباينات",
      "الإحصاء والاحتمالات",
    ].map((o, i) => (
      <div
        key={i}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 11,
          padding: "10px 12px",
          background: "var(--bg)",
          border: "1px solid var(--border)",
          borderRadius: 10,
        }}
      >
        <span
          style={{
            width: 22,
            height: 22,
            borderRadius: 7,
            background: "var(--brand-soft)",
            color: "var(--brand)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Icon.Check width="13" height="13" />
        </span>
        <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{o}</span>
        <span style={{ marginInlineStart: "auto", fontSize: 10.5, color: "var(--text-subtle)" }}>
          معتمد
        </span>
      </div>
    ))}
  </div>
);

const VisualAnalytics = () => {
  const tone = (v: number) =>
    v >= 85
      ? "var(--brand)"
      : v >= 70
      ? "var(--accent)"
      : v >= 55
      ? "var(--warning)"
      : "var(--danger)";
  const ar = (n: number) => String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[+d]);
  const studentNames = ["نورة", "سارة", "ليان", "جود"];
  const outcomes = [
    { o: "حل المعادلات الخطية بمتغيّر واحد", s: [95, 88, 70, 60] },
    { o: "تمثيل الاقترانات الخطية بيانياً", s: [90, 82, 64, 55] },
    { o: "حل المتباينات الخطية والتحقق منها", s: [84, 74, 58, 48] },
    { o: "تحليل المقادير الجبرية وتبسيطها", s: [92, 80, 66, 50] },
  ];
  const avg = (a: number[]) => Math.round(a.reduce((x, y) => x + y, 0) / a.length);
  const Pct = ({ v, strong }: { v: number; strong?: boolean }) => (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <span
        style={{
          fontSize: 11,
          fontWeight: strong ? 800 : 700,
          fontVariantNumeric: "tabular-nums",
          color: tone(v),
          background: strong
            ? "transparent"
            : `color-mix(in oklch, ${tone(v)} 16%, transparent)`,
          padding: strong ? 0 : "3px 0",
          width: 40,
          textAlign: "center",
          borderRadius: 7,
        }}
      >
        {ar(v)}٪
      </span>
    </div>
  );
  const overall = avg(outcomes.map((o) => avg(o.s)));
  const gridCols = "1.9fr repeat(4, 1fr) 0.95fr";

  return (
    <div
      style={{
        ...FT_box,
        padding: 16,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div style={{ fontSize: 13.5, fontWeight: 700 }}>تقرير نواتج التعلم</div>
          <div style={{ fontSize: 11, color: "var(--text-subtle)", marginTop: 3 }}>
            <span style={{ color: "var(--brand)", fontWeight: 600 }}>الرياضيات</span> · ثالث
            متوسط (أ) · ٤ طالبات
          </div>
        </div>
        <div style={{ textAlign: "left" }}>
          <div
            style={{
              fontSize: 19,
              fontWeight: 800,
              color: "var(--brand)",
              letterSpacing: "-0.02em",
            }}
          >
            {ar(overall)}٪
          </div>
          <div style={{ fontSize: 10, color: "var(--text-subtle)" }}>متوسط الفصل</div>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: gridCols,
            gap: 6,
            alignItems: "end",
            padding: "0 4px 9px",
          }}
        >
          <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text-subtle)" }}>
            ناتج التعلّم
          </span>
          {studentNames.map((n, i) => (
            <span
              key={i}
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "var(--text)",
                textAlign: "center",
              }}
            >
              {n}
            </span>
          ))}
          <span
            style={{
              fontSize: 10.5,
              fontWeight: 700,
              color: "var(--text-subtle)",
              textAlign: "center",
            }}
          >
            المتوسط
          </span>
        </div>
        {outcomes.map((row, i) => {
          const a = avg(row.s);
          return (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: gridCols,
                gap: 6,
                alignItems: "center",
                padding: "8px 4px",
                borderTop: "1px solid var(--border)",
              }}
            >
              <span style={{ fontSize: 11.5, color: "var(--text)", lineHeight: 1.35 }}>
                {row.o}
              </span>
              {row.s.map((v, j) => (
                <Pct key={j} v={v} />
              ))}
              <Pct v={a} strong />
            </div>
          );
        })}
      </div>

      <div
        style={{
          borderTop: "1px solid var(--border)",
          paddingTop: 9,
          display: "flex",
          gap: 14,
          fontSize: 10,
          color: "var(--text-subtle)",
          flexWrap: "wrap",
        }}
      >
        {[
          ["var(--brand)", "متقَن"],
          ["var(--accent)", "جيد"],
          ["var(--warning)", "متوسط"],
          ["var(--danger)", "يحتاج دعم"],
        ].map(([c, l], i) => (
          <span
            key={i}
            style={{ display: "inline-flex", alignItems: "center", gap: 5 }}
          >
            <span style={{ width: 8, height: 8, borderRadius: 3, background: c }} />
            {l}
          </span>
        ))}
      </div>
    </div>
  );
};

const VisualBloom = () => {
  const levels = [
    { l: "تذكّر", v: 90 },
    { l: "فهم", v: 78 },
    { l: "تطبيق", v: 66 },
    { l: "تحليل", v: 52 },
    { l: "تقييم", v: 40 },
    { l: "إبداع", v: 28 },
  ];
  return (
    <div
      style={{
        ...FT_box,
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 14,
        height: "100%",
        justifyContent: "center",
      }}
    >
      {levels.map((lv, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 12.5, fontWeight: 600, width: 52, flexShrink: 0 }}>
            {lv.l}
          </span>
          <div
            style={{
              flex: 1,
              height: 9,
              borderRadius: 999,
              background: "var(--bg)",
              border: "1px solid var(--border)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${lv.v}%`,
                height: "100%",
                borderRadius: 999,
                background: `linear-gradient(90deg, var(--brand-2), var(--brand))`,
                opacity: 0.55 + lv.v / 250,
              }}
            />
          </div>
          <span style={{ fontSize: 11.5, color: "var(--text-subtle)", width: 34, textAlign: "left" }}>
            {lv.v}٪
          </span>
        </div>
      ))}
    </div>
  );
};

const VisualOMR = () => (
  <div
    style={{
      ...FT_box,
      padding: 20,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      gap: 14,
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <span style={{ fontSize: 13.5, fontWeight: 700 }}>ورقة الإجابة · OMR</span>
      <span
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: "var(--brand)",
          background: "var(--brand-soft)",
          padding: "4px 10px",
          borderRadius: 999,
          display: "inline-flex",
          alignItems: "center",
          gap: 5,
        }}
      >
        <Icon.Check width="11" height="11" /> تم التصحيح
      </span>
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
      {[1, 2, 3, 4, 5].map((q) => {
        const correct = (q * 2) % 4;
        return (
          <div key={q} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 12, color: "var(--text-subtle)", width: 18 }}>
              {q}
            </span>
            <div style={{ display: "flex", gap: 10 }}>
              {[0, 1, 2, 3].map((opt) => (
                <span
                  key={opt}
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    border:
                      "1.5px solid " +
                      (opt === correct ? "var(--brand)" : "var(--border-strong)"),
                    background: opt === correct ? "var(--brand)" : "transparent",
                  }}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

const VisualTemplates = () => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 12,
      height: "100%",
    }}
  >
    {["اختبار نهائي", "اختبار قصير", "ورقة عمل", "مراجعة شاملة"].map((name, i) => (
      <div
        key={i}
        style={{
          ...FT_box,
          padding: 12,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <div
          style={{
            flex: 1,
            borderRadius: 8,
            background: "var(--bg)",
            border: "1px solid var(--border)",
            padding: 10,
            display: "flex",
            flexDirection: "column",
            gap: 6,
            minHeight: 70,
          }}
        >
          <div
            style={{
              height: 6,
              width: "55%",
              borderRadius: 3,
              background: "var(--brand-soft)",
            }}
          />
          {[100, 88, 92, 70].map((w, j) => (
            <div
              key={j}
              style={{
                height: 4,
                width: `${w}%`,
                borderRadius: 2,
                background: "var(--border-strong)",
              }}
            />
          ))}
        </div>
        <span style={{ fontSize: 12, fontWeight: 600 }}>{name}</span>
      </div>
    ))}
  </div>
);

const VisualShare = () => (
  <div
    style={{
      ...FT_box,
      padding: 20,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      gap: 16,
      justifyContent: "center",
    }}
  >
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <div
        style={{
          width: 84,
          height: 84,
          borderRadius: 12,
          background: "#fff",
          padding: 8,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundImage: "repeating-conic-gradient(#0a0a0a 0% 25%, #fff 0% 50%)",
            backgroundSize: "14px 14px",
            borderRadius: 4,
          }}
        />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13.5, fontWeight: 700, marginBottom: 8 }}>
          شارك الاختبار فوراً
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "9px 12px",
            background: "var(--bg)",
            border: "1px solid var(--border)",
            borderRadius: 9,
          }}
        >
          <span
            style={{
              fontSize: 12,
              color: "var(--text-muted)",
              fontFamily: "monospace",
              direction: "ltr",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              flex: 1,
            }}
          >
            examy.sa/t/9Fq2x
          </span>
          <span style={{ fontSize: 11, fontWeight: 600, color: "var(--brand)" }}>نسخ</span>
        </div>
      </div>
    </div>
    <div style={{ display: "flex", gap: 10 }}>
      {[
        { I: Icon.Share, l: "رابط" },
        { I: Icon.Globe, l: "QR" },
        { I: Icon.Users, l: "المنصة" },
      ].map((b, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            padding: "11px",
            borderRadius: 10,
            background: "var(--bg)",
            border: "1px solid var(--border)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
          }}
        >
          <b.I width="17" height="17" style={{ color: "var(--brand)" }} />
          <span style={{ fontSize: 11.5, color: "var(--text-muted)" }}>{b.l}</span>
        </div>
      ))}
    </div>
  </div>
);

const FEAT_TABS = [
  {
    icon: Icon.Saudi,
    t: "مرتبط بالمنهج السعودي",
    short: "المنهج السعودي",
    d: "كل اختبار مبنيٌّ على بنك أسئلة ضخم ونواتج تعلم رسمية معتمدة، مرتبطٍ مباشرةً بالمنهج السعودي ومراحله الدراسية.",
    bullets: ["بنك أسئلة معتمد لكل مادة", "نواتج تعلم رسمية ١٤٤٧هـ", "تغطية لكل المراحل والصفوف"],
    Visual: VisualCurriculum,
  },
  {
    icon: Icon.Chart,
    t: "تحليلات عميقة",
    short: "تحليلات",
    d: "تقارير أداء دقيقة على مستوى الطالب والفصل والمادة، تكشف نقاط القوة والضعف وتساعدك على اتخاذ قرارٍ مبنيٍّ على البيانات.",
    bullets: ["أداء على مستوى الطالب والفصل", "تحليل لكل مهارة ودرس", "تصدير التقارير ومشاركتها"],
    Visual: VisualAnalytics,
  },
  {
    icon: Icon.Layers,
    t: "مستويات بلوم",
    short: "مستويات بلوم",
    d: "تنويع تلقائي ذكي للأسئلة عبر مستويات بلوم الستة — من التذكّر حتى الإبداع — لاختبارٍ متوازنٍ يقيس الفهم الحقيقي.",
    bullets: ["توزيع متوازن للأسئلة", "تحكّم في نسبة كل مستوى", "قياس مهارات التفكير العليا"],
    Visual: VisualBloom,
  },
  {
    icon: Icon.Shield,
    t: "تصحيح آلي + OMR",
    short: "التصحيح الآلي",
    d: "صحّح الاختبارات الإلكترونية لحظياً، والورقية عبر الماسح الضوئي بتقنية OMR — دقّةٌ عالية ووقتٌ موفور.",
    bullets: ["تصحيح أونلاين فوري", "مسح ضوئي OMR للورقي", "نتائج ودرجات تلقائية"],
    Visual: VisualOMR,
  },
  {
    icon: Icon.Bookmark,
    t: "قوالب جاهزة",
    short: "قوالب جاهزة",
    d: "مكتبة قوالب احترافية لكل المراحل والمواد، قابلة للتخصيص الكامل لتبدأ من نقطةٍ متقدمة في ثوانٍ.",
    bullets: ["قوالب لكل مرحلة ومادة", "تخصيص كامل للشكل والمحتوى", "احفظ قوالبك الخاصة"],
    Visual: VisualTemplates,
  },
  {
    icon: Icon.Users,
    t: "مشاركة فوريّة",
    short: "مشاركة فورية",
    d: "أرسل الاختبار لطلابك في لحظة — عبر رابط مباشر، رمز QR، أو من داخل المنصة — دون أي تعقيد.",
    bullets: ["رابط مباشر قابل للنسخ", "رمز QR للمشاركة السريعة", "إرسال داخل المنصة للطلاب"],
    Visual: VisualShare,
  },
];

/* ────────────────────────────────────────────────────────────────────────
   Puck Configuration
   ──────────────────────────────────────────────────────────────────────── */

export type PuckConfig = {
  components: {
    Nav: {
      ctaText?: string;
      ctaLink?: string;
      links?: { label: string; href: string }[];
      actions?: { label: string; href: string; variant: "link" | "primary" }[];
      logoImageUrl?: string;
      logoText?: string;
      logoLink?: string;
      logoSize?: number;
    };
    Hero: {
      variant?: "aurora" | "split" | "grid" | "spotlight" | "minimal";
      badgeText: string;
      title: string;
      gradientText: string;
      subtitle: string;
      ctas?: { label: string; href: string; variant: "primary" | "secondary" }[];
    };
    HowItWorks: {
      eyebrowText?: string;
      title?: string;
      subtitle?: string;
      steps?: {
        n: string;
        t: string;
        d: string;
        iconName: "Edit" | "Brain" | "Layers" | "Chart" | "Book" | "Clock" | "Settings" | "Shield" | "Saudi" | "AI" | "Zap" | "Users" | "Target";
      }[];
    };
    FeatureTabs: {
      eyebrowText?: string;
      title?: string;
      subtitle?: string;
      tabs?: {
        short: string;
        t: string;
        d: string;
        iconName: "Saudi" | "Chart" | "Layers" | "Shield" | "Bookmark" | "Users" | "Edit" | "Brain" | "Book" | "Clock" | "Settings" | "AI" | "Zap" | "Target";
        visualName: "Curriculum" | "Analytics" | "Bloom" | "OMR" | "Templates" | "Share";
        bullets: { value: string }[] | string[];
      }[];
    };
    Stats: {
      eyebrowText?: string;
      title?: string;
      items?: {
        label?: string;
        sub?: string;
      }[];
    };
    Pricing: {};
    FinalCTA: {
      title?: string;
      titleAccent?: string;
      titleSuffix?: string;
      subtitle?: string;
      ctas?: {
        label: string;
        href: string;
        variant: "primary" | "ghost";
      }[];
      features?: {
        value: string;
      }[];
    };
    Footer: {
      description?: string;
      twitterUrl?: string;
      instagramUrl?: string;
      col1Title?: string;
      col1Links?: { label: string; href: string }[];
      col2Title?: string;
      col2Links?: { label: string; href: string }[];
      col3Title?: string;
      col3Links?: { label: string; href: string }[];
      col4Title?: string;
      col4Links?: { label: string; href: string }[];
      copyrightText?: string;
      statusText?: string;
    };
    FAQ: {
      title?: string;
      subtitle?: string;
      categories?: {
        label: string;
        iconName: "general" | "creation" | "customization" | "grading" | "pricing";
        items?: {
          q: string;
          a: string;
          list?: { value: string }[];
        }[];
      }[];
    };
  };
};

export const config: Config<PuckConfig> = {
  components: {
    Nav: {
      fields: {
        logoImageUrl: {
          type: "custom",
          label: "صورة الشعار المخصص",
          render: ({ onChange, value }) => {
            const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = (event) => {
                const base64Url = event.target?.result as string;
                onChange(base64Url);
              };
              reader.readAsDataURL(file);
            };

            return (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <span style={{ fontSize: "13px", fontWeight: "500", color: "var(--text-muted)" }}>تحميل شعار من جهازك:</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{
                    padding: "8px",
                    border: "1px solid var(--border)",
                    borderRadius: "6px",
                    background: "var(--bg-elev-1)",
                    color: "var(--text)",
                    cursor: "pointer",
                    fontSize: "12px",
                    width: "100%",
                  }}
                />
                {value && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "4px" }}>
                    <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>معاينة الشعار:</span>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px dashed var(--border)",
                      padding: "8px",
                      borderRadius: "6px",
                      background: "rgba(255, 255, 255, 0.03)",
                    }}>
                      <img
                        src={value}
                        alt="Preview"
                        style={{
                          maxHeight: "48px",
                          maxWidth: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => onChange("")}
                      style={{
                        padding: "6px 12px",
                        fontSize: "12px",
                        fontWeight: "600",
                        color: "#ffffff",
                        background: "#ef4444",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        alignSelf: "flex-start",
                        transition: "all 0.15s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = "0.9";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = "1";
                      }}
                    >
                      حذف الصورة 🗑️
                    </button>
                  </div>
                )}
              </div>
            );
          },
        },
        logoText: { type: "text", label: "النص البديل للشعار (Alt text)" },
        logoLink: { type: "text", label: "رابط توجيه الشعار" },
        logoSize: { type: "number", label: "حجم الشعار (الارتفاع بالبكسل)" },
        links: {
          type: "array",
          label: "روابط التنقل (Tabs)",
          getItemSummary: (item) => item.label || "رابط جديد",
          arrayFields: {
            label: { type: "text", label: "اسم الرابط (Tab)" },
            href: { type: "text", label: "الرابط (URL)" },
          },
          defaultItemProps: {
            label: "رابط جديد",
            href: "#",
          },
        },
        actions: {
          type: "array",
          label: "أزرار الإجراءات (Actions)",
          getItemSummary: (item) => item.label || "زر جديد",
          arrayFields: {
            label: { type: "text", label: "نص الزر" },
            href: { type: "text", label: "الرابط (URL)" },
            variant: {
              type: "select",
              label: "نوع الزر",
              options: [
                { label: "رابط عادي (تسجيل دخول مثلاً)", value: "link" },
                { label: "زر رئيسي (بمؤشر سهم)", value: "primary" }
              ]
            }
          },
          defaultItemProps: {
            label: "زر جديد",
            href: "#",
            variant: "primary"
          }
        }
      },
      defaultProps: {
        logoImageUrl: "",
        logoText: "اختباري Examy",
        logoLink: "#",
        logoSize: 36,
        links: [
          { label: "المنتج", href: "#features" },
          { label: "كيف يعمل", href: "#how" },
          { label: "الأسعار", href: "#pricing" },
          { label: "الأسئلة الشائعة", href: "#faq" },
        ],
        actions: [
          { label: "تسجيل دخول", href: "#login", variant: "link" },
          { label: "ابدأ مجاناً", href: "#cta", variant: "primary" }
        ],
      },
      render: ({ ctaText, ctaLink, links, actions, logoImageUrl = "", logoText = "اختباري Examy", logoLink = "#", logoSize = 36 }) => {
        const [scrolled, setScrolled] = useState(false);
        const [menuOpen, setMenuOpen] = useState(false);
        const [theme, setTheme] = useState("light");

        useEffect(() => {
          if (typeof window === "undefined") return;
          const onScroll = () => setScrolled(window.scrollY > 12);
          window.addEventListener("scroll", onScroll);
          onScroll();
          return () => window.removeEventListener("scroll", onScroll);
        }, []);

        useEffect(() => {
          if (typeof window === "undefined") return;
          const onResize = () => {
            if (window.innerWidth > 880) setMenuOpen(false);
          };
          window.addEventListener("resize", onResize);
          return () => window.removeEventListener("resize", onResize);
        }, []);

        useEffect(() => {
          if (typeof window === "undefined") return;
          const savedTheme = localStorage.getItem("theme");
          if (savedTheme === "dark" || savedTheme === "light") {
            document.body.setAttribute("data-theme", savedTheme);
            setTheme(savedTheme);
          } else {
            const currentTheme = document.body.getAttribute("data-theme") || "dark";
            setTheme(currentTheme);
          }
        }, []);

        const toggleTheme = () => {
          const newTheme = theme === "dark" ? "light" : "dark";
          document.body.setAttribute("data-theme", newTheme);
          localStorage.setItem("theme", newTheme);
          setTheme(newTheme);
        };

        const defaultLinks = [
          { label: "المنتج", href: "#features" },
          { label: "كيف يعمل", href: "#how" },
          { label: "الأسعار", href: "#pricing" },
          { label: "الأسئلة الشائعة", href: "#faq" },
        ];

        const activeLinks = links || defaultLinks;

        const defaultActions: { label: string; href: string; variant: "link" | "primary" }[] = [
          { label: "تسجيل دخول", href: "#login", variant: "link" },
          { label: ctaText || "ابدأ مجاناً", href: ctaLink || "#cta", variant: "primary" }
        ];

        const activeActions = actions || defaultActions;

        const solid = scrolled || menuOpen;

        return (
          <header
            style={{
              position: "fixed",
              top: 0,
              insetInlineStart: 0,
              insetInlineEnd: 0,
              zIndex: 50,
              padding: scrolled ? "12px 0" : "20px 0",
              background: solid
                ? "color-mix(in oklch, var(--bg) 80%, transparent)"
                : "transparent",
              backdropFilter: solid ? "blur(14px) saturate(140%)" : "none",
              WebkitBackdropFilter: solid ? "blur(14px) saturate(140%)" : "none",
              borderBottom: solid ? "1px solid var(--border)" : "1px solid transparent",
              transition: "all 0.25s ease",
            }}
          >
            <div
              className="container"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
              }}
            >
              <a href={logoLink} aria-label={logoText} style={{ display: "flex", flexShrink: 0, alignItems: "center" }}>
                {logoImageUrl ? (
                  <img
                    src={logoImageUrl}
                    alt={logoText}
                    style={{
                      height: logoSize,
                      width: "auto",
                      objectFit: "contain",
                      flexShrink: 0,
                    }}
                  />
                ) : (
                  <Logo size={logoSize} />
                )}
              </a>
              <nav
                style={{ display: "flex", gap: 4, alignItems: "center" }}
                className="nav-links"
              >
                {activeLinks.map((l, i) => (
                  <a
                    key={`${l.href}-${i}`}
                    href={l.href}
                    style={{
                      padding: "8px 14px",
                      fontSize: 14,
                      color: "var(--text-muted)",
                      borderRadius: 8,
                      fontWeight: 500,
                      transition: "color 0.15s",
                      whiteSpace: "nowrap",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--text-muted)")
                    }
                  >
                    {l.label}
                  </a>
                ))}
              </nav>
              <div
                style={{ display: "flex", gap: 10, alignItems: "center" }}
                className="nav-actions"
              >
                {/* Theme Toggle Button (Desktop) */}
                <button
                  type="button"
                  className="theme-toggle-desktop"
                  onClick={toggleTheme}
                  aria-label="تبديل المظهر"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: theme === "dark" 
                      ? "rgba(255, 255, 255, 0.08)" 
                      : "rgba(10, 24, 20, 0.05)",
                    border: "1px solid var(--border)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    color: theme === "dark" ? "#00E08A" : "var(--text-muted)",
                    boxShadow: theme === "dark"
                      ? "0 0 14px rgba(0, 224, 138, 0.3)"
                      : "none",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    marginLeft: 4,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--text)";
                    e.currentTarget.style.borderColor = "var(--brand)";
                    e.currentTarget.style.background = theme === "dark"
                      ? "rgba(255, 255, 255, 0.14)"
                      : "rgba(10, 24, 20, 0.08)";
                    e.currentTarget.style.boxShadow = theme === "dark"
                      ? "0 0 20px -2px var(--brand)"
                      : "none";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = theme === "dark" ? "#00E08A" : "var(--text-muted)";
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.background = theme === "dark"
                      ? "rgba(255, 255, 255, 0.08)"
                      : "rgba(10, 24, 20, 0.05)";
                    e.currentTarget.style.boxShadow = theme === "dark"
                      ? "0 0 14px rgba(0, 224, 138, 0.3)"
                      : "none";
                  }}
                >
                  {theme === "dark" ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /></svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>
                  )}
                </button>
                {activeActions.map((act, idx) => {
                  if (act.variant === "primary") {
                    return (
                      <a
                        key={`act-${idx}`}
                        href={act.href}
                        className="btn btn-primary"
                        style={{ padding: "10px 18px", fontSize: 14 }}
                      >
                        {act.label}
                        <Icon.ArrowLeft width="16" height="16" />
                      </a>
                    );
                  }
                  return (
                    <a
                      key={`act-${idx}`}
                      href={act.href}
                      style={{
                        fontSize: 14,
                        color: "var(--text-muted)",
                        fontWeight: 500,
                        padding: "8px 12px",
                      }}
                    >
                      {act.label}
                    </a>
                  );
                })}
              </div>
              
              {/* Theme Toggle & Hamburger Button (Mobile Container) */}
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                {/* Theme Toggle Button (Mobile) */}
                <button
                  type="button"
                  className="theme-toggle-mobile"
                  onClick={toggleTheme}
                  aria-label="تبديل المظهر"
                  style={{
                    display: "none",
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    alignItems: "center",
                    justifyContent: "center",
                    background: theme === "dark" 
                      ? "rgba(255, 255, 255, 0.08)" 
                      : "rgba(10, 24, 20, 0.05)",
                    border: "1px solid var(--border)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    color: theme === "dark" ? "#00E08A" : "var(--text)",
                    boxShadow: theme === "dark"
                      ? "0 0 14px rgba(0, 224, 138, 0.3)"
                      : "none",
                    cursor: "pointer",
                  }}
                >
                  {theme === "dark" ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /></svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>
                  )}
                </button>
                
                <button
                  type="button"
                  className="nav-burger"
                  aria-label="القائمة"
                  aria-expanded={menuOpen}
                  onClick={() => setMenuOpen((o) => !o)}
                  style={{
                    display: "none",
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    flexShrink: 0,
                    alignItems: "center",
                    justifyContent: "center",
                    background: menuOpen ? "var(--bg-elev-1)" : "transparent",
                    border: "1px solid var(--border-strong)",
                    color: "var(--text)",
                  }}
                >
                  {menuOpen ? (
                    <Icon.Plus width="20" height="20" style={{ transform: "rotate(45deg)" }} />
                  ) : (
                    <Icon.Menu width="20" height="20" />
                  )}
                </button>
              </div>
            </div>

            {/* Mobile dropdown */}
            <div
              className="nav-mobile-panel"
              style={{
                overflow: "hidden",
                maxHeight: menuOpen ? 460 : 0,
                opacity: menuOpen ? 1 : 0,
                transition:
                  "max-height 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease",
              }}
            >
              <div
                className="container"
                style={{ paddingTop: 14, paddingBottom: 18 }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {activeLinks.map((l, i) => (
                    <a
                      key={`${l.href}-${i}`}
                      href={l.href}
                      onClick={() => setMenuOpen(false)}
                      style={{
                        padding: "14px 14px",
                        fontSize: 16,
                        fontWeight: 600,
                        borderRadius: 12,
                        color: "var(--text-muted)",
                      }}
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    marginTop: 16,
                  }}
                >
                  {activeActions.map((act, idx) => {
                    if (act.variant === "primary") {
                      return (
                        <a
                          key={`act-mob-${idx}`}
                          href={act.href}
                          onClick={() => setMenuOpen(false)}
                          className="btn btn-primary btn-lg"
                          style={{ width: "100%", textAlign: "center" }}
                        >
                          {act.label}
                          <Icon.ArrowLeft width="18" height="18" />
                        </a>
                      );
                    }
                    return (
                      <a
                        key={`act-mob-${idx}`}
                        href={act.href}
                        onClick={() => setMenuOpen(false)}
                        className="btn btn-ghost btn-lg"
                        style={{ width: "100%", textAlign: "center" }}
                      >
                        {act.label}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            <style>{`
              @media (max-width: 880px) {
                .nav-links { display: none !important; }
                .nav-actions { display: none !important; }
                .nav-burger { display: inline-flex !important; }
                .theme-toggle-mobile { display: inline-flex !important; }
              }
              @media (min-width: 881px) {
                .nav-mobile-panel { display: none !important; }
              }
            `}</style>
          </header>
        );
      },
    },
    Hero: {
      fields: {
        badgeText: { type: "text", label: "نص الشارة العلوية" },
        title: { type: "text", label: "العنوان الرئيسي" },
        gradientText: { type: "text", label: "نص العنوان الملون" },
        subtitle: { type: "text", label: "العنوان الفرعي" },
        ctas: {
          type: "array",
          label: "أزرار الدعوة للإجراء (CTAs)",
          getItemSummary: (item) => item.label || "زر جديد",
          arrayFields: {
            label: { type: "text", label: "نص الزر" },
            href: { type: "text", label: "الرابط (URL)" },
            variant: {
              type: "select",
              label: "نوع الزر",
              options: [
                { label: "زر رئيسي (ملون)", value: "primary" },
                { label: "زر ثانوي (شفاف)", value: "secondary" }
              ]
            }
          },
          defaultItemProps: {
            label: "زر جديد",
            href: "#",
            variant: "primary"
          }
        }
      },
      defaultProps: {
        variant: "aurora",
        badgeText: "منصة سعودية · مدعومة بالذكاء الاصطناعي",
        title: "اختبارُك جاهزٌ خلال دقيقة",
        gradientText: "حسب المنهج السعودي",
        subtitle:
          "منصة ذكاء اصطناعي تُولّد الاختبارات وتُديرها وتُحلّل نتائجها — مرتبطة بنواتج التعلم ومستويات بلوم، تختصر ساعاتٍ من الإعداد إلى دقائق.",
        ctas: [
          { label: "ابدأ مجاناً الآن", href: "#cta", variant: "primary" },
          { label: "شاهد كيف يعمل", href: "#how", variant: "secondary" }
        ]
      },
      render: ({
        variant,
        badgeText,
        title,
        gradientText,
        subtitle,
        ctas = [],
      }) => {
        // Spotlight interaction
        const ref = useRef<HTMLDivElement>(null);
        const [pos, setPos] = useState({ x: 50, y: 30 });

        const HeroBadge = () => (
          <div className="eyebrow reveal">
            <span className="dot" />
            {badgeText}
          </div>
        );

        const HeroTitle = () => (
          <h1
            className="reveal hero-title"
            style={{
              fontSize: "clamp(30px, 6.6vw, 73px)",
              fontWeight: 900,
              letterSpacing: "-0.02em",
              lineHeight: 1.08,
              marginTop: 24,
              textWrap: "balance",
              animationDelay: "0.05s",
            }}
          >
            {title}
            <br />
            <span
              style={{
                background:
                  "linear-gradient(95deg, var(--brand) 0%, var(--accent) 50%, var(--brand) 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                backgroundSize: "200% 100%",
                animation: "shimmer 6s linear infinite",
              }}
            >
              {gradientText}
            </span>
          </h1>
        );

        const HeroSubtitle = () => (
          <p
            className="reveal"
            style={{
              fontSize: "clamp(16px, 1.4vw, 20px)",
              color: "var(--text-muted)",
              maxWidth: 620,
              margin: "24px auto 0",
              animationDelay: "0.1s",
            }}
          >
            {subtitle}
          </p>
        );

        const HeroCTAs = ({ center = false }: { center?: boolean }) => {
          if (!ctas || ctas.length === 0) return null;

          return (
            <div
              className="reveal"
              style={{
                display: "flex",
                gap: 12,
                marginTop: 32,
                flexWrap: "wrap",
                justifyContent: center ? "center" : "flex-start",
                animationDelay: "0.18s",
              }}
            >
              {ctas.map((cta, idx) => {
                if (cta.variant === "secondary") {
                  return (
                    <a key={idx} href={cta.href} className="btn btn-ghost btn-lg">
                      <Icon.Play width="14" height="14" />
                      {cta.label}
                    </a>
                  );
                }
                return (
                  <a key={idx} href={cta.href} className="btn btn-primary btn-lg">
                    {cta.label}
                    <Icon.ArrowLeft width="18" height="18" />
                  </a>
                );
              })}
            </div>
          );
        };

        const HeroSocialProof = ({ center = false }: { center?: boolean }) => (
          <div
            className="reveal"
            style={{
              marginTop: 40,
              display: "flex",
              alignItems: "center",
              gap: 24,
              justifyContent: center ? "center" : "flex-start",
              flexWrap: "wrap",
              animationDelay: "0.28s",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ display: "flex" }}>
                {[0, 1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: `hsl(${140 + i * 15} 50% ${30 + i * 6}%)`,
                      border: "2px solid var(--bg)",
                      marginInlineStart: i === 0 ? 0 : -10,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                      fontWeight: 700,
                      color: "var(--text)",
                    }}
                  >
                    {["أ", "م", "ه", "س", "ل"][i]}
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 13, color: "var(--text-muted)", textAlign: "right" }}>
                <div style={{ display: "flex", gap: 2, marginBottom: 2 }}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Icon.Star key={i} width="12" height="12" style={{ color: "#FFB454" }} />
                  ))}
                </div>
                <strong style={{ color: "var(--text)" }}>+12,000 معلم</strong> يستخدمون اختباري
              </div>
            </div>
            <div style={{ width: 1, height: 36, background: "var(--border)" }} />
            <div style={{ fontSize: 13, color: "var(--text-muted)" }}>
              موثوق من <strong style={{ color: "var(--text)" }}>+340 مدرسة</strong> في المملكة
            </div>
          </div>
        );

        /* ── Vary rendering ── */
        if (variant === "split") {
          return (
            <section
              style={{
                position: "relative",
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                paddingTop: 120,
                paddingBottom: 80,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  background:
                    "radial-gradient(ellipse 50% 70% at 0% 50%, color-mix(in oklch, var(--brand) 14%, transparent), transparent 60%)",
                }}
              />
              <div className="container" style={{ position: "relative" }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1.05fr 0.95fr",
                    gap: 60,
                    alignItems: "center",
                  }}
                  className="hero-split-grid"
                >
                  <div style={{ textAlign: "right" }}>
                    <HeroBadge />
                    <HeroTitle />
                    <HeroSubtitle />
                    <HeroCTAs />
                    <HeroSocialProof />
                  </div>
                  <div
                    className="reveal"
                    style={{
                      animationDelay: "0.3s",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <HeroAIPanel />
                  </div>
                </div>
                <style>{`
                  @media (max-width: 980px) {
                    .hero-split-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
                  }
                `}</style>
              </div>
            </section>
          );
        }

        if (variant === "grid") {
          return (
            <section
              style={{
                position: "relative",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                paddingTop: 140,
                paddingBottom: 60,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
                  backgroundSize: "48px 48px",
                  maskImage:
                    "radial-gradient(ellipse 70% 60% at 50% 40%, #000 30%, transparent 80%)",
                  WebkitMaskImage:
                    "radial-gradient(ellipse 70% 60% at 50% 40%, #000 30%, transparent 80%)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  background:
                    "radial-gradient(ellipse 35% 35% at 50% 35%, color-mix(in oklch, var(--brand) 18%, transparent), transparent 65%)",
                }}
              />

              <div
                className="container"
                style={{ position: "relative", textAlign: "center", maxWidth: 920 }}
              >
                <HeroBadge />
                <HeroTitle />
                <HeroSubtitle />
                <HeroCTAs center />
              </div>

              {/* Bottom showcase row */}
              <div className="container" style={{ position: "relative", marginTop: 80 }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: 16,
                  }}
                  className="hero-grid-stats"
                >
                  {[
                    { k: "دقائق فقط", v: "<1", sub: "لإنشاء اختبار كامل" },
                    { k: "بنك أسئلة", v: "50K+", sub: "مرتبط بالمنهج السعودي" },
                    { k: "نواتج تعلم", v: "4,200+", sub: "مغطّاة من الوزارة" },
                    { k: "دقّة AI", v: "99.2%", sub: "في توليد الأسئلة" },
                  ].map((s, i) => (
                    <div key={i} className="card" style={{ padding: 22 }}>
                      <div
                        style={{
                          fontSize: 12,
                          color: "var(--text-subtle)",
                          marginBottom: 6,
                          textAlign: "right",
                        }}
                      >
                        {s.k}
                      </div>
                      <div
                        style={{
                          fontSize: 32,
                          fontWeight: 800,
                          color: "var(--brand)",
                          letterSpacing: "-0.02em",
                          textAlign: "right",
                        }}
                      >
                        {s.v}
                      </div>
                      <div
                        style={{
                          fontSize: 13,
                          color: "var(--text-muted)",
                          marginTop: 4,
                          textAlign: "right",
                        }}
                      >
                        {s.sub}
                      </div>
                    </div>
                  ))}
                </div>
                <style>{`
                  @media (max-width: 880px) { .hero-grid-stats { grid-template-columns: repeat(2, 1fr) !important; } }
                `}</style>
              </div>
            </section>
          );
        }

        if (variant === "spotlight") {
          return (
            <section
              ref={ref}
              onMouseMove={(e) => {
                const el = ref.current;
                if (!el) return;
                const r = el.getBoundingClientRect();
                setPos({
                  x: ((e.clientX - r.left) / r.width) * 100,
                  y: ((e.clientY - r.top) / r.height) * 100,
                });
              }}
              style={{
                position: "relative",
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: 120,
                paddingBottom: 80,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  background: `radial-gradient(ellipse 600px 500px at ${pos.x}% ${pos.y}%, color-mix(in oklch, var(--brand) 28%, transparent), transparent 60%)`,
                  transition: "background 0.15s ease-out",
                }}
              />
              <div className="grid-bg" style={{ opacity: 0.5 }} />

              <div
                className="container"
                style={{ position: "relative", textAlign: "center", maxWidth: 920 }}
              >
                <HeroBadge />
                <HeroTitle />
                <HeroSubtitle />
                <HeroCTAs center />
                <HeroSocialProof center />
              </div>
            </section>
          );
        }

        if (variant === "minimal") {
          return (
            <section
              style={{
                position: "relative",
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                paddingTop: 120,
                paddingBottom: 80,
              }}
            >
              <div className="container" style={{ position: "relative", maxWidth: 980 }}>
                <HeroBadge />
                <h1
                  className="reveal"
                  style={{
                    fontSize: "clamp(48px, 8vw, 112px)",
                    fontWeight: 900,
                    letterSpacing: "-0.03em",
                    lineHeight: 0.96,
                    marginTop: 28,
                    animationDelay: "0.05s",
                    textAlign: "right",
                  }}
                >
                  اختبارات
                  <br />
                  <span style={{ color: "var(--brand)" }}>ذكية.</span>
                  <span style={{ color: "var(--text-subtle)" }}> سريعة.</span>
                  <br />
                  مُنهَجة سعودياً.
                </h1>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 60,
                    marginTop: 40,
                    alignItems: "end",
                  }}
                  className="hero-min-grid"
                >
                  <p
                    style={{
                      fontSize: 18,
                      color: "var(--text-muted)",
                      maxWidth: 480,
                      textAlign: "right",
                    }}
                  >
                    من الفكرة إلى الاختبار في أقل من دقيقة. منصة سعودية تجمع الذكاء الاصطناعي
                    مع بنك أسئلة مرتبط بالمنهج، تحليلات عميقة، وتصحيح آلي.
                  </p>
                  <HeroCTAs />
                </div>
                <HeroSocialProof />
                <style>{`
                  @media (max-width: 880px) { .hero-min-grid { grid-template-columns: 1fr !important; gap: 30px !important; } }
                `}</style>
              </div>
            </section>
          );
        }

        // Default: Aurora
        return (
          <section
            style={{
              position: "relative",
              minHeight: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: 120,
              paddingBottom: 80,
              overflow: "hidden",
            }}
          >
            {/* Aurora glow */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                background: `
                  radial-gradient(ellipse 60% 50% at 50% 0%, color-mix(in oklch, var(--brand) 22%, transparent), transparent 70%),
                  radial-gradient(ellipse 40% 35% at 30% 30%, color-mix(in oklch, var(--brand) 12%, transparent), transparent 60%),
                  radial-gradient(ellipse 40% 35% at 70% 30%, color-mix(in oklch, var(--accent) 10%, transparent), transparent 60%)
                `,
              }}
            />
            <div className="grid-bg" />

            <div
              className="container"
              style={{ position: "relative", textAlign: "center", maxWidth: 880 }}
            >
              <HeroBadge />
              <HeroTitle />
              <HeroSubtitle />
              <HeroCTAs center />
              <HeroSocialProof center />

              {/* Showcase: build your test by picking fields */}
              <div className="reveal" style={{ marginTop: 72, animationDelay: "0.4s" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    marginBottom: 24,
                    color: "var(--text-subtle)",
                    fontSize: 13,
                  }}
                >
                  <span style={{ height: 1, width: 40, background: "var(--border-strong)" }} />
                  أنشئ اختبارك باختيار الخانات
                  <span style={{ height: 1, width: 40, background: "var(--border-strong)" }} />
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 12,
                    maxWidth: 900,
                    margin: "0 auto",
                    textAlign: "right",
                  }}
                >
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      fontSize: 12,
                      fontWeight: 700,
                      color: "var(--brand)",
                      padding: "5px 12px",
                      borderRadius: 999,
                      background: "var(--brand-soft)",
                      border:
                        "1px solid color-mix(in oklch, var(--brand) 25%, transparent)",
                    }}
                  >
                    <Icon.Layers width="12" height="12" />
                    باختيار الخانات
                  </div>
                  <HeroPickPanel wide />
                </div>
              </div>
            </div>
          </section>
        );
      },
    },
    HowItWorks: {
      fields: {
        eyebrowText: { type: "text", label: "نص الشارة العلوية (Eyebrow)" },
        title: { type: "text", label: "العنوان الرئيسي" },
        subtitle: { type: "text", label: "العنوان الفرعي" },
        steps: {
          type: "array",
          label: "خطوات العمل (Steps)",
          getItemSummary: (item) => `${item.n || ""} - ${item.t || "خطوة جديدة"}`,
          arrayFields: {
            n: { type: "text", label: "رقم/رمز الخطوة (مثال: 01)" },
            t: { type: "text", label: "عنوان الخطوة" },
            d: { type: "textarea", label: "شرح الخطوة" },
            iconName: {
              type: "select",
              label: "أيقونة الخطوة",
              options: [
                { label: "تعديل / قلم", value: "Edit" },
                { label: "دماغ / ذكاء", value: "Brain" },
                { label: "طبقات / نماذج", value: "Layers" },
                { label: "مخطط بياني / إحصاء", value: "Chart" },
                { label: "كتاب / دراسة", value: "Book" },
                { label: "ساعة / وقت", value: "Clock" },
                { label: "ترس / ضبط", value: "Settings" },
                { label: "درع / أمان", value: "Shield" },
                { label: "هدف / نواتج", value: "Target" },
                { label: "برق / سرعة", value: "Zap" },
                { label: "ذكاء اصطناعي", value: "AI" },
                { label: "مستخدمين / طلاب", value: "Users" },
                { label: "درع المملكة", value: "Saudi" }
              ]
            }
          },
          defaultItemProps: {
            n: "01",
            t: "خطوة جديدة",
            d: "اكتب تفاصيل هذه الخطوة هنا.",
            iconName: "Edit"
          }
        }
      },
      defaultProps: {
        eyebrowText: "كيف يعمل",
        title: "أربع خطوات. اختبارٌ كامل.",
        subtitle: "من فكرة في رأس المعلم إلى اختبار جاهز للطلاب — مساعدُك في كل خطوة.",
        steps: [
          {
            n: "01",
            t: "صِف الاختبار",
            d: "اكتب وصفاً بالعربية، أو اختر من القوالب. حدّد المادة والصف والعدد.",
            iconName: "Edit",
          },
          {
            n: "02",
            t: "يولّد الذكاء الاصطناعي",
            d: "يُنشئ النظام الأسئلة من بنك مرتبط بالمنهج السعودي ونواتج التعلم.",
            iconName: "Brain",
          },
          {
            n: "03",
            t: "راجع وعدّل",
            d: "حرّر أي سؤال، بدّل المستوى البلومي، أو أضف نماذج (A/B) بضغطة.",
            iconName: "Layers",
          },
          {
            n: "04",
            t: "شارك وحلّل",
            d: "أرسل للطلاب، صحّح آلياً، واحصل على تحليلات الأداء فوراً.",
            iconName: "Chart",
          },
        ]
      },
      render: ({ eyebrowText, title, subtitle, steps }) => {
        const [active, setActive] = useState(0);

        const defaultSteps = [
          {
            n: "01",
            t: "صِف الاختبار",
            d: "اكتب وصفاً بالعربية، أو اختر من القوالب. حدّد المادة والصف والعدد.",
            iconName: "Edit" as const,
          },
          {
            n: "02",
            t: "يولّد الذكاء الاصطناعي",
            d: "يُنشئ النظام الأسئلة من بنك مرتبط بالمنهج السعودي ونواتج التعلم.",
            iconName: "Brain" as const,
          },
          {
            n: "03",
            t: "راجع وعدّل",
            d: "حرّر أي سؤال، بدّل المستوى البلومي، أو أضف نماذج (A/B) بضغطة.",
            iconName: "Layers" as const,
          },
          {
            n: "04",
            t: "شارك وحلّل",
            d: "أرسل للطلاب، صحّح آلياً، واحصل على تحليلات الأداء فوراً.",
            iconName: "Chart" as const,
          },
        ];

        const activeSteps = steps && steps.length > 0 ? steps : defaultSteps;

        useEffect(() => {
          if (activeSteps.length === 0) return;
          const id = setInterval(() => {
            setActive((a) => (a + 1) % activeSteps.length);
          }, 3500);
          return () => clearInterval(id);
        }, [activeSteps.length]);

        const iconMap = {
          Edit: <Icon.Edit />,
          Brain: <Icon.Brain />,
          Layers: <Icon.Layers />,
          Chart: <Icon.Chart />,
          Book: <Icon.Book />,
          Clock: <Icon.Clock />,
          Settings: <Icon.Settings />,
          Shield: <Icon.Shield />,
          Saudi: <Icon.Saudi />,
          AI: <Icon.AI />,
          Zap: <Icon.Zap />,
          Users: <Icon.Users />,
          Target: <Icon.Target />,
        };

        const eyebrow = eyebrowText || "كيف يعمل";
        const mainTitle = title || "أربع خطوات. اختبارٌ كامل.";
        const descText = subtitle || "من فكرة في رأس المعلم إلى اختبار جاهز للطلاب — مساعدُك في كل خطوة.";

        return (
          <section id="how" className="section" style={{ position: "relative" }}>
            <div className="container">
              <div className="section-head">
                <div className="eyebrow">
                  <span className="dot" />
                  {eyebrow}
                </div>
                <h2 style={{ marginTop: 16 }}>{mainTitle}</h2>
                <p>{descText}</p>
              </div>

              {activeSteps.length > 0 && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${activeSteps.length}, 1fr)`,
                    gap: 16,
                  }}
                  className="how-grid"
                >
                  {activeSteps.map((s, i) => {
                    const stepIcon = iconMap[s.iconName] || <Icon.Edit />;
                    return (
                      <button
                        key={i}
                        onClick={() => setActive(i)}
                        className="card text-right"
                        style={{
                          padding: 28,
                          position: "relative",
                          background: active === i ? "var(--bg-elev-2)" : "var(--bg-elev-1)",
                          borderColor:
                            active === i
                              ? "color-mix(in oklch, var(--brand) 40%, transparent)"
                              : "var(--border)",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          transform: active === i ? "translateY(-4px)" : "translateY(0)",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: 20,
                          }}
                        >
                          <div
                            style={{
                              width: 44,
                              height: 44,
                              borderRadius: 12,
                              background: active === i ? "var(--brand)" : "var(--bg-elev-2)",
                              color: active === i ? "var(--brand-on)" : "var(--brand)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              transition: "all 0.3s",
                            }}
                          >
                            {React.cloneElement(stepIcon, { width: 22, height: 22 })}
                          </div>
                          <div
                            style={{
                              fontSize: 13,
                              fontFamily: "monospace",
                              fontWeight: 600,
                              color: active === i ? "var(--brand)" : "var(--text-subtle)",
                              letterSpacing: "0.05em",
                            }}
                          >
                            {s.n}
                          </div>
                        </div>
                        <h3
                          style={{
                            fontSize: 19,
                            fontWeight: 700,
                            marginBottom: 8,
                            color: "var(--text)",
                          }}
                        >
                          {s.t}
                        </h3>
                        <p
                          style={{
                            fontSize: 14,
                            color: "var(--text-muted)",
                            lineHeight: 1.6,
                            textAlign: "right",
                          }}
                        >
                          {s.d}
                        </p>
                        {/* progress bar */}
                        <div
                          style={{
                            position: "absolute",
                            bottom: 0,
                            insetInlineStart: 0,
                            insetInlineEnd: 0,
                            height: 2,
                            background: "var(--border)",
                            borderBottomLeftRadius: 22,
                            borderBottomRightRadius: 22,
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              height: "100%",
                              width: active === i ? "100%" : "0%",
                              background: "var(--brand)",
                              transition: active === i ? "width 3.5s linear" : "none",
                            }}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
              <style>{`
                @media (max-width: 980px) { .how-grid { grid-template-columns: repeat(2, 1fr) !important; } }
                @media (max-width: 560px) { .how-grid { grid-template-columns: 1fr !important; } }
              `}</style>
            </div>
          </section>
        );
      },
    },
    FeatureTabs: {
      fields: {
        eyebrowText: { type: "text", label: "نص الشارة العلوية (Eyebrow)" },
        title: { type: "text", label: "العنوان الرئيسي" },
        subtitle: { type: "text", label: "العنوان الفرعي" },
        tabs: {
          type: "array",
          label: "التبويبات (Tabs)",
          getItemSummary: (item) => item.short || "تبويب جديد",
          arrayFields: {
            short: { type: "text", label: "عنوان التبويب المختصر (على شريط التبويبات)" },
            t: { type: "text", label: "عنوان اللوحة الداخلي" },
            d: { type: "textarea", label: "الوصف التفصيلي" },
            iconName: {
              type: "select",
              label: "أيقونة التبويب",
              options: [
                { label: "درع المملكة", value: "Saudi" },
                { label: "رسم بياني / تحليل", value: "Chart" },
                { label: "طبقات / مستويات", value: "Layers" },
                { label: "درع / أمان", value: "Shield" },
                { label: "علامة مرجعية / حفظ", value: "Bookmark" },
                { label: "مستخدمين / تواصل", value: "Users" },
                { label: "قلم تعديل", value: "Edit" },
                { label: "دماغ / ذكاء", value: "Brain" },
                { label: "كتاب / دراسة", value: "Book" },
                { label: "ساعة / وقت", value: "Clock" },
                { label: "ترس / ضبط", value: "Settings" },
                { label: "برق / سرعة", value: "Zap" },
                { label: "هدف / نواتج", value: "Target" }
              ]
            },
            visualName: {
              type: "select",
              label: "الشكل المرئي التفاعلي (المحاكاة البصرية)",
              options: [
                { label: "المنهج والأسئلة (Curriculum)", value: "Curriculum" },
                { label: "التحليلات والرسوم (Analytics)", value: "Analytics" },
                { label: "هرم بلوم (Bloom)", value: "Bloom" },
                { label: "التصحيح OMR (OMR)", value: "OMR" },
                { label: "القوالب الجاهزة (Templates)", value: "Templates" },
                { label: "المشاركة والتصدير (Share)", value: "Share" }
              ]
            },
            bullets: {
              type: "array",
              label: "النقاط المميزة (Bullets)",
              getItemSummary: (item) => item.value || "نقطة جديدة",
              arrayFields: {
                value: { type: "text", label: "النص" }
              },
              defaultItemProps: {
                value: "نقطة مميزة جديدة"
              }
            }
          },
          defaultItemProps: {
            short: "تبويب جديد",
            t: "ميزة جديدة مذهلة",
            d: "اكتب وصفاً تفصيلياً عن هذه الميزة هنا ليظهر للمستخدمين.",
            iconName: "Saudi",
            visualName: "Curriculum",
            bullets: [
              { value: "الخاصية الأولى المميزة" },
              { value: "الخاصية الثانية المميزة" }
            ]
          }
        }
      },
      defaultProps: {
        eyebrowText: "كل ما تحتاجه",
        title: "كل احتياجات الاختبار في مكانٍ واحد",
        subtitle: "تصفّح المزايا واحدةً واحدة — كل تبويبٍ يكشف لك كيف يعمل داخل المنصة.",
        tabs: [
          {
            short: "المنهج السعودي",
            t: "مرتبط بالمنهج السعودي",
            d: "كل اختبار مبنيٌّ على بنك أسئلة ضخم ونواتج تعلم رسمية معتمدة، مرتبطٍ مباشرةً بالمنهج السعودي ومراحله الدراسية.",
            iconName: "Saudi",
            visualName: "Curriculum",
            bullets: [
              { value: "بنك أسئلة معتمد لكل مادة" },
              { value: "نواتج تعلم رسمية ١٤٤٧هـ" },
              { value: "تغطية لكل المراحل والصفوف" }
            ]
          },
          {
            short: "تحليلات",
            t: "تحليلات عميقة",
            d: "تقارير أداء دقيقة على مستوى الطالب والفصل والمادة، تكشف نقاط القوة والضعف وتساعدك على اتخاذ قرارٍ مبنيٍّ على البيانات.",
            iconName: "Chart",
            visualName: "Analytics",
            bullets: [
              { value: "أداء على مستوى الطالب والفصل" },
              { value: "تحليل لكل مهارة ودرس" },
              { value: "تصدير التقارير ومشاركتها" }
            ]
          },
          {
            short: "مستويات بلوم",
            t: "مستويات بلوم",
            d: "تنويع تلقائي ذكي للأسئلة عبر مستويات بلوم الستة — من التذكّر حتى الإبداع — لاختبارٍ متوازنٍ يقيس الفهم الحقيقي.",
            iconName: "Layers",
            visualName: "Bloom",
            bullets: [
              { value: "توزيع متوازن للأسئلة" },
              { value: "تحكّم في نسبة كل مستوى" },
              { value: "قياس مهارات التفكير العليا" }
            ]
          },
          {
            short: "التصحيح الآلي",
            t: "تصحيح آلي + OMR",
            d: "صحّح الاختبارات الإلكترونية لحظياً، والورقية عبر الماسح الضوئي بتقنية OMR — دقّةٌ عالية ووقتٌ موفور.",
            iconName: "Shield",
            visualName: "OMR",
            bullets: [
              { value: "تصحيح أونلاين فوري" },
              { value: "مسح ضوئي OMR للورقي" },
              { value: "نتائج ودرجات تلقائية" }
            ]
          },
          {
            short: "قوالب جاهزة",
            t: "قوالب جاهزة",
            d: "مكتبة قوالب احترافية لكل المراحل والمواد، قابلة للتخصيص الكامل لتبدأ من نقطةٍ متقدمة في ثوانٍ.",
            iconName: "Bookmark",
            visualName: "Templates",
            bullets: [
              { value: "قوالب لكل مرحلة ومادة" },
              { value: "تخصيص كامل للشكل والمحتوى" },
              { value: "احفظ قوالبك الخاصة" }
            ]
          },
          {
            short: "مشاركة فورية",
            t: "مشاركة فوريّة",
            d: "أرسل الاختبار لطلابك في لحظة — عبر رابط مباشر، رمز QR، أو من داخل المنصة — دون أي تعقيد.",
            iconName: "Users",
            visualName: "Share",
            bullets: [
              { value: "رابط مباشر قابل للنسخ" },
              { value: "رمز QR للمشاركة السريعة" },
              { value: "إرسال داخل المنصة للطلاب" }
            ]
          }
        ]
      },
      render: ({ eyebrowText, title, subtitle, tabs }) => {
        const [active, setActive] = useState(0);

        const defaultTabs = [
          {
            short: "المنهج السعودي",
            t: "مرتبط بالمنهج السعودي",
            d: "كل اختبار مبنيٌّ على بنك أسئلة ضخم ونواتج تعلم رسمية معتمدة، مرتبطٍ مباشرةً بالمنهج السعودي ومراحله الدراسية.",
            iconName: "Saudi" as const,
            visualName: "Curriculum" as const,
            bullets: [
              { value: "بنك أسئلة معتمد لكل مادة" },
              { value: "نواتج تعلم رسمية ١٤٤٧هـ" },
              { value: "تغطية لكل المراحل والصفوف" }
            ]
          },
          {
            short: "تحليلات",
            t: "تحليلات عميقة",
            d: "تقارير أداء دقيقة على مستوى الطالب والفصل والمادة، تكشف نقاط القوة والضعف وتساعدك على اتخاذ قرارٍ مبنيٍّ على البيانات.",
            iconName: "Chart" as const,
            visualName: "Analytics" as const,
            bullets: [
              { value: "أداء على مستوى الطالب والفصل" },
              { value: "تحليل لكل مهارة ودرس" },
              { value: "تصدير التقارير ومشاركتها" }
            ]
          },
          {
            short: "مستويات بلوم",
            t: "مستويات بلوم",
            d: "تنويع تلقائي ذكي للأسئلة عبر مستويات بلوم الستة — من التذكّر حتى الإبداع — لاختبارٍ متوازنٍ يقيس الفهم الحقيقي.",
            iconName: "Layers" as const,
            visualName: "Bloom" as const,
            bullets: [
              { value: "توزيع متوازن للأسئلة" },
              { value: "تحكّم في نسبة كل مستوى" },
              { value: "قياس مهارات التفكير العليا" }
            ]
          },
          {
            short: "التصحيح الآلي",
            t: "تصحيح آلي + OMR",
            d: "صحّح الاختبارات الإلكترونية لحظياً، والورقية عبر الماسح الضوئي بتقنية OMR — دقّةٌ عالية ووقتٌ موفور.",
            iconName: "Shield" as const,
            visualName: "OMR" as const,
            bullets: [
              { value: "تصحيح أونلاين فوري" },
              { value: "مسح ضوئي OMR للورقي" },
              { value: "نتائج ودرجات تلقائية" }
            ]
          },
          {
            short: "قوالب جاهزة",
            t: "قوالب جاهزة",
            d: "مكتبة قوالب احترافية لكل المراحل والمواد، قابلة للتخصيص الكامل لتبدأ من نقطةٍ متقدمة في ثوانٍ.",
            iconName: "Bookmark" as const,
            visualName: "Templates" as const,
            bullets: [
              { value: "قوالب لكل مرحلة ومادة" },
              { value: "تخصيص كامل للشكل والمحتوى" },
              { value: "احفظ قوالبك الخاصة" }
            ]
          },
          {
            short: "مشاركة فورية",
            t: "مشاركة فوريّة",
            d: "أرسل الاختبار لطلابك في لحظة — عبر رابط مباشر، رمز QR، أو من داخل المنصة — دون أي تعقيد.",
            iconName: "Users" as const,
            visualName: "Share" as const,
            bullets: [
              { value: "رابط مباشر قابل للنسخ" },
              { value: "رمز QR للمشاركة السريعة" },
              { value: "إرسال داخل المنصة للطلاب" }
            ]
          }
        ];

        const activeTabsList = tabs && tabs.length > 0 ? tabs : defaultTabs;
        const currentActive = active < activeTabsList.length ? active : 0;
        const f = activeTabsList[currentActive] || activeTabsList[0];

        const iconMap = {
          Saudi: Icon.Saudi,
          Chart: Icon.Chart,
          Layers: Icon.Layers,
          Shield: Icon.Shield,
          Bookmark: Icon.Bookmark,
          Users: Icon.Users,
          Edit: Icon.Edit,
          Brain: Icon.Brain,
          Book: Icon.Book,
          Clock: Icon.Clock,
          Settings: Icon.Settings,
          AI: Icon.AI,
          Zap: Icon.Zap,
          Target: Icon.Target,
        };

        const visualMap = {
          Curriculum: VisualCurriculum,
          Analytics: VisualAnalytics,
          Bloom: VisualBloom,
          OMR: VisualOMR,
          Templates: VisualTemplates,
          Share: VisualShare,
        };

        const Visual = visualMap[f.visualName] || VisualCurriculum;
        const TabIcon = iconMap[f.iconName] || Icon.Saudi;

        const eyebrow = eyebrowText || "كل ما تحتاجه";
        const mainTitle = title || "كل احتياجات الاختبار في مكانٍ واحد";
        const descText = subtitle || "تصفّح المزايا واحدةً واحدة — كل تبويبٍ يكشف لك كيف يعمل داخل المنصة.";

        return (
          <section id="features" className="section" style={{ background: "var(--bg-elev-1)" }}>
            <div className="container">
              <div className="section-head">
                <div className="eyebrow">
                  <span className="dot" />
                  {eyebrow}
                </div>
                <h2 style={{ marginTop: 16 }}>{mainTitle}</h2>
                <p>{descText}</p>
              </div>

              {/* Tab strip */}
              <div className="ft-strip" role="tablist">
                {activeTabsList.map((tab, i) => {
                  const I = iconMap[tab.iconName] || Icon.Saudi;
                  const on = i === currentActive;
                  return (
                    <button
                      key={i}
                      role="tab"
                      aria-selected={on}
                      className={"ft-tab" + (on ? " ft-tab-on" : "")}
                      onClick={() => setActive(i)}
                    >
                      <span className="ft-tab-icon">
                        <I width="18" height="18" />
                      </span>
                      <span className="ft-tab-label">{tab.short}</span>
                    </button>
                  );
                })}
              </div>

              {/* Panel */}
              {f && (
                <div className="ft-panel card" key={currentActive}>
                  <div className="ft-panel-text" style={{ textAlign: "right" }}>
                    <div className="ft-panel-icon">
                      <TabIcon width="24" height="24" />
                    </div>
                    <h3 className="ft-panel-title">{f.t}</h3>
                    <p className="ft-panel-desc">{f.d}</p>
                    <ul className="ft-bullets">
                      {f.bullets &&
                        f.bullets.map((b, i) => {
                          const text = typeof b === "string" ? b : b.value;
                          return (
                            <li key={i} style={{ justifyContent: "flex-start" }}>
                              <span className="ft-bullet-dot">
                                <Icon.Check width="12" height="12" />
                              </span>
                              {text}
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                  <div className="ft-panel-visual">
                    <Visual />
                  </div>
                </div>
              )}
            </div>
          </section>
        );
      },
    },

    Stats: {
      fields: {
        eyebrowText: { type: "text", label: "الشارة العلوية للقسم (مثال: أرقام تتحدث)" },
        title: { type: "text", label: "العنوان الرئيسي لقسم الإحصائيات" },
        items: {
          type: "array",
          label: "عبارات الإحصائيات",
          max: 4,
          min: 4,
          getItemSummary: (item, index) => {
            const names = ["الإحصائية الأولى", "الإحصائية الثانية", "الإحصائية الثالثة", "الإحصائية الرابعة"];
            return (index !== undefined && names[index]) ? names[index] : item.label || "إحصائية جديدة";
          },
          arrayFields: {
            label: { type: "text", label: "العنوان الرئيسي" },
            sub: { type: "text", label: "الوصف الفرعي" },
          },
          defaultItemProps: {
            label: "عنوان الإحصائية",
            sub: "الوصف الفرعي للإحصائية"
          }
        }
      },
      defaultProps: {
        eyebrowText: "أرقام تتحدّث",
        title: "آلاف المعلمين يستخدمون اختباري يومياً",
        items: [
          { label: "دقّة في التوليد", sub: "نتائج مراجعة من خبراء تربويين" },
          { label: "اختبار شهرياً", sub: "يُنشَأ على اختباري" },
          { label: "معلم ومعلمة", sub: "يستخدمون المنصة يومياً" },
          { label: "مدرسة وجامعة", sub: "في المملكة العربية السعودية" },
        ]
      },
      render: ({
        eyebrowText,
        title,
        items = [],
      }) => {
        const defaultItems = [
          { label: "دقّة في التوليد", sub: "نتائج مراجعة من خبراء تربويين" },
          { label: "اختبار شهرياً", sub: "يُنشَأ على اختباري" },
          { label: "معلم ومعلمة", sub: "يستخدمون المنصة يومياً" },
          { label: "مدرسة وجامعة", sub: "في المملكة العربية السعودية" },
        ];

        const statsData = [
          { v: 98, suffix: "%" },
          { v: 120000, suffix: "+" },
          { v: 12000, suffix: "+" },
          { v: 340, suffix: "+" },
        ];

        const stats = statsData.map((data, i) => {
          const item = items[i] || defaultItems[i];
          return {
            v: data.v,
            suffix: data.suffix,
            label: item.label || defaultItems[i].label,
            sub: item.sub || defaultItems[i].sub,
          };
        });

        const eyebrow = eyebrowText || "أرقام تتحدّث";
        const mainTitle = title || "آلاف المعلمين يستخدمون اختباري يومياً";

        return (
          <section className="section">
            <div className="container">
              <div className="section-head">
                <div className="eyebrow">
                  <span className="dot" />
                  {eyebrow}
                </div>
                <h2 style={{ marginTop: 16 }}>{mainTitle}</h2>
              </div>
              <div
                style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}
                className="stats-grid"
              >
                {stats.map((s, i) => (
                  <div
                    key={i}
                    className="card"
                    style={{ padding: 32, textAlign: "center", background: "var(--bg-elev-1)" }}
                  >
                    <div
                      style={{
                        fontSize: "clamp(40px, 4.5vw, 56px)",
                        fontWeight: 900,
                        background:
                          "linear-gradient(180deg, var(--brand) 0%, var(--brand-2) 100%)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      <Counter to={s.v} suffix={s.suffix} />
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 600, marginTop: 8 }}>
                      {s.label}
                    </div>
                    <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>
                      {s.sub}
                    </div>
                  </div>
                ))}
              </div>
              <style>{`
                @media (max-width: 880px) { .stats-grid { grid-template-columns: repeat(2, 1fr) !important; } }
              `}</style>
            </div>
          </section>
        );
      },
    },

    Pricing: {
      render: () => {
        const [mode, setMode] = useState("term"); // 'term' | 'annual' | 'credits'
        const annual = mode === "annual";

        const plans = [
          {
            name: "الأساسية",
            desc: "ابدأ بخدمات بسيطة",
            monthly: 50,
            annual: 40,
            unit: "ر.س / ترم",
            quota: "100 سؤال / ترم",
            quotaExtra: "50 هللة لكل سؤال إضافي",
            cta: "اشتراكك الحالي ✓",
            ctaPrimary: true,
            features: [
              "تحضيري AI الذكي — تحضير الدروس عبر مدرستي آلياً",
              "اختبار حسب جدول المواصفات",
              "كليشة خاصة بك وبمدرستك",
              "تنوع صيغ الأسئلة",
              "تنوع أنماط التصحيح",
              "تصدير PDF أسئلة وإجابات",
              "محرر متقدم للنصوص والمعادلات",
              "التحكم بتوزيع الدرجات",
            ],
          },
          {
            name: "الاحترافية",
            desc: "تعطي احتياجاتك للتميز",
            monthly: 100,
            annual: 80,
            unit: "ر.س / ترم",
            quota: "200 سؤال / ترم",
            quotaExtra: "25 هللة لكل سؤال إضافي",
            cta: "ترقية الآن",
            ctaPrimary: true,
            popular: true,
            highlight: [
              "تحضيري AI الذكي — تحضير الدروس عبر مدرستي آلياً",
              "استيراد أسئلة من أي ورقة يرفعها المعلم",
              "استيراد أسئلة من بنك عين",
              "100 توليد بالذكاء الاصطناعي AI / ترم",
              "مقاعد طلاب مفتوحة للاختبار الإلكتروني",
            ],
            features: [
              "جميع مزايا الباقة الأساسية",
              "قياس نواتج التعلم",
              "نسختان A/B من الاختبار",
              "اختبار عن بُعد بـ QR Code",
              "تحليل النتائج الذكي",
              "نموذج التصحيح بالتظليل",
            ],
          },
          {
            name: "المدارس والجامعات",
            desc: "حسب احتياج مؤسستك",
            monthly: null,
            annual: null,
            quota: "عدد مخصص من الأسئلة",
            quotaExtra: "∞",
            cta: "تواصل معنا",
            ctaPrimary: false,
            features: [
              "تحضيري AI الذكي — تحضير الدروس عبر مدرستي آلياً",
              "جميع مزايا الاحترافية",
              "White Label (شعار المدرسة)",
              "لوحة تحكم خاصة بالمدرسة",
              "استيراد أسئلة خارجية",
              "تحكم كامل في النتائج",
            ],
          },
        ];

        return (
          <section id="pricing" className="section">
            <div className="container">
              <div className="section-head">
                <div className="eyebrow">
                  <span className="dot" />
                  الأسعار
                </div>
                <h2 style={{ marginTop: 16 }}>اختر ما يناسبك</h2>
                <p>
                  جرّب وشاهد اختبارك كاملاً قبل الدفع — طوّر متى احتجت، لا التزامات طويلة.
                </p>
              </div>

              {/* Preview Banner */}
              <div className="preview-banner-wrap">
                <span className="preview-banner-glow" aria-hidden="true" />
                <div className="preview-banner">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ flexShrink: 0 }}
                  >
                    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  <span>شاهد اختبارك كاملاً قبل الدفع</span>
                </div>
              </div>

              {/* Billing toggle */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 56,
                }}
              >
                <div style={{ position: "relative", display: "inline-flex" }}>
                  <div
                    style={{
                      display: "flex",
                      padding: 5,
                      gap: 4,
                      background: "var(--bg-elev-1)",
                      border: "1px solid var(--border)",
                      borderRadius: 12,
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setMode("term")}
                      style={{
                        padding: "8px 22px",
                        borderRadius: 8,
                        fontSize: 14,
                        fontWeight: 600,
                        background: mode === "term" ? "var(--brand)" : "transparent",
                        color: mode === "term" ? "var(--brand-on)" : "var(--text-muted)",
                        transition: "all 0.2s",
                      }}
                    >
                      دفع فصلي (ترم)
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode("annual")}
                      style={{
                        padding: "8px 22px",
                        borderRadius: 8,
                        fontSize: 14,
                        fontWeight: 600,
                        background: mode === "annual" ? "var(--brand)" : "transparent",
                        color: mode === "annual" ? "var(--brand-on)" : "var(--text-muted)",
                        transition: "all 0.2s",
                      }}
                    >
                      دفع سنوي
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode("credits")}
                      style={{
                        padding: "8px 22px",
                        borderRadius: 8,
                        fontSize: 14,
                        fontWeight: 600,
                        background: mode === "credits" ? "var(--brand)" : "transparent",
                        color:
                          mode === "credits" ? "var(--brand-on)" : "var(--text-muted)",
                        transition: "all 0.2s",
                      }}
                    >
                      شراء رصيد إضافي
                    </button>
                  </div>

                  {/* Curly Discount Arrow */}
                  <div
                    className="billing-annotation"
                    style={{
                      position: "absolute",
                      insetInlineStart: "calc(100% + 6px)",
                      top: "50%",
                      transform: "translateY(-46%)",
                      pointerEvents: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      opacity: annual ? 1 : 0.35,
                      transition: "opacity 0.25s ease",
                    }}
                  >
                    <svg
                      width="64"
                      height="46"
                      viewBox="0 0 64 46"
                      fill="none"
                      style={{
                        color: "var(--brand)",
                        transform: "scaleX(-1)",
                        marginInlineEnd: -4,
                      }}
                    >
                      <path
                        d="M4 38 C 8 22, 22 8, 44 10 C 50 11, 54 14, 56 18"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        fill="none"
                      />
                      <path
                        d="M50 12 L 56 18 L 50 24"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                    <span
                      style={{
                        fontFamily: "'Caveat', 'Comic Sans MS', cursive",
                        fontSize: 28,
                        fontWeight: 700,
                        color: "var(--brand)",
                        lineHeight: 1,
                        transform: "rotate(-6deg)",
                        whiteSpace: "nowrap",
                        textShadow:
                          "0 0 18px color-mix(in oklch, var(--brand) 35%, transparent)",
                      }}
                    >
                      خصم 20%
                    </span>
                  </div>
                </div>
              </div>

              {mode === "credits" ? (
                <CreditPacks />
              ) : (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 14,
                  }}
                  className="pricing-grid"
                >
                  {plans.map((p, i) => (
                    <div
                      key={i}
                      className="card"
                      style={{
                        padding: 28,
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        background: "var(--bg-elev-1)",
                        borderColor: p.popular
                          ? "color-mix(in oklch, var(--brand) 50%, transparent)"
                          : "var(--border)",
                        boxShadow: p.popular ? "0 30px 80px -30px var(--brand)" : "none",
                        transform: p.popular ? "scale(1.02)" : "scale(1)",
                        textAlign: "right",
                      }}
                    >
                      {p.popular && (
                        <div
                          style={{
                            position: "absolute",
                            top: -12,
                            insetInlineEnd: 24,
                            background: "var(--brand)",
                            color: "var(--brand-on)",
                            fontSize: 12,
                            fontWeight: 700,
                            padding: "4px 12px",
                            borderRadius: 999,
                          }}
                        >
                          الأكثر اختياراً
                        </div>
                      )}
                      <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>
                        {p.name}
                      </div>
                      <div
                        style={{
                          fontSize: 13,
                          color: "var(--text-muted)",
                          marginBottom: 20,
                          minHeight: 38,
                        }}
                      >
                        {p.desc}
                      </div>

                      <div
                        style={{
                          marginBottom: 20,
                          display: "flex",
                          alignItems: "baseline",
                          gap: 8,
                          justifyContent: "flex-start",
                        }}
                      >
                        {p.monthly === null ? (
                          <div style={{ fontSize: 28, fontWeight: 800 }}>
                            تواصل معنا
                          </div>
                        ) : (
                          <>
                            <div
                              style={{
                                fontSize: 56,
                                fontWeight: 900,
                                letterSpacing: "-0.03em",
                                lineHeight: 1,
                              }}
                            >
                              {annual && p.monthly > 0 ? p.annual : p.monthly}
                            </div>
                            <div style={{ fontSize: 13, color: "var(--text-muted)" }}>
                              {p.unit}
                            </div>
                          </>
                        )}
                      </div>

                      {/* Quota block */}
                      <div
                        style={{
                          padding: "14px 16px",
                          borderRadius: 12,
                          background: p.popular
                            ? "color-mix(in oklch, var(--brand) 8%, transparent)"
                            : "var(--bg-elev-2)",
                          border: `1px solid ${
                            p.popular
                              ? "color-mix(in oklch, var(--brand) 28%, transparent)"
                              : "var(--border)"
                          }`,
                          marginBottom: 14,
                        }}
                      >
                        <div
                          style={{
                            fontSize: 14,
                            fontWeight: 600,
                            color: "var(--text)",
                          }}
                        >
                          {p.quota}
                        </div>
                        {p.quotaExtra && (
                          <div
                            style={{
                              marginTop: 8,
                              paddingTop: 8,
                              borderTop: "1px dashed var(--border-strong)",
                              fontSize: 12,
                              color: "var(--brand)",
                              fontWeight: 500,
                            }}
                          >
                            {p.quotaExtra}
                          </div>
                        )}
                      </div>

                      {/* Highlight (Pro tier only) */}
                      {p.highlight && (
                        <div
                          style={{
                            padding: 14,
                            borderRadius: 12,
                            background:
                              "linear-gradient(135deg, color-mix(in oklch, var(--brand) 18%, transparent), color-mix(in oklch, var(--accent) 12%, transparent))",
                            border:
                              "1px solid color-mix(in oklch, var(--brand) 30%, transparent)",
                            marginBottom: 18,
                            display: "flex",
                            flexDirection: "column",
                            gap: 8,
                          }}
                        >
                          {p.highlight.map((h, j) => (
                            <div
                              key={j}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                fontSize: 12.5,
                                fontWeight: 500,
                              }}
                            >
                              <Icon.Sparkles
                                width="14"
                                height="14"
                                style={{ color: "var(--brand)", flexShrink: 0 }}
                              />
                              <span>{h}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 10,
                          marginBottom: 22,
                          flex: 1,
                        }}
                      >
                        {p.features.map((f, j) => (
                          <div
                            key={j}
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: 10,
                              fontSize: 13.5,
                              lineHeight: 1.45,
                              justifyContent: "flex-start",
                            }}
                          >
                            <Icon.CheckCircle
                              width="16"
                              height="16"
                              style={{
                                color: "var(--brand)",
                                flexShrink: 0,
                                marginTop: 3,
                              }}
                            />
                            <span style={{ color: "var(--text)" }}>{f}</span>
                          </div>
                        ))}
                      </div>

                      <button
                        className={p.ctaPrimary ? "btn btn-primary" : "btn btn-ghost"}
                        style={{ width: "100%", justifyContent: "center" }}
                      >
                        {p.cta}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        );
      },
    },
    FinalCTA: {
      fields: {
        title: { type: "text", label: "العنوان الرئيسي" },
        titleAccent: { type: "text", label: "العنوان الرئيسي الملون (بالأخضر)" },
        titleSuffix: { type: "text", label: "تتمة العنوان الرئيسي" },
        subtitle: { type: "textarea", label: "العنوان الفرعي" },
        ctas: {
          type: "array",
          label: "أزرار الإجراءات (CTAs)",
          getItemSummary: (item) => item.label || "زر جديد",
          arrayFields: {
            label: { type: "text", label: "نص الزر" },
            href: { type: "text", label: "الرابط (URL)" },
            variant: {
              type: "select",
              label: "نوع الزر",
              options: [
                { label: "زر رئيسي (ملون)", value: "primary" },
                { label: "زر ثانوي (شفاف)", value: "ghost" }
              ]
            }
          },
          defaultItemProps: {
            label: "زر جديد",
            href: "#",
            variant: "primary"
          }
        },
        features: {
          type: "array",
          label: "مميزات إضافية (أيقونات صح خضراء)",
          getItemSummary: (item) => item.value || "ميزة جديدة",
          arrayFields: {
            value: { type: "text", label: "نص الميزة" }
          },
          defaultItemProps: {
            value: "ميزة جديدة"
          }
        }
      },
      defaultProps: {
        title: "جاهز لتختصر وقتك و",
        titleAccent: "تطوّر طريقتك",
        titleSuffix: " في الاختبارات؟",
        subtitle: "ابدأ مجاناً اليوم. لا حاجة لبطاقة ائتمان — ٥ اختبارات شهرياً للأبد.",
        ctas: [
          { label: "ابدأ مجاناً الآن", href: "#", variant: "primary" },
          { label: "تحدّث مع المبيعات", href: "#", variant: "ghost" }
        ],
        features: [
          { value: "مجاني للأبد" },
          { value: "دعم بالعربية" },
          { value: "مستضاف في السعودية" }
        ]
      },
      render: ({
        title,
        titleAccent,
        titleSuffix,
        subtitle,
        ctas = [],
        features = [],
      }) => {
        const displayTitle = title !== undefined ? title : "جاهز لتختصر وقتك و";
        const displayAccent = titleAccent !== undefined ? titleAccent : "تطوّر طريقتك";
        const displaySuffix = titleSuffix !== undefined ? titleSuffix : " في الاختبارات؟";
        const displaySubtitle = subtitle !== undefined ? subtitle : "ابدأ مجاناً اليوم. لا حاجة لبطاقة ائتمان — ٥ اختبارات شهرياً للأبد.";

        const defaultCtas = [
          { label: "ابدأ مجاناً الآن", href: "#", variant: "primary" },
          { label: "تحدّث مع المبيعات", href: "#", variant: "ghost" }
        ] as const;

        const displayCtas = ctas.length > 0 ? ctas : defaultCtas;

        const defaultFeatures = [
          { value: "مجاني للأبد" },
          { value: "دعم بالعربية" },
          { value: "مستضاف في السعودية" }
        ];

        const displayFeatures = features.length > 0 ? features : defaultFeatures;

        return (
          <section
            id="cta"
            className="section"
            style={{ position: "relative", overflow: "hidden" }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                background:
                  "radial-gradient(ellipse 60% 80% at 50% 100%, color-mix(in oklch, var(--brand) 22%, transparent), transparent 65%)",
              }}
            />
            <div
              className="container"
              style={{ position: "relative", textAlign: "center", maxWidth: 760 }}
            >
              <h2
                style={{
                  fontSize: "clamp(36px, 5vw, 60px)",
                  fontWeight: 900,
                  letterSpacing: "-0.02em",
                }}
              >
                {displayTitle}
                <br />
                <span style={{ color: "var(--brand)" }}>{displayAccent}</span>
                {displaySuffix}
              </h2>
              <p style={{ fontSize: 18, color: "var(--text-muted)", marginTop: 20 }}>
                {displaySubtitle}
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  marginTop: 32,
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                {displayCtas.map((cta, i) => {
                  const isPrimary = cta.variant === "primary";
                  const btnClass = isPrimary ? "btn btn-primary btn-lg" : "btn btn-ghost btn-lg";
                  return (
                    <a key={i} href={cta.href} className={btnClass}>
                      {cta.label}
                      {isPrimary && <Icon.ArrowLeft width="18" height="18" />}
                    </a>
                  );
                })}
              </div>
              <div
                style={{
                  marginTop: 24,
                  display: "flex",
                  justifyContent: "center",
                  gap: 24,
                  flexWrap: "wrap",
                  fontSize: 13,
                  color: "var(--text-subtle)",
                }}
              >
                {displayFeatures.map((feat, i) => (
                  <span key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Icon.Check width="14" height="14" style={{ color: "var(--brand)" }} />
                    {feat.value}
                  </span>
                ))}
              </div>
            </div>
          </section>
        );
      },
    },
    Footer: {
      fields: {
        description: { type: "textarea", label: "الوصف التعريفي للشركة" },
        twitterUrl: { type: "text", label: "رابط تويتر (X)" },
        instagramUrl: { type: "text", label: "رابط إنستقرام" },
        col1Title: { type: "text", label: "عنوان القسم الأول" },
        col1Links: {
          type: "array",
          label: "روابط القسم الأول",
          getItemSummary: (item) => item.label || "رابط جديد",
          arrayFields: {
            label: { type: "text", label: "اسم الرابط" },
            href: { type: "text", label: "الرابط (URL)" }
          },
          defaultItemProps: {
            label: "رابط جديد",
            href: "#"
          }
        },
        col2Title: { type: "text", label: "عنوان القسم الثاني" },
        col2Links: {
          type: "array",
          label: "روابط القسم الثاني",
          getItemSummary: (item) => item.label || "رابط جديد",
          arrayFields: {
            label: { type: "text", label: "اسم الرابط" },
            href: { type: "text", label: "الرابط (URL)" }
          },
          defaultItemProps: {
            label: "رابط جديد",
            href: "#"
          }
        },
        col3Title: { type: "text", label: "عنوان القسم الثالث" },
        col3Links: {
          type: "array",
          label: "روابط القسم الثالث",
          getItemSummary: (item) => item.label || "رابط جديد",
          arrayFields: {
            label: { type: "text", label: "اسم الرابط" },
            href: { type: "text", label: "الرابط (URL)" }
          },
          defaultItemProps: {
            label: "رابط جديد",
            href: "#"
          }
        },
        col4Title: { type: "text", label: "عنوان القسم الرابع" },
        col4Links: {
          type: "array",
          label: "روابط القسم الرابع",
          getItemSummary: (item) => item.label || "رابط جديد",
          arrayFields: {
            label: { type: "text", label: "اسم الرابط" },
            href: { type: "text", label: "الرابط (URL)" }
          },
          defaultItemProps: {
            label: "رابط جديد",
            href: "#"
          }
        },
        copyrightText: { type: "text", label: "نص الحقوق السفلي" },
        statusText: { type: "text", label: "حالة النظام / النص السفلي الأيسر" }
      },
      defaultProps: {
        description: "منصة سعودية مدعومة بالذكاء الاصطناعي لإنشاء وإدارة الاختبارات، مرتبطة بالمنهج السعودي.",
        twitterUrl: "https://x.com/examyai",
        instagramUrl: "https://www.instagram.com/examy.ai/",
        col1Title: "المنتج",
        col1Links: [
          { label: "الميزات", href: "#" },
          { label: "كيف يعمل", href: "#" },
          { label: "القوالب الجاهزة", href: "#" }
        ],
        col2Title: "لمن",
        col2Links: [
          { label: "للمعلمين", href: "#" },
          { label: "للمدارس", href: "#" },
          { label: "للجامعات", href: "#" },
          { label: "للجهات التعليمية", href: "#" }
        ],
        col3Title: "موارد",
        col3Links: [
          { label: "مركز المساعدة", href: "#" },
          { label: "المدوّنة", href: "#" },
          { label: "عن اختباري", href: "#" },
          { label: "تواصل معنا", href: "#" }
        ],
        col4Title: "الشركة",
        col4Links: [
          { label: "سياسة الخصوصية", href: "#" },
          { label: "الشروط والأحكام", href: "#" }
        ],
        copyrightText: "© ٢٠٢٦ اختباري · Examy. صُنع بحبٍّ في المملكة العربية السعودية 🇸🇦",
        statusText: "توليد ذكي وموثوق"
      },
      render: ({
        description,
        twitterUrl,
        instagramUrl,
        col1Title,
        col1Links = [],
        col2Title,
        col2Links = [],
        col3Title,
        col3Links = [],
        col4Title,
        col4Links = [],
        copyrightText,
        statusText,
      }) => {
        const displayDesc = description !== undefined ? description : "منصة سعودية مدعومة بالذكاء الاصطناعي لإنشاء وإدارة الاختبارات، مرتبطة بالمنهج السعودي.";
        const displayTwitter = twitterUrl !== undefined ? twitterUrl : "https://x.com/examyai";
        const displayInstagram = instagramUrl !== undefined ? instagramUrl : "https://www.instagram.com/examy.ai/";

        const displayCol1Title = col1Title !== undefined ? col1Title : "المنتج";
        const defaultCol1Links = [
          { label: "الميزات", href: "#" },
          { label: "كيف يعمل", href: "#" },
          { label: "القوالب الجاهزة", href: "#" }
        ];
        const displayCol1Links = col1Links.length > 0 ? col1Links : defaultCol1Links;

        const displayCol2Title = col2Title !== undefined ? col2Title : "لمن";
        const defaultCol2Links = [
          { label: "للمعلمين", href: "#" },
          { label: "للمدارس", href: "#" },
          { label: "للجامعات", href: "#" },
          { label: "للجهات التعليمية", href: "#" }
        ];
        const displayCol2Links = col2Links.length > 0 ? col2Links : defaultCol2Links;

        const displayCol3Title = col3Title !== undefined ? col3Title : "موارد";
        const defaultCol3Links = [
          { label: "مركز المساعدة", href: "#" },
          { label: "المدوّنة", href: "#" },
          { label: "عن اختباري", href: "#" },
          { label: "تواصل معنا", href: "#" }
        ];
        const displayCol3Links = col3Links.length > 0 ? col3Links : defaultCol3Links;

        const displayCol4Title = col4Title !== undefined ? col4Title : "الشركة";
        const defaultCol4Links = [
          { label: "سياسة الخصوصية", href: "#" },
          { label: "الشروط والأحكام", href: "#" }
        ];
        const displayCol4Links = col4Links.length > 0 ? col4Links : defaultCol4Links;

        const displayCopyright = copyrightText !== undefined ? copyrightText : "© ٢٠٢٦ اختباري · Examy. صُنع بحبٍّ في المملكة العربية السعودية 🇸🇦";
        const displayStatus = statusText !== undefined ? statusText : "توليد ذكي وموثوق";

        const cols = [
          { h: displayCol1Title, links: displayCol1Links },
          { h: displayCol2Title, links: displayCol2Links },
          { h: displayCol3Title, links: displayCol3Links },
          { h: displayCol4Title, links: displayCol4Links },
        ];

        return (
          <footer
            style={{
              borderTop: "1px solid var(--border)",
              background: "var(--bg-elev-1)",
              paddingTop: 64,
              paddingBottom: 32,
            }}
          >
            <div className="container">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.4fr repeat(4, 1fr)",
                  gap: 40,
                  marginBottom: 56,
                }}
                className="footer-grid"
              >
                <div style={{ textAlign: "right" }}>
                  <Logo size={40} />
                  <p
                    style={{
                      fontSize: 14,
                      color: "var(--text-muted)",
                      marginTop: 18,
                      lineHeight: 1.7,
                      maxWidth: 320,
                    }}
                  >
                    {displayDesc}
                  </p>
                  <div style={{ display: "flex", gap: 8, marginTop: 22, direction: "rtl" }}>
                    {displayTwitter && (
                      <a
                        href={displayTwitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          width: 38,
                          height: 38,
                          borderRadius: 10,
                          background: "var(--bg-elev-2)",
                          border: "1px solid var(--border)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "var(--text-muted)",
                          transition: "all 0.15s ease",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--brand)")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      </a>
                    )}
                    {displayInstagram && (
                      <a
                        href={displayInstagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          width: 38,
                          height: 38,
                          borderRadius: 10,
                          background: "var(--bg-elev-2)",
                          border: "1px solid var(--border)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "var(--text-muted)",
                          transition: "all 0.15s ease",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--brand)")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                          <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>

                {cols.map((c, i) => (
                  <div key={i} style={{ textAlign: "right" }}>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        marginBottom: 16,
                        color: "var(--text)",
                      }}
                    >
                      {c.h}
                    </div>
                    <ul
                      style={{
                        listStyle: "none",
                        padding: 0,
                        margin: 0,
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                      }}
                    >
                      {c.links.map((linkItem, idx) => (
                        <li key={idx}>
                          <a
                            href={linkItem.href || "#"}
                            style={{ fontSize: 14, color: "var(--text-muted)", transition: "all 0.15s ease" }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.color = "var(--text-muted)")
                            }
                          >
                            {linkItem.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div
                style={{
                  paddingTop: 24,
                  borderTop: "1px solid var(--border)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 16,
                  fontSize: 13,
                  color: "var(--text-subtle)",
                }}
              >
                <div>
                  {displayCopyright}
                </div>
                <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
                  <a href="#" style={{ fontSize: 13, color: "var(--text-subtle)" }}>English</a>
                  <a href="#" style={{ fontSize: 13, color: "var(--text-subtle)" }}>العربية</a>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "var(--brand)",
                      }}
                    />
                    {displayStatus}
                  </span>
                </div>
              </div>
            </div>
            <style>{`
              @media (max-width: 980px) {
                .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 30px !important; }
              }
              @media (max-width: 560px) {
                .footer-grid { grid-template-columns: 1fr !important; }
              }
            `}</style>
          </footer>
        );
      },
    },
    FAQ: {
      fields: {
        title: { type: "text", label: "عنوان قسم الأسئلة" },
        subtitle: { type: "textarea", label: "الوصف الفرعي" },
        categories: {
          type: "array",
          label: "التصنيفات والأسئلة",
          getItemSummary: (item) => item.label || "تصنيف جديد",
          arrayFields: {
            label: { type: "text", label: "اسم التصنيف" },
            iconName: {
              type: "select",
              label: "الأيقونة",
              options: [
                { label: "عام (عن اختباري)", value: "general" },
                { label: "إنشاء الاختبارات", value: "creation" },
                { label: "التخصيص والإخراج", value: "customization" },
                { label: "التصحيح والتحليلات", value: "grading" },
                { label: "الأسعار والبدء", value: "pricing" }
              ]
            },
            items: {
              type: "array",
              label: "قائمة الأسئلة",
              getItemSummary: (qItem) => qItem.q || "سؤال جديد",
              arrayFields: {
                q: { type: "text", label: "السؤال" },
                a: { type: "textarea", label: "الإجابة" },
                list: {
                  type: "array",
                  label: "قائمة نقاط إضافية (اختياري)",
                  getItemSummary: (li) => li.value || "نقطة جديدة",
                  arrayFields: {
                    value: { type: "text", label: "النص" }
                  },
                  defaultItemProps: {
                    value: "نقطة جديدة"
                  }
                }
              },
              defaultItemProps: {
                q: "سؤال جديد؟",
                a: "إجابة هذا السؤال..."
              }
            }
          },
          defaultItemProps: {
            label: "تصنيف جديد",
            iconName: "general",
            items: [
              { q: "سؤال جديد؟", a: "إجابة هذا السؤال..." }
            ]
          }
        }
      },
      defaultProps: {
        title: "كل ما تريد معرفته عن اختباري",
        subtitle: "جمعنا أكثر أسئلة المعلمين والمعلمات تكرارًا حول إنشاء الاختبارات، التصحيح، التخصيص، والأسعار. لم تجد إجابتك؟ فريقنا جاهز لمساعدتك.",
        categories: [
          {
            label: "عن اختباري",
            iconName: "general",
            items: [
              { q: "ما هي منصة اختباري؟", a: "اختباري منصة ذكاء اصطناعي تساعد المعلمين والمعلمات على إنشاء الاختبارات وأوراق العمل خلال أقل من دقيقة، وفق المنهج السعودي، مع إمكانية تخصيص الاختبار وإخراجه بصيغة PDF جاهزة للطباعة." },
              { q: "هل أحتاج إلى خبرة تقنية لاستخدام المنصة؟", a: "لا. صُممت المنصة لتكون سهلة الاستخدام، ويمكن لأي معلم إنشاء اختبار خلال خطوات بسيطة دون أي خلفية تقنية." },
              { q: "هل يمكن استخدام المنصة من الجوال؟", a: "نعم. تعمل المنصة على الجوال والأجهزة اللوحية وأجهزة الكمبيوتر بكفاءة." },
              { q: "هل الذكاء الاصطناعي يغني عن دور المعلم؟", a: "لا. اختباري أداة تساعد المعلم وتختصر الوقت، بينما يبقى المعلم صاحب القرار النهائي في اختيار وتعديل واعتماد الأسئلة." }
            ]
          },
          {
            label: "إنشاء الاختبارات",
            iconName: "creation",
            items: [
              { q: "هل الأسئلة متوافقة مع المنهج السعودي؟", a: "نعم. يتم إنشاء الأسئلة بناءً على المنهج السعودي والدروس التي يحددها المعلم، مع مراعاة نواتج التعلم ومستويات الصعوبة المختلفة." },
              { q: "كم يستغرق إنشاء اختبار؟", a: "غالبًا أقل من دقيقة واحدة، حسب عدد الأسئلة والإعدادات المختارة." },
              { q: "هل يمكنني اختيار عدد الأسئلة؟", a: "نعم. يمكنك تحديد عدد الأسئلة المناسب لاحتياجك قبل إنشاء الاختبار." },
              { q: "ما أنواع الأسئلة التي تدعمها المنصة؟", a: "تدعم المنصة أنواعًا متعددة من الأسئلة تقابل مختلف أنماط التقويم:", list: [{ value: "الاختيار من متعدد" }, { value: "الصح والخطأ" }, { value: "أكمل الفراغ" }, { value: "المزاوجة (صل)" }, { value: "علِّل" }, { value: "الاستنتاج" }, { value: "الأسئلة المقالية" }, { value: "وغيرها من الأنماط التعليمية" }] },
              { q: "هل يمكن تعديل الأسئلة بعد إنشائها؟", a: "نعم. يمكنك تعديل الأسئلة أو حذفها أو إضافة أسئلة جديدة بسهولة قبل تصدير الاختبار." },
              { q: "هل توفر المنصة نموذج إجابة؟", a: "نعم. يتم إنشاء نموذج إجابة تلقائي مع كل اختبار." },
              { q: "هل يمكن إنشاء أكثر من نموذج للاختبار؟", a: "نعم. يمكنك إنشاء نماذج متعددة (A/B) لتقليل فرص الغش داخل الفصل." },
              { q: "هل الأسئلة مكررة أو منسوخة؟", a: "لا. يتم توليد الأسئلة ديناميكيًا وفق المعايير التعليمية والدروس المختارة، مع إمكانية إعادة التوليد للحصول على نماذج جديدة." },
              { q: "هل تدعم المنصة جميع المواد الدراسية؟", a: "نعم. تدعم معظم المواد الدراسية لجميع المراحل التعليمية وفق المناهج السعودية." },
              { q: "هل يمكن إنشاء أوراق عمل وليس اختبارات فقط؟", a: "نعم. يمكنك إنشاء أنواعًا متعددة من المحتوى التعليمي:", list: [{ value: "أوراق عمل" }, { value: "واجبات" }, { value: "تدريبات صفية" }, { value: "اختبارات قصيرة" }, { value: "اختبارات نهائية" }] }
            ]
          },
          {
            label: "التخصيص والإخراج",
            iconName: "customization",
            items: [
              { q: "هل يمكن إضافة شعار المدرسة وبياناتها؟", a: "نعم. يمكنك تخصيص ترويسة الاختبار لتشمل بيانات مدرستك بالكامل:", list: [{ value: "شعار المدرسة" }, { value: "اسم المدرسة" }, { value: "اسم المعلم" }, { value: "اسم المدير" }, { value: "الفصل الدراسي" }, { value: "المادة الدراسية" }] },
              { q: "هل يمكن طباعة الاختبار مباشرة؟", a: "نعم. يتم تصدير الاختبار بصيغة PDF جاهزة للطباعة مباشرة." },
              { q: "هل تحفظ المنصة الاختبارات السابقة؟", a: "نعم. يتم حفظ اختباراتك داخل حسابك للرجوع إليها أو تعديلها لاحقًا." },
              { q: "هل يمكن مشاركة الاختبار إلكترونيًا؟", a: "نعم. يمكن مشاركة الاختبار إلكترونيًا مع الطلاب عبر رابط أو رمز QR بحسب نوع الاختبار." }
            ]
          },
          {
            label: "التصحيح والتحليلات",
            iconName: "grading",
            items: [
              { q: "هل توفر المنصة تصحيحًا آليًا للاختبارات؟", a: "نعم. تدعم المنصة الاختبارات الإلكترونية مع التصحيح الآلي وإظهار النتائج مباشرة." },
              { q: "هل تقدم المنصة تحليلات لنتائج الطلاب؟", a: "في الباقات المتقدمة توفر المنصة تحليلات تعليمية متكاملة:", list: [{ value: "تحليل أداء الطلاب" }, { value: "قياس نواتج التعلم" }, { value: "تحديد نقاط القوة والضعف" }, { value: "اقتراح خطط علاجية" }] },
              { q: "هل يمكن الاعتماد على اختباري في الاختبارات الرسمية؟", a: "نعم. يستخدم آلاف المعلمين المنصة لإنشاء اختباراتهم وأوراق عملهم اليومية والفصلية، مع إمكانية مراجعة وتعديل جميع الأسئلة قبل اعتمادها." },
              { q: "كم ساعة يمكن أن توفر عليّ المنصة؟", a: "يستطيع المعلم توفير عشرات الساعات خلال الفصل الدراسي عبر أتمتة إنشاء الاختبارات ونماذج الإجابة والتقارير التعليمية." }
            ]
          },
          {
            label: "الأسعار والبدء",
            iconName: "pricing",
            items: [
              { q: "هل توجد نسخة مجانية؟", a: "نعم. توفر المنصة باقة مجانية تتيح تجربة إنشاء أوراق العمل والاختبارات بحدود معينة." },
              { q: "كيف أبدأ باستخدام اختباري؟", a: "أنشئ حسابك مجانًا وابدأ في إنشاء أول اختبار خلال دقائق عبر الموقع: examy.ai" }
            ]
          }
        ]
      },
      render: ({ title, subtitle, categories = [] }) => {
        const [expanded, setExpanded] = useState<Record<string, boolean>>({});

        const toggle = (q: string) => {
          setExpanded((prev) => ({ ...prev, [q]: !prev[q] }));
        };

        const renderIcon = (iconName: string) => {
          const props = { width: 18, height: 18, style: { color: "var(--brand)" } };
          switch (iconName) {
            case "general":
              return <Icon.Book {...props} />;
            case "creation":
              return <Icon.Bolt {...props} />;
            case "customization":
              return <Icon.Settings {...props} />;
            case "grading":
              return <Icon.Chart {...props} />;
            case "pricing":
              return <Icon.Target {...props} />;
            default:
              return <Icon.Book {...props} />;
          }
        };

        const displayTitle = title !== undefined ? title : "كل ما تريد معرفته عن اختباري";
        const displaySubtitle = subtitle !== undefined ? subtitle : "جمعنا أكثر أسئلة المعلمين والمعلمات تكرارًا حول إنشاء الاختبارات، التصحيح، التخصيص، والأسعار. لم تجد إجابتك؟ فريقنا جاهز لمساعدتك.";

        return (
          <section className="section" style={{ direction: "rtl", textAlign: "right", position: "relative" }}>
            <div className="container" style={{ maxWidth: 880 }}>
              <div style={{ textAlign: "center", marginBottom: 48 }}>
                <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800 }}>{displayTitle}</h2>
                {displaySubtitle && (
                  <p style={{ color: "var(--text-muted)", marginTop: 12, fontSize: 15, lineHeight: 1.6 }}>
                    {displaySubtitle}
                  </p>
                )}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                {categories.map((cat, i) => (
                  <div key={i} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        borderBottom: "1px solid var(--border)",
                        paddingBottom: 8,
                      }}
                    >
                      <span
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 8,
                          background: "var(--brand-soft)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {renderIcon(cat.iconName)}
                      </span>
                      <h3 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>{cat.label}</h3>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {(cat.items || []).map((item, idx) => {
                        const isOpen = !!expanded[item.q];
                        return (
                          <div
                            key={idx}
                            style={{
                              background: "var(--bg-elev-1)",
                              border: "1px solid " + (isOpen ? "rgba(0, 224, 138, 0.35)" : "var(--border)"),
                              borderRadius: 12,
                              overflow: "hidden",
                              transition: "all 0.2s ease",
                            }}
                          >
                            <button
                              onClick={() => toggle(item.q)}
                              style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "16px 20px",
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                color: "inherit",
                                fontFamily: "inherit",
                                textAlign: "right",
                              }}
                            >
                              <span style={{ fontSize: 15, fontWeight: 600, flex: 1, paddingLeft: 16 }}>{item.q}</span>
                              <span
                                style={{
                                  width: 24,
                                  height: 24,
                                  borderRadius: "50%",
                                  background: "var(--brand-soft)",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  color: "var(--brand)",
                                  transform: isOpen ? "rotate(45deg)" : "none",
                                  transition: "transform 0.2s ease",
                                }}
                              >
                                +
                              </span>
                            </button>

                            {isOpen && (
                              <div
                                style={{
                                  padding: "0 20px 20px",
                                  borderTop: "1px solid var(--border)",
                                  paddingTop: 16,
                                  color: "var(--text-muted)",
                                  fontSize: 14.5,
                                  lineHeight: 1.6,
                                }}
                              >
                                <p style={{ margin: 0 }}>{item.a}</p>
                                {item.list && item.list.length > 0 && (
                                  <ul
                                    style={{
                                      paddingRight: 20,
                                      marginTop: 10,
                                      listStyleType: "circle",
                                      display: "flex",
                                      flexDirection: "column",
                                      gap: 6,
                                    }}
                                  >
                                    {item.list.map((li, k) => (
                                      <li key={k}>{li.value}</li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      },
    },
  },
};

/* ────────────────────────────────────────────────────────────────────────
   Showcase Subsections
   ──────────────────────────────────────────────────────────────────────── */

const ShowcaseBuild = () => (
  <div
    style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 14, minHeight: 460 }}
    className="sc-grid"
  >
    {/* Sidebar */}
    <aside
      style={{
        background: "var(--bg-elev-2)",
        borderRadius: 14,
        padding: 16,
        border: "1px solid var(--border)",
        textAlign: "right",
      }}
    >
      <div
        style={{
          fontSize: 12,
          color: "var(--text-subtle)",
          fontWeight: 600,
          marginBottom: 12,
          letterSpacing: "0.02em",
        }}
      >
        اختباراتي
      </div>
      {[
        { t: "رياضيات · الجبر", d: "الصف الثالث متوسط", active: true },
        { t: "علوم · الكيمياء", d: "الأول ثانوي" },
        { t: "لغة عربية · النحو", d: "السادس ابتدائي" },
        { t: "فيزياء · الميكانيكا", d: "الثاني ثانوي" },
      ].map((e, i) => (
        <div
          key={i}
          style={{
            padding: 12,
            borderRadius: 10,
            marginBottom: 6,
            background: e.active ? "var(--brand-soft)" : "transparent",
            border: e.active
              ? "1px solid color-mix(in oklch, var(--brand) 30%, transparent)"
              : "1px solid transparent",
            cursor: "pointer",
            textAlign: "right",
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: e.active ? "var(--brand)" : "var(--text)",
            }}
          >
            {e.t}
          </div>
          <div style={{ fontSize: 11, color: "var(--text-subtle)", marginTop: 2 }}>
            {e.d}
          </div>
        </div>
      ))}
      <button
        className="btn btn-ghost"
        style={{
          width: "100%",
          marginTop: 12,
          justifyContent: "center",
          padding: "10px",
          fontSize: 13,
        }}
      >
        <Icon.Plus width="14" height="14" /> اختبار جديد
      </button>
    </aside>

    {/* Main */}
    <div
      style={{
        background: "var(--bg-elev-2)",
        borderRadius: 14,
        padding: 22,
        border: "1px solid var(--border)",
        textAlign: "right",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 16,
          justifyContent: "flex-start",
        }}
      >
        <Icon.Sparkles width="22" height="22" style={{ color: "var(--brand)" }} />
        <h3 style={{ fontSize: 18, fontWeight: 700 }}>إنشاء بالذكاء الاصطناعي</h3>
      </div>

      <div
        style={{
          background: "var(--bg)",
          border: "1px solid var(--border)",
          borderRadius: 12,
          padding: 16,
          fontSize: 14,
          lineHeight: 1.8,
          marginBottom: 16,
          textAlign: "right",
        }}
      >
        أنشئ اختبار <strong style={{ color: "var(--brand)" }}>الجبر</strong> للصف الثالث
        متوسط،
        <strong style={{ color: "var(--brand)" }}> 15 سؤالاً</strong>، تنويع: 8 اختيار من
        متعدد، 4 صح/خطأ، 3 مقالي قصير. مستويات بلوم: تطبيق وتحليل بشكل أساسي.
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 10,
          marginBottom: 16,
        }}
      >
        {[
          { k: "الصف", v: "الثالث متوسط" },
          { k: "الزمن المقترح", v: "45 دقيقة" },
          { k: "الدرجة الكلية", v: "30 درجة" },
        ].map((m, i) => (
          <div
            key={i}
            style={{
              background: "var(--bg)",
              border: "1px solid var(--border)",
              borderRadius: 10,
              padding: 12,
              textAlign: "right",
            }}
          >
            <div style={{ fontSize: 11, color: "var(--text-subtle)" }}>{m.k}</div>
            <div style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }}>{m.v}</div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          marginBottom: 16,
          direction: "rtl",
        }}
      >
        {["الجبر", "المعادلات", "بلوم: تطبيق", "بلوم: تحليل", "وقت قصير"].map((c, i) => (
          <div
            key={i}
            style={{
              fontSize: 12,
              padding: "6px 10px",
              borderRadius: 8,
              background: "var(--bg)",
              border: "1px solid var(--border)",
              color: "var(--text-muted)",
              fontWeight: 500,
            }}
          >
            {c}
          </div>
        ))}
      </div>

      <button
        className="btn btn-primary"
        style={{ width: "100%", justifyContent: "center" }}
      >
        <Icon.Bolt width="16" height="16" /> توليد الاختبار · 8 ثوانٍ
      </button>
    </div>
    <style>{`
      @media (max-width: 760px) { .sc-grid { grid-template-columns: 1fr !important; } }
    `}</style>
  </div>
);

const ShowcaseReview = () => (
  <div style={{ padding: 22, textAlign: "right" }}>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 18,
        flexWrap: "wrap",
        gap: 12,
      }}
    >
      <div>
        <h3 style={{ fontSize: 18, fontWeight: 700 }}>اختبار الجبر · الثالث متوسط</h3>
        <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>
          15 سؤال · 30 درجة · جاهز للمشاركة
        </div>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button className="btn btn-ghost" style={{ padding: "8px 14px", fontSize: 13 }}>
          نموذج B
        </button>
        <button className="btn btn-primary" style={{ padding: "8px 14px", fontSize: 13 }}>
          مشاركة
        </button>
      </div>
    </div>

    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {[
        {
          n: 1,
          q: "ما حلّ المعادلة: 2س + 5 = 13؟",
          type: "اختيار من متعدد",
          level: "تطبيق",
          opts: ["س = 3", "س = 4", "س = 5", "س = 6"],
          correct: 1,
        },
        {
          n: 2,
          q: "إذا كانت ص = 3س - 2، أوجد قيمة ص عندما س = 4.",
          type: "إجابة قصيرة",
          level: "تطبيق",
        },
        { n: 3, q: "حلّل: س² - 9 = 0", type: "مقالي", level: "تحليل" },
      ].map((q, i) => (
        <div
          key={i}
          style={{
            background: "var(--bg-elev-2)",
            border: "1px solid var(--border)",
            borderRadius: 12,
            padding: 16,
            textAlign: "right",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 12,
              marginBottom: q.opts ? 12 : 0,
              justifyContent: "flex-start",
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                background: "var(--brand-soft)",
                color: "var(--brand)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {q.n}
            </div>
            <div style={{ flex: 1, textAlign: "right" }}>
              <div style={{ fontSize: 15, fontWeight: 500, fontStyle: "normal", marginBottom: 6 }}>{q.q}</div>
              <div style={{ display: "flex", gap: 8, justifyContent: "flex-start" }}>
                <span
                  style={{
                    fontSize: 11,
                    padding: "3px 8px",
                    borderRadius: 6,
                    background: "var(--bg)",
                    color: "var(--text-muted)",
                  }}
                >
                  {q.type}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    padding: "3px 8px",
                    borderRadius: 6,
                    background: "var(--brand-soft)",
                    color: "var(--brand)",
                  }}
                >
                  بلوم: {q.level}
                </span>
              </div>
            </div>
          </div>
          {q.opts && (
            <div
              style={{
                marginInlineStart: 40,
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 6,
              }}
            >
              {q.opts.map((o, j) => (
                <div
                  key={j}
                  style={{
                    padding: "8px 12px",
                    borderRadius: 8,
                    fontSize: 13,
                    background:
                      j === q.correct
                        ? "color-mix(in oklch, var(--brand) 18%, transparent)"
                        : "var(--bg)",
                    border: `1px solid ${
                      j === q.correct
                        ? "color-mix(in oklch, var(--brand) 40%, transparent)"
                        : "var(--border)"
                    }`,
                    color: j === q.correct ? "var(--brand)" : "var(--text)",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    justifyContent: "flex-start",
                  }}
                >
                  {j === q.correct && <Icon.Check width="12" height="12" />}
                  {o}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

const ShowcaseAnalyze = () => (
  <div style={{ padding: 22, textAlign: "right" }}>
    <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>
      تحليل أداء الفصل · 3أ
    </h3>
    <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 18 }}>
      اختبار الجبر · 28 طالب أكملوا
    </div>

    <div
      style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 18 }}
      className="ana-stats"
    >
      {[
        { k: "متوسط", v: "24.8", s: "/30" },
        { k: "أعلى درجة", v: "30", s: "/30" },
        { k: "أدنى درجة", v: "14", s: "/30" },
        { k: "نسبة النجاح", v: "92", s: "%" },
      ].map((m, i) => (
        <div
          key={i}
          style={{
            background: "var(--bg-elev-2)",
            border: "1px solid var(--border)",
            borderRadius: 12,
            padding: 14,
            textAlign: "right",
          }}
        >
          <div style={{ fontSize: 12, color: "var(--text-subtle)" }}>{m.k}</div>
          <div style={{ fontSize: 22, fontWeight: 800, marginTop: 4 }}>
            <span style={{ color: "var(--brand)" }}>{m.v}</span>
            <span style={{ fontSize: 13, color: "var(--text-subtle)", fontWeight: 500 }}>
              {m.s}
            </span>
          </div>
        </div>
      ))}
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 14 }} className="ana-grid">
      {/* Bar chart by topic */}
      <div
        style={{
          background: "var(--bg-elev-2)",
          border: "1px solid var(--border)",
          borderRadius: 12,
          padding: 18,
          textAlign: "right",
        }}
      >
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>
          إتقان نواتج التعلم
        </div>
        {[
          { t: "حلّ المعادلات الخطية", v: 92 },
          { t: "تحليل المعادلات التربيعية", v: 78 },
          { t: "الدوال والمتباينات", v: 65 },
          { t: "النسبة والتناسب", v: 88 },
          { t: "الأنظمة الخطية", v: 71 },
        ].map((b, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 12,
                marginBottom: 4,
              }}
            >
              <span style={{ color: "var(--text-muted)" }}>{b.t}</span>
              <span style={{ color: "var(--text)", fontWeight: 600 }}>{b.v}%</span>
            </div>
            <div style={{ height: 6, background: "var(--bg)", borderRadius: 999, overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  width: `${b.v}%`,
                  background:
                    b.v > 80 ? "var(--brand)" : b.v > 65 ? "var(--warning)" : "var(--danger)",
                  borderRadius: 999,
                  transition: "width 1.4s cubic-bezier(0.16,1,0.3,1)",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Bloom distribution */}
      <div
        style={{
          background: "var(--bg-elev-2)",
          border: "1px solid var(--border)",
          borderRadius: 12,
          padding: 18,
          textAlign: "right",
        }}
      >
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>
          توزيع مستويات بلوم
        </div>
        {[
          { t: "تذكّر", v: 95, c: "var(--brand)" },
          { t: "فهم", v: 88, c: "var(--brand)" },
          { t: "تطبيق", v: 76, c: "var(--warning)" },
          { t: "تحليل", v: 64, c: "var(--warning)" },
          { t: "تقييم", v: 52, c: "var(--danger)" },
          { t: "إبداع", v: 41, c: "var(--danger)" },
        ].map((b, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 8,
              justifyContent: "flex-start",
            }}
          >
            <span style={{ fontSize: 12, color: "var(--text-muted)", width: 50 }}>
              {b.t}
            </span>
            <div
              style={{
                flex: 1,
                height: 18,
                background: "var(--bg)",
                borderRadius: 4,
                overflow: "hidden",
                position: "relative",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${b.v}%`,
                  background: b.c,
                  transition: "width 1.4s ease",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  insetInlineEnd: 6,
                  top: 1,
                  fontSize: 11,
                  fontWeight: 600,
                }}
              >
                {b.v}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
    <style>{`
      @media (max-width: 880px) {
        .ana-stats { grid-template-columns: repeat(2, 1fr) !important; }
        .ana-grid { grid-template-columns: 1fr !important; }
      }
    `}</style>
  </div>
);

/* ── Credits Calculator / Sliders ────────────────────────── */
const CreditPacks = () => {
  const MIN = 10,
    MAX = 1000,
    STEP = 1;
  const [qty, setQty] = useState(500);
  const clamp = (n: number) => Math.max(MIN, Math.min(MAX, n));
  const setSafe = (n: number) => setQty(clamp(Math.round(n)));

  const rate = rateForQty(qty);
  const total = Math.round(qty * rate);
  const saving = Math.round((1 - rate / BASE_RATE) * 100);

  return (
    <div className="credits-wrap">
      {/* Interactive calculator */}
      <div
        className="card credits-calc"
        style={{
          padding: 32,
          background:
            "linear-gradient(135deg, color-mix(in oklch, var(--brand) 10%, var(--bg-elev-1)), var(--bg-elev-1))",
          borderColor: "color-mix(in oklch, var(--brand) 35%, transparent)",
          textAlign: "right",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div>
            <div style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 6 }}>
              عدد الأسئلة الإضافية
            </div>
            {/* Stepper */}
            <div className="credits-stepper" style={{ direction: "ltr" }}>
              <button
                type="button"
                aria-label="إنقاص"
                onClick={() => setSafe(qty - STEP)}
                disabled={qty <= MIN}
              >
                −
              </button>
              <input
                type="number"
                inputMode="numeric"
                min={MIN}
                max={MAX}
                step={STEP}
                value={qty}
                onChange={(e) => setQty(e.target.value === "" ? 0 : +e.target.value)}
                onBlur={(e) => setSafe(+e.target.value || MIN)}
                aria-label="عدد الأسئلة"
              />
              <button
                type="button"
                aria-label="زيادة"
                onClick={() => setSafe(qty + STEP)}
                disabled={qty >= MAX}
              >
                +
              </button>
              <span className="credits-stepper-unit">سؤال</span>
            </div>
          </div>
          <div style={{ textAlign: "right", direction: "rtl" }}>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 8,
                justifyContent: "flex-start",
              }}
            >
              <div
                style={{
                  fontSize: 48,
                  fontWeight: 900,
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                  color: "var(--brand)",
                }}
              >
                {fmt(total)}
              </div>
              <div style={{ fontSize: 16, color: "var(--text-muted)" }}>ر.س</div>
            </div>
            <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 6 }}>
              {rate.toFixed(2)} ر.س لكل سؤال
              {saving > 0 && (
                <span style={{ color: "var(--brand)", fontWeight: 700 }}>
                  {"  ·  "}توفير {saving}%
                </span>
              )}
            </div>
          </div>
        </div>

        <input
          type="range"
          min={MIN}
          max={MAX}
          step={STEP}
          value={qty || MIN}
          onChange={(e) => setQty(+e.target.value)}
          className="credits-slider"
          style={{
            width: "100%",
            marginTop: 28,
            accentColor: "var(--brand)",
            cursor: "pointer",
          }}
        />

        {/* Tier ticks */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 10,
            fontSize: 11.5,
            color: "var(--text-muted)",
          }}
        >
          {[100, 250, 500, 750, 1000].map((q) => (
            <button
              type="button"
              key={q}
              onClick={() => setSafe(q)}
              style={{
                background: "none",
                cursor: "pointer",
                color: qty >= q ? "var(--brand)" : "var(--text-muted)",
                fontWeight: qty >= q ? 700 : 500,
              }}
            >
              {rateForQty(q).toFixed(2)}
            </button>
          ))}
        </div>

        <button
          className="btn btn-primary"
          style={{ width: "100%", justifyContent: "center", marginTop: 26 }}
        >
          شراء {fmt(qty)} سؤال — {fmt(total)} ر.س
        </button>
        <div
          style={{
            textAlign: "center",
            fontSize: 12,
            color: "var(--text-muted)",
            marginTop: 12,
          }}
        >
          دفعة واحدة · الرصيد لا تنتهي صلاحيته · يُضاف فوراً إلى حسابك
        </div>
      </div>

      {/* Preset packs */}
      <div className="credits-grid">
        {CREDIT_PACKS.map((p) => {
          const pr = rateForQty(p.qty);
          const t = Math.round(p.qty * pr);
          const sv = Math.round((1 - pr / BASE_RATE) * 100);
          return (
            <div
              key={p.qty}
              className="card"
              style={{
                padding: 22,
                position: "relative",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                gap: 6,
                background: "var(--bg-elev-1)",
                borderColor: p.best
                  ? "color-mix(in oklch, var(--brand) 50%, transparent)"
                  : "var(--border)",
                boxShadow: p.best ? "0 24px 60px -30px var(--brand)" : "none",
                textAlign: "right",
              }}
              onClick={() => setQty(p.qty)}
            >
              {p.best && (
                <div
                  style={{
                    position: "absolute",
                    top: -11,
                    insetInlineEnd: 20,
                    background: "var(--brand)",
                    color: "var(--brand-on)",
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "3px 11px",
                    borderRadius: 999,
                  }}
                >
                  أفضل قيمة
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: 19, fontWeight: 800 }}>{fmt(p.qty)} سؤال</div>
                {sv > 0 && (
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      padding: "3px 9px",
                      borderRadius: 999,
                      background: "color-mix(in oklch, var(--brand) 16%, transparent)",
                      color: "var(--brand)",
                    }}
                  >
                    خصم {sv}%
                  </div>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 6,
                  marginTop: 4,
                  justifyContent: "flex-start",
                }}
              >
                <div style={{ fontSize: 34, fontWeight: 900, letterSpacing: "-0.02em" }}>
                  {fmt(t)}
                </div>
                <div style={{ fontSize: 13, color: "var(--text-muted)" }}>ر.س</div>
              </div>
              <div style={{ fontSize: 12.5, color: "var(--text-muted)", textAlign: "right" }}>
                {pr.toFixed(2)} ر.س لكل سؤال · دفعة واحدة
              </div>
              <button
                className={p.best ? "btn btn-primary" : "btn btn-ghost"}
                style={{ width: "100%", justifyContent: "center", marginTop: 12 }}
              >
                شراء الآن
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CREDIT_PACKS = [
  { qty: 100 },
  { qty: 200 },
  { qty: 400, popular: true },
  { qty: 600 },
  { qty: 800 },
  { qty: 1000, best: true },
];
const BASE_RATE = 0.25;
const RATE_FLOOR = 0.12;
const fmt = (n: number) => Number(n).toLocaleString("en-US");
const rateForQty = (qty: number) => {
  const raw = BASE_RATE - 0.015 * Math.floor((qty || 0) / 100);
  return Math.max(RATE_FLOOR, Math.round(raw * 100) / 100);
};
