"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Trophy,
  Medal,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Star,
  Crown,
  Zap,
  Award,
  ArrowRight,
  Github,
  Linkedin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Codepen,
} from "lucide-react";

const socialItems = [
  { key: "facebook", Icon: Facebook, label: "Facebook", color: "hover:text-blue-500 hover:border-blue-500/60 hover:bg-blue-500/10" },
  { key: "linkedin", Icon: Linkedin, label: "LinkedIn", color: "hover:text-sky-400 hover:border-sky-400/60 hover:bg-sky-400/10" },
  { key: "twitter", Icon: Twitter, label: "Twitter / X", color: "hover:text-cyan-300 hover:border-cyan-300/60 hover:bg-cyan-300/10" },
  { key: "instagram", Icon: Instagram, label: "Instagram", color: "hover:text-pink-500 hover:border-pink-500/60 hover:bg-pink-500/10" },
  { key: "github", Icon: Github, label: "GitHub", color: "hover:text-foreground hover:border-foreground/60 hover:bg-foreground/10" },
  { key: "codepen", Icon: Codepen, label: "CodePen", color: "hover:text-yellow-400 hover:border-yellow-400/60 hover:bg-yellow-400/10" },
  { key: "youtube", Icon: Youtube, label: "YouTube", color: "hover:text-red-500 hover:border-red-500/60 hover:bg-red-500/10" },
] as const;
import { resumeData } from "@/lib/resume-data";
import { Button } from "@/components/ui/button";

const rotatingHeadlines = [
  "AWARD-WINNING ENGINEER",
  "AI INNOVATION CHAMPION",
  "COMPETITIVE PROGRAMMER",
  "PROBLEM SOLVER",
];

const achievementStats = [
  { label: "Awards", value: "4+", icon: Trophy, color: "text-yellow-400" },
  { label: "Problems", value: "1500+", icon: Zap, color: "text-cyan-400" },
  { label: "Years Exp", value: "2+", icon: Star, color: "text-purple-400" },
];

function getStickerInfo(award: { title: string; description: string }) {
  const text = `${award.title} ${award.description}`;
  const yearMatch = text.match(/20\d{2}/);
  const year = yearMatch ? yearMatch[0] : "";

  if (/startise|ai innovation/i.test(text)) {
    return { label: "AI Award", year, Icon: Crown };
  }
  if (/1st\s*runner.?up/i.test(text)) {
    return { label: "1st Runner-Up", year, Icon: Trophy };
  }
  if (/2nd\s*runner.?up/i.test(text)) {
    return { label: "2nd Runner-Up", year, Icon: Medal };
  }
  if (/3rd\s*runner.?up/i.test(text)) {
    return { label: "3rd Runner-Up", year, Icon: Medal };
  }
  if (/winner|champion/i.test(text)) {
    return { label: "Winner", year, Icon: Trophy };
  }
  return { label: "Honored", year, Icon: Award };
}

export function AwardsHeroSection() {
  const awards = resumeData.awards_slider;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [glitchActive, setGlitchActive] = useState(false);

  // Confetti / sparkle particles
  const particles = useMemo(() => {
    return [...Array(40)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 3,
      duration: 4 + Math.random() * 6,
      delay: Math.random() * 5,
      color: ["#fbbf24", "#22d3ee", "#a78bfa", "#f472b6"][i % 4],
    }));
  }, []);

  // Light rays
  const rays = useMemo(() => {
    return [...Array(6)].map((_, i) => ({
      id: i,
      rotate: -30 + i * 12,
      delay: i * 0.3,
    }));
  }, []);

  useEffect(() => setMounted(true), []);

  // Rotate headline
  useEffect(() => {
    const interval = setInterval(() => {
      setHeadlineIndex((p) => (p + 1) % rotatingHeadlines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Glitch
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Auto slide
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setCurrentSlide((p) => (p + 1) % awards.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isAutoPlay, awards.length]);

  const goPrev = () =>
    setCurrentSlide((p) => (p - 1 + awards.length) % awards.length);
  const goNext = () => setCurrentSlide((p) => (p + 1) % awards.length);

  const current = awards[currentSlide];
  const isStartise = current.title.toLowerCase().includes("startise");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* === BACKGROUND LAYERS === */}
      {/* Deep gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.08),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(100,200,180,0.1),transparent_60%)]" />

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(100,200,180,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(100,200,180,0.04)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* Confetti particles */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                background: p.color,
                boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      {/* Floating trophies */}
      {mounted && (
        <>
          <motion.div
            className="absolute top-32 left-8 lg:left-16 text-yellow-400/15"
            animate={{ y: [0, -20, 0], rotate: [0, 8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <Trophy className="w-20 h-20 lg:w-28 lg:h-28" />
          </motion.div>
          <motion.div
            className="absolute bottom-24 right-8 lg:right-20 text-primary/15"
            animate={{ y: [0, 20, 0], rotate: [0, -8, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <Medal className="w-24 h-24 lg:w-32 lg:h-32" />
          </motion.div>
          <motion.div
            className="absolute top-1/2 left-1/3 text-purple-400/10"
            animate={{ y: [0, -15, 0], rotate: [0, 12, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          >
            <Crown className="w-16 h-16" />
          </motion.div>
        </>
      )}

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* === LEFT: IDENTITY & COPY === */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 order-2 lg:order-1"
          >
            {/* Top status pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="flex flex-wrap items-center gap-2 mb-6"
            >
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/40 backdrop-blur-sm">
                <Trophy className="w-3 h-3 text-yellow-400" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-yellow-300">
                  Award Winner
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/40 backdrop-blur-sm">
                <Sparkles className="w-3 h-3 text-primary" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
                  AI Award 2025
                </span>
              </div>
            </motion.div>

            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="font-mono text-sm text-muted-foreground mb-3"
            >
              <span className="text-primary">$</span> hello.world —{" "}
              <span className="text-yellow-400">I am</span>
            </motion.div>

            {/* Massive name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.95] mb-4 tracking-tight"
            >
              <span className="block relative">
                <span
                  className={`bg-gradient-to-r from-primary via-cyan-300 to-primary bg-clip-text text-transparent ${
                    glitchActive ? "animate-pulse" : ""
                  }`}
                  style={{
                    textShadow: "0 0 40px rgba(100,200,180,0.3)",
                  }}
                >
                  HMD
                </span>
                {glitchActive && (
                  <span
                    className="absolute top-0 left-0 text-yellow-400 opacity-50"
                    style={{ transform: "translate(2px, -1px)" }}
                    aria-hidden
                  >
                    HMD
                  </span>
                )}
              </span>
              <span className="block relative">
                <span
                  className="bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-600 bg-clip-text text-transparent"
                  style={{
                    textShadow: "0 0 40px rgba(251,191,36,0.3)",
                  }}
                >
                  KAMRUL
                </span>
              </span>
            </motion.h1>

            {/* Rotating headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="h-10 md:h-12 mb-6 overflow-hidden flex items-center"
            >
              <div className="flex items-center gap-3">
                <div className="h-px w-10 bg-gradient-to-r from-yellow-400 to-transparent" />
                <AnimatePresence mode="wait">
                  <motion.span
                    key={headlineIndex}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -30, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="font-mono text-lg md:text-xl font-bold uppercase tracking-wider text-foreground"
                  >
                    {rotatingHeadlines[headlineIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Tagline / current award caption */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-8"
            >
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4 max-w-xl">
                Building production software that{" "}
                <span className="text-primary font-semibold">millions use</span>
                , solving{" "}
                <span className="text-cyan-400 font-semibold">1500+</span>{" "}
                competitive problems, and now winning{" "}
                <span className="text-yellow-400 font-semibold">
                  AI innovation
                </span>{" "}
                challenges.
              </p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4 }}
                  className="flex items-start gap-3 p-3 rounded-lg bg-card/40 backdrop-blur-sm border-l-2 border-yellow-400"
                >
                  <Award className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-mono uppercase tracking-widest text-yellow-400 mb-1">
                      {isStartise ? "Latest · 2025" : "Featured Award"}
                    </div>
                    <div className="text-sm md:text-base font-semibold text-foreground">
                      {current.title}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-3 mb-8"
            >
              {achievementStats.map((s) => (
                <div
                  key={s.label}
                  className="bg-card/40 backdrop-blur-sm rounded-lg border border-border p-3 text-center hover:border-primary/50 transition-colors"
                >
                  <s.icon className={`w-4 h-4 ${s.color} mx-auto mb-1.5`} />
                  <div
                    className={`text-xl md:text-2xl font-black font-mono ${s.color}`}
                  >
                    {s.value}
                  </div>
                  <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-3 mb-6"
            >
              <Button
                asChild
                size="lg"
                className="group bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-background font-mono font-bold shadow-lg shadow-yellow-500/30"
              >
                <Link href="/awards">
                  <Trophy className="mr-2 w-4 h-4" />
                  VIEW ALL AWARDS
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="group font-mono border-primary/40 hover:bg-primary/10"
              >
                <Link href="/contact">
                  <span className="mr-2">&gt;_</span>
                  HIRE ME
                </Link>
              </Button>
            </motion.div>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col gap-3"
            >
              <span className="text-xs font-mono text-muted-foreground">
                FOLLOW://
              </span>
              <div className="flex flex-wrap items-center gap-2.5">
                {socialItems.map(({ key, Icon, label, color }, i) => {
                  const href =
                    resumeData.socialLinks[
                      key as keyof typeof resumeData.socialLinks
                    ];
                  if (!href) return null;
                  return (
                    <motion.a
                      key={key}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      title={label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.85 + i * 0.05 }}
                      whileHover={{ scale: 1.12, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center justify-center w-11 h-11 rounded-full bg-card/60 backdrop-blur-sm border border-border text-muted-foreground transition-colors ${color}`}
                    >
                      <Icon className="w-[18px] h-[18px]" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* === RIGHT: AWARD SHOWCASE === */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-7 order-1 lg:order-2 relative"
            onMouseEnter={() => setIsAutoPlay(false)}
            onMouseLeave={() => setIsAutoPlay(true)}
          >
            {/* Outer glow halo */}
            <div className="absolute -inset-8 bg-gradient-to-tr from-yellow-500/20 via-primary/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />

            {/* Spotlight light rays */}
            {mounted && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none overflow-hidden rounded-2xl">
                {rays.map((r) => (
                  <motion.div
                    key={r.id}
                    className="absolute top-1/2 left-1/2 origin-top"
                    style={{
                      width: "2px",
                      height: "150%",
                      transform: `translate(-50%, -10%) rotate(${r.rotate}deg)`,
                      background:
                        "linear-gradient(to bottom, rgba(251,191,36,0.4), transparent)",
                    }}
                    animate={{ opacity: [0.2, 0.6, 0.2] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: r.delay,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            )}

            {/* Main showcase frame */}
            <div className="relative">
              {/* Decorative gold corners */}
              <div className="absolute -top-2 -left-2 w-12 h-12 border-t-2 border-l-2 border-yellow-400/60 rounded-tl-2xl" />
              <div className="absolute -top-2 -right-2 w-12 h-12 border-t-2 border-r-2 border-yellow-400/60 rounded-tr-2xl" />
              <div className="absolute -bottom-2 -left-2 w-12 h-12 border-b-2 border-l-2 border-yellow-400/60 rounded-bl-2xl" />
              <div className="absolute -bottom-2 -right-2 w-12 h-12 border-b-2 border-r-2 border-yellow-400/60 rounded-br-2xl" />

              <div className="relative bg-gradient-to-br from-card/90 via-card/80 to-card/90 backdrop-blur-xl rounded-2xl border border-yellow-500/20 overflow-hidden shadow-2xl shadow-yellow-500/10">
                {/* Top header bar */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-yellow-500/20 bg-gradient-to-r from-yellow-500/5 via-transparent to-primary/5">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-yellow-400" />
                    <span className="font-mono text-xs uppercase tracking-widest text-yellow-400 font-bold">
                      Hall of Fame
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono">
                    <span className="text-yellow-400 font-bold text-base">
                      {String(currentSlide + 1).padStart(2, "0")}
                    </span>
                    <span className="text-muted-foreground">/</span>
                    <span className="text-muted-foreground">
                      {String(awards.length).padStart(2, "0")}
                    </span>
                    <span
                      className={`w-2 h-2 rounded-full ml-2 ${
                        isAutoPlay
                          ? "bg-green-500 animate-pulse"
                          : "bg-yellow-500"
                      }`}
                    />
                  </div>
                </div>

                {/* Image stage */}
                <div className="relative aspect-[16/11] bg-gradient-to-br from-yellow-500/5 via-background to-primary/5 overflow-hidden">
                  {/* Top spotlight cone */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-full bg-gradient-to-b from-yellow-300/20 via-yellow-300/5 to-transparent pointer-events-none" />

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                      transition={{ duration: 0.7 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={current.image_url}
                        alt={current.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-contain p-6"
                        priority={currentSlide === 0}
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Vignette */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)",
                    }}
                  />

                  {/* Scan lines */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-20"
                    style={{
                      background:
                        "linear-gradient(transparent 50%, rgba(0,0,0,0.15) 50%)",
                      backgroundSize: "100% 4px",
                    }}
                  />

                  {/* Top-left winner badge */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`badge-${currentSlide}`}
                      initial={{ x: -40, opacity: 0, rotate: -10 }}
                      animate={{ x: 0, opacity: 1, rotate: 0 }}
                      exit={{ x: -40, opacity: 0 }}
                      transition={{ delay: 0.2 }}
                      className="absolute top-5 left-5 z-10"
                    >
                      <div
                        className={`flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md border-2 font-mono text-xs font-bold shadow-2xl ${
                          isStartise
                            ? "bg-gradient-to-r from-yellow-500/30 to-amber-500/30 border-yellow-400 text-yellow-300"
                            : "bg-gradient-to-r from-primary/30 to-cyan-500/30 border-primary text-primary"
                        }`}
                      >
                        {isStartise ? (
                          <Crown className="w-4 h-4" />
                        ) : (
                          <Trophy className="w-4 h-4" />
                        )}
                        {isStartise ? "AI CHAMPION" : "WINNER"}
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Bottom-right gold seal */}
                  <motion.div
                    className="absolute bottom-5 right-5 z-10"
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 30,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <div className="relative w-16 h-16 lg:w-20 lg:h-20">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 opacity-90 shadow-2xl shadow-yellow-500/50" />
                      <div className="absolute inset-1 rounded-full border-2 border-yellow-200/60" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Star
                          className="w-6 h-6 lg:w-8 lg:h-8 text-yellow-100 fill-yellow-100"
                          style={{ filter: "drop-shadow(0 0 4px rgba(0,0,0,0.4))" }}
                        />
                      </div>
                    </div>
                  </motion.div>

                  {/* Nav arrows */}
                  <button
                    onClick={goPrev}
                    aria-label="Previous award"
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-background/70 backdrop-blur-md border border-yellow-500/30 hover:bg-yellow-500 hover:text-background transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={goNext}
                    aria-label="Next award"
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-background/70 backdrop-blur-md border border-yellow-500/30 hover:bg-yellow-500 hover:text-background transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Auto-play progress */}
                  {isAutoPlay && (
                    <motion.div
                      key={currentSlide}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 5.5, ease: "linear" }}
                      className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 shadow-lg shadow-yellow-500/50"
                    />
                  )}
                </div>

                {/* Caption + thumbnail strip */}
                <div className="p-4 lg:p-5 bg-gradient-to-r from-yellow-500/5 via-transparent to-primary/5 border-t border-yellow-500/20">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`caption-${currentSlide}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4 }}
                      className="mb-4"
                    >
                      <h3 className="text-lg lg:text-xl font-bold text-foreground leading-tight mb-1">
                        {current.title}
                      </h3>
                      <p className="text-sm text-muted-foreground font-mono">
                        {current.description}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  {/* Thumbnails */}
                  <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                    {awards.map((a, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentSlide(i)}
                        className={`relative shrink-0 w-20 h-14 rounded-md overflow-hidden border-2 transition-all ${
                          i === currentSlide
                            ? "border-yellow-400 shadow-lg shadow-yellow-500/40 scale-105"
                            : "border-border opacity-50 hover:opacity-100"
                        }`}
                        aria-label={a.title}
                      >
                        <Image
                          src={a.image_url}
                          alt={a.title}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                        {i === currentSlide && (
                          <div className="absolute inset-0 bg-yellow-400/20 flex items-center justify-center">
                            <Trophy className="w-4 h-4 text-yellow-300 drop-shadow-lg" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating accent: dynamic award sticker */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`sticker-${currentSlide}`}
                initial={{ opacity: 0, scale: 0, rotate: -20 }}
                animate={{ opacity: 1, scale: 1, rotate: -8 }}
                exit={{ opacity: 0, scale: 0.6, rotate: 10 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 220 }}
                className="absolute -top-4 -right-2 lg:-right-6 z-20"
              >
                {(() => {
                  const { label, year, Icon } = getStickerInfo(current);
                  return (
                    <div className="bg-gradient-to-br from-yellow-400 to-amber-600 text-background font-black px-4 py-2 rounded-lg shadow-2xl shadow-yellow-500/50 border-2 border-yellow-200 font-mono text-xs uppercase tracking-wider">
                      <div className="flex items-center gap-1.5">
                        <Icon className="w-4 h-4" />
                        <span>
                          {label}
                          {year && (
                            <span className="ml-1 opacity-90">{year}</span>
                          )}
                        </span>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Bottom scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border-2 border-muted-foreground/40 flex justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 bg-primary rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
