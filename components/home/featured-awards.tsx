"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Medal,
  Terminal,
  Trophy,
  Users,
} from "lucide-react";
import { resumeData } from "@/lib/resume-data";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/animated-section";
import {
  TiltCard,
  ScrollScale,
  TextReveal,
  CountUp,
} from "@/components/scroll/scroll-primitives";
import { Button } from "@/components/ui/button";

export function FeaturedAwards() {
  const featured = resumeData.awards.slice(0, 3);

  return (
    <AnimatedSection className="py-20 bg-card/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.05)_0%,transparent_60%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-500/10 border border-yellow-500/30 w-fit mb-4">
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span className="font-mono text-sm text-yellow-400">
                $ cat ./awards/top.json
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-mono mb-2">
              <span className="text-primary">&lt;</span>
              <TextReveal text="AWARDS" className="inline-block" />
              <span className="text-primary">/&gt;</span>
            </h2>
            <p className="text-muted-foreground font-mono text-sm">
              // Competition wins &middot;{" "}
              <span className="text-yellow-400">
                <CountUp to={resumeData.awards.length} /> total
              </span>
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="border-primary/30 hover:bg-primary/10 font-mono"
          >
            <Link href="/awards" className="group">
              <Terminal className="mr-2 w-4 h-4" />
              SEE_MORE
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((award, index) => (
            <StaggerItem key={award.title}>
              <ScrollScale from={0.92}>
                <TiltCard intensity={8} className="h-full">
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="group relative h-full bg-card/80 backdrop-blur-sm rounded-xl border border-border overflow-hidden hover:border-yellow-500/50 transition-all"
                  >
                    <div className="flex items-center gap-2 px-3 py-2 bg-card border-b border-border">
                      <div className="flex gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500" />
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                      </div>
                      <span className="font-mono text-xs text-muted-foreground truncate">
                        award_{index + 1}.exe
                      </span>
                    </div>

                    <div className="relative aspect-video bg-muted overflow-hidden">
                      <Image
                        src={award.image}
                        alt={award.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded bg-yellow-500/20 border border-yellow-500/30">
                        <Medal className="w-3 h-3 text-yellow-400" />
                        <span className="font-mono text-xs text-yellow-400">
                          {award.year}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 border-t border-border">
                      <h3 className="text-sm font-bold font-mono text-yellow-400 mb-2 line-clamp-2 group-hover:text-yellow-300 transition-colors">
                        {award.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                        {award.description}
                      </p>
                      {award.team && (
                        <div className="flex items-center gap-2 text-xs font-mono">
                          <Users className="w-3 h-3 text-cyan-400" />
                          <span className="text-cyan-400 truncate">
                            {award.team}
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </TiltCard>
              </ScrollScale>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </AnimatedSection>
  );
}
