"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Zap,
  TrendingUp,
  Building2,
  Layers,
  GitBranch,
  BookOpen,
} from "lucide-react";

const tabs = [
  {
    name: "The Big Picture",
    href: "/",
    icon: Zap,
    description: "AI + Revenue",
  },
  {
    name: "Jevons' Paradox",
    href: "/jevons",
    icon: TrendingUp,
    description: "Why cheaper = bigger",
  },
  {
    name: "The New Org",
    href: "/org",
    icon: Building2,
    description: "Restructuring",
  },
  {
    name: "Service Lines",
    href: "/services",
    icon: Layers,
    description: "Revenue",
  },
  {
    name: "Scenarios",
    href: "/scenarios",
    icon: GitBranch,
    description: "What if?",
  },
  {
    name: "Glossary",
    href: "/glossary",
    icon: BookOpen,
    description: "Definitions",
  },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-card-border bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white font-bold text-sm">
              AI
            </div>
            <span className="font-semibold text-lg tracking-tight">
              AIFUTURE
            </span>
          </div>
          <div className="flex items-center gap-1">
            {tabs.map((tab) => {
              const isActive =
                pathname === tab.href ||
                (tab.href !== "/" && pathname.startsWith(tab.href));
              const Icon = tab.icon;
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all",
                    isActive
                      ? "bg-accent/15 text-accent-light"
                      : "text-muted hover:text-foreground hover:bg-hover-bg"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden lg:inline">{tab.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
