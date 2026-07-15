import {
  Briefcase,
  Code2,
  GraduationCap,
  Laptop,
  LayoutDashboard,
  Megaphone,
  Palette,
} from "lucide-react";

import type { TemplateCategory } from "@/lib/api/templates";

export interface TemplateCategoryItem {
  label: string;
  slug: string;
  value: TemplateCategory;
  icon: React.ComponentType<{ className?: string }>;
  tileClassName: string;
}

export const TEMPLATE_CATEGORIES: TemplateCategoryItem[] = [
  {
    label: "Business",
    slug: "business",
    value: "BUSINESS",
    icon: Briefcase,
    tileClassName: "bg-sky-600",
  },
  {
    label: "Design",
    slug: "design",
    value: "DESIGN",
    icon: Palette,
    tileClassName: "bg-rose-500",
  },
  {
    label: "Education",
    slug: "education",
    value: "EDUCATION",
    icon: GraduationCap,
    tileClassName: "bg-amber-600",
  },
  {
    label: "Engineering",
    slug: "engineering",
    value: "ENGINEERING",
    icon: Code2,
    tileClassName: "bg-slate-500",
  },
  {
    label: "Marketing",
    slug: "marketing",
    value: "MARKETING",
    icon: Megaphone,
    tileClassName: "bg-teal-600",
  },
  {
    label: "Product management",
    slug: "product-management",
    value: "PRODUCT_MANAGEMENT",
    icon: LayoutDashboard,
    tileClassName: "bg-violet-600",
  },
  {
    label: "Remote work",
    slug: "remote-work",
    value: "REMOTE_WORK",
    icon: Laptop,
    tileClassName: "bg-indigo-700",
  },
];

export function getTemplateCategoryBySlug(slug: string): TemplateCategoryItem | undefined {
  return TEMPLATE_CATEGORIES.find((category) => category.slug === slug);
}
