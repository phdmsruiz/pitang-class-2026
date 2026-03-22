import { createFileRoute, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/")({
  loader: async () => {
    const token = document.cookie
      .split("; ")
      .find((c) => c.startsWith("@pitang/accessToken="))
      ?.split("=")[1];

    const response = await fetch("https://dummyjson.com/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error("Failed to fetch user");

    return await response.json();
  },
  component: RouteComponent,
});

function RouteComponent() {
  const loggedUser = Route.useLoaderData();
  const router = useRouter();

  function handleLogout() {
    document.cookie = "@pitang/accessToken=; path=/; Max-Age=0";
    router.navigate({ to: "/login" });
  }

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-950 flex flex-col items-center justify-center gap-10 px-6">
      <div className="text-center">
        <p className="text-zinc-500 text-sm tracking-widest uppercase mb-2">Dashboard</p>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none">
          Welcome back{loggedUser ? `, ${loggedUser.firstName}` : ""}.
        </h1>
        <p className="text-zinc-500 text-sm font-bold">The only store you need.</p>
      </div>

      <button
        onClick={handleLogout}
        className="px-10 py-4 bg-amber-400 text-zinc-950 font-bold text-sm uppercase tracking-widest rounded-sm hover:bg-amber-300 active:scale-95 transition-all"
      >
        Logout →
      </button>
    </div>
  );
}