"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { GraduationCap, Calendar, Award, Sparkles } from "lucide-react";

const educationData = [
  {
    degree: "B.E. Computer Engineering",
    institution: "Savitribai Phule Pune University",
    duration: "2023 - 2027",
    grade: "CGPA: 9.5",
    description:
      "Pursuing Bachelor of Engineering in Computer Engineering with a focus on software development, artificial intelligence, and data structures.",
    highlights: [
      "Dean's List for Academic Excellence",
      "Research in AI/ML applications",
    ],
  },
];

export function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 300 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section id="education" className="relative py-24 sm:py-32">
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute right-0 top-1/2 h-[400px] w-[400px] -translate-y-1/2 translate-x-1/2 rounded-full bg-accent/5 blur-3xl"
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

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
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
            Education
          </motion.span>
          <h2 className="mb-6 text-3xl font-bold text-foreground sm:text-4xl md:text-5xl text-balance">
            Academic Background
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Animated timeline line */}
          <motion.div 
            className="absolute left-8 top-0 w-px bg-gradient-to-b from-primary via-accent to-transparent md:left-1/2 md:-translate-x-1/2"
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          />

          {educationData.map((edu, index) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative pb-12"
            >
              {/* Timeline dot with pulse animation */}
              <div className="absolute left-8 top-0 -translate-x-1/2 md:left-1/2">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.2 + 0.3, type: "spring" }}
                  className="relative"
                >
                  {/* Pulse ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-4 border-background bg-primary glow-primary">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <GraduationCap className="h-6 w-6 text-primary-foreground" />
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              {/* Content card with 3D tilt */}
              <div className="ml-24 md:ml-0 md:w-1/2 md:pr-12 md:odd:ml-auto md:odd:pl-12 md:odd:pr-0">
                <motion.div
                  ref={cardRef}
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
                    boxShadow: "0 0 40px oklch(0.7 0.18 200 / 0.2)",
                  }}
                  className="glass-card rounded-2xl p-6 transition-all hover:border-primary/30 cursor-pointer"
                >
                  {/* Sparkle effect */}
                  <motion.div
                    className="absolute top-4 right-4 text-primary/50"
                    animate={{
                      rotate: [0, 180, 360],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Sparkles className="h-5 w-5" />
                  </motion.div>

                  <div className="mb-4 flex flex-wrap items-center gap-3" style={{ transform: "translateZ(20px)" }}>
                    <motion.span 
                      className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                      whileHover={{ scale: 1.1, backgroundColor: "oklch(0.7 0.18 200 / 0.2)" }}
                    >
                      <Calendar className="h-3 w-3" />
                      {edu.duration}
                    </motion.span>
                    <motion.span 
                      className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
                      whileHover={{ scale: 1.1, backgroundColor: "oklch(0.65 0.2 180 / 0.2)" }}
                    >
                      <Award className="h-3 w-3" />
                      {edu.grade}
                    </motion.span>
                  </div>

                  <motion.h3 
                    className="mb-1 text-xl font-bold text-foreground"
                    style={{ transform: "translateZ(30px)" }}
                  >
                    {edu.degree}
                  </motion.h3>
                  <motion.p 
                    className="mb-3 text-sm font-medium text-primary"
                    style={{ transform: "translateZ(25px)" }}
                  >
                    {edu.institution}
                  </motion.p>
                  <p className="mb-4 text-sm text-muted-foreground leading-relaxed" style={{ transform: "translateZ(15px)" }}>
                    {edu.description}
                  </p>

                  <div className="space-y-2" style={{ transform: "translateZ(20px)" }}>
                    {edu.highlights.map((highlight, i) => (
                      <motion.div
                        key={highlight}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.8 + i * 0.1 }}
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <motion.div 
                          className="h-1.5 w-1.5 rounded-full bg-primary"
                          animate={{
                            scale: [1, 1.5, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.3,
                          }}
                        />
                        {highlight}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
