"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal, Wifi, Shield, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "/", cmd: "~" },
  { name: "About", href: "/about", cmd: "usr" },
  { name: "Skills", href: "/skills", cmd: "bin" },
  { name: "Projects", href: "/projects", cmd: "src" },
  { name: "Awards", href: "/awards", cmd: "var" },
  { name: "Certificates", href: "/certificates", cmd: "etc" },
  { name: "Blog", href: "/blog", cmd: "log" },
  { name: "Contact", href: "/contact", cmd: "net" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [mounted]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-primary/20"
          : "bg-transparent"
      )}
    >
      {/* Top status bar */}
      <div className="hidden md:flex items-center justify-between px-4 py-1 bg-primary/5 border-b border-primary/10 text-xs font-mono">
        <div className="flex items-center gap-4">
          <span className="text-primary flex items-center gap-1">
            <Shield className="w-3 h-3" />
            SECURE
          </span>
          <span className="text-muted-foreground">hmdkamrul@portfolio:~$</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-muted-foreground flex items-center gap-1">
            <Activity className="w-3 h-3 text-green-400" />
            SYS: ONLINE
          </span>
          <span className="text-primary">{mounted ? currentTime : "00:00:00"}</span>
        </div>
      </div>

      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              {/* Glowing border effect */}
              <div className="absolute inset-0 bg-primary/20 rounded-lg blur-md group-hover:bg-primary/40 transition-all" />
              <div className="relative p-2 rounded-lg bg-background border border-primary/50 group-hover:border-primary transition-colors">
                <Terminal className="w-5 h-5 text-primary" />
              </div>
            </motion.div>
            <div className="hidden sm:flex flex-col">
              <div className="flex items-center gap-1">
                <span className="font-mono text-xs text-primary">&gt;_</span>
                <span className="font-bold tracking-tight">HMDKAMRUL.DEV</span>
              </div>
              <span className="text-[10px] font-mono text-muted-foreground">WordPress Plugin Developer</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center bg-card/50 rounded-lg border border-border p-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "relative px-3 py-1.5 text-sm font-medium transition-all rounded-md group flex items-center gap-1",
                      pathname === item.href
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {pathname === item.href && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-primary/10 rounded-md border border-primary/30"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1">
                      <span className="text-[10px] font-mono text-primary/50 group-hover:text-primary transition-colors">
                        /{item.cmd}
                      </span>
                      <span className="hidden lg:inline">{item.name}</span>
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
            
            {/* Status indicator */}
            <div className="ml-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/30">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-mono text-green-400">AVAILABLE</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative p-2 rounded-lg bg-card border border-primary/30"
          >
            <div className="absolute inset-0 bg-primary/10 rounded-lg blur-sm" />
            {isOpen ? <X className="relative w-5 h-5 text-primary" /> : <Menu className="relative w-5 h-5 text-primary" />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 overflow-hidden"
            >
              <div className="bg-card/90 backdrop-blur-xl rounded-xl border border-primary/20 overflow-hidden">
                {/* Mobile terminal header */}
                <div className="flex items-center gap-2 px-4 py-2 bg-primary/5 border-b border-primary/20">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">navigation.sh</span>
                </div>
                
                <div className="p-3 space-y-1">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-mono text-sm",
                          pathname === item.href
                            ? "bg-primary/10 text-primary border border-primary/30"
                            : "text-muted-foreground hover:bg-primary/5 hover:text-foreground"
                        )}
                      >
                        <span className="text-primary">$</span>
                        <span>cd /{item.cmd}</span>
                        <span className="text-muted-foreground/50"># {item.name}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
                
                {/* Mobile status */}
                <div className="px-4 py-3 border-t border-primary/20 flex items-center justify-between text-xs font-mono">
                  <span className="text-muted-foreground">STATUS:</span>
                  <span className="text-green-400 flex items-center gap-1">
                    <Wifi className="w-3 h-3" />
                    CONNECTED
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
