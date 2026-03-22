import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const date = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center gap-10 px-6">
      <div className="text-center">
        <p className="text-zinc-500 text-sm tracking-widest uppercase mb-2">{date}</p>
        <p className="text-6xl font-black tabular-nums tracking-tight text-amber-400">{time}</p>
      </div>

      <h1 className="text-5xl md:text-7xl font-black tracking-tight text-center leading-none">
        Welcome to <i>The Only Store You Need</i><br />
      </h1>
      <h5>I mean, really. From fancy parfums to everyday essentials, keep navigating to discover that all you need can <i>really</i> be in one place</h5>

      <button
        onClick={() => navigate({ to: "/login" })}
        className="mt-4 px-10 py-4 bg-amber-400 text-zinc-950 font-bold text-sm uppercase tracking-widest rounded-sm hover:bg-amber-300 active:scale-95 transition-all"
      >
        Get started →
      </button>
    </div>
  );
}