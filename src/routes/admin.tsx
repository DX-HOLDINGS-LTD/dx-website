import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import type { Session } from "@supabase/supabase-js";
import { Download, KeyRound, LogOut, RefreshCw, Search, Trash2, Upload, Users } from "lucide-react";
import {
  getSupabaseConfig,
  isSupabaseConfigured,
  setSupabasePublishableKey,
  supabase,
} from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/admin")({
  ssr: false,
  errorComponent: ({ error, reset }) => (
    <Shell>
      <div className="max-w-md space-y-4 rounded-xl border border-destructive/40 bg-card p-6 shadow-sm">
        <h1 className="text-xl font-bold text-destructive">Admin Portal Error</h1>
        <p className="text-sm text-muted-foreground">
          {error instanceof Error ? error.message : String(error)}
        </p>
        <div className="flex gap-2">
          <Button onClick={() => reset()}>Try again</Button>
          <Button variant="outline" asChild>
            <a href="/">Go Home</a>
          </Button>
        </div>
      </div>
    </Shell>
  ),
  head: () => ({
    meta: [
      { title: "DX Admin — Waitlist" },
      { name: "description", content: "Private DX admin portal for managing the waitlist." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "DX Admin — Waitlist" },
      { property: "og:description", content: "Private DX admin portal." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPage,
});

const AUTHORIZED_ADMIN_EMAILS = ["abdoulieojay@gmail.com", "jassehbai100@gmail.com"];

type Row = {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  region: string | null;
  use_case: string | null;
  updates_opt_in: boolean;
  source: string;
  created_at: string;
};

function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [isConfigured, setIsConfigured] = useState(() => isSupabaseConfigured());

  useEffect(() => {
    if (!isConfigured) {
      setReady(true);
      return;
    }

    let sub: { subscription: { unsubscribe: () => void } } | null = null;
    try {
      const res = supabase.auth.onAuthStateChange((_e, s) => {
        setSession(s);
      });
      sub = res.data;

      supabase.auth
        .getSession()
        .then(({ data }) => {
          setSession(data.session);
          setReady(true);
        })
        .catch((err) => {
          console.error("Failed to get auth session", err);
          setReady(true);
        });
    } catch (err) {
      console.error("Auth initialization error", err);
      setReady(true);
    }

    return () => {
      sub?.subscription.unsubscribe();
    };
  }, [isConfigured]);

  useEffect(() => {
    if (!session) {
      setIsAdmin(null);
      return;
    }

    const email = session.user.email?.trim().toLowerCase() ?? "";
    const isDirectlyAuthorized = AUTHORIZED_ADMIN_EMAILS.includes(email);

    if (isDirectlyAuthorized) {
      setIsAdmin(true);
      // Attempt background RPC sync to record role in Postgres
      supabase.rpc("claim_owner_admin").catch(() => {});
      return;
    }

    supabase
      .rpc("claim_owner_admin")
      .then(({ data }) => {
        setIsAdmin(Boolean(data));
      })
      .catch(() => {
        setIsAdmin(false);
      });
  }, [session]);

  if (!isConfigured) {
    return (
      <Shell>
        <ConfigForm onConfigured={() => setIsConfigured(true)} />
      </Shell>
    );
  }

  if (!ready)
    return (
      <Shell>
        <p className="text-muted-foreground">Loading…</p>
      </Shell>
    );

  if (!session)
    return (
      <Shell>
        <AuthForm />
      </Shell>
    );

  if (isAdmin === null)
    return (
      <Shell>
        <p className="text-muted-foreground">Checking access…</p>
      </Shell>
    );

  if (!isAdmin)
    return (
      <Shell>
        <div className="max-w-md space-y-4 rounded-xl border border-border bg-card p-6 shadow-sm">
          <h1 className="text-2xl font-bold">No access</h1>
          <p className="text-muted-foreground">
            This account ({session.user.email}) is not an authorized administrator account.
          </p>
          <Button variant="outline" onClick={() => supabase.auth.signOut()}>
            <LogOut className="mr-2 size-4" /> Sign out
          </Button>
        </div>
      </Shell>
    );

  return <Dashboard email={session.user.email ?? ""} />;
}

function ConfigForm({ onConfigured }: { onConfigured: () => void }) {
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const { url } = getSupabaseConfig();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const cleanKey = key.trim();
    if (!cleanKey) {
      setError("Please enter a valid Supabase Anon / Publishable Key.");
      return;
    }
    setSupabasePublishableKey(cleanKey);
    onConfigured();
  }

  return (
    <div className="max-w-md rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-2 text-foreground">
        <KeyRound className="size-5 text-emerald-500" />
        <h1 className="text-xl font-bold">Admin Portal Setup</h1>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        Connect to Supabase project{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
          vnzllryrnuowvppgzzmc
        </code>
        .
      </p>
      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="supabase-url" className="text-xs text-muted-foreground">
            Supabase Project URL
          </Label>
          <Input
            id="supabase-url"
            value={url}
            disabled
            className="bg-muted font-mono text-xs text-muted-foreground"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="publishable-key">Supabase Anon / Publishable Key</Label>
          <Input
            id="publishable-key"
            type="password"
            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            value={key}
            onChange={(e) => {
              setKey(e.target.value);
              setError("");
            }}
            required
            autoComplete="off"
          />
          <p className="text-xs text-muted-foreground">
            Found in your Supabase Dashboard under{" "}
            <strong>Project Settings → API → Project API Keys</strong> (anon/public).
          </p>
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button type="submit" className="w-full">
          Save & Connect
        </Button>
      </form>
    </div>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-surface px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <a href="/" className="mb-8 inline-flex items-center gap-2 font-bold text-foreground">
          <img src="/dx-logo.png" alt="" className="size-9" /> DX Admin
        </a>
        {children}
      </div>
    </main>
  );
}

function AuthForm() {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email")).trim().toLowerCase();
    const password = String(f.get("password"));
    setBusy(true);
    setMsg("");
    const res =
      mode === "in"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: `${window.location.origin}/admin` },
          });
    setBusy(false);
    if (res.error) return setMsg(res.error.message);
    if (mode === "up" && !res.data.session)
      setMsg("Check your email and click the confirmation link, then sign in here.");
  }

  return (
    <form
      onSubmit={submit}
      className="max-w-sm space-y-4 rounded-lg border border-border bg-background p-6"
    >
      <h1 className="text-2xl font-bold">
        {mode === "in" ? "Admin sign in" : "Create admin account"}
      </h1>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete="current-password"
        />
      </div>
      {msg && (
        <p className="text-sm text-muted-foreground" role="status">
          {msg}
        </p>
      )}
      <Button type="submit" className="w-full" disabled={busy}>
        {busy ? "Please wait…" : mode === "in" ? "Sign in" : "Create account"}
      </Button>
      <button
        type="button"
        className="text-sm text-muted-foreground underline"
        onClick={() => setMode(mode === "in" ? "up" : "in")}
      >
        {mode === "in" ? "First time? Create an admin account" : "Already have an account? Sign in"}
      </button>
    </form>
  );
}

function csvEscape(v: unknown) {
  const s = String(v ?? "");
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [],
    cell = "",
    q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"' && text[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (c === '"') q = false;
      else cell += c;
    } else if (c === '"') q = true;
    else if (c === ",") {
      row.push(cell);
      cell = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else cell += c;
  }
  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows.filter((r) => r.some((x) => x.trim()));
}

function Dashboard({ email }: { email: string }) {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [note, setNote] = useState("");
  const [fetchError, setFetchError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setFetchError(null);
    try {
      const { data, error } = await supabase
        .from("waitlist")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5000);
      if (error) {
        setFetchError(error.message);
      } else {
        setRows((data as Row[]) ?? []);
      }
    } catch (err: unknown) {
      setFetchError(err instanceof Error ? err.message : "Failed to load waitlist");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return q
      ? rows.filter((r) =>
          [r.full_name, r.email, r.phone, r.use_case, r.region].some((x) =>
            x?.toLowerCase().includes(q),
          ),
        )
      : rows;
  }, [rows, query]);

  const today = rows.filter(
    (r) => new Date(r.created_at).toDateString() === new Date().toDateString(),
  ).length;
  const website = rows.filter((r) => r.source === "website").length;

  function exportCsv() {
    const head = [
      "Joined",
      "Full name",
      "Phone",
      "Email",
      "Region",
      "Main use",
      "Updates",
      "Source",
    ];
    const lines = filtered.map((r) =>
      [
        new Date(r.created_at).toISOString(),
        r.full_name,
        r.phone,
        r.email,
        r.region,
        r.use_case,
        r.updates_opt_in ? "Yes" : "No",
        r.source,
      ]
        .map(csvEscape)
        .join(","),
    );
    const blob = new Blob([[head.join(","), ...lines].join("\n")], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `dx-waitlist-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  }

  async function importCsv(file: File) {
    const [header, ...body] = parseCsv(await file.text());
    if (!header) return;
    const h = header.map((x) => x.toLowerCase());
    const col = (...keys: string[]) => h.findIndex((x) => keys.some((k) => x.includes(k)));
    const iName = col("name"),
      iPhone = col("phone", "whatsapp", "number"),
      iEmail = col("email"),
      iUse = col("use", "what would"),
      iRegion = col("region"),
      iTime = col("timestamp", "joined");
    if (iName < 0 || iEmail < 0)
      return setNote("Couldn't find Name and Email columns in that file.");
    const existing = new Set(rows.map((r) => r.email.toLowerCase()));
    const add = body
      .map((r) => ({
        full_name: r[iName]?.trim() || "Unknown",
        phone: (iPhone >= 0 ? r[iPhone]?.trim() : "") || "-",
        email: r[iEmail]?.trim().toLowerCase() ?? "",
        use_case: (iUse >= 0 ? r[iUse]?.trim() : null) ?? null,
        region: (iRegion >= 0 ? r[iRegion]?.trim() : null) ?? null,
        source: "csv_import",
        ...(iTime >= 0 && !isNaN(Date.parse(r[iTime]!.replace(" GMT", "")))
          ? { created_at: new Date(r[iTime]!.replace(" GMT", "")).toISOString() }
          : {}),
      }))
      .filter((r) => r.email && !existing.has(r.email) && (existing.add(r.email), true));
    if (!add.length)
      return setNote("No new contacts found — everyone in that file is already on the list.");
    const { error } = await supabase.from("waitlist").insert(add);
    setNote(error ? `Import failed: ${error.message}` : `Imported ${add.length} new contacts.`);
    load();
  }

  async function remove(id: string) {
    if (!confirm("Remove this person from the waitlist?")) return;
    await supabase.from("waitlist").delete().eq("id", id);
    setRows((r) => r.filter((x) => x.id !== id));
  }

  return (
    <Shell>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Waitlist</h1>
          <p className="text-sm text-muted-foreground">Signed in as {email}</p>
        </div>
        <Button variant="outline" onClick={() => supabase.auth.signOut()}>
          <LogOut className="mr-2 size-4" /> Sign out
        </Button>
      </div>

      {fetchError && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
          <p>
            <strong>Error loading waitlist entries:</strong> {fetchError}
          </p>
          <Button size="sm" variant="outline" onClick={load}>
            <RefreshCw className="mr-1.5 size-3.5" /> Retry
          </Button>
        </div>
      )}

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {[
          ["Total signups", rows.length],
          ["From website", website],
          ["Joined today", today],
        ].map(([l, v]) => (
          <div key={l} className="rounded-lg border border-border bg-background p-5">
            <p className="text-sm text-muted-foreground">{l}</p>
            <p className="mt-1 text-3xl font-bold">{v}</p>
          </div>
        ))}
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Search name, email, phone…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search waitlist"
          />
        </div>
        <Button onClick={exportCsv}>
          <Download /> Export CSV
        </Button>
        <Button variant="outline" asChild>
          <label className="cursor-pointer">
            <Upload /> Import CSV
            <input
              type="file"
              accept=".csv,text/csv"
              className="sr-only"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) importCsv(f);
                e.target.value = "";
              }}
            />
          </label>
        </Button>
      </div>
      {note && (
        <p className="mb-4 text-sm" role="status">
          {note}
        </p>
      )}

      <div className="overflow-x-auto rounded-lg border border-border bg-background">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead className="border-b border-border bg-surface text-muted-foreground">
            <tr>
              {["Joined", "Name", "Phone", "Email", "Main use", "Source", ""].map((h) => (
                <th key={h} className="px-4 py-3 font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                  Loading…
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                  <Users className="mx-auto mb-2" />
                  No signups found.
                </td>
              </tr>
            ) : (
              filtered.map((r) => (
                <tr key={r.id} className="border-b border-border last:border-0">
                  <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                    {new Date(r.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 font-medium">{r.full_name}</td>
                  <td className="whitespace-nowrap px-4 py-3">{r.phone}</td>
                  <td className="px-4 py-3">{r.email}</td>
                  <td className="max-w-[240px] truncate px-4 py-3" title={r.use_case ?? ""}>
                    {r.use_case || "—"}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {r.source === "website" ? "Website" : "Google Form"}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => remove(r.id)}
                      aria-label={`Remove ${r.full_name}`}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Shell>
  );
}
