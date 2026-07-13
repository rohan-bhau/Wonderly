"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X, ChevronDown, LogOut, User, PlusCircle, List, Calendar } from "lucide-react";
import Button from "@/components/ui/Button";
import { useAuth } from "./AuthContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/tours", label: "Tours" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, loading, logout } = useAuth();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const linkClass = (href: string) =>
    `text-sm transition-colors ${
      isActive(href)
        ? "text-primary font-semibold"
        : "text-body hover:text-primary"
    }`;

  const handleLogout = async () => {
    await logout();
    setProfileOpen(false);
    router.push("/");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 h-16 bg-white/90 backdrop-blur-md border-b border-border/30">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary font-heading">
            Wanderly
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={linkClass(link.href)}
            >
              {link.label}
            </Link>
          ))}
          {user?.role === "admin" && (
            <>
              <Link
                href="/items/add"
                className={linkClass("/items/add")}
              >
                Add Tour
              </Link>
              <Link
                href="/items/manage"
                className={linkClass("/items/manage")}
              >
                My Tours
              </Link>
            </>
          )}
          {user && user.role !== "admin" && (
            <Link
              href="/items/bookings"
              className={linkClass("/items/bookings")}
            >
              My Booked Tours
            </Link>
          )}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {loading ? null : user ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 text-sm text-body hover:text-primary transition-colors"
              >
                <User className="w-5 h-5" />
                <span className="font-medium">{user.name}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-border/30 py-2">
                  {user?.role === "admin" && (
                    <>
                      <Link
                        href="/items/add"
                        onClick={() => setProfileOpen(false)}
                        className={`flex items-center gap-2 px-4 py-2 text-sm transition-colors ${
                          isActive("/items/add")
                            ? "text-primary font-semibold bg-filter-bg"
                            : "text-body hover:bg-filter-bg"
                        }`}
                      >
                        <PlusCircle className="w-4 h-4" />
                        Add Tour
                      </Link>
                      <Link
                        href="/items/manage"
                        onClick={() => setProfileOpen(false)}
                        className={`flex items-center gap-2 px-4 py-2 text-sm transition-colors ${
                          isActive("/items/manage")
                            ? "text-primary font-semibold bg-filter-bg"
                            : "text-body hover:bg-filter-bg"
                        }`}
                      >
                        <List className="w-4 h-4" />
                        My Tours
                      </Link>
                    </>
                  )}
          {user && user.role !== "admin" && (
                    <Link
                      href="/items/bookings"
                      onClick={() => setProfileOpen(false)}
                      className={`flex items-center gap-2 px-4 py-2 text-sm transition-colors ${
                        isActive("/items/bookings")
                          ? "text-primary font-semibold bg-filter-bg"
                          : "text-body hover:bg-filter-bg"
                      }`}
                    >
                      <Calendar className="w-4 h-4" />
                      My Booked Tours
                    </Link>
                  )}
                  <hr className="my-1 border-border/30" />
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-body hover:bg-filter-bg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Register</Button>
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-body"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-border/30 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block text-sm transition-colors ${
                isActive(link.href)
                  ? "text-primary font-semibold"
                  : "text-body hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {user?.role === "admin" && (
            <>
              <Link
                href="/items/add"
                onClick={() => setMobileOpen(false)}
                className={`block text-sm transition-colors ${
                  isActive("/items/add")
                    ? "text-primary font-semibold"
                    : "text-body hover:text-primary"
                }`}
              >
                Add Tour
              </Link>
              <Link
                href="/items/manage"
                onClick={() => setMobileOpen(false)}
                className={`block text-sm transition-colors ${
                  isActive("/items/manage")
                    ? "text-primary font-semibold"
                    : "text-body hover:text-primary"
                }`}
              >
                My Tours
              </Link>
            </>
          )}
          {user && user.role !== "admin" && (
            <Link
              href="/items/bookings"
              onClick={() => setMobileOpen(false)}
              className={`block text-sm transition-colors ${
                isActive("/items/bookings")
                  ? "text-primary font-semibold"
                  : "text-body hover:text-primary"
              }`}
            >
              My Booked Tours
            </Link>
          )}
          <div className="pt-2 flex flex-col gap-2">
            {user ? (
              <Button
                variant="secondary"
                size="sm"
                className="w-full"
                onClick={() => {
                  handleLogout();
                  setMobileOpen(false);
                }}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="ghost" size="sm" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setMobileOpen(false)}>
                  <Button size="sm" className="w-full">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
