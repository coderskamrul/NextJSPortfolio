"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Terminal, Code2, ExternalLink } from "lucide-react";

const footerLinks = {
  navigation: [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ],
  resources: [
    { name: "Awards", href: "/awards" },
    { name: "Certificates", href: "/certificates" },
    { name: "Blog", href: "/blog" },
  ],
  social: [
    { name: "GitHub", href: "https://github.com/coderskamrul", icon: Github },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/coderskamrul", icon: Linkedin },
    { name: "Email", href: "mailto:mdkamrul2058@gmail.com", icon: Mail },
  ],
};

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-card/30">
      {/* Terminal-style decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                <Terminal className="w-5 h-5 text-primary" />
              </div>
              <div>
                <span className="font-mono text-sm text-primary">&lt;</span>
                <span className="font-semibold">Developer</span>
                <span className="font-mono text-sm text-primary">/&gt;</span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm max-w-md leading-relaxed">
              WordPress Plugin Developer crafting scalable solutions for 100K+ users.
              Building the future of web development, one plugin at a time.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {footerLinks.social.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg bg-secondary/50 border border-border hover:border-primary/50 hover:bg-primary/10 transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-primary" />
              Navigation
            </h3>
            <ul className="space-y-2">
              {footerLinks.navigation.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-primary">
                      ./
                    </span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-primary" />
              Resources
            </h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-primary">
                      ./
                    </span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 pt-6 border-t border-border"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground font-mono">
              <span className="text-primary">$</span> echo &quot;Built with Next.js &amp; TypeScript&quot;
            </p>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
