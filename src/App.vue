<script setup lang="ts">
import { ref, onMounted, onUnmounted, markRaw } from 'vue';
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  Send,
  ArrowUpRight,
  Database,
  Cpu,
  Zap,
  GraduationCap,
  ArrowUp,
  Code,
  Layers,
  Settings,
  Download
} from 'lucide-vue-next';

// Portrait image asset
const portraitUrl = '/images/soumyajit-das.webp';

// Centralized JSON Configuration imported from metadata.json
import metadata from '../metadata.json';

const PORTFOLIO_CONFIG = metadata.portfolio;

// Helper to return appropriate icon component for skill categories
const getCategoryIcon = (category: string) => {
  const lower = category.toLowerCase();
  if (lower.includes('languages')) return Code;
  if (lower.includes('frontend')) return Layers;
  if (lower.includes('backend')) return Cpu;
  if (lower.includes('database')) return Database;
  if (lower.includes('devops') || lower.includes('pipeline')) return Settings;
  if (lower.includes('testing') || lower.includes('debugging')) return CheckCircle;
  if (lower.includes('api') || lower.includes('integration')) return Send;
  return Zap;
};

// State managers
const nameInput = ref('');
const messageInput = ref('');
const isSubmitting = ref(false);
const showSuccessToast = ref(false);
const isMobileMenuOpen = ref(false);
const activeSection = ref('about');
const lastUsedChannel = ref<'email' | 'whatsapp'>('email');

// Scroll-direction back to top logic
const showScrollTop = ref(false);
let lastScrollY = 0;

// Handles smart scrolling dynamics (only show top trigger when actively scrolling UP)
const handleScrollDirection = () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > 400 && currentScrollY < lastScrollY) {
    showScrollTop.value = true;
  } else {
    showScrollTop.value = false;
  }

  lastScrollY = currentScrollY;
};

// Smooth section navigator with exact element matching
const scrollToSection = (id: string) => {
  const target = document.getElementById(id);
  if (target) {
    // Fixed offset of 76px provides a clean visual margin under the sticky navigation header
    const position = target.getBoundingClientRect().top + window.scrollY - 76;
    window.scrollTo({
      top: position,
      behavior: 'smooth'
    });
  }
};

const handleMobileNavigate = (id: string) => {
  isMobileMenuOpen.value = false;
  scrollToSection(id);
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

// Form submit action - structures a friendly message and directs to the selected channel (Email or WhatsApp)
const submitToChannel = (channel: 'email' | 'whatsapp') => {
  if (!nameInput.value.trim() || !messageInput.value.trim()) {
    return;
  }

  isSubmitting.value = true;
  lastUsedChannel.value = channel;

  if (channel === 'email') {
    const recipient = PORTFOLIO_CONFIG.personal.email;
    const emailSubject = `Hello Soumyajit! — Let's connect (from ${nameInput.value})`;

    // Clean, warm, and highly engaging email body template
    const emailBody = `Hi Soumyajit,

I visited your portfolio and would love to get in touch!

From: ${nameInput.value}

Message:
${messageInput.value}

Let's connect soon!

Best regards,
${nameInput.value}`;

    const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoUrl;
  } else {
    const rawPhone = PORTFOLIO_CONFIG.personal.phone.replace(/[^0-9]/g, '');

    // Clean, crisp WhatsApp text message
    const waText = `Hi Soumyajit,

I visited your portfolio and would love to get in touch!

From: ${nameInput.value}

Message:
${messageInput.value}`;

    const waUrl = `https://wa.me/${rawPhone}?text=${encodeURIComponent(waText)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  }

  // Friendly visual interaction feedback loop
  setTimeout(() => {
    nameInput.value = '';
    messageInput.value = '';
    isSubmitting.value = false;
    showSuccessToast.value = true;

    setTimeout(() => {
      showSuccessToast.value = false;
    }, 5000);
  }, 1200);
};

let revealObserver: IntersectionObserver | null = null;
let activeObserver: IntersectionObserver | null = null;

// Attach listeners
onMounted(() => {
  window.addEventListener('scroll', handleScrollDirection, { passive: true });

  // 1. Reveal (Fade-in) scroll observer
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        if (revealObserver) {
          revealObserver.unobserve(entry.target);
        }
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -60px 0px'
  });

  // 2. Active Section tracker scroll observer
  activeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activeSection.value = entry.target.id;
      }
    });
  }, {
    threshold: 0,
    rootMargin: '-30% 0px -55% 0px'
  });

  // Observe all sections
  const sections = document.querySelectorAll('section[id]');
  sections.forEach((section) => {
    section.classList.add('section-fade');
    if (revealObserver) revealObserver.observe(section);
    if (activeObserver) activeObserver.observe(section);
  });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScrollDirection);
  if (revealObserver) revealObserver.disconnect();
  if (activeObserver) activeObserver.disconnect();
});
</script>

<template>
  <div
    class="min-h-screen bg-[#070A13] text-[#F1F5F9] flex flex-col justify-between selection:bg-indigo-600/30 selection:text-white w-full">

    <!-- Mobile Menu Backdrop Overlay (closes menu when clicking/touching outside) -->
    <div v-if="isMobileMenuOpen"
      class="fixed inset-0 bg-black/55 backdrop-blur-[1.5px] z-40 sm:hidden transition-all duration-300"
      @click="isMobileMenuOpen = false" />

    <!-- Top Modern Fixed Header -->
    <header
      class="fixed top-0 left-0 right-0 z-50 bg-[#070A13]/95 backdrop-blur-md border-b border-gray-900/60 py-3.5 px-4 sm:px-6 w-full">
      <div class="max-w-5xl mx-auto flex items-center justify-between gap-4">

        <!-- Tight gap logo combination -->
        <a href="/" class="flex items-center space-x-1.5 focus:outline-none py-1 group shrink-0">
          <span
            class="font-sans text-sm sm:text-base tracking-tight text-white font-bold transition group-hover:opacity-90">
            dsoumyajit<span class="text-[#4F46E5] group-hover:text-indigo-400 transition">.in</span>
          </span>
        </a>

        <!-- Fast Desktop/Tablet Nav Bar (hidden on mobile) -->
        <nav class="hidden sm:flex items-center space-x-3 md:space-x-5 text-xs font-mono shrink-0">
          <button @click="scrollToSection('about')"
            :class="activeSection === 'about' ? 'text-indigo-400 font-bold border-b-2 border-indigo-500' : 'text-slate-400 hover:text-white'"
            class="transition pb-0.5 pt-1 cursor-pointer">About</button>
          <button @click="scrollToSection('skills')"
            :class="activeSection === 'skills' ? 'text-indigo-400 font-bold border-b-2 border-indigo-500' : 'text-slate-400 hover:text-white'"
            class="transition pb-0.5 pt-1 cursor-pointer">Skills</button>
          <button @click="scrollToSection('experience')"
            :class="activeSection === 'experience' ? 'text-indigo-400 font-bold border-b-2 border-indigo-500' : 'text-slate-400 hover:text-white'"
            class="transition pb-0.5 pt-1 cursor-pointer">Experience</button>
          <button @click="scrollToSection('education')"
            :class="activeSection === 'education' ? 'text-indigo-400 font-bold border-b-2 border-indigo-500' : 'text-slate-400 hover:text-white'"
            class="transition pb-0.5 pt-1 cursor-pointer">Education</button>
          <a href="/resume.pdf" download="Soumyajit_Das_Resume.pdf" target="_blank"
            class="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-emerald-950/25 hover:bg-emerald-900/35 border border-emerald-500/20 hover:border-emerald-500/40 rounded-md text-emerald-400 hover:text-emerald-300 transition shrink-0 font-semibold cursor-pointer align-middle">
            <Download class="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>
          <button @click="scrollToSection('connect')"
            :class="activeSection === 'connect' ? 'text-indigo-300 bg-indigo-600/35 border-indigo-400/50' : 'text-indigo-400 hover:text-indigo-300 bg-indigo-950/25 border-indigo-500/20 hover:border-indigo-500/40'"
            class="font-semibold px-3 py-1 border rounded-md transition shrink-0 cursor-pointer inline-flex items-center space-x-1.5">
            <Mail class="w-3.5 h-3.5" />
            <span>Contact</span>
          </button>
        </nav>

        <!-- Mobile Toggle Button (hidden on bigger screens) -->
        <button @click="isMobileMenuOpen = !isMobileMenuOpen"
          class="sm:hidden text-slate-350 hover:text-white focus:outline-none focus:ring-0 p-1 cursor-pointer shrink-0"
          aria-label="Toggle Navigation Link Menu">
          <svg v-if="!isMobileMenuOpen" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Toggleable Mobile Topbar navigation dropdown (clean text matching desktop exactly) -->
      <transition name="menu-slide">
        <div v-if="isMobileMenuOpen"
          class="sm:hidden mt-3 pt-3 border-t border-gray-900/60 flex flex-col space-y-3.5 text-xs font-mono">
          <button @click="handleMobileNavigate('about')"
            :class="activeSection === 'about' ? 'text-indigo-400 font-bold pl-2 border-l-2 border-indigo-500' : 'text-slate-400 hover:text-white pl-2'"
            class="transition text-left py-1 cursor-pointer">About</button>
          <button @click="handleMobileNavigate('skills')"
            :class="activeSection === 'skills' ? 'text-indigo-400 font-bold pl-2 border-l-2 border-indigo-500' : 'text-slate-400 hover:text-white pl-2'"
            class="transition text-left py-1 cursor-pointer">Skills</button>
          <button @click="handleMobileNavigate('experience')"
            :class="activeSection === 'experience' ? 'text-indigo-400 font-bold pl-2 border-l-2 border-indigo-500' : 'text-slate-400 hover:text-white pl-2'"
            class="transition text-left py-1 cursor-pointer">Experience</button>
          <button @click="handleMobileNavigate('education')"
            :class="activeSection === 'education' ? 'text-indigo-400 font-bold pl-2 border-l-2 border-indigo-500' : 'text-slate-400 hover:text-white pl-2'"
            class="transition text-left py-1 cursor-pointer">Education</button>
          <a href="/resume.pdf" download="Soumyajit_Das_Resume.pdf" target="_blank"
            class="inline-flex items-center space-x-1.5 text-emerald-400 hover:text-emerald-350 transition text-left py-1 pl-2 font-semibold cursor-pointer align-middle">
            <Download class="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>
          <button @click="handleMobileNavigate('connect')"
            :class="activeSection === 'connect' ? 'text-indigo-300 font-bold pl-2 border-l-2 border-indigo-500' : 'text-[#4F46E5] hover:text-indigo-450 pl-2'"
            class="font-semibold transition text-left py-1 cursor-pointer inline-flex items-center space-x-1.5">
            <Mail class="w-3.5 h-3.5" />
            <span>Contact</span>
          </button>
        </div>
      </transition>
    </header>

    <!-- App Main Body Frame -->
    <main class="flex-grow w-full max-w-full pt-[60px] sm:pt-[72px]">

      <!-- Section 1: Crisp Profiles and About Overview -->
      <section id="about"
        class="min-h-[calc(100vh-120px)] flex flex-col justify-center py-16 sm:py-24 px-4 sm:px-6 max-w-5xl mx-auto border-b border-gray-900/40 relative scroll-mt-20 w-full animate-fadeIn">
        <div
          class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(78,70,229,0.04),transparent_45%)] pointer-events-none" />

        <div class="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 items-center">

          <!-- Text Segment Container -->
          <div class="md:col-span-8 space-y-6 text-left order-2 md:order-1">
            <div class="space-y-1">
              <h1 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {{ PORTFOLIO_CONFIG.personal.name }}
              </h1>
              <p class="text-base sm:text-lg text-indigo-400 font-mono font-medium">
                {{ PORTFOLIO_CONFIG.personal.role }} &bull;
                <a :href="PORTFOLIO_CONFIG.personal.companyUrl" target="_blank" rel="noopener noreferrer"
                  class="hover:underline hover:text-indigo-300 transition duration-150 inline-flex items-center gap-1">
                  <span>{{ PORTFOLIO_CONFIG.personal.company }}</span>
                  <ArrowUpRight class="w-3.5 h-3.5" />
                </a>
              </p>
            </div>

            <!-- Deeply enriched Profile About paragraphs -->
            <div class="space-y-4 text-slate-300 text-sm leading-relaxed">
              <p v-for="(para, idx) in PORTFOLIO_CONFIG.personal.aboutParagraphs" :key="idx">
                {{ para }}
              </p>
            </div>

            <!-- Action Download Resume Button (Visually Highly Distinct) -->
            <div class="pt-2">
              <a href="/resume.pdf" download="Soumyajit_Das_Resume.pdf" target="_blank"
                class="inline-flex items-center space-x-2.5 px-6 py-3.5 bg-emerald-950/45 hover:bg-emerald-900/60 text-emerald-400 hover:text-emerald-300 border border-emerald-500/35 hover:border-emerald-400/60 shadow-xl shadow-emerald-950/30 active:scale-[0.98] text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all duration-250 cursor-pointer">
                <Download class="w-4 h-4 text-emerald-400" />
                <span>Download Resume</span>
              </a>
            </div>

            <!-- Context Metadata blocks -->
            <div class="flex flex-wrap gap-2.5 pt-2 text-xs font-mono text-slate-400">
              <span
                class="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-gray-900/60 border border-gray-850 rounded-xl">
                <MapPin class="w-3.5 h-3.5 text-indigo-400" />
                <span>{{ PORTFOLIO_CONFIG.personal.location }}</span>
              </span>

              <a :href="PORTFOLIO_CONFIG.personal.linkedin" target="_blank" rel="noopener noreferrer"
                class="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-gray-900/60 border border-gray-850 hover:border-indigo-500/40 hover:text-white rounded-xl transition duration-200">
                <!-- LinkedIn Native color: #0A66C2 -->
                <Linkedin class="w-3.5 h-3.5 text-[#0A66C2]" />
                <span>LinkedIn</span>
                <ArrowUpRight class="w-2.5 h-2.5 text-slate-500" />
              </a>

              <a :href="PORTFOLIO_CONFIG.personal.github" target="_blank" rel="noopener noreferrer"
                class="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-gray-900/60 border border-gray-850 hover:border-indigo-500/40 hover:text-white rounded-xl transition duration-200">
                <Github class="w-3.5 h-3.5 text-[#F1F5F9]" />
                <span>GitHub</span>
                <ArrowUpRight class="w-2.5 h-2.5 text-slate-500" />
              </a>
            </div>

            <!-- Communication channels -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-xl pt-2">
              <a :href="`mailto:${PORTFOLIO_CONFIG.personal.email}`"
                class="flex items-center justify-between p-3.5 rounded-xl bg-gray-900/30 border border-gray-850 hover:border-indigo-500/35 text-left transition duration-200 group">
                <div class="flex items-center space-x-2.5 bg-transparent min-w-0">
                  <Mail class="w-4 h-4 text-[#EA4335] shrink-0" />
                  <div class="font-mono text-[11px] min-w-0">
                    <p class="text-[9px] text-slate-500 leading-tight">EMAIL</p>
                    <p class="text-white text-xs font-semibold group-hover:text-indigo-200 transition">Inquire via Email
                    </p>
                  </div>
                </div>
                <ArrowUpRight class="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400 transition shrink-0" />
              </a>

              <a :href="`tel:${PORTFOLIO_CONFIG.personal.phone.replace(/\s+/g, '')}`"
                class="flex items-center justify-between p-3.5 rounded-xl bg-gray-900/30 border border-gray-850 hover:border-indigo-500/35 text-left transition duration-200 group">
                <div class="flex items-center space-x-2.5 bg-transparent min-w-0">
                  <Phone class="w-4 h-4 text-[#25D366] shrink-0" />
                  <div class="font-mono text-[11px] min-w-0">
                    <p class="text-[9px] text-slate-500 leading-tight">PHONE</p>
                    <p class="text-white text-xs font-semibold group-hover:text-indigo-200 transition">Call Directly</p>
                  </div>
                </div>
                <ArrowUpRight class="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400 transition shrink-0" />
              </a>

              <a :href="`https://wa.me/${PORTFOLIO_CONFIG.personal.phone.replace(/[^0-9]/g, '')}`" target="_blank"
                rel="noopener noreferrer"
                class="flex items-center justify-between p-3.5 rounded-xl bg-gray-900/30 border border-gray-850 hover:border-emerald-500/35 text-left transition duration-200 group">
                <div class="flex items-center space-x-2.5 bg-transparent min-w-0">
                  <svg class="w-4 h-4 text-[#25D366] shrink-0 fill-current" viewBox="0 0 24 24">
                    <path
                      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.8.983 3.834 1.493 5.903 1.495h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <div class="font-mono text-[11px] min-w-0">
                    <p class="text-[9px] text-slate-500 leading-tight">WHATSAPP</p>
                    <p class="text-white text-xs font-semibold group-hover:text-emerald-300 transition">Message on
                      WhatsApp</p>
                  </div>
                </div>
                <ArrowUpRight class="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 transition shrink-0" />
              </a>
            </div>
          </div>

          <!-- Column 2: Refined Portrait block (centering fix, exact circular dimensions without padding, deep shadow) -->
          <div class="md:col-span-4 flex justify-center w-full order-1 md:order-2">
            <div class="relative group">
              <!-- Radial glowing base centered with the container -->
              <div
                class="absolute -inset-1.5 bg-gradient-to-r from-emerald-500/10 to-indigo-500/20 rounded-full blur-md opacity-30 group-hover:opacity-50 transition duration-1000 w-full" />
              <div
                class="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full border border-gray-800 overflow-hidden shadow-2xl transition duration-300 group-hover:scale-[1.02]">
                <img :src="portraitUrl" alt="Soumyajit Das Profile Photo" class="w-full h-full object-cover"
                  referrerpolicy="no-referrer" fetchpriority="high" width="224" height="224" />
              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- Section 2: Technical Skill Matrix bento-styled container (Min Height Fold configured) -->
      <section id="skills"
        class="min-h-[calc(100vh-120px)] flex flex-col justify-center py-16 sm:py-24 px-4 sm:px-6 max-w-5xl mx-auto border-b border-gray-900/40 text-left scroll-mt-20 w-full">
        <div class="mb-10 w-full">
          <h2 class="text-2xl font-bold text-white tracking-tight border-b border-gray-900/30 pb-3">Technical Skills
          </h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          <div v-for="group in PORTFOLIO_CONFIG.skills" :key="group.category"
            class="bg-gray-950/40 border border-gray-900/80 hover:border-indigo-500/20 p-5 rounded-xl space-y-4 flex flex-col justify-between transition-all duration-300">
            <div class="space-y-3">
              <div class="flex items-center justify-between border-b border-gray-900 pb-2">
                <span class="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  {{ group.category }}
                </span>
                <div class="p-1.5 rounded-lg bg-[#070A13] text-indigo-400 border border-gray-850">
                  <component :is="getCategoryIcon(group.category)" class="w-4 h-4 text-indigo-400" />
                </div>
              </div>

              <div class="flex flex-wrap gap-2">
                <span v-for="skill in group.skills" :key="skill"
                  class="text-[11px] font-mono py-1 px-2.5 bg-[#070A13] text-slate-350 border border-gray-850 rounded-md inline-block">
                  {{ skill }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 3: Professional Experience & Interspersed Achievements (Min Height Fold configured) -->
      <section id="experience"
        class="min-h-[calc(100vh-120px)] flex flex-col justify-center py-16 sm:py-24 px-4 sm:px-6 max-w-3xl mx-auto border-b border-gray-900/40 text-left scroll-mt-20 w-full">
        <div class="mb-12 w-full">
          <h2 class="text-2xl font-bold text-white tracking-tight border-b border-gray-900/30 pb-3">Professional
            Experience</h2>
        </div>

        <div class="relative border-l border-gray-900 ml-2.5 sm:ml-4 pl-5 sm:pl-7 space-y-12 w-full max-w-full">
          <div v-for="exp in PORTFOLIO_CONFIG.experiences" :key="exp.role" class="relative group">
            <!-- Node bullet -->
            <span
              class="absolute -left-[30px] sm:-left-[35px] top-1 h-4.5 w-4.5 rounded-full bg-gray-950 border border-gray-850 flex items-center justify-center group-hover:border-indigo-400 transition-colors">
              <span class="h-2 w-2 rounded-full bg-indigo-455" />
            </span>

            <div class="space-y-4">
              <div
                class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-gray-950 pb-2.5">
                <div>
                  <h3 class="text-sm font-extrabold text-white leading-tight">{{ exp.role }}</h3>

                  <!-- DeltaX redirect reference -->
                  <p class="text-xs font-semibold text-indigo-400 font-mono">
                    <a :href="exp.companyUrl" target="_blank" rel="noopener noreferrer"
                      class="hover:underline inline-flex items-center space-x-0.5">
                      <span>{{ exp.company }}</span>
                      <ArrowUpRight class="w-3 h-3" />
                    </a>
                  </p>
                </div>
                <span
                  class="text-[10px] font-mono text-slate-500 px-2.5 py-0.5 rounded bg-gray-900/50 border border-gray-850 self-start sm:self-center shrink-0">
                  {{ exp.period }}
                </span>
              </div>

              <!-- High-Performance Bullet Details -->
              <ul class="space-y-2.5 pl-0 list-none">
                <li v-for="bullet in exp.highlights" :key="bullet"
                  class="flex items-start text-xs text-slate-350 leading-relaxed text-left">
                  <span class="text-indigo-400 font-bold shrink-0 mr-2 mt-0.5 font-mono">▸</span>
                  <span>{{ bullet }}</span>
                </li>
              </ul>

              <!-- Embedded Achievements inside Timeline job records -->
              <div v-if="exp.achievements && exp.achievements.length > 0" class="grid grid-cols-1 gap-2 pt-2.5">
                <div v-for="ach in exp.achievements" :key="ach.title"
                  class="p-4 bg-indigo-950/15 border border-indigo-500/15 rounded-xl space-y-1 hover:border-indigo-500/25 transition-all duration-300">
                  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                    <div class="flex items-center space-x-2">
                      <Zap class="w-3.5 h-3.5 text-amber-400" />
                      <span class="text-xs font-bold font-mono text-white tracking-tight uppercase">
                        {{ ach.metric }}
                      </span>
                    </div>
                    <span class="text-[10px] font-mono text-indigo-300 uppercase font-semibold leading-none">{{
                      ach.title }}</span>
                  </div>
                  <p class="text-[11px] text-slate-300 leading-normal pt-1">{{ ach.desc }}</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <!-- Section 4: Education History Section (Min Height Fold configured) -->
      <section id="education"
        class="min-h-[calc(100vh-120px)] flex flex-col justify-center py-16 sm:py-24 px-4 sm:px-6 max-w-3xl mx-auto border-b border-gray-900/40 text-left scroll-mt-20 w-full font-sans">
        <div class="mb-10 w-full">
          <h2 class="text-2xl font-bold text-white tracking-tight border-b border-gray-900/30 pb-3">Education Background
          </h2>
        </div>

        <div class="space-y-6 w-full max-w-full">
          <div v-for="edu in PORTFOLIO_CONFIG.education" :key="edu.degree"
            class="bg-gray-950/35 border border-gray-900/80 p-5 rounded-2xl space-y-3">
            <div
              class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-950 pb-2.5">
              <div class="flex items-start space-x-3">
                <div class="p-2 bg-indigo-950/45 rounded-xl border border-indigo-500/10 shrink-0">
                  <GraduationCap class="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h3 class="text-sm font-extrabold text-white leading-snug">{{ edu.degree }}</h3>
                  <p class="text-xs text-slate-400 font-sans mt-0.5">{{ edu.institution }} &bull; {{ edu.location }}</p>
                </div>
              </div>
              <span
                class="text-[10px] font-mono text-slate-500 px-2.5 py-0.5 rounded bg-gray-900/50 border border-gray-850 self-start sm:self-center shrink-0">
                {{ edu.period }}
              </span>
            </div>

            <ul class="space-y-2 pl-0 list-none">
              <li v-for="bullet in edu.highlights" :key="bullet"
                class="flex items-start text-xs text-slate-350 leading-relaxed text-left">
                <span class="text-indigo-400 shrink-0 mr-2 font-mono">▪</span>
                <span>{{ bullet }}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Section 5: Say Hello Secure Inquiry Form Console (Min Height Fold configured) -->
      <section id="connect"
        class="min-h-[calc(100vh-120px)] flex flex-col justify-center py-16 sm:py-24 px-4 sm:px-6 max-w-4xl mx-auto text-left relative scroll-mt-20 w-full">
        <div
          class="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(78,70,229,0.03),transparent_40%)] pointer-events-none" />

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start w-full">

          <!-- Column 1: Info Headers -->
          <div class="lg:col-span-4 space-y-4">
            <div class="space-y-2">
              <h2 class="text-2xl font-bold text-white tracking-tight border-b border-gray-900/30 pb-3">Say Hello!</h2>
              <p class="text-xs text-slate-400 leading-relaxed font-sans">
                Have an exciting project, custom requirement, or a job opportunity you'd like to discuss? I am always
                open to connecting and collaborating. Pick your preferred channel below to reach out instantly!
              </p>
            </div>
          </div>

          <!-- Column 2: Form Container (Dual buttons: Email or WhatsApp) -->
          <div class="lg:col-span-8 bg-gray-950/25 border border-gray-900 p-5 sm:p-7 rounded-2xl w-full">
            <div class="space-y-4">

              <!-- User Name -->
              <div class="space-y-1">
                <label for="contact-name"
                  class="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Name</label>
                <input type="text" id="contact-name" v-model="nameInput" placeholder="Enter your name" required
                  class="w-full text-xs font-mono py-3 px-3.5 bg-[#070A13] text-white border border-gray-850 hover:border-gray-800 focus:border-indigo-500 rounded-xl outline-none" />
              </div>

              <!-- Message input -->
              <div class="space-y-1">
                <label for="contact-message"
                  class="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Message</label>
                <textarea rows="4" id="contact-message" v-model="messageInput"
                  placeholder="Hi Soumyajit! I'd love to connect with you about..." required
                  class="w-full text-xs font-mono py-3 px-3.5 bg-[#070A13] text-white border border-gray-850 hover:border-gray-800 focus:border-indigo-500 rounded-xl outline-none resize-none" />
              </div>

              <!-- Action buttons -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <!-- Send via Email Button -->
                <button type="button" id="btn-submit-email" @click="submitToChannel('email')" :disabled="isSubmitting"
                  class="w-full py-4 bg-indigo-950/45 hover:bg-indigo-900/60 text-indigo-300 hover:text-indigo-200 border border-indigo-500/35 hover:border-indigo-400/60 shadow-lg shadow-indigo-950/20 active:scale-[0.99] disabled:opacity-50 text-xs font-mono font-bold rounded-xl flex items-center justify-center space-x-2 transition duration-250 cursor-pointer">
                  <Mail class="w-3.5 h-3.5" />
                  <span>{{ isSubmitting && lastUsedChannel === 'email' ? 'Opening Email...' : 'Send via Email' }}</span>
                </button>

                <!-- Send via WhatsApp Button -->
                <button type="button" id="btn-submit-whatsapp" @click="submitToChannel('whatsapp')"
                  :disabled="isSubmitting"
                  class="w-full py-4 bg-emerald-950/35 hover:bg-emerald-900/50 text-emerald-400 hover:text-emerald-350 border border-emerald-500/35 hover:border-emerald-400/60 shadow-lg shadow-emerald-950/20 active:scale-[0.99] disabled:opacity-50 text-xs font-mono font-bold rounded-xl flex items-center justify-center space-x-2 transition duration-250 cursor-pointer">
                  <svg class="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                    <path
                      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.8.983 3.834 1.493 5.903 1.495h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>{{ isSubmitting && lastUsedChannel === 'whatsapp' ? 'Opening Chat...' : 'Send via WhatsApp'
                    }}</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        <!-- Success Toast perfectly centered in the horizontal window viewport -->
        <transition name="fade">
          <div v-if="showSuccessToast"
            class="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 bg-[#070A13] border border-emerald-500/35 p-4 rounded-xl shadow-2xl flex items-center space-x-3 w-11/12 max-w-sm">
            <CheckCircle class="w-5 h-5 text-emerald-400 shrink-0" />
            <div class="text-left font-sans min-w-0">
              <p class="text-xs text-white font-bold leading-tight">
                {{ lastUsedChannel === 'email' ? 'Opening Email Draft' : 'Opening WhatsApp Chat' }}
              </p>
              <p class="text-[10px] text-slate-400 leading-normal mt-0.5">
                {{ lastUsedChannel === 'email' ? 'A friendly email draft is ready for you to send!' : 'Your message has been pre - filled and is opening in WhatsApp!' }}
              </p>
            </div>
          </div>
        </transition>
      </section>

    </main>

    <!-- Footer without borders on Logo and tight spacing layout -->
    <footer class="bg-[#070A13] border-t border-gray-900/60 py-10 px-4 sm:px-6 text-xs text-center font-mono w-full">
      <div class="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">

        <!-- Tight gap footer combo -->
        <div
          class="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 text-center sm:text-left">
          <!-- logo + dsoumyajit.in -->
          <div class="flex items-center space-x-1">
            <span class="font-sans text-sm tracking-tight text-white font-bold">
              dsoumyajit<span class="text-[#4F46E5]">.in</span>
            </span>
          </div>

          <!-- Separator dot (hidden on small screens, shown when sm:flex-row is active) -->
          <span class="hidden sm:inline text-slate-700">&bull;</span>

          <!-- copyrights text -->
          <p class="text-slate-500 text-[10px] leading-relaxed">
            &copy; 2026 {{ PORTFOLIO_CONFIG.personal.name }}. All Rights Reserved.
          </p>
        </div>

        <!-- social links (High contrast, interactive brand channels, ordered exactly) -->
        <div class="flex items-center justify-center space-x-5 text-slate-400">
          <a :href="PORTFOLIO_CONFIG.personal.linkedin" target="_blank" rel="noopener noreferrer"
            title="LinkedIn Profile" class="hover:text-[#0A66C2] hover:scale-110 active:scale-95 transition">
            <Linkedin class="w-4 h-4" />
          </a>
          <a :href="PORTFOLIO_CONFIG.personal.github" target="_blank" rel="noopener noreferrer" title="GitHub Portfolio"
            class="hover:text-white hover:scale-110 active:scale-95 transition">
            <Github class="w-4 h-4" />
          </a>
          <a :href="`mailto:${PORTFOLIO_CONFIG.personal.email}`" title="Send Direct Email"
            class="hover:text-[#EA4335] hover:scale-110 active:scale-95 transition">
            <Mail class="w-4 h-4" />
          </a>
          <a :href="`tel:${PORTFOLIO_CONFIG.personal.phone.replace(/\s+/g, '')}`" title="Direct Phone Line"
            class="hover:text-indigo-400 hover:scale-110 active:scale-95 transition">
            <Phone class="w-4 h-4" />
          </a>
          <a :href="`https://wa.me/${PORTFOLIO_CONFIG.personal.phone.replace(/[^0-9]/g, '')}`" target="_blank"
            rel="noopener noreferrer" title="Chat on WhatsApp"
            class="hover:text-[#25D366] hover:scale-110 active:scale-95 transition">
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path
                d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.8.983 3.834 1.493 5.903 1.495h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>

    <!-- Scrolling Direction Aware floating back to top hook -->
    <transition name="fade">
      <button v-if="showScrollTop" @click="scrollToTop"
        class="fixed bottom-8 right-5 sm:bottom-10 sm:right-8 z-50 bg-[#4F46E5] hover:bg-indigo-500 text-white p-3 rounded-full shadow-lg hover:shadow-indigo-500/20 hover:scale-110 active:scale-95 transition-all duration-300 border border-indigo-400/20 cursor-pointer"
        aria-label="Scroll back top">
        <ArrowUp class="w-4 h-4" />
      </button>
    </transition>

  </div>
</template>

<style>
/* Global content guard fixes to completely resolve overflow on small devices while maintaining sticky headers */
html,
body {
  overflow-x: hidden;
  max-width: 100vw;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(12px);
}

/* Mobile topbar menu instant fade/slide transition - optimized for lag-free performance */
.menu-slide-enter-active,
.menu-slide-leave-active {
  transition: opacity 0.12s ease-out, transform 0.12s ease-out;
}

.menu-slide-enter-from,
.menu-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Smooth high-performance IntersectionObserver Reveal Animators */
.section-fade {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: opacity, transform;
}

.section-fade.is-visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
