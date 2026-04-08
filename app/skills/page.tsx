"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { 
  Terminal, Code2, Database, Globe, Server, 
  Cpu, GitBranch, Braces, FileCode, Layers,
  Zap, Shield, Bug, ChevronRight, ExternalLink
} from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { resumeData } from "@/lib/resume-data";

const skillCategories = [
  {
    id: "languages",
    title: "Programming Languages",
    command: "$ cat /usr/bin/languages",
    icon: Code2,
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/10",
    borderColor: "border-cyan-400/30",
    skills: resumeData.skills.languages,
    description: "Core languages for building robust applications"
  },
  {
    id: "wordpress",
    title: "WordPress Development",
    command: "$ wp plugin list --status=active",
    icon: Globe,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    borderColor: "border-blue-400/30",
    skills: resumeData.skills.wordpress,
    description: "Plugin development and WordPress ecosystem"
  },
  {
    id: "frontend",
    title: "Frontend Technologies",
    command: "$ npm list --depth=0 | grep frontend",
    icon: Layers,
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
    borderColor: "border-purple-400/30",
    skills: resumeData.skills.frontend,
    description: "Modern UI frameworks and styling solutions"
  },
  {
    id: "backend",
    title: "Backend & APIs",
    command: "$ systemctl status backend-services",
    icon: Server,
    color: "text-green-400",
    bgColor: "bg-green-400/10",
    borderColor: "border-green-400/30",
    skills: resumeData.skills.backend,
    description: "Server-side technologies and API development"
  },
  {
    id: "databases",
    title: "Databases",
    command: "$ mysql -u root -p -e 'SHOW DATABASES'",
    icon: Database,
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
    borderColor: "border-yellow-400/30",
    skills: resumeData.skills.databases,
    description: "Data storage and management systems"
  },
  {
    id: "devops",
    title: "DevOps & Tools",
    command: "$ docker ps && git status",
    icon: GitBranch,
    color: "text-orange-400",
    bgColor: "bg-orange-400/10",
    borderColor: "border-orange-400/30",
    skills: resumeData.skills.devops,
    description: "Version control and deployment pipelines"
  },
  {
    id: "datascience",
    title: "Data Science",
    command: "$ python -c 'import pandas; print(pandas.__version__)'",
    icon: Cpu,
    color: "text-pink-400",
    bgColor: "bg-pink-400/10",
    borderColor: "border-pink-400/30",
    skills: resumeData.skills.dataScience,
    description: "Data analysis and machine learning tools"
  },
  {
    id: "scraping",
    title: "Web Scraping",
    command: "$ node scraper.js --headless",
    icon: Bug,
    color: "text-red-400",
    bgColor: "bg-red-400/10",
    borderColor: "border-red-400/30",
    skills: resumeData.skills.webScraping,
    description: "Automated data extraction tools"
  },
  {
    id: "tools",
    title: "Development Tools",
    command: "$ which webpack babel node",
    icon: Braces,
    color: "text-teal-400",
    bgColor: "bg-teal-400/10",
    borderColor: "border-teal-400/30",
    skills: resumeData.skills.tools,
    description: "Build tools and development utilities"
  }
];

const terminalCommands = [
  "$ sudo scan /skills --deep",
  "[INIT] Starting skill analysis...",
  "[SCAN] Detecting programming languages...",
  "[SCAN] Mapping framework knowledge...",
  "[SCAN] Analyzing database expertise...",
  "[OK] Found 9 skill categories",
  "[OK] Total skills indexed: 40+",
  "$ ./render_skills --format=matrix"
];

export default function SkillsPage() {
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [matrixRain, setMatrixRain] = useState<Array<{ id: number; x: number; char: string; speed: number }>>([]);

  // Generate matrix rain characters
  useEffect(() => {
    setMounted(true);
    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    const rain = [...Array(30)].map((_, i) => ({
      id: i,
      x: (i * 3.5) % 100,
      char: chars[Math.floor(i * 7) % chars.length],
      speed: 10 + (i % 15),
    }));
    setMatrixRain(rain);
  }, []);

  // Terminal boot sequence
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
    }, 150);
    
    return () => clearInterval(interval);
  }, []);

  // Calculate total skills
  const totalSkills = useMemo(() => {
    return Object.values(resumeData.skills).reduce((acc, arr) => acc + arr.length, 0);
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      {/* Matrix Rain Background */}
      {mounted && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
          {matrixRain.map((drop) => (
            <div
              key={drop.id}
              className="absolute text-primary font-mono text-sm animate-matrix-fall"
              style={{
                left: `${drop.x}%`,
                animationDuration: `${drop.speed}s`,
                animationDelay: `${drop.id * 0.2}s`,
              }}
            >
              {drop.char}
            </div>
          ))}
        </div>
      )}

      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          {/* Glitch Title */}
          <div className="relative inline-block mb-6">
            <h1 className="text-5xl md:text-7xl font-bold font-mono tracking-tight">
              <span className="text-primary">&lt;</span>
              <span className="relative">
                SKILLS
                <span className="absolute inset-0 text-cyan-400 opacity-70 animate-pulse" style={{ clipPath: "inset(20% 0 30% 0)", transform: "translateX(2px)" }}>SKILLS</span>
                <span className="absolute inset-0 text-red-400 opacity-70 animate-pulse" style={{ clipPath: "inset(60% 0 10% 0)", transform: "translateX(-2px)" }}>SKILLS</span>
              </span>
              <span className="text-primary">/&gt;</span>
            </h1>
          </div>
          
          <p className="text-xl text-muted-foreground font-mono">
            <span className="text-primary">root@skills:</span>~# Technical expertise matrix
          </p>

          {/* Stats Bar */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <div className="flex items-center gap-2 px-4 py-2 bg-card/50 rounded-lg border border-border">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="font-mono text-sm"><span className="text-primary">{totalSkills}+</span> Skills</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-card/50 rounded-lg border border-border">
              <Layers className="w-4 h-4 text-purple-400" />
              <span className="font-mono text-sm"><span className="text-primary">9</span> Categories</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-card/50 rounded-lg border border-border">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="font-mono text-sm"><span className="text-primary">2+</span> Years Exp</span>
            </div>
          </div>
        </motion.div>

        {/* Terminal Window */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="bg-card/80 backdrop-blur-sm rounded-xl border border-border overflow-hidden">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-pointer" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors cursor-pointer" />
                <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors cursor-pointer" />
              </div>
              <span className="ml-4 font-mono text-sm text-muted-foreground">skills@portfolio:~/matrix</span>
              <div className="ml-auto flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-mono text-xs text-green-400">ANALYZING</span>
              </div>
            </div>

            {/* Terminal Content */}
            <div className="p-6 font-mono text-sm max-h-64 overflow-y-auto">
              {terminalLines.map((line, index) => {
                if (!line) return null;
                const colorClass = 
                  line.startsWith("$") ? "text-primary" : 
                  line.includes("[OK]") ? "text-green-400" :
                  line.includes("[INIT]") ? "text-yellow-400" :
                  line.includes("[SCAN]") ? "text-blue-400" :
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

        {/* Skills Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setActiveCategory(category.id)}
                onMouseLeave={() => setActiveCategory(null)}
                className={`relative group cursor-pointer ${isActive ? "z-10" : ""}`}
              >
                {/* Card */}
                <div className={`
                  relative bg-card/80 backdrop-blur-sm rounded-xl border overflow-hidden
                  transition-all duration-300
                  ${isActive ? `${category.borderColor} shadow-lg shadow-primary/10` : "border-border"}
                `}>
                  {/* Scan line effect on hover */}
                  <div className={`
                    absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent
                    transform -translate-y-full group-hover:translate-y-full transition-transform duration-1000
                  `} />
                  
                  {/* Terminal Header */}
                  <div className={`flex items-center gap-2 px-4 py-3 border-b ${isActive ? category.borderColor : "border-border"} bg-muted/30`}>
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                    </div>
                    <span className="ml-2 font-mono text-xs text-muted-foreground truncate">{category.command}</span>
                  </div>

                  {/* Content */}
                  <div className="p-5 relative">
                    {/* Category Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-2.5 rounded-lg ${category.bgColor} border ${category.borderColor}`}>
                        <Icon className={`w-5 h-5 ${category.color}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{category.title}</h3>
                        <p className="text-xs text-muted-foreground font-mono">{category.description}</p>
                      </div>
                    </div>

                    {/* Skills List */}
                    <div className="space-y-2">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + skillIndex * 0.05 }}
                          className={`
                            flex items-center gap-2 px-3 py-2 rounded-lg
                            bg-muted/30 border border-transparent
                            hover:border-primary/30 hover:bg-primary/5
                            transition-all duration-200 group/skill
                          `}
                        >
                          <ChevronRight className={`w-3 h-3 ${category.color} opacity-0 group-hover/skill:opacity-100 transition-opacity`} />
                          <span className="font-mono text-sm text-muted-foreground group-hover/skill:text-foreground transition-colors">
                            {skill}
                          </span>
                          <div className={`ml-auto w-1.5 h-1.5 rounded-full ${category.bgColor} opacity-50 group-hover/skill:opacity-100`} />
                        </motion.div>
                      ))}
                    </div>

                    {/* Skill Count */}
                    <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between">
                      <span className="font-mono text-xs text-muted-foreground">
                        <span className={category.color}>{category.skills.length}</span> skills indexed
                      </span>
                      <div className={`text-xs font-mono ${category.color} opacity-60`}>
                        [LOADED]
                      </div>
                    </div>
                  </div>

                  {/* Corner Brackets */}
                  <div className={`absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 ${category.borderColor} opacity-0 group-hover:opacity-100 transition-opacity`} />
                  <div className={`absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 ${category.borderColor} opacity-0 group-hover:opacity-100 transition-opacity`} />
                  <div className={`absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 ${category.borderColor} opacity-0 group-hover:opacity-100 transition-opacity`} />
                  <div className={`absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 ${category.borderColor} opacity-0 group-hover:opacity-100 transition-opacity`} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Skill Proficiency Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-card/80 backdrop-blur-sm rounded-xl border border-border overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="ml-4 font-mono text-sm text-muted-foreground">proficiency_matrix.sh</span>
            </div>

            <div className="p-6">
              <h3 className="font-mono text-lg mb-6 flex items-center gap-2">
                <FileCode className="w-5 h-5 text-primary" />
                <span className="text-primary">$</span> Core Proficiency Levels
              </h3>

              <div className="space-y-6">
                {[
                  { name: "WordPress/PHP", level: 95, color: "bg-blue-500" },
                  { name: "JavaScript/TypeScript", level: 90, color: "bg-yellow-500" },
                  { name: "React/Next.js", level: 88, color: "bg-cyan-500" },
                  { name: "Node.js/Express", level: 85, color: "bg-green-500" },
                  { name: "Database (MySQL/MongoDB)", level: 82, color: "bg-purple-500" },
                  { name: "Problem Solving/DSA", level: 90, color: "bg-red-500" },
                ].map((skill, index) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-sm text-muted-foreground">{skill.name}</span>
                      <span className="font-mono text-sm text-primary">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.15, ease: "easeOut" }}
                        className={`h-full ${skill.color} relative`}
                      >
                        {/* Shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine" />
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer Stats */}
              <div className="mt-8 pt-6 border-t border-border grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <div className="font-mono text-2xl font-bold text-primary">1500+</div>
                  <div className="font-mono text-xs text-muted-foreground">Problems Solved</div>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <div className="font-mono text-2xl font-bold text-cyan-400">100K+</div>
                  <div className="font-mono text-xs text-muted-foreground">Users Impacted</div>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <div className="font-mono text-2xl font-bold text-green-400">5+</div>
                  <div className="font-mono text-xs text-muted-foreground">Plugins Built</div>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <div className="font-mono text-2xl font-bold text-yellow-400">100+</div>
                  <div className="font-mono text-xs text-muted-foreground">CF Contests</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-center mt-16"
        >
          <p className="font-mono text-muted-foreground mb-6">
            <span className="text-primary">$</span> Want to see these skills in action?
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-mono text-sm hover:bg-primary/90 transition-colors"
            >
              <Terminal className="w-4 h-4" />
              View Projects
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-card border border-border rounded-lg font-mono text-sm hover:bg-muted transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Get in Touch
            </a>
          </div>
        </motion.div>
      </div>

      <Footer />

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes matrix-fall {
          0% {
            transform: translateY(-100vh);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }
        .animate-matrix-fall {
          animation: matrix-fall linear infinite;
        }
        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shine {
          animation: shine 2s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}
