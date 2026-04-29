"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Mail, Phone, MapPin, Github, Linkedin, ArrowUpRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "raghadge1979@gmail.com",
    href: "mailto:raghadge1979@gmail.com",
    color: "oklch(0.7 0.18 200)",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 78928 28601",
    href: "tel:+917892828601",
    color: "oklch(0.65 0.2 180)",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Pune, Maharashtra, India",
    href: "#",
    color: "oklch(0.6 0.25 310)",
  },
];

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/AtharvaRGhadge",
    color: "oklch(0.7 0.18 200)",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/atharva-ghadge",
    color: "oklch(0.6 0.2 250)",
  },
];

function ContactInfoCard({ info, index, isInView }: { info: typeof contactInfo[0]; index: number; isInView: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={info.href}
      initial={{ opacity: 0, y: 20, x: -30 }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
      whileHover={{ 
        scale: 1.03, 
        x: 8,
        boxShadow: `0 0 30px ${info.color}20`,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="glass-card flex items-center gap-4 rounded-xl p-4 transition-all hover:border-primary/30 cursor-pointer relative overflow-hidden"
    >
      {/* Animated gradient on hover */}
      <motion.div
        className="absolute inset-0 opacity-0"
        animate={{ opacity: isHovered ? 0.1 : 0 }}
        style={{
          background: `linear-gradient(135deg, ${info.color}, transparent)`,
        }}
      />
      
      <motion.div 
        className="rounded-lg bg-primary/10 p-3 text-primary relative z-10"
        animate={isHovered ? { 
          rotate: [0, -10, 10, 0],
          scale: 1.1,
        } : {}}
        transition={{ duration: 0.5 }}
      >
        <info.icon className="h-5 w-5" />
      </motion.div>
      <div className="relative z-10">
        <p className="text-xs text-muted-foreground">{info.label}</p>
        <p className="font-medium text-foreground">{info.value}</p>
      </div>
      
      {/* Arrow indicator */}
      <motion.div
        className="ml-auto relative z-10"
        initial={{ opacity: 0, x: -10 }}
        animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
      >
        <ArrowUpRight className="h-4 w-4 text-primary" />
      </motion.div>
    </motion.a>
  );
}

function SocialButton({ social, index, isInView }: { social: typeof socialLinks[0]; index: number; isInView: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
      whileHover={{ 
        scale: 1.08, 
        y: -5,
        boxShadow: `0 10px 30px ${social.color}30`,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group flex items-center gap-2 rounded-xl border border-border/50 bg-secondary/30 px-4 py-3 transition-all hover:border-primary/50 hover:bg-secondary relative overflow-hidden"
    >
      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 opacity-0"
        animate={isHovered ? {
          opacity: [0, 0.3, 0],
          x: ["-100%", "100%"],
        } : {}}
        transition={{ duration: 0.6 }}
        style={{
          background: `linear-gradient(90deg, transparent, ${social.color}40, transparent)`,
        }}
      />
      
      <motion.div
        animate={isHovered ? { rotate: 360 } : {}}
        transition={{ duration: 0.5 }}
      >
        <social.icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary relative z-10" />
      </motion.div>
      <span className="text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground relative z-10">
        {social.label}
      </span>
      <motion.div
        animate={isHovered ? { x: 3, y: -3 } : { x: 0, y: 0 }}
        className="relative z-10"
      >
        <ArrowUpRight className="h-4 w-4 text-muted-foreground/50 transition-all group-hover:text-primary" />
      </motion.div>
    </motion.a>
  );
}

export function Contact() {
  const ref = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 200 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!formRef.current) return;
    const rect = formRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormState({ name: "", email: "", message: "" });
    }, 1500);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      {/* Animated background accent */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute bottom-0 left-1/2 h-[600px] w-[600px] -translate-x-1/2 translate-y-1/2 rounded-full bg-primary/5 blur-3xl"
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

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
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
            Get in Touch
          </motion.span>
          <motion.h2 
            className="mb-6 text-3xl font-bold text-foreground sm:text-4xl md:text-5xl text-balance"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            {"Let's work together"}
          </motion.h2>
          <motion.p 
            className="mx-auto max-w-2xl text-lg text-muted-foreground text-pretty"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            {"Have a project in mind or want to collaborate? Feel free to reach out!"}
          </motion.p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Form with 3D tilt */}
          <motion.div
            initial={{ opacity: 0, x: -50, rotateY: -10 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.form 
              ref={formRef}
              onSubmit={handleSubmit} 
              style={{ 
                rotateX, 
                rotateY,
                transformStyle: "preserve-3d",
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => {
                x.set(0);
                y.set(0);
              }}
              className="glass-card rounded-2xl p-6 sm:p-8 relative"
            >
              {/* Decorative sparkle */}
              <motion.div
                className="absolute top-4 right-4 text-primary/30"
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
                <Sparkles className="h-6 w-6" />
              </motion.div>

              <FieldGroup>
                <Field>
                  <FieldLabel>Name</FieldLabel>
                  <motion.div whileFocus={{ scale: 1.01 }}>
                    <Input
                      type="text"
                      placeholder="Your name"
                      value={formState.name}
                      onChange={(e) =>
                        setFormState({ ...formState, name: e.target.value })
                      }
                      className="rounded-xl border-border/50 bg-secondary/30 focus:border-primary focus:shadow-[0_0_20px_oklch(0.7_0.18_200_/_0.2)] transition-shadow"
                    />
                  </motion.div>
                </Field>

                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                    className="rounded-xl border-border/50 bg-secondary/30 focus:border-primary focus:shadow-[0_0_20px_oklch(0.7_0.18_200_/_0.2)] transition-shadow"
                  />
                </Field>

                <Field>
                  <FieldLabel>Message</FieldLabel>
                  <Textarea
                    placeholder="Your message..."
                    rows={5}
                    value={formState.message}
                    onChange={(e) =>
                      setFormState({ ...formState, message: e.target.value })
                    }
                    className="rounded-xl border-border/50 bg-secondary/30 focus:border-primary focus:shadow-[0_0_20px_oklch(0.7_0.18_200_/_0.2)] transition-shadow"
                  />
                </Field>
              </FieldGroup>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-6 w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90 glow-primary relative overflow-hidden group"
                  size="lg"
                >
                  {/* Button shine effect */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                    style={{
                      background: "linear-gradient(90deg, transparent, oklch(1 0 0 / 0.2), transparent)",
                    }}
                  />
                  
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                    />
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      Send Message
                    </>
                  )}
                </Button>
              </motion.div>
            </motion.form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Contact Details */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <ContactInfoCard 
                  key={info.label} 
                  info={info} 
                  index={index} 
                  isInView={isInView} 
                />
              ))}
            </div>

            {/* Social Links */}
            <motion.div 
              className="glass-card rounded-xl p-6 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9 }}
            >
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 opacity-30"
                animate={{
                  background: [
                    "radial-gradient(circle at 0% 0%, oklch(0.7 0.18 200 / 0.1), transparent 50%)",
                    "radial-gradient(circle at 100% 100%, oklch(0.7 0.18 200 / 0.1), transparent 50%)",
                    "radial-gradient(circle at 0% 0%, oklch(0.7 0.18 200 / 0.1), transparent 50%)",
                  ],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              <h3 className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground relative z-10">
                Connect with me
              </h3>
              <div className="flex gap-4 relative z-10">
                {socialLinks.map((social, index) => (
                  <SocialButton 
                    key={social.label} 
                    social={social} 
                    index={index} 
                    isInView={isInView} 
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
