import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cars } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";
import { buildBreadcrumbSchema } from "@/lib/seo-schema";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = buildMetadata({
  title: "Porsche — Kelly Smith",
  description:
    "Kelly Smith's collection of Porsches and Ferraris, and organizer of Idaho Air.",
  path: "/porsche",
});

export default function PorschePage() {
  return (
    <main className="mx-auto max-w-[680px] px-6 py-20 md:py-32">
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Porsche", path: "/porsche" },
        ])}
      />

      {/* Back link */}
      <Link
        href="/"
        className="mb-16 inline-block text-sm text-muted hover:text-foreground"
      >
        &larr; Back to Home
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
          to sell them for a profit. It was much later that I could begin
          collecting these cars from Zuffenhausen. More recently, I&apos;ve been
          adding the Italian variety from Maranello.
        </p>
      </header>

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
