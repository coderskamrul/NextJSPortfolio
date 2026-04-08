"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animated-section";
import { resumeData } from "@/lib/resume-data";
import Image from "next/image";
import { 
  Award, 
  Calendar, 
  BadgeCheck,
  GraduationCap,
  Code2,
  Users,
  Star,
  Terminal,
  Shield,
  FileCheck,
  Maximize2,
  X,
  ChevronRight,
  Download
} from "lucide-react";

// Certificate images - real certificates
const certificateImages = [
  { id: 1, src: "https://raw.githubusercontent.com/coderskamrul/assets/refs/heads/main/ICPC%202022.jpeg", title: "The 2022 ICPC Asia Dhaka Regional Contest", issuer: "ICPC Foundation", year: "2022" },
  { id: 2, src: "https://i.ibb.co.com/PZRwbmSW/icpc-2023.jpg", title: "The 2023 ICPC Asia Dhaka Regional Contest", issuer: "ICPC Foundation", year: "2023" },
  { id: 3, src: "https://i.ibb.co.com/5tn62cN/ICPC-Asia-Wast.png", title: "The 2023 ICPC Asia West Continent Final", issuer: "ICPC Foundation", year: "2023" },
  { id: 4, src: "https://i.ibb.co.com/r24ZSFbz/1668746200101-01.jpg", title: "Intra University Programming Contest Fall 2022", issuer: "IUBAT", year: "2022" },
  { id: 5, src: "https://i.ibb.co.com/8LxcwCDN/1668746618212-01.jpg", title: "Intra University Programming Contest Summer 2022", issuer: "IUBAT", year: "2022" },
  { id: 6, src: "https://i.ibb.co.com/ZpXkGM3V/UITS-Contest-Certificate.jpg", title: "UITS Collaboration Programming Contest", issuer: "UITS", year: "2023" },
  { id: 7, src: "https://i.ibb.co.com/00LHs0h/Md-Kamrul-Hasan.jpg", title: "IUBAT Collaboration Programming Contest", issuer: "IUBAT", year: "2023" },
  { id: 8, src: "https://i.ibb.co.com/tPKGzBsn/Mentor-Certificates.jpg", title: "Academic Mentor Certificates", issuer: "IUBAT", year: "2022" },
  { id: 9, src: "https://i.ibb.co.com/8DyQJ0mJ/programming-camp-BUBT.jpg", title: "Programming Camp Certificate", issuer: "BUBT", year: "2023" },
  { id: 10, src: "https://i.ibb.co.com/DHbQxyXs/Language-C-Trainer-Certificate.jpg", title: "Competitive Programming Trainer Certificate", issuer: "Language C", year: "2022" },
  { id: 11, src: "https://i.ibb.co.com/v4cdPPNq/Md-Kamrul-Hasan-Practice-Contest-for-ICPC-by-Codiction.png", title: "Problem Setter Certificate", issuer: "Codiction", year: "2023" },
  { id: 12, src: "https://i.ibb.co.com/Pzf4dbn5/Microsoft-Student-Ambassador-Certificate.png", title: "Microsoft Student Ambassador", issuer: "Microsoft", year: "2023" },
  { id: 13, src: "https://i.ibb.co.com/qM01wM9b/1668745747567-01.jpg", title: "Book Reading Certificate", issuer: "IUBAT", year: "2020" },
  { id: 14, src: "https://i.ibb.co.com/chSJbvcb/CSS-Certificate.png", title: "CSS Certificate", issuer: "HackerRank", year: "2022" },
];

const skills = [
  { name: "WordPress Plugin Development", level: 95, color: "from-blue-500 to-cyan-500" },
  { name: "Data Structures & Algorithms", level: 90, color: "from-green-500 to-emerald-500" },
  { name: "React / Next.js", level: 85, color: "from-purple-500 to-pink-500" },
  { name: "PHP / MySQL", level: 90, color: "from-orange-500 to-red-500" },
  { name: "JavaScript / TypeScript", level: 88, color: "from-yellow-500 to-orange-500" },
  { name: "REST API Development", level: 92, color: "from-cyan-500 to-blue-500" },
];

const terminalCommands = [
  "$ sudo access /credentials/verified",
  "[AUTH] Verifying identity...",
  "[AUTH] Access granted: developer_mode",
  "$ ls -la ./certificates/",
  "[INFO] Found 14 verified credentials",
  "$ cat skills.config",
  "[LOAD] Loading skill matrix..."
];

export default function CertificatesPage() {
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [selectedCert, setSelectedCert] = useState<typeof certificateImages[0] | null>(null);
  const [verifyingSkill, setVerifyingSkill] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const commands = [...terminalCommands];
    let currentLine = 0;
    
    const interval = setInterval(() => {
      if (currentLine < commands.length) {
        const lineToAdd = commands[currentLine];
        if (lineToAdd) {
          setTerminalOutput(prev => [...prev, lineToAdd]);
        }
        currentLine++;
      } else {
        clearInterval(interval);
      }
    }, 150);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Animated grid background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(100,200,180,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(100,200,180,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
          
          {/* Multiple scan lines */}
          <motion.div
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent"
            animate={{ left: ["0%", "100%"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: 2 }}
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Terminal Interface */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <div className="bg-card/80 backdrop-blur-sm rounded-xl border border-primary/30 overflow-hidden neon-border">
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-card border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">credentials@secure ~ /certificates</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span className="font-mono text-xs text-green-400">VERIFIED</span>
                </div>
              </div>
              
              {/* Terminal Content */}
              <div className="p-6 font-mono text-sm min-h-[180px]">
                {terminalOutput.map((line, index) => {
                    if (!line) return null;
                    const colorClass = 
                      line.startsWith("$") ? "text-primary" : 
                      line.includes("[AUTH]") ? "text-yellow-400" :
                      line.includes("[INFO]") ? "text-blue-400" :
                      line.includes("[LOAD]") ? "text-green-400" :
                      "text-muted-foreground";
                    
                    return (
                      <div
                        key={`${index}-${line}`}
                        className={`mb-1 ${colorClass} animate-in slide-in-from-left-2 fade-in duration-300`}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        {line}
                      </div>
                    );
                  })}
                <span className="inline-block w-2 h-4 bg-primary animate-pulse" />
              </div>
            </div>
          </motion.div>

          {/* Glitch Title */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 }}
            className="text-center"
          >
            <motion.pre
              className="font-mono text-xs md:text-sm text-primary/80 mb-6 overflow-x-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
{`╔═══════════════════════════════════════════════════════════════╗
║   ██���███╗██████╗ ███████╗██████╗ █████��█╗███╗   ██╗████████╗  ║
║  ██╔════╝██╔══██╗██╔════╝██╔══██╗██╔════╝████╗  ██║╚══██╔══╝  ║
║  ██║     ██████╔╝█████╗  ██║  ██║█████╗  ██╔██╗ ██║   ██║     ║
║  ██║     ██╔══██╗██╔══╝  ██║  ██║██╔══╝  ██║╚██╗██║   ██║     ║
║  ╚██████╗██║  ██║███████╗██████╔╝███████╗██║ ╚████║   ██║     ║
║   ╚═════╝╚═╝  ╚═╝╚══════╝╚═════╝ ╚══════╝╚═╝  ╚═══╝   ╚═╝     ║
║                      VERIFIED CREDENTIALS                      ║
╚═══════════════════════════════════════════════════════════════╝`}
            </motion.pre>
          </motion.div>
        </div>
      </section>

      {/* Certificates Gallery */}
      <AnimatedSection className="py-20 bg-card/30 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(100,200,180,0.05)_0%,transparent_50%)]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/30">
              <FileCheck className="w-5 h-5 text-primary" />
              <span className="font-mono text-sm text-primary">$ display ./certificates/*</span>
            </div>
          </div>

          {/* Certificate Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificateImages.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -4 }}
                onClick={() => setSelectedCert(cert)}
                className="relative group cursor-pointer"
              >
                <div className="bg-card/80 backdrop-blur-sm rounded-xl border border-border overflow-hidden hover:border-primary/50 transition-all">
                  {/* Terminal Header */}
                  <div className="flex items-center gap-2 px-3 py-2 bg-card border-b border-border">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                      <div className="w-2 h-2 rounded-full bg-yellow-500" />
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                    </div>
                    <span className="font-mono text-xs text-muted-foreground truncate">cert_{cert.id}.pdf</span>
                  </div>

                  {/* Certificate Image */}
                  <div className="relative aspect-[4/3] bg-muted overflow-hidden">
                    <Image
                      src={cert.src}
                      alt={cert.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />

                    {/* Scan effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100"
                      initial={{ y: "-100%" }}
                      whileHover={{ y: "100%" }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />

                    {/* Expand button */}
                    <div className="absolute top-3 right-3 p-2 rounded-lg bg-card/80 backdrop-blur-sm border border-primary/30 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-4 h-4 text-primary" />
                    </div>

                    {/* Verified badge */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded bg-green-500/20 border border-green-500/30">
                      <BadgeCheck className="w-3 h-3 text-green-400" />
                      <span className="font-mono text-xs text-green-400">VERIFIED</span>
                    </div>
                  </div>

                  {/* Certificate Info */}
                  <div className="p-4 border-t border-border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                        <Calendar className="w-3 h-3" />
                        {cert.year}
                      </div>
                      <ChevronRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </div>

                {/* Corner brackets on hover */}
                <div className="absolute -top-1 -left-1 w-4 h-4 border-l-2 border-t-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute -top-1 -right-1 w-4 h-4 border-r-2 border-t-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute -bottom-1 -left-1 w-4 h-4 border-l-2 border-b-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 border-r-2 border-b-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Skills Matrix - Hacker Style */}
      <AnimatedSection className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-12">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/30">
              <Terminal className="w-5 h-5 text-green-400" />
              <span className="font-mono text-sm text-green-400">$ run skill_matrix.sh</span>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* ASCII Header */}
            <motion.pre
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-mono text-xs text-primary/60 mb-8 overflow-x-auto"
            >
{`┌──────────────────────────────────────────────────────────────┐
│  SKILL VERIFICATION MATRIX v2.0                              │
│  STATUS: ACTIVE | LAST_UPDATE: 2024 | VERIFIED: TRUE         │
└──��───────────────────────────────────────────────────────────┘`}
            </motion.pre>

            {/* Skills with animated progress */}
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onMouseEnter={() => setVerifyingSkill(index)}
                  onMouseLeave={() => setVerifyingSkill(null)}
                  className="group"
                >
                  <div className="bg-card/50 backdrop-blur-sm rounded-lg border border-border p-4 hover:border-primary/30 transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Code2 className="w-5 h-5 text-primary" />
                        <span className="font-mono text-sm">{skill.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {verifyingSkill === index ? (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center gap-1"
                          >
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full"
                            />
                            <span className="font-mono text-xs text-yellow-400">VERIFYING...</span>
                          </motion.div>
                        ) : (
                          <span className="font-mono text-sm text-primary">{skill.level}%</span>
                        )}
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className={`absolute inset-y-0 left-0 bg-gradient-to-r ${skill.color} rounded-full`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      />
                      {/* Animated shine effect */}
                      <motion.div
                        className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{ x: ["-100%", "500%"] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                      />
                    </div>

                    {/* Skill level indicators */}
                    <div className="flex justify-between mt-2">
                      {[0, 25, 50, 75, 100].map((marker) => (
                        <div
                          key={marker}
                          className={`font-mono text-xs ${
                            skill.level >= marker ? "text-primary" : "text-muted-foreground/50"
                          }`}
                        >
                          {marker}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Summary stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 grid grid-cols-3 gap-4"
            >
              {[
                { label: "SKILLS_VERIFIED", value: skills.length, color: "text-green-400" },
                { label: "AVG_PROFICIENCY", value: `${Math.round(skills.reduce((a, b) => a + b.level, 0) / skills.length)}%`, color: "text-blue-400" },
                { label: "STATUS", value: "ACTIVE", color: "text-yellow-400" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-card/50 backdrop-blur-sm rounded-lg border border-border p-4 text-center"
                >
                  <div className={`font-mono text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="font-mono text-xs text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Languages Section */}
      <AnimatedSection className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-3 mb-8 justify-center">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                <GraduationCap className="w-5 h-5 text-cyan-400" />
                <span className="font-mono text-sm text-cyan-400">languages.config</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                { name: "Bengali", level: "Native", proficiency: 100 },
                { name: "English", level: "Proficient", proficiency: 80 },
              ].map((lang, index) => (
                <motion.div
                  key={lang.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-card/80 backdrop-blur-sm rounded-xl border border-border p-6 text-center group hover:border-cyan-500/30 transition-all"
                >
                  <h3 className="font-mono font-semibold text-lg mb-2">{lang.name}</h3>
                  <p className="font-mono text-sm text-cyan-400 mb-4">{lang.level}</p>
                  
                  {/* Circular progress */}
                  <div className="relative w-20 h-20 mx-auto">
                    <svg className="w-20 h-20 transform -rotate-90">
                      <circle
                        cx="40"
                        cy="40"
                        r="36"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="transparent"
                        className="text-muted"
                      />
                      <motion.circle
                        cx="40"
                        cy="40"
                        r="36"
                        stroke="url(#gradient)"
                        strokeWidth="4"
                        fill="transparent"
                        strokeLinecap="round"
                        initial={{ strokeDasharray: "0 226" }}
                        whileInView={{ strokeDasharray: `${(lang.proficiency / 100) * 226} 226` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        viewport={{ once: true }}
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#06b6d4" />
                          <stop offset="100%" stopColor="#22d3ee" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-mono text-lg font-bold text-cyan-400">{lang.proficiency}%</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Certificate Lightbox Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-card rounded-xl border border-primary/30 overflow-hidden neon-border"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-card border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">certificate_viewer.exe</span>
                </div>
                <div className="flex items-center gap-3">
                  <button className="p-1.5 rounded hover:bg-muted transition-colors">
                    <Download className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="p-1.5 rounded hover:bg-muted transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {/* Certificate Content */}
              <div className="relative aspect-[4/3] bg-muted">
                <Image
                  src={selectedCert.src}
                  alt={selectedCert.title}
                  fill
                  className="object-contain"
                />
                {/* Scanline effect overlay */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px]" />
              </div>
              
              {/* Certificate Footer */}
              <div className="p-4 border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BadgeCheck className="w-5 h-5 text-green-400" />
                  <span className="font-mono text-sm text-green-400">CERTIFICATE_VERIFIED</span>
                </div>
                <span className="font-mono text-xs text-muted-foreground">ID: CERT_{selectedCert.id.toString().padStart(4, '0')}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
