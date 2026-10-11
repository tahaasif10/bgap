import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

// TODO: placeholder copy. Confirm final wording with the client.
export function CtaBanner() {
  return (
    <section className="bg-paper py-16 md:py-24">
      <Container>
        <div className="flex flex-col gap-8 rounded-2xl bg-brand-700 p-8 text-white md:flex-row md:items-center md:justify-between md:p-14">
          <div className="max-w-xl">
            <h2 className="text-3xl font-semibold md:text-4xl">Join Business Gap</h2>
            <p className="mt-3 text-lg text-brand-100">
              Become part of a network of business graduates and leaders from across Pakistan.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button href="/join-us" variant="accent" size="lg">
              Join us
            </Button>
            <Link href="/contact" className="font-medium text-white underline underline-offset-4 hover:text-brand-100">
              Contact us
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}