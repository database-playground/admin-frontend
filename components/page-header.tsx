import { Skeleton } from "./ui/skeleton";

export default function PageHeader({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

export function PageHeaderSkeleton({ title, description }: { title?: string; description?: string }) {
  return (
    <div>
      {title ? <h1 className="text-2xl font-bold">{title}</h1> : (
        <Skeleton
          className={`h-8 w-64`}
        />
      )}
      {description ? <p className="text-muted-foreground">{description}</p> : (
        <Skeleton
          className={`h-4 w-1/3`}
        />
      )}
    </div>
  );
}
