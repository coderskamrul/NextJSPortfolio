"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { resumeData } from "@/lib/resume-data";
import { AnimatedSection } from "@/components/animated-section";
import { 
  Code2, 
  Server, 
  Database, 
  Globe, 
  Puzzle, 
  GitBranch,
  Cpu,
  Bot,
  Terminal,
  Shield,
  Zap,
  Activity
} from "lucide-react";

const skillCategories = [
  {
    title: "Languages",
    icon: Code2,
    skills: resumeData.skills.languages,
    command: "cat /usr/local/languages",
  },
  {
    title: "WordPress",
    icon: Puzzle,
    skills: resumeData.skills.wordpress,
    command: "wp plugin list --status=active",
  },
  {
    title: "Frontend",
    icon: Globe,
    skills: resumeData.skills.frontend,
    command: "npm list --depth=0",
  },
  {
    title: "Backend",
    icon: Server,
    skills: resumeData.skills.backend,
    command: "composer show --installed",
  },
  {
    title: "Databases",
    icon: Database,
    skills: resumeData.skills.databases,
    command: "mysql --version && psql --version",
  },
  {
    title: "DevOps",
    icon: GitBranch,
    skills: resumeData.skills.devops,
    command: "docker ps && git status",
  },
  {
    title: "Data Science",
    icon: Cpu,
    skills: resumeData.skills.dataScience,
    command: "python -c 'import sklearn'",
  },
  {
    title: "Scraping",
    icon: Bot,
    skills: resumeData.skills.webScraping,
    command: "scrapy list",
  },
];

// Matrix rain effect component
function MatrixRain() {
  const [columns, setColumns] = useState<Array<{ id: number; chars: string[]; x: number; speed: number }>>([]);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01";
    const newColumns = [...Array(15)].map((_, i) => ({
      id: i,
      chars: [...Array(8)].map(() => chars[Math.floor(Math.random() * chars.length)]),
      x: (i * 7) % 100,
      speed: 3 + (i % 5),
    }));
    setColumns(newColumns);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
      {columns.map((col) => (
        <motion.div
          key={col.id}
          className="absolute font-mono text-xs text-primary whitespace-pre leading-4"
          style={{ left: `${col.x}%` }}
          initial={{ y: "-100%" }}
          animate={{ y: "100%" }}
          transition={{
            duration: col.speed,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {col.chars.map((char, i) => (
            <div key={i} style={{ opacity: 1 - i * 0.12 }}>{char}</div>
          ))}
        </motion.div>
      ))}
    </div>
  );
}

// Terminal typing effect
function TerminalTyping({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        if (i <= text.length) {
          setDisplayText(text.slice(0, i));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 30);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span>
      {displayText}
      <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>_</span>
    </span>
  );
}

// Skill card with terminal UI
function SkillCard({ category, index }: { category: typeof skillCategories[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isBooted, setIsBooted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsBooted(true), index * 200 + 500);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      {/* Glow effect */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-cyan-500/50 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      
      <div className="relative h-full bg-background/95 backdrop-blur-sm rounded-xl border border-primary/30 overflow-hidden">
        {/* Terminal header */}
        <div className="flex items-center justify-between px-4 py-2 bg-primary/10 border-b border-primary/20">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            </div>
            <span className="text-xs font-mono text-muted-foreground ml-2">
              {category.title.toLowerCase()}.sh
            </span>
          </div>
          <category.icon className="w-4 h-4 text-primary" />
        </div>

        {/* Terminal content */}
        <div className="p-4 font-mono text-xs">
          {/* Command line */}
          <div className="flex items-center gap-2 text-muted-foreground mb-3">
            <span className="text-primary">$</span>
            <span className="text-foreground/70">{category.command}</span>
          </div>
          
          {/* Output */}
          <AnimatePresence>
            {isBooted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-1"
              >
                <div className="text-green-400 mb-2">
                  [OK] Loaded {category.skills.length} modules
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: skillIndex * 0.05 }}
                      whileHover={{ 
                        scale: 1.1, 
                        boxShadow: "0 0 20px rgba(45,212,191,0.5)",
                      }}
                      className="inline-flex items-center px-2 py-1 rounded bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 hover:border-primary/50 transition-all cursor-default"
                    >
                      <span className="text-primary/60 mr-1">&gt;</span>
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Blinking cursor */}
          {!isBooted && (
            <div className="flex items-center gap-1">
              <span className="text-primary animate-pulse">_</span>
              <span className="text-muted-foreground text-[10px]">Loading...</span>
            </div>
          )}
        </div>

        {/* Scan line effect on hover */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"
              initial={{ top: 0 }}
              animate={{ top: "100%" }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// Problem solving card with live stats
function ProblemSolvingTerminal() {
  const [activeTab, setActiveTab] = useState(0);
  const [mounted, setMounted] = useState(false);
  
  const platforms = [
    {
      name: "Codeforces",
      handle: "@raisa_ferdous",
      rating: resumeData.problemSolving.codeforces.rating,
      solved: resumeData.problemSolving.codeforces.solved,
      rank: "Pupil",
      color: "text-cyan-400",
      progress: 66,
    },
    {
      name: "CodeChef",
      handle: "@raisa_ferdous",
      rating: resumeData.problemSolving.codechef.rating,
      solved: resumeData.problemSolving.codechef.solved,
      rank: "3 Star",
      color: "text-amber-400",
      progress: 75,
    },
    {
      name: "LeetCode",
      handle: "@raisa_ferdous",
      rating: "N/A",
      solved: resumeData.problemSolving.leetcode.solved,
      rank: "Active",
      color: "text-orange-400",
      progress: 45,
    },
  ];

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % platforms.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 }}
      className="relative mt-16"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-cyan-500/5 to-primary/5 rounded-2xl blur-xl" />
      
      <div className="relative bg-background/95 backdrop-blur-sm rounded-2xl border border-primary/30 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3 bg-primary/10 border-b border-primary/20">
          <div className="flex items-center gap-4">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="font-mono text-sm text-primary">problem_solving_stats.sh</span>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-green-400 animate-pulse" />
            <span className="text-xs text-green-400 font-mono">LIVE</span>
          </div>
        </div>

        <div className="p-6 md:p-8">
          {/* ASCII Art Header */}
          <pre className="text-primary/60 text-[8px] md:text-[10px] font-mono mb-6 leading-tight hidden md:block">
{`  ____  ____   ___  ____  _     _____ __  __     ____   ___  _  __     _____ ____  
 |  _ \\|  _ \\ / _ \\| __ )| |   | ____|  \\/  |   / ___| / _ \\| |/ /    | ____|  _ \\ 
 | |_) | |_) | | | |  _ \\| |   |  _| | |\\/| |   \\___ \\| | | | ' /     |  _| | |_) |
 |  __/|  _ <| |_| | |_) | |___| |___| |  | |    ___) | |_| | . \\     | |___|  _ < 
 |_|   |_| \\_\\\\___/|____/|_____|_____|_|  |_|   |____/ \\___/|_|\\_\\    |_____|_| \\_\\`}
          </pre>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-xl blur-sm group-hover:blur-md transition-all" />
              <div className="relative bg-background/80 rounded-xl border border-primary/30 p-4 text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary font-mono mb-1">
                  {mounted ? (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {resumeData.problemSolving.total}
                    </motion.span>
                  ) : "---"}
                </div>
                <div className="text-xs text-muted-foreground font-mono">TOTAL_SOLVED</div>
                <Zap className="w-4 h-4 text-primary absolute top-2 right-2 opacity-50" />
              </div>
            </motion.div>

            {platforms.map((platform, index) => (
              <motion.div
                key={platform.name}
                whileHover={{ scale: 1.05 }}
                className={`relative group ${activeTab === index ? 'ring-2 ring-primary/50' : ''}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-xl blur-sm ${activeTab === index ? 'blur-md' : ''} transition-all`} />
                <div className="relative bg-background/80 rounded-xl border border-primary/30 p-4 text-center">
                  <div className={`text-2xl md:text-3xl font-bold font-mono mb-1 ${platform.color}`}>
                    {platform.solved}
                  </div>
                  <div className="text-xs text-muted-foreground font-mono">{platform.name.toUpperCase()}</div>
                  <div className="text-[10px] text-primary mt-1">{platform.rating}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Terminal Output */}
          <div className="bg-background/50 rounded-xl border border-primary/20 p-4 font-mono text-xs">
            <div className="text-muted-foreground mb-2">
              <span className="text-primary">$</span> ./analyze_progress.sh --all
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-2"
              >
                <div className="text-green-400">[INFO] Connecting to {platforms[activeTab].name}...</div>
                <div className="text-foreground">
                  <span className="text-muted-foreground">Handle:</span> {platforms[activeTab].handle}
                </div>
                <div className="text-foreground">
                  <span className="text-muted-foreground">Rating:</span>{" "}
                  <span className={platforms[activeTab].color}>{platforms[activeTab].rating}</span>
                </div>
                <div className="text-foreground">
                  <span className="text-muted-foreground">Rank:</span>{" "}
                  <span className={platforms[activeTab].color}>{platforms[activeTab].rank}</span>
                </div>
                <div className="text-foreground">
                  <span className="text-muted-foreground">Problems:</span>{" "}
                  <span className="text-primary">{platforms[activeTab].solved}</span>
                </div>
                
                {/* Progress bar */}
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-muted-foreground">Progress:</span>
                  <div className="flex-1 h-2 bg-primary/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-cyan-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${platforms[activeTab].progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                  <span className={platforms[activeTab].color}>{platforms[activeTab].progress}%</span>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-4 pt-4 border-t border-primary/10">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-green-400">[COMPLETE]</span>
                <span>Journey continues...</span>
              </div>
            </div>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center gap-2 mt-4">
            {platforms.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  activeTab === index ? 'bg-primary w-6' : 'bg-primary/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function SkillsSection() {
  return (
    <AnimatedSection className="py-20 relative overflow-hidden">
      {/* Matrix rain background */}
      <MatrixRain />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/30 mb-6 backdrop-blur-sm"
          >
            <Terminal className="w-5 h-5 text-primary" />
            <span className="font-mono text-sm text-primary tracking-wider">
              <TerminalTyping text="./load_arsenal.sh" />
            </span>
            <Shield className="w-4 h-4 text-green-400" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            <span className="text-primary/50 font-mono text-xl md:text-2xl">// </span>
            Technical{" "}
            <span className="text-primary text-glow">Arsenal</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="text-muted-foreground max-w-2xl mx-auto font-mono text-sm"
          >
            <span className="text-green-400">[SYSTEM]</span> Loading developer toolkit...{" "}
            <span className="text-primary">8 modules</span> initialized successfully.
          </motion.p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {skillCategories.map((category, index) => (
            <SkillCard key={category.title} category={category} index={index} />
          ))}
        </div>

        {/* Problem Solving Section */}
        <ProblemSolvingTerminal />
      </div>
    </AnimatedSection>
  );
}
