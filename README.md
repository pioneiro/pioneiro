# 🎯 Soumyajit Das | Product Engineer Portfolio

> A modern, performant, and fully responsive portfolio website showcasing 3.5+ years of professional experience in full-stack engineering, AdTech platforms, and scalable web architectures.

[![Live](https://img.shields.io/badge/Live-dsoumyajit.in-4F46E5?style=flat-square)](https://dsoumyajit.in)
[![Vue 3](https://img.shields.io/badge/Vue-3.5-4FC08D?style=flat-square&logo=vue.js)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38BDF8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

---

## 📋 Overview

This is a **single-page application (SPA)** portfolio built to showcase professional experience, technical skills, education background, and career achievements. The website features smooth scrolling navigation, intersection-based animations, mobile-responsive design, and dual-channel contact functionality (Email & WhatsApp).

**Live Website:** [dsoumyajit.in](https://dsoumyajit.in)

---

## ✨ Features

### 🎨 **Design & UX**

- **Modern dark theme** with indigo/emerald accent colors
- **Smooth scroll navigation** with active section tracking
- **Intersection Observer animations** for fade-in effects on scroll
- **Scroll-direction aware back-to-top button**
- **Mobile-first responsive design** with hamburger menu
- **Accessible semantic HTML** with proper ARIA labels

### 🚀 **Performance Optimizations**

- **Resource hints**: `preconnect` and `preload` for critical assets (LCP optimization)
- **WebP image format** for hero portrait
- **Font optimization**: Google Fonts with `display=swap`
- **HMR (Hot Module Replacement)** configured for fast development
- **Optimized Tailwind CSS** with modern v4 `@theme` syntax

### 📱 **Sections**

1. **About** — Professional introduction with portrait, resume download, and social links
2. **Skills** — 8 categorized technical skill groups with custom icons (Languages, Frontend, Backend, Databases, DevOps, Testing, APIs, Agile)
3. **Experience** — Timeline-based career journey with role highlights and achievements
4. **Education** — Academic background with institution details
5. **Connect** — Dual-channel contact form (Email & WhatsApp) with success toast notifications

### 🔧 **Technical Highlights**

- **Vue 3 Composition API** with `<script setup>` syntax
- **TypeScript** for type-safe development
- **Tailwind CSS 4.x** with custom theme configuration
- **Lucide Vue** icons for consistent iconography
- **Centralized configuration** via `metadata.json`
- **SEO optimized** with Open Graph tags for social sharing
- **Custom fonts**: Inter (sans-serif) & JetBrains Mono (monospace)

---

## 🛠️ Tech Stack

| Category       | Technologies                                    |
| -------------- | ----------------------------------------------- |
| **Frontend**   | Vue 3.5, TypeScript 5.8, Tailwind CSS 4.1       |
| **Build Tool** | Vite 6.2 with HMR optimization                  |
| **Icons**      | Lucide Vue Next 1.0                             |
| **Fonts**      | Google Fonts (Inter, JetBrains Mono)            |
| **Deployment** | Static site hosting (Vercel/Netlify/Cloudflare) |

---

## 📂 Project Structure

```
dsoumyajit/
├── public/                    # Static assets
│   ├── robots.txt            # SEO crawler rules
│   ├── sitemap.xml           # Site structure for search engines
│   ├── resume.pdf            # Downloadable resume
│   ├── icons/                # Favicon and app icons
│   └── images/               # Profile photo and assets
├── src/
│   ├── App.vue               # Main SPA component (800+ lines)
│   ├── main.ts               # App entry point
│   ├── index.css             # Global styles & Tailwind imports
│   └── env.d.ts              # TypeScript declarations
├── index.html                # HTML template with SEO meta tags
├── metadata.json             # Centralized portfolio configuration
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite build configuration
└── README.md                 # This file
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18+ recommended)
- **npm** or **pnpm**

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/dsoumyajit/.github.git
   cd dsoumyajit
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run development server:**

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:3000`

4. **Build for production:**

   ```bash
   npm run build
   ```

   Output will be in the `dist/` folder.

5. **Type-check (optional):**
   ```bash
   npm run lint
   ```

---

## 📝 Configuration

All portfolio content is managed through **`metadata.json`**, making it easy to update without touching component code.

### Key Configuration Sections:

- `personal` — Name, role, company, contact info, about paragraphs
- `skills` — Technical skills grouped by category
- `experiences` — Professional work history with highlights
- `education` — Academic credentials

**Example:**

```json
{
  "portfolio": {
    "personal": {
      "name": "Soumyajit Das",
      "role": "Product Engineer",
      "email": "dsoumyajit.co@gmail.com",
      "linkedin": "https://linkedin.com/in/dsoumyajit/",
      "github": "https://github.com/dsoumyajit/"
    },
    "skills": [
      {
        "category": "Frontend",
        "skills": ["Vue.js", "Tailwind CSS", "TypeScript"]
      }
    ]
  }
}
```

---

## 🎨 Customization

### **Colors**

Modify the color scheme in [src/index.css](src/index.css):

- Primary: `#4F46E5` (Indigo)
- Accent: `#10B981` (Emerald)
- Background: `#070A13` (Dark Blue)

### **Fonts**

Change fonts in [index.html](index.html) Google Fonts link and [src/index.css](src/index.css) `@theme` block.

### **Sections**

Add/remove sections by editing [src/App.vue](src/App.vue) template and navigation links.

---

## 📊 Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint (FCP)**: < 1.2s
- **Largest Contentful Paint (LCP)**: < 2.0s (optimized with `preload`)
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Time to Interactive (TTI)**: < 3.0s

---

## 🤝 Contact

**Soumyajit Das**  
📧 [dsoumyajit.co@gmail.com](mailto:dsoumyajit.co@gmail.com)  
💼 [LinkedIn](https://linkedin.com/in/dsoumyajit/)  
🐙 [GitHub](https://github.com/dsoumyajit/)  
🌐 [Portfolio](https://dsoumyajit.in)  
📞 [+91 9647395037](tel:+919647395037)

---

## 📄 License

This portfolio is open-source and available for personal reference. Please do not use the content or design for commercial purposes without permission.

---

<div align="center">
  <sub>Built with ❤️ using Vue 3, TypeScript, and Tailwind CSS</sub>
</div>
