"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { GraduationCap, Briefcase, Trophy, Brain } from "lucide-react";

const stats = [
  {
    icon: GraduationCap,
    value: "9.5",
    label: "CGPA",
    description: "Academic Excellence",
    color: "oklch(0.7 0.18 200)",
  },
  {
    icon: Briefcase,
    value: "1",
    label: "Internship",
    description: "Industry Experience",
    color: "oklch(0.65 0.2 180)",
  },
  {
    icon: Trophy,
    value: "3+",
    label: "Hackathons",
    description: "Finalist & Qualifier",
    color: "oklch(0.7 0.2 60)",
  },
  {
    icon: Brain,
    value: "2+",
    label: "AI Projects",
    description: "Built & Deployed",
    color: "oklch(0.6 0.25 310)",
  },
];

function CountUp({ value, isInView }: { value: string; isInView: boolean }) {
  const numericValue = parseFloat(value.replace('+', ''));
  const hasPlus = value.includes('+');
  
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        {value}
      </motion.span>
    </motion.span>
  );
}

function StatCard({ stat, index, isInView }: { stat: typeof stats[0]; index: number; isInView: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 300 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
      style={{ 
        rotateX: isHovered ? rotateX : 0, 
        rotateY: isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
      }}
      whileHover={{ 
        boxShadow: `0 0 40px ${stat.color}30, 0 0 80px ${stat.color}15`,
      }}
      className="glass-card group rounded-2xl p-6 transition-all hover:border-primary/30 cursor-pointer"
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${stat.color}20, transparent 70%)`,
        }}
      />
      
      <div className="relative" style={{ transform: "translateZ(30px)" }}>
        <motion.div 
          className="mb-4 inline-flex rounded-xl bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary/20"
          whileHover={{ scale: 1.2, rotate: 10 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <stat.icon className="h-6 w-6" />
        </motion.div>
        <motion.div 
          className="text-3xl font-bold text-foreground sm:text-4xl"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ type: "spring", delay: 0.7 + index * 0.1 }}
        >
          <CountUp value={stat.value} isInView={isInView} />
        </motion.div>
        <motion.div 
          className="text-sm font-medium text-primary"
          whileHover={{ x: 5 }}
        >
          {stat.label}
        </motion.div>
        <div className="mt-1 text-xs text-muted-foreground">
          {stat.description}
        </div>
      </div>
    </motion.div>
  );
}

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const words = "Passionate about building".split(" ");

  return (
    <section id="about" className="relative py-24 sm:py-32">
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
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            About Me
          </motion.span>
          <h2 className="mb-6 text-3xl font-bold text-foreground sm:text-4xl md:text-5xl text-balance">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="inline-block mr-2"
              >
                {word}
              </motion.span>
            ))}
            <motion.span 
              className="text-gradient"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {" impactful solutions"}
            </motion.span>
          </h2>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <motion.div 
              className="glass-card rounded-2xl p-6 sm:p-8 group"
              whileHover={{ 
                boxShadow: "0 0 40px oklch(0.7 0.18 200 / 0.15)",
                borderColor: "oklch(0.7 0.18 200 / 0.3)",
              }}
            >
              <motion.p 
                className="text-lg leading-relaxed text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.3 }}
              >
                {"I'm a "}
                <motion.span 
                  className="font-semibold text-foreground"
                  whileHover={{ color: "oklch(0.7 0.18 200)" }}
                >
                  Computer Engineering student
                </motion.span>
                {" at Savitribai Phule Pune University with a passion for creating elegant web experiences and exploring the frontiers of artificial intelligence."}
              </motion.p>
              <motion.p 
                className="mt-4 text-lg leading-relaxed text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4 }}
              >
                {"My journey spans from crafting responsive, role-specific dashboards using "}
                <motion.span 
                  className="text-primary"
                  whileHover={{ scale: 1.05 }}
                  style={{ display: "inline-block" }}
                >
                  React.js
                </motion.span>
                {" at Springer Capital to developing AI-powered solutions like microplastic detection using YOLO. I believe in writing clean, maintainable code and staying at the cutting edge of technology."}
              </motion.p>
              <motion.p 
                className="mt-4 text-lg leading-relaxed text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.5 }}
              >
                {"When I'm not coding, you'll find me participating in hackathons, qualifying for research competitions, or expanding my skills with certifications like Oracle OCI AI Foundations."}
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, index) => (
              <StatCard 
                key={stat.label} 
                stat={stat} 
                index={index} 
                isInView={isInView} 
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
