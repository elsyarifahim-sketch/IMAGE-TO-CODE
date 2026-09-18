import { SampleTemplate } from "../types";

// High quality SVG data URIs for immediate, zero-latency visual previews
const analyticsSvg = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="420" viewBox="0 0 600 420" fill="none">
  <rect width="600" height="420" rx="16" fill="#0F172A"/>
  <!-- Top Bar -->
  <rect x="24" y="24" width="552" height="48" rx="8" fill="#1E293B"/>
  <circle cx="52" cy="48" r="14" fill="#3B82F6"/>
  <rect x="80" y="42" width="120" height="12" rx="4" fill="#E2E8F0"/>
  <rect x="440" y="38" width="80" height="20" rx="6" fill="#334155"/>
  <circle cx="546" cy="48" r="12" fill="#8B5CF6"/>
  <!-- Stats Cards -->
  <rect x="24" y="88" width="168" height="96" rx="10" fill="#1E293B" stroke="#334155"/>
  <rect x="40" y="104" width="64" height="10" rx="3" fill="#94A3B8"/>
  <text x="40" y="146" fill="#FFFFFF" font-family="sans-serif" font-size="22" font-weight="bold">$48,290</text>
  <rect x="40" y="158" width="48" height="8" rx="2" fill="#10B981"/>

  <rect x="216" y="88" width="168" height="96" rx="10" fill="#1E293B" stroke="#334155"/>
  <rect x="232" y="104" width="64" height="10" rx="3" fill="#94A3B8"/>
  <text x="232" y="146" fill="#FFFFFF" font-family="sans-serif" font-size="22" font-weight="bold">+1,420</text>
  <rect x="232" y="158" width="48" height="8" rx="2" fill="#3B82F6"/>

  <rect x="408" y="88" width="168" height="96" rx="10" fill="#1E293B" stroke="#334155"/>
  <rect x="424" y="104" width="64" height="10" rx="3" fill="#94A3B8"/>
  <text x="424" y="146" fill="#FFFFFF" font-family="sans-serif" font-size="22" font-weight="bold">99.4%</text>
  <rect x="424" y="158" width="48" height="8" rx="2" fill="#8B5CF6"/>
  <!-- Main Chart & Table -->
  <rect x="24" y="200" width="360" height="196" rx="10" fill="#1E293B" stroke="#334155"/>
  <path d="M 44 340 Q 120 250, 180 290 T 360 230" stroke="#3B82F6" stroke-width="3" fill="none"/>
  <path d="M 44 350 Q 120 280, 180 320 T 360 280" stroke="#8B5CF6" stroke-width="2" stroke-dasharray="4 4" fill="none"/>

  <rect x="408" y="200" width="168" height="196" rx="10" fill="#1E293B" stroke="#334155"/>
  <rect x="424" y="220" width="100" height="12" rx="4" fill="#E2E8F0"/>
  <rect x="424" y="248" width="136" height="28" rx="6" fill="#0F172A"/>
  <rect x="424" y="286" width="136" height="28" rx="6" fill="#0F172A"/>
  <rect x="424" y="324" width="136" height="28" rx="6" fill="#0F172A"/>
  <rect x="424" y="360" width="136" height="22" rx="6" fill="#3B82F6"/>
</svg>
`)}`;

const mobileCardSvg = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="380" height="520" viewBox="0 0 380 520" fill="none">
  <rect width="380" height="520" rx="24" fill="#0F172A"/>
  <!-- Mobile Status Bar -->
  <rect x="30" y="20" width="320" height="24" rx="4" fill="#1E293B"/>
  <circle cx="48" cy="32" r="6" fill="#64748B"/>
  <rect x="290" y="26" width="40" height="12" rx="3" fill="#64748B"/>
  <!-- Header -->
  <circle cx="56" cy="76" r="20" fill="#8B5CF6"/>
  <rect x="90" y="66" width="90" height="10" rx="3" fill="#94A3B8"/>
  <rect x="90" y="82" width="130" height="14" rx="3" fill="#F8FAFC"/>
  <!-- Virtual Card -->
  <rect x="30" y="120" width="320" height="170" rx="16" fill="url(#grad1)"/>
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3B82F6"/>
      <stop offset="100%" stop-color="#8B5CF6"/>
    </linearGradient>
  </defs>
  <text x="54" y="160" fill="#E2E8F0" font-family="sans-serif" font-size="14">Total Balance</text>
  <text x="54" y="198" fill="#FFFFFF" font-family="sans-serif" font-size="28" font-weight="bold">$12,450.80</text>
  <text x="54" y="260" fill="#CBD5E1" font-family="monospace" font-size="14">•••• 8824</text>
  <circle cx="310" cy="254" r="14" fill="#FFFFFF" fill-opacity="0.3"/>
  <!-- Quick Actions -->
  <rect x="30" y="310" width="68" height="68" rx="14" fill="#1E293B" stroke="#334155"/>
  <rect x="114" y="310" width="68" height="68" rx="14" fill="#1E293B" stroke="#334155"/>
  <rect x="198" y="310" width="68" height="68" rx="14" fill="#1E293B" stroke="#334155"/>
  <rect x="282" y="310" width="68" height="68" rx="14" fill="#1E293B" stroke="#334155"/>
  <!-- Recent List -->
  <rect x="30" y="400" width="320" height="48" rx="10" fill="#1E293B"/>
  <rect x="30" y="456" width="320" height="48" rx="10" fill="#1E293B"/>
</svg>
`)}`;

const authScreenSvg = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="460" height="480" viewBox="0 0 460 480" fill="none">
  <rect width="460" height="480" rx="16" fill="#0B0F19"/>
  <rect x="50" y="40" width="360" height="400" rx="16" fill="#111827" stroke="#1F2937"/>
  <circle cx="230" cy="80" r="18" fill="#3B82F6"/>
  <text x="230" y="125" text-anchor="middle" fill="#F9FAFB" font-family="sans-serif" font-size="18" font-weight="bold">Welcome Back</text>
  <text x="230" y="145" text-anchor="middle" fill="#9CA3AF" font-family="sans-serif" font-size="12">Enter credentials to access workspace</text>
  <!-- Input 1 -->
  <rect x="80" y="170" width="300" height="40" rx="8" fill="#1F2937" stroke="#374151"/>
  <text x="96" y="195" fill="#9CA3AF" font-family="sans-serif" font-size="13">developer@codevision.ai</text>
  <!-- Input 2 -->
  <rect x="80" y="225" width="300" height="40" rx="8" fill="#1F2937" stroke="#374151"/>
  <text x="96" y="250" fill="#9CA3AF" font-family="sans-serif" font-size="13">••••••••••••</text>
  <!-- Options -->
  <rect x="80" y="280" width="14" height="14" rx="3" fill="#374151"/>
  <text x="102" y="292" fill="#9CA3AF" font-family="sans-serif" font-size="12">Remember me</text>
  <text x="380" y="292" text-anchor="end" fill="#3B82F6" font-family="sans-serif" font-size="12">Forgot password?</text>
  <!-- Button -->
  <rect x="80" y="315" width="300" height="44" rx="8" fill="#3B82F6"/>
  <text x="230" y="342" text-anchor="middle" fill="#FFFFFF" font-family="sans-serif" font-size="14" font-weight="bold">Sign In to Dashboard</text>
  <!-- Social divider -->
  <line x1="80" y1="385" x2="380" y2="385" stroke="#374151"/>
  <rect x="180" y="375" width="100" height="20" rx="4" fill="#111827"/>
  <text x="230" y="389" text-anchor="middle" fill="#6B7280" font-family="sans-serif" font-size="11">OR CONTINUE WITH</text>
  <!-- Social buttons -->
  <rect x="80" y="405" width="140" height="28" rx="6" fill="#1F2937" stroke="#374151"/>
  <rect x="240" y="405" width="140" height="28" rx="6" fill="#1F2937" stroke="#374151"/>
</svg>
`)}`;

export const SAMPLE_TEMPLATES: SampleTemplate[] = [
  {
    id: "saas-analytics",
    title: "SaaS Cloud Analytics Dashboard",
    category: "Dashboard UI",
    difficulty: "Moderate",
    thumbnail: analyticsSvg,
    description: "Multi-metric executive analytics dashboard with KPI cards, revenue graph, and real-time activity list.",
    targetLanguage: "HTML",
    targetFramework: "Tailwind CSS",
    detectedElements: ["Header Navigation", "Search Bar", "KPI Metric Cards", "Vector Line Chart", "Activity Feed List", "Action Buttons"],
    colorPalette: ["#0F172A", "#1E293B", "#3B82F6", "#8B5CF6", "#10B981", "#E2E8F0"],
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SaaS Analytics Dashboard</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>body { font-family: 'Plus Jakarta Sans', sans-serif; }</style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen p-4 sm:p-6 lg:p-8">
  <div class="max-w-7xl mx-auto space-y-6">
    <!-- Top Navigation -->
    <header class="flex flex-wrap items-center justify-between gap-4 bg-slate-900/80 backdrop-blur border border-slate-800 rounded-xl p-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">CV</div>
        <div>
          <h1 class="text-base font-semibold leading-tight">CodeVision Cloud</h1>
          <p class="text-xs text-slate-400">Production Infrastructure • US-East</p>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          Operational
        </span>
        <button class="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-medium text-white transition">Export Report</button>
      </div>
    </header>

    <!-- KPI Metric Cards Grid -->
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div class="bg-slate-900/60 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition">
        <p class="text-xs font-medium text-slate-400">Total Monthly Revenue</p>
        <div class="mt-2 flex items-baseline justify-between">
          <span class="text-2xl font-bold tracking-tight text-white">$48,290.00</span>
          <span class="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">+18.4%</span>
        </div>
        <div class="mt-3 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
          <div class="bg-blue-500 h-full w-3/4 rounded-full"></div>
        </div>
      </div>

      <div class="bg-slate-900/60 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition">
        <p class="text-xs font-medium text-slate-400">Active API Clients</p>
        <div class="mt-2 flex items-baseline justify-between">
          <span class="text-2xl font-bold tracking-tight text-white">+1,420</span>
          <span class="text-xs font-medium text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">+9.2%</span>
        </div>
        <div class="mt-3 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
          <div class="bg-purple-500 h-full w-2/3 rounded-full"></div>
        </div>
      </div>

      <div class="bg-slate-900/60 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition">
        <p class="text-xs font-medium text-slate-400">System Uptime</p>
        <div class="mt-2 flex items-baseline justify-between">
          <span class="text-2xl font-bold tracking-tight text-white">99.94%</span>
          <span class="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Optimal</span>
        </div>
        <div class="mt-3 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
          <div class="bg-emerald-500 h-full w-full rounded-full"></div>
        </div>
      </div>
    </section>

    <!-- Main Content Split -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Activity Chart Container -->
      <div class="lg:col-span-2 bg-slate-900/60 border border-slate-800 rounded-xl p-6">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="text-sm font-semibold text-white">Conversion Throughput</h2>
            <p class="text-xs text-slate-400">Requests processed in past 24 hours</p>
          </div>
          <select class="bg-slate-800 border border-slate-700 text-xs text-slate-200 rounded-lg px-2.5 py-1 outline-none">
            <option>Last 24 Hours</option>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
          </select>
        </div>
        <div class="h-52 w-full flex items-end gap-3 pt-6 border-b border-slate-800 pb-2">
          <div class="flex-1 bg-blue-500/20 hover:bg-blue-500/40 rounded-t h-28 transition group relative">
            <span class="absolute -top-7 left-1/2 -translate-x-1/2 hidden group-hover:block text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-white font-mono">1.2k</span>
          </div>
          <div class="flex-1 bg-blue-500/30 hover:bg-blue-500/50 rounded-t h-36 transition group relative"></div>
          <div class="flex-1 bg-blue-500/40 hover:bg-blue-500/60 rounded-t h-24 transition group relative"></div>
          <div class="flex-1 bg-blue-500/50 hover:bg-blue-500/70 rounded-t h-44 transition group relative"></div>
          <div class="flex-1 bg-blue-500/70 hover:bg-blue-500/90 rounded-t h-40 transition group relative"></div>
          <div class="flex-1 bg-purple-500 hover:bg-purple-400 rounded-t h-48 transition group relative"></div>
          <div class="flex-1 bg-blue-500 hover:bg-blue-400 rounded-t h-32 transition group relative"></div>
        </div>
        <div class="flex justify-between text-[11px] text-slate-500 mt-2 font-mono">
          <span>00:00</span><span>04:00</span><span>08:00</span><span>12:00</span><span>16:00</span><span>20:00</span><span>Now</span>
        </div>
      </div>

      <!-- Quick Action Logs -->
      <div class="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
        <h2 class="text-sm font-semibold text-white mb-4">Live Conversions</h2>
        <div class="space-y-3">
          <div class="flex items-center justify-between p-3 rounded-lg bg-slate-950/60 border border-slate-800/80">
            <div class="truncate">
              <p class="text-xs font-medium text-slate-200">checkout_modal.png</p>
              <p class="text-[11px] text-slate-400">React JSX • Tailwind</p>
            </div>
            <span class="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-mono">320ms</span>
          </div>
          <div class="flex items-center justify-between p-3 rounded-lg bg-slate-950/60 border border-slate-800/80">
            <div class="truncate">
              <p class="text-xs font-medium text-slate-200">landing_hero.webp</p>
              <p class="text-[11px] text-slate-400">HTML5 • Semantic</p>
            </div>
            <span class="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono">480ms</span>
          </div>
          <div class="flex items-center justify-between p-3 rounded-lg bg-slate-950/60 border border-slate-800/80">
            <div class="truncate">
              <p class="text-xs font-medium text-slate-200">mobile_auth.png</p>
              <p class="text-[11px] text-slate-400">Flutter • Dart</p>
            </div>
            <span class="text-[10px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 font-mono">510ms</span>
          </div>
        </div>
        <button class="mt-4 w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition">View Full Audit Log</button>
      </div>
    </div>
  </div>
</body>
</html>`,
    files: [
      {
        name: "index.html",
        content: `<!-- Main HTML document -->`,
        language: "html"
      }
    ]
  },
  {
    id: "fintech-mobile-card",
    title: "FinTech Digital Wallet & Quick Actions",
    category: "Mobile UI",
    difficulty: "Simple",
    thumbnail: mobileCardSvg,
    description: "Mobile first banking card with gradient card surface, action buttons, and transaction history.",
    targetLanguage: "React JSX",
    targetFramework: "Tailwind CSS",
    detectedElements: ["Status Bar", "Profile Avatar", "Gradient Card", "Card Chip", "Quick Send Actions", "Transaction List"],
    colorPalette: ["#0F172A", "#3B82F6", "#8B5CF6", "#10B981", "#CBD5E1"],
    code: `import React, { useState } from 'react';

export default function MobileWalletCard() {
  const [balance, setBalance] = useState(12450.80);
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
              JD
            </div>
            <div>
              <p className="text-xs text-slate-400">Welcome back,</p>
              <h3 className="text-sm font-semibold text-white">John Developer</h3>
            </div>
          </div>
          <button className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-slate-700">
            🔔
          </button>
        </div>

        {/* Digital Payment Card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-6 text-white shadow-xl shadow-blue-500/20">
          <div className="flex justify-between items-start">
            <span className="text-xs font-medium tracking-wide uppercase text-blue-100/80">CodeVision Pay</span>
            <span className="text-sm font-mono tracking-wider font-semibold">VISA</span>
          </div>
          <div className="my-5">
            <p className="text-xs text-blue-200/80">Current Balance</p>
            <h2 className="text-2xl font-bold tracking-tight mt-1">
              \${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </h2>
          </div>
          <div className="flex justify-between items-end text-xs font-mono text-blue-100/90">
            <span>•••• •••• •••• 8824</span>
            <span>12/28</span>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: 'Send', icon: '↗️', color: 'hover:border-blue-500' },
            { label: 'Receive', icon: '↙️', color: 'hover:border-purple-500' },
            { label: 'Pay', icon: '💳', color: 'hover:border-emerald-500' },
            { label: 'More', icon: '⚡', color: 'hover:border-amber-500' }
          ].map((item, idx) => (
            <button
              key={idx}
              className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 hover:bg-slate-800 transition"
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-[11px] font-medium text-slate-300">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Transaction History */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-xs font-semibold text-slate-300">Recent Transactions</h4>
            <span className="text-[11px] text-blue-400 cursor-pointer hover:underline">See all</span>
          </div>
          <div className="space-y-2.5">
            {[
              { title: 'OpenAI Subscription', time: 'Today, 2:40 PM', amount: '-$20.00', positive: false },
              { title: 'Client Transfer', time: 'Yesterday', amount: '+$3,200.00', positive: true },
              { title: 'Cloudflare Pro', time: 'Sep 14', amount: '-$25.00', positive: false }
            ].map((tx, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-950/50 border border-slate-800/60">
                <div>
                  <p className="text-xs font-medium text-white">{tx.title}</p>
                  <p className="text-[10px] text-slate-400">{tx.time}</p>
                </div>
                <span className={\`text-xs font-mono font-medium \${tx.positive ? 'text-emerald-400' : 'text-slate-300'}\`}>
                  {tx.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}`,
    files: []
  },
  {
    id: "modern-auth-screen",
    title: "Secure Developer Authentication",
    category: "Auth UI",
    difficulty: "Simple",
    thumbnail: authScreenSvg,
    description: "Futuristic dark mode login card with social SSO buttons, floating input labels, and password visibility toggle.",
    targetLanguage: "HTML",
    targetFramework: "Tailwind CSS",
    detectedElements: ["Brand Logo", "Heading Title", "Email Input", "Password Input", "Remember Me Checkbox", "Forgot Password Link", "Primary CTA Button", "Social SSO Buttons"],
    colorPalette: ["#0B0F19", "#111827", "#1F2937", "#3B82F6", "#9CA3AF"],
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Developer Portal Login</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>body { font-family: 'Plus Jakarta Sans', sans-serif; }</style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen flex items-center justify-center p-4">
  <div class="w-full max-w-md bg-slate-900/90 border border-slate-800/90 rounded-2xl p-8 shadow-2xl backdrop-blur-xl">
    <!-- Brand Icon -->
    <div class="w-12 h-12 mx-auto rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/20">
      ⚡
    </div>
    <div class="text-center mt-4">
      <h2 class="text-xl font-bold text-white tracking-tight">Sign in to CodeVision</h2>
      <p class="text-xs text-slate-400 mt-1">Convert visual designs into production source code</p>
    </div>

    <form class="mt-6 space-y-4" onsubmit="event.preventDefault(); alert('Signed in!');">
      <div>
        <label class="block text-xs font-medium text-slate-300 mb-1.5">Email Address</label>
        <input 
          type="email" 
          required 
          placeholder="name@company.com" 
          class="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
        >
      </div>

      <div>
        <div class="flex items-center justify-between mb-1.5">
          <label class="text-xs font-medium text-slate-300">Password</label>
          <a href="#" class="text-xs text-blue-400 hover:text-blue-300 hover:underline">Forgot?</a>
        </div>
        <input 
          type="password" 
          required 
          placeholder="••••••••••••" 
          class="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
        >
      </div>

      <div class="flex items-center justify-between text-xs text-slate-400 pt-1">
        <label class="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" class="w-4 h-4 rounded bg-slate-950 border-slate-800 text-blue-600 focus:ring-0">
          <span>Remember this session</span>
        </label>
      </div>

      <button 
        type="submit" 
        class="w-full py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold shadow-lg shadow-blue-500/25 transition cursor-pointer"
      >
        Sign In to Workspace
      </button>
    </form>

    <div class="relative my-6 text-center">
      <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-slate-800"></div></div>
      <span class="relative bg-slate-900 px-3 text-[11px] uppercase tracking-wider text-slate-500 font-medium">Or continue with</span>
    </div>

    <div class="grid grid-cols-2 gap-3">
      <button class="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-950 border border-slate-800 hover:bg-slate-800/60 text-xs font-medium text-slate-200 transition">
        <span>GitHub</span>
      </button>
      <button class="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-950 border border-slate-800 hover:bg-slate-800/60 text-xs font-medium text-slate-200 transition">
        <span>Google</span>
      </button>
    </div>
  </div>
</body>
</html>`,
    files: []
  }
];
