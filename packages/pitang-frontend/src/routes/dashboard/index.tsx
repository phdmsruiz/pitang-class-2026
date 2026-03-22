import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { handleLogout } = useAuth();

  return (
    <div>
      <h1>Hello "/dashboard/"!</h1>

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}