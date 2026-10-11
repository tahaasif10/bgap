import { CountUp } from "@/components/home/CountUp";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { stats } from "@/data/stats";

// TODO: placeholder copy. Final text will be written from the client's slides.
export function AboutSection() {
  return (
    <section id="about" className="bg-white py-16 md:py-24">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
          <h2 className="text-3xl font-semibold md:text-4xl lg:col-span-5">About Business Gap</h2>

          <div className="space-y-4 text-lg text-muted lg:col-span-7">
            <p>
              Business Gap is a community of business graduates and business leaders from across
              Pakistan. We bring people and institutes together so they can connect, share
              experience, and grow.
            </p>
            <p>
              Whether you are starting out or already leading a company, Business Gap gives you a
              network of peers who understand the road you are on.
            </p>
            <Button href="/about" variant="outline" className="mt-4">
              Read more about us
            </Button>
          </div>
        </div>

        <dl className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="bg-paper p-6 md:p-8">
              <dt className="text-sm text-muted">{s.label}</dt>
              <dd className="mt-2 font-display text-4xl font-semibold text-brand-900 md:text-5xl">
                <CountUp value={s.value} suffix={s.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}