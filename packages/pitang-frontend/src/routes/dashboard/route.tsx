import { createFileRoute, Outlet, redirect, useLocation } from "@tanstack/react-router";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Fragment } from "react/jsx-runtime";
import type { LoggedUser } from "@/types";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: () => {
    const token = document.cookie
      .split("; ")
      .find((c) => c.startsWith("@pitang/accessToken="))
      ?.split("=")[1];

    if (!token) throw redirect({ to: "/login" });
  },
  loader: async (): Promise<LoggedUser> => {
    const token = document.cookie
      .split("; ")
      .find((c) => c.startsWith("@pitang/accessToken="))
      ?.split("=")[1];

    const response = await fetch("https://dummyjson.com/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw redirect({ to: "/login" });

    return await response.json();
  },
  component: RouteComponent,
});

function RouteComponent() {
  const loggedUser = Route.useLoaderData();
  const location = useLocation();
  const paths = location.pathname.split("/").filter(Boolean);

  return (
    <SidebarProvider>
      <AppSidebar loggedUser={loggedUser} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                {paths.map((path, index) => {
                  const lastPath = index + 1 === paths.length;
                  return (
                    <Fragment key={path}>
                      <BreadcrumbItem>
                        <BreadcrumbPage
                          className={`capitalize ${lastPath ? "font-bold" : ""}`}
                        >
                          {path}
                        </BreadcrumbPage>
                      </BreadcrumbItem>
                      {!lastPath && (
                        <BreadcrumbSeparator className="hidden md:block" />
                      )}
                    </Fragment>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}