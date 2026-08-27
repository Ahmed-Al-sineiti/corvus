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
  Calendar,
  Trash2,
  Search,
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

const API_URL = "/api/messages";

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [deletingId, setDeletingId] = useState<number | null>(null);

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

  const loadData = () => {
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

  useEffect(() => {
    loadData();
  }, []);

  // دالة الحذف والربط مع الـ API
  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this message?",
    );
    if (!confirmDelete) return;

    setDeletingId(id);
    try {
      const response = await authFetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the message.");
      }

      // إزالة الرسالة مباشرة من الـ state بعد نجاح الحذف
      setMessages((prevMessages) => prevMessages.filter((m) => m.id !== id));
    } catch (err) {
      console.error("Error deleting message:", err);
      alert("Could not delete message. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  // دالة التصفية حسب نص البحث
  const filteredMessages = messages.filter((msg) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;

    const fullName = `${msg.firstName} ${msg.lastName}`.toLowerCase();
    const email = msg.email.toLowerCase();
    const service = (msg.ServiceType || "").toLowerCase();
    const messageContent = msg.message.toLowerCase();

    return (
      fullName.includes(query) ||
      email.includes(query) ||
      service.includes(query) ||
      messageContent.includes(query)
    );
  });

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
              All incoming client inquiries and submissions.
            </p>
          </div>
          <button
            onClick={loadData}
            disabled={isLoading}
            className="inline-flex items-center justify-center gap-2 border border-border bg-white px-6 py-3 text-sm font-medium text-black transition-all duration-300 hover:bg-accent hover:text-white hover:shadow-[0_8px_30px_-8px_rgba(90,108,255,0.6)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <RefreshCw
              className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
              strokeWidth={1.5}
            />
            Refresh
          </button>
        </div>

        {/* Search Input Bar */}
        <div className="mt-8 relative">
          <Search
            className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-muted"
            strokeWidth={1.5}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, service, or keywords..."
            className="w-full rounded-xl border border-border bg-surface/80 py-3 pl-11 pr-4 font-sans text-sm text-white placeholder-foreground-muted outline-none transition-colors focus:border-accent/50 focus:bg-surface"
          />
        </div>

        <div className="mt-8">
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
                onClick={loadData}
                className="inline-flex items-center gap-2 border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-border-strong hover:bg-background-secondary"
              >
                <RefreshCw className="h-4 w-4" strokeWidth={1.5} />
                Try Again
              </button>
            </div>
          ) : filteredMessages.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-surface py-20">
              <Inbox
                className="h-8 w-8 text-foreground-muted"
                strokeWidth={1.5}
              />
              <p className="font-heading text-xl font-medium text-foreground">
                {searchQuery ? "No matching messages" : "No messages yet"}
              </p>
              <p className="text-sm text-foreground-secondary">
                {searchQuery
                  ? "Try searching for a different keyword or name."
                  : "Messages sent through the contact form will appear here."}
              </p>
            </div>
          ) : (
            <StaggerGroup className="flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <p className="font-mono text-xs font-medium tracking-[0.2em] text-foreground-secondary">
                  SHOWING: {filteredMessages.length} OF {messages.length}{" "}
                  {messages.length === 1 ? "MESSAGE" : "MESSAGES"}
                </p>
              </div>

              {filteredMessages.map((message) => (
                <StaggerItem key={message.id}>
                  <article className="group relative rounded-2xl border border-border bg-surface/80 p-6 transition-all duration-300 hover:border-accent/40 hover:bg-surface hover:shadow-lg md:p-7">
                    {/* Header: User Info, Timestamp & Delete Icon */}
                    <div className="flex flex-col justify-between gap-4 border-b border-border/50 pb-5 sm:flex-row sm:items-center">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-accent transition-colors group-hover:border-accent/40 group-hover:bg-accent/20">
                          <User className="h-5 w-5" strokeWidth={1.75} />
                        </div>
                        <div>
                          <h2 className="font-heading text-lg font-semibold tracking-tight text-white">
                            {message.firstName} {message.lastName}
                          </h2>
                          <a
                            href={`mailto:${message.email}`}
                            className="mt-0.5 flex items-center gap-1.5 font-mono text-xs text-foreground-secondary transition-colors duration-200 hover:text-accent hover:underline"
                          >
                            <Mail
                              className="h-3.5 w-3.5 text-accent/80"
                              strokeWidth={1.5}
                            />
                            {message.email}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 self-start sm:self-center">
                        <div className="flex items-center gap-1.5 rounded-md border border-border/60 bg-background/50 px-3 py-1.5 font-mono text-xs text-foreground-muted">
                          <Calendar
                            className="h-3.5 w-3.5 text-foreground-muted"
                            strokeWidth={1.5}
                          />
                          {formatDate(message.createdAt)}
                        </div>

                        {/* Delete Button */}
                        <button
                          type="button"
                          aria-label="Delete message"
                          disabled={deletingId === message.id}
                          onClick={() => handleDelete(message.id)}
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-background/50 text-foreground-muted transition-all duration-200 hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400 disabled:opacity-40"
                        >
                          {deletingId === message.id ? (
                            <Loader2
                              className="h-4 w-4 animate-spin text-red-400"
                              strokeWidth={1.5}
                            />
                          ) : (
                            <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Service Badges */}
                    {message.ServiceType && (
                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        <span className="flex items-center gap-1 font-mono text-[11px] font-medium tracking-wider uppercase text-foreground-muted">
                          <Briefcase
                            className="h-3.5 w-3.5 text-accent"
                            strokeWidth={1.5}
                          />
                          Services:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {message.ServiceType.split(",").map(
                            (service, idx) => (
                              <span
                                key={idx}
                                className="rounded-lg border border-accent/20 bg-accent/5 px-3 py-1 font-mono text-xs text-accent-light transition-colors group-hover:border-accent/30"
                              >
                                {service.trim()}
                              </span>
                            ),
                          )}
                        </div>
                      </div>
                    )}

                    {/* Message Body Content */}
                    <div className="mt-5 rounded-xl border border-border/50 bg-background/60 p-4 transition-colors group-hover:border-border">
                      <div className="mb-2 flex items-center gap-2 text-xs font-medium text-foreground-muted">
                        <MessageSquare
                          className="h-3.5 w-3.5 text-accent"
                          strokeWidth={1.5}
                        />
                        <span>Message Content</span>
                      </div>
                      <p className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground/90">
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
