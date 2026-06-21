"use client";

import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { StarsBackground } from "../components/animate-ui/components/backgrounds/stars";
import { BlueTitle, GrayTitle } from "../components/reusables";
import { cn } from "../lib/utils";
import { useAuth } from "@clerk/nextjs";




export default function Home() {

  const {isSignedIn} = useAuth();
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);



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
            ></textarea>
          </div>
        </div>
      </section>
    </main>
  );
}
