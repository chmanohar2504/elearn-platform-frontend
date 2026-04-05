import React, { useState } from "react";
import Navbar from "./Navbar";
import "./profile.css";

const Profile = ({ onNavigate, onLogout }) => {
  const [editing,   setEditing]   = useState(false);
  const [name,      setName]      = useState("Alex Johnson");
  const [email,     setEmail]     = useState("alex.johnson@email.com");
  const [tempName,  setTempName]  = useState(name);
  const [tempEmail, setTempEmail] = useState(email);

  const stats = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22">
          <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/>
          <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
        </svg>
      ),
      val: "4", label: "Courses",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22">
          <circle cx="12" cy="12" r="10"/>
          <circle cx="12" cy="12" r="6"/>
          <circle cx="12" cy="12" r="2"/>
        </svg>
      ),
      val: "69%", label: "Avg. Score",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22">
          <circle cx="12" cy="8" r="6"/>
          <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
        </svg>
      ),
      val: "3", label: "Badges",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
          <path d="M12 6v6l4 2"/>
        </svg>
      ),
      val: "5 days", label: "Streak",
    },
  ];

  const badges = [
    { emoji:"🔥", title:"Sneak Novice",    desc:"Complete 5 day learning streak",   earned:true  },
    { emoji:"💎", title:"Pro Learner",      desc:"Complete 8 courses",               earned:true  },
    { emoji:"🏆", title:"Quiz Master",      desc:"Score 90%+ on 10 quizzes",         earned:false },
    { emoji:"⚡", title:"Speed Demon",      desc:"Complete a quiz under 1 minute",   earned:false },
    { emoji:"🌟", title:"Knowledge Seeker", desc:"Enroll in 5 different categories", earned:true  },
    { emoji:"✨", title:"Perfect Score",    desc:"Get 100% on any quiz",             earned:false },
  ];

  const skills = [
    { name:"React",           pct:85, color:"green" },
    { name:"JavaScript",      pct:72, color:"green" },
    { name:"Algorithms",      pct:45, color:"red"   },
    { name:"AI & ML",         pct:68, color:"green" },
    { name:"Data Structures", pct:55, color:"red"   },
    { name:"Mathematics",     pct:90, color:"green" },
  ];

  const saveEdit = () => {
    setName(tempName);
    setEmail(tempEmail);
    setEditing(false);
  };

  const cancelEdit = () => {
    setTempName(name);
    setTempEmail(email);
    setEditing(false);
  };

  return (
    <div className="prof-page">
      <Navbar onNavigate={onNavigate} activePage="profile" loggedIn={true} />

      <div className="prof-wrap">

        {/* ── PROFILE HEADER ── */}
        <div className="prof-header-card">
          <div className="prof-avatar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="1.5" width="44" height="44">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>

          <div className="prof-info">
            {editing ? (
              <div className="prof-edit-fields">
                <input
                  className="prof-input"
                  value={tempName}
                  onChange={e => setTempName(e.target.value)}
                  placeholder="Full name"
                />
                <input
                  className="prof-input"
                  value={tempEmail}
                  onChange={e => setTempEmail(e.target.value)}
                  placeholder="Email address"
                />
              </div>
            ) : (
              <>
                <h2 className="prof-name">{name}</h2>
                <div className="prof-email">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="1.8" width="14" height="14">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  {email}
                </div>
                <div className="prof-tags">
                  <span className="prof-tag tag-green">Student</span>
                  <span className="prof-tag tag-fire">🔥 5 day streak</span>
                </div>
              </>
            )}
          </div>

          <div className="prof-actions">
            {editing ? (
              <>
                <button className="prof-btn btn-save"   onClick={saveEdit}>✓ Save</button>
                <button className="prof-btn btn-cancel" onClick={cancelEdit}>✗ Cancel</button>
              </>
            ) : (
              <>
                <button
                  className="prof-btn btn-edit"
                  onClick={() => { setTempName(name); setTempEmail(email); setEditing(true); }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" width="14" height="14">
                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                  Edit
                </button>
                <button
                  className="prof-btn btn-logout"
                  onClick={() => onLogout?.("home")}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" width="14" height="14">
                    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
                    <polyline points="16 17 21 12 16 7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                  Logout
                </button>
              </>
            )}
          </div>
        </div>

        {/* ── STAT CARDS ── */}
        <div className="prof-stats-row">
          {stats.map((s, i) => (
            <div className="prof-stat-card" key={i}>
              <span className="prof-stat-icon">{s.icon}</span>
              <div className="prof-stat-val">{s.val}</div>
              <div className="prof-stat-lbl">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── BADGES ── */}
        <div className="prof-section-card">
          <h3 className="prof-section-title">Your Badges</h3>
          <div className="badges-grid">
            {badges.map((b, i) => (
              <div className={`badge-card ${b.earned ? "earned" : "locked"}`} key={i}>
                <div className="badge-emoji">{b.emoji}</div>
                <div className="badge-title">{b.title}</div>
                <div className="badge-desc">{b.desc}</div>
                {b.earned
                  ? <div className="badge-earned">✓ Earned</div>
                  : <div className="badge-locked">Locked</div>
                }
              </div>
            ))}
          </div>
        </div>

        {/* ── SKILLS OVERVIEW ── */}
        <div className="prof-section-card">
          <h3 className="prof-section-title">Skills Overview</h3>
          <div className="skills-list">
            {skills.map((s, i) => (
              <div className="skill-row" key={i}>
                <div className="skill-name">{s.name}</div>
                <div className="skill-bar-wrap">
                  <div className="skill-bar-track">
                    <div
                      className={`skill-bar-fill ${s.color === "red" ? "bar-red" : "bar-green"}`}
                      style={{ width: `${s.pct}%` }}
                    />
                  </div>
                </div>
                <div className={`skill-pct ${s.color === "red" ? "pct-red" : "pct-green"}`}>
                  {s.pct}%
                </div>
              </div>
            ))}
          </div>
          <div className="skills-note">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" width="14" height="14" style={{color:"#ff4757", flexShrink:0}}>
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8"  x2="12"    y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <span>
              Skills below 60% need attention:&nbsp;
              <strong>Algorithms (45%)</strong> and&nbsp;
              <strong>Data Structures (55%)</strong>.
              Focus on these to boost your overall score.
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;