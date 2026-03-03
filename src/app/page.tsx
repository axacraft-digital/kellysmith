import Image from "next/image";
import Link from "next/link";
import { ventures, roles, links } from "@/lib/data";

export default function Home() {
  return (
    <main className="mx-auto max-w-[680px] px-6 py-20 md:py-32">
      {/* Header */}
      <header className="mb-24">
        <Image
          src="/kelly-avatar.png"
          alt="Kelly Smith"
          width={72}
          height={72}
          className="mb-5 rounded-full"
          priority
        />
        <h1 className="font-serif text-3xl tracking-tight">Kelly Smith</h1>
        <p className="mt-1 font-serif text-xl italic text-muted">
          Building at the intersection of product, design, and engineering.
        </p>
        <p className="mt-4 text-muted">
          Entrepreneur and technologist based in Boise, Idaho. Previously led
          digital at Starbucks, Athletic Greens, and MGM Resorts.
        </p>
      </header>

      {/* Now */}
      <section className="mb-24">
        <h2 className="mb-6 text-xs font-medium uppercase tracking-widest text-muted">
          Now
        </h2>
        <p>
          Now running Curious Office, my lab for seed-stage investment and
          startup incubator, spending most of my time rethinking primary care
          telehealth and the future of EHR systems with Teligant. In my spare
          time, I collect{" "}
          <Link
            href="/porsche"
            className="underline decoration-border underline-offset-4 hover:decoration-muted"
          >
            Porsches
          </Link>{" "}
          and host one of the largest classic Porsche events in the country
          at{" "}
          <a
            href="https://idaho-air.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-border underline-offset-4 hover:decoration-muted"
          >
            IdahoAir.com
            <span className="ml-0.5 text-muted"> ↗</span>
          </a>
        </p>
      </section>

      {/* Ventures */}
      <section className="mb-24">
        <h2 className="mb-6 text-xs font-medium uppercase tracking-widest text-muted">
          Ventures
        </h2>
        <div className="divide-y divide-border">
          {ventures.map((v) => (
            <a
              key={v.name}
              href={v.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-baseline justify-between py-3"
            >
              <div>
                <span>{v.name}</span>
                <p className="mt-0.5 text-sm text-muted">{v.description}</p>
              </div>
              <span className="shrink-0 text-muted">↗</span>
            </a>
          ))}
        </div>
      </section>

      {/* Previously */}
      <section className="mb-24">
        <h2 className="mb-6 text-xs font-medium uppercase tracking-widest text-muted">
          Previously
        </h2>
        <div className="divide-y divide-border">
          {roles.map((r) => (
            <div
              key={`${r.title}-${r.company}`}
              className="flex items-baseline justify-between py-3"
            >
              <span>
                {r.title}, {r.company}
              </span>
              <span className="text-sm text-muted">{r.years}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Connect */}
      <section className="mb-24">
        <h2 className="mb-6 text-xs font-medium uppercase tracking-widest text-muted">
          Connect
        </h2>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.url}
              target={l.url.startsWith("mailto:") ? undefined : "_blank"}
              rel={
                l.url.startsWith("mailto:")
                  ? undefined
                  : "noopener noreferrer"
              }
              className="underline decoration-border underline-offset-4 hover:decoration-muted"
            >
              {l.label}
            </a>
          ))}
          <Link
            href="/porsche"
            className="underline decoration-border underline-offset-4 hover:decoration-muted"
          >
            Porsche
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-sm text-muted">
        <p>&copy; {new Date().getFullYear()} Kelly Smith</p>
      </footer>
    </main>
  );
}
