import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { 
  Github, Linkedin, Mail, Code2, ExternalLink, 
  Sun, Moon, Activity, Zap, Wrench, 
  Gamepad2, Trophy, Crosshair, X, Send, 
  Monitor, Briefcase, ChevronRight
} from 'lucide-react';

// --- CONFIGURACIÓN DE IMAGEN ---
// Al estar en la carpeta /public, se accede directamente con la barra inicial
const AVATAR_URL = "/Propia.jpeg"; 

const AshParticles = ({ color }) => {
  const particles = useMemo(() => {
    return Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      left: Math.random() * 100,
      duration: Math.random() * 8 + 5, 
      delay: Math.random() * 10,
      xOffset: Math.random() * 200 - 100 
    }));
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: "110vh", opacity: 0, x: `${p.left}vw` }}
          animate={{ 
            y: "-10vh", 
            opacity: [0, 0.7, 0.7, 0],
            x: [`${p.left}vw`, `${p.left + (p.xOffset / 10)}vw`]
          }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" }}
          className="absolute rounded-full"
          style={{
            width: p.size, height: p.size,
            backgroundColor: color, filter: 'blur(1px)',
            boxShadow: `0 0 8px ${color}`
          }}
        />
      ))}
    </div>
  );
};

const THEMES = {
  dark: {
    bg: "bg-[#050505]", text: "text-white", accent: "text-red-600",
    glow: "shadow-[0_0_20px_rgba(220,38,38,0.3)]",
    card: "bg-white/5 backdrop-blur-md", border: "border-red-900/30",
    track: "bg-red-900/20", fire: "from-red-600/40 via-orange-600/10 to-transparent",
    ash: "#f97316" 
  },
  light: {
    bg: "bg-[#1e293b]", text: "text-slate-100", accent: "text-violet-400",
    glow: "shadow-[0_0_20px_rgba(139,92,246,0.2)]",
    card: "bg-slate-800/40 backdrop-blur-md", border: "border-slate-700/50",
    track: "bg-slate-700", fire: "from-violet-600/40 via-cyan-600/10 to-transparent",
    ash: "#a78bfa" 
  }
};

const TECH_STACK = {
  languages: [
    { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { name: "Kotlin", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
    { name: "C#", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
    { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "Swift", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg" }
  ],
  ides: [
    { name: "Unity", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg" },
    { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
    { name: "IntelliJ", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg" },
    { name: "Eclipse", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eclipse/eclipse-original.svg" },
    { name: "NetBeans", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netbeans/netbeans-original.svg" },
    { name: "Android Studio", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg" },
    { name: "Xcode", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xcode/xcode-original.svg" }
  ]
};

const STATS = [
  { label: "Potencia", value: 95, color: "bg-red-600" },
  { label: "Lógica", value: 90, color: "bg-blue-600" },
  { label: "3D/Unity", value: 82, color: "bg-purple-500" },
  { label: "Críticos", value: 94, color: "bg-green-500" }
];

const TRAYECTORIA = [
  { 
    year: "2008 - Actualidad", 
    title: "Técnico Electrónico de Potencia", 
    company: "Irvia Mantenimiento Ferroviario", 
    desc: "Diagnóstico y reparación de sistemas de tracción y frenado en alta velocidad. 17 años de experiencia en ingeniería física.",
    icon: <Wrench size={20}/>
  },
  { 
    year: "2024 - 2026", 
    title: "CFGS DAM", 
    company: "Desarrollo Multiplataforma", 
    desc: "Especialización en arquitecturas de software, gestión de datos y desarrollo de aplicaciones robustas.",
    icon: <Code2 size={20}/>
  },
  { 
    year: "Desde Feb 2026", 
    title: "CFGS Animaciones 3D, Juegos y Entornos Interactivos", 
    company: "Especialización Videojuegos", 
    desc: "Creación de mundos, simulación física y lógica avanzada en C#.",
    icon: <Gamepad2 size={20}/>
  }
];

const PROJECTS = [
  { name: "FocusBoard Pro", tech: "Efficiency / Desktop", link: "https://github.com/Jorx8819/FocusBoard-Pro" },
  { name: "Invitación Boda", tech: "JS / Creative", link: "https://github.com/Jorx8819/InvitacionBoda" },
  { name: "Expense Tracker", tech: "SQL / Software", link: "https://github.com/Jorx8819/ExpenseTracker" },
  { name: "Buscaminas Java", tech: "Java / Logic", link: "https://github.com/Jorx8819/Buscaminas" },
  { name: "PassGen", tech: "Security Tool", link: "https://github.com/Jorx8819/PassGen" },
  { name: "Carrera Animales", tech: "Java / POO", link: "https://github.com/Jorx8819/Ejercicio_Carrera_Animales" }
];

const App = () => {
  const [theme, setTheme] = useState('dark');
  const [level, setLevel] = useState(1);
  const [achievements, setAchievements] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formStatus, setFormStatus] = useState('');
  
  const [showFinalFlash, setShowFinalFlash] = useState(false);
  const [flashWasTriggered, setFlashWasTriggered] = useState(false);
  const [achievementsDismissed, setAchievementsDismissed] = useState(false);
  const [imgError, setImgError] = useState(false); // Estado para manejar error de imagen
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const scannerY = useTransform(smoothProgress, [0.1, 0.4], ["0%", "100%"]);
  const scannerOpacity = useTransform(smoothProgress, [0.05, 0.1, 0.4, 0.45], [0, 1, 1, 0]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", v => {
      if (v > 0.8) setLevel(4);
      else if (v > 0.5) setLevel(3);
      else if (v > 0.2) setLevel(2);
      else setLevel(1);

      if (!achievementsDismissed) {
        if (v > 0.1 && v < 0.45) setAchievements(prev => prev.includes("TRANSICIÓN_COMPLETA") ? prev : [...prev, "TRANSICIÓN_COMPLETA"]);
        if (v > 0.45 && v < 0.75) setAchievements(prev => prev.includes("NÚCLEO_OPERATIVO") ? prev : [...prev, "NÚCLEO_OPERATIVO"]);
        if (v > 0.75) setAchievements(prev => prev.includes("ARSENAL_DESPLEGADO") ? prev : [...prev, "ARSENAL_DESPLEGADO"]);
      }
      
      if (v > 0.98) {
        if (!achievementsDismissed) setAchievementsDismissed(true);
        if (!flashWasTriggered) {
          setFlashWasTriggered(true);
          setShowFinalFlash(true);
          setTimeout(() => setShowFinalFlash(false), 2000);
        }
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, flashWasTriggered, achievementsDismissed]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const curr = THEMES[theme];
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    setFormStatus('sending');
    try {
      const response = await fetch("https://formspree.io/f/xlgwzkvy", {
        method: "POST",
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        setFormStatus('success');
        form.reset();
        setTimeout(() => { setIsModalOpen(false); setFormStatus(''); }, 2000);
      } else { setFormStatus('error'); }
    } catch { setFormStatus('error'); }
  };

  const chromaticTextClass = theme === 'dark' 
    ? "bg-[length:200%_auto] text-transparent bg-clip-text animate-gradient-x bg-gradient-to-r from-red-600 via-yellow-400 via-orange-500 to-red-600"
    : "bg-[length:200%_auto] text-transparent bg-clip-text animate-gradient-x bg-gradient-to-r from-violet-900 via-violet-500 via-cyan-400 to-violet-900";

  return (
    <div className={`min-h-screen ${curr.bg} ${curr.text} transition-colors duration-1000 overflow-x-hidden font-sans relative selection:bg-red-600 selection:text-white`}>
      
      {/* CAPA DE FONDO */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 w-full h-full">
        <AshParticles color={curr.ash} />
        <motion.div animate={{ height: ["12vh", "18vh", "12vh"], opacity: [0.5, 0.8, 0.5] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className={`absolute bottom-0 left-0 w-full bg-gradient-to-t ${curr.fire} blur-[50px]`} />
      </div>

      {/* DESTELLO FINAL */}
      <AnimatePresence>
        {showFinalFlash && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
          >
            <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-red-600/30' : 'bg-violet-600/30'} backdrop-blur-md animate-pulse`} />
            <motion.h2 
              initial={{ scale: 0.8, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              className="text-4xl md:text-7xl lg:text-8xl font-black italic uppercase text-white drop-shadow-[0_0_50px_rgba(255,255,255,0.9)] z-10 text-center px-6"
            >
              🚨 MODO PRÁCTICAS DAM: ACTIVO 🚨
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CURSOR CROSSHAIR */}
      <motion.div style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }} className="fixed top-0 left-0 w-12 h-12 pointer-events-none z-[9999] hidden md:flex items-center justify-center">
        <div className={`absolute inset-0 border-[1px] rounded-full opacity-20 ${theme === 'dark' ? 'border-red-600' : 'border-violet-600'} animate-ping`} />
        <Crosshair size={16} className={theme === 'dark' ? 'text-red-500' : 'text-violet-400'} />
      </motion.div>

      {/* PROGRESS BAR */}
      <div className="fixed top-0 left-0 w-full h-1 z-[100] bg-white/5">
        <motion.div className={`h-full ${theme === 'dark' ? 'bg-red-600 shadow-[0_0_15px_red]' : 'bg-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.5)]'}`} style={{ scaleX: smoothProgress, transformOrigin: "0%" }} />
      </div>

      {/* HUD LATERAL */}
      <div className="fixed top-24 left-8 z-[60] hidden xl:block">
        <motion.div initial={{ x: -100 }} animate={{ x: 0 }} className="flex flex-col gap-6">
          
          {/* PERFIL HUD INTEGRADO CON FOTO */}
          <div className={`p-6 w-[260px] rounded-[2.5rem] border ${curr.border} ${curr.card} shadow-2xl overflow-hidden`}>
            <div className="flex flex-col items-center gap-4 mb-8">
              <div className="relative group">
                {/* Anillo de escaneo */}
                <div className={`absolute -inset-2 border border-dashed rounded-full animate-[spin_20s_linear_infinite] opacity-30 ${theme === 'dark' ? 'border-red-600' : 'border-violet-400'}`} />
                
                {/* Contenedor Circular con Flex para Centrar */}
                <div className={`w-24 h-24 rounded-full overflow-hidden border-2 relative z-10 flex items-center justify-center bg-black/20 ${theme === 'dark' ? 'border-red-600 shadow-[0_0_20px_rgba(220,38,38,0.4)]' : 'border-violet-500 shadow-[0_0_20px_rgba(139,92,246,0.4)]'}`}>
                  {!imgError ? (
                    <img 
                      src={AVATAR_URL} 
                      alt="JFM" 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    <span className="text-4xl font-black italic select-none">J</span>
                  )}
                  
                  {/* Filtro CRT/Scanline sobre la foto (solo si hay foto) */}
                  {!imgError && <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%] pointer-events-none" />}
                </div>

                {/* Badge de Nivel */}
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-yellow-500 rounded-full border-2 border-black flex items-center justify-center text-[12px] text-black font-bold z-20 shadow-lg group-hover:rotate-12 transition-transform">
                  L{level}
                </div>
              </div>

              <div className="text-center">
                <p className="text-[10px] font-black opacity-40 uppercase tracking-[0.3em]">Jorge F. M.</p>
                <div className={`h-[1px] w-full my-2 ${theme === 'dark' ? 'bg-red-600/20' : 'bg-violet-500/20'}`} />
                <p className={`text-[11px] font-black uppercase tracking-tighter ${chromaticTextClass}`}>Status: Sincronizado</p>
              </div>
            </div>
            
            <div className="space-y-5">
              {STATS.map((s, i) => (
                <div key={i}>
                  <div className="flex justify-between text-[9px] font-black uppercase mb-1.5 opacity-60">
                    <span className={chromaticTextClass}>{s.label}</span>
                    <span className={chromaticTextClass}>{s.value}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-black/20 dark:bg-white/5 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${s.value}%` }} className={`h-full ${theme === 'dark' ? s.color : 'bg-violet-500'}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* LOGROS */}
          <div className="flex flex-col gap-3">
            <AnimatePresence>
              {!achievementsDismissed && achievements.map((ach) => (
                <motion.div 
                  key={ach} 
                  initial={{ opacity: 0, x: -50, scale: 0.9 }} 
                  animate={{ opacity: 1, x: 0, scale: 1 }} 
                  exit={{ opacity: 0, x: -50, filter: 'blur(10px)', transition: { duration: 0.8 } }}
                  className="flex items-center gap-4 px-5 py-4 bg-yellow-500 text-black rounded-2xl shadow-xl w-[260px] group border-b-4 border-yellow-700"
                >
                  <Trophy size={18} className="flex-shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[8px] font-black opacity-60 uppercase leading-none mb-1 tracking-wider">Logro_Desbloqueado</span>
                    <span className="text-[11px] font-black uppercase tracking-tighter leading-tight">{ach.replace('_', ' ')}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
        </motion.div>
      </div>

      {/* NAVBAR */}
      <nav className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-6xl px-8 py-4 ${curr.card} border ${curr.border} rounded-3xl flex justify-between items-center shadow-lg`}>
        <div className="flex items-center gap-4">
            <Activity size={18} className={`${theme === 'dark' ? 'text-red-600' : 'text-violet-400'} animate-pulse`} />
            <span className="text-[10px] font-black tracking-[0.4em] uppercase opacity-40 hidden sm:block">Todo gran cambio empieza con un ;</span>
        </div>
        <div className="flex items-center gap-8">
            <div className="hidden md:flex gap-6 text-[9px] font-black uppercase tracking-widest opacity-60">
              <button onClick={() => scrollTo('hero')} className="hover:opacity-100">Sistema</button>
              <button onClick={() => scrollTo('trayectoria')} className="hover:opacity-100">Registro</button>
              <button onClick={() => scrollTo('stack')} className="hover:opacity-100">Arsenal</button>
            </div>
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className={`p-2 rounded-xl border ${curr.border}`}>
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="hero" className="min-h-screen flex flex-col justify-center items-center pt-24 px-4 relative z-10">
        <motion.button 
          onClick={() => setIsModalOpen(true)}
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          className={`mb-12 p-[2px] rounded-2xl cursor-pointer ${theme === 'dark' ? 'bg-gradient-to-r from-red-600 via-orange-500 to-red-600 shadow-[0_0_30px_rgba(220,38,38,0.2)]' : 'bg-gradient-to-r from-violet-900 via-fuchsia-700 to-violet-900 shadow-[0_0_30px_rgba(76,29,149,0.2)]'}`}
        >
          <div className={`${curr.bg} px-6 py-4 rounded-[14px] flex items-center gap-6`}>
            <Briefcase size={20} className={theme === 'dark' ? 'text-red-500' : 'text-violet-400'} />
            <div className="text-left">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50 mb-1">Status: Prácticas DAM</h4>
              <p className={`text-sm font-black uppercase italic ${chromaticTextClass}`}>Disponible para prácticas DAM, incorporación inmediata</p>
            </div>
            <Zap size={14} className="opacity-40 animate-bounce" />
          </div>
        </motion.button>

        <div className="w-full max-w-7xl mx-auto text-center relative">
          <motion.h1 
            animate={{ scale: [1, 1.01, 1] }} transition={{ duration:4 , repeat: Infinity, ease: "easeInOut" }}
            className={`text-[11vw] md:text-[8vw] lg:text-[7.5vw] font-black italic leading-none uppercase tracking-tighter whitespace-nowrap bg-[length:200%_auto] text-transparent bg-clip-text animate-gradient-x cursor-default select-none ${chromaticTextClass}`}
          >
            JORGE FERNÁNDEZ
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className={`mt-12 max-w-5xl mx-auto text-sm md:text-xl font-black uppercase tracking-[0.2em] leading-relaxed ${chromaticTextClass} space-y-6`}
          >
            <p>17 AÑOS EN ELECTRÓNICA DE POTENCIA FERROVIARIA.<br/>
            SISTEMAS CRÍTICOS. ALTA VELOCIDAD. PRECISIÓN ABSOLUTA.</p>

            <p>CFGS DESARROLLO DE APLICACIONES MULTIPLATAFORMA — FINALIZANDO.<br/>
            CFGS ANIMACIONES 3D, JUEGOS Y ENTORNOS INTERACTIVOS — INICIADO 2026.</p>

            <p className="pt-4 text-white opacity-90">CONVERGIENDO HARDWARE, ARQUITECTURA DE SOFTWARE Y ENTORNOS 3D.<br/>
            NO SOLO PROGRAMO SISTEMAS.<br/>
            LOS CONSTRUYO DESDE LA ENERGÍA HASTA LA EXPERIENCIA.</p>
          </motion.div>
        </div>
      </section>

      {/* TRAYECTORIA */}
      <section id="trayectoria" className="py-40 px-6 relative max-w-7xl mx-auto z-10">
        <h2 className={`text-4xl md:text-7xl font-black italic uppercase mb-20 ${chromaticTextClass}`}>Bitácora_Evolutiva</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <motion.div style={{ top: scannerY, opacity: scannerOpacity }} className={`absolute left-0 w-full h-[2px] z-20 ${theme === 'dark' ? 'bg-red-500 shadow-[0_0_15px_red]' : 'bg-violet-400 shadow-[0_0_15px_violet]'}`} />
          {TRAYECTORIA.map((item, i) => (
            <div key={i} className={`p-8 rounded-[2.5rem] border ${curr.border} ${curr.card} relative overflow-hidden group`}>
              <div className="flex items-center gap-4 mb-4">
                <div className={theme === 'dark' ? 'text-red-500' : 'text-violet-400'}>{item.icon}</div>
                <span className="text-[10px] font-black opacity-40 uppercase">{item.year}</span>
              </div>
              <h3 className={`text-xl font-black uppercase mb-1 ${chromaticTextClass}`}>{item.title}</h3>
              <p className={`text-[10px] font-black ${theme === 'dark' ? 'text-red-500' : 'text-violet-400'} uppercase mb-4`}>{item.company}</p>
              <p className={`text-xs opacity-80 leading-relaxed ${chromaticTextClass}`}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TECH STACK */}
      <section id="stack" className="py-40 px-6 max-w-7xl mx-auto z-10">
        <div className="flex flex-col lg:flex-row gap-20">
          <div className="flex-1">
            <h2 className={`text-3xl font-black italic uppercase mb-12 flex items-center gap-4 ${chromaticTextClass}`}>
              <Code2 className={theme === 'dark' ? 'text-red-500' : 'text-violet-400'} /> Nucleo_Lenguajes
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {TECH_STACK.languages.map((tech, i) => (
                <div key={i} className={`p-6 rounded-2xl border ${curr.border} ${curr.card} flex flex-col items-center gap-3 group hover:border-red-500 transition-all cursor-crosshair`}>
                   <img src={tech.icon} alt={tech.name} className="w-10 h-10 grayscale group-hover:grayscale-0 transition-all group-hover:scale-110" />
                   <span className={`text-[10px] font-black uppercase tracking-widest ${chromaticTextClass}`}>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <h2 className={`text-3xl font-black italic uppercase mb-12 flex items-center gap-4 ${chromaticTextClass}`}>
              <Monitor className={theme === 'dark' ? 'text-red-500' : 'text-violet-400'} /> Entornos_IDE
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {TECH_STACK.ides.map((ide, i) => (
                <div key={i} className={`p-6 rounded-2xl border ${curr.border} ${curr.card} flex flex-col items-center gap-3 group hover:border-red-500 transition-all cursor-crosshair`}>
                   <img src={ide.icon} alt={ide.name} className="w-10 h-10 grayscale group-hover:grayscale-0 transition-all group-hover:scale-110" />
                   <span className={`text-[10px] font-black uppercase tracking-widest text-center ${chromaticTextClass}`}>{ide.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROYECTOS */}
      <section id="projects" className="py-40 px-6 max-w-7xl mx-auto z-10">
        <h2 className={`text-4xl md:text-6xl font-black italic uppercase mb-20 ${chromaticTextClass}`}>Repositorios_Activos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {PROJECTS.map((proj, i) => (
            <motion.a href={proj.link} target="_blank" rel="noopener noreferrer" key={i} whileHover={{ scale: 1.02 }}
              className={`p-10 rounded-[3rem] ${curr.card} border ${curr.border} block group transition-all relative overflow-hidden`}
            >
              <div className="flex justify-between items-start mb-6">
                <span className={`text-[9px] font-black ${theme === 'dark' ? 'text-red-500' : 'text-violet-400'} uppercase`}>{proj.tech}</span>
                <ExternalLink size={16} className="opacity-20 group-hover:opacity-100" />
              </div>
              <h3 className={`text-3xl font-black italic uppercase mb-2 group-hover:text-red-500 transition-colors ${chromaticTextClass}`}>{proj.name}</h3>
              <div className="mt-8 flex items-center gap-2">
                <div className={`w-12 h-1 ${theme === 'dark' ? 'bg-red-600/20 group-hover:bg-red-600' : 'bg-violet-900/20 group-hover:bg-violet-500'} transition-all`} />
                <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-all" />
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 text-center border-t border-black/5 dark:border-white/5 relative z-10">
        <div className="flex justify-center gap-10 mb-8">
          <a href="https://www.linkedin.com/in/jorge-fernandez-martinez/" target="_blank" rel="noopener noreferrer" className="hover:scale-125 transition-all"><Linkedin size={24} /></a>
          <a href="https://github.com/Jorx8819" target="_blank" rel="noopener noreferrer" className="hover:scale-125 transition-all"><Github size={24} /></a>
          <button onClick={() => setIsModalOpen(true)} className="hover:scale-125 transition-all"><Mail size={24} /></button>
        </div>
        <p className={`text-[10px] font-black tracking-[0.5em] uppercase opacity-60 ${chromaticTextClass}`}>Jorge Fernández Martínez // 2026</p>
      </footer>

      {/* MODAL DE CONTACTO */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1000] flex items-center justify-center p-4 backdrop-blur-xl bg-black/60">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className={`w-full max-w-lg ${curr.card} border ${curr.border} p-8 rounded-[2.5rem] relative shadow-2xl`}>
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 opacity-40 hover:opacity-100"><X size={24} /></button>
              <h2 className={`text-3xl font-black italic uppercase mb-2 ${chromaticTextClass}`}>Conexión_Directa</h2>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black uppercase mb-2 opacity-60">Correo_Electrónico</label>
                  <input required name="email" type="email" className={`w-full bg-black/20 border ${curr.border} rounded-xl px-4 py-3 outline-none focus:border-red-500 transition-colors ${curr.text}`} />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase mb-2 opacity-60">Mensaje_Propuesta</label>
                  <textarea required name="message" rows="4" className={`w-full bg-black/20 border ${curr.border} rounded-xl px-4 py-3 outline-none focus:border-red-500 transition-colors resize-none ${curr.text}`}></textarea>
                </div>
                <button disabled={formStatus === 'sending'} type="submit" className={`w-full py-4 rounded-xl font-black uppercase tracking-widest flex items-center justify-center gap-3 ${theme === 'dark' ? 'bg-red-600' : 'bg-violet-600'} text-white shadow-lg`}>
                  {formStatus === 'sending' ? 'Transmitiendo...' : <><Send size={18} /> Enviar Señal</>}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700;900&display=swap');
        .font-sans { font-family: 'Space Grotesk', sans-serif; }
        html { scroll-behavior: smooth; }
        @keyframes gradient-x { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .animate-gradient-x { animation: gradient-x 6s linear infinite; }
      `}} />
    </div>
  );
};

export default App;