import { useState } from "react";
import Login     from "./components/Login";
import Home      from "./components/Home";
import Dashboard from "./components/Dashboard";
import Courses   from "./components/Courses";
import Quiz      from "./components/Quiz";
import Analytics from "./components/Analytics";
import Profile   from "./components/Profile";

function App() {
  // ── Read from localStorage on first load
  const [loggedIn, setLoggedIn] = useState(() => {
    return localStorage.getItem("ls_loggedIn") === "true";
  });

  const [page, setPage] = useState(() => {
    const savedPage = localStorage.getItem("ls_page");
    const isLogged  = localStorage.getItem("ls_loggedIn") === "true";
    // if logged in and saved page exists → restore it
    if (isLogged && savedPage) return savedPage;
    return "home";
  });

  const handleNavigate = (targetPage) => {
    setPage(targetPage);
    // save current page to localStorage
    localStorage.setItem("ls_page", targetPage);
  };

  const handleLogin = () => {
    setLoggedIn(true);
    setPage("dashboard");
    // save login state and page
    localStorage.setItem("ls_loggedIn", "true");
    localStorage.setItem("ls_page", "dashboard");
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setPage("home");
    // clear localStorage on logout
    localStorage.removeItem("ls_loggedIn");
    localStorage.removeItem("ls_page");
  };

  return (
    <div style={{ margin: 0, padding: 0, width: "100%" }}>

      {page === "home"  && (
        <Home onNavigate={handleNavigate} loggedIn={loggedIn} />
      )}

      {page === "login" && (
        <Login onLogin={handleLogin} onBack={() => {
          setPage("home");
          localStorage.setItem("ls_page", "home");
        }} />
      )}

      {page === "dashboard" && loggedIn && (
        <Dashboard onNavigate={handleNavigate} />
      )}

      {page === "courses" && loggedIn && (
        <Courses onNavigate={handleNavigate} />
      )}

      {page === "quiz" && loggedIn && (
        <Quiz onNavigate={handleNavigate} />
      )}

      {page === "analytics" && loggedIn && (
        <Analytics onNavigate={handleNavigate} />
      )}

      {page === "profile" && loggedIn && (
        <Profile onNavigate={handleNavigate} onLogout={handleLogout} />
      )}

    </div>
  );
}

export default App;