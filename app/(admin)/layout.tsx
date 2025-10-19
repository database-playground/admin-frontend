import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AuthorizedApolloWrapper from "@/providers/use-apollo.rsc";
import ProtectedRoute from "@/providers/use-protected-route";
import { Suspense, ViewTransition } from "react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense>
      <ProtectedRoute>
        <AuthorizedApolloWrapper>
          <SidebarProvider
            style={{
              "--sidebar-width": "calc(var(--spacing) * 72)",
              "--header-height": "calc(var(--spacing) * 12)",
            } as React.CSSProperties}
          >
            <AppSidebar variant="inset" />
            <SidebarInset>
              <ViewTransition>
                <div>
                  {children}
                </div>
              </ViewTransition>
            </SidebarInset>
          </SidebarProvider>
        </AuthorizedApolloWrapper>
      </ProtectedRoute>
    </Suspense>
  );
}
