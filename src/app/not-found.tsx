import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="py-24">
      <h1 className="text-4xl font-semibold md:text-5xl">Page not found</h1>
      <p className="mt-4 max-w-md text-lg text-muted">
        The page you are looking for does not exist or has moved.
      </p>
      <Button href="/" className="mt-8">Back to home</Button>
    </Container>
  );
}