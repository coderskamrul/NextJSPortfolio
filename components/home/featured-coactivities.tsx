"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  GraduationCap,
  Terminal,
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

type FlatActivity = {
  group: string;
  text: string;
};

export function FeaturedCoActivities() {
  const flat: FlatActivity[] = resumeData.coActivities.flatMap((g) =>
    g.items.map((text) => ({ group: g.title, text }))
  );
  const featured = flat.slice(0, 3);
  const total = flat.length;

  return (
    <AnimatedSection className="py-20 bg-card/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.05)_0%,transparent_50%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 w-fit mb-4">
              <Users className="w-4 h-4 text-cyan-400" />
              <span className="font-mono text-sm text-cyan-400">
                $ cat ./co_activities.log
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-mono mb-2">
              <span className="text-primary">&lt;</span>
              <TextReveal text="CO_ACTIVITIES" className="inline-block" />
              <span className="text-primary">/&gt;</span>
            </h2>
            <p className="text-muted-foreground font-mono text-sm">
              // Mentoring, training &amp; community &middot;{" "}
              <span className="text-cyan-400">
                <CountUp to={total} /> entries
              </span>
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="border-primary/30 hover:bg-primary/10 font-mono"
          >
            <Link href="/about" className="group">
              <Terminal className="mr-2 w-4 h-4" />
              SEE_MORE
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((activity, index) => (
            <StaggerItem key={`${activity.group}-${index}`}>
              <ScrollScale from={0.92}>
                <TiltCard intensity={6} className="h-full">
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="group relative h-full bg-card/80 backdrop-blur-sm rounded-xl border border-border overflow-hidden hover:border-cyan-500/50 transition-all"
                  >
                    <div className="flex items-center gap-2 px-3 py-2 bg-card border-b border-border">
                      <div className="flex gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500" />
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                      </div>
                      <span className="font-mono text-xs text-muted-foreground truncate">
                        activity_{index + 1}.log
                      </span>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                          <GraduationCap className="w-4 h-4 text-cyan-400" />
                        </div>
                        <span className="font-mono text-xs text-cyan-400 uppercase tracking-wider">
                          {activity.group}
                        </span>
                      </div>

                      <div className="bg-background/50 rounded-lg p-3 font-mono text-xs">
                        <div className="text-muted-foreground mb-1">
                          <span className="text-primary">$</span> echo $ROLE
                        </div>
                        <p className="text-foreground/80 leading-relaxed">
                          {activity.text}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center justify-between pt-3 border-t border-border">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                          <span className="font-mono text-xs text-green-400">
                            ACTIVE
                          </span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
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
