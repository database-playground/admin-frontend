import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import ProtectedRoute from "@/providers/use-protected-route";
import { unstable_ViewTransition as ViewTransition } from "react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute>
      <SidebarProvider
        style={{
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties}
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <ViewTransition>
            <div suppressHydrationWarning>
              {children}
            </div>
          </ViewTransition>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
