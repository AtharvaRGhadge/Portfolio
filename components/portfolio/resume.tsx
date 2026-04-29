"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  User, 
  Briefcase, 
  Calendar, 
  Code2, 
  GraduationCap, 
  Star,
  Laptop,
  Brain,
  Trophy,
  Award,
  Languages,
  Target,
  Zap,
  TrendingUp
} from "lucide-react";

const experience = [
  {
    role: "Frontend Developer Intern",
    company: "Springer Capital",
    duration: "Jan 2026 - Apr 2026",
    description:
      "Designed and developed responsive frontend dashboards for Executive, Advisor, Operations, and Compliance modules using React.js, enabling role-specific data visualization and decision-making.",
    highlights: [
      "Built dynamic UI components for financial insights",
      "Managed workflows across multiple dashboard views",
      "Improved usability and operational efficiency",
    ],
  },
];

const resumeSummary = {
  name: "Atharva Ravindra Ghadge",
  title: "Computer Engineering Student",
  education: "B.E. Computer Engineering - SPPU (2023-2027)",
  cgpa: "9.5",
  skills: ["Python", "C++", "Java", "JavaScript", "ReactJS", "MongoDB", "SQL", "YOLO", "OpenCV"],
  highlights: [
    { text: "Frontend Developer with internship experience at Springer Capital", icon: Laptop },
    { text: "AI/ML enthusiast with hands-on experience in YOLO and OpenCV", icon: Brain },
    { text: "Multiple hackathon finalist and research competition qualifier", icon: Trophy },
    { text: "Certified in Oracle OCI AI Foundations and MongoDB", icon: Award },
    { text: "Japanese language proficiency (JLPT N5: 97.9%ile, N4: 96.3%ile)", icon: Languages },
  ],
};

export function Resume() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="resume" className="relative py-24 sm:py-32">
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-[300px] w-[300px] translate-x-1/2 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-primary">
            Resume
          </span>
          <h2 className="mb-6 text-3xl font-bold text-foreground sm:text-4xl md:text-5xl text-balance">
            Professional Summary
          </h2>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Resume Summary Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-card group relative overflow-hidden rounded-2xl p-6 transition-all hover:border-primary/30"
          >
            {/* Decorative elements */}
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/10 blur-2xl transition-all group-hover:bg-primary/20" />

            <div className="relative">
              {/* Header with unique icon */}
              <div className="mb-6 flex items-center gap-4">
                <motion.div 
                  className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-lg shadow-primary/25"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <User className="h-8 w-8" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    {resumeSummary.name}
                  </h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Target className="h-3 w-3 text-primary" />
                    {resumeSummary.title}
                  </p>
                </div>
              </div>

              {/* Education & CGPA with icons */}
              <div className="mb-6 space-y-3">
                <motion.div 
                  className="flex items-center gap-3 text-sm p-3 rounded-xl bg-white/5 border border-white/5"
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <span className="text-muted-foreground">{resumeSummary.education}</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-3 text-sm p-3 rounded-xl bg-white/5 border border-white/5"
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 text-white">
                    <Star className="h-5 w-5" />
                  </div>
                  <span className="text-muted-foreground">CGPA: <span className="text-foreground font-semibold">{resumeSummary.cgpa}</span></span>
                </motion.div>
              </div>

              {/* Core Skills with icon */}
              <div className="mb-6">
                <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/20">
                    <Code2 className="h-4 w-4 text-primary" />
                  </div>
                  Core Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {resumeSummary.skills.map((skill, index) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.5 + index * 0.05 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="rounded-full border border-border/50 bg-secondary/50 px-3 py-1 text-xs font-medium text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Key Highlights with unique icons */}
              <div>
                <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-accent/20">
                    <Zap className="h-4 w-4 text-accent" />
                  </div>
                  Key Highlights
                </h4>
                <ul className="space-y-3">
                  {resumeSummary.highlights.map((highlight, index) => {
                    const Icon = highlight.icon;
                    return (
                      <motion.li
                        key={highlight.text}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="flex items-start gap-3 text-sm text-muted-foreground group/item"
                      >
                        <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/5 text-primary group-hover/item:bg-primary/20 transition-colors">
                          <Icon className="h-3.5 w-3.5" />
                        </div>
                        <span className="group-hover/item:text-foreground transition-colors">{highlight.text}</span>
                      </motion.li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Experience Summary */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4"
          >
            <h3 className="flex items-center gap-3 text-lg font-semibold text-foreground">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/25">
                <TrendingUp className="h-5 w-5" />
              </div>
              Professional Experience
            </h3>

            {experience.map((exp, index) => (
              <motion.div
                key={exp.role}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="glass-card rounded-xl p-5 transition-all hover:border-primary/30 group"
              >
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    {exp.role}
                  </h4>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    <Calendar className="h-3 w-3" />
                    {exp.duration}
                  </span>
                </div>
                <p className="mb-2 text-sm font-medium text-accent">
                  {exp.company}
                </p>
                <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                  {exp.description}
                </p>
                <ul className="space-y-2">
                  {exp.highlights.map((highlight, i) => (
                    <motion.li
                      key={highlight}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      className="flex items-center gap-2 text-xs text-muted-foreground"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-primary to-accent" />
                      {highlight}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
