import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cars } from "@/lib/data";

export const metadata: Metadata = {
  title: "Porsche — Kelly Smith",
  description:
    "Kelly Smith's collection of Porsches and Ferraris, and organizer of Idaho Air.",
};

export default function PorschePage() {
  return (
    <main className="mx-auto max-w-[680px] px-6 py-20 md:py-32">
      {/* Back link */}
      <Link
        href="/"
        className="mb-16 inline-block text-sm text-muted hover:text-foreground"
      >
        &larr; Kelly Smith
      </Link>

      {/* Header */}
      <header className="mb-24">
        <h1 className="font-serif text-3xl tracking-tight">Porsche</h1>
        <p className="mt-1 font-serif text-xl italic text-muted">
          (And Ferrari...)
        </p>
        <p className="mt-4 text-muted">
          I started playing with cars in college and never looked back. In
          actual fact, I needed money so I would buy cars, fix them up and try
          to sell them for a profit. Over time, that&apos;s led to some kind of
          extreme fascination for the vehicles from Zuffenhausen.
        </p>
      </header>

      {/* Idaho Air */}
      <section className="mb-24">
        <h2 className="mb-6 text-xs font-medium uppercase tracking-widest text-muted">
          Idaho Air
        </h2>
        <p>
          I organize Idaho Air — the second largest classic air-cooled Porsche
          event in the US. Every year we bring together collectors and
          enthusiasts in Boise for a weekend of cars, camaraderie, and mountain
          roads.
        </p>
        <p className="mt-3">
          <a
            href="https://idaho-air.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-border underline-offset-4 hover:decoration-muted"
          >
            idaho-air.com
            <span className="ml-0.5 text-muted"> ↗</span>
          </a>
        </p>
      </section>

      {/* Collection */}
      <section className="mb-24">
        <h2 className="mb-6 text-xs font-medium uppercase tracking-widest text-muted">
          Collection
        </h2>
        <div className="space-y-16">
          {cars.map((car) => (
            <div key={`${car.year}-${car.make}-${car.model}`}>
              {car.images.map((src, i) => (
                <div
                  key={src}
                  className={i > 0 ? "mt-3" : ""}
                >
                  <Image
                    src={src}
                    alt={`${car.year} ${car.make} ${car.model}${car.color ? ` in ${car.color}` : ""}`}
                    width={680}
                    height={453}
                    className="w-full rounded-sm"
                    sizes="(max-width: 680px) 100vw, 680px"
                  />
                </div>
              ))}
              <div className="mt-3">
                <p className="font-medium">
                  {car.year} {car.make} {car.model}
                </p>
                {(car.color || car.notes) && (
                  <p className="text-sm text-muted">
                    {[car.color, car.notes].filter(Boolean).join(" — ")}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-sm text-muted">
        <p>&copy; {new Date().getFullYear()} Kelly Smith</p>
      </footer>
    </main>
  );
}
