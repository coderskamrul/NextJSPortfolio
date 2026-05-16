"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ExternalLink,
  Github,
  ArrowRight,
  Terminal,
  Code,
  GitBranch,
  Zap,
  FolderGit2,
  Layers,
} from "lucide-react";
import { resumeData } from "@/lib/resume-data";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/animated-section";
import {
  TiltCard,
  CountUp,
  TextReveal,
  ParallaxY,
} from "@/components/scroll/scroll-primitives";
import { Button } from "@/components/ui/button";

export function FeaturedProjects() {
  const featuredProjects = resumeData.projects.slice(0, 3);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <AnimatedSection className="py-20 relative overflow-hidden">
      <ParallaxY offset={60} className="absolute inset-0 -z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(100,200,180,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(100,200,180,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </ParallaxY>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="bg-card/50 backdrop-blur-sm rounded-xl border border-primary/20 overflow-hidden max-w-2xl m-auto">
            <div className="flex items-center justify-between px-4 py-2 bg-primary/5 border-b border-primary/20">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                </div>
                <span className="text-xs font-mono text-muted-foreground ml-2">
                  projects.sh
                </span>
              </div>
              <div className="flex items-center gap-2">
                <GitBranch className="w-3 h-3 text-primary" />
                <span className="text-xs font-mono text-primary">main</span>
              </div>
            </div>

            <div className="p-4 font-mono text-sm m-auto">
              <div className="text-muted-foreground">
                <span className="text-primary">$</span> ls -la ./projects/featured/
              </div>
              <div className="text-green-400 mt-1">
                [OK] Found {featuredProjects.length} featured projects
              </div>
              <div className="text-muted-foreground mt-1">
                <span className="text-primary">$</span> cat description.txt
              </div>
              <div className="text-foreground/80 mt-2">
                Shipping production-grade full-stack applications with React, Next.js,
                Node.js, and MongoDB — focused on UX, performance, and clean architecture.
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-mono mb-2">
              <span className="text-primary">&lt;</span>
              <TextReveal text="FEATURED_PROJECTS" className="inline-block" />
              <span className="text-primary">/&gt;</span>
            </h2>
            <p className="text-muted-foreground font-mono text-sm">
              // Production-grade builds: <span className="text-primary">React · Next.js · Node.js</span>
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="border-primary/30 hover:bg-primary/10 font-mono"
          >
            <Link href="/projects" className="group">
              <Terminal className="mr-2 w-4 h-4" />
              VIEW_ALL
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project, index) => (
            <StaggerItem key={project.id}>
              <TiltCard intensity={6} className="h-full">
                <motion.div
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  className="group relative h-full"
                >
                  <div
                    className={`absolute inset-0 bg-primary/5 rounded-xl blur-xl transition-opacity duration-300 ${
                      hoveredIndex === index ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  <div className="relative h-full bg-card/50 backdrop-blur-sm rounded-xl border border-primary/20 overflow-hidden hover:border-primary/50 transition-all">
                    <div className="flex items-center justify-between px-4 py-2 bg-primary/5 border-b border-primary/20">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-red-500/80" />
                          <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
                          <div className="w-2 h-2 rounded-full bg-green-500/80" />
                        </div>
                        <span className="text-xs font-mono text-muted-foreground ml-2">
                          {project.title.toLowerCase().replace(/\s+/g, "-")}.tsx
                        </span>
                      </div>
                      <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                        {project.category.toUpperCase()}
                      </span>
                    </div>

                    {project.banner && (
                      <div className="relative aspect-video bg-muted overflow-hidden border-b border-primary/20">
                        <Image
                          src={project.banner}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/20 to-transparent" />
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100"
                          initial={{ y: "-100%" }}
                          whileHover={{ y: "100%" }}
                          transition={{ duration: 1.2 }}
                        />
                      </div>
                    )}

                    <div className="p-5">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10 border border-primary/30">
                            <FolderGit2 className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                              {project.title}
                            </h3>
                            <div className="flex items-center gap-2 mt-1 text-xs font-mono">
                              <Layers className="w-3 h-3 text-green-400" />
                              <span className="text-green-400">
                                {project.technologies.length}
                              </span>
                              <span className="text-muted-foreground">
                                technologies
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-background/50 rounded-lg p-3 mb-4 font-mono text-xs">
                        <div className="text-muted-foreground mb-1">
                          <span className="text-primary">$</span> echo $DESCRIPTION
                        </div>
                        <p className="text-foreground/80 leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.technologies.slice(0, 5).map((tech) => (
                          <span
                            key={tech}
                            className="inline-flex items-center px-2 py-0.5 rounded bg-primary/10 border border-primary/30 text-primary text-[10px] font-mono"
                          >
                            <span className="text-primary/60 mr-1">&gt;</span>
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 5 && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded bg-muted/20 border border-border text-muted-foreground text-[10px] font-mono">
                            +{project.technologies.length - 5}
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <motion.a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/30 text-primary text-xs font-mono hover:bg-primary/20 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          LIVE_DEMO
                        </motion.a>
                        <motion.a
                          href={project.code}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-card border border-border text-foreground text-xs font-mono hover:bg-primary/10 hover:border-primary/30 transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" />
                          SOURCE
                        </motion.a>
                      </div>
                    </div>

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
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm font-mono"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card/50 border border-border">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-muted-foreground">Total Projects:</span>
            <span className="text-yellow-400 font-bold">
              <CountUp to={resumeData.projects.length} suffix="+" />
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card/50 border border-border">
            <Code className="w-4 h-4 text-green-400" />
            <span className="text-muted-foreground">Stack Depth:</span>
            <span className="text-green-400 font-bold">Full</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card/50 border border-border">
            <GitBranch className="w-4 h-4 text-cyan-400" />
            <span className="text-muted-foreground">Open Source:</span>
            <span className="text-cyan-400 font-bold">100%</span>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
