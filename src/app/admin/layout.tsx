"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { AdminProtected } from "@/components/AdminProtected";
import { signOut } from "@/lib/auth";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  User,
  FileText,
  Palette,
  Rocket,
  Lightbulb,
  Target,
  Wrench,
  Link as LinkIcon,
  Github,
  FolderOpen,
  Settings,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/profile", label: "Profil", icon: User },
  { href: "/admin/content", label: "Contenu", icon: FileText },
  { href: "/admin/appearance", label: "Apparence", icon: Palette },
  { href: "/admin/projects", label: "Projets", icon: Rocket },
  { href: "/admin/skills", label: "Compétences", icon: Lightbulb },
  { href: "/admin/goals", label: "Objectifs", icon: Target },
  { href: "/admin/tools", label: "Outils", icon: Wrench },
  { href: "/admin/navigation", label: "Navigation", icon: LinkIcon },
  { href: "/admin/github", label: "GitHub", icon: Github },
  { href: "/admin/media", label: "Médias", icon: FolderOpen },
  { href: "/admin/settings", label: "Paramètres", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProtected>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AdminProtected>
  );
}

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  async function handleLogout() {
    try {
      await signOut();
      router.push("/admin/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname?.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-apple-blue to-apple-purple flex items-center justify-center">
              <span className="text-white font-bold text-sm">NP</span>
            </div>
            <span className="font-semibold text-gray-900">Admin</span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isSidebarOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-40 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center gap-3 px-6 border-b border-gray-200">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-apple-blue to-apple-purple flex items-center justify-center shadow-lg">
            <span className="text-white font-bold">NP</span>
          </div>
          <div>
            <h1 className="font-bold text-gray-900">Nouk Prince</h1>
            <p className="text-xs text-gray-500">HQ Admin</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      active
                        ? "bg-apple-blue text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="border-t border-gray-200 p-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen pt-16 lg:pt-0">
        {/* Header */}
        <header className="hidden lg:block bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-6 h-16">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {navItems.find((item) => isActive(item.href))?.label || "Admin"}
              </h2>
              <p className="text-sm text-gray-500">
                Gérez votre contenu et vos paramètres
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="font-medium">Déconnexion</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
