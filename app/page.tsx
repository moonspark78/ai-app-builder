import { Badge } from "@/components/ui/badge";
import { StarsBackground } from "../components/animate-ui/components/backgrounds/stars";




export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] selection:bg-white/20">
      <section className="relative h-screen flex flex-col items-center overflow-hidden px-4 pb-24 pt-40 text-center">
        <StarsBackground  className="absolute inset-0 h-full w-full"/>
        <Badge variant={"outline"} className="gap-2 p-4 backdrop-blur-sm">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400"/>
            Powered by Gemini 3.5 Flash
        </Badge>

        <h1 className="mx-auto max-w-3xl text-balance font-serif text-5xl leading-tight">

        </h1>
      </section>
    </main>
  );
}
