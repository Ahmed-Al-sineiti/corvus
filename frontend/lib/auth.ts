"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

export async function authFetch(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  const headers = new Headers(init?.headers);
  const token = getToken();

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(input, { ...init, headers });

  if (response.status === 401) {
    localStorage.removeItem("token");
    window.location.replace("/login");
  }

  return response;
}

export function useLogout(): () => void {
  const router = useRouter();

  return useCallback(() => {
    localStorage.removeItem("token");
    router.replace("/login");
  }, [router]);
}
