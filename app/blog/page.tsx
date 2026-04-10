"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animated-section";
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  ArrowRight,
  Terminal,
  Code2,
  FileCode,
  Hash,
  ChevronRight,
  Search,
  Filter,
  Database,
  Cpu,
  Zap
} from "lucide-react";
import { blogPosts } from "@/lib/blog-data";

const terminalCommands = [
  "$ cd ~/blog",
  "$ ls -la ./posts/",
  "[INFO] Found 4 articles",
  "[LOAD] Rendering posts...",
  "[OK] Blog initialized"
];

const categories = ["All", "WordPress", "API Development", "Performance", "Problem Solving", "AI", "Architecture"];

export default function BlogPage() {
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [glitchTitle, setGlitchTitle] = useState(false);

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
    
    // Glitch effect interval
    const glitchInterval = setInterval(() => {
      setGlitchTitle(true);
      setTimeout(() => setGlitchTitle(false), 200);
    }, 5000);
    
    return () => {
      clearInterval(interval);
      clearInterval(glitchInterval);
    };
  }, []);

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(100,200,180,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(100,200,180,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        
        {/* Floating Binary */}
        {mounted && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute font-mono text-primary/5 text-6xl font-bold select-none"
                style={{
                  left: `${(i * 7) % 100}%`,
                  top: `${(i * 13) % 100}%`,
                }}
              >
                {i % 2 === 0 ? "0" : "1"}
              </div>
            ))}
          </div>
        )}
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Main Header */}
          <div className="text-center mb-12">
            {/* Glitch Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative inline-block mb-4"
            >
              <h1 className={`text-5xl md:text-7xl font-bold font-mono tracking-tighter ${glitchTitle ? 'text-red-500' : ''}`}>
                <span className="text-primary">&lt;</span>
                BLOG
                <span className="text-primary">/&gt;</span>
              </h1>
              
              {/* Glitch layers */}
              {glitchTitle && (
                <>
                  <h1 className="absolute top-0 left-0 text-5xl md:text-7xl font-bold font-mono tracking-tighter text-cyan-500 opacity-70" style={{ transform: 'translate(-2px, -2px)' }}>
                    <span className="text-primary">&lt;</span>
                    BLOG
                    <span className="text-primary">/&gt;</span>
                  </h1>
                  <h1 className="absolute top-0 left-0 text-5xl md:text-7xl font-bold font-mono tracking-tighter text-red-500 opacity-70" style={{ transform: 'translate(2px, 2px)' }}>
                    <span className="text-primary">&lt;</span>
                    BLOG
                    <span className="text-primary">/&gt;</span>
                  </h1>
                </>
              )}
            </motion.div>
            
            {/* Subtitle with typing effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-2 text-muted-foreground font-mono text-sm md:text-base"
            >
              <Terminal className="w-4 h-4 text-primary" />
              <span className="text-primary">$</span>
              <span>echo</span>
              <span className="text-green-400">&quot;Technical writings from the terminal&quot;</span>
            </motion.div>
            
            {/* Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-6 mt-6 text-xs font-mono"
            >
              <div className="flex items-center gap-2 px-3 py-1.5 bg-card/50 border border-border rounded">
                <Database className="w-3 h-3 text-primary" />
                <span className="text-muted-foreground">{blogPosts.length} posts</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-card/50 border border-border rounded">
                <Cpu className="w-3 h-3 text-yellow-400" />
                <span className="text-muted-foreground">{categories.length - 1} categories</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-card/50 border border-border rounded">
                <Zap className="w-3 h-3 text-green-400" />
                <span className="text-muted-foreground">live</span>
              </div>
            </motion.div>
          </div>

          {/* Terminal Window */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="bg-card/80 backdrop-blur-sm rounded-lg border border-border overflow-hidden shadow-2xl shadow-primary/5">
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-muted/50 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-pointer" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors cursor-pointer" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors cursor-pointer" />
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">blog@HMDKAMRUL:~/posts</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="font-mono text-[10px] text-muted-foreground">CONNECTED</span>
                </div>
              </div>
              
              {/* Terminal Content */}
              <div className="p-4 font-mono text-sm min-h-[140px]">
                {terminalOutput.map((line, index) => {
                  if (!line) return null;
                  const colorClass = 
                    line.startsWith("$") ? "text-primary" : 
                    line.includes("[OK]") ? "text-green-400" :
                    line.includes("[INFO]") ? "text-blue-400" :
                    line.includes("[LOAD]") ? "text-yellow-400" :
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

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            {/* Search Bar */}
            <div className="relative mb-6">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <Search className="w-4 h-4 text-primary" />
                <span className="text-primary font-mono text-sm hidden sm:inline">grep</span>
              </div>
              <input
                type="text"
                placeholder='search posts...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 sm:pl-20 pr-4 py-3 bg-card/50 border border-border rounded-lg font-mono text-sm focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <kbd className="hidden sm:inline-block px-2 py-1 text-[10px] font-mono bg-muted rounded border border-border text-muted-foreground">
                  Ctrl+K
                </kbd>
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex items-center gap-3 flex-wrap justify-center">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Filter className="w-4 h-4" />
                <span className="font-mono text-sm hidden sm:inline">filter:</span>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-3 py-1.5 rounded-md font-mono text-xs transition-all ${
                      activeCategory === category
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                        : "bg-card/50 border border-border text-muted-foreground hover:border-primary/50 hover:text-primary"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      <AnimatedSection className="pb-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-primary/10 border border-primary/30">
              <Zap className="w-4 h-4 text-primary" />
              <span className="font-mono text-sm text-primary">featured.md</span>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
          </div>

          <Link href={`/blog/${blogPosts[0].slug}`}>
            <motion.div
              whileHover={{ scale: 1.002 }}
              className="relative bg-card/50 backdrop-blur-sm rounded-lg border border-border overflow-hidden group cursor-pointer hover:border-primary/50 transition-all"
            >
              {/* Corner Decorations */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-primary/50 rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-primary/50 rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-primary/50 rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-primary/50 rounded-br-lg" />

              {/* Glow Effect on Hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="p-6 md:p-8">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-8">
                  {/* Code Block Visual */}
                  <div className="hidden lg:block w-72 flex-shrink-0">
                    <div className="bg-muted/50 rounded-lg border border-border overflow-hidden">
                      <div className="flex items-center gap-2 px-3 py-2 bg-muted/30 border-b border-border">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 rounded-full bg-red-500/60" />
                          <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                          <div className="w-2 h-2 rounded-full bg-green-500/60" />
                        </div>
                        <span className="font-mono text-[10px] text-muted-foreground">featured_post.php</span>
                      </div>
                      <div className="p-4 font-mono text-xs">
                        <div className="text-primary">{"<?php"}</div>
                        <div className="text-muted-foreground pl-2">$post = [</div>
                        <div className="text-green-400 pl-4">&apos;status&apos; =&gt; &apos;featured&apos;,</div>
                        <div className="text-yellow-400 pl-4">&apos;views&apos; =&gt; 10000+,</div>
                        <div className="text-blue-400 pl-4">&apos;rating&apos; =&gt; 5.0,</div>
                        <div className="text-purple-400 pl-4">&apos;hot&apos; =&gt; true</div>
                        <div className="text-muted-foreground pl-2">];</div>
                        <div className="text-primary">{"?>"}</div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-4 text-sm text-muted-foreground font-mono">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(blogPosts[0].date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </span>
                      <span className="text-primary/50">|</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {blogPosts[0].readTime}
                      </span>
                      <span className="text-primary/50">|</span>
                      <span className="px-2 py-0.5 bg-primary/20 text-primary rounded text-xs border border-primary/30">
                        {blogPosts[0].category}
                      </span>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                      <span className="text-primary font-mono">$ </span>
                      {blogPosts[0].title}
                    </h2>

                    <p className="text-muted-foreground leading-relaxed mb-6 font-mono text-sm">
                      <span className="text-primary">&gt;</span> {blogPosts[0].excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {blogPosts[0].tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-2 py-1 text-xs font-mono bg-muted/50 rounded border border-border text-muted-foreground hover:border-primary/50 transition-colors"
                        >
                          <Hash className="w-3 h-3 text-primary/50" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-lg text-primary font-mono text-sm group-hover:bg-primary/20 transition-all">
                      <FileCode className="w-4 h-4" />
                      <span>cat article.md</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        </div>
      </AnimatedSection>

      {/* Blog Posts Grid */}
      <AnimatedSection className="py-12">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-8">
            <Code2 className="w-5 h-5 text-primary" />
            <h2 className="font-mono text-sm md:text-base">
              <span className="text-muted-foreground">ls -la </span>
              <span className="text-primary">./posts/</span>
              <span className="text-muted-foreground"> | grep </span>
              <span className="text-green-400">&quot;{activeCategory === "All" ? "*" : activeCategory}&quot;</span>
            </h2>
            <div className="hidden sm:block h-px flex-1 bg-gradient-to-r from-border to-transparent" />
            <span className="text-muted-foreground font-mono text-xs px-2 py-1 bg-card/50 border border-border rounded">
              {filteredPosts.length} results
            </span>
          </div>

          {filteredPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="inline-block p-8 rounded-lg bg-card/50 border border-border">
                <Terminal className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                <p className="font-mono text-lg text-muted-foreground mb-2">
                  $ grep: no matches found
                </p>
                <p className="font-mono text-sm text-muted-foreground/50">
                  Try a different search term or category
                </p>
              </div>
            </motion.div>
          ) : (
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, index) => (
                <StaggerItem key={post.id}>
                  <Link href={`/blog/${post.slug}`}>
                    <motion.article
                      whileHover={{ y: -4 }}
                      className="h-full bg-card/50 backdrop-blur-sm rounded-lg border border-border overflow-hidden hover:border-primary/50 transition-all group cursor-pointer"
                    >
                      {/* Terminal Header */}
                      <div className="flex items-center justify-between px-4 py-2.5 bg-muted/30 border-b border-border">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 rounded-full bg-red-500/60" />
                            <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                            <div className="w-2 h-2 rounded-full bg-green-500/60" />
                          </div>
                          <span className="font-mono text-[10px] text-muted-foreground">
                            {post.slug}.md
                          </span>
                        </div>
                        <span className="font-mono text-[10px] text-primary/50">
                          #{String(index + 1).padStart(2, '0')}
                        </span>
                      </div>

                      {/* Post Content */}
                      <div className="p-5">
                        <div className="flex items-center justify-between mb-3">
                          <span className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider bg-primary/10 text-primary rounded border border-primary/20">
                            {post.category}
                          </span>
                          <span className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                          </span>
                        </div>

                        <h3 className="font-semibold text-base mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                          {post.title}
                        </h3>

                        <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-3 font-mono">
                          <span className="text-primary/50">//</span> {post.excerpt}
                        </p>
                        
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-1.5 py-0.5 text-[10px] font-mono bg-muted/50 rounded border border-border text-muted-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                          {post.tags.length > 3 && (
                            <span className="px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
                              +{post.tags.length - 3}
                            </span>
                          )}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-3 border-t border-border">
                          <span className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            {new Date(post.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric'
                            })}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-primary font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                            read
                            <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </motion.article>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </div>
      </AnimatedSection>

      {/* Newsletter Section */}
      <AnimatedSection className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-card/50 backdrop-blur-sm rounded-lg border border-border overflow-hidden">
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-muted/30 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">subscribe.sh</span>
                </div>
                <BookOpen className="w-4 h-4 text-primary" />
              </div>

              <div className="p-6 md:p-8">
                <div className="font-mono text-sm mb-6">
                  <p className="text-muted-foreground mb-1">
                    <span className="text-primary">#</span> Subscribe to the newsletter
                  </p>
                  <p className="text-muted-foreground mb-4">
                    <span className="text-primary">#</span> Get notified about new posts
                  </p>
                  <div className="text-primary">./subscribe.sh --email=</div>
                </div>

                <form className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1 px-4 py-3 bg-muted/50 border border-border rounded-lg font-mono text-sm focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-mono text-sm font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                  >
                    $ subscribe
                  </button>
                </form>

                <p className="mt-4 font-mono text-xs text-muted-foreground text-center">
                  <span className="text-green-400">[OK]</span> No spam. Unsubscribe anytime.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      <Footer />
    </main>
  );
}
