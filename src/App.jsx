/**
 * ============================================================
 * Jimmy Talbot — Personal Portfolio
 * ============================================================
 *
 * A self-contained React component for a personal portfolio site.
 * Designed to be deployed on GitHub Pages as a static site.
 *
 * STRUCTURE
 * ---------
 *   <App />                  — Root component, assembles all sections
 *   <Navbar />               — Sticky navigation with smooth-scroll links
 *   <Hero />                 — Full-screen intro with name, tagline & CTA buttons
 *   <About />                — Bio text, profile picture, career timeline, action buttons
 *   <Services />             — Service cards with expandable detail modals
 *   <Portfolio />            — Project grid with category filters & detail modals
 *   <Skills />               — Skill tags grouped by category
 *   <Contact />              — Contact section with email/LinkedIn buttons
 *   <Footer />               — Social links and copyright
 *
 * HOW TO EDIT YOUR CONTENT
 * ------------------------
 *   All personal data lives in the DATA object near the top of this file.
 *   You should never need to touch the component logic below it.
 *
 *   DATA.personal        → Name, tagline, bio, profile picture, social links
 *   DATA.timeline        → Career history entries displayed as a horizontal timeline
 *   DATA.services        → Cards in the Services section
 *   DATA.skills          → Skill bubbles grouped by category
 *   DATA.projects        → Portfolio project cards with images, descriptions, buttons
 *   DATA.contact         → Contact section text and buttons
 *
 * HOW TO DEPLOY TO GITHUB PAGES
 * ------------------------------
 *   1. Create a new Vite React project:   npm create vite@latest my-portfolio -- --template react
 *   2. Replace src/App.jsx content with this file
 *   3. Install gh-pages:                  npm install gh-pages --save-dev
 *   4. In package.json, add:
 *        "homepage": "https://<your-username>.github.io/<repo-name>",
 *        "scripts": { "predeploy": "npm run build", "deploy": "gh-pages -d dist" }
 *   5. In vite.config.js, set:            base: '/<repo-name>/'
 *   6. Run:                               npm run deploy
 *
 * DEPENDENCIES (already bundled in React — no extra installs needed)
 *   React 18+, no external UI libraries required.
 *   Google Fonts are loaded via a <style> tag inside the component.
 *
 * ============================================================
 */

import { useState, useEffect, useRef } from "react";

// ============================================================
// ██████   █████  ████████  █████
// ██   ██ ██   ██    ██    ██   ██
// ██   ██ ███████    ██    ███████
// ██   ██ ██   ██    ██    ██   ██
// ██████  ██   ██    ██    ██   ██
//
// Edit everything in this object to update your portfolio.
// ============================================================

const DATA = {

  // ----------------------------------------------------------
  // PERSONAL INFO
  // Shown in the Hero, About, and Footer sections.
  // ----------------------------------------------------------
  personal: {
    firstName: "Jimmy",
    lastName: "Talbot",
    /** Short one-liner shown under your name in the hero */
    tagline: "I'm a software engineer with expertise in web application development, data engineering, data visualization, and a strong passion for soccer.",
    /**
     * Full bio shown in the About section.
     * Supports plain text with line breaks (\n\n for new paragraphs).
     */
    bio: `👋 Hi, I'm Jimmy.

I'm a software engineer who made the leap into coding in 2024 and has been learning while building apps ever since.

As LLMs weren't as advanced when I started learning to code, I was fortunate enough to experience building applications on my own before learning to accelerate the development process with responsible use of LLMs.

I have expertise in building web applications using Python and JavaScript/TypeScript, data engineering, training ML models, and building data visualization dashboards.

Apart from programming, I have experience as a Technical Recruiter, an English-Japanese interpreter, a soccer data-collection scout, and I am a certified athletic trainer (JATI-ATI).

I also enjoy playing soccer and am part of a team in the Football 7 Society League!`,
    /** URL to your profile photo */
    profilePicture: "https://ywayezjxjhudlfxw.public.blob.vercel-storage.com/profile_pic-SDbVrpFUsEwip3vgWUGsfTbf2CbxDe.jpg",
    /** URL to your logo / favicon shown in the navbar */
    logo: "https://ywayezjxjhudlfxw.public.blob.vercel-storage.com/data-scout-fm-logo-small-XzgYLjuV0wZJvQiJ9CVrKr4rTZQwnz.png",
    /** Social media links — set to null to hide */
    social: {
      github: "https://github.com/JTee9",
      linkedin: "https://www.linkedin.com/in/jimmy-talbot-79333058/",
      twitter: "https://x.com/DataScoutFM",
    },
  },

  // ----------------------------------------------------------
  // HERO BUTTONS
  // CTA buttons displayed in the Hero section.
  // isPrimary: true → filled button, false → outline button
  // Use "#contact" to scroll to the contact section.
  // ----------------------------------------------------------
  heroButtons: [
    { label: "GitHub", url: "https://github.com/JTee9", isPrimary: true },
    { label: "Contact", url: "#contact", isPrimary: false },
  ],

  // ----------------------------------------------------------
  // ABOUT BUTTONS
  // Buttons shown below the bio in the About section.
  // ----------------------------------------------------------
  aboutButtons: [
    { label: "Github", url: "https://github.com/JTee9", isPrimary: true },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/jimmy-talbot-79333058/", isPrimary: true },
    { label: "Soccer", url: "https://football7society.jp/kanto/team/tbfc/", isPrimary: true },
  ],

  // ----------------------------------------------------------
  // CAREER TIMELINE
  // Displayed as a horizontal timeline in the About section.
  // Add/remove entries as needed. "end: null" means "Present".
  // ----------------------------------------------------------
  timeline: [
    { start: 2012, end: 2018, role: "Recruiter, IT", company: "Robert Walters Japan" },
    { start: 2018, end: 2023, role: "Recruiter, Google Cloud", company: "Google Japan" },
    { start: 2023, end: null, role: "Software Engineer", company: "Freelance" },
  ],

  // ----------------------------------------------------------
  // SERVICES
  // Cards shown in the Services section.
  // descriptionShort: shown on the card face
  // descriptionLong:  shown when the user clicks "Read more"
  // icon: one of "settings" | "pen" | "code" | "chart" | "globe"
  // ----------------------------------------------------------
  services: [
    {
      icon: "settings",
      name: "Web & Data Engineering",
      descriptionShort: "I can help you build web apps and custom data visualizations for your business.",
      descriptionLong: `I build full-stack web applications and data pipelines tailored to your needs.

Whether you need an interactive dashboard, a data processing pipeline, or a complete web application, I bring experience with React, Python, JavaScript, and modern data tooling to deliver reliable, performant solutions.`,
    },
    {
      icon: "pen",
      name: "Interpretation & Translation",
      descriptionShort: "If you need someone to bridge a Japanese-English gap, I'm your guy!",
      descriptionLong: `With years of professional experience working in Japan and bilingual communication, I can help bridge language gaps in technical and business contexts.

From document translation to live interpretation, I bring both linguistic fluency and technical vocabulary to ensure nothing is lost in translation.`,
    },
  ],

  // ----------------------------------------------------------
  // SKILLS
  // Displayed as grouped tag clouds in the Skills section.
  // value: proficiency 0–100 (affects visual size/emphasis)
  // group: used to color-code tags by category
  // ----------------------------------------------------------
  skills: [
    // Programming
    { name: "Python",         group: "Programming",        value: 90 },
    { name: "JavaScript",     group: "Programming",        value: 100 },
    { name: "React",          group: "Programming",        value: 90 },
    { name: "Ruby on Rails",  group: "Programming",        value: 50 },
    { name: "Godot",          group: "Programming",        value: 50 },
    // Data Engineering
    { name: "Pandas",         group: "Data Engineering",   value: 90 },
    { name: "Data Cleaning",  group: "Data Engineering",   value: 91 },
    { name: "ETL Pipelines",  group: "Data Engineering",   value: 90 },
    { name: "Machine Learning", group: "Data Engineering", value: 50 },
    { name: "PostgreSQL",     group: "Data Engineering",   value: 50 },
    // Data Visualization
    { name: "Matplotlib",     group: "Data Visualization", value: 90 },
    { name: "Plotly",         group: "Data Visualization", value: 80 },
    { name: "Dash",           group: "Data Visualization", value: 80 },
    // Tools
    { name: "Google Colab",   group: "Tools",              value: 80 },
    { name: "TensorFlow",     group: "Tools",              value: 60 },
  ],

  // ----------------------------------------------------------
  // PORTFOLIO PROJECTS
  // Shown in the Portfolio grid section.
  // category: used for filter buttons (must match exactly)
  // buttons: action buttons shown in the modal detail view
  //   isPrimary: true → filled,  false → outline
  // descriptionLong: markdown-like text shown in the detail modal
  //   Use **bold**, blank lines for paragraphs.
  // ----------------------------------------------------------
  projects: [
    {
      name: "Data Scout FM (React.js)",
      category: "React",
      img: "https://ywayezjxjhudlfxw.public.blob.vercel-storage.com/Screenshot%202026-03-10%20140617-FpVplkHa5HLaDh7d8J7pYT5GTGkhP8.png",
      descriptionShort: "An original scouting tool for Football Manager 24, rewritten from Python to JavaScript for a highly responsive web app running entirely on the client browser.",
      descriptionLong: `An original scouting tool for the computer game Football Manager 24, rewritten from Python to JavaScript for a highly responsive web app running entirely on the client browser.

**Live App**: https://jtee9.github.io/data-scout-fm

**Key Features**

**File Upload**: Allows users to upload their game data from Football Manager. The app cleans and transforms the uploaded data into a usable format.

**Stats**: Filter and chart players using match statistics (goals, assists, etc.). Most players have their attributes hidden until you scout them — this feature finds top performers worldwide to build a shortlist.

**Attributes**: Compare player attributes across various charts. Toggle through visuals to get a clearer picture of how two players compare.

**AI Stats Predictor**: My personal favorite feature — uses an AI model to take a player's attributes and predict the match statistics they'll produce in any selected league.

**Technology Used**

**Danfo.js**: A data management library for Pandas-like DataFrames in JavaScript.

**React.js**: The key change from the Python version — everything moved to the client side for massive responsiveness improvements.

**Key Learnings**

**App Migration**: Learned the hard way why proper system architecture planning matters before coding.

**GitHub Pages**: Moved from Render to GitHub Pages, requiring all features to run fully on the frontend.`,
      buttons: [
        { label: "Visit Site", url: "https://jtee9.github.io/data-scout-fm", isPrimary: true },
        { label: "GitHub", url: "https://github.com/JTee9/data-scout-fm", isPrimary: false },
      ],
    },
    {
      name: "Data Scout FM (Python)",
      category: "Python",
      img: "https://ywayezjxjhudlfxw.public.blob.vercel-storage.com/Screenshot%202026-03-10%20145321-BIQcW3gjzkaA6hnqDsNQqxjAO0sDTU.png",
      descriptionShort: "The original version of my Data Scout FM project, initially built in Python.",
      descriptionLong: `The original version of my Data Scout FM project which I initially built in Python.

**Key Features**

**File Upload**: Upload and process Football Manager game data.

**Stats**: Filter and visualize player match statistics.

**Attributes**: Compare player attributes with radar/spider charts.

**AI Stats Predictor**: TensorFlow model trained on simulated FM data to predict player statistics.

**Technology Used**

**Pandas**: Data management and transformation into DataFrames.

**Plotly**: Interactive data visualization — tables, scatter plots, radar charts.

**TensorFlow**: Machine learning model training for the AI Stats Predictor.

**Dash**: Python framework for building interactive web applications.

**Key Learnings**

This project was a deep dive into data engineering, ML model training, and web app design. The biggest challenge was supporting all 12 languages in Football Manager when processing data files!`,
      buttons: [
        { label: "GitHub", url: "https://github.com/JTee9/Data-Scout-FM.py", isPrimary: true },
      ],
    },
    {
      name: "Data Scout JT (React + PostgreSQL)",
      category: "React",
      img: "https://ywayezjxjhudlfxw.public.blob.vercel-storage.com/Screenshot%202026-03-10%20145148-4b1MMoEyJuZcWT1RpknPqWeipVWqpl.png",
      descriptionShort: "A web & mobile app I'm developing to gather and analyze match data from my own soccer team's matches!",
      descriptionLong: `A web & mobile app for collecting and analyzing real match data from my own soccer team.

**Features**

**Pitch Mode**: A mobile-optimized data tracking tool with a soccer pitch UI and action buttons (Pass, Carry, Goal, etc.) tapped in real time during matches. Events are timestamped and saved to PostgreSQL.

**Data Mode**: Desktop analysis tool — select matches and toggle through visual breakdowns of Goals, Shots, Passes, Possession, and more.

**Goal Frame Manager**: Recreate goal sequences frame-by-frame showing player positions and ball movement, then play them back as a video on the pitch map.

**Technology Used**

**React / React Native**: Shared codebase for web and mobile, responding to both touch and mouse events.

**PostgreSQL**: Custom data schema inspired by Statsbomb's professional event data model.

**Expo**: Cross-platform mobile development without an Apple Developer account.

**Key Learnings**

First mobile app experience — learned how dramatically UX design must change between laptop and handheld interfaces. Also designed my first custom data schema from scratch.

*The app is still a work in progress!*`,
      buttons: [
        { label: "GitHub", url: "https://github.com/JTee9/DataScoutJT", isPrimary: true },
      ],
    },
    {
      name: "League Tables (Ruby on Rails)",
      category: "Ruby on Rails",
      img: "https://ywayezjxjhudlfxw.public.blob.vercel-storage.com/Screenshot%202026-03-10%20140938-TIXrTYZvnkV9vsZGDQ4hpSxCxsNRTk.png",
      descriptionShort: "A personal project to gain hands-on experience with Ruby on Rails.",
      descriptionLong: `A Ruby on Rails web app that displays live league standings from soccer leagues around the world.

**Features**

**Real Data**: Connects to a Football API to pull live team and standings data.

**Authentication**: Full sign-up and log-in with username and password.

**Favorite Team**: Logged-in users can heart a team per league. Favorites are stored in PostgreSQL and displayed publicly on the table.

**Technology Used**

**Ruby on Rails**: First time using Ruby — great experience comparing language paradigms across Python, JavaScript, and Ruby.

**PostgreSQL**: Storing user accounts and favorite team selections.

**Key Learnings**

**Ruby on Rails**: Seeing how the same CRUD patterns translate across frameworks.

**API Management**: First time pulling real-time data from an external third-party API.`,
      buttons: [
        { label: "Visit Site", url: "https://league-tables-fz4g.onrender.com/", isPrimary: true },
        { label: "GitHub", url: "https://github.com/JTee9/TeamView", isPrimary: false },
      ],
    },
    {
      name: "Google Colab Projects",
      category: "Python",
      img: "https://ywayezjxjhudlfxw.public.blob.vercel-storage.com/Screenshot%202026-03-10%20141713-jf2I17qewNqQBdUbIoMVF6VpzspbOQ.png",
      descriptionShort: "A collection of research and ML projects done on Google Colab.",
      descriptionLong: `A collection of Python research and machine learning projects I've run on Google Colab.

**Projects**

**ML Model Training for Data Scout FM**: Compiled simulated FM game data and trained the AI Stats Predictor model used in my app — for both the Python and JavaScript versions.

**FM Key Attributes per Position Research**: Investigated which player attributes matter most for each position. Generated charts showing correlations between match stats and attributes, and which attributes top performers share by position.

**FM Data Trend Research**: Tested my hypothesis that Average Ratings were becoming skewed over simulated seasons, and visualized how they shifted across major leagues over time.

**FM SHAP Chart Analysis**: Used SHAP (SHapley Additive exPlanations) charts to visualize feature importance for each position.

**Statsbomb Practice**: Worked through Hudl Statsbomb's instructor-led course using professional match event data.`,
      buttons: [
        { label: "TensorFlow Model Training", url: "https://colab.research.google.com/drive/1qTp2iTdaLeBDgeSrwBz0ityEPR13Wwqn#scrollTo=ZUxp8Gbc78Tr", isPrimary: true },
        { label: "Key Attributes Research", url: "https://colab.research.google.com/drive/1hvzIVNLCyGiIe6PC4wNREZSpyn7_6Jlq", isPrimary: true },
        { label: "Data Trend Research", url: "https://colab.research.google.com/drive/1kWvLfu8Qhcf_Y35QCAMRz7_V_Wq-Xqsn", isPrimary: true },
        { label: "SHAP Chart Analysis", url: "https://colab.research.google.com/drive/1JNuF4g_PADBBNUXf6pVTsPhbBVgl9HtQ#scrollTo=k_kZIpCO_hPr", isPrimary: true },
        { label: "Statsbomb Practice", url: "https://colab.research.google.com/drive/1H5muOl3fLcOAdAZUgN8295gJtrJlehJW", isPrimary: true },
      ],
    },
    {
      name: "2D Pixel Art RPG",
      category: "Godot",
      img: "https://ywayezjxjhudlfxw.public.blob.vercel-storage.com/chiharunquest_title_small-TRGu3gIf3Y6gmDT1y9mZCDDDgaMXHQ.png",
      descriptionShort: "A 2D pixel art RPG I created as a birthday gift — and my first game development project.",
      descriptionLong: `An RPG game I made as a birthday gift for my wife. The game lets her play through some of our key memories by controlling me as the player character.

**Project Background**

I was never great at writing birthday cards, and I've always been curious about game development — so I decided to express myself through character dialogue and monologues in a simple RPG instead.

**Technology Used**

**Godot**: An open-source game development platform ideal for 2D RPGs. There was a learning curve getting comfortable with scenes and scripts, but having Python experience helped a lot since the GDScript syntax is quite similar.`,
      buttons: [
        { label: "GitHub", url: "https://github.com/JTee9/ChiharunQuest", isPrimary: true },
      ],
    },
  ],

  // ----------------------------------------------------------
  // CONTACT SECTION
  // Text and buttons shown in the Contact section.
  // Use "mailto:..." for email, or a full URL for others.
  // ----------------------------------------------------------
  contact: {
    text: "Feel free to contact me for any inquiry.\n\nI'm looking forward to working with you!",
    buttons: [
      { label: "Email", url: "mailto:jimmytalbot9@gmail.com", isPrimary: true },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/jimmy-talbot-79333058/", isPrimary: true },
    ],
  },
};

// ============================================================
// THEME
// Adjust CSS custom properties here to retheme the entire site.
// ============================================================
const THEME = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

  :root {
    --bg:           #0d0f14;
    --bg-card:      #13161d;
    --bg-card-hover:#181c25;
    --border:       rgba(255,255,255,0.07);
    --accent:       #5b9cf6;
    --accent-dim:   rgba(91,156,246,0.15);
    --accent-glow:  rgba(91,156,246,0.35);
    --text:         #e8ecf4;
    --text-muted:   #6b7280;
    --text-soft:    #9ca3af;
    --font-display: 'DM Serif Display', Georgia, serif;
    --font-body:    'DM Sans', sans-serif;
    --radius:       10px;
    --max-w:        900px;
    --transition:   0.22s ease;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-body);
    font-weight: 300;
    line-height: 1.7;
    -webkit-font-smoothing: antialiased;
  }

  a { color: inherit; text-decoration: none; }

  img { display: block; }

  /* ── Scrollbar ── */
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 99px; }

  /* ── Utility ── */
  .wrapper {
    max-width: var(--max-w);
    margin: 0 auto;
    padding: 0 24px;
  }

  /* ── Buttons ── */
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 10px 24px;
    border-radius: var(--radius);
    font-family: var(--font-body);
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all var(--transition);
    white-space: nowrap;
    border: 1.5px solid transparent;
    text-decoration: none;
  }
  .btn-primary {
    background: var(--accent);
    color: #0d0f14;
    border-color: var(--accent);
  }
  .btn-primary:hover { background: #7ab0f8; border-color: #7ab0f8; transform: translateY(-1px); }
  .btn-outline {
    background: transparent;
    color: var(--text);
    border-color: var(--border);
  }
  .btn-outline:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-1px); }

  /* ── Section headings ── */
  .section-title {
    font-family: var(--font-display);
    font-size: clamp(2rem, 5vw, 2.8rem);
    font-weight: 400;
    letter-spacing: -0.02em;
    text-align: center;
    margin-bottom: 3rem;
  }

  /* ── Fade-in animation ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .fade-up { animation: fadeUp 0.6s ease both; }
  .delay-1 { animation-delay: 0.1s; }
  .delay-2 { animation-delay: 0.2s; }
  .delay-3 { animation-delay: 0.3s; }
  .delay-4 { animation-delay: 0.4s; }

  /* ── Modal overlay ── */
  .modal-overlay {
    position: fixed; inset: 0; z-index: 1000;
    background: rgba(0,0,0,0.75);
    backdrop-filter: blur(6px);
    display: flex; align-items: center; justify-content: center;
    padding: 24px;
    animation: fadeUp 0.2s ease;
  }
  .modal-box {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 14px;
    max-width: 640px;
    width: 100%;
    max-height: 85vh;
    overflow-y: auto;
    padding: 36px;
    position: relative;
  }
  .modal-close {
    position: absolute; top: 16px; right: 16px;
    background: none; border: none; color: var(--text-muted);
    cursor: pointer; font-size: 1.4rem; line-height: 1;
    transition: color var(--transition);
  }
  .modal-close:hover { color: var(--text); }

  /* ── Responsive ── */
  @media (max-width: 640px) {
    .modal-box { padding: 24px; }
    .wrapper { padding: 0 18px; }
  }
`;

// ============================================================
// HELPER COMPONENTS
// ============================================================

/** Simple SVG icons used throughout */
const Icon = ({ name, size = 22 }) => {
  const icons = {
    github: <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />,
    linkedin: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />,
    twitter: <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />,
    settings: null, // rendered inline below
    pen: null,
    x: null,
    menu: null,
    chevron: null,
  };
  if (name === "settings") return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" />
    </svg>
  );
  if (name === "pen") return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
    </svg>
  );
  if (name === "x") return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18" /><path d="m6 6 12 12" />
    </svg>
  );
  if (name === "menu") return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12h18" /><path d="M3 18h18" /><path d="M3 6h18" />
    </svg>
  );
  if (name === "chevron") return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      {icons[name]}
    </svg>
  );
};

/** Social icon links row */
const SocialLinks = ({ style = {} }) => (
  <div style={{ display: "flex", gap: "14px", alignItems: "center", ...style }}>
    {DATA.personal.social.twitter && (
      <a href={DATA.personal.social.twitter} target="_blank" rel="noreferrer"
        style={{ color: "var(--text-muted)", transition: "color var(--transition)" }}
        onMouseEnter={e => e.currentTarget.style.color = "var(--text)"}
        onMouseLeave={e => e.currentTarget.style.color = "var(--text-muted)"}>
        <Icon name="twitter" size={20} />
      </a>
    )}
    {DATA.personal.social.github && (
      <a href={DATA.personal.social.github} target="_blank" rel="noreferrer"
        style={{ color: "var(--text-muted)", transition: "color var(--transition)" }}
        onMouseEnter={e => e.currentTarget.style.color = "var(--text)"}
        onMouseLeave={e => e.currentTarget.style.color = "var(--text-muted)"}>
        <Icon name="github" size={20} />
      </a>
    )}
    {DATA.personal.social.linkedin && (
      <a href={DATA.personal.social.linkedin} target="_blank" rel="noreferrer"
        style={{ color: "var(--text-muted)", transition: "color var(--transition)" }}
        onMouseEnter={e => e.currentTarget.style.color = "var(--text)"}
        onMouseLeave={e => e.currentTarget.style.color = "var(--text-muted)"}>
        <Icon name="linkedin" size={20} />
      </a>
    )}
  </div>
);

/** Scrolls to a section by id, or follows external link */
const handleNav = (url) => {
  if (url.startsWith("#")) {
    const el = document.querySelector(url);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  } else {
    window.open(url, "_blank", "noreferrer");
  }
};

/** Renders a button from the data shape { label, url, isPrimary } */
const DataButton = ({ btn, style = {} }) => (
  <a
    href={btn.url}
    target={btn.url.startsWith("#") || btn.url.startsWith("mailto") ? "_self" : "_blank"}
    rel="noreferrer"
    className={`btn ${btn.isPrimary ? "btn-primary" : "btn-outline"}`}
    style={style}
    onClick={btn.url.startsWith("#") ? (e) => { e.preventDefault(); handleNav(btn.url); } : undefined}
  >
    {btn.label}
  </a>
);

/** Formats multi-paragraph text (split on \n\n) with basic **bold** support */
const FormattedText = ({ text, style = {} }) => {
  const paragraphs = text.split(/\n\n+/);
  return (
    <div style={style}>
      {paragraphs.map((para, i) => {
        // Simple **bold** rendering
        const parts = para.split(/\*\*(.*?)\*\*/g);
        return (
          <p key={i} style={{ marginBottom: i < paragraphs.length - 1 ? "0.9em" : 0 }}>
            {parts.map((part, j) => j % 2 === 1 ? <strong key={j}>{part}</strong> : part)}
          </p>
        );
      })}
    </div>
  );
};

/** Generic modal dialog — renders children inside an overlay */
const Modal = ({ onClose, children }) => {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-box">
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <Icon name="x" size={20} />
        </button>
        {children}
      </div>
    </div>
  );
};

// ============================================================
// SECTION: NAVBAR
// ============================================================

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Skills", href: "#skills" },
  ];

  const navStyle = {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
    transition: "background var(--transition), border-color var(--transition)",
    background: scrolled ? "rgba(13,15,20,0.92)" : "transparent",
    borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
    backdropFilter: scrolled ? "blur(12px)" : "none",
  };

  return (
    <nav style={navStyle}>
      <div className="wrapper" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        {/* Logo */}
        <a href="#hero" onClick={(e) => { e.preventDefault(); handleNav("#hero"); }}>
          <img src={DATA.personal.logo} alt="Logo" style={{ width: 32, height: 32, objectFit: "contain" }} />
        </a>

        {/* Desktop nav */}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }} className="desktop-nav">
          {navLinks.map(link => (
            <button key={link.href}
              onClick={() => handleNav(link.href)}
              style={{
                background: "none", border: "none", color: "var(--text-soft)",
                fontFamily: "var(--font-body)", fontSize: "0.875rem", fontWeight: 400,
                padding: "8px 14px", cursor: "pointer", borderRadius: "var(--radius)",
                transition: "color var(--transition)",
              }}
              onMouseEnter={e => e.currentTarget.style.color = "var(--text)"}
              onMouseLeave={e => e.currentTarget.style.color = "var(--text-soft)"}
            >
              {link.label}
            </button>
          ))}
          <button className="btn btn-primary" style={{ marginLeft: 8 }} onClick={() => handleNav("#contact")}>
            Contact
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(v => !v)}
          style={{ background: "none", border: "none", color: "var(--text)", cursor: "pointer", display: "none" }}
          className="mobile-menu-btn"
          aria-label="Toggle menu"
        >
          <Icon name="menu" size={24} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div style={{
          background: "rgba(13,15,20,0.97)", borderBottom: "1px solid var(--border)",
          padding: "12px 24px 20px",
        }}>
          {navLinks.map(link => (
            <button key={link.href}
              onClick={() => { handleNav(link.href); setMobileOpen(false); }}
              style={{
                display: "block", width: "100%", textAlign: "left", background: "none",
                border: "none", color: "var(--text-soft)", fontFamily: "var(--font-body)",
                fontSize: "1rem", padding: "10px 0", cursor: "pointer",
              }}
            >
              {link.label}
            </button>
          ))}
          <button className="btn btn-primary" style={{ marginTop: 12, width: "100%" }}
            onClick={() => { handleNav("#contact"); setMobileOpen(false); }}>
            Contact
          </button>
        </div>
      )}

      {/* Responsive style for mobile nav button */}
      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
};

// ============================================================
// SECTION: HERO
// ============================================================

const Hero = () => (
  <section id="hero" style={{
    minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
    position: "relative", overflow: "hidden",
  }}>
    {/* Subtle radial glow background — distinct from original particles */}
    <div style={{
      position: "absolute", inset: 0,
      background: "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(91,156,246,0.08) 0%, transparent 70%)",
      pointerEvents: "none",
    }} />
    {/* Grid texture overlay */}
    <div style={{
      position: "absolute", inset: 0, opacity: 0.03,
      backgroundImage: "linear-gradient(var(--text) 1px, transparent 1px), linear-gradient(90deg, var(--text) 1px, transparent 1px)",
      backgroundSize: "60px 60px",
      pointerEvents: "none",
    }} />

    <div className="wrapper" style={{ textAlign: "center", position: "relative", zIndex: 1, paddingTop: 80, paddingBottom: 80 }}>
      {/* Logo */}
      <div className="fade-up" style={{ marginBottom: 20 }}>
        <img src={DATA.personal.logo} alt="Logo"
          style={{ width: 52, height: 52, objectFit: "contain", display: "inline-block", borderRadius: 10 }} />
      </div>

      {/* Name */}
      <h1 className="fade-up delay-1" style={{
        fontFamily: "var(--font-display)", fontSize: "clamp(2.8rem, 8vw, 5rem)",
        fontWeight: 400, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 16,
      }}>
        {DATA.personal.firstName} <span style={{ color: "var(--accent)" }}>{DATA.personal.lastName}</span>
      </h1>

      {/* Divider */}
      <div className="fade-up delay-2" style={{
        width: 48, height: 2, background: "var(--accent)", margin: "0 auto 24px", borderRadius: 99,
      }} />

      {/* Social links */}
      <div className="fade-up delay-2" style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
        <SocialLinks />
      </div>

      {/* Tagline */}
      <p className="fade-up delay-3" style={{
        maxWidth: 500, margin: "0 auto 36px", color: "var(--text-soft)",
        fontSize: "1rem", lineHeight: 1.7,
      }}>
        {DATA.personal.tagline}
      </p>

      {/* CTA buttons */}
      <div className="fade-up delay-4" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
        {DATA.heroButtons.map((btn, i) => <DataButton key={i} btn={btn} />)}
      </div>
    </div>

    {/* Scroll hint */}
    <div style={{
      position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)",
      color: "var(--text-muted)", cursor: "pointer", animation: "bob 2s ease-in-out infinite",
    }}
      onClick={() => handleNav("#about")}
    >
      <Icon name="chevron" size={28} />
    </div>
    <style>{`@keyframes bob { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(6px)} }`}</style>
  </section>
);

// ============================================================
// SECTION: ABOUT (bio + timeline + buttons)
// ============================================================

const Timeline = () => {
  // Calculate total span for proportional widths
  const allEntries = DATA.timeline;
  const globalStart = allEntries[0].start;
  const globalEnd = allEntries[allEntries.length - 1].end ?? new Date().getFullYear();
  const totalSpan = globalEnd - globalStart;

  return (
    <div style={{ marginTop: 48 }}>
      {/* Desktop horizontal timeline */}
      <div className="timeline-desktop" style={{ position: "relative", height: 80, display: "flex", alignItems: "center" }}>
        {allEntries.map((entry, i) => {
          const segEnd = entry.end ?? globalEnd;
          const width = ((segEnd - entry.start) / totalSpan) * 100;
          return (
            <div key={i} style={{ position: "relative", width: `${width}%`, flexShrink: 0 }}>
              {/* Line */}
              <div style={{ height: 1, background: "var(--border)", width: "100%" }} />
              {/* Start dot */}
              <div style={{
                position: "absolute", left: 0, top: 0,
                width: 12, height: 12, borderRadius: "50%",
                background: "var(--bg-card)", border: "2px solid var(--accent)",
                transform: "translate(-50%, -50%)",
              }} />
              {/* Year */}
              <span style={{
                position: "absolute", left: 0, top: -20,
                transform: "translateX(-50%)", fontSize: 11,
                color: "var(--text-muted)", whiteSpace: "nowrap",
              }}>{entry.start}</span>
              {/* Role above line */}
              <span style={{
                position: "absolute", left: "50%", top: -36,
                transform: "translateX(-50%)", fontSize: 12,
                color: "var(--text-soft)", textAlign: "center", whiteSpace: "nowrap",
              }}>{entry.role}</span>
              {/* Company below line */}
              <span style={{
                position: "absolute", left: "50%", top: 12,
                transform: "translateX(-50%)", fontSize: 12,
                color: "var(--text-muted)", textAlign: "center", whiteSpace: "nowrap",
              }}>{entry.company}</span>
            </div>
          );
        })}
        {/* End dot + "Now" */}
        <div style={{
          position: "absolute", right: 0, top: "50%",
          width: 12, height: 12, borderRadius: "50%",
          background: "var(--bg-card)", border: "2px solid rgba(91,156,246,0.3)",
          transform: "translate(50%, -50%)",
        }} />
        <span style={{
          position: "absolute", right: -4, top: "50%",
          transform: "translateY(calc(-50% + 18px))", fontSize: 11,
          color: "var(--text-muted)",
        }}>Now</span>
      </div>

      {/* Mobile vertical timeline */}
      <div className="timeline-mobile" style={{ display: "none" }}>
        {allEntries.map((entry, i) => (
          <div key={i} style={{ display: "flex", gap: 16, marginBottom: 24 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--accent)", marginTop: 5, flexShrink: 0 }} />
              {i < allEntries.length - 1 && <div style={{ width: 1, flex: 1, background: "var(--border)", marginTop: 4 }} />}
            </div>
            <div style={{ paddingBottom: 4 }}>
              <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{entry.start} – {entry.end ?? "Now"}</span>
              <p style={{ fontWeight: 500, color: "var(--text)", marginTop: 2 }}>{entry.role || "—"}</p>
              <p style={{ fontSize: 13, color: "var(--text-muted)" }}>{entry.company}</p>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .timeline-desktop { display: none !important; }
          .timeline-mobile { display: block !important; }
        }
      `}</style>
    </div>
  );
};

const About = () => (
  <section id="about" style={{ padding: "100px 0" }}>
    <div className="wrapper">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "48px", alignItems: "start" }}>
        {/* Profile picture */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            src={DATA.personal.profilePicture}
            alt={`${DATA.personal.firstName} ${DATA.personal.lastName}`}
            style={{
              width: 180, height: 180, borderRadius: "50%", objectFit: "cover",
              border: "3px solid var(--border)",
              boxShadow: "0 0 40px var(--accent-glow)",
            }}
          />
        </div>

        {/* Bio */}
        <div>
          <FormattedText text={DATA.personal.bio} style={{ color: "var(--text-soft)", fontSize: "0.97rem" }} />
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 28 }}>
            {DATA.aboutButtons.map((btn, i) => <DataButton key={i} btn={btn} />)}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <Timeline />
    </div>

    <style>{`
      @media (max-width: 640px) {
        #about .wrapper > div[style*="grid"] {
          grid-template-columns: 1fr !important;
        }
      }
    `}</style>
  </section>
);

// ============================================================
// SECTION: SERVICES
// ============================================================

const ServiceCard = ({ service }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div style={{
        background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14,
        padding: "32px 28px", display: "flex", flexDirection: "column", gap: 12,
        transition: "border-color var(--transition), transform var(--transition)",
        cursor: "default",
      }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(91,156,246,0.3)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateY(0)"; }}
      >
        <div style={{ color: "var(--accent)" }}>
          <Icon name={service.icon} size={30} />
        </div>
        <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.25rem" }}>
          {service.name}
        </h3>
        <p style={{ color: "var(--text-soft)", fontSize: "0.9rem", flex: 1 }}>
          {service.descriptionShort}
        </p>
        <button className="btn btn-outline" style={{ marginTop: 8, width: "100%" }} onClick={() => setOpen(true)}>
          Read more
        </button>
      </div>

      {open && (
        <Modal onClose={() => setOpen(false)}>
          <div style={{ color: "var(--accent)", marginBottom: 12 }}>
            <Icon name={service.icon} size={26} />
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.6rem", marginBottom: 16 }}>
            {service.name}
          </h2>
          <FormattedText text={service.descriptionLong} style={{ color: "var(--text-soft)", fontSize: "0.95rem" }} />
        </Modal>
      )}
    </>
  );
};

const Services = () => (
  <section id="services" style={{ padding: "100px 0", background: "var(--bg-card)" }}>
    <div className="wrapper">
      <h2 className="section-title">Services</h2>
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
        {DATA.services.map((service, i) => (
          <div key={i} style={{ flex: "1 1 280px", maxWidth: 360 }}>
            <ServiceCard service={service} />
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ============================================================
// SECTION: PORTFOLIO
// ============================================================

const ProjectModal = ({ project, onClose }) => (
  <Modal onClose={onClose}>
    <img src={project.img} alt={project.name}
      style={{ width: "100%", height: 200, objectFit: "cover", borderRadius: 8, marginBottom: 20 }} />
    <span style={{
      fontSize: 11, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase",
      color: "var(--accent)", background: "var(--accent-dim)", padding: "3px 10px",
      borderRadius: 99, marginBottom: 12, display: "inline-block",
    }}>
      {project.category}
    </span>
    <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.5rem", margin: "8px 0 14px" }}>
      {project.name}
    </h2>
    <FormattedText text={project.descriptionLong} style={{ color: "var(--text-soft)", fontSize: "0.92rem", marginBottom: 20 }} />
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 8 }}>
      {project.buttons.map((btn, i) => <DataButton key={i} btn={btn} />)}
    </div>
  </Modal>
);

const ProjectCard = ({ project }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        style={{
          background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14,
          overflow: "hidden", cursor: "pointer",
          transition: "border-color var(--transition), transform var(--transition)",
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(91,156,246,0.3)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateY(0)"; }}
      >
        {/* Image */}
        <div style={{ height: 200, overflow: "hidden" }}>
          <img src={project.img} alt={project.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
            onMouseEnter={e => e.target.style.transform = "scale(1.04)"}
            onMouseLeave={e => e.target.style.transform = "scale(1)"}
          />
        </div>
        {/* Card body */}
        <div style={{ padding: "18px 20px 22px" }}>
          <span style={{
            fontSize: 11, fontWeight: 500, letterSpacing: "0.07em", textTransform: "uppercase",
            color: "var(--accent)", background: "var(--accent-dim)", padding: "2px 9px",
            borderRadius: 99, marginBottom: 8, display: "inline-block",
          }}>
            {project.category}
          </span>
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.1rem", margin: "6px 0 8px" }}>
            {project.name}
          </h3>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.55 }}>
            {project.descriptionShort}
          </p>
        </div>
      </div>

      {open && <ProjectModal project={project} onClose={() => setOpen(false)} />}
    </>
  );
};

const Portfolio = () => {
  const categories = ["All", ...new Set(DATA.projects.map(p => p.category))];
  const [activeFilter, setActiveFilter] = useState("All");
  const filtered = activeFilter === "All" ? DATA.projects : DATA.projects.filter(p => p.category === activeFilter);

  return (
    <section id="portfolio" style={{ padding: "100px 0" }}>
      <div className="wrapper">
        <h2 className="section-title">Portfolio</h2>

        {/* Filter buttons */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap", marginBottom: 40 }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`btn ${activeFilter === cat ? "btn-primary" : "btn-outline"}`}
              style={{ padding: "6px 16px", fontSize: "0.8rem" }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 24,
        }}>
          {filtered.map((project, i) => (
            <ProjectCard key={i} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================
// SECTION: SKILLS
// ============================================================

/** Color map for skill group categories */
const GROUP_COLORS = {
  "Programming":        { bg: "rgba(91,156,246,0.12)",  text: "#5b9cf6" },
  "Data Engineering":   { bg: "rgba(248,184,62,0.12)",  text: "#f8b83e" },
  "Data Visualization": { bg: "rgba(244,114,182,0.12)", text: "#f472b6" },
  "Tools":              { bg: "rgba(52,211,153,0.12)",  text: "#34d399" },
};
const DEFAULT_COLOR = { bg: "rgba(156,163,175,0.12)", text: "#9ca3af" };

const Skills = () => {
  const groups = [...new Set(DATA.skills.map(s => s.group))];

  return (
    <section id="skills" style={{ padding: "100px 0", background: "var(--bg-card)" }}>
      <div className="wrapper">
        <h2 className="section-title">Skills</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {groups.map(group => {
            const groupSkills = DATA.skills.filter(s => s.group === group);
            const color = GROUP_COLORS[group] ?? DEFAULT_COLOR;
            return (
              <div key={group}>
                {/* Group label */}
                <p style={{
                  fontSize: 11, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase",
                  color: "var(--text-muted)", marginBottom: 14,
                }}>
                  {group}
                </p>
                {/* Skill tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {groupSkills.map((skill, i) => (
                    <div key={i} style={{
                      background: color.bg,
                      color: color.text,
                      border: `1px solid ${color.text}30`,
                      borderRadius: 99,
                      padding: "6px 16px",
                      fontSize: "0.88rem",
                      fontWeight: 400,
                      /* Slightly larger for high-value skills */
                      opacity: skill.value >= 80 ? 1 : 0.7,
                      transition: "opacity var(--transition), transform var(--transition)",
                      cursor: "default",
                    }}
                      onMouseEnter={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1.04)"; }}
                      onMouseLeave={e => { e.currentTarget.style.opacity = skill.value >= 80 ? "1" : "0.7"; e.currentTarget.style.transform = "scale(1)"; }}
                    >
                      {skill.name}
                      {/* Proficiency bar */}
                      <span style={{
                        display: "inline-block", marginLeft: 8, width: 28, height: 3,
                        borderRadius: 99, background: `${color.text}30`, verticalAlign: "middle",
                        position: "relative", overflow: "hidden",
                      }}>
                        <span style={{
                          position: "absolute", left: 0, top: 0, bottom: 0,
                          width: `${skill.value}%`, background: color.text, borderRadius: 99,
                        }} />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ============================================================
// SECTION: CONTACT
// ============================================================

const Contact = () => (
  <section id="contact" style={{ padding: "100px 0" }}>
    <div className="wrapper" style={{ textAlign: "center" }}>
      <h2 className="section-title">Contact</h2>
      <p style={{ color: "var(--text-soft)", maxWidth: 420, margin: "0 auto 36px", lineHeight: 1.7 }}>
        {DATA.contact.text.split("\n\n").map((line, i) => (
          <span key={i} style={{ display: "block", marginBottom: i < DATA.contact.text.split("\n\n").length - 1 ? "0.8em" : 0 }}>
            {line}
          </span>
        ))}
      </p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
        {DATA.contact.buttons.map((btn, i) => <DataButton key={i} btn={btn} />)}
      </div>
    </div>
  </section>
);

// ============================================================
// SECTION: FOOTER
// ============================================================

const Footer = () => (
  <footer style={{
    background: "var(--bg-card)", borderTop: "1px solid var(--border)",
    padding: "28px 0",
  }}>
    <div className="wrapper" style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      flexWrap: "wrap", gap: 16,
    }}>
      <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
        © {DATA.personal.firstName} {DATA.personal.lastName} {new Date().getFullYear()}
      </p>
      <SocialLinks />
    </div>
  </footer>
);

// ============================================================
// ROOT APP COMPONENT
// ============================================================

export default function App() {
  return (
    <>
      {/* Inject global styles & Google Fonts */}
      <style>{THEME}</style>

      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
