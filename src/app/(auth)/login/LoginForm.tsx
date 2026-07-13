"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { loginSchema, LoginInput } from "@/lib/validation/auth";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { LogIn, User, ShieldCheck } from "lucide-react";
import { useAuth } from "@/components/layout/AuthContext";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshUser } = useAuth();
  const redirect = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (searchParams.get("registered") === "true") {
      toast.success("Account created successfully! Please login.");
    }
  }, [searchParams]);
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const fillDemo = (email: string, password: string) => {
    setValue("email", email);
    setValue("password", password);
  };

  async function onSubmit(data: LoginInput) {
    setServerError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setServerError(json.message || "Login failed");
        return;
      }
      await refreshUser();
      toast.success("Logged in successfully!");
      router.push(redirect);
    } catch {
      setServerError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8">
        <h1 className="text-2xl font-bold text-dark font-heading text-center mb-6">
          Welcome Back
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register("email")}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            error={errors.password?.message}
            {...register("password")}
          />

          {serverError && (
            <p className="text-sm text-red-500 text-center">{serverError}</p>
          )}

          <div className="pt-2">
            <p className="text-xs text-body/60 text-center mb-2">Demo Login</p>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="flex-1"
                onClick={() => fillDemo("demo.user@wanderly.app", "Demo@1234")}
              >
                <User className="w-3.5 h-3.5 mr-1.5" />
                Demo User
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="flex-1"
                onClick={() => fillDemo("demo.admin@wanderly.app", "Admin@1234")}
              >
                <ShieldCheck className="w-3.5 h-3.5 mr-1.5" />
                Demo Admin
              </Button>
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            <LogIn className="w-4 h-4 mr-2" />
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <p className="mt-6 text-sm text-center text-body">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary font-medium hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
