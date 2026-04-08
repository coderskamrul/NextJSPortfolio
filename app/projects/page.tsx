"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animated-section";
import { resumeData } from "@/lib/resume-data";
import { 
  Puzzle, 
  Code2, 
  ExternalLink, 
  Github, 
  Users, 
  Star,
  Filter,
  Layers,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";

const filterOptions = [
  { id: "all", label: "All Projects" },
  { id: "plugin", label: "WordPress Plugins" },
  { id: "fullstack", label: "Full Stack" },
  { id: "react", label: "React" },
  { id: "java", label: "Java" },
];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects = () => {
    if (activeFilter === "plugin") {
      return { plugins: resumeData.plugins, projects: [] };
    }
    if (activeFilter === "all") {
      return { plugins: resumeData.plugins, projects: resumeData.projects };
    }
    // Filter by category
    const filtered = resumeData.projects.filter(p => 
      p.category.toLowerCase().includes(activeFilter.toLowerCase())
    );
    return { plugins: [], projects: filtered };
  };

  const { plugins, projects } = filteredProjects();

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(100,200,180,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(100,200,180,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Layers className="w-4 h-4 text-primary" />
              <span className="font-mono text-sm text-primary">Portfolio</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-muted-foreground font-mono text-xl">git log --oneline </span>
              <br />
              <span className="text-primary text-glow">My Projects</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A collection of WordPress plugins and full-stack applications I&apos;ve built and contributed to.
              Each project represents a commitment to quality and scalable solutions.
            </p>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {filterOptions.map((filter) => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                onClick={() => setActiveFilter(filter.id)}
                className={activeFilter !== filter.id ? "border-border hover:border-primary/30" : ""}
              >
                <Filter className="w-4 h-4 mr-2" />
                {filter.label}
              </Button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* WordPress Plugins Section */}
      <AnimatePresence mode="wait">
        {plugins.length > 0 && (
          <AnimatedSection key="plugins" className="pb-20">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 mb-8"
              >
                <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                  <Puzzle className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">WordPress Plugins</h2>
                <span className="px-3 py-1 text-xs font-mono bg-secondary/50 rounded-full border border-border">
                  {plugins.length} projects
                </span>
              </motion.div>

              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plugins.map((plugin) => (
                  <StaggerItem key={plugin.name}>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -4 }}
                      className="h-full bg-card/50 backdrop-blur-sm rounded-xl border border-border overflow-hidden hover:border-primary/30 transition-all group"
                    >
                      {/* Plugin Header */}
                      <div className="p-6 border-b border-border bg-gradient-to-r from-primary/5 to-transparent">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                              <Puzzle className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold group-hover:text-primary transition-colors">
                                {plugin.name}
                              </h3>
                              <span className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full ${
                                plugin.type === "personal" 
                                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                  : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                              }`}>
                                {plugin.type === "personal" ? "Personal" : "Contribution"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Plugin Content */}
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-4 text-primary">
                          <Users className="w-4 h-4" />
                          <span className="font-mono text-sm font-medium">{plugin.installs} Active Installs</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                          {plugin.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < 4 ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground/30"}`} 
                              />
                            ))}
                          </div>
                          <motion.a
                            href={plugin.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/30 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
                          >
                            View
                            <ExternalLink className="w-3 h-3" />
                          </motion.a>
                        </div>
                      </div>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </AnimatedSection>
        )}
      </AnimatePresence>

      {/* Full Stack Projects Section */}
      <AnimatePresence mode="wait">
        {projects.length > 0 && (
          <AnimatedSection key="projects" className="py-20 bg-card/30">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 mb-8"
              >
                <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Development Projects</h2>
                <span className="px-3 py-1 text-xs font-mono bg-secondary/50 rounded-full border border-border">
                  {projects.length} projects
                </span>
              </motion.div>

              <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <StaggerItem key={project.title}>
                    <motion.div
                      whileHover={{ scale: 1.01, y: -4 }}
                      className="h-full bg-card/50 backdrop-blur-sm rounded-xl border border-border overflow-hidden hover:border-primary/30 transition-all group"
                    >
                      {/* Project Header */}
                      <div className="p-6 border-b border-border">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-cyan-500/20 border border-primary/20">
                              <Code2 className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                                {project.title}
                              </h3>
                              <span className="text-xs font-mono text-primary/70">{project.category}</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <motion.a
                              href={project.liveDemo}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className="p-2 rounded-lg bg-secondary/50 border border-border hover:border-primary/30 transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </motion.a>
                            <motion.a
                              href={project.code}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className="p-2 rounded-lg bg-secondary/50 border border-border hover:border-primary/30 transition-colors"
                            >
                              <Github className="w-4 h-4" />
                            </motion.a>
                          </div>
                        </div>
                      </div>

                      {/* Project Content */}
                      <div className="p-6">
                        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                          {project.description}
                        </p>
                        
                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 text-xs font-mono bg-secondary/50 rounded border border-border"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </AnimatedSection>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
