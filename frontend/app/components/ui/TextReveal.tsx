"use client";

import { useRef, useEffect, useState, ReactNode } from "react";

interface TextRevealProps {
  children: ReactNode;
  /** Delay in ms before animation starts */
  delay?: number;
  /** Duration of each line's reveal in ms */
  duration?: number;
  /** Stagger between lines in ms */
  stagger?: number;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
}

export default function TextReveal({
  children,
  delay = 0,
  duration = 800,
  stagger = 120,
  className = "",
  as: Tag = "div",
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // If children is a string, split into lines by <br> or newlines
  // Otherwise wrap each child in a reveal line
  const lines = getLines(children);

  return (
    <Tag ref={containerRef as any} className={className}>
      {lines.map((line, i) => (
        <span
          key={i}
          className="block overflow-hidden"
          style={{ perspective: "600px" }}
        >
          <span
            className="block"
            style={{
              transform: isVisible
                ? "translateY(0%) rotateX(0deg)"
                : "translateY(110%) rotateX(-10deg)",
              opacity: isVisible ? 1 : 0,
              transition: `transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay + i * stagger}ms, opacity ${duration * 0.6}ms ease ${delay + i * stagger}ms`,
              transformOrigin: "bottom center",
              willChange: "transform, opacity",
            }}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}

/**
 * Extracts visual "lines" from children.
 * - Strings are split by newline characters.
 * - If children contains <br />, each segment between <br />s becomes a line.
 * - Arrays of mixed content are grouped by <br /> separators.
 * - Single non-string elements are wrapped as one line.
 */
function getLines(children: ReactNode): ReactNode[] {
  if (typeof children === "string") {
    return children.split("\n").filter((s) => s.trim() !== "");
  }

  if (Array.isArray(children)) {
    const lines: ReactNode[] = [];
    let currentLine: ReactNode[] = [];

    children.forEach((child, idx) => {
      // Check for <br /> elements
      if (
        child &&
        typeof child === "object" &&
        "type" in child &&
        child.type === "br"
      ) {
        if (currentLine.length > 0) {
          lines.push(
            currentLine.length === 1 ? currentLine[0] : <>{...currentLine}</>
          );
          currentLine = [];
        }
      } else {
        currentLine.push(child);
      }
    });

    if (currentLine.length > 0) {
      lines.push(
        currentLine.length === 1 ? currentLine[0] : <>{...currentLine}</>
      );
    }

    return lines.length > 0 ? lines : [children];
  }

  return [children];
}
