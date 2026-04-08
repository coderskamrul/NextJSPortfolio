"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { AnimatedSection } from "@/components/animated-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { resumeData } from "@/lib/resume-data";
import { 
  Mail, 
  Github, 
  Linkedin, 
  Send,
  MapPin,
  Terminal,
  CheckCircle,
  Wifi,
  Shield,
  Lock,
  Zap,
  MessageSquare,
  Globe,
  Code2
} from "lucide-react";

// ASCII Art Header
const asciiHeader = `
 ██████╗ ██████╗ ███╗   ██╗████████╗ █████╗  ██████╗████████╗
██╔════╝██╔═══██╗████╗  ██║╚══██╔══╝██╔══██╗██╔════╝╚══██╔══╝
██║     ██║   ██║██╔██╗ ██║   ██║   ███████║██║        ██║   
██║     ██║   ██║██║╚██╗██║   ██║   ██╔══██║██║        ██║   
╚██████╗╚██████╔╝██║ ╚████║   ██║   ██║  ██║╚██████╗   ██║   
 ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝   ╚═╝   
`;

// Terminal initialization sequence
const terminalInit = [
  "$ ssh developer@contact.portfolio",
  "[CONN] Establishing secure connection...",
  "[AUTH] Verifying access credentials...",
  "[OK] Connection established",
  "[OK] Encryption: AES-256-GCM",
  "$ ./init_contact_form.sh",
  "[READY] Contact module loaded"
];

// Matrix-style characters
const matrixChars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";

const contactMethods = [
  {
    icon: Mail,
    label: "Email Protocol",
    value: resumeData.email,
    href: `mailto:${resumeData.email}`,
    status: "ACTIVE",
    statusColor: "text-green-400"
  },
  {
    icon: Github,
    label: "GitHub Link",
    value: "@developer",
    href: resumeData.github,
    status: "ONLINE",
    statusColor: "text-green-400"
  },
  {
    icon: Linkedin,
    label: "LinkedIn Node",
    value: "/in/developer",
    href: resumeData.linkedin,
    status: "CONNECTED",
    statusColor: "text-cyan-400"
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Dhaka, Bangladesh",
    href: "#",
    status: "VERIFIED",
    statusColor: "text-yellow-400"
  }
];

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  const [typingText, setTypingText] = useState("");

  // Boot sequence animation
  useEffect(() => {
    setMounted(true);
    const commands = [...terminalInit];
    let currentLine = 0;
    
    const interval = setInterval(() => {
      if (currentLine < commands.length) {
        const lineToAdd = commands[currentLine];
        if (lineToAdd) {
          setTerminalLines(prev => [...prev, lineToAdd]);
        }
        currentLine++;
      } else {
        clearInterval(interval);
      }
    }, 150);
    
    return () => clearInterval(interval);
  }, []);

  // Typing effect for the tagline
  useEffect(() => {
    const text = "Ready to build something amazing together?";
    let index = 0;
    const interval = setInterval(() => {
      if (index <= text.length) {
        setTypingText(text.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission with terminal-like feedback
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormState({ name: "", email: "", subject: "", message: "" });
    
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Matrix Rain Background */}
        {mounted && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute text-primary/5 font-mono text-xs animate-pulse"
                style={{
                  left: `${(i * 5) % 100}%`,
                  top: `${(i * 7) % 100}%`,
                  animationDelay: `${i * 0.2}s`,
                  writingMode: 'vertical-rl'
                }}
              >
                {matrixChars.slice(i % 10, (i % 10) + 5)}
              </div>
            ))}
          </div>
        )}

        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(100,200,180,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(100,200,180,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        <div className="container mx-auto px-4 relative z-10">
          {/* ASCII Header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 overflow-x-auto"
          >
            <pre className="text-primary/60 text-[5px] sm:text-[7px] md:text-[9px] font-mono inline-block text-left">
              {asciiHeader}
            </pre>
          </motion.div>

          {/* Typing Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Wifi className="w-4 h-4 text-primary animate-pulse" />
              <span className="font-mono text-sm text-primary">SECURE_CHANNEL</span>
            </div>
            <p className="text-xl md:text-2xl text-muted-foreground font-mono">
              <span className="text-primary">$</span> {typingText}
              <span className="inline-block w-2 h-5 bg-primary ml-1 animate-pulse" />
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <AnimatedSection className="pb-20">
        <div className="container mx-auto px-4">
          {/* Connection Status Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {contactMethods.map((method, index) => (
              <motion.a
                key={method.label}
                href={method.href}
                target={method.href.startsWith("http") ? "_blank" : undefined}
                rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="bg-card/80 backdrop-blur-sm rounded-xl border border-border hover:border-primary/30 transition-all overflow-hidden group"
              >
                {/* Status Bar */}
                <div className="px-4 py-2 border-b border-border bg-card/50 flex items-center justify-between">
                  <span className="font-mono text-xs text-muted-foreground">{method.label}</span>
                  <span className={`font-mono text-xs ${method.statusColor} flex items-center gap-1`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                    {method.status}
                  </span>
                </div>
                
                {/* Content */}
                <div className="p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <method.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-mono text-muted-foreground group-hover:text-foreground transition-colors truncate">
                    {method.value}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Main Grid */}
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-8">
              
              {/* Left Panel - Terminal */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="lg:col-span-2 bg-card/80 backdrop-blur-sm rounded-xl border border-primary/20 overflow-hidden neon-border"
              >
                {/* Terminal Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-primary/20 bg-card/50">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="font-mono text-xs text-primary">secure_terminal</span>
                  <Lock className="w-4 h-4 text-primary/50" />
                </div>

                {/* Terminal Content */}
                <div className="p-4 font-mono text-xs space-y-1 min-h-[300px]">
                  {terminalLines.map((line, index) => {
                    if (!line) return null;
                    const colorClass = 
                      line.startsWith("$") ? "text-primary" : 
                      line.includes("[OK]") ? "text-green-400" :
                      line.includes("[CONN]") ? "text-yellow-400" :
                      line.includes("[AUTH]") ? "text-cyan-400" :
                      line.includes("[READY]") ? "text-green-400" :
                      "text-muted-foreground";
                    
                    return (
                      <div
                        key={`${index}-${line}`}
                        className={`${colorClass} animate-in slide-in-from-left-2 fade-in duration-300`}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        {line}
                      </div>
                    );
                  })}
                  
                  {/* Additional Terminal Info */}
                  <div className="pt-4 border-t border-primary/10 mt-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Response Time:</span>
                      <span className="text-green-400">&lt; 24h</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Availability:</span>
                      <span className="text-green-400">Open</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Location:</span>
                      <span className="text-cyan-400">GMT+6</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Encryption:</span>
                      <span className="text-yellow-400">AES-256</span>
                    </div>
                  </div>

                  <span className="inline-block w-2 h-3 bg-primary animate-pulse" />
                </div>

                {/* System Stats */}
                <div className="px-4 py-3 border-t border-primary/20 bg-card/50">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <Shield className="w-3 h-3 text-green-400" />
                      <span className="text-green-400">SECURE</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-3 h-3 text-yellow-400" />
                      <span className="text-muted-foreground">FAST RESPONSE</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Panel - Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="lg:col-span-3 bg-card/80 backdrop-blur-sm rounded-xl border border-border overflow-hidden"
              >
                {/* Form Header */}
                <div className="px-6 py-4 border-b border-border bg-card/50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h2 className="font-semibold text-sm">Send Message</h2>
                      <p className="text-xs text-muted-foreground font-mono">Transmission Protocol v2.0</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-primary/50" />
                    <span className="text-xs font-mono text-muted-foreground">WORLDWIDE</span>
                  </div>
                </div>

                {/* Form Content */}
                <div className="p-6">
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center py-16 text-center"
                    >
                      <div className="relative">
                        <div className="p-6 rounded-full bg-green-500/20 border border-green-500/30 mb-6">
                          <CheckCircle className="w-12 h-12 text-green-400" />
                        </div>
                        {/* Success animation ring */}
                        <div className="absolute inset-0 rounded-full border-2 border-green-400/50 animate-ping" />
                      </div>
                      <h3 className="font-bold text-xl mb-2 text-green-400 font-mono">
                        [TRANSMISSION_COMPLETE]
                      </h3>
                      <p className="text-muted-foreground font-mono text-sm">
                        Message delivered successfully.<br />
                        Expected response time: &lt; 24 hours
                      </p>
                      <div className="mt-4 px-4 py-2 rounded bg-green-500/10 border border-green-500/20">
                        <code className="text-xs text-green-400">STATUS: 200 OK</code>
                      </div>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="flex items-center gap-2 text-sm font-medium mb-2">
                            <span className="text-primary font-mono">01</span>
                            Name
                          </label>
                          <Input
                            name="name"
                            value={formState.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            required
                            className="bg-card/50 border-border focus:border-primary/50 font-mono"
                          />
                        </div>
                        <div>
                          <label className="flex items-center gap-2 text-sm font-medium mb-2">
                            <span className="text-primary font-mono">02</span>
                            Email
                          </label>
                          <Input
                            name="email"
                            type="email"
                            value={formState.email}
                            onChange={handleChange}
                            placeholder="your@email.com"
                            required
                            className="bg-card/50 border-border focus:border-primary/50 font-mono"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium mb-2">
                          <span className="text-primary font-mono">03</span>
                          Subject
                        </label>
                        <Input
                          name="subject"
                          value={formState.subject}
                          onChange={handleChange}
                          placeholder="Message subject"
                          required
                          className="bg-card/50 border-border focus:border-primary/50 font-mono"
                        />
                      </div>
                      
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium mb-2">
                          <span className="text-primary font-mono">04</span>
                          Message
                        </label>
                        <Textarea
                          name="message"
                          value={formState.message}
                          onChange={handleChange}
                          placeholder="Type your message here..."
                          rows={5}
                          required
                          className="bg-card/50 border-border focus:border-primary/50 font-mono resize-none"
                        />
                      </div>

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-12 font-mono group relative overflow-hidden"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-3">
                            <div className="flex gap-1">
                              <span className="w-2 h-2 bg-primary-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                              <span className="w-2 h-2 bg-primary-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                              <span className="w-2 h-2 bg-primary-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                            <span>TRANSMITTING...</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Code2 className="w-4 h-4" />
                            <span>EXECUTE_SEND()</span>
                            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        )}
                      </Button>

                      {/* Security Notice */}
                      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                        <Lock className="w-3 h-3" />
                        <span className="font-mono">End-to-end encrypted transmission</span>
                      </div>
                    </form>
                  )}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Quick Connect Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto mt-16 text-center"
          >
            <div className="bg-card/50 backdrop-blur-sm rounded-xl border border-border p-8">
              <h3 className="font-mono text-primary mb-4">
                <span className="text-muted-foreground">$</span> ./quick_connect.sh
              </h3>
              <p className="text-muted-foreground mb-6">
                Prefer a direct connection? Choose your preferred channel below.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href={`mailto:${resumeData.email}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-colors"
                >
                  <Mail className="w-4 h-4 text-primary" />
                  <span className="font-mono text-sm">Email</span>
                </a>
                <a
                  href={resumeData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card/80 border border-border hover:border-primary/30 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span className="font-mono text-sm">GitHub</span>
                </a>
                <a
                  href={resumeData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-blue-400" />
                  <span className="font-mono text-sm">LinkedIn</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      <Footer />
    </main>
  );
}
