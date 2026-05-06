"use client";

import { useEffect, useState } from "react";
import { EntryEditor } from "@/components/admin/entry-editor";

export default function AdminNewPage() {
  const [allSlugs, setAllSlugs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/entries")
      .then((r) => r.json())
      .then((entries: Array<{ slug: string }>) => {
        setAllSlugs(entries.map((e) => e.slug));
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-muted">로딩 중...</p>;

  if (error)
    return (
      <div className="rounded-[var(--radius-md)] border border-error bg-error/10 p-4">
        <p className="text-error">{error}</p>
      </div>
    );

  return <EntryEditor mode="new" allSlugs={allSlugs} />;
}
