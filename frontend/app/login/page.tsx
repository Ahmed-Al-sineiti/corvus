"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import Container from "../components/layout/Container";

const API_URL = "http://localhost:5000/api/login";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);
    setAlert(null);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const contentType = response.headers.get("content-type");

      if (!contentType?.includes("application/json")) {
        const text = await response.text();

        console.error("Server returned non-JSON response:", text);

        throw new Error("Invalid response from server");
      }

      const data = await response.json();

      console.log("Login response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Invalid email or password");
      }

      if (!data.token) {
        throw new Error("Login succeeded but no token was returned");
      }

      localStorage.setItem("token", data.token);

      setAlert({
        type: "success",
        message: "Login successful. Redirecting...",
      });

      router.replace("/dashboard");
    } catch (error) {
      console.error("Error logging in:", error);

      let message =
        "Invalid credentials or server unreachable. Please try again.";

      if (error instanceof Error) {
        if (error.message === "Failed to fetch") {
          message =
            "Unable to connect to the server. Make sure the backend is running.";
        } else if (error.message) {
          message = error.message;
        }
      }

      setAlert({
        type: "error",
        message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative flex-1 overflow-hidden bg-background bg-noise py-12 md:py-16">
      <Container className="relative z-10">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8 flex items-baseline gap-2 font-mono">
            <span className="text-sm tracking-[0.7px] text-white">CORVUS</span>

            <span className="text-xs font-medium tracking-[0.2em] text-accent">
              LOGIN
            </span>
          </div>

          <h1 className="font-heading text-4xl font-medium leading-[0.95] tracking-tight sm:text-5xl">
            Welcome back.
          </h1>

          <p className="mt-4 font-sans text-sm leading-relaxed text-foreground-secondary sm:text-base">
            Sign in to access your studio dashboard.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-10 rounded-3xl border border-[#2b2b2b] bg-[#0a0a0a] p-6 shadow-2xl md:p-8"
          >
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="font-mono text-xs font-medium tracking-[0.15em] text-foreground-secondary"
              >
                EMAIL ADDRESS
              </label>

              <div className="mt-2 flex items-center gap-3 rounded-2xl border border-[#2b2b2b] bg-[#0f0f0f] px-4 py-3.5 transition-all duration-300 hover:border-[#3b3b3b] hover:bg-white/[0.02] focus-within:border-[#555] focus-within:bg-white/[0.03]">
                <Mail
                  className="h-4 w-4 shrink-0 text-foreground-secondary/70"
                  strokeWidth={1.5}
                />

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  autoComplete="email"
                  className="w-full bg-transparent text-sm text-foreground placeholder:text-foreground-secondary focus:outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div className="mt-6">
              <label
                htmlFor="password"
                className="font-mono text-xs font-medium tracking-[0.15em] text-foreground-secondary"
              >
                PASSWORD
              </label>

              <div className="mt-2 flex items-center gap-3 rounded-2xl border border-[#2b2b2b] bg-[#0f0f0f] px-4 py-3.5 transition-all duration-300 hover:border-[#3b3b3b] hover:bg-white/[0.02] focus-within:border-[#555] focus-within:bg-white/[0.03]">
                <Lock
                  className="h-4 w-4 shrink-0 text-foreground-secondary/70"
                  strokeWidth={1.5}
                />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                  className="w-full bg-transparent text-sm text-foreground placeholder:text-foreground-secondary focus:outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="shrink-0 rounded-full p-1 text-foreground-secondary transition-colors duration-200 hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" strokeWidth={1.5} />
                  ) : (
                    <Eye className="h-4 w-4" strokeWidth={1.5} />
                  )}
                </button>
              </div>
            </div>

            {/* Alert */}
            {alert && (
              <div
                role="alert"
                aria-live="assertive"
                className={`mt-6 flex items-start gap-3 rounded-2xl border px-4 py-3.5 ${
                  alert.type === "success"
                    ? "border-accent/30 bg-accent/10"
                    : "border-red-500/40 bg-red-500/10"
                }`}
              >
                {alert.type === "success" ? (
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                ) : (
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
                )}

                <p className="text-sm leading-relaxed text-foreground">
                  {alert.message}
                </p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-sm font-medium text-black transition-all duration-300 hover:scale-[0.99] hover:bg-[#e6e6e6] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 disabled:hover:bg-white"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
}
