"use client";

import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { StarsBackground } from "../components/animate-ui/components/backgrounds/stars";
import { BlueTitle, GrayTitle } from "../components/reusables";
import { cn } from "../lib/utils";
import { SignInButton, useAuth } from "@clerk/nextjs";
import { PLACEHOLDERS, SUGGESTIONS } from "../lib/data";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";




export default function Home() {

  const {isSignedIn} = useAuth();
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    if (isFocused || prompt) return;
    const t = setInterval(() => {
      setPlaceholderIndex((i) => (i +1) % PLACEHOLDERS.length);
    }, 3000);
    return () => clearInterval(t);
  }, [isFocused, prompt]);

  useEffect(() => {
    const el = textareaRef.current;
    if(!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 200) + "px";
  }, [prompt]);

  const handleSubmit = () => {
    if(!prompt.trim() || !isSignedIn) return;
    router.push(`/workspace?prompt=${encodeURIComponent(prompt.trim())}`);
  };

  /* Submit on Enter, allow Shift+Enter for new line */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      // Handle submission logic here
      handleSubmit();
    }
  };



  return (
    <main className="min-h-screen bg-[#0a0a0a] selection:bg-white/20">
      <section className="relative h-screen flex flex-col items-center overflow-hidden px-4 pb-24 pt-40 text-center">
        <StarsBackground  className="absolute inset-0 h-full w-full"/>
        <Badge variant={"outline"} className="gap-2 p-4 backdrop-blur-sm">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400"/>
            Powered by Gemini 3.5 Flash
        </Badge>

        <h1 className="mx-auto max-w-3xl text-balance font-serif text-5xl leading-tight tracking-tight sm:text-5xl lg:text-7xl z-10">
          <GrayTitle>Forge your dream</GrayTitle> 
            <br/>
          <BlueTitle>from a single prompt.</BlueTitle>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-balance text-white/40 text-base leading-relaxed z-10">
          Describe your vision, and our AI will bring it to life. From stunning visuals to captivating narratives,
          we turn your ideas into reality with just a few words.
        </p>

        {/* Prompt Box */}
        <div className="relative mx-auto mt-12 w-full max-w-2xl">
          <div
            className={cn(
              "rounded-2xl border bg-[#111111] duration-200",
              isFocused
                ? "border-white/20 ring-1 ring-white/8"
                : "border-white/8"
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
              style={{ minHeight:56, maxHeight: 200 }}
              placeholder={PLACEHOLDERS[placeholderIndex]}
            />

            <div className="flex items-center justify-between border-t border-white/6 px-4 py-2.5">
              <span>
                Press ⏎ to generate. Shift+⏎ for new line
              </span>
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
                  <Button className="h-8 rounded-full bg-white px-5 font-semibold"> Generate </Button>
                  <ArrowRight className="h-3.5 w-3.5"/>
              </SignInButton>
            )}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                // onClick={() => handleSuggestion(s)}
                className="rounded-full border border-white/8 bg-white/4 px-3 py-1.5 text-xs text-white/40 hover:border-white/15
                hover:bg-white/8 hover:text-white/70"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>


  
  );
}
