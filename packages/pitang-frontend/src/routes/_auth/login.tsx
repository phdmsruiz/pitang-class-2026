import { createFileRoute, redirect } from "@tanstack/react-router";
import { LoginForm } from "@/components/login-form";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/_auth/login")({
  beforeLoad: () => {
    const token = document.cookie
      .split("; ")
      .find((c) => c.startsWith("@pitang/accessToken="))
      ?.split("=")[1];

    if (token) {
      throw redirect({ to: "/dashboard" });
    }
  },

  component: RouteComponent,
});

function RouteComponent() {
  const { handleLogin } = useAuth();

  return (
    <LoginForm
      onSubmit={async (event) => { // ✅ async so handleLogin is awaited
        const formData = new FormData(event.currentTarget);
        await handleLogin(event, {
          username: formData.get("username") as string,
          password: formData.get("password") as string,
        });
      }}
    />
  );
}