"use client";

import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { StarsBackground } from "../components/animate-ui/components/backgrounds/stars";
import { BlueTitle, GrayTitle, SectionHeading, SectionLabel } from "../components/reusables";
import { cn } from "../lib/utils";
import { SignInButton, useAuth } from "@clerk/nextjs";
import { FEATURES, PLACEHOLDERS, STEPS, SUGGESTIONS } from "../lib/data";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    if (isFocused || prompt) return;
    const t = setInterval(() => {
      setPlaceholderIndex((i) => (i + 1) % PLACEHOLDERS.length);
    }, 3000);
    return () => clearInterval(t);
  }, [isFocused, prompt]);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 200) + "px";
  }, [prompt]);

  const handleSubmit = () => {
    if (!prompt.trim() || !isSignedIn) return;
    router.push(`/workspace?prompt=${encodeURIComponent(prompt.trim())}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSuggestion = (s: string) => {
    setPrompt(s);
    textareaRef.current?.focus();
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] selection:bg-white/20">
      <section className="relative h-screen flex flex-col items-center overflow-hidden px-4 pb-24 pt-40 text-center">
        <StarsBackground className="absolute inset-0 h-full w-full" />

        <Badge variant={"outline"} className="gap-2 p-4 backdrop-blur-sm">
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          Powered by Gemini 3.5 Flash
        </Badge>

        <h1 className="mx-auto max-w-3xl text-balance font-serif text-5xl leading-tight tracking-tight sm:text-5xl lg:text-7xl z-10">
          <GrayTitle>Forge your dream</GrayTitle>
          <br />
          <BlueTitle>from a single prompt.</BlueTitle>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-balance text-white/40 text-base leading-relaxed z-10">
          Describe your vision, and our AI will bring it to life.
        </p>

        {/* Prompt Box */}
        <div className="relative mx-auto mt-12 w-full max-w-2xl">
          <div
            className={cn(
              "rounded-2xl border bg-[#111111] duration-200",
              isFocused ? "border-white/20 ring-1 ring-white/8" : "border-white/8"
            )}
          >
            <textarea
              ref={textareaRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
              rows={1}
              className="w-full resize-none bg-transparent px-5 pb-4 pt-5 text-sm placeholder:text-white/20 focus:outline-none sm:text-base"
              style={{ minHeight: 56, maxHeight: 200 }}
              placeholder={PLACEHOLDERS[placeholderIndex]}
            />

            <div className="flex items-center justify-between border-t border-white/6 px-4 py-2.5">
              <span>Press ⏎ to generate. Shift+⏎ for new line</span>

              {isSignedIn ? (
                <Button
                  onClick={handleSubmit}
                  disabled={!prompt.trim()}
                  className="h-8 rounded-full px-5 font-semibold"
                  variant={prompt.trim() ? "default" : "secondary"}
                >
                  Generate
                </Button>
              ) : (
                <SignInButton mode="modal">
                  <Button className="h-8 rounded-full bg-white px-5 font-semibold flex items-center gap-2">
                    Generate
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </SignInButton>
              )}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => handleSuggestion(s)}
                className="rounded-full border border-white/8 bg-white/4 px-3 py-1.5 text-xs text-white/40 hover:border-white/15 hover:bg-white/8 hover:text-white/70"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-10 text-xs text-white/20">
          No credit card required. 10 free generations per day.
        </p>
      </section>

      <section className="px-4 pb-32">
        <div className="mx-auto mb-14 max-w-5xl text-center">
          <SectionLabel>Everything you need</SectionLabel>
          <SectionHeading gray="From" blue="to production" />
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-px overflow-hidden rounded-2xl border
         border-white/6 bg-white/6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({icon: Icon, label, desc}) => {
            return (
              <div
                key={label}
                className="group bg-[#0a0a0a] p-7 hover:bg-[#0f0f0f]"
              >
                  <div className="mb-4 flrx h-9 w-9 items-center justify-center rounded-lg border border-white/8 bg-white/4
                  group-hover:border-white/15 group-hover:bg-white/8">
                      <Icon className="h-4 w-4 text-white/60 group-hover:text-blue-400/70" />                    
                  </div>
                  <p className="mb-2 text-sm font-semibold">{label}</p>
                  <p className="text-sm leading-relaxed text-white/40">{desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="px-4 pb-32">
        <div className="mx-auto mb-14 max-w-5xl text-center">
          <SectionLabel>How it works</SectionLabel>
          <SectionHeading gray="Four steps" blue="to a working app." />
        </div>

        <div className="mx-auto  max-w-3xl ">
          {STEPS.map((step, i) => (
            <div key={step.number} className="flex gap-6 ">
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/4">
                  <span className="font-mono text-xs font-semibold text-white/50">
                    {step.number}
                  </span>
                </div>

                {i < STEPS.length - 1 &&(
                  <div className="mt-2 h-full w-px bg-white/6" />
                )}
              </div>

              <div className="pb-10 pt-1.5">
                <p className="mb-1.5 text-sm font-semibold sm:text-base">
                  {step.label}
                </p>

                <p className="text-sm leading-relaxed text-white/40">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 pb-32">
        <div className="mx-auto mb-14 max-w-5xl text-center">
          <SectionLabel>Simple princing</SectionLabel>
          <SectionHeading gray="Start free," blue="scale when ready." />

          <p className="mt-4 mx-auto max-w-sm text-sm text-white/35">
            No credit card required. Upgrade or downgrade anytime. 10 free generations per day.
          </p>
        </div>

        <div className="mx-auto  max-w-3xl">
          
        </div>
      </section>

      <section className="relative mx-auto mb-3é max-w-5xl overflow-hidden rounded-2xl border border-white/8 px-10 py-24 text-center">
        <SectionHeading gray="Start Building" blue="for free." />
      </section>
    </main>
  );
}