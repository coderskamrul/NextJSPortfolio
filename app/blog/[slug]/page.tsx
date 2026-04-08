"use client";

import { useState, useEffect, use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { 
  Calendar, 
  Clock, 
  ArrowLeft,
  Hash,
  Terminal,
  User,
  Share2,
  BookOpen,
  ChevronRight,
  Copy,
  Check,
  Code2
} from "lucide-react";
import { getBlogPostBySlug, blogPosts, BlogPost } from "@/lib/blog-data";

function CodeBlock({ code, language }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-6">
      <div className="bg-card/80 rounded-lg border border-border overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            </div>
            <span className="font-mono text-xs text-muted-foreground">{language || "code"}</span>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2 py-1 rounded text-xs font-mono text-muted-foreground hover:text-primary transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-green-400" />
                <span className="text-green-400">copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>copy</span>
              </>
            )}
          </button>
        </div>
        {/* Code Content */}
        <pre className="p-4 overflow-x-auto">
          <code className="font-mono text-sm text-muted-foreground">{code}</code>
        </pre>
      </div>
    </div>
  );
}

function parseContent(content: string) {
  const parts: Array<{ type: 'text' | 'code'; content: string; language?: string }> = [];
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    // Add text before code block
    if (match.index > lastIndex) {
      parts.push({
        type: 'text',
        content: content.slice(lastIndex, match.index)
      });
    }
    // Add code block
    parts.push({
      type: 'code',
      content: match[2].trim(),
      language: match[1]
    });
    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < content.length) {
    parts.push({
      type: 'text',
      content: content.slice(lastIndex)
    });
  }

  return parts;
}

function renderText(text: string) {
  const lines = text.split('\n');
  const elements: JSX.Element[] = [];
  let currentList: string[] = [];
  let listType: 'ordered' | 'unordered' | null = null;

  const flushList = () => {
    if (currentList.length > 0 && listType) {
      const ListTag = listType === 'ordered' ? 'ol' : 'ul';
      elements.push(
        <ListTag 
          key={elements.length} 
          className={`my-4 pl-6 space-y-2 ${listType === 'ordered' ? 'list-decimal' : 'list-disc'}`}
        >
          {currentList.map((item, i) => (
            <li key={i} className="text-muted-foreground font-mono text-sm">{item}</li>
          ))}
        </ListTag>
      );
      currentList = [];
      listType = null;
    }
  };

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();

    // Headers
    if (trimmedLine.startsWith('## ')) {
      flushList();
      elements.push(
        <h2 key={index} className="text-xl font-bold mt-8 mb-4 text-foreground flex items-center gap-2">
          <span className="text-primary font-mono text-sm">##</span>
          {trimmedLine.replace('## ', '')}
        </h2>
      );
    } 
    else if (trimmedLine.startsWith('### ')) {
      flushList();
      elements.push(
        <h3 key={index} className="text-lg font-semibold mt-6 mb-3 text-foreground flex items-center gap-2">
          <span className="text-primary font-mono text-sm">###</span>
          {trimmedLine.replace('### ', '')}
        </h3>
      );
    }
    // Ordered list
    else if (/^\d+\.\s/.test(trimmedLine)) {
      if (listType !== 'ordered') {
        flushList();
        listType = 'ordered';
      }
      currentList.push(trimmedLine.replace(/^\d+\.\s/, ''));
    }
    // Unordered list
    else if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
      if (listType !== 'unordered') {
        flushList();
        listType = 'unordered';
      }
      currentList.push(trimmedLine.replace(/^[-*]\s/, ''));
    }
    // Bold text with **
    else if (trimmedLine && !trimmedLine.startsWith('#')) {
      flushList();
      // Handle inline formatting
      const formattedLine = trimmedLine
        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary">$1</strong>')
        .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-primary/10 text-primary font-mono text-xs">$1</code>');
      
      if (formattedLine) {
        elements.push(
          <p 
            key={index} 
            className="text-muted-foreground leading-relaxed my-4 font-mono text-sm"
            dangerouslySetInnerHTML={{ __html: formattedLine }}
          />
        );
      }
    }
  });

  flushList();
  return elements;
}

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    setMounted(true);
    const foundPost = getBlogPostBySlug(slug);
    if (foundPost) {
      setPost(foundPost);
    }
  }, [slug]);

  if (!mounted) {
    return (
      <main className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="animate-pulse space-y-4">
                <div className="h-8 bg-muted rounded w-3/4" />
                <div className="h-4 bg-muted rounded w-1/2" />
                <div className="h-64 bg-muted rounded" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (!post) {
    return (
      <main className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-32 pb-20">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md mx-auto"
            >
              <div className="bg-card/50 rounded-lg border border-border p-8">
                <Terminal className="w-16 h-16 text-red-400 mx-auto mb-4" />
                <h1 className="font-mono text-xl text-red-400 mb-2">ERROR 404</h1>
                <p className="font-mono text-sm text-muted-foreground mb-6">
                  $ cat {slug}.md<br />
                  <span className="text-red-400">cat: {slug}.md: No such file or directory</span>
                </p>
                <button
                  onClick={() => router.push('/blog')}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-lg text-primary font-mono text-sm hover:bg-primary/20 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  cd ../blog
                </button>
              </div>
            </motion.div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  const contentParts = parseContent(post.content);
  const relatedPosts = blogPosts.filter(p => p.id !== post.id).slice(0, 3);

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      {/* Article Header */}
      <section className="pt-32 pb-12 relative overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(100,200,180,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(100,200,180,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8"
            >
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary font-mono text-sm transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                cd ../blog
              </Link>
            </motion.div>

            {/* File Path */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-muted/50 border border-border font-mono text-xs text-muted-foreground">
                <Terminal className="w-3 h-3" />
                ~/blog/posts/{post.slug}.md
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              <span className="text-primary font-mono text-xl">$ cat </span>
              <br className="sm:hidden" />
              {post.title}
            </motion.h1>

            {/* Meta Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center gap-4 mb-6 font-mono text-sm text-muted-foreground"
            >
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {post.author}
              </span>
              <span className="text-primary">|</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </span>
              <span className="text-primary">|</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </motion.div>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-mono">
                {post.category}
              </span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2 py-1 text-xs font-mono bg-muted/50 rounded border border-border text-muted-foreground"
                >
                  <Hash className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* Terminal Window for Excerpt */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-card/50 backdrop-blur-sm rounded-lg border border-border overflow-hidden"
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-muted/30 border-b border-border">
                <div className="flex gap-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">synopsis.txt</span>
              </div>
              <div className="p-4 font-mono text-sm">
                <span className="text-primary">$ head -n 3 {post.slug}.md</span>
                <p className="text-muted-foreground mt-2 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-card/30 backdrop-blur-sm rounded-lg border border-border p-6 md:p-8"
            >
              {/* Corner Decorations */}
              <div className="relative">
                <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-primary/50" />
                <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-primary/50" />
                <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-primary/50" />
                <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-primary/50" />

                {/* Render Content */}
                <div className="prose prose-invert max-w-none">
                  {contentParts.map((part, index) => (
                    <div key={index}>
                      {part.type === 'code' ? (
                        <CodeBlock code={part.content} language={part.language} />
                      ) : (
                        renderText(part.content)
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.article>

            {/* Share Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8 flex items-center justify-between p-4 bg-card/30 rounded-lg border border-border"
            >
              <div className="flex items-center gap-2 text-muted-foreground font-mono text-sm">
                <Share2 className="w-4 h-4" />
                <span>share_article()</span>
              </div>
              <div className="flex gap-2">
                <button className="p-2 rounded bg-muted/50 hover:bg-primary/20 hover:text-primary transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </button>
                <button className="p-2 rounded bg-muted/50 hover:bg-primary/20 hover:text-primary transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </button>
              </div>
            </motion.div>

            {/* Related Posts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-12"
            >
              <h3 className="font-mono text-lg mb-6 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">ls -la</span>
                <span className="text-primary">./related/</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                    <div className="bg-card/50 rounded-lg border border-border p-4 hover:border-primary/50 transition-all group">
                      <div className="flex items-center gap-2 mb-2">
                        <Code2 className="w-4 h-4 text-primary" />
                        <span className="font-mono text-xs text-muted-foreground">
                          {relatedPost.category}
                        </span>
                      </div>
                      <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                        {relatedPost.title}
                      </h4>
                      <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground font-mono">
                        <ChevronRight className="w-3 h-3" />
                        <span>read</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
