"use client";

import { motion, useMotionValue, useSpring, type Variants } from "framer-motion";
import { FileText, Mail, ArrowDown } from "lucide-react";
import { useRef } from "react";

function MagneticButton({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, {
    damping: 15,
    stiffness: 150,
  });

  const springY = useSpring(y, {
    damping: 15,
    stiffness: 150,
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set((e.clientX - centerX) * 0.15);
    y.set((e.clientY - centerY) * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={className}
      whileTap={{ scale: 0.96 }}
    >
      {children}
    </motion.button>
  );
}

export function Hero() {
  const name = "Atharva Ghadge";

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const textVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
    },

    visible: (i: number) => ({
      opacity: 1,
      y: 0,

      transition: {
        delay: i * 0.12,
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1] as const,
      },
    }),
  };

  const letterVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -90,
    },

    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,

      transition: {
        delay: 0.45 + i * 0.03,
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1] as const,
      },
    }),
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Premium animated background */}
      <div className="absolute inset-0 nebula-bg" />
      <div className="absolute inset-0 cyber-grid opacity-30" />
      <div className="stars" />
      <div className="aurora-sweep" />

      {/* Giant floating orbs */}
      <motion.div
        className="absolute left-[10%] top-[15%] h-[520px] w-[520px] rounded-full bg-cyan-500/25 blur-[120px]"
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -60, 40, 0],
          scale: [1, 1.25, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute right-[8%] top-[20%] h-[460px] w-[460px] rounded-full bg-blue-500/20 blur-[110px]"
        animate={{
          x: [0, -70, 30, 0],
          y: [0, 50, -30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-[10%] left-[35%] h-[390px] w-[390px] rounded-full bg-violet-500/20 blur-[100px]"
        animate={{
          x: [0, 60, 0],
          y: [0, -40, 0],
          rotate: [0, 90, 180],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-cyan-400/70"
          style={{
            width: `${4 + i}px`,
            height: `${4 + i}px`,
            left: `${10 + i * 7}%`,
            top: `${20 + (i % 4) * 18}%`,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.8, 1],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.35,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Moving light sweep */}
      <motion.div
        className="absolute left-1/2 top-0 h-full w-64 -translate-x-1/2 bg-cyan-400/5 blur-[90px]"
        animate={{
          x: [-100, 100, -100],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Hero content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          <motion.span
            className="mt-12 mb-6 inline-block rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-sm font-medium text-primary backdrop-blur-md"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 30px rgba(0,255,255,.25)",
            }}
          >
            Welcome to my portfolio
          </motion.span>
        </motion.div>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="mb-8 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
        >
          <span className="text-white">Hi, I&apos;m </span>

          <span className="text-gradient inline-flex overflow-hidden">
            {name.split("").map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={letterVariants}
                className="inline-block"
                style={{
                  display: char === " " ? "inline" : "inline-block",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="mx-auto mb-12 max-w-2xl text-lg text-muted-foreground sm:text-xl"
        >
          Computer Engineering Student • Frontend Developer • AI Enthusiast
        </motion.p>

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 1,
          }}
          className="flex flex-col items-center justify-center gap-5 sm:flex-row"
        >
          <MagneticButton
            onClick={() => scrollToSection("projects")}
            className="group relative overflow-hidden rounded-full bg-primary px-10 py-5 text-primary-foreground glow-primary hover:shadow-[0_0_60px_rgba(0,255,255,.35)]"
          >
            <span className="relative z-10 flex items-center gap-2 font-semibold">
              View Projects

              <motion.span
                animate={{
                  y: [0, 5, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              >
                <ArrowDown className="h-5 w-5" />
              </motion.span>
            </span>

            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 via-blue-500/20 to-cyan-400/30"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
          </MagneticButton>

          <MagneticButton
            onClick={() => scrollToSection("resume")}
            className="glass rounded-full px-8 py-5 hover-lift"
          >
            <span className="flex items-center gap-2 font-medium">
              <FileText className="h-4 w-4" />
              Resume
            </span>
          </MagneticButton>

          <MagneticButton
            onClick={() => scrollToSection("contact")}
            className="glass rounded-full px-8 py-5 hover-lift"
          >
            <span className="flex items-center gap-2 font-medium">
              <Mail className="h-4 w-4" />
              Contact
            </span>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}