'use client'
import { useState, useEffect } from "react";

// ============================================
// DATA & CONFIG
// ============================================
const PLATFORMS = [
  { name: "Instagram", color: "#E1306C", gradient: "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)", services: ["Followers","Likes","Views","Comments","Story Views","Reels Views"] },
  { name: "TikTok", color: "#00f2ea", gradient: "linear-gradient(45deg,#00f2ea,#ff0050)", services: ["Followers","Views","Likes","Shares","Comments"] },
  { name: "YouTube", color: "#FF0000", gradient: "linear-gradient(45deg,#FF0000,#cc0000)", services: ["Subscribers","Views","Likes","Comments","Watch Time"] },
  { name: "Twitter/X", color: "#fff", gradient: "linear-gradient(45deg,#1da1f2,#0d8bd9)", services: ["Followers","Likes","Retweets","Views","Replies"] },
  { name: "Facebook", color: "#1877F2", gradient: "linear-gradient(45deg,#1877F2,#0d65e0)", services: ["Page Likes","Followers","Post Likes","Views","Shares"] },
  { name: "Telegram", color: "#0088cc", gradient: "linear-gradient(45deg,#0088cc,#005580)", services: ["Members","Views","Reactions","Shares"] },
  { name: "Snapchat", color: "#FFFC00", gradient: "linear-gradient(45deg,#FFFC00,#f0ed00)", services: ["Followers","Views","Story Views"] },
  { name: "Spotify", color: "#1DB954", gradient: "linear-gradient(45deg,#1DB954,#158a3e)", services: ["Followers","Plays","Monthly Listeners"] },
];

const PLATFORM_ICONS = {
  Instagram: () => (
    <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="url(#ig)" strokeWidth="2"/>
      <circle cx="12" cy="12" r="4" stroke="url(#ig)" strokeWidth="2"/>
      <circle cx="17.5" cy="6.5" r="1.2" fill="#E1306C"/>
      <defs><linearGradient id="ig" x1="0" y1="24" x2="24" y2="0"><stop stopColor="#f09433"/><stop offset="0.25" stopColor="#e6683c"/><stop offset="0.5" stopColor="#dc2743"/><stop offset="0.75" stopColor="#cc2366"/><stop offset="1" stopColor="#bc1888"/></linearGradient></defs>
    </svg>
  ),
  TikTok: () => (
    <svg viewBox="0 0 24 24" fill="white" width="22" height="22">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
    </svg>
  ),
  YouTube: () => (
    <svg viewBox="0 0 24 24" width="22" height="22">
      <path fill="#FF0000" d="M23.5 6.19a3 3 0 0 0-2.12-2.12C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.57A3 3 0 0 0 .5 6.19C0 8.03 0 12 0 12s0 3.97.5 5.81a3 3 0 0 0 2.12 2.12C4.46 20.5 12 20.5 12 20.5s7.54 0 9.38-.57a3 3 0 0 0 2.12-2.12C24 15.97 24 12 24 12s0-3.97-.5-5.81z"/>
      <polygon fill="white" points="9.75,15.02 15.5,12 9.75,8.98"/>
    </svg>
  ),
  "Twitter/X": () => (
    <svg viewBox="0 0 24 24" fill="white" width="22" height="22">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  Facebook: () => (
    <svg viewBox="0 0 24 24" fill="#1877F2" width="22" height="22">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  Telegram: () => (
    <svg viewBox="0 0 24 24" fill="#0088cc" width="22" height="22">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.24 13.88l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.908.679z"/>
    </svg>
  ),
  Snapchat: () => (
    <svg viewBox="0 0 24 24" fill="#FFFC00" width="22" height="22">
      <path d="M12.166.006C9.579-.028 7.134 1.2 5.63 3.3c-.695.965-.996 2.07-.996 4.03v.745c-.468.234-.94.132-1.406-.09-.247-.12-.512-.12-.748.01-.48.26-.61.77-.31 1.22.15.22.49.57 1.15.91-.13.3-.38.89-.83 1.4-1.01 1.13-2.58 1.65-2.66 1.68-.25.08-.56.28-.54.63.02.28.24.5.52.55.04.01 1.01.19 2.07.73.04.21.07.42.12.63.05.22.24.38.46.38.12 0 .24-.04.34-.11.29-.2.6-.29.93-.29.37 0 .76.11 1.18.35.78.45 1.68.69 2.6.69 1.05 0 2.11-.33 2.97-.96.4-.29.76-.43 1.1-.43.32 0 .62.1.9.28.11.07.24.11.36.11.22 0 .41-.15.46-.38.05-.21.08-.43.12-.64 1.06-.54 2.03-.72 2.07-.73.28-.05.5-.27.52-.55.02-.35-.29-.55-.54-.63-.08-.03-1.65-.55-2.66-1.68-.45-.51-.7-1.1-.83-1.4.66-.34 1-.69 1.15-.91.3-.45.17-.96-.31-1.22-.24-.13-.5-.13-.75.01-.47.22-.94.32-1.4.09v-.75c0-2.29-.48-3.62-1.54-4.68C14.93.48 13.57.02 12.17.006z"/>
    </svg>
  ),
  Spotify: () => (
    <svg viewBox="0 0 24 24" fill="#1DB954" width="22" height="22">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
    </svg>
  ),
};

const PRICES = { Instagram: 149, TikTok: 79, YouTube: 249, "Twitter/X": 129, Facebook: 99, Telegram: 89, Snapchat: 109, Spotify: 119 };

const MOCK_ORDERS = [
  { id: "#4821", platform: "Instagram", service: "Followers", qty: 5000, status: "Completed", date: "Today 10:32", progress: 100, user: "john@gmail.com", paid: 745 },
  { id: "#4820", platform: "TikTok", service: "Views", qty: 10000, status: "In Progress", date: "Today 09:15", progress: 62, user: "amara@gmail.com", paid: 790 },
  { id: "#4819", platform: "YouTube", service: "Subscribers", qty: 1000, status: "Pending", date: "Yesterday", progress: 0, user: "chidi@gmail.com", paid: 249 },
  { id: "#4818", platform: "Facebook", service: "Page Likes", qty: 2000, status: "Completed", date: "Yesterday", progress: 100, user: "fatima@gmail.com", paid: 198 },
];

const MOCK_USERS = [
  { id: 1, name: "John Kamau", email: "john@gmail.com", role: "user", balance: 1250, orders: 8, country: "🇰🇪" },
  { id: 2, name: "Amara Osei", email: "amara@gmail.com", role: "reseller", balance: 4500, orders: 34, country: "🇳🇬" },
  { id: 3, name: "Fatima Said", email: "fatima@gmail.com", role: "user", balance: 300, orders: 3, country: "🇿🇦" },
  { id: 4, name: "Mr Goodman", email: "goodman@risepanel.com", role: "owner", balance: 999999, orders: 12, country: "🇰🇪" },
];

const STATUS = {
  Completed: { color: "#22c55e", bg: "rgba(34,197,94,0.12)" },
  "In Progress": { color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
  Pending: { color: "#818cf8", bg: "rgba(129,140,248,0.12)" },
  Cancelled: { color: "#ef4444", bg: "rgba(239,68,68,0.12)" },
};

// ============================================
// GLOBAL STYLES
// ============================================
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
  *{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent;}
  html,body{font-family:'Plus Jakarta Sans',sans-serif;background:#080a12;color:#fff;overflow-x:hidden;}
  ::-webkit-scrollbar{width:3px;}
  ::-webkit-scrollbar-thumb{background:#1e2235;border-radius:4px;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
  @keyframes glow{0%,100%{box-shadow:0 0 20px rgba(99,102,241,0.25)}50%{box-shadow:0 0 40px rgba(99,102,241,0.5)}}
  @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
  @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
  @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
  @keyframes slideUp{from{transform:translateY(100%);opacity:0}to{transform:translateY(0);opacity:1}}
  .fade{animation:fadeUp 0.35s ease forwards;}
  .fadeIn{animation:fadeIn 0.3s ease forwards;}
  .card{background:#0e1020;border:1px solid rgba(255,255,255,0.06);border-radius:20px;}
  .glass{background:rgba(255,255,255,0.04);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.07);border-radius:16px;}
  .input{background:rgba(255,255,255,0.05);border:1.5px solid rgba(255,255,255,0.08);color:#fff;padding:14px 16px;border-radius:14px;font-family:'Plus Jakarta Sans',sans-serif;font-size:15px;width:100%;outline:none;transition:all 0.2s;}
  .input:focus{border-color:rgba(99,102,241,0.5);background:rgba(99,102,241,0.06);}
  .input::placeholder{color:rgba(255,255,255,0.2);}
  .select{background:#0e1020;border:1.5px solid rgba(255,255,255,0.08);color:#fff;padding:14px 16px;border-radius:14px;font-family:'Plus Jakarta Sans',sans-serif;font-size:15px;width:100%;outline:none;cursor:pointer;appearance:none;}
  .btn{padding:14px 24px;border-radius:14px;font-family:'Plus Jakarta Sans',sans-serif;font-weight:700;font-size:15px;cursor:pointer;transition:all 0.2s;border:none;letter-spacing:0.2px;touch-action:manipulation;}
  .btn-primary{background:linear-gradient(135deg,#6366f1,#4f46e5);color:#fff;box-shadow:0 4px 20px rgba(99,102,241,0.3);}
  .btn-primary:active{transform:scale(0.97);}
  .btn-ghost{background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.8);border:1px solid rgba(255,255,255,0.09);}
  .btn-ghost:active{background:rgba(255,255,255,0.1);}
  .btn-danger{background:rgba(239,68,68,0.1);color:#ef4444;border:1px solid rgba(239,68,68,0.2);}
  .label{font-size:12px;color:rgba(255,255,255,0.35);font-weight:600;letter-spacing:0.6px;text-transform:uppercase;}
  .tag{display:inline-block;padding:4px 12px;border-radius:100px;font-size:11px;font-weight:700;letter-spacing:0.5px;text-transform:uppercase;}
  .pill{padding:4px 10px;border-radius:100px;font-size:11px;font-weight:700;}
  .shimmer-text{background:linear-gradient(90deg,#fff 0%,#818cf8 40%,#a78bfa 60%,#fff 100%);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:shimmer 4s linear infinite;}
  .grid-bg{background-image:radial-gradient(rgba(99,102,241,0.06) 1px,transparent 1px);background-size:24px 24px;}
  .bottom-nav{position:fixed;bottom:0;left:0;right:0;background:rgba(8,10,18,0.95);backdrop-filter:blur(24px);border-top:1px solid rgba(255,255,255,0.07);padding:10px 0 20px;z-index:100;display:flex;justify-content:space-around;align-items:center;}
  .bottom-nav-item{display:flex;flex-direction:column;align-items:center;gap:4px;padding:6px 16px;border-radius:14px;cursor:pointer;transition:all 0.2s;color:rgba(255,255,255,0.35);font-size:11px;font-weight:600;min-width:56px;}
  .bottom-nav-item.active{color:#818cf8;}
  .bottom-nav-icon{font-size:22px;line-height:1;}
  .top-bar{position:sticky;top:0;z-index:50;background:rgba(8,10,18,0.9);backdrop-filter:blur(20px);border-bottom:1px solid rgba(255,255,255,0.05);padding:14px 18px;display:flex;justify-content:space-between;align-items:center;}
  .section{padding:18px;}
  .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.7);backdrop-filter:blur(8px);z-index:200;display:flex;align-items:flex-end;justify-content:center;}
  .modal{background:#0e1020;border:1px solid rgba(255,255,255,0.08);border-radius:28px 28px 0 0;padding:28px 20px 40px;width:100%;max-width:480px;animation:slideUp 0.3s ease;}
  .row{display:flex;align-items:center;gap:14px;padding:14px;border-radius:14px;transition:background 0.15s;cursor:pointer;}
  .row:active{background:rgba(255,255,255,0.04);}
  .card-input{background:rgba(255,255,255,0.04);border:1.5px solid rgba(255,255,255,0.08);border-radius:14px;padding:16px;transition:border-color 0.2s;}
  .card-input:focus-within{border-color:rgba(99,102,241,0.4);}
`;

// ============================================
// SMALL COMPONENTS
// ============================================
function Logo({ size = 15, white = false }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ width: size * 2.2, height: size * 2.2, background: "linear-gradient(135deg,#6366f1,#4f46e5)", borderRadius: size * 0.55, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(99,102,241,0.4)" }}>
        <span style={{ fontSize: size * 0.95, filter: "brightness(10)" }}>⚡</span>
      </div>
      <span style={{ fontSize: size * 1.15, fontWeight: 800, letterSpacing: "-0.5px", color: white ? "#fff" : "#fff" }}>Rise<span style={{ color: "#818cf8" }}>Panel</span></span>
    </div>
  );
}

function PlatformIcon({ name, size = 22 }) {
  const Icon = PLATFORM_ICONS[name];
  if (!Icon) return <span style={{ fontSize: size }}>📱</span>;
  return <Icon size={size} />;
}

function StatusBadge({ status }) {
  const s = STATUS[status] || STATUS.Pending;
  return <span className="pill" style={{ background: s.bg, color: s.color }}>{status}</span>;
}

function StatCard({ icon, label, value, sub, color = "#818cf8", onClick }) {
  return (
    <div className="card" style={{ padding: "18px 16px", cursor: onClick ? "pointer" : "default" }} onClick={onClick}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <span className="label">{label}</span>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{icon}</div>
      </div>
      <div style={{ fontSize: 24, fontWeight: 800, color, letterSpacing: "-0.5px" }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

// ============================================
// CARD PAYMENT INPUT
// ============================================
function CardInput() {
  const [num, setNum] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const formatCard = v => v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})/g, "$1 ").trim();
  const formatExpiry = v => { const d = v.replace(/\D/g, "").slice(0, 4); return d.length >= 3 ? `${d.slice(0,2)}/${d.slice(2)}` : d; };

  const cardType = () => {
    const n = num.replace(/\s/g, "");
    if (n.startsWith("4")) return "💳 Visa";
    if (n.startsWith("5")) return "💳 Mastercard";
    if (n.startsWith("3")) return "💳 Amex";
    return "💳 Card";
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {/* Card preview */}
      <div style={{ background: "linear-gradient(135deg,#1a1f35,#252b47)", borderRadius: 18, padding: "22px 20px", position: "relative", overflow: "hidden", minHeight: 160 }}>
        <div style={{ position: "absolute", top: -30, right: -30, width: 140, height: 140, borderRadius: "50%", background: "rgba(99,102,241,0.12)" }} />
        <div style={{ position: "absolute", bottom: -40, left: -20, width: 160, height: 160, borderRadius: "50%", background: "rgba(129,140,248,0.07)" }} />
        <div style={{ position: "relative" }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 20, fontWeight: 600 }}>{cardType()}</div>
          <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: 3, marginBottom: 20, color: num ? "#fff" : "rgba(255,255,255,0.25)" }}>
            {num || "•••• •••• •••• ••••"}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", marginBottom: 2 }}>CARDHOLDER</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: name ? "#fff" : "rgba(255,255,255,0.25)" }}>{name || "YOUR NAME"}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", marginBottom: 2 }}>EXPIRES</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: expiry ? "#fff" : "rgba(255,255,255,0.25)" }}>{expiry || "MM/YY"}</div>
            </div>
          </div>
        </div>
      </div>
      {/* Inputs */}
      <input className="input" placeholder="Card number" value={num} onChange={e => setNum(formatCard(e.target.value))} inputMode="numeric" />
      <input className="input" placeholder="Cardholder name" value={name} onChange={e => setName(e.target.value.toUpperCase())} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <input className="input" placeholder="MM/YY" value={expiry} onChange={e => setExpiry(formatExpiry(e.target.value))} inputMode="numeric" />
        <input className="input" placeholder="CVV" value={cvv} onChange={e => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))} inputMode="numeric" type="password" />
      </div>
    </div>
  );
}

// ============================================
// LANDING PAGE
// ============================================
function Landing({ onNavigate }) {
  const [qty, setQty] = useState(1000);
  const [platform, setPlatform] = useState("Instagram");
  const [username, setUsername] = useState("");
  const [ordered, setOrdered] = useState(false);
  const price = ((PRICES[platform] || 149) * qty / 1000).toFixed(0);

  return (
    <div style={{ minHeight: "100vh", paddingBottom: 40 }}>
      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 99, padding: "0 18px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(8,10,18,0.92)", backdropFilter: "blur(24px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <Logo size={14} />
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-ghost" style={{ padding: "9px 18px", fontSize: 13 }} onClick={() => onNavigate("login")}>Login</button>
          <button className="btn btn-primary" style={{ padding: "9px 18px", fontSize: 13 }} onClick={() => onNavigate("signup")}>Sign Up</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="grid-bg" style={{ padding: "52px 20px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 400, height: 400, background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", animation: "fadeUp 0.6s ease" }}>
          <span className="tag" style={{ background: "rgba(99,102,241,0.12)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.2)", marginBottom: 20, display: "inline-block" }}>🌍 50,000+ creators worldwide</span>
          <h1 style={{ fontSize: "clamp(36px,8vw,64px)", fontWeight: 800, letterSpacing: "-2px", lineHeight: 1.08, marginBottom: 18 }}>
            Grow Your Socials<br /><span className="shimmer-text">10x Faster</span>
          </h1>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, marginBottom: 32, maxWidth: 340, margin: "0 auto 32px", fontWeight: 400 }}>
            Real followers, views & likes. The most affordable SMM panel. Pay with card or crypto.
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn btn-primary" style={{ fontSize: 15, animation: "glow 2s infinite" }} onClick={() => onNavigate("signup")}>Start Free ⚡</button>
            <button className="btn btn-ghost" style={{ fontSize: 15 }} onClick={() => onNavigate("login")}>View Dashboard</button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: "0 18px 36px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}>
          {[["50K+","Happy Customers","👥"],["2M+","Orders Delivered","📦"],["99.9%","Uptime","⚡"],["24/7","Live Support","💬"]].map(([v,l,i]) => (
            <div key={l} className="glass" style={{ padding: "18px 16px", textAlign: "center" }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{i}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#818cf8" }}>{v}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PLATFORMS */}
      <section style={{ padding: "0 18px 36px" }}>
        <div style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.5px" }}>All Platforms</h2>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 14, marginTop: 4 }}>8 platforms · 30+ services</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
          {PLATFORMS.map(p => (
            <div key={p.name} className="glass" style={{ padding: "14px 8px", textAlign: "center", cursor: "pointer", transition: "all 0.2s" }} onClick={() => onNavigate("signup")}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}><PlatformIcon name={p.name} size={26} /></div>
              <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>{p.name.split("/")[0]}</div>
            </div>
          ))}
        </div>
      </section>

      {/* LIVE ORDER DEMO */}
      <section style={{ padding: "0 18px 36px" }}>
        <div style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.5px" }}>Try It Now</h2>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 14, marginTop: 4 }}>See how simple ordering is</p>
        </div>
        <div className="card" style={{ padding: 20 }}>
          {!ordered ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <div className="label" style={{ marginBottom: 10 }}>Platform</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
                  {PLATFORMS.slice(0,4).map(p => (
                    <div key={p.name} onClick={() => setPlatform(p.name)} style={{ padding: "10px 6px", borderRadius: 12, border: `1.5px solid ${platform === p.name ? "rgba(99,102,241,0.5)" : "rgba(255,255,255,0.07)"}`, background: platform === p.name ? "rgba(99,102,241,0.1)" : "rgba(255,255,255,0.03)", textAlign: "center", cursor: "pointer", transition: "all 0.2s" }}>
                      <div style={{ display: "flex", justifyContent: "center", marginBottom: 4 }}><PlatformIcon name={p.name} size={20} /></div>
                      <div style={{ fontSize: 10, fontWeight: 600, color: platform === p.name ? "#818cf8" : "rgba(255,255,255,0.5)" }}>{p.name.split("/")[0]}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span className="label">Quantity</span>
                  <span style={{ fontSize: 14, fontWeight: 700 }}>{qty.toLocaleString()}</span>
                </div>
                <input type="range" min={100} max={50000} step={100} value={qty} onChange={e => setQty(+e.target.value)} style={{ width: "100%", accentColor: "#6366f1", height: 4 }} />
              </div>
              <input className="input" placeholder="@yourusername (no password needed)" value={username} onChange={e => setUsername(e.target.value)} />
              <div style={{ background: "rgba(99,102,241,0.07)", border: "1px solid rgba(99,102,241,0.15)", borderRadius: 14, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div className="label">Total Price</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: "#818cf8" }}>KSh {price}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div className="label">Delivery</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#22c55e" }}>~5 min ⚡</div>
                </div>
              </div>
              <button className="btn btn-primary" style={{ width: "100%", fontSize: 16 }} onClick={() => username ? setOrdered(true) : onNavigate("signup")}>
                {username ? "🚀 Place Order" : "Sign Up to Order →"}
              </button>
              <div style={{ textAlign: "center", fontSize: 12, color: "rgba(255,255,255,0.2)" }}>🔒 No password needed · Secure · Results in minutes</div>
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "20px 0", animation: "fadeUp 0.4s ease" }}>
              <div style={{ fontSize: 52, marginBottom: 14, animation: "float 2s ease infinite" }}>🎉</div>
              <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Demo Order Placed!</h3>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, marginBottom: 20 }}>
                {qty.toLocaleString()} for <span style={{ color: "#818cf8" }}>{username}</span> on {platform}
              </p>
              <div style={{ background: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.15)", borderRadius: 14, padding: 14, marginBottom: 20 }}>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginBottom: 8 }}>Progress</div>
                <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 100, height: 6, overflow: "hidden" }}>
                  <div style={{ width: "40%", height: "100%", background: "linear-gradient(90deg,#22c55e,#16a34a)", borderRadius: 100 }} />
                </div>
                <div style={{ fontSize: 13, color: "#22c55e", marginTop: 8 }}>Processing... 40%</div>
              </div>
              <button className="btn btn-primary" style={{ width: "100%" }} onClick={() => onNavigate("signup")}>Create Real Account →</button>
            </div>
          )}
        </div>
      </section>

      {/* PRICING */}
      <section style={{ padding: "0 18px 40px" }}>
        <div style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.5px" }}>Simple Pricing</h2>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 14, marginTop: 4 }}>Card or crypto · No hidden fees</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            { name: "Starter", price: "KSh 99", desc: "Perfect to start", features: ["1,000 Followers","Fast Delivery","Email Support"], popular: false },
            { name: "Growth", price: "KSh 299", desc: "Most popular 🔥", features: ["5,000 Followers","Instant Delivery","Priority Support","Refill Guarantee"], popular: true },
            { name: "Viral", price: "KSh 799", desc: "Go massive", features: ["20,000 Followers","Turbo Delivery","VIP Support","Refill Guarantee","Analytics"], popular: false },
          ].map((p, i) => (
            <div key={i} className="card" style={{ padding: 22, border: p.popular ? "1px solid rgba(99,102,241,0.35)" : "1px solid rgba(255,255,255,0.06)", background: p.popular ? "rgba(99,102,241,0.07)" : "#0e1020", position: "relative" }}>
              {p.popular && <div style={{ position: "absolute", top: -12, right: 20, background: "linear-gradient(135deg,#6366f1,#4f46e5)", padding: "4px 16px", borderRadius: 100, fontSize: 11, fontWeight: 700 }}>MOST POPULAR</div>}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: p.popular ? "#818cf8" : "#fff" }}>{p.name}</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{p.desc}</div>
                </div>
                <div style={{ fontSize: 28, fontWeight: 800 }}>{p.price}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
                {p.features.map(f => <div key={f} style={{ display: "flex", gap: 8, fontSize: 14, color: "rgba(255,255,255,0.7)" }}><span style={{ color: "#22c55e" }}>✓</span>{f}</div>)}
              </div>
              <button className={`btn ${p.popular ? "btn-primary" : "btn-ghost"}`} style={{ width: "100%" }} onClick={() => onNavigate("signup")}>Get Started →</button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "0 18px 40px" }}>
        <div style={{ background: "linear-gradient(135deg,rgba(99,102,241,0.15),rgba(79,70,229,0.08))", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 24, padding: "36px 24px", textAlign: "center" }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 10 }}>Ready to Go Viral? 🚀</h2>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 15, marginBottom: 24 }}>Join 50,000+ creators growing on RisePanel</p>
          <button className="btn btn-primary" style={{ width: "100%", fontSize: 16 }} onClick={() => onNavigate("signup")}>Create Free Account</button>
          <div style={{ marginTop: 14, fontSize: 12, color: "rgba(255,255,255,0.2)" }}>No credit card · Results in minutes · Cancel anytime</div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "24px 18px", borderTop: "1px solid rgba(255,255,255,0.05)", textAlign: "center" }}>
        <Logo size={13} />
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.2)", marginTop: 12 }}>© 2026 RisePanel · Built for the World 🌍</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 12 }}>
          {["Terms","Privacy","Support"].map(l => <span key={l} style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", cursor: "pointer" }}>{l}</span>)}
        </div>
      </footer>
    </div>
  );
}

// ============================================
// AUTH PAGE
// ============================================
function Auth({ mode, onNavigate, onLogin }) {
  const [isLogin, setIsLogin] = useState(mode === "login");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handle = () => {
    setError("");
    if (!email || !pass) { setError("Please fill in all fields"); return; }
    if (!isLogin && !name) { setError("Please enter your name"); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const isOwner = email === "goodman@risepanel.com" && pass === "admin2026";
      onLogin({ name: name || (isOwner ? "Mr Goodman" : "User"), email, role: isOwner ? "owner" : "user", balance: isOwner ? 999999 : 500 });
    }, 1400);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", padding: "24px 20px" }} className="grid-bg">
      <div style={{ marginBottom: 32, display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={() => onNavigate("landing")} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 18, color: "#fff" }}>←</button>
        <Logo size={13} />
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: 400, width: "100%", margin: "0 auto", animation: "fadeUp 0.4s ease" }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 8 }}>{isLogin ? "Welcome back 👋" : "Create account 🚀"}</h1>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)" }}>{isLogin ? "Login to your RisePanel account" : "Join 50,000+ creators growing their socials"}</p>
        </div>

        {error && (
          <div style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 12, padding: "12px 16px", fontSize: 14, color: "#f87171", marginBottom: 18 }}>{error}</div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {!isLogin && <input className="input" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} />}
          <input className="input" type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} inputMode="email" />
          <div style={{ position: "relative" }}>
            <input className="input" type={showPass ? "text" : "password"} placeholder="Password" value={pass} onChange={e => setPass(e.target.value)} style={{ paddingRight: 48 }} />
            <button onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "rgba(255,255,255,0.4)" }}>
              {showPass ? "🙈" : "👁️"}
            </button>
          </div>
          {isLogin && <div style={{ textAlign: "right" }}><span style={{ fontSize: 14, color: "#818cf8", cursor: "pointer" }}>Forgot password?</span></div>}
          <button className="btn btn-primary" style={{ width: "100%", fontSize: 16, padding: 16, marginTop: 4, opacity: loading ? 0.75 : 1 }} onClick={handle}>
            {loading ? "Please wait..." : isLogin ? "Login →" : "Create Free Account →"}
          </button>

          {isLogin && (
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "12px 16px", fontSize: 13, color: "rgba(255,255,255,0.4)", textAlign: "center" }}>
              👑 Admin? Use your owner email + password
            </div>
          )}

          <div style={{ textAlign: "center", fontSize: 15, color: "rgba(255,255,255,0.4)", marginTop: 8 }}>
            {isLogin ? "No account?" : "Already have one?"}
            <span style={{ color: "#818cf8", cursor: "pointer", marginLeft: 6, fontWeight: 700 }} onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Sign Up Free" : "Login"}
            </span>
          </div>
        </div>
      </div>
      {!isLogin && <div style={{ textAlign: "center", fontSize: 12, color: "rgba(255,255,255,0.2)", marginTop: 24 }}>By signing up you agree to our Terms & Privacy Policy</div>}
    </div>
  );
}

// ============================================
// USER DASHBOARD
// ============================================
function Dashboard({ user, onLogout, onNavigate }) {
  const [tab, setTab] = useState("home");
  const [platform, setPlatform] = useState("Instagram");
  const [service, setService] = useState("Followers");
  const [qty, setQty] = useState(1000);
  const [username, setUsername] = useState("");
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [balance, setBalance] = useState(user.balance);
  const [orderDone, setOrderDone] = useState(false);
  const [showFundModal, setShowFundModal] = useState(false);
  const [fundTab, setFundTab] = useState("card");
  const isOwner = user.role === "owner";
  const price = ((PRICES[platform] || 149) * qty / 1000).toFixed(0);
  const selectedP = PLATFORMS.find(p => p.name === platform);

  const placeOrder = () => {
    if (!username) return;
    const cost = isOwner ? 0 : Number(price);
    if (!isOwner && balance < cost) { alert("Insufficient balance. Please add funds."); return; }
    const o = { id: `#${Math.floor(Math.random()*9000+1000)}`, platform, service, qty, status: "Pending", date: "Just now", progress: 0, user: user.email, paid: cost };
    setOrders(p => [o, ...p]);
    if (!isOwner) setBalance(b => b - cost);
    setOrderDone(true);
    setUsername("");
    setTimeout(() => { setOrderDone(false); setTab("home"); }, 2500);
  };

  const TABS = [
    { id: "home", icon: "🏠", label: "Home" },
    { id: "order", icon: "➕", label: "Order" },
    { id: "orders", icon: "📦", label: "Orders" },
    { id: "profile", icon: "👤", label: "Profile" },
    ...(isOwner ? [{ id: "admin", icon: "👑", label: "Admin" }] : []),
  ];

  return (
    <div style={{ minHeight: "100vh", paddingBottom: 90 }}>
      {/* TOP BAR */}
      <div className="top-bar">
        <Logo size={13} />
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div onClick={() => setShowFundModal(true)} style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 10, padding: "7px 14px", cursor: "pointer" }}>
            <div style={{ fontSize: 12, color: "#818cf8", fontWeight: 700 }}>{isOwner ? "∞ Free" : `KSh ${balance.toLocaleString()}`}</div>
          </div>
          <div style={{ width: 36, height: 36, borderRadius: 100, background: "linear-gradient(135deg,#6366f1,#a855f7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, cursor: "pointer" }} onClick={() => setTab("profile")}>
            {user.name.split(" ").map(n => n[0]).join("").slice(0,2)}
          </div>
        </div>
      </div>

      {/* HOME */}
      {tab === "home" && (
        <div className="section fade">
          <div style={{ marginBottom: 20 }}>
            <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.5px" }}>{isOwner ? `Welcome 👑` : `Hey, ${user.name.split(" ")[0]} 👋`}</h1>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 14, marginTop: 3 }}>{isOwner ? "Owner · Unlimited free access" : "Your growth dashboard"}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
            <StatCard icon="📦" label="Total Orders" value={orders.length} sub="All time" />
            <StatCard icon="💳" label="Balance" value={isOwner ? "∞" : `KSh ${balance.toLocaleString()}`} sub={isOwner ? "Free forever" : "Available"} color={isOwner ? "#f59e0b" : "#818cf8"} onClick={() => setShowFundModal(true)} />
            <StatCard icon="📈" label="Growth" value="18.4K" sub="Followers gained" color="#22c55e" />
            <StatCard icon="⚡" label="Active" value="2" sub="Orders live" color="#f59e0b" />
          </div>

          {/* Quick order */}
          <div className="card" style={{ padding: 20, marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700 }}>Quick Order ⚡</h2>
              {isOwner && <span className="tag" style={{ background: "rgba(245,158,11,0.12)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.2)" }}>FREE</span>}
            </div>
            {orderDone ? (
              <div style={{ textAlign: "center", padding: "20px 0", animation: "fadeUp 0.3s ease" }}>
                <div style={{ fontSize: 44, marginBottom: 10 }}>✅</div>
                <div style={{ fontWeight: 800, fontSize: 18 }}>Order Placed!</div>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, marginTop: 6 }}>Delivery starts in ~5 minutes</div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <div className="label" style={{ marginBottom: 10 }}>Platform</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
                    {PLATFORMS.slice(0,4).map(p => (
                      <div key={p.name} onClick={() => { setPlatform(p.name); setService(PLATFORMS.find(x => x.name === p.name).services[0]); }} style={{ padding: "10px 4px", borderRadius: 12, border: `1.5px solid ${platform === p.name ? "rgba(99,102,241,0.5)" : "rgba(255,255,255,0.07)"}`, background: platform === p.name ? "rgba(99,102,241,0.1)" : "rgba(255,255,255,0.03)", textAlign: "center", cursor: "pointer", transition: "all 0.2s" }}>
                        <div style={{ display: "flex", justifyContent: "center", marginBottom: 4 }}><PlatformIcon name={p.name} size={20} /></div>
                        <div style={{ fontSize: 10, fontWeight: 600, color: platform === p.name ? "#818cf8" : "rgba(255,255,255,0.5)" }}>{p.name.split("/")[0]}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <select className="select" value={service} onChange={e => setService(e.target.value)}>
                  {selectedP?.services.map(s => <option key={s}>{s}</option>)}
                </select>
                <input className="input" placeholder="@yourusername (no password needed)" value={username} onChange={e => setUsername(e.target.value)} />
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span className="label">Quantity</span>
                    <span style={{ fontSize: 14, fontWeight: 700 }}>{qty.toLocaleString()}</span>
                  </div>
                  <input type="range" min={100} max={50000} step={100} value={qty} onChange={e => setQty(+e.target.value)} style={{ width: "100%", accentColor: "#6366f1" }} />
                </div>
                <div style={{ background: "rgba(99,102,241,0.07)", border: "1px solid rgba(99,102,241,0.15)", borderRadius: 14, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div className="label">Total</div>
                    <div style={{ fontSize: 24, fontWeight: 800, color: isOwner ? "#f59e0b" : "#818cf8" }}>{isOwner ? "FREE" : `KSh ${price}`}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div className="label">Delivery</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#22c55e" }}>~5 min ⚡</div>
                  </div>
                </div>
                <button className="btn btn-primary" style={{ width: "100%", fontSize: 16 }} onClick={placeOrder}>
                  {username ? "Place Order →" : "Enter username first"}
                </button>
              </div>
            )}
          </div>

          {/* Recent orders */}
          <div className="card" style={{ padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700 }}>Recent Orders</h2>
              <button className="btn btn-ghost" style={{ padding: "6px 14px", fontSize: 12 }} onClick={() => setTab("orders")}>See All</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {orders.slice(0,3).map((o, i) => (
                <div key={i} className="row">
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <PlatformIcon name={o.platform} size={22} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{o.platform} · {o.service}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>{(o.qty).toLocaleString()} · {o.date}</div>
                    {o.status === "In Progress" && (
                      <div style={{ marginTop: 6, background: "rgba(255,255,255,0.07)", borderRadius: 100, height: 3, overflow: "hidden" }}>
                        <div style={{ width: `${o.progress}%`, height: "100%", background: "#f59e0b", borderRadius: 100 }} />
                      </div>
                    )}
                  </div>
                  <StatusBadge status={o.status} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* NEW ORDER TAB */}
      {tab === "order" && (
        <div className="section fade">
          <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 6 }}>New Order</h1>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 14, marginBottom: 20 }}>Pick your platform and grow</p>
          <div className="card" style={{ padding: 20 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div>
                <div className="label" style={{ marginBottom: 12 }}>Select Platform</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
                  {PLATFORMS.map(p => (
                    <div key={p.name} onClick={() => { setPlatform(p.name); setService(PLATFORMS.find(x => x.name === p.name).services[0]); }} style={{ padding: "12px 6px", borderRadius: 14, border: `1.5px solid ${platform === p.name ? "rgba(99,102,241,0.5)" : "rgba(255,255,255,0.07)"}`, background: platform === p.name ? "rgba(99,102,241,0.1)" : "rgba(255,255,255,0.03)", textAlign: "center", cursor: "pointer", transition: "all 0.2s" }}>
                      <div style={{ display: "flex", justifyContent: "center", marginBottom: 5 }}><PlatformIcon name={p.name} size={22} /></div>
                      <div style={{ fontSize: 10, fontWeight: 600, color: platform === p.name ? "#818cf8" : "rgba(255,255,255,0.5)" }}>{p.name.split("/")[0]}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="label" style={{ marginBottom: 8 }}>Service</div>
                <select className="select" value={service} onChange={e => setService(e.target.value)}>
                  {selectedP?.services.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <div className="label" style={{ marginBottom: 8 }}>Username or Profile Link</div>
                <input className="input" placeholder="@yourusername" value={username} onChange={e => setUsername(e.target.value)} />
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", marginTop: 5 }}>🔒 We never ask for your password</div>
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span className="label">Quantity</span>
                  <span style={{ fontSize: 14, fontWeight: 700 }}>{qty.toLocaleString()}</span>
                </div>
                <input type="range" min={100} max={50000} step={100} value={qty} onChange={e => setQty(+e.target.value)} style={{ width: "100%", accentColor: "#6366f1" }} />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "rgba(255,255,255,0.2)", marginTop: 4 }}><span>100</span><span>50K</span></div>
              </div>
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "16px" }}>
                {[["Platform", platform],["Service", service],["Quantity", qty.toLocaleString()],["Delivery", "~5 minutes"]].map(([k,v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: 14 }}>
                    <span style={{ color: "rgba(255,255,255,0.4)" }}>{k}</span>
                    <span style={{ fontWeight: 600 }}>{v}</span>
                  </div>
                ))}
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: 700, fontSize: 15 }}>Total</span>
                  <span style={{ fontSize: 26, fontWeight: 800, color: isOwner ? "#f59e0b" : "#818cf8" }}>{isOwner ? "FREE" : `KSh ${price}`}</span>
                </div>
              </div>
              <button className="btn btn-primary" style={{ width: "100%", fontSize: 16, padding: 16 }} onClick={placeOrder}>
                {username ? "Confirm Order ⚡" : "Enter username to continue"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ORDERS TAB */}
      {tab === "orders" && (
        <div className="section fade">
          <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 6 }}>My Orders</h1>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 14, marginBottom: 20 }}>Track all your orders</p>
          <div style={{ display: "flex", gap: 8, marginBottom: 16, overflowX: "auto", paddingBottom: 4 }}>
            {["All","Completed","In Progress","Pending"].map(f => (
              <button key={f} className="btn btn-ghost" style={{ padding: "7px 14px", fontSize: 12, whiteSpace: "nowrap" }}>{f}</button>
            ))}
          </div>
          <div className="card" style={{ overflow: "hidden" }}>
            {orders.map((o, i) => (
              <div key={i} className="row" style={{ borderBottom: i < orders.length-1 ? "1px solid rgba(255,255,255,0.04)" : "none", margin: "0 4px" }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <PlatformIcon name={o.platform} size={22} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{o.platform} · {o.service}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>{(o.qty).toLocaleString()} · {o.date}</div>
                  {o.status === "In Progress" && (
                    <div style={{ marginTop: 6, background: "rgba(255,255,255,0.07)", borderRadius: 100, height: 3, overflow: "hidden" }}>
                      <div style={{ width: `${o.progress}%`, height: "100%", background: "#f59e0b", borderRadius: 100 }} />
                    </div>
                  )}
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <StatusBadge status={o.status} />
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 4 }}>{o.id}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PROFILE TAB */}
      {tab === "profile" && (
        <div className="section fade">
          <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 20 }}>Profile</h1>
          <div className="card" style={{ padding: 20, marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20, paddingBottom: 18, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ width: 60, height: 60, borderRadius: 100, background: "linear-gradient(135deg,#6366f1,#a855f7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 800 }}>
                {user.name.split(" ").map(n => n[0]).join("").slice(0,2)}
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 800 }}>{user.name}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{user.email}</div>
                <span className="tag" style={{ marginTop: 6, display: "inline-block", background: "rgba(99,102,241,0.12)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.2)" }}>{user.role}</span>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[["Full Name", user.name],["Email", user.email],["Country","Kenya 🇰🇪"],["Member Since","June 2026"]].map(([l,v]) => (
                <div key={l}>
                  <div className="label" style={{ marginBottom: 7 }}>{l}</div>
                  <input className="input" defaultValue={v} />
                </div>
              ))}
              <button className="btn btn-primary" style={{ width: "100%" }}>Save Changes</button>
              <button className="btn btn-danger" style={{ width: "100%" }} onClick={onLogout}>Logout</button>
            </div>
          </div>
        </div>
      )}

      {/* BOTTOM NAV */}
      <div className="bottom-nav">
        {TABS.map(t => (
          <div key={t.id} className={`bottom-nav-item ${tab === t.id ? "active" : ""}`} onClick={() => t.id === "admin" ? onNavigate("admin") : setTab(t.id)}>
            <div className="bottom-nav-icon">{t.icon}</div>
            <span>{t.label}</span>
          </div>
        ))}
      </div>

      {/* FUND MODAL */}
      {showFundModal && (
        <div className="modal-overlay" onClick={() => setShowFundModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h2 style={{ fontSize: 20, fontWeight: 800 }}>Add Funds 💳</h2>
              <button onClick={() => setShowFundModal(false)} style={{ background: "rgba(255,255,255,0.07)", border: "none", borderRadius: 10, width: 36, height: 36, cursor: "pointer", fontSize: 18, color: "#fff" }}>✕</button>
            </div>
            {/* Fund tabs */}
            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
              {[["card","💳 Card"],["bank","🏦 Bank"],["crypto","₿ Crypto"]].map(([id,label]) => (
                <button key={id} onClick={() => setFundTab(id)} className={`btn ${fundTab === id ? "btn-primary" : "btn-ghost"}`} style={{ flex: 1, padding: "10px 4px", fontSize: 13 }}>{label}</button>
              ))}
            </div>
            {/* Amount presets */}
            <div className="label" style={{ marginBottom: 10 }}>Amount</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 16 }}>
              {["500","1,000","2,500","5,000","10,000","25,000"].map(a => (
                <button key={a} className="btn btn-ghost" style={{ padding: "10px 4px", fontSize: 13, fontWeight: 700 }}>KSh {a}</button>
              ))}
            </div>
            <input className="input" placeholder="Or enter custom amount" style={{ marginBottom: 20 }} inputMode="numeric" />

            {fundTab === "card" && <CardInput />}
            {fundTab === "bank" && (
              <div className="card" style={{ padding: 20 }}>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Bank Transfer Details</div>
                {[["Bank","Equity Bank Kenya"],["Account Name","RisePanel Ltd"],["Account Number","1234567890"],["Branch","Nairobi CBD"]].map(([k,v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: 14 }}>
                    <span style={{ color: "rgba(255,255,255,0.4)" }}>{k}</span>
                    <span style={{ fontWeight: 600 }}>{v}</span>
                  </div>
                ))}
                <div style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 12, padding: "10px 14px", fontSize: 13, color: "#f59e0b", marginTop: 8 }}>
                  ⚠️ After transfer, send proof to support@risepanel.com and we credit within 1 hour.
                </div>
              </div>
            )}
            {fundTab === "crypto" && (
              <div className="card" style={{ padding: 20 }}>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Pay with Crypto</div>
                {[["₿ Bitcoin (BTC)","bc1qxy2kgdygjrsqtzq2n0yrf24..."],["💎 Ethereum (ETH)","0x71C7656EC7ab88b098defB751B..."],["💵 USDT (TRC20)","TN99x...8ZKmrj"]].map(([name, addr]) => (
                  <div key={name} style={{ marginBottom: 14, padding: "12px 14px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{name}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontFamily: "monospace", wordBreak: "break-all" }}>{addr}</div>
                  </div>
                ))}
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", textAlign: "center" }}>After payment, email proof to support@risepanel.com</div>
              </div>
            )}
            <button className="btn btn-primary" style={{ width: "100%", marginTop: 20, fontSize: 16 }}>
              {fundTab === "card" ? "Pay Now →" : "I've Made Payment →"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// ADMIN PANEL
// ============================================
function Admin({ user, onBack }) {
  const [tab, setTab] = useState("overview");
  const totalRevenue = MOCK_ORDERS.reduce((s, o) => s + o.paid, 0);

  const TABS = [
    { id: "overview", icon: "📊", label: "Overview" },
    { id: "orders", icon: "📦", label: "Orders" },
    { id: "users", icon: "👥", label: "Users" },
    { id: "services", icon: "⚙️", label: "Services" },
  ];

  return (
    <div style={{ minHeight: "100vh", paddingBottom: 90 }}>
      <div className="top-bar" style={{ borderColor: "rgba(245,158,11,0.15)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button onClick={onBack} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 16, color: "#fff" }}>←</button>
          <Logo size={13} />
        </div>
        <span className="tag" style={{ background: "rgba(245,158,11,0.1)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.2)" }}>👑 ADMIN</span>
      </div>

      {/* OVERVIEW */}
      {tab === "overview" && (
        <div className="section fade">
          <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>Overview 📊</h1>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 14, marginBottom: 20 }}>Your business at a glance</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
            <StatCard icon="💰" label="Revenue" value={`KSh ${totalRevenue.toLocaleString()}`} sub="All time" color="#22c55e" />
            <StatCard icon="📦" label="Orders" value={MOCK_ORDERS.length} sub="Total" color="#818cf8" />
            <StatCard icon="👥" label="Users" value={MOCK_USERS.length} sub="Registered" color="#00f2ea" />
            <StatCard icon="⚡" label="Active" value="2" sub="Live orders" color="#f59e0b" />
          </div>
          <div className="card" style={{ padding: 20, marginBottom: 16 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Recent Orders</h2>
            {MOCK_ORDERS.map((o, i) => (
              <div key={i} className="row" style={{ borderBottom: i < MOCK_ORDERS.length-1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                <PlatformIcon name={o.platform} size={22} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{o.platform} · {o.service}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>{o.user} · {o.date}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#22c55e" }}>+KSh {o.paid}</div>
                  <StatusBadge status={o.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ALL ORDERS */}
      {tab === "orders" && (
        <div className="section fade">
          <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>All Orders 📦</h1>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 14, marginBottom: 20 }}>Every order on the platform</p>
          <div className="card">
            {MOCK_ORDERS.map((o, i) => (
              <div key={i} className="row" style={{ borderBottom: i < MOCK_ORDERS.length-1 ? "1px solid rgba(255,255,255,0.04)" : "none", padding: "14px 16px" }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <PlatformIcon name={o.platform} size={20} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{o.platform} · {o.service}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>{o.qty.toLocaleString()} · {o.user.split("@")[0]}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", marginTop: 2 }}>{o.id} · {o.date}</div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#22c55e", marginBottom: 4 }}>KSh {o.paid}</div>
                  <StatusBadge status={o.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* USERS */}
      {tab === "users" && (
        <div className="section fade">
          <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>Users 👥</h1>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 14, marginBottom: 20 }}>Manage all platform users</p>
          <div className="card">
            {MOCK_USERS.map((u, i) => (
              <div key={i} className="row" style={{ borderBottom: i < MOCK_USERS.length-1 ? "1px solid rgba(255,255,255,0.04)" : "none", padding: "14px 16px" }}>
                <div style={{ width: 42, height: 42, borderRadius: 100, background: "linear-gradient(135deg,#6366f1,#a855f7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, flexShrink: 0 }}>
                  {u.name.split(" ").map(n => n[0]).join("").slice(0,2)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{u.name} {u.country}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>{u.orders} orders · KSh {u.balance.toLocaleString()}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end", flexShrink: 0 }}>
                  <span className="tag" style={{ background: `${({ owner:"#f59e0b",admin:"#a855f7",reseller:"#00f2ea",user:"#64748b" }[u.role])}18`, color: { owner:"#f59e0b",admin:"#a855f7",reseller:"#00f2ea",user:"#94a3b8" }[u.role], border: `1px solid ${{ owner:"#f59e0b",admin:"#a855f7",reseller:"#00f2ea",user:"#64748b" }[u.role]}33` }}>{u.role}</span>
                  {u.role !== "owner" && <button className="btn btn-danger" style={{ padding: "4px 10px", fontSize: 11 }}>Ban</button>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SERVICES */}
      {tab === "services" && (
        <div className="section fade">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 800 }}>Services ⚙️</h1>
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 14, marginTop: 4 }}>Control pricing & availability</p>
            </div>
            <button className="btn btn-primary" style={{ padding: "10px 16px", fontSize: 13 }}>+ Add</button>
          </div>
          <div className="card">
            {PLATFORMS.flatMap(p => p.services.map(s => ({ platform: p.name, service: s, price: PRICES[p.name] || 149 }))).map((s, i, arr) => (
              <div key={i} className="row" style={{ borderBottom: i < arr.length-1 ? "1px solid rgba(255,255,255,0.04)" : "none", padding: "14px 16px" }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <PlatformIcon name={s.platform} size={18} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{s.platform} · {s.service}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>Min: 100 · Max: 50,000 · ~5 min</div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#818cf8" }}>KSh {s.price}/1K</div>
                  <span className="pill" style={{ background: "rgba(34,197,94,0.1)", color: "#22c55e" }}>Active</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bottom-nav">
        {TABS.map(t => (
          <div key={t.id} className={`bottom-nav-item ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)}>
            <div className="bottom-nav-icon">{t.icon}</div>
            <span>{t.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// ROOT
// ============================================
export default function App() {
  const [page, setPage] = useState("landing");
  const [user, setUser] = useState(null);

  return (
    <>
      <style>{STYLES}</style>
      {page === "landing" && <Landing onNavigate={setPage} />}
      {(page === "login" || page === "signup") && <Auth mode={page} onNavigate={setPage} onLogin={u => { setUser(u); setPage("dashboard"); }} />}
      {page === "dashboard" && user && <Dashboard user={user} onLogout={() => { setUser(null); setPage("landing"); }} onNavigate={setPage} />}
      {page === "admin" && user && <Admin user={user} onBack={() => setPage("dashboard")} />}
    </>
  );
}
