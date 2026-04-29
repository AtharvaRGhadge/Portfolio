"use client";

import { motion, useMotionValue, useSpring, type Variants } from "framer-motion";
import { FileText, Mail, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
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

  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

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
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
}

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  // FIXED TYPING
  const textVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
    },

    visible: (i: number) => ({
      opacity: 1,
      y: 0,

      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1] as const,
      },
    }),
  };

  // FIXED TYPING
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
        delay: 0.5 + i * 0.03,
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1] as const,
      },
    }),
  };

  const name = "Atharva Ghadge";

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* keep ALL your existing code below unchanged */}

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          <motion.span
            className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
            whileHover={{
              scale: 1.05,
              borderColor: "oklch(0.7 0.18 200 / 0.6)",
              boxShadow: "0 0 20px oklch(0.7 0.18 200 / 0.3)",
            }}
            transition={{ duration: 0.2 }}
          >
            Welcome to my portfolio
          </motion.span>
        </motion.div>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="mb-6 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
        >
          <span>{"Hi, I'm "}</span>

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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 1,
          }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <MagneticButton
            onClick={() => scrollToSection("projects")}
            className="group relative overflow-hidden rounded-full bg-primary px-8 py-4 text-primary-foreground"
          >
            <span className="relative z-10 flex items-center gap-2 font-medium">
              View Projects

              <motion.span
                animate={{ y: [0, 4, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              >
                {/* FIXED ArrowDown */}
                <ArrowDown className="h-4 w-4" />
              </motion.span>
            </span>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}