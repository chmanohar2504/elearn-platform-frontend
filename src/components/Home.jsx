import React from "react";
import Navbar from "./Navbar";
import "./home.css";

const Home = ({ onNavigate, loggedIn }) => {
  return (
    <div className="home-page">

      <Navbar onNavigate={onNavigate} activePage="home" loggedIn={loggedIn} />

      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <section className="hero">
        <div className="hero-blob b1" />
        <div className="hero-blob b2" />
        <div className="hero-blob b3" />
        <div className="hero-lines" />
        <div className="hero-particles">
          {[...Array(22)].map((_, i) => (
            <span key={i} className="particle" style={{ "--i": i }} />
          ))}
        </div>

        <div className="hero-content">
          <div className="hero-pill">
            <span>✦</span> Adaptive E-Learning Platform
          </div>

          <h1 className="hero-title">
            Learn Smarter,<br />
            <span className="hero-accent">Not Harder</span>
          </h1>

          <p className="hero-sub">
            Personalized courses, adaptive quizzes, and real-time analytics —
            all designed to accelerate your learning journey.
          </p>

          <div className="hero-btns">
            <button className="btn btn-green" onClick={() => onNavigate("login")}>
              Get Started →
            </button>
            <button className="btn btn-ghost" onClick={() => onNavigate("login")}>
              Browse Courses
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat-box">
              <span className="stat-num">10K+</span>
              <span className="stat-lbl">Students</span>
            </div>
            <div className="stat-box">
              <span className="stat-num">200+</span>
              <span className="stat-lbl">Courses</span>
            </div>
            <div className="stat-box">
              <span className="stat-num">95%</span>
              <span className="stat-lbl">Success Rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          WHY LEARNSMART
      ══════════════════════════════ */}
      <section className="why-section">
        <div className="section-inner">
          <div className="why-header">
            <h2>Why <span className="green">LearnSmart</span>?</h2>
            <p>Our platform adapts to your unique learning style and pace.</p>
          </div>

          <div className="features-grid">
            {[
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="26" height="26">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5"/>
                    <path d="M2 12l10 5 10-5"/>
                  </svg>
                ),
                title: "Adaptive Learning",
                desc: "AI-powered course recommendations that adjust to your performance.",
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="26" height="26">
                    <path d="M18 2H6v7a6 6 0 0012 0V2z"/>
                    <path d="M4 22h16"/>
                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
                  </svg>
                ),
                title: "Gamified Experience",
                desc: "Earn badges, maintain streaks, and climb the leaderboard.",
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="26" height="26">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                  </svg>
                ),
                title: "Instant Feedback",
                desc: "Get real-time quiz results and performance insights.",
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="26" height="26">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 00-3-3.87"/>
                    <path d="M16 3.13a4 4 0 010 7.75"/>
                  </svg>
                ),
                title: "Expert Content",
                desc: "Courses designed by industry professionals.",
              },
            ].map((f, i) => (
              <div className="feat-card" key={i}>
                <div className="feat-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          CTA BANNER
      ══════════════════════════════ */}
      <section className="cta-section">
        <div className="section-inner">
          <div className="cta-card">
            <div className="cta-glow" />
            <div className="cta-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="32" height="32">
                <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/>
                <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
              </svg>
            </div>
            <h2>Ready to Transform Your Learning?</h2>
            <p>Join thousands of learners already using LearnSmart.</p>
            <button className="btn btn-green cta-btn" onClick={() => onNavigate("login")}>
              Start Learning Now
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          FOOTER
      ══════════════════════════════ */}
      <footer className="home-footer">
        © 2024 LearnSmart. All rights reserved.
      </footer>

    </div>
  );
};

export default Home;