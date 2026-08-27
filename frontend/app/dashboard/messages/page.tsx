"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Inbox,
  Mail,
  User,
  RefreshCw,
  Loader2,
  XCircle,
  MessageSquare,
  Briefcase,
} from "lucide-react";
import { StaggerGroup, StaggerItem } from "../../components/ui/StaggerGroup";
import { authFetch } from "../../../lib/auth";

// 1. تحديث الواجهة لتطابق Prisma Model الجديد
interface Message {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  ServiceType: string;
  createdAt: string;
}

const API_URL = "/api/messages";

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMessagesApi = async (): Promise<Message[]> => {
    const response = await authFetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch messages");
    }

    return response.json();
  };

  useEffect(() => {
    fetchMessagesApi()
      .then((data) => setMessages(data))
      .catch((err) => {
        console.error("Error fetching messages:", err);
        setError(
          "Something went wrong while loading messages. Please try again.",
        );
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    setError(null);
    fetchMessagesApi()
      .then((data) => setMessages(data))
      .catch((err) => {
        console.error("Error fetching messages:", err);
        setError(
          "Something went wrong while loading messages. Please try again.",
        );
      })
      .finally(() => setIsLoading(false));
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <section className="relative flex-1 overflow-hidden bg-background py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10 lg:px-20">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 font-mono text-xs font-medium tracking-[0.15em] text-foreground-secondary transition-colors duration-300 hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
          BACK TO DASHBOARD
        </Link>

        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-baseline gap-2 font-mono">
              <span className="text-sm tracking-[0.7px] text-white">
                CORVUS
              </span>
              <span className="text-xs font-medium tracking-[0.2em] text-accent">
                INBOX
              </span>
            </div>
            <h1 className="font-heading mt-3 text-4xl font-medium leading-[0.95] tracking-tight sm:text-5xl">
              Messages
            </h1>
            <p className="font-sans mt-4 text-sm leading-relaxed text-foreground-secondary">
              All messages received through the contact form.
            </p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="inline-flex items-center justify-center gap-2 border border-border bg-white px-6 py-3 text-sm font-medium text-black transition-all duration-300 hover:bg-accent hover:text-white hover:shadow-[0_8px_30px_-8px_rgba(90,108,255,0.6)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-black"
          >
            <RefreshCw
              className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
              strokeWidth={1.5}
            />
            Refresh
          </button>
        </div>

        <div className="mt-10">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-surface py-20">
              <Loader2
                className="h-6 w-6 animate-spin text-accent"
                strokeWidth={1.5}
              />
              <p className="font-mono text-xs tracking-[0.2em] text-foreground-secondary">
                LOADING MESSAGES...
              </p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-red-500/40 bg-red-500/10 px-6 py-20 text-center">
              <XCircle className="h-8 w-8 text-red-400" strokeWidth={1.5} />
              <p className="font-mono text-[11px] font-medium tracking-[0.2em] text-red-400">
                ERROR
              </p>
              <p className="max-w-md text-sm leading-relaxed text-foreground">
                {error}
              </p>
              <button
                onClick={handleRefresh}
                className="inline-flex items-center gap-2 border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-border-strong hover:bg-background-secondary"
              >
                <RefreshCw className="h-4 w-4" strokeWidth={1.5} />
                Try Again
              </button>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-surface py-20">
              <Inbox
                className="h-8 w-8 text-foreground-muted"
                strokeWidth={1.5}
              />
              <p className="font-heading text-xl font-medium text-foreground">
                No messages yet
              </p>
              <p className="text-sm text-foreground-secondary">
                Messages sent through the contact form will appear here.
              </p>
            </div>
          ) : (
            <StaggerGroup className="flex flex-col gap-4">
              <p className="font-mono text-xs font-medium tracking-[0.2em] text-foreground-secondary">
                {messages.length}{" "}
                {messages.length === 1 ? "MESSAGE" : "MESSAGES"}
              </p>
              {messages.map((message) => (
                <StaggerItem key={message.id}>
                  <article className="rounded-2xl border border-border bg-surface p-6 transition-colors duration-300 hover:border-border-strong md:p-8">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-border text-accent">
                          <User className="h-4 w-4" strokeWidth={1.5} />
                        </div>
                        <div>
                          {/* 2. دمج الاسم الأول والأخير */}
                          <p className="font-heading text-base font-medium text-foreground">
                            {message.firstName} {message.lastName}
                          </p>
                          <a
                            href={`mailto:${message.email}`}
                            className="flex items-center gap-1.5 text-xs text-foreground-secondary transition-colors duration-300 hover:text-accent"
                          >
                            <Mail className="h-3.5 w-3.5" strokeWidth={1.5} />
                            {message.email}
                          </a>
                        </div>
                      </div>
                      <p className="font-mono text-xs text-foreground-muted">
                        {formatDate(message.createdAt)}
                      </p>
                    </div>

                    {/* 3. عرض نوع الخدمة (ServiceType) */}
                    {message.ServiceType && (
                      <div className="mt-4 flex items-center gap-2">
                        <Briefcase
                          className="h-3.5 w-3.5 text-accent shrink-0"
                          strokeWidth={1.5}
                        />
                        <div className="flex flex-wrap gap-1.5">
                          {message.ServiceType.split(",").map(
                            (service, idx) => (
                              <span
                                key={idx}
                                className="rounded-full border border-border bg-background-secondary px-2.5 py-0.5 text-[11px] font-mono text-foreground-secondary"
                              >
                                {service.trim()}
                              </span>
                            ),
                          )}
                        </div>
                      </div>
                    )}

                    <div className="mt-5 flex items-start gap-3 border-t border-border pt-5">
                      <MessageSquare
                        className="mt-0.5 h-4 w-4 shrink-0 text-foreground-muted"
                        strokeWidth={1.5}
                      />
                      <p className="text-sm leading-relaxed text-foreground-secondary">
                        {message.message}
                      </p>
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </StaggerGroup>
          )}
        </div>
      </div>
    </section>
  );
}
