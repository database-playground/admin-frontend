import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export function SiteHeader({
  title,
  hasBackButton,
}: {
  title: string;
  hasBackButton?: boolean;
}) {
  return (
    <header
      className={`
        flex h-(--header-height) shrink-0 items-center gap-2 border-b
        transition-[width,height] ease-linear
        group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)
      `}
    >
      <div
        className={`
          flex w-full items-center gap-1 px-4
          lg:gap-2 lg:px-6
        `}
      >
        <SidebarTrigger className="-ml-1" />
        {hasBackButton && (
          <Link href=".">
            <Button variant="ghost" size="icon">
              <ArrowLeftIcon className="h-4 w-4" />
            </Button>
          </Link>
        )}
        <Separator
          orientation="vertical"
          className={`
            mx-2
            data-[orientation=vertical]:h-4
          `}
        />
        <h1 className="text-base font-medium">{title}</h1>
      </div>
    </header>
  );
}
