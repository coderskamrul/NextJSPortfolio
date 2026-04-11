"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Github, Linkedin, Code2, Terminal, Braces, Database, Shield, Cpu, Activity, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { resumeData } from "@/lib/resume-data";

const codeSnippets = [
  {
    title: "plugin.php",
    lang: "php",
    code: `<?php
/**
 * Plugin Name: BetterLinks
 * Active Users: 20,000+
 */
add_action('init', function() {
  $this->register_routes();
  $this->init_analytics();
  return true;
});`,
  },
  {
    title: "component.tsx",
    lang: "tsx",
    code: `export const Analytics = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetchMetrics()
      .then(setData)
      .catch(console.error);
  }, []);
  
  return <Chart data={data} />;
};`,
  },
  {
    title: "api.php",
    lang: "php",
    code: `register_rest_route('api/v2', '/track', [
  'methods'  => 'POST',
  'callback' => function($req) {
    $click = new ClickTracker();
    $click->record($req->get_params());
    return rest_ensure_response([
      'status' => 'tracked'
    ]);
  }
]);`,
  },
];

const matrixChars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789";

const stats = [
  { label: "Active Users", value: "100K+", icon: Database, color: "text-cyan-400" },
  { label: "Problems Solved", value: "1500+", icon: Code2, color: "text-green-400" },
  { label: "Years Exp", value: "2+", icon: Terminal, color: "text-yellow-400" },
  { label: "Plugins Built", value: "5+", icon: Braces, color: "text-purple-400" },
];

export function HeroSection() {
  const [currentSnippet, setCurrentSnippet] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  // Generate matrix rain columns
  const matrixColumns = useMemo(() => {
    return [...Array(30)].map((_, i) => ({
      id: i,
      x: (i * 3.5) % 100,
      chars: [...Array(20)].map(() => matrixChars[Math.floor(Math.random() * matrixChars.length)]),
      duration: 8 + (i % 8),
      delay: i * 0.3,
    }));
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Periodic glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 5000);
    return () => clearInterval(glitchInterval);
  }, []);

  // Code typing animation
  useEffect(() => {
    const snippet = codeSnippets[currentSnippet].code;
    let index = 0;
    setTypedText("");
    setIsTyping(true);

    const typeInterval = setInterval(() => {
      if (index < snippet.length) {
        setTypedText(snippet.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(typeInterval);
      }
    }, 25);

    return () => clearInterval(typeInterval);
  }, [currentSnippet]);

  // Auto-rotate snippets
  useEffect(() => {
    const rotateInterval = setInterval(() => {
      setCurrentSnippet((prev) => (prev + 1) % codeSnippets.length);
    }, 10000);
    return () => clearInterval(rotateInterval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      {/* Matrix rain background */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden opacity-20">
          {matrixColumns.map((col) => (
            <motion.div
              key={col.id}
              className="absolute top-0 font-mono text-xs text-primary"
              style={{ left: `${col.x}%` }}
              initial={{ y: "-100%" }}
              animate={{ y: "100%" }}
              transition={{
                duration: col.duration,
                repeat: Infinity,
                delay: col.delay,
                ease: "linear",
              }}
            >
              {col.chars.map((char, i) => (
                <div key={i} className="opacity-70">{char}</div>
              ))}
            </motion.div>
          ))}
        </div>
      )}

      {/* Animated grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(100,200,180,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(100,200,180,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      {/* Scan line effect */}
      {mounted && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(transparent 50%, rgba(0,0,0,0.1) 50%)",
            backgroundSize: "100% 4px",
          }}
        />
      )}

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* System status bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center gap-3 mb-6"
            >
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/30">
                <Activity className="w-3 h-3 text-green-400" />
                <span className="font-mono text-xs text-green-400">SYSTEM ONLINE</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30">
                <Shield className="w-3 h-3 text-primary" />
                <span className="font-mono text-xs text-primary">VERIFIED DEV</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30">
                <Zap className="w-3 h-3 text-yellow-400" />
                <span className="font-mono text-xs text-yellow-400">AVAILABLE</span>
              </div>
            </motion.div>

            {/* Glitch title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6"
            >
              <div className="font-mono text-sm text-muted-foreground mb-2">
                <span className="text-primary">$</span> whoami
              </div>
              <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight ${glitchActive ? 'animate-pulse' : ''}`}>
                <span className="relative inline-block">
                  <span className={`${glitchActive ? 'text-red-500' : 'text-primary'} text-glow transition-colors`}>
                    HMDKAMRUL
                  </span>
                  {glitchActive && (
                    <>
                      <span className="absolute top-0 left-0 text-cyan-400 opacity-70" style={{ transform: 'translate(-2px, -2px)' }}>HMDKAMRUL</span>
                      <span className="absolute top-0 left-0 text-red-400 opacity-70" style={{ transform: 'translate(2px, 2px)' }}>HMDKAMRUL</span>
                    </>
                  )}
                </span>
                <br />
                <span className="text-foreground">WORDPRESS</span>
                <br />
                <span className="text-muted-foreground">PLUGIN_DEV</span>
              </h1>
            </motion.div>

            {/* Terminal description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-card/50 rounded-lg border border-border p-4 mb-8 font-mono text-sm"
            >
              <div className="text-muted-foreground mb-2">
                <span className="text-primary">~/portfolio</span> <span className="text-yellow-400">git:(main)</span> cat about.txt
              </div>
              <p className="text-foreground/80 leading-relaxed">
                {resumeData.summary.slice(0, 180)}...
              </p>
              <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-1" />
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              <Button asChild size="lg" className="group bg-primary hover:bg-primary/90 font-mono">
                <Link href="/projects">
                  <span className="mr-2">&gt;_</span>
                  VIEW_PROJECTS
                  <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild size="lg" className="group hover:bg-primary/90 font-mono">
                <Link href="/contact">
                  <Cpu className="mr-2 w-4 h-4" />
                  INIT_CONTACT
                  <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-4"
            >
              <span className="text-xs font-mono text-muted-foreground">CONNECT://</span>
              <div className="flex gap-2">
                <motion.a
                  href={resumeData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2.5 rounded-lg bg-card border border-primary/30 hover:border-primary hover:bg-primary/10 transition-all group"
                >
                  <Github className="w-5 h-5 group-hover:text-primary transition-colors" />
                </motion.a>
                <motion.a
                  href={resumeData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2.5 rounded-lg bg-card border border-primary/30 hover:border-primary hover:bg-primary/10 transition-all group"
                >
                  <Linkedin className="w-5 h-5 group-hover:text-primary transition-colors" />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Code Editor */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-primary/5 rounded-xl blur-xl" />
            
            {/* Code Editor Window */}
            <div className="relative bg-card/90 backdrop-blur-sm rounded-xl border border-primary/30 overflow-hidden shadow-2xl shadow-primary/10">
              {/* Window Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-primary/20 bg-primary/5">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full bg-red-500 cursor-pointer" />
                    <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer" />
                    <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full bg-green-500 cursor-pointer" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Terminal className="w-3 h-3 text-primary" />
                  <span className="text-xs font-mono text-muted-foreground">
                    {codeSnippets[currentSnippet].title}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-muted-foreground">{codeSnippets[currentSnippet].lang}</span>
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                </div>
              </div>

              {/* Code Content */}
              <div className="p-4 font-mono text-sm max-h-[350px] overflow-auto">
                <div className="flex gap-4">
                  {/* Line Numbers */}
                  <div className="text-muted-foreground/30 select-none text-right pr-4 border-r border-border">
                    {typedText.split('\n').map((_, i) => (
                      <div key={i} className="leading-6">{String(i + 1).padStart(2, '0')}</div>
                    ))}
                  </div>
                  {/* Code */}
                  <pre className="flex-1 text-foreground overflow-x-auto">
                    <code className="leading-6">
                      {typedText.split('\n').map((line, lineIndex) => (
                        <div key={lineIndex}>
                          {line.split(/(\s+|[{}()[\];,]|=>|->|::|\/\/.*|\/\*|\*\/|'[^']*'|"[^"]*")/).map((part, i) => {
                            let color = "";
                            if (/^(function|return|const|let|var|if|else|new|this|true|false|null|public|private|protected|static|class|extends|implements)$/.test(part)) {
                              color = "text-purple-400";
                            } else if (/^(add_action|register_rest_route|register_post_type|useState|useEffect|rest_ensure_response)$/.test(part)) {
                              color = "text-yellow-400";
                            } else if (/^['"].*['"]$/.test(part)) {
                              color = "text-green-400";
                            } else if (/^\/\/.*$/.test(part) || /^\/\*$/.test(part) || /^\*\/$/.test(part) || /^\*.*$/.test(part)) {
                              color = "text-muted-foreground";
                            } else if (/^[{}()[\];,]$/.test(part)) {
                              color = "text-muted-foreground";
                            } else if (/^(=>|->|::)$/.test(part)) {
                              color = "text-cyan-400";
                            }
                            return <span key={i} className={color}>{part}</span>;
                          })}
                        </div>
                      ))}
                      {isTyping && <span className="text-primary animate-pulse">|</span>}
                    </code>
                  </pre>
                </div>
              </div>

              {/* Snippet Navigation */}
              <div className="flex items-center justify-between p-3 border-t border-primary/20 bg-primary/5">
                <div className="flex gap-2">
                  {codeSnippets.map((snippet, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSnippet(index)}
                      className={`px-2 py-1 rounded text-xs font-mono transition-all ${
                        currentSnippet === index
                          ? "bg-primary text-background"
                          : "text-muted-foreground hover:text-foreground hover:bg-primary/10"
                      }`}
                    >
                      {snippet.title}
                    </button>
                  ))}
                </div>
                <span className="text-xs font-mono text-muted-foreground">
                  {currentSnippet + 1}/{codeSnippets.length}
                </span>
              </div>
            </div>

            {/* Floating Stats Cards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute -bottom-4 -left-4 bg-card/95 backdrop-blur-sm rounded-lg border border-cyan-500/30 p-3 shadow-xl shadow-cyan-500/10"
            >
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded bg-cyan-500/20">
                  <Database className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <div className="text-lg font-bold text-cyan-400 font-mono">100K+</div>
                  <div className="text-[10px] text-muted-foreground font-mono">USERS</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
              className="absolute -top-4 -right-4 bg-card/95 backdrop-blur-sm rounded-lg border border-green-500/30 p-3 shadow-xl shadow-green-500/10"
            >
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded bg-green-500/20">
                  <Code2 className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <div className="text-lg font-bold text-green-400 font-mono">1500+</div>
                  <div className="text-[10px] text-muted-foreground font-mono">PROBLEMS</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-16 lg:mt-20"
        >
          <div className="bg-card/50 backdrop-blur-sm rounded-xl border border-primary/20 p-1">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ backgroundColor: "rgba(100, 200, 180, 0.05)" }}
                  className={`p-4 md:p-6 text-center transition-colors ${
                    index < stats.length - 1 ? "border-r border-primary/10" : ""
                  }`}
                >
                  <stat.icon className={`w-5 h-5 ${stat.color} mx-auto mb-2`} />
                  <div className={`text-2xl md:text-3xl font-bold font-mono ${stat.color} mb-1`}>
                    {stat.value}
                  </div>
                  <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
