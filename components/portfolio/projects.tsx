"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Github, ChevronRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "Expense Reimbursement Management",
    problem:
      "Manual expense tracking and reimbursement processes are slow, error-prone, and lack transparency in organizations.",
    solution:
      "Developed a web-based system to automate and streamline expense reimbursement processes with multi-level approval workflows. Implemented role-based access (Admin, Manager, Employee), configurable approval rules (sequential and conditional), and OCR-based receipt scanning to reduce manual errors and improve transparency.",
    techStack: ["React.js", "Node.js", "MongoDB", "Express", "OCR"],
    results: [
      "Multi-level approval workflows",
      "Role-based access control",
      "OCR-based receipt scanning",
    ],
    github: "https://github.com/AtharvaRGhadge/Reimbursement_Management",
    color: "from-cyan-500/20 to-blue-500/20",
    accentColor: "oklch(0.7 0.18 200)",
  },
  {
    title: "Microplastic Detection using AI (YOLOv12)",
    problem:
      "Traditional microplastic detection methods are time-consuming and require extensive manual analysis, hindering environmental monitoring efforts.",
    solution:
      "Built an object-detection model to identify and classify microplastic particles from images using YOLO. Used Python, OpenCV, and YOLO for dataset labelling, training, and real-time detection. Demonstrated the potential application of AI in environmental monitoring and sustainability research.",
    techStack: ["Python", "YOLOv12", "OpenCV", "Deep Learning"],
    results: [
      "~80-90% detection accuracy",
      "Automated detection process",
      "Real-time classification",
    ],
    github: "https://github.com/AtharvaRGhadge/Microplastic-Detection",
    color: "from-green-500/20 to-emerald-500/20",
    accentColor: "oklch(0.6 0.2 145)",
  },
];

function ProjectCard({ project, index, isInView }: { project: typeof projects[0]; index: number; isInView: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 200 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);
  
  const rotateX = useTransform(y, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      style={{ 
        rotateX: isHovered ? rotateX : 0, 
        rotateY: isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
      }}
      className="glass-card group relative overflow-hidden rounded-2xl cursor-pointer"
    >
      {/* Animated border */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${project.accentColor}40, transparent 50%, ${project.accentColor}40)`,
        }}
      />
      
      {/* Spotlight effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${useTransform(x, [-0.5, 0.5], [0, 100]).get()}% ${useTransform(y, [-0.5, 0.5], [0, 100]).get()}%, ${project.accentColor}15, transparent 40%)`,
        }}
      />

      {/* Background gradient */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${project.color}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />

      <div className="relative p-6 sm:p-8 lg:p-10" style={{ transform: "translateZ(20px)" }}>
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
          {/* Left: Info */}
          <div className="space-y-4">
            <motion.h3 
              className="text-xl font-bold text-foreground sm:text-2xl"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {project.title}
            </motion.h3>

            <div className="space-y-3">
              <div>
                <motion.span 
                  className="text-sm font-medium text-primary"
                  whileHover={{ scale: 1.05 }}
                >
                  Problem
                </motion.span>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  {project.problem}
                </p>
              </div>

              <div>
                <motion.span 
                  className="text-sm font-medium text-accent"
                  whileHover={{ scale: 1.05 }}
                >
                  Solution
                </motion.span>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Tech & Results */}
          <div className="space-y-4">
            <div>
              <span className="text-sm font-medium text-foreground">
                Tech Stack
              </span>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.techStack.map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: index * 0.2 + i * 0.05 }}
                    whileHover={{ 
                      scale: 1.1, 
                      backgroundColor: `${project.accentColor}30`,
                      borderColor: project.accentColor,
                    }}
                    className="rounded-full border border-border/50 bg-secondary/50 px-3 py-1 text-xs font-medium text-muted-foreground transition-all cursor-pointer"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-sm font-medium text-foreground">
                Key Results
              </span>
              <ul className="mt-2 space-y-1">
                {project.results.map((result, i) => (
                  <motion.li
                    key={result}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: index * 0.2 + 0.3 + i * 0.1 }}
                    className="flex items-center gap-2 text-sm text-muted-foreground group/item"
                  >
                    <motion.div
                      whileHover={{ scale: 1.3, x: 3 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <ChevronRight className="h-3 w-3 text-primary" />
                    </motion.div>
                    <span className="group-hover/item:text-foreground transition-colors">
                      {result}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <motion.div 
              className="pt-2"
              whileHover={{ scale: 1.02 }}
            >
              <Button
                variant="outline"
                size="sm"
                className="rounded-full group/btn overflow-hidden relative"
                asChild
              >
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.span
                    className="absolute inset-0 bg-primary/10"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                  <Github className="mr-2 h-4 w-4 transition-transform group-hover/btn:rotate-12" />
                  View on GitHub
                  <ExternalLink className="ml-2 h-3 w-3 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <motion.span 
            className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-primary"
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={isInView ? { opacity: 1, letterSpacing: "0.2em" } : {}}
            transition={{ duration: 0.8 }}
          >
            Featured Work
          </motion.span>
          <h2 className="mb-6 text-3xl font-bold text-foreground sm:text-4xl md:text-5xl text-balance">
            Projects that showcase my skills
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-pretty">
            {"From AI-powered solutions to full-stack applications, here's a selection of projects I've built."}
          </p>
        </motion.div>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.title} 
              project={project} 
              index={index} 
              isInView={isInView} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
