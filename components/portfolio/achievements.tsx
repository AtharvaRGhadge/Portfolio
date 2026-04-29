"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Trophy, Award, Medal, Languages } from "lucide-react";

const achievements = [
  {
    title: "MMCOE Game X Innovate",
    organization: "Hacksprint v7.0 2026",
    description: "Finalist in the prestigious hackathon competition showcasing innovative solutions.",
    icon: Trophy,
    color: "from-yellow-500 to-amber-500",
    glowColor: "oklch(0.8 0.15 85)",
  },
  {
    title: "PCCOE International Grand Challenge",
    organization: "Hackathon 2025",
    description: "Selected for Round 2 among top teams shortlisted for the international challenge.",
    icon: Medal,
    color: "from-cyan-500 to-blue-500",
    glowColor: "oklch(0.7 0.18 200)",
  },
  {
    title: "Aavishkar Research Competition",
    organization: "2025",
    description: "Qualified for Institutional & Zonal levels of the inter-university research competition.",
    icon: Award,
    color: "from-purple-500 to-pink-500",
    glowColor: "oklch(0.6 0.25 310)",
  },
  {
    title: "JLPT Japanese Proficiency",
    organization: "N5 & N4 Certified",
    description: "Scored 97.9%ile in JLPT N5 and 96.3%ile in N4, demonstrating international language proficiency.",
    icon: Languages,
    color: "from-red-500 to-rose-500",
    glowColor: "oklch(0.6 0.25 25)",
  },
];

function AchievementCard({ achievement, index, isInView }: { achievement: typeof achievements[0]; index: number; isInView: boolean }) {
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
      initial={{ opacity: 0, y: 30, rotateX: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
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
        y: -12,
        boxShadow: `0 20px 40px ${achievement.glowColor}30, 0 0 60px ${achievement.glowColor}15`,
      }}
      className="glass-card group relative overflow-hidden rounded-2xl p-6 text-center transition-all hover:border-primary/30 cursor-pointer"
    >
      {/* Gradient background on hover */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${achievement.color}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Animated border glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${achievement.glowColor}40, transparent 50%, ${achievement.glowColor}40)`,
        }}
      />
      
      {/* Floating particles */}
      {isHovered && [...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute h-1 w-1 rounded-full bg-gradient-to-r ${achievement.color}`}
          initial={{ 
            x: "50%", 
            y: "50%", 
            opacity: 0 
          }}
          animate={{
            x: `${30 + i * 20}%`,
            y: `${20 + i * 25}%`,
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}

      <div className="relative" style={{ transform: "translateZ(30px)" }}>
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={isInView ? { scale: 1, rotate: 0 } : {}}
          transition={{
            duration: 0.6,
            delay: index * 0.1 + 0.3,
            type: "spring",
            stiffness: 200,
          }}
          whileHover={{ 
            scale: 1.15, 
            rotate: 10,
          }}
          className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${achievement.color} text-white shadow-lg`}
        >
          <achievement.icon className="h-8 w-8" />
        </motion.div>

        <motion.h3 
          className="mb-1 text-lg font-bold text-foreground"
          whileHover={{ scale: 1.02 }}
        >
          {achievement.title}
        </motion.h3>
        <motion.p 
          className="mb-2 text-sm font-medium text-primary"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.1 + 0.4 }}
        >
          {achievement.organization}
        </motion.p>
        <motion.p 
          className="text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.1 + 0.5 }}
        >
          {achievement.description}
        </motion.p>
      </div>
    </motion.div>
  );
}

export function Achievements() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="achievements" className="relative py-24 sm:py-32">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-64 w-64 rounded-full bg-primary/5 blur-3xl"
            style={{
              left: `${20 + i * 30}%`,
              top: `${30 + (i % 2) * 40}%`,
            }}
            animate={{
              y: [0, -30, 0],
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              delay: i * 1,
              ease: "easeInOut",
            }}
          />
        ))}
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
            Recognition
          </motion.span>
          <h2 className="mb-6 text-3xl font-bold text-foreground sm:text-4xl md:text-5xl text-balance">
            Achievements & Awards
          </h2>
        </motion.div>

        {/* Achievements */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {achievements.map((achievement, index) => (
            <AchievementCard 
              key={achievement.title} 
              achievement={achievement} 
              index={index} 
              isInView={isInView} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
