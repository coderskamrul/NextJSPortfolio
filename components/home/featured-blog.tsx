"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  Hash,
  Terminal,
} from "lucide-react";
import { blogPosts } from "@/lib/blog-data";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/animated-section";
import {
  TiltCard,
  TextReveal,
  CountUp,
} from "@/components/scroll/scroll-primitives";
import { Button } from "@/components/ui/button";

export function FeaturedBlog() {
  const featured = blogPosts.slice(0, 3);

  return (
    <AnimatedSection className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(100,200,180,0.05)_0%,transparent_50%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/30 w-fit mb-4">
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="font-mono text-sm text-primary">
                $ tail -n 3 ./blog/posts
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-mono mb-2">
              <span className="text-primary">&lt;</span>
              <TextReveal text="BLOG" className="inline-block" />
              <span className="text-primary">/&gt;</span>
            </h2>
            <p className="text-muted-foreground font-mono text-sm">
              // Latest writings &middot;{" "}
              <span className="text-primary">
                <CountUp to={blogPosts.length} /> posts
              </span>
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="border-primary/30 hover:bg-primary/10 font-mono"
          >
            <Link href="/blog" className="group">
              <Terminal className="mr-2 w-4 h-4" />
              SEE_MORE
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((post, index) => (
            <StaggerItem key={post.id}>
              <TiltCard intensity={6} className="h-full">
                <Link href={`/blog/${post.slug}`}>
                  <motion.article
                    whileHover={{ y: -4 }}
                    className="h-full bg-card/50 backdrop-blur-sm rounded-lg border border-border overflow-hidden hover:border-primary/50 transition-all group cursor-pointer"
                  >
                    <div className="flex items-center justify-between px-4 py-2.5 bg-muted/30 border-b border-border">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 rounded-full bg-red-500/60" />
                          <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                          <div className="w-2 h-2 rounded-full bg-green-500/60" />
                        </div>
                        <span className="font-mono text-[10px] text-muted-foreground truncate">
                          {post.slug}.md
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-primary/50">
                        #{String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

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
                            className="px-1.5 py-0.5 text-[10px] font-mono bg-muted/50 rounded border border-border text-muted-foreground inline-flex items-center gap-1"
                          >
                            <Hash className="w-2.5 h-2.5 text-primary/50" />
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        <span className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-primary font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                          read
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </motion.article>
                </Link>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </AnimatedSection>
  );
}
