"use client";

import { useEffect, useState } from "react";

const zones = [
  { label: "Boise", zone: "America/Boise", local: true },
  { label: "New York", zone: "America/New_York" },
  { label: "London", zone: "Europe/London" },
  { label: "Tokyo", zone: "Asia/Tokyo" },
];

function formatTime(zone: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: zone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date());
}

function formatTzAbbr(zone: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: zone,
    timeZoneName: "short",
  })
    .formatToParts(new Date())
    .find((p) => p.type === "timeZoneName")?.value ?? "";
}

export function WorldClocks() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  if (!now) return null;

  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
      {zones.map((z) => (
        <div key={z.zone}>
          <p className="text-sm text-muted">
            {z.label}
            {z.local && (
              <span className="ml-1.5 inline-block h-1.5 w-1.5 rounded-full bg-green-500" title="My location" />
            )}
          </p>
          <p className="tabular-nums">
            {formatTime(z.zone)}
          </p>
          <p className="text-xs text-muted">{formatTzAbbr(z.zone)}</p>
        </div>
      ))}
    </div>
  );
}
