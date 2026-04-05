import React, { useState } from "react";
import Navbar from "./Navbar";
import "./courses.css";

/* ── Course Data ── */
const allCourses = [
  {
    id: 1,
    emoji: "⚛️",
    title: "React Mastery",
    desc: "Master React with hooks, context, and advanced patterns.",
    difficulty: "Medium",
    pct: 60,
    category: "programming",
    enrolled: true,
  },
  {
    id: 2,
    emoji: "🧠",
    title: "AI Basics",
    desc: "Introduction to artificial intelligence and machine learning.",
    difficulty: "Easy",
    pct: 80,
    category: "ai",
    enrolled: true,
  },
  {
    id: 3,
    emoji: "🗂️",
    title: "Data Structures",
    desc: "Deep dive into algorithms and data structures.",
    difficulty: "Hard",
    pct: 40,
    category: "programming",
    enrolled: true,
  },
  {
    id: 4,
    emoji: "🐍",
    title: "Python for Data Science",
    desc: "Learn Python for data analysis and visualization.",
    difficulty: "Medium",
    pct: 0,
    category: "data",
    enrolled: false,
  },
  {
    id: 5,
    emoji: "🔒",
    title: "Web Security",
    desc: "Understand web security vulnerabilities and defenses.",
    difficulty: "Hard",
    pct: 0,
    category: "programming",
    enrolled: false,
  },
  {
    id: 6,
    emoji: "🤖",
    title: "Machine Learning",
    desc: "Build ML models from scratch.",
    difficulty: "Hard",
    pct: 25,
    category: "ai",
    enrolled: true,
  },
  {
    id: 7,
    emoji: "📊",
    title: "Data Visualization",
    desc: "Tell stories with data using charts and dashboards.",
    difficulty: "Easy",
    pct: 0,
    category: "data",
    enrolled: false,
  },
  {
    id: 8,
    emoji: "➗",
    title: "Linear Algebra",
    desc: "Mathematics foundations for machine learning and AI.",
    difficulty: "Medium",
    pct: 0,
    category: "math",
    enrolled: false,
  },
  {
    id: 9,
    emoji: "🌐",
    title: "Web Development",
    desc: "Full-stack web development from HTML to Node.js.",
    difficulty: "Easy",
    pct: 0,
    category: "programming",
    enrolled: false,
  },
];

const sidebarItems = [
  { key: "all",         label: "All Courses"  },
  { key: "my",          label: "My Courses"   },
  { key: "programming", label: "Programming"  },
  { key: "ai",          label: "AI & ML"      },
  { key: "data",        label: "Data Science" },
  { key: "math",        label: "Mathematics"  },
];

const filterTags = ["Programming", "AI & ML", "Mathematics", "Data Science"];

const diffClass = (d) => {
  if (d === "Easy") return "diff-easy";
  if (d === "Hard") return "diff-hard";
  return "diff-medium";
};

const Courses = ({ onNavigate }) => {
  const [active,      setActive]      = useState("all");
  const [search,      setSearch]      = useState("");
  const [courses,     setCourses]     = useState(allCourses);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filtered = courses.filter((c) => {
    const matchCat =
      active === "all" ? true :
      active === "my"  ? c.enrolled :
      c.category === active;

    const matchSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.desc.toLowerCase().includes(search.toLowerCase());

    return matchCat && matchSearch;
  });

  const enroll = (id) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, enrolled: true, pct: 0 } : c))
    );
  };

  return (
    <div className="courses-page">
      <Navbar onNavigate={onNavigate} activePage="courses" loggedIn={true} />

      <div className="courses-wrap">

        <div className="courses-heading">
          <h1>Courses</h1>
          <p>Browse and discover courses tailored for you.</p>
        </div>

        <button
          className="sidebar-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰ Categories
        </button>

        <div className="courses-layout">

          {/* ══ SIDEBAR ══ */}
          <aside className={`courses-sidebar ${sidebarOpen ? "open" : ""}`}>
            <div className="sidebar-title">Categories</div>
            {sidebarItems.map((item) => (
              <button
                key={item.key}
                className={`sidebar-item ${active === item.key ? "active" : ""}`}
                onClick={() => { setActive(item.key); setSidebarOpen(false); }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="1.8" width="15" height="15">
                  <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/>
                  <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
                </svg>
                {item.label}
              </button>
            ))}
          </aside>

          {/* ══ MAIN ══ */}
          <div className="courses-main">

            <div className="search-row">
              <div className="search-wrap">
                <svg className="search-icon" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35"/>
                </svg>
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <button className="filter-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" width="16" height="16">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
                </svg>
              </button>
            </div>

            <div className="filter-tags">
              {filterTags.map((tag) => (
                <button key={tag} className="filter-tag">{tag}</button>
              ))}
            </div>

            <h3 className="browse-title">Browse Courses</h3>

            <div className="course-grid">
              {filtered.length === 0 ? (
                <div className="no-results">No courses found.</div>
              ) : (
                filtered.map((c) => (
                  <div className="course-card" key={c.id}>
                    <div className="course-card-img">
                      <span className="course-emoji">{c.emoji}</span>
                    </div>
                    <div className="course-card-body">
                      <h3 className="course-card-title">{c.title}</h3>
                      <p className="course-card-desc">{c.desc}</p>
                      {c.enrolled ? (
                        <>
                          <div className="course-meta-row">
                            <span className={`diff-badge ${diffClass(c.difficulty)}`}>
                              {c.difficulty}
                            </span>
                            <span className="pct-label">{c.pct}% Complete</span>
                          </div>
                          <div className="course-bar">
                            <div className="course-bar-fill" style={{ width: `${c.pct}%` }} />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="course-meta-row">
                            <span className={`diff-badge ${diffClass(c.difficulty)}`}>
                              {c.difficulty}
                            </span>
                            <span className="pct-label pct-zero">0% Complete</span>
                          </div>
                          <div className="course-bar">
                            <div className="course-bar-fill" style={{ width: "0%" }} />
                          </div>
                          <button className="enroll-btn" onClick={() => enroll(c.id)}>
                            Enroll Now
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;