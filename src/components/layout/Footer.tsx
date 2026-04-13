"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Send,
  Github,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const footerLinks = {
  platform: [
    { name: "Find Tutors", href: "/tutors" },
    { name: "Tutor Application", href: "/register" },
    { name: "Success Stories", href: "/about" },
  ],
  support: [
    { name: "About Us", href: "/about" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Contact Support", href: "/contact" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Github, href: "#", label: "Github" },
];

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t bg-slate-50 dark:bg-slate-950/50">
      {/* 📧 Newsletter Pre-footer Section */}

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand & Description */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="p-1.5 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Image
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg"
                  className="dark:invert"
                  alt="SkillBridge Logo"
                  width={28}
                  height={28}
                />
              </div>
              <span className="text-xl font-bold tracking-tight">
                SkillBridge
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Empowering the next generation of thinkers by connecting them with
              world-class mentors. Learn smarter, grow faster, and achieve your
              goals.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social, i) => (
                <Link
                  key={i}
                  href={social.href}
                  className="p-2.5 rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-all text-muted-foreground"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links Group 1 */}
          <div className="flex flex-col gap-5 lg:pl-10">
            <h4 className="text-sm font-bold uppercase tracking-widest text-primary">
              Platform
            </h4>
            <ul className="flex flex-col gap-3">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Group 2 */}
          <div className="flex flex-col gap-5 lg:pl-10">
            <h4 className="text-sm font-bold uppercase tracking-widest text-primary">
              Company
            </h4>
            <ul className="flex flex-col gap-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col gap-5">
            <h4 className="text-sm font-bold uppercase tracking-widest text-primary">
              Get in Touch
            </h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span>support@skill-bridge.com</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-muted-foreground font-medium">
            © {new Date().getFullYear()} SkillBridge Inc. Built with passion for
            education.
          </p>
          <div className="flex items-center gap-8">
            <Link
              href="/privacy"
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
