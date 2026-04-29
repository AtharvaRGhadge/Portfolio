"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Code2, Database, Brain, Layout, Award } from "lucide-react";

const skillCategories = [
  {
    title: "Programming Languages",
    icon: Code2,
    color: "from-green-500 to-emerald-500",
    glowColor: "oklch(0.6 0.2 145)",
    skills: ["Python", "C++", "Java", "JavaScript"],
  },
  {
    title: "Frontend / Web",
    icon: Layout,
    color: "from-cyan-500 to-blue-500",
    glowColor: "oklch(0.7 0.18 200)",
    skills: ["HTML5", "CSS3", "ReactJS", "Git", "GitHub"],
  },
  {
    title: "Databases",
    icon: Database,
    color: "from-orange-500 to-amber-500",
    glowColor: "oklch(0.7 0.2 60)",
    skills: ["MongoDB", "SQL"],
  },
  {
    title: "AI/ML",
    icon: Brain,
    color: "from-purple-500 to-pink-500",
    glowColor: "oklch(0.6 0.25 310)",
    skills: ["YOLO", "OpenCV"],
  },
  {
    title: "Certifications",
    icon: Award,
    color: "from-red-500 to-rose-500",
    glowColor: "oklch(0.6 0.25 25)",
    skills: ["Oracle OCI AI Foundations", "Introduction to MongoDB for students"],
  },
];

function TiltCard({ children, className, glowColor }: { children: React.ReactNode; className?: string; glowColor: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 300 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = (e.clientX - rect.left) / rect.width - 0.5;
    const centerY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(centerX);
    y.set(centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      style={{ 
        rotateX, 
        rotateY, 
        transformStyle: "preserve-3d",
        boxShadow: isHovered ? `0 0 40px ${glowColor}40, 0 0 80px ${glowColor}20` : "none"
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="relative py-24 sm:py-32">
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <motion.span 
            className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-primary"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            Technical Skills
          </motion.span>
          <h2 className="mb-6 text-3xl font-bold text-foreground sm:text-4xl md:text-5xl text-balance">
            Technologies I work with
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-pretty">
            A diverse toolkit spanning frontend development, programming languages, databases, and cutting-edge AI technologies.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, categoryIndex) => (
            <TiltCard
              key={category.title}
              glowColor={category.glowColor}
              className="glass-card group relative overflow-hidden rounded-2xl p-6 transition-all hover:border-primary/30 cursor-pointer"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              >
                {/* Gradient accent on hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 transition-opacity`}
                  whileHover={{ opacity: 0.08 }}
                />
                
                {/* Animated border gradient */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${category.glowColor}30, transparent, ${category.glowColor}30)`,
                    padding: "1px",
                  }}
                />

                <div className="relative" style={{ transform: "translateZ(50px)" }}>
                  <div className="mb-4 flex items-center gap-3">
                    <motion.div
                      className={`rounded-xl bg-gradient-to-br ${category.color} p-3 text-white`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <category.icon className="h-5 w-5" />
                    </motion.div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {category.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{
                          duration: 0.4,
                          delay: categoryIndex * 0.1 + skillIndex * 0.05,
                        }}
                        whileHover={{ 
                          scale: 1.15, 
                          backgroundColor: "oklch(0.7 0.18 200 / 0.2)",
                          borderColor: "oklch(0.7 0.18 200 / 0.5)",
                          color: "oklch(0.95 0 0)",
                        }}
                        className="rounded-full border border-border/50 bg-secondary/50 px-3 py-1.5 text-sm font-medium text-muted-foreground transition-all cursor-pointer"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
