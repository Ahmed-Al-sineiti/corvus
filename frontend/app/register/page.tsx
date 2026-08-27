"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = "http://localhost:5000/api/register";

    try {
      const response = await fetch(url, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("done!");
      } else if (data.errors) {
        data.errors.forEach((error: { path: string[]; message: string }) => {
          alert(`Field: ${error.path[0]}\nMessage: ${error.message}`);
        });
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-sm">
        <div className="mb-10">
          <h1 className="text-3xl font-medium mb-2">Register a new account</h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex flex-col gap-2 mb-5">
            <label htmlFor="email" className="text-sm text-neutral-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email} // 3. تمت إضافة القيمة هنا
              placeholder="name@company.com"
              required
              className="bg-transparent border border-neutral-800 text-white px-4 py-3.5 rounded-lg focus:outline-none focus:border-white transition-colors placeholder:text-neutral-600"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div className="flex flex-col gap-2 mb-8">
            <label htmlFor="password" className="text-sm text-neutral-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password} // 3. تمت إضافة القيمة هنا
              placeholder="••••••••"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="bg-transparent border border-neutral-800 text-white px-4 py-3.5 rounded-lg focus:outline-none focus:border-white transition-colors placeholder:text-neutral-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-white text-black py-4 rounded-full font-semibold hover:opacity-90 transition-opacity"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
