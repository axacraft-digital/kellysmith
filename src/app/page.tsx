import Image from "next/image";
import Link from "next/link";
import { ventures, roles, links } from "@/lib/data";
import { WorldClocks } from "@/components/world-clocks";

export default function Home() {
  return (
    <main className="mx-auto max-w-[680px] px-6 py-20 md:py-32">
      {/* Header */}
      <header className="animate-enter mb-24" style={{ "--stagger": 0 } as React.CSSProperties}>
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
          Technology polymath building at the intersection of design &amp; code.
          Curious entrepreneur building companies for myself while helping
          select clients build and grow theirs.
        </p>
        <p className="mt-4 text-muted">
          Previously led digital at Starbucks, Athletic Greens, MGM Resorts
          &amp; Hagerty. Earlier, companies I founded or invested in were
          acquired by Amazon, Microsoft, Google, Comcast, ESPN, Priceline
          and others.
        </p>
      </header>

      {/* Now */}
      <section className="animate-enter mb-24" style={{ "--stagger": 1 } as React.CSSProperties}>
        <h2 className="mb-6 text-xs font-medium uppercase tracking-widest text-muted">
          Now
        </h2>
        <p>
          Running{" "}
          <a
            href="https://curiousoffice.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-border underline-offset-4 hover:decoration-muted"
          >
            Curious Office
          </a>{" "}
          since 2007 — my lab for incubating companies
          and seed-stage investing. Teligant focuses on the best products that
          support the future of telehealth and next-gen EHR systems. Axacraft
          helps enterprises develop and deploy solutions faster via AI-first,
          agentic approaches. In my spare time, I collect{" "}
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
      <section className="animate-enter mb-24" style={{ "--stagger": 2 } as React.CSSProperties}>
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
              className="-mx-3 flex items-baseline justify-between rounded-lg px-3 py-3 transition-colors hover:bg-hover"
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
      <section className="animate-enter mb-24" style={{ "--stagger": 3 } as React.CSSProperties}>
        <h2 className="mb-6 text-xs font-medium uppercase tracking-widest text-muted">
          Previously
        </h2>
        <div className="divide-y divide-border">
          {roles.map((r) => (
            <a
              key={`${r.title}-${r.company}`}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="-mx-3 flex items-baseline rounded-lg px-3 py-3 transition-colors hover:bg-hover"
            >
              <span className="w-40 shrink-0">{r.company}</span>
              <span className="text-sm text-muted">{r.title}</span>
              <span className="ml-auto shrink-0 text-muted">↗</span>
            </a>
          ))}
        </div>
      </section>

      {/* Connect */}
      <section className="animate-enter mb-24" style={{ "--stagger": 4 } as React.CSSProperties}>
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

      {/* World Clocks */}
      <section className="animate-enter mb-24" style={{ "--stagger": 5 } as React.CSSProperties}>
        <hr className="mb-10 border-border" />
        <h2 className="mb-6 text-xs font-medium uppercase tracking-widest text-muted">
          Local Time
        </h2>
        <WorldClocks />
      </section>

      {/* Footer */}
      <footer className="animate-enter text-sm text-muted" style={{ "--stagger": 6 } as React.CSSProperties}>
        <p>&copy; {new Date().getFullYear()} Kelly Smith</p>
      </footer>
    </main>
  );
}
