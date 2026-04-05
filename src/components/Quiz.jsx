import React, { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import "./quiz.css";

const questions = [
  {
    id: 1,
    difficulty: "Easy",
    topic: "Mathematics",
    question: "What is the output of 2 × 2 × 2?",
    options: ["6", "8", "4", "2"],
    answer: 1,
  },
  {
    id: 2,
    difficulty: "Easy",
    topic: "Programming",
    question: "Which hook is used for side effects in React?",
    options: ["useState", "useEffect", "useContext", "useRef"],
    answer: 1,
  },
  {
    id: 3,
    difficulty: "Medium",
    topic: "AI & ML",
    question: "What does 'AI' stand for?",
    options: ["Automated Intelligence", "Artificial Intelligence", "Advanced Interface", "Applied Integration"],
    answer: 1,
  },
  {
    id: 4,
    difficulty: "Medium",
    topic: "Data Structures",
    question: "Which data structure uses LIFO order?",
    options: ["Queue", "Linked List", "Stack", "Array"],
    answer: 2,
  },
  {
    id: 5,
    difficulty: "Hard",
    topic: "Algorithms",
    question: "What is the time complexity of binary search?",
    options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
    answer: 2,
  },
  {
    id: 6,
    difficulty: "Easy",
    topic: "Programming",
    question: "What does CSS stand for?",
    options: ["Computer Style Sheets", "Creative Style System", "Cascading Style Sheets", "Custom Style Scripts"],
    answer: 2,
  },
  {
    id: 7,
    difficulty: "Medium",
    topic: "AI & ML",
    question: "What is gradient descent used for?",
    options: ["Sorting data", "Minimizing a loss function", "Encrypting data", "Rendering images"],
    answer: 1,
  },
  {
    id: 8,
    difficulty: "Hard",
    topic: "Mathematics",
    question: "What is the derivative of sin(x)?",
    options: ["-cos(x)", "cos(x)", "tan(x)", "-sin(x)"],
    answer: 1,
  },
];

const TOTAL_TIME = 150;

const Quiz = ({ onNavigate }) => {
  const [phase,     setPhase]     = useState("intro");
  const [current,   setCurrent]   = useState(0);
  const [selected,  setSelected]  = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [answers,   setAnswers]   = useState([]);
  const [timeLeft,  setTimeLeft]  = useState(TOTAL_TIME);
  const timerRef = useRef(null);

  const correct  = answers.filter((a) => a.correct).length;
  const wrong    = answers.filter((a) => !a.correct).length;
  const accuracy = answers.length ? Math.round((correct / answers.length) * 100) : 0;

  useEffect(() => {
    if (phase !== "active") return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { clearInterval(timerRef.current); setPhase("result"); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [phase]);

  const fmtTime = (s) => {
    const m   = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  const startQuiz = () => {
    setCurrent(0);
    setSelected(null);
    setSubmitted(false);
    setAnswers([]);
    setTimeLeft(TOTAL_TIME);
    setPhase("active");
  };

  const selectOption = (idx) => {
    if (submitted) return;
    setSelected(idx);
  };

  const submitAnswer = () => {
    if (selected === null) return;
    const isCorrect = selected === questions[current].answer;
    setAnswers((prev) => [...prev, { qIdx: current, chosen: selected, correct: isCorrect }]);
    setSubmitted(true);
  };

  const nextQuestion = () => {
    if (current + 1 >= questions.length) {
      clearInterval(timerRef.current);
      setPhase("result");
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setSubmitted(false);
    }
  };

  const optClass = (idx) => {
    if (!submitted) return selected === idx ? "option selected" : "option";
    if (idx === questions[current].answer) return "option correct";
    if (idx === selected && selected !== questions[current].answer) return "option wrong";
    return "option";
  };

  const progressPct = ((current + 1) / questions.length) * 100;

  const dotClass = (i) => {
    if (i === current && phase === "active") return "q-dot current";
    const ans = answers.find((a) => a.qIdx === i);
    if (ans) return ans.correct ? "q-dot done-correct" : "q-dot done-wrong";
    return "q-dot";
  };

  /* ── INTRO ── */
  if (phase === "intro") return (
    <div className="quiz-page">
      <Navbar onNavigate={onNavigate} activePage="quiz" loggedIn={true} />
      <div className="quiz-intro-wrap">
        <div className="quiz-intro-card">
          <div className="intro-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="#2ecc71"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              width="48" height="48">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
          </div>
          <h1 className="intro-title">Quiz Challenge</h1>
          <p className="intro-sub">
            Test your knowledge with adaptive quizzes that adjust to your level.
          </p>
          <div className="intro-meta">
            <div className="meta-box">
              <span className="meta-val">8</span>
              <span className="meta-lbl">Questions</span>
            </div>
            <div className="meta-box">
              <span className="meta-val">2:30</span>
              <span className="meta-lbl">Time Limit</span>
            </div>
            <div className="meta-box">
              <span className="meta-val green">Mixed</span>
              <span className="meta-lbl">Difficulty</span>
            </div>
          </div>
          <button className="start-btn" onClick={startQuiz}>Start Quiz</button>
        </div>
      </div>
    </div>
  );

  /* ── RESULT ── */
  if (phase === "result") return (
    <div className="quiz-page">
      <Navbar onNavigate={onNavigate} activePage="quiz" loggedIn={true} />
      <div className="quiz-intro-wrap">
        <div className="quiz-result-card">
          <div className="result-emoji">{accuracy >= 70 ? "🏆" : "📝"}</div>
          <h2 className="result-title">Quiz Complete!</h2>
          <p className="result-sub">Here are your results</p>
          <div className="result-stats">
            <div className="result-stat">
              <span className="rs-val">{Math.round((correct / questions.length) * 100)}%</span>
              <span className="rs-lbl">Score</span>
            </div>
            <div className="result-stat">
              <span className="rs-val green">{correct}</span>
              <span className="rs-lbl">Correct</span>
            </div>
            <div className="result-stat">
              <span className="rs-val red">{wrong}</span>
              <span className="rs-lbl">Wrong</span>
            </div>
          </div>
          <div className="result-btns">
            <button className="start-btn" onClick={startQuiz}>Try Again</button>
            <button className="outline-btn" onClick={() => onNavigate?.("analytics")}>
              View Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  /* ── ACTIVE ── */
  const q = questions[current];

  return (
    <div className="quiz-page">
      <Navbar onNavigate={onNavigate} activePage="quiz" loggedIn={true} />
      <div className="quiz-active-wrap">

        <div className="quiz-topbar">
          <h2 className="quiz-active-title">Quiz Challenge</h2>
          <div className={`quiz-timer ${timeLeft < 30 ? "timer-red" : ""}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" width="16" height="16">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            {fmtTime(timeLeft)}
          </div>
        </div>

        <div className="quiz-prog-track">
          <div className="quiz-prog-fill" style={{ width: `${progressPct}%` }} />
        </div>

        <div className="quiz-layout">

          <div className="question-card">
            <div className="q-tags">
              <span className="q-tag easy-tag">{q.difficulty}</span>
              <span className="q-tag topic-tag">{q.topic}</span>
            </div>

            <div className="q-text">Q {current + 1}. {q.question}</div>

            <div className="options-list">
              {q.options.map((opt, idx) => (
                <div key={idx} className={optClass(idx)} onClick={() => selectOption(idx)}>
                  <span className="opt-letter">{String.fromCharCode(65 + idx)}</span>
                  <span className="opt-text">{opt}</span>
                  {submitted && idx === q.answer && (
                    <span className="opt-mark correct-mark">✓</span>
                  )}
                  {submitted && idx === selected && selected !== q.answer && (
                    <span className="opt-mark wrong-mark">✗</span>
                  )}
                </div>
              ))}
            </div>

            {submitted && (
              <div className={`feedback-msg ${selected === q.answer ? "feedback-correct" : "feedback-wrong"}`}>
                {selected === q.answer
                  ? "✓ Correct! Well done."
                  : `✗ Wrong! Correct answer is: ${q.options[q.answer]}`}
              </div>
            )}

            {!submitted ? (
              <button className="submit-btn" onClick={submitAnswer} disabled={selected === null}>
                Submit Answer
              </button>
            ) : (
              <button className="submit-btn" onClick={nextQuestion}>
                {current + 1 >= questions.length ? "Finish Quiz →" : "Next Question →"}
              </button>
            )}
          </div>

          <div className="quiz-sidebar">
            <div className="qs-card">
              <div className="qs-title">Progress</div>
              <div className="q-dots-grid">
                {questions.map((_, i) => (
                  <div key={i} className={dotClass(i)}>{i + 1}</div>
                ))}
              </div>
            </div>

            <div className="qs-card">
              <div className="qs-title">Score</div>
              <div className="score-nums">
                <span className="score-val">{correct}</span>
                <span className="score-slash">/</span>
                <span className="score-val">{answers.length}</span>
              </div>
              <div className="score-acc">{accuracy}% accuracy</div>
              <div className="score-breakdown">
                <div className="sb-item">
                  <span className="sb-num green">{correct}</span>
                  <span className="sb-lbl">Correct</span>
                </div>
                <div className="sb-item">
                  <span className="sb-num red">{wrong}</span>
                  <span className="sb-lbl">Wrong</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Quiz;