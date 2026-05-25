import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

export function PageHeader({
  eyebrow,
  title,
  description,
  align = "left",
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  children?: React.ReactNode;
}) {
  return (
    <section className="border-b border-line bg-paper">
      <Container
        className={cn("py-12 lg:py-16", align === "center" && "text-center")}
      >
        {eyebrow ? <span className="eyebrow text-grass">{eyebrow}</span> : null}
        <h1 className="mt-3 text-balance text-4xl leading-[1.05] sm:text-5xl">
          {title}
        </h1>
        {description ? (
          <p
            className={cn(
              "mt-4 max-w-2xl text-pretty leading-relaxed text-muted",
              align === "center" && "mx-auto",
            )}
          >
            {description}
          </p>
        ) : null}
        {children}
      </Container>
    </section>
  );
}
