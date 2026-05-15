"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  Calendar,
  ChevronRight,
  FileCheck,
  Terminal,
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

export function FeaturedCertificates() {
  const featured = resumeData.certificates.slice(0, 3);

  return (
    <AnimatedSection className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(100,200,180,0.05)_0%,transparent_50%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/30 w-fit mb-4">
              <FileCheck className="w-4 h-4 text-primary" />
              <span className="font-mono text-sm text-primary">
                $ ls ./certificates/ | head -3
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-mono mb-2">
              <span className="text-primary">&lt;</span>
              <TextReveal text="CERTIFICATES" className="inline-block" />
              <span className="text-primary">/&gt;</span>
            </h2>
            <p className="text-muted-foreground font-mono text-sm">
              // Verified credentials &middot;{" "}
              <span className="text-green-400">
                <CountUp to={resumeData.certificates.length} /> total
              </span>
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="border-primary/30 hover:bg-primary/10 font-mono"
          >
            <Link href="/certificates" className="group">
              <Terminal className="mr-2 w-4 h-4" />
              SEE_MORE
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((cert, index) => (
            <StaggerItem key={cert.title}>
              <ScrollScale from={0.92}>
                <TiltCard intensity={8} className="h-full">
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="group relative h-full bg-card/80 backdrop-blur-sm rounded-xl border border-border overflow-hidden hover:border-primary/50 transition-all"
                  >
                    <div className="flex items-center gap-2 px-3 py-2 bg-card border-b border-border">
                      <div className="flex gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500" />
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                      </div>
                      <span className="font-mono text-xs text-muted-foreground truncate">
                        cert_{index + 1}.pdf
                      </span>
                    </div>

                    <div className="relative aspect-[4/3] bg-muted overflow-hidden">
                      <Image
                        src={cert.image}
                        alt={cert.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded bg-green-500/20 border border-green-500/30">
                        <BadgeCheck className="w-3 h-3 text-green-400" />
                        <span className="font-mono text-xs text-green-400">
                          VERIFIED
                        </span>
                      </div>
                    </div>

                    <div className="p-4 border-t border-border">
                      <h3 className="text-sm font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                        {cert.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                          <Calendar className="w-3 h-3" />
                          credentials
                        </div>
                        <ChevronRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
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
