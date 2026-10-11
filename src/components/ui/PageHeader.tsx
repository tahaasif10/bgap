import { Container } from "@/components/ui/Container";

export function PageHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="bg-brand-900 py-14 text-white md:py-20">
      <Container>
        <h1 className="text-4xl font-semibold md:text-5xl">{title}</h1>
        {description && <p className="mt-4 max-w-2xl text-lg text-brand-100">{description}</p>}
      </Container>
    </div>
  );
}