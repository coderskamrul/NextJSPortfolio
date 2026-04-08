"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink, Users, Puzzle, ArrowRight, Terminal, Code, GitBranch, Zap } from "lucide-react";
import { resumeData } from "@/lib/resume-data";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animated-section";
import { Button } from "@/components/ui/button";

export function FeaturedPlugins() {
  const featuredPlugins = resumeData.plugins.slice(0, 4);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <AnimatedSection className="py-20 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(100,200,180,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(100,200,180,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header - Terminal Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="bg-card/50 backdrop-blur-sm rounded-xl border border-primary/20 overflow-hidden max-w-2xl">
            {/* Terminal header */}
            <div className="flex items-center justify-between px-4 py-2 bg-primary/5 border-b border-primary/20">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                </div>
                <span className="text-xs font-mono text-muted-foreground ml-2">plugins.sh</span>
              </div>
              <div className="flex items-center gap-2">
                <GitBranch className="w-3 h-3 text-primary" />
                <span className="text-xs font-mono text-primary">main</span>
              </div>
            </div>
            
            {/* Terminal content */}
            <div className="p-4 font-mono text-sm">
              <div className="text-muted-foreground">
                <span className="text-primary">$</span> ls -la ./wordpress/plugins/
              </div>
              <div className="text-green-400 mt-1">[OK] Found {featuredPlugins.length} featured plugins</div>
              <div className="text-muted-foreground mt-1">
                <span className="text-primary">$</span> cat description.txt
              </div>
              <div className="text-foreground/80 mt-2">
                Contributing to plugins that power thousands of websites worldwide, with a focus on performance and scalability.
              </div>
            </div>
          </div>
        </motion.div>

        {/* Title and CTA */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-mono mb-2">
              <span className="text-primary">&lt;</span>
              FEATURED_PLUGINS
              <span className="text-primary">/&gt;</span>
            </h2>
            <p className="text-muted-foreground font-mono text-sm">
              // Total active users: <span className="text-primary">100,000+</span>
            </p>
          </div>
          <Button asChild variant="outline" className="border-primary/30 hover:bg-primary/10 font-mono">
            <Link href="/projects" className="group">
              <Terminal className="mr-2 w-4 h-4" />
              VIEW_ALL
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        {/* Plugins Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredPlugins.map((plugin, index) => (
            <StaggerItem key={plugin.name}>
              <motion.div
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="group relative h-full"
              >
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 bg-primary/5 rounded-xl blur-xl transition-opacity duration-300 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`} />
                
                <div className="relative h-full bg-card/50 backdrop-blur-sm rounded-xl border border-primary/20 overflow-hidden hover:border-primary/50 transition-all">
                  {/* Plugin Header - Terminal style */}
                  <div className="flex items-center justify-between px-4 py-2 bg-primary/5 border-b border-primary/20">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-red-500/80" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
                        <div className="w-2 h-2 rounded-full bg-green-500/80" />
                      </div>
                      <span className="text-xs font-mono text-muted-foreground ml-2">
                        {plugin.name.toLowerCase().replace(/\s+/g, '-')}.php
                      </span>
                    </div>
                    <span className={`px-2 py-0.5 text-[10px] font-mono rounded ${
                      plugin.type === "personal" 
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                    }`}>
                      {plugin.type === "personal" ? "PERSONAL" : "CONTRIB"}
                    </span>
                  </div>

                  {/* Plugin Content */}
                  <div className="p-5">
                    {/* Plugin name and stats */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10 border border-primary/30">
                          <Puzzle className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                            {plugin.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1 text-xs font-mono">
                            <Users className="w-3 h-3 text-green-400" />
                            <span className="text-green-400">{plugin.installs}</span>
                            <span className="text-muted-foreground">active installs</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Description in terminal style */}
                    <div className="bg-background/50 rounded-lg p-3 mb-4 font-mono text-xs">
                      <div className="text-muted-foreground mb-1">
                        <span className="text-primary">$</span> echo $DESCRIPTION
                      </div>
                      <p className="text-foreground/80 leading-relaxed">
                        {plugin.description}
                      </p>
                    </div>
                    
                    {/* Action button */}
                    <motion.a
                      href={plugin.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-primary/10 border border-primary/30 text-primary text-sm font-mono hover:bg-primary/20 transition-colors"
                    >
                      <Code className="w-4 h-4" />
                      VIEW_ON_WORDPRESS
                      <ExternalLink className="w-3 h-3" />
                    </motion.a>
                  </div>

                  {/* Corner decoration */}
                  <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                    <div className="absolute top-0 right-0 w-px h-8 bg-gradient-to-b from-primary/50 to-transparent" />
                    <div className="absolute top-0 right-0 w-8 h-px bg-gradient-to-l from-primary/50 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 overflow-hidden">
                    <div className="absolute bottom-0 left-0 w-px h-8 bg-gradient-to-t from-primary/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 w-8 h-px bg-gradient-to-r from-primary/50 to-transparent" />
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Bottom stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm font-mono"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card/50 border border-border">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-muted-foreground">Total Installs:</span>
            <span className="text-yellow-400 font-bold">100K+</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card/50 border border-border">
            <Code className="w-4 h-4 text-green-400" />
            <span className="text-muted-foreground">Active Projects:</span>
            <span className="text-green-400 font-bold">5+</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card/50 border border-border">
            <GitBranch className="w-4 h-4 text-cyan-400" />
            <span className="text-muted-foreground">Contributions:</span>
            <span className="text-cyan-400 font-bold">3+</span>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
