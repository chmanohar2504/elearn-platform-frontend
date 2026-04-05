import React, { useEffect, useRef } from "react";
import Navbar from "./Navbar"; 
import "./dashboard.css";

/* ── Line Chart Component ── */
const LineChart = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    canvas.width  = W;
    canvas.height = H;

    const data   = [68, 75, 62, 80, 75, 85, 92];
    const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const yLabels = [0, 25, 50, 75, 100];

    const padL = 44, padR = 20, padT = 16, padB = 40;
    const chartW = W - padL - padR;
    const chartH = H - padT - padB;

    const toX = (i) => padL + (i / (data.length - 1)) * chartW;
    const toY = (v) => padT + chartH - (v / 100) * chartH;

    ctx.clearRect(0, 0, W, H);

    /* grid lines */
    yLabels.forEach((v) => {
      const y = toY(v);
      ctx.beginPath();
      ctx.moveTo(padL, y);
      ctx.lineTo(W - padR, y);
      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = "rgba(255,255,255,0.30)";
      ctx.font = "11px 'Space Grotesk', sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(v, padL - 8, y + 4);
    });

    /* x labels */
    labels.forEach((lbl, i) => {
      ctx.fillStyle = "rgba(255,255,255,0.30)";
      ctx.font = "11px 'Space Grotesk', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(lbl, toX(i), H - 8);
    });

    /* gradient fill */
    const grad = ctx.createLinearGradient(0, padT, 0, padT + chartH);
    grad.addColorStop(0, "rgba(46,204,113,0.20)");
    grad.addColorStop(1, "rgba(46,204,113,0.00)");

    ctx.beginPath();
    ctx.moveTo(toX(0), toY(data[0]));
    data.forEach((v, i) => {
      if (i === 0) return;
      const x0 = toX(i - 1), y0 = toY(data[i - 1]);
      const x1 = toX(i),     y1 = toY(v);
      const cx = (x0 + x1) / 2;
      ctx.bezierCurveTo(cx, y0, cx, y1, x1, y1);
    });
    ctx.lineTo(toX(data.length - 1), padT + chartH);
    ctx.lineTo(toX(0), padT + chartH);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    /* line */
    ctx.beginPath();
    ctx.moveTo(toX(0), toY(data[0]));
    data.forEach((v, i) => {
      if (i === 0) return;
      const x0 = toX(i - 1), y0 = toY(data[i - 1]);
      const x1 = toX(i),     y1 = toY(v);
      const cx = (x0 + x1) / 2;
      ctx.bezierCurveTo(cx, y0, cx, y1, x1, y1);
    });
    ctx.strokeStyle = "#2ecc71";
    ctx.lineWidth = 2.5;
    ctx.stroke();

    /* dots */
    data.forEach((v, i) => {
      ctx.beginPath();
      ctx.arc(toX(i), toY(v), 5, 0, Math.PI * 2);
      ctx.fillStyle   = "#2ecc71";
      ctx.strokeStyle = "#0f1810";
      ctx.lineWidth   = 2;
      ctx.fill();
      ctx.stroke();
    });
  }, []);

  return <canvas ref={canvasRef} className="dash-canvas" />;
};

/* ══════════════════════════════════════════
   DASHBOARD
══════════════════════════════════════════ */
const Dashboard = ({ onNavigate }) => {
  const courses = [
    { title: "React Mastery",    modules: 12, pct: 60 },
    { title: "AI Basics",        modules: 8,  pct: 80 },
    { title: "Data Structures",  modules: 15, pct: 40 },
    { title: "Machine Learning", modules: 20, pct: 25 },
  ];

  const activities = [
    { icon: "🎯", text: "Completed: React Basics Quiz", time: "5 min ago"   },
    { icon: "📘", text: "New Module: AI Fundamentals",  time: "5 min ago"   },
    { icon: "🏅", text: "Earned: Pro Learner Badge",    time: "1 hour ago"  },
    { icon: "🔥", text: "5 Day Learning Streak!",       time: "2 hours ago" },
  ];

  const badges = [
    { icon: "🔥", title: "Sneak Novice",    desc: "Complete 5 day learning streak"   },
    { icon: "💎", title: "Pro Learner",      desc: "Complete 8 courses"               },
    { icon: "🌟", title: "Knowledge Seeker", desc: "Enroll in 5 different categories" },
  ];

  const streakDays  = [1, 2, 3, 4, 5, 6, 7];
  const activeDays  = [1, 2, 3, 4, 5];

  return (
    <div className="dash-page">
      <Navbar onNavigate={onNavigate} activePage="dashboard" loggedIn={true} />
      {/* ── Heading ── */}
      <div className="dash-heading">
        <h1>Welcome to <span className="green">LearnSmart</span></h1>
        <p>Personalized Learning Just for You.</p>
      </div>

      {/* ══ ROW 1 — Stat Cards ══ */}
      <div className="dash-stats-row">

        <div className="dash-stat-card">
          <div className="dsc-top">
            <span className="dsc-label">Tailored Courses</span>
            <span className="dsc-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20">
                <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/>
                <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
              </svg>
            </span>
          </div>
          <div className="dsc-val">12</div>
          <div className="dsc-sub">4 in progress</div>
        </div>

        <div className="dash-stat-card">
          <div className="dsc-top">
            <span className="dsc-label">Adaptive Quizzes</span>
            <span className="dsc-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20">
                <circle cx="12" cy="12" r="10"/>
                <circle cx="12" cy="12" r="6"/>
                <circle cx="12" cy="12" r="2"/>
              </svg>
            </span>
          </div>
          <div className="dsc-val">72%</div>
          <div className="dsc-sub">Avg. score</div>
        </div>

        <div className="dash-stat-card">
          <div className="dsc-top">
            <span className="dsc-label">Track Progress</span>
            <span className="dsc-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                <polyline points="17 6 23 6 23 12"/>
              </svg>
            </span>
          </div>
          <div className="dsc-val">85%</div>
          <div className="dsc-sub">This week</div>
        </div>

      </div>

      {/* ══ ROW 2 — Chart + Badges ══ */}
      <div className="dash-mid-row">

        <div className="dash-card dash-chart-card">
          <h3 className="dash-card-title">Progress Over Time</h3>
          <LineChart />
        </div>

        <div className="dash-card dash-badges-card">
          <h3 className="dash-card-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
              width="16" height="16" style={{ marginRight: 6, verticalAlign: "middle" }}>
              <circle cx="12" cy="8" r="6"/>
              <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
            </svg>
            Badges
          </h3>
          <div className="badges-list">
            {badges.map((b, i) => (
              <div className="badge-row" key={i}>
                <span className="badge-row-icon">{b.icon}</span>
                <div className="badge-row-text">
                  <strong>{b.title}</strong>
                  <span>{b.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ══ ROW 3 — Recent Activity + Streak ══ */}
      <div className="dash-bot-row">

        <div className="dash-card dash-activity-card">
          <h3 className="dash-card-title">Recent Activity</h3>
          <div className="activity-list">
            {activities.map((a, i) => (
              <div className="activity-row" key={i}>
                <span className="activity-icon-wrap">{a.icon}</span>
                <span className="activity-text">{a.text}</span>
                <span className="activity-time">{a.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="dash-card dash-streak-card">
          <div className="streak-fire">🔥</div>
          <div className="streak-num">5 Day Streak</div>
          <div className="streak-sub">Keep learning to maintain your streak!</div>
          <div className="streak-dots">
            {streakDays.map((d) => (
              <div key={d} className={`streak-dot ${activeDays.includes(d) ? "active" : ""}`}>
                {d}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ══ ROW 4 — My Courses ══ */}
      <div className="dash-card dash-courses-card">
        <h3 className="dash-card-title">My Courses</h3>
        <div className="courses-grid">
          {courses.map((c, i) => (
            <div className="course-item" key={i}>
              <div className="course-item-title">{c.title}</div>
              <div className="course-item-modules">{c.modules} modules</div>
              <div className="course-progress-bar">
                <div className="course-progress-fill" style={{ width: `${c.pct}%` }} />
              </div>
              <div className="course-pct">{c.pct}% Complete</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Dashboard;