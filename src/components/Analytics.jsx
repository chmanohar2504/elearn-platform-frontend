import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import "./analytics.css";

/* ── LINE CHART ── */
const LineChart = () => {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    canvas.width = W; canvas.height = H;

    const data   = [68, 75, 62, 80, 75, 85, 92];
    const labels = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
    const yTicks = [0, 25, 50, 75, 100];
    const pL=48, pR=20, pT=16, pB=40;
    const cW=W-pL-pR, cH=H-pT-pB;
    const toX=(i)=>pL+(i/(data.length-1))*cW;
    const toY=(v)=>pT+cH-(v/100)*cH;

    ctx.clearRect(0,0,W,H);

    yTicks.forEach(v=>{
      const y=toY(v);
      ctx.beginPath(); ctx.moveTo(pL,y); ctx.lineTo(W-pR,y);
      ctx.strokeStyle="rgba(255,255,255,0.06)"; ctx.lineWidth=1; ctx.stroke();
      ctx.fillStyle="rgba(255,255,255,0.28)";
      ctx.font="11px 'Space Grotesk',sans-serif";
      ctx.textAlign="right"; ctx.fillText(v, pL-8, y+4);
    });

    labels.forEach((l,i)=>{
      ctx.fillStyle="rgba(255,255,255,0.28)";
      ctx.font="11px 'Space Grotesk',sans-serif";
      ctx.textAlign="center"; ctx.fillText(l, toX(i), H-8);
    });

    const grad=ctx.createLinearGradient(0,pT,0,pT+cH);
    grad.addColorStop(0,"rgba(46,204,113,0.22)");
    grad.addColorStop(1,"rgba(46,204,113,0.00)");

    ctx.beginPath(); ctx.moveTo(toX(0),toY(data[0]));
    data.forEach((v,i)=>{
      if(!i) return;
      const cx=(toX(i-1)+toX(i))/2;
      ctx.bezierCurveTo(cx,toY(data[i-1]),cx,toY(v),toX(i),toY(v));
    });
    ctx.lineTo(toX(data.length-1),pT+cH);
    ctx.lineTo(toX(0),pT+cH); ctx.closePath();
    ctx.fillStyle=grad; ctx.fill();

    ctx.beginPath(); ctx.moveTo(toX(0),toY(data[0]));
    data.forEach((v,i)=>{
      if(!i) return;
      const cx=(toX(i-1)+toX(i))/2;
      ctx.bezierCurveTo(cx,toY(data[i-1]),cx,toY(v),toX(i),toY(v));
    });
    ctx.strokeStyle="#2ecc71"; ctx.lineWidth=2.5; ctx.stroke();

    data.forEach((v,i)=>{
      ctx.beginPath(); ctx.arc(toX(i),toY(v),5,0,Math.PI*2);
      ctx.fillStyle="#2ecc71"; ctx.strokeStyle="#0f1810";
      ctx.lineWidth=2; ctx.fill(); ctx.stroke();
    });
  },[]);
  return <canvas ref={ref} className="ana-canvas" />;
};

/* ── BAR CHART ── */
const BarChart = () => {
  const ref = useRef(null);
  useEffect(()=>{
    const canvas=ref.current; if(!canvas) return;
    const ctx=canvas.getContext("2d");
    const W=canvas.offsetWidth, H=canvas.offsetHeight;
    canvas.width=W; canvas.height=H;

    const topics=[
      {label:"React",          val:85, color:"#2ecc71"},
      {label:"JavaScript",     val:72, color:"#2ecc71"},
      {label:"Algorithms",     val:45, color:"#ff4757"},
      {label:"AI & ML",        val:68, color:"#2ecc71"},
      {label:"Data Structures",val:55, color:"#2ecc71"},
      {label:"Mathematics",    val:90, color:"#2ecc71"},
    ];
    const xTicks=[0,25,50,75,100];
    const pL=110, pR=40, pT=16, pB=30;
    const cW=W-pL-pR, cH=H-pT-pB;
    const rowH=cH/topics.length;
    const barH=rowH*0.52;
    const toX=(v)=>pL+(v/100)*cW;

    ctx.clearRect(0,0,W,H);

    xTicks.forEach(v=>{
      const x=toX(v);
      ctx.beginPath(); ctx.moveTo(x,pT); ctx.lineTo(x,pT+cH);
      ctx.strokeStyle="rgba(255,255,255,0.06)"; ctx.lineWidth=1; ctx.stroke();
      ctx.fillStyle="rgba(255,255,255,0.28)";
      ctx.font="10px 'Space Grotesk',sans-serif";
      ctx.textAlign="center"; ctx.fillText(v, x, H-6);
    });

    topics.forEach((t,i)=>{
      const y=pT+i*rowH+(rowH-barH)/2;
      ctx.fillStyle="rgba(255,255,255,0.06)";
      ctx.fillRect(pL,y,cW,barH);
      ctx.fillStyle=t.color;
      const bw=(t.val/100)*cW;
      ctx.beginPath();
      ctx.roundRect(pL,y,bw,barH,4);
      ctx.fill();
      ctx.fillStyle="rgba(255,255,255,0.32)";
      ctx.font="11px 'Space Grotesk',sans-serif";
      ctx.textAlign="right"; ctx.fillText(t.label, pL-8, y+barH/2+4);
    });
  },[]);
  return <canvas ref={ref} className="ana-canvas-bar" />;
};

/* ── RADAR CHART ── */
const RadarChart = () => {
  const ref = useRef(null);
  useEffect(()=>{
    const canvas=ref.current; if(!canvas) return;
    const ctx=canvas.getContext("2d");
    const S=canvas.offsetWidth;
    canvas.width=S; canvas.height=S;

    const cx=S/2, cy=S/2+10, R=S*0.32;
    const skills=[
      {label:"React",           val:0.85},
      {label:"JavaScript",      val:0.72},
      {label:"Algorithms",      val:0.45},
      {label:"AI & ML",         val:0.68},
      {label:"Data Structures", val:0.55},
      {label:"Mathematics",     val:0.90},
    ];
    const n=skills.length;
    const angle=(i)=>(Math.PI*2*(i/n))-(Math.PI/2);

    ctx.clearRect(0,0,S,S);

    [0.25,0.5,0.75,1].forEach(r=>{
      ctx.beginPath();
      for(let i=0;i<n;i++){
        const a=angle(i);
        const x=cx+R*r*Math.cos(a), y=cy+R*r*Math.sin(a);
        i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
      }
      ctx.closePath();
      ctx.strokeStyle="rgba(46,204,113,0.15)"; ctx.lineWidth=1; ctx.stroke();
    });

    skills.forEach((_,i)=>{
      const a=angle(i);
      ctx.beginPath(); ctx.moveTo(cx,cy);
      ctx.lineTo(cx+R*Math.cos(a), cy+R*Math.sin(a));
      ctx.strokeStyle="rgba(46,204,113,0.12)"; ctx.lineWidth=1; ctx.stroke();
    });

    ctx.beginPath();
    skills.forEach((s,i)=>{
      const a=angle(i);
      const x=cx+R*s.val*Math.cos(a), y=cy+R*s.val*Math.sin(a);
      i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
    });
    ctx.closePath();
    ctx.fillStyle="rgba(46,204,113,0.14)"; ctx.fill();
    ctx.strokeStyle="#2ecc71"; ctx.lineWidth=2; ctx.stroke();

    skills.forEach((s,i)=>{
      const a=angle(i);
      const x=cx+R*s.val*Math.cos(a), y=cy+R*s.val*Math.sin(a);
      ctx.beginPath(); ctx.arc(x,y,4,0,Math.PI*2);
      ctx.fillStyle="#2ecc71"; ctx.fill();
    });

    ctx.fillStyle="rgba(255,255,255,0.55)";
    ctx.font="11px 'Space Grotesk',sans-serif";
    skills.forEach((s,i)=>{
      const a=angle(i);
      const lx=cx+(R+22)*Math.cos(a), ly=cy+(R+22)*Math.sin(a);
      ctx.textAlign=lx<cx-5?"right":lx>cx+5?"left":"center";
      ctx.fillText(s.label, lx, ly+4);
    });
  },[]);
  return <canvas ref={ref} className="ana-canvas-radar" />;
};

/* ── DONUT CHART ── */
const DonutChart = () => {
  const ref = useRef(null);
  const [tooltip, setTooltip] = useState(null);

  const segments = [
    {label:"Completed",   val:2, color:"#2ecc71", pct:22},
    {label:"In Progress", val:2, color:"#1aba60",  pct:22},
    {label:"Not Started", val:5, color:"#1f3522",  pct:56},
  ];

  useEffect(()=>{
    const canvas=ref.current; if(!canvas) return;
    const ctx=canvas.getContext("2d");
    const S=canvas.offsetWidth;
    canvas.width=S; canvas.height=S;
    const cx=S/2, cy=S/2, R=S*0.38, inner=S*0.24;

    ctx.clearRect(0,0,S,S);
    let start=-Math.PI/2;
    const total=segments.reduce((a,s)=>a+s.val,0);

    segments.forEach(s=>{
      const sweep=(s.val/total)*Math.PI*2;
      ctx.beginPath(); ctx.moveTo(cx,cy);
      ctx.arc(cx,cy,R,start,start+sweep);
      ctx.closePath();
      ctx.fillStyle=s.color; ctx.fill();
      start+=sweep;
    });

    ctx.beginPath(); ctx.arc(cx,cy,inner,0,Math.PI*2);
    ctx.fillStyle="#0f1810"; ctx.fill();
  },[]);

  return (
    <div className="donut-wrap">
      <canvas ref={ref} className="ana-canvas-donut"
        onMouseLeave={()=>setTooltip(null)} />
      {tooltip && (
        <div className="donut-tooltip" style={{top:tooltip.y, left:tooltip.x}}>
          <strong>{tooltip.label}</strong>
          <span>{tooltip.val} courses ({tooltip.pct}%)</span>
        </div>
      )}
      <div className="donut-legend">
        {segments.map((s,i)=>(
          <div className="donut-leg-item" key={i} title={`${s.label}: ${s.val} courses`}>
            <span className="leg-dot" style={{background:s.color}} />
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════
   ANALYTICS PAGE
══════════════════════════════════════════ */
const Analytics = ({ onNavigate }) => {
  const stats = [
    {
      icon:(
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20">
          <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
        </svg>
      ),
      val:"69%", label:"Avg. Score",
    },
    {
      icon:(
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20">
          <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/>
          <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
        </svg>
      ),
      val:"4", label:"Courses Enrolled",
    },
    {
      icon:(
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20">
          <circle cx="12" cy="8" r="6"/>
          <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
        </svg>
      ),
      val:"42", label:"Quizzes Taken",
    },
    {
      icon:(
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
          <polyline points="17 6 23 6 23 12"/>
        </svg>
      ),
      val:"+12%", label:"Weekly Growth",
    },
  ];

  const improve = [
    {topic:"Algorithms",      pct:45, tip:"Review fundamentals and practice more."},
    {topic:"Data Structures", pct:55, tip:"Practice with more complex problems."},
  ];

  return (
    <div className="ana-page">
      <Navbar onNavigate={onNavigate} activePage="analytics" loggedIn={true} />

      <div className="ana-wrap">

        <div className="ana-heading">
          <h1>Analytics</h1>
          <p>Track your learning journey with detailed insights.</p>
        </div>

        <div className="ana-stats-row">
          {stats.map((s,i)=>(
            <div className="ana-stat-card" key={i}>
              <span className="ana-stat-icon">{s.icon}</span>
              <div className="ana-stat-val">{s.val}</div>
              <div className="ana-stat-lbl">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="ana-mid-row">
          <div className="ana-card">
            <h3 className="ana-card-title">Weekly Progress</h3>
            <LineChart />
          </div>
          <div className="ana-card">
            <h3 className="ana-card-title">Topic Performance</h3>
            <BarChart />
          </div>
        </div>

        <div className="ana-bot-row">
          <div className="ana-card">
            <h3 className="ana-card-title">Skill Radar</h3>
            <RadarChart />
          </div>
          <div className="ana-card">
            <h3 className="ana-card-title">Course Completion</h3>
            <DonutChart />
          </div>
          <div className="ana-card">
            <h3 className="ana-card-title">Areas to Improve</h3>
            <div className="improve-list">
              {improve.map((item,i)=>(
                <div className="improve-item" key={i}>
                  <div className="improve-header">
                    <span className="improve-topic">{item.topic}</span>
                    <span className="improve-pct">{item.pct}%</span>
                  </div>
                  <div className="improve-bar">
                    <div className="improve-fill" style={{width:`${item.pct}%`}} />
                  </div>
                  <div className="improve-tip">{item.tip}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Analytics;