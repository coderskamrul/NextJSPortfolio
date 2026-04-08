"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animated-section";
import { resumeData } from "@/lib/resume-data";
import Image from "next/image";
import { 
  Trophy, 
  Medal, 
  Users, 
  Flag,
  Star,
  Award,
  Target,
  Terminal,
  ChevronRight,
  Maximize2,
  X
} from "lucide-react";

// Award images - real award photos
const awardImages = [
  { id: 1, src: "https://i.ibb.co.com/Z1K4gPfd/1738326537583-1.jpg", alt: "1st Runner-Up Award in IUBAT - Intra University Programming Contest Spring 2021" },
  { id: 2, src: "https://i.ibb.co.com/Nd7073Kh/IMG-5772.jpg", alt: "2nd Runner-Up Award in IUBAT - Intra University Programming Contest Summer 2022" },
  { id: 3, src: "https://i.ibb.co.com/Wpkrt6B2/1738326322261c-1.png", alt: "1st Runner-Up Award in UITS - Collaboration Programming Contest 2022" },
];

const terminalCommands = [
  "$ cat /achievements/summary.log",
  "[OK] Loading achievement records...",
  "[OK] Found 3 competition awards",
  "[OK] Found 3 ICPC participations",
  "[OK] Total problems solved: 1500+",
  "$ ./display_achievements --format=visual",
  "[READY] Rendering achievements..."
];

export default function AwardsPage() {
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<typeof awardImages[0] | null>(null);
  const [glitchText, setGlitchText] = useState(false);

  useEffect(() => {
    const commands = [...terminalCommands];
    let currentLine = 0;
    
    const interval = setInterval(() => {
      if (currentLine < commands.length) {
        const lineToAdd = commands[currentLine];
        if (lineToAdd) {
          setTerminalLines(prev => [...prev, lineToAdd]);
        }
        currentLine++;
      } else {
        clearInterval(interval);
      }
    }, 200);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchText(true);
      setTimeout(() => setGlitchText(false), 150);
    }, 5000);
    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section with Terminal */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Matrix Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(100,200,180,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(100,200,180,0.03)_1px,transparent_1px)] bg-[size:30px_30px]" />
          {/* Animated scan line */}
          <motion.div
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Terminal Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <div className="bg-card/80 backdrop-blur-sm rounded-xl border border-primary/30 overflow-hidden neon-border">
              {/* Terminal Title Bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-card border-b border-border">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="font-mono text-xs text-muted-foreground ml-2">achievements@portfolio ~ /awards</span>
              </div>
              
              {/* Terminal Content */}
              <div className="p-6 font-mono text-sm">
                {terminalLines.map((line, index) => {
                    if (!line) return null;
                    const colorClass = 
                      line.startsWith("$") ? "text-primary" : 
                      line.includes("[OK]") ? "text-green-400" :
                      line.includes("[READY]") ? "text-yellow-400" :
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
                <span className="inline-block w-2 h-4 bg-primary ml-1 animate-pulse" />
              </div>
            </div>
          </motion.div>

          {/* Glitch Title */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5 }}
            className="text-center"
          >
            <div className="relative inline-block">
              <h1 className={`text-5xl md:text-7xl font-bold font-mono text-primary text-glow ${glitchText ? 'glitch-hover' : ''}`}>
                {'<ACHIEVEMENTS/>'}
              </h1>
              {glitchText && (
                <>
                  <h1 className="absolute inset-0 text-5xl md:text-7xl font-bold font-mono text-red-500/50 translate-x-[2px] translate-y-[2px]">
                    {'<ACHIEVEMENTS/>'}
                  </h1>
                  <h1 className="absolute inset-0 text-5xl md:text-7xl font-bold font-mono text-cyan-500/50 -translate-x-[2px] -translate-y-[2px]">
                    {'<ACHIEVEMENTS/>'}
                  </h1>
                </>
              )}
            </div>
          </motion.div>

          {/* Stats Grid - Hacker Style */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12"
          >
            {[
              { icon: Medal, value: "04", label: "RUNNER_UP", color: "text-yellow-400", borderColor: "border-yellow-500/30" },
              { icon: Flag, value: "03", label: "ICPC_EVENTS", color: "text-blue-400", borderColor: "border-blue-500/30" },
              { icon: Star, value: "1325", label: "MAX_RATING", color: "text-red-400", borderColor: "border-red-500/30" },
              { icon: Target, value: "1500+", label: "PROBLEMS", color: "text-green-400", borderColor: "border-green-500/30" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2 + index * 0.1 }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(100, 200, 180, 0.3)" }}
                className={`relative bg-card/50 backdrop-blur-sm rounded-lg border ${stat.borderColor} p-6 overflow-hidden group`}
              >
                {/* Scan effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent"
                  initial={{ y: "-100%" }}
                  whileHover={{ y: "100%" }}
                  transition={{ duration: 0.5 }}
                />
                
                <div className="relative z-10">
                  <stat.icon className={`w-6 h-6 ${stat.color} mb-3`} />
                  <div className={`text-3xl font-bold font-mono ${stat.color}`}>
                    {stat.value}
                  </div>
                  <div className="text-xs font-mono text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </div>

                {/* Corner brackets */}
                <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-primary/50" />
                <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-primary/50" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-primary/50" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-primary/50" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Award Gallery Section */}
      <AnimatedSection className="py-20 bg-card/30 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(100,200,180,0.05)_0%,transparent_70%)]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <Terminal className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold font-mono">
              <span className="text-primary">$</span> ls ./award_gallery/
            </h2>
          </div>

          {/* Image Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {awardImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedImage(image)}
                className="relative group cursor-pointer"
              >
                <div className="bg-card/80 backdrop-blur-sm rounded-xl border border-border overflow-hidden hover:border-primary/50 transition-all">
                  {/* Image Container */}
                  <div className="relative aspect-video bg-muted overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    
                    {/* Scan overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100"
                      initial={{ y: "-100%" }}
                      whileHover={{ y: "100%" }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                    
                    {/* Expand icon */}
                    <div className="absolute top-4 right-4 p-2 rounded-lg bg-card/80 backdrop-blur-sm border border-primary/30 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                  
                  {/* Image Info */}
                  <div className="p-4 border-t border-border">
                    <div className="flex items-center gap-2 font-mono text-sm">
                      <ChevronRight className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground truncate">{image.alt}</span>
                    </div>
                  </div>
                </div>
                
                {/* Corner accents */}
                <div className="absolute -top-1 -left-1 w-4 h-4 border-l-2 border-t-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute -top-1 -right-1 w-4 h-4 border-r-2 border-t-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute -bottom-1 -left-1 w-4 h-4 border-l-2 border-b-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 border-r-2 border-b-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Competition Awards */}
      <AnimatedSection className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-12">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span className="font-mono text-sm text-yellow-400">competition_awards.json</span>
            </div>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {resumeData.awards.map((award, index) => (
              <StaggerItem key={index}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="relative bg-card/50 backdrop-blur-sm rounded-xl border border-border overflow-hidden group"
                >
                  {/* Terminal header */}
                  <div className="flex items-center gap-2 px-4 py-2 bg-card border-b border-border">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                    </div>
                    <span className="font-mono text-xs text-muted-foreground">award_{index + 1}.exe</span>
                  </div>

                  <div className="p-6">
                    {/* Rank Badge */}
                    <div className="flex items-center gap-2 mb-4">
                      <Medal className="w-6 h-6 text-yellow-500" />
                      <span className="font-mono text-lg font-bold text-yellow-400">
                        {award.title}
                      </span>
                    </div>

                    {/* Terminal Output */}
                    <div className="font-mono text-sm space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="text-primary">event:</span>
                        <span className="text-foreground">{award.event}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-primary">org:</span>
                        <span className="text-muted-foreground">{award.organization}</span>
                      </div>
                      {award.team && (
                        <div className="flex items-start gap-2">
                          <span className="text-primary">team:</span>
                          <span className="text-cyan-400">{award.team}</span>
                        </div>
                      )}
                    </div>

                    {/* Status bar */}
                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="font-mono text-xs text-green-400">VERIFIED</span>
                      </div>
                    </div>
                  </div>

                  {/* Hover glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-yellow-500/5 to-yellow-500/0 opacity-0 group-hover:opacity-100"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </AnimatedSection>

      {/* ICPC Participations */}
      <AnimatedSection className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-12">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <Flag className="w-5 h-5 text-blue-400" />
              <span className="font-mono text-sm text-blue-400">icpc_participations.log</span>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* ASCII Timeline Header */}
            <motion.pre
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-mono text-xs text-primary/70 mb-8 overflow-x-auto"
            >
{`╔══════════════════════════════════════════════════════════════╗
║  ██╗ ██████╗██████╗  ██████╗                                 ║
║  ██║██╔════╝██╔══██╗██╔════╝                                 ║
║  ██║██║     ██████╔╝██║                                      ║
║  ██║██║     ██╔═══╝ ██║                                      ║
║  ██║╚██████╗██║     ╚██████╗                                 ║
║  ╚═╝ ╚═════╝╚═╝      ╚═════╝  PARTICIPATION LOGS             ║
╚══════════════════════════════════════════════════════════════╝`}
            </motion.pre>

            <StaggerContainer className="space-y-4">
              {resumeData.participations.map((participation, index) => (
                <StaggerItem key={index}>
                  <motion.div
                    whileHover={{ x: 8, borderColor: "rgba(59, 130, 246, 0.5)" }}
                    className="relative bg-card/80 backdrop-blur-sm rounded-lg border border-border p-6 overflow-hidden group"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-blue-500/20 border border-blue-500/30">
                          <Flag className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <h3 className="font-mono font-semibold text-lg mb-1">
                            {participation.event}
                          </h3>
                          {participation.team && (
                            <div className="flex items-center gap-2 text-sm">
                              <Users className="w-4 h-4 text-cyan-400" />
                              <span className="text-cyan-400 font-mono">{participation.team}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 text-xs font-mono bg-blue-500/20 text-blue-400 rounded border border-blue-500/30">
                          {participation.event.includes("ICPC") ? "ICPC_EVENT" : "CONTEST"}
                        </span>
                      </div>
                    </div>

                    {/* Progress line effect */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500"
                      initial={{ width: "0%" }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </AnimatedSection>

      {/* Image Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-card rounded-xl border border-primary/30 overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-card border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">image_viewer.exe</span>
                </div>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="p-1 rounded hover:bg-muted transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              {/* Image Content */}
              <div className="relative aspect-video bg-muted">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                />
                {/* Scanline effect overlay */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px]" />
              </div>
              
              {/* Image Info */}
              <div className="p-4 border-t border-border">
                <p className="font-mono text-sm text-muted-foreground">{selectedImage.alt}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
