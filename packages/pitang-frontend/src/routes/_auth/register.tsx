import { createFileRoute, redirect } from "@tanstack/react-router";

import { SignupForm } from "@/components/signup-form";

export const Route = createFileRoute("/_auth/register")({
   beforeLoad: () => {
      const token = document.cookie
        .split("; ")
        .find((c) => c.startsWith("@pitang/accessToken="))
        ?.split("=")[1];
  
        if (token) {
          throw redirect ({to: "/dashboard"}); 
        }
    },

  component: RouteComponent,
});

function RouteComponent() {
  return <SignupForm />;
}
