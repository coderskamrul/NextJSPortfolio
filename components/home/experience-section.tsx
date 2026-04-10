"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, ChevronRight, Building2, GitCommit, Terminal, MapPin, GraduationCap } from "lucide-react";
import { resumeData } from "@/lib/resume-data";
import { AnimatedSection } from "@/components/animated-section";

export function ExperienceSection() {
  const [activeExp, setActiveExp] = useState(0);

  return (
    <AnimatedSection className="py-20 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(100,200,180,0.03)_0%,transparent_70%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header - Terminal Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-block bg-card/50 backdrop-blur-sm rounded-xl border border-primary/20 overflow-hidden mb-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-primary/5 border-b border-primary/20">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                <div className="w-2 h-2 rounded-full bg-green-500" />
              </div>
              <span className="text-xs font-mono text-muted-foreground">experience.log</span>
            </div>
            <div className="px-6 py-4 font-mono text-sm">
              <div className="text-muted-foreground">
                <span className="text-primary">$</span> git log --oneline --graph career/
              </div>
              <div className="text-green-400 mt-1">[OK] Loading professional journey...</div>
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold font-mono mb-4">
            <span className="text-primary">&gt;_</span> WORK_EXPERIENCE
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-mono text-sm">
            // Building scalable WordPress solutions for companies serving thousands of users
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-[200px_1fr] gap-6">
            {/* Timeline Navigation */}
            <div className="hidden md:block">
              <div className="sticky top-32 space-y-2">
                {resumeData.experience.map((exp, index) => (
                  <motion.button
                    key={exp.company}
                    onClick={() => setActiveExp(index)}
                    whileHover={{ x: 4 }}
                    className={`w-full text-left px-4 py-3 rounded-lg font-mono text-sm transition-all ${
                      activeExp === index 
                        ? "bg-primary/10 border border-primary/30 text-primary" 
                        : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <GitCommit className={`w-3 h-3 ${activeExp === index ? "text-primary" : ""}`} />
                      <span className="truncate">{exp.company}</span>
                    </div>
                    <div className="text-[10px] mt-1 opacity-70">{exp.period}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Experience Cards */}
            <div className="space-y-6">
              {resumeData.experience.map((exp, index) => (
                <motion.div
                  key={exp.company}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative ${activeExp !== index && "md:opacity-50 md:hover:opacity-80"} transition-opacity`}
                  onClick={() => setActiveExp(index)}
                >
                  {/* Timeline connector */}
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent hidden md:block" style={{ left: "-25px" }} />
                  
                  {/* Timeline dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    className={`absolute w-3 h-3 rounded-full border-2 hidden md:block ${
                      activeExp === index 
                        ? "bg-primary border-primary" 
                        : "bg-background border-primary/50"
                    }`}
                    style={{ left: "-31px", top: "24px" }}
                  />

                  {/* Experience Card */}
                  <div className={`bg-card/50 backdrop-blur-sm rounded-xl border overflow-hidden transition-all ${
                    activeExp === index ? "border-primary/50" : "border-border hover:border-primary/30"
                  }`}>
                    {/* Card header */}
                    <div className="flex items-center justify-between px-4 py-2 bg-primary/5 border-b border-primary/20">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1.5">
                          <div className={`w-2 h-2 rounded-full ${activeExp === index ? "bg-green-500" : "bg-muted-foreground/30"}`} />
                          <div className={`w-2 h-2 rounded-full ${activeExp === index ? "bg-green-500" : "bg-muted-foreground/30"}`} />
                          <div className={`w-2 h-2 rounded-full ${activeExp === index ? "bg-green-500" : "bg-muted-foreground/30"}`} />
                        </div>
                        <span className="text-xs font-mono text-muted-foreground ml-2">
                          {exp.company.toLowerCase().replace(/\s+/g, '_')}.log
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-mono">
                        <Calendar className="w-3 h-3 text-primary" />
                        <span className="text-primary">{exp.period}</span>
                      </div>
                    </div>

                    {/* Card content */}
                    <div className="p-5">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-2 rounded-lg bg-primary/10 border border-primary/30">
                          <Building2 className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{exp.role}</h3>
                          <div className="flex items-center gap-2 text-primary font-mono text-sm">
                            <span>{exp.company}</span>
                          </div>
                        </div>
                      </div>

                      {/* Highlights in terminal style */}
                      <div className="bg-background/50 rounded-lg p-4 font-mono text-sm">
                        <div className="text-muted-foreground mb-2">
                          <span className="text-primary">$</span> cat achievements.txt
                        </div>
                        <ul className="space-y-2">
                          {exp.highlights.map((highlight, hIndex) => (
                            <motion.li
                              key={hIndex}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 * hIndex }}
                              viewport={{ once: true }}
                              className="flex items-start gap-2 text-foreground/80"
                            >
                              <ChevronRight className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                              <span>{highlight}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Education */}
      
      </div>
    </AnimatedSection>
  );
}
