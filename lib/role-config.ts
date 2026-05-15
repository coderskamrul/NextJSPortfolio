export const isPluginRole = process.env.IS_PLUGIN_ROLE === "true";

export type RoleContent = {
  title: string;
  navSubtitle: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  rotatingHeadlines: string[];
  heroIntro: {
    pillLabel: string;
    pillSecondary: string;
    greetingSuffix: string;
  };
  heroParagraph: {
    leadHighlight: string;
    midHighlight: string;
    tailHighlight: string;
  };
  experienceSubtitle: string;
  footerTagline: string;
  aboutBootIdentity: string;
  heroStatLast: {
    label: string;
    value: number;
    suffix: string;
  };
  showFeaturedPlugins: boolean;
  showFeaturedProjects: boolean;
  about: {
    avatarCaption: string;
    handle: string;
    impactStat: { label: string; value: number; suffix: string };
    interests: string[];
  };
  projects: {
    heroParagraph: string;
    filters: { id: string; label: string }[];
    defaultFilter: string;
    showPluginsSection: boolean;
    projectsSectionTitle: string;
  };
  skills: {
    showWordPressCategory: boolean;
    proficiency: { name: string; level: number; color: string }[];
    footerStats: { label: string; value: number; suffix: string; color: string }[];
  };
  contact: {
    introLine: string;
  };
};

const pluginContent: RoleContent = {
  title: "WordPress Plugin Developer",
  navSubtitle: "WordPress Plugin Developer",
  metaTitle: "WordPress Plugin Developer Portfolio | Hmd Kamrul",
  metaDescription:
    "Results-driven WordPress Plugin Developer with 2+ years of experience building scalable, high-performance plugins used by 100K+ active users.",
  metaKeywords: [
    "coderskamrul",
    "hmdkamrul",
    "WordPress",
    "Plugin Developer",
    "PHP",
    "WooCommerce",
    "REST API",
    "BetterLinks",
    "Simple 301 Redirects",
  ],
  rotatingHeadlines: [
    "AWARD-WINNING ENGINEER",
    "AI INNOVATION CHAMPION",
    "WORDPRESS PLUGIN DEVELOPER",
    "OPEN-SOURCE CONTRIBUTOR",
  ],
  heroIntro: {
    pillLabel: "Award Winner",
    pillSecondary: "AI Award 2025",
    greetingSuffix: "I am",
  },
  heroParagraph: {
    leadHighlight: "100K+ users",
    midHighlight: "5+ plugins",
    tailHighlight: "AI innovation",
  },
  experienceSubtitle:
    "// Building scalable WordPress plugins for products serving thousands of users",
  footerTagline:
    "WordPress Plugin Developer crafting scalable solutions for 100K+ users. Building the future of web development, one plugin at a time.",
  aboutBootIdentity: "WordPress Plugin Developer",
  heroStatLast: {
    label: "Plugins Built",
    value: 5,
    suffix: "+",
  },
  showFeaturedPlugins: true,
  showFeaturedProjects: false,
  about: {
    avatarCaption: "Plugin & SASS Developer",
    handle: "@plugin_developer",
    impactStat: { label: "Plugin Users", value: 100, suffix: "K+" },
    interests: [
      "Plugin Development",
      "Problem Solving",
      "Open Source",
      "Performance",
      "Learning",
      "Mentoring",
    ],
  },
  projects: {
    heroParagraph:
      "A collection of WordPress plugins and full-stack applications I've built and contributed to. Each project represents a commitment to quality and scalable solutions.",
    filters: [
      { id: "all", label: "All Projects" },
      { id: "plugin", label: "WordPress Plugins" },
      { id: "fullstack", label: "Full Stack" },
      { id: "react", label: "React" },
      { id: "java", label: "Java" },
    ],
    defaultFilter: "all",
    showPluginsSection: true,
    projectsSectionTitle: "Development Projects",
  },
  skills: {
    showWordPressCategory: true,
    proficiency: [
      { name: "WordPress/PHP", level: 95, color: "bg-blue-500" },
      { name: "JavaScript/TypeScript", level: 90, color: "bg-yellow-500" },
      { name: "React/Next.js", level: 88, color: "bg-cyan-500" },
      { name: "Node.js/Express", level: 85, color: "bg-green-500" },
      { name: "Database (MySQL/MongoDB)", level: 82, color: "bg-purple-500" },
      { name: "Problem Solving/DSA", level: 90, color: "bg-red-500" },
    ],
    footerStats: [
      { label: "Problems Solved", value: 1500, suffix: "+", color: "text-primary" },
      { label: "Users Impacted", value: 100, suffix: "K+", color: "text-cyan-400" },
      { label: "Plugins Built", value: 5, suffix: "+", color: "text-green-400" },
      { label: "CF Contests", value: 100, suffix: "+", color: "text-yellow-400" },
    ],
  },
  contact: {
    introLine:
      "Let's build the next WordPress plugin together. Drop a message and I'll get back within 24 hours.",
  },
};

const fullStackContent: RoleContent = {
  title: "Full Stack Software Engineer",
  navSubtitle: "Full Stack Software Engineer",
  metaTitle: "Full Stack Software Engineer Portfolio | Hmd Kamrul",
  metaDescription:
    "Full Stack Software Engineer with 2+ years of experience building scalable web apps with React, Next.js, Node.js, and MongoDB — backed by 1500+ competitive-programming problems solved.",
  metaKeywords: [
    "coderskamrul",
    "hmdkamrul",
    "Full Stack",
    "Software Engineer",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "MongoDB",
    "Web Developer",
  ],
  rotatingHeadlines: [
    "AWARD-WINNING ENGINEER",
    "AI INNOVATION CHAMPION",
    "FULL STACK ENGINEER",
    "COMPETITIVE PROGRAMMER",
  ],
  heroIntro: {
    pillLabel: "Open to Work",
    pillSecondary: "Full Stack Engineer",
    greetingSuffix: "I am",
  },
  heroParagraph: {
    leadHighlight: "scalable full-stack apps",
    midHighlight: "1500+",
    tailHighlight: "AI innovation",
  },
  experienceSubtitle:
    "// Building scalable full-stack products with React, Next.js, Node.js, and MongoDB",
  footerTagline:
    "Full Stack Software Engineer building scalable web products with React, Next.js, and Node.js. Turning ideas into shipped, production-grade software.",
  aboutBootIdentity: "Full Stack Software Engineer",
  heroStatLast: {
    label: "Projects Shipped",
    value: 8,
    suffix: "+",
  },
  showFeaturedPlugins: false,
  showFeaturedProjects: true,
  about: {
    avatarCaption: "Full Stack Software Engineer",
    handle: "@fullstack_engineer",
    impactStat: { label: "Projects Shipped", value: 8, suffix: "+" },
    interests: [
      "Full Stack Engineering",
      "Problem Solving",
      "Open Source",
      "Performance",
      "Learning",
      "Mentoring",
    ],
  },
  projects: {
    heroParagraph:
      "A collection of full-stack applications I've built with React, Next.js, Node.js, and MongoDB. Each project reflects a commitment to clean architecture, UX, and scalable design.",
    filters: [
      { id: "all", label: "All Projects" },
      { id: "fullstack", label: "Full Stack" },
      { id: "react", label: "React" },
      { id: "java", label: "Java" },
      { id: "php", label: "PHP" },
    ],
    defaultFilter: "all",
    showPluginsSection: false,
    projectsSectionTitle: "Featured Projects",
  },
  skills: {
    showWordPressCategory: false,
    proficiency: [
      { name: "React/Next.js", level: 92, color: "bg-cyan-500" },
      { name: "JavaScript/TypeScript", level: 92, color: "bg-yellow-500" },
      { name: "Node.js/Express", level: 88, color: "bg-green-500" },
      { name: "Database (MySQL/MongoDB)", level: 85, color: "bg-purple-500" },
      { name: "PHP/Backend Systems", level: 85, color: "bg-blue-500" },
      { name: "Problem Solving/DSA", level: 90, color: "bg-red-500" },
    ],
    footerStats: [
      { label: "Problems Solved", value: 1500, suffix: "+", color: "text-primary" },
      { label: "Users Impacted", value: 100, suffix: "K+", color: "text-cyan-400" },
      { label: "Projects Shipped", value: 8, suffix: "+", color: "text-green-400" },
      { label: "CF Contests", value: 100, suffix: "+", color: "text-yellow-400" },
    ],
  },
  contact: {
    introLine:
      "Looking for a full-stack engineer to help ship your next product? Drop a message and I'll get back within 24 hours.",
  },
};

export const roleContent: RoleContent = isPluginRole ? pluginContent : fullStackContent;
