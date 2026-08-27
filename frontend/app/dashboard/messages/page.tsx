"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Inbox,
  RefreshCw,
  Loader2,
  XCircle,
} from "lucide-react";
import { StaggerGroup, StaggerItem } from "../../components/ui/StaggerGroup";
import { authFetch } from "../../../lib/auth";

interface Message {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  ServiceType: string;
  createdAt: string;
}

const API_URL = "http://localhost:5000/api/messages";

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
      <div className="mx-auto w-full max-w-[1000px] px-6 md:px-10 lg:px-20">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 font-mono text-xs font-medium tracking-[0.15em] text-foreground-secondary transition-colors duration-300 hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
          BACK TO DASHBOARD
        </Link>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-heading text-3xl font-medium tracking-tight sm:text-4xl">
              Messages
            </h1>
            <p className="mt-2 text-sm text-foreground-secondary">
              All messages received through the contact form.
            </p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="inline-flex items-center gap-2 text-sm text-foreground-secondary transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
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
            <div className="flex flex-col items-center justify-center gap-3 py-20">
              <Loader2
                className="h-5 w-5 animate-spin text-foreground-muted"
                strokeWidth={1.5}
              />
              <p className="text-xs text-foreground-secondary">
                Loading messages...
              </p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
              <XCircle className="h-6 w-6 text-red-400" strokeWidth={1.5} />
              <p className="max-w-md text-sm leading-relaxed text-foreground">
                {error}
              </p>
              <button
                onClick={handleRefresh}
                className="inline-flex items-center gap-2 text-sm text-foreground-secondary transition-colors hover:text-foreground"
              >
                <RefreshCw className="h-4 w-4" strokeWidth={1.5} />
                Try Again
              </button>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 py-20">
              <Inbox
                className="h-6 w-6 text-foreground-muted"
                strokeWidth={1.5}
              />
              <p className="text-sm font-medium text-foreground">
                No messages yet
              </p>
              <p className="text-xs text-foreground-secondary">
                Messages sent through the contact form will appear here.
              </p>
            </div>
          ) : (
            <StaggerGroup className="flex flex-col">
              <p className="mb-4 text-xs text-foreground-secondary">
                {messages.length}{" "}
                {messages.length === 1 ? "message" : "messages"}
              </p>
              {messages.map((message) => (
                <StaggerItem key={message.id}>
                  <article className="border-b border-border py-6 first:pt-0 last:border-b-0">
                    <div className="flex items-baseline justify-between gap-4">
                      <p className="text-sm font-medium text-foreground">
                        {message.firstName} {message.lastName}
                      </p>
                      <time className="shrink-0 text-xs text-foreground-muted">
                        {formatDate(message.createdAt)}
                      </time>
                    </div>

                    <a
                      href={`mailto:${message.email}`}
                      className="mt-0.5 text-xs text-foreground-secondary transition-colors hover:text-accent"
                    >
                      {message.email}
                    </a>

                    {message.ServiceType && (
                      <p className="mt-2 text-xs text-foreground-muted">
                        {message.ServiceType.split(",")
                          .map((s) => s.trim())
                          .join(" / ")}
                      </p>
                    )}

                    <p className="mt-3 text-sm leading-relaxed text-foreground">
                      {message.message}
                    </p>
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
