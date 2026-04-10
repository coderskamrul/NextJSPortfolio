"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animated-section";
import { resumeData } from "@/lib/resume-data";
import Link from "next/link";
import Image from "next/image";
import { 
  User, 
  Code2, 
  Award, 
  Users, 
  BookOpen,
  Target,
  Heart,
  Zap,
  Globe,
  Terminal,
  Trophy,
  Medal,
  Shield,
  ChevronRight,
  ExternalLink,
  FileCode,
  Database,
  Cpu,
  GitBranch
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Terminal boot sequence
const bootSequence = [
  "$ cat /home/developer/profile.json",
  "[LOAD] Parsing developer credentials...",
  "[OK] Identity verified: WordPress Plugin Developer",
  "[OK] Experience: 2+ years",
  "[OK] Active plugin users: 100K+",
  "[OK] Problems solved: 1500+",
  "[READY] Profile loaded successfully"
];

// ASCII Art for section headers
const asciiHeaders = {
  about: `
 █████╗ ██████╗  ██████╗ ██╗   ██╗████████╗
██╔══██╗██╔══██╗██╔═══██╗██║   ██║╚══██╔══╝
███████║██████╔╝██║   ██║██║   ██║   ██║   
██╔══██║██╔══██╗██║   ██║██║   ██║   ██║   
██║  ██║██████╔╝╚██████╔╝╚██████╔╝   ██║   
╚═╝  ╚═╝╚═════╝  ╚═════╝  ╚═════╝    ╚═╝   
`,
  achievements: `
 █████╗  ██████╗██╗  ██╗██╗███████╗██╗   ██╗███████╗
██╔══██╗██╔════╝██║  ██║██║██╔════╝██║   ██║██╔════╝
███████║██║     ███████║██║█████╗  ██║   ██║█████╗  
██╔══██║██║     ██╔══██║██║██╔══╝  ╚██╗ ██╔╝██╔══╝  
██║  ██║╚██████╗██║  ██║██║███████╗ ╚████╔╝ ███████╗
╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝╚══════╝  ╚═══╝  ╚══════╝
`
};

const statCards = [
  { icon: Users, label: "Plugin Users", value: "100K+", color: "text-cyan-400" },
  { icon: Code2, label: "Problems Solved", value: "1500+", color: "text-green-400" },
  { icon: Trophy, label: "Awards Won", value: "8+", color: "text-yellow-400" },
  { icon: Target, label: "ICPC Events", value: "5+", color: "text-purple-400" }
];

const skills = [
  { category: "Languages", icon: FileCode, items: ["C", "C++", "PHP", "JavaScript", "TypeScript", "Python"] },
  { category: "WordPress", icon: Globe, items: ["Plugin Dev", "Hooks", "REST API", "WooCommerce"] },
  { category: "Frontend", icon: Cpu, items: ["React", "Next.js", "Tailwind CSS", "jQuery"] },
  { category: "Backend", icon: Database, items: ["Node.js", "Express", "MySQL", "MongoDB"] },
  { category: "DevOps", icon: GitBranch, items: ["Git", "Docker", "CI/CD", "Linux"] }
];

export default function AboutPage() {
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  const [glitchText, setGlitchText] = useState(false);

  useEffect(() => {
    setMounted(true);
    const commands = [...bootSequence];
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
    }, 150);
    
    return () => clearInterval(interval);
  }, []);

  // Glitch effect trigger
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchText(true);
      setTimeout(() => setGlitchText(false), 200);
    }, 5000);
    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section with Matrix Effect */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(100,200,180,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(100,200,180,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        {/* Floating Code Particles */}
        {mounted && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute text-primary/10 font-mono text-sm animate-pulse"
                style={{
                  left: `${(i * 7) % 100}%`,
                  top: `${(i * 13) % 100}%`,
                  animationDelay: `${i * 0.3}s`
                }}
              >
                {["</>", "{}", "();", "=>", "&&", "[]"][i % 6]}
              </div>
            ))}
          </div>
        )}
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* ASCII Art Header */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8 overflow-x-auto"
            >
              <pre className="text-primary/60 text-[6px] sm:text-[8px] md:text-xs font-mono inline-block text-left">
                {asciiHeaders.about}
              </pre>
            </motion.div>

            {/* Terminal Window */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card/80 backdrop-blur-sm rounded-xl border border-primary/20 overflow-hidden mb-12 neon-border"
            >
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-primary/20 bg-card/50">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="font-mono text-xs text-primary">developer@portfolio:~/about</span>
                <Terminal className="w-4 h-4 text-primary/50" />
              </div>

              {/* Terminal Content */}
              <div className="p-6 font-mono text-sm min-h-[200px]">
                {terminalLines.map((line, index) => {
                  if (!line) return null;
                  const colorClass = 
                    line.startsWith("$") ? "text-primary" : 
                    line.includes("[OK]") ? "text-green-400" :
                    line.includes("[LOAD]") ? "text-yellow-400" :
                    line.includes("[READY]") ? "text-cyan-400" :
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
            </motion.div>

            {/* Main Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border overflow-hidden"
            >
              <div className="grid md:grid-cols-3 gap-0">
                {/* Left Panel - Avatar & Identity */}
                <div className="md:col-span-1 p-8 bg-gradient-to-br from-primary/10 to-transparent border-b md:border-b-0 md:border-r border-border">
                  <div className="text-center">
                    {/* Glitch Avatar */}
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className={`relative w-50 h-50 mx-auto rounded-2xl bg-card border-2 border-primary/30 flex items-center justify-center mb-6 overflow-hidden ${glitchText ? 'glitch-hover' : ''}`}
                    >
                      <Image
                        src="https://i.ibb.co.com/svLtDBy1/hmdkamrul-img.png"
                        alt="Profile"
                        fill
                        className="object-cover"
                      />
                      {/* Scan line effect */}
                      <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(100,200,180,0.05)_50%)] bg-[length:100%_4px] pointer-events-none" />
                      {/* Corner brackets */}
                      <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-primary" />
                      <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-primary" />
                      <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-primary" />
                      <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-primary" />
                    </motion.div>

                    <h2 className={`text-xl font-bold mb-1 ${glitchText ? 'text-glow' : ''}`}>
                      Plugin & SASS Developer
                    </h2>
                    <p className="text-primary font-mono text-sm mb-4">@software_engineer</p>

                    {/* Status Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-xs font-mono text-green-400">AVAILABLE FOR HIRE</span>
                    </div>
                  </div>
                </div>

                {/* Right Panel - Bio & Stats */}
                <div className="md:col-span-2 p-8">
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-primary font-mono">$</span>
                      <span className="text-muted-foreground font-mono">cat bio.txt</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {resumeData.summary}
                    </p>
                  </div>

                  {/* Quick Stats Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {statCards.map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        className="bg-card/50 rounded-lg p-4 border border-border hover:border-primary/30 transition-all group"
                      >
                        <stat.icon className={`w-5 h-5 ${stat.color} mb-2 group-hover:animate-pulse`} />
                        <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                        <div className="text-xs text-muted-foreground font-mono">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Matrix Section */}
      <AnimatedSection className="py-20 bg-card/30 relative overflow-hidden">
        {/* Matrix rain effect placeholder */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_24%,rgba(100,200,180,0.05)_25%,rgba(100,200,180,0.05)_26%,transparent_27%,transparent_74%,rgba(100,200,180,0.05)_75%,rgba(100,200,180,0.05)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(100,200,180,0.05)_25%,rgba(100,200,180,0.05)_26%,transparent_27%,transparent_74%,rgba(100,200,180,0.05)_75%,rgba(100,200,180,0.05)_76%,transparent_77%,transparent)] bg-[size:50px_50px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Cpu className="w-4 h-4 text-primary" />
              <span className="font-mono text-sm text-primary">SKILL_MATRIX</span>
            </div>
            <h2 className="text-3xl font-bold">
              <span className="text-primary">&lt;</span>
              Technical Arsenal
              <span className="text-primary">/&gt;</span>
            </h2>
          </motion.div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {skills.map((skill) => (
              <StaggerItem key={skill.category}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="h-full bg-card/80 backdrop-blur-sm rounded-xl border border-border hover:border-primary/30 transition-all overflow-hidden group"
                >
                  {/* Category Header */}
                  <div className="px-4 py-3 border-b border-border bg-card/50 flex items-center gap-2">
                    <skill.icon className="w-4 h-4 text-primary" />
                    <span className="font-mono text-sm text-primary">{skill.category}</span>
                  </div>
                  {/* Skills List */}
                  <div className="p-4 space-y-2">
                    {skill.items.map((item, idx) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors"
                      >
                        <span className="text-primary font-mono">{`0${idx + 1}`}</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </AnimatedSection>

      {/* Awards Section */}
      <AnimatedSection className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="overflow-x-auto mb-4"
            >
              <pre className="text-primary/40 text-[5px] sm:text-[7px] font-mono inline-block">
                {asciiHeaders.achievements}
              </pre>
            </motion.div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-4">
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span className="font-mono text-sm text-yellow-400">AWARDS_LOG</span>
            </div>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <StaggerContainer className="grid gap-4">
              {resumeData.awards.map((award, index) => (
                <StaggerItem key={index}>
                  <motion.div
                    whileHover={{ x: 8 }}
                    className="bg-card/50 backdrop-blur-sm rounded-xl border border-border hover:border-yellow-500/30 transition-all p-6 group"
                  >
                    <div className="flex items-start gap-4">
                      {/* Trophy Icon */}
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center group-hover:bg-yellow-500/20 transition-colors">
                        <Trophy className="w-6 h-6 text-yellow-400" />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-xs text-primary">[{String(index + 1).padStart(2, '0')}]</span>
                          <span className="px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-400 text-xs font-mono">
                            {award.title}
                          </span>
                        </div>
                        <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                          {award.event}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="font-mono">{award.organization}</span>
                          {award.team && (
                            <>
                              <span className="text-primary">|</span>
                              <span>{award.team}</span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Arrow */}
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* View All Link */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-8"
            >
              <Link href="/awards">
                <Button variant="outline" className="group">
                  <span>View All Awards & Photos</span>
                  <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Certificates Section */}
      <AnimatedSection className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span className="font-mono text-sm text-cyan-400">VERIFIED_CERTS</span>
            </div>
            <h2 className="text-3xl font-bold">
              <span className="text-primary">&lt;</span>
              Certificates & Recognition
              <span className="text-primary">/&gt;</span>
            </h2>
          </motion.div>

          <StaggerContainer className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {resumeData.certificates.map((cert, index) => (
              <StaggerItem key={cert.title}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-card/80 backdrop-blur-sm rounded-xl border border-border hover:border-cyan-500/30 transition-all overflow-hidden group h-full"
                >
                  {/* Header */}
                  <div className="px-4 py-3 border-b border-border bg-gradient-to-r from-cyan-500/10 to-transparent flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
                      <span className="font-mono text-xs text-cyan-400">VERIFIED</span>
                    </div>
                    <span className="font-mono text-xs text-muted-foreground">{cert.year}</span>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-colors">
                      <Medal className="w-6 h-6 text-cyan-400" />
                    </div>
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">{cert.description}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-primary">Issued by:</span>
                      <span className="text-xs text-muted-foreground">{cert.issuer}</span>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* View All Link */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <Link href="/certificates">
              <Button variant="outline" className="group">
                <span>View All Certificates</span>
                <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Co-curricular Activities */}
      <AnimatedSection className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4">
                <BookOpen className="w-4 h-4 text-purple-400" />
                <span className="font-mono text-sm text-purple-400">EXTRA_MODULES</span>
              </div>
              <h2 className="text-3xl font-bold">
                <span className="text-primary">&lt;</span>
                Beyond Code
                <span className="text-primary">/&gt;</span>
              </h2>
            </motion.div>

            <div className="space-y-6">
              {resumeData.coActivities.map((activity, index) => (
                <motion.div
                  key={activity.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-card/50 backdrop-blur-sm rounded-xl border border-border hover:border-purple-500/30 transition-all overflow-hidden"
                >
                  {/* Activity Header */}
                  <div className="px-6 py-4 border-b border-border bg-purple-500/5 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                      <Heart className="w-4 h-4 text-purple-400" />
                    </div>
                    <h3 className="font-semibold flex items-center gap-2">
                      <span className="text-primary font-mono">{'>'}</span>
                      {activity.title}
                    </h3>
                  </div>

                  {/* Activity Items */}
                  <div className="p-6">
                    <ul className="space-y-3">
                      {activity.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-3 text-sm text-muted-foreground group">
                          <span className="text-purple-400 font-mono mt-0.5">{String(itemIndex + 1).padStart(2, '0')}</span>
                          <span className="group-hover:text-foreground transition-colors">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Interests Tags */}
      <AnimatedSection className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">
              <span className="font-mono text-primary text-sm">// </span>
              What Drives Me
            </h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {[
              { icon: Code2, label: "Plugin Development" },
              { icon: Terminal, label: "Problem Solving" },
              { icon: Globe, label: "Open Source" },
              { icon: Zap, label: "Performance" },
              { icon: BookOpen, label: "Learning" },
              { icon: Heart, label: "Mentoring" }
            ].map((interest, index) => (
              <motion.div
                key={interest.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 border border-border hover:border-primary/30 transition-all cursor-default"
              >
                <interest.icon className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">{interest.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <Footer />
    </main>
  );
}
