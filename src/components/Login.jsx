import React, { useState } from "react";
import "./login.css";

const Login = ({ onLogin, onBack }) => {
  const [isSignup,  setIsSignup]  = useState(false);
  const [email,     setEmail]     = useState("");
  const [password,  setPassword]  = useState("");
  const [name,      setName]      = useState("");
  const [error,     setError]     = useState("");
  const [showPass,  setShowPass]  = useState(false);

  const handleSubmit = () => {
    setError("");

    if (isSignup && !name.trim()) {
      setError("Please enter your full name."); return;
    }

    if (!email.trim()) {
      setError("Please enter your email address."); return;
    }

    // ← email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email (e.g. user@gmail.com)"); return;
    }

    if (!password.trim() || password.length < 6) {
      setError("Password must be at least 6 characters."); return;
    }

    onLogin?.();
  };

  const handleKey = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="login-page">
      <div className="lg-blob lg-b1" />
      <div className="lg-blob lg-b2" />
      <div className="lg-blob lg-b3" />
      <div className="lg-lines" />

      <div className="login-card">

        {/* Logo */}

            {/* Back button */}
        <button className="lg-back-btn" onClick={onBack}>
          ← Back to Home
        </button>
        
        <div className="lg-logo">
          <div className="lg-logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="#2ecc71"
              strokeWidth="2" width="22" height="22">
              <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/>
              <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
            </svg>
          </div>
          <span className="lg-logo-text">
            Learn<span className="lg-logo-accent">Smart</span>
          </span>
        </div>

        <h2 className="lg-title">
          {isSignup ? "Create your account" : "Welcome back"}
        </h2>
        <p className="lg-sub">
          {isSignup
            ? "Start your adaptive learning journey today."
            : "Sign in to continue your learning journey."}
        </p>

        <div className="lg-divider" />

        <div className="lg-form">

          {/* Name — signup only */}
          {isSignup && (
            <div className="lg-field">
              <label className="lg-label">Full Name</label>
              <div className="lg-input-wrap">
                <svg className="lg-input-icon" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="1.8" width="16" height="16">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <input
                  className="lg-input"
                  type="text"
                  placeholder="Alex Johnson"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  onKeyDown={handleKey}
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div className="lg-field">
            <label className="lg-label">Email Address</label>
            <div className="lg-input-wrap">
              <svg className="lg-input-icon" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.8" width="16" height="16">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <input
                className="lg-input"
                type="email"
                placeholder="alex@gmail.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={handleKey}
              />
            </div>
          </div>

          {/* Password */}
          <div className="lg-field">
            <div className="lg-label-row">
              <label className="lg-label">Password</label>
              {!isSignup && (
                <span className="lg-forgot">Forgot password?</span>
              )}
            </div>
            <div className="lg-input-wrap">
              <svg className="lg-input-icon" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.8" width="16" height="16">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0110 0v4"/>
              </svg>
              <input
                className="lg-input"
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={handleKey}
              />
              <button
                className="lg-eye-btn"
                onClick={() => setShowPass(!showPass)}
                type="button"
              >
                {showPass ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="1.8" width="16" height="16">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="1.8" width="16" height="16">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Remember me */}
          {!isSignup && (
            <label className="lg-remember">
              <input type="checkbox" className="lg-checkbox" />
              <span>Remember me</span>
            </label>
          )}

          {/* Error */}
          {error && (
            <div className="lg-error">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" width="14" height="14">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8"  x2="12"    y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {error}
            </div>
          )}

          {/* Submit */}
          <button className="lg-submit-btn" onClick={handleSubmit}>
            {isSignup ? "Create Account →" : "Sign In →"}
          </button>

          <div className="lg-demo">
            <span>Use a valid email like user@gmail.com + 6 char password</span>
          </div>

        </div>

        {/* Switch */}
        <div className="lg-switch">
          {isSignup ? (
            <>
              Already have an account?{" "}
              <span className="lg-switch-link"
                onClick={() => { setIsSignup(false); setError(""); }}>
                Sign in
              </span>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <span className="lg-switch-link"
                onClick={() => { setIsSignup(true); setError(""); }}>
                Sign up free
              </span>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default Login;