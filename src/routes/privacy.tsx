import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Shield, Lock, FileText, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import dxLogo from "@/assets/dx-logo-icon-transparent.png.asset.json";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | DX — Digital Dollars, Made Simple" },
      {
        name: "description",
        content:
          "Privacy Policy for DX. Learn how we handle and protect your personal information, waitlist data, and communications in The Gambia.",
      },
      { property: "og:title", content: "Privacy Policy | DX" },
      {
        property: "og:description",
        content: "Learn how DX protects your privacy, waitlist data, and personal information.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur-md sticky top-0 z-40">
        <div className="mx-auto flex h-20 max-w-5xl items-center justify-between px-5 sm:px-8">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={dxLogo.url}
              alt="DX"
              className="size-10 rounded-xl object-contain shadow-sm"
            />
            <span className="text-2xl font-black tracking-tight group-hover:text-primary-hover transition-colors">
              DX
            </span>
          </Link>
          <Button asChild variant="ghost" size="sm">
            <Link to="/">
              <ArrowLeft className="mr-2 size-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-brand-soft px-3.5 py-1 text-xs font-bold text-primary-hover">
            <Shield className="size-3.5" />
            DATA PROTECTION &amp; PRIVACY
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">DX Privacy Policy</h1>
          <p className="text-sm font-medium text-muted-foreground">
            Effective Date: September 2026 • Last Updated: September 28, 2026
          </p>
        </div>

        <div className="mt-10 space-y-10 text-base leading-8 text-muted-foreground">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">1. Introduction</h2>
            <p>
              Welcome to DX ("we", "our", or "us"). We are committed to protecting your personal
              privacy and maintaining the confidentiality of any information you share with us. This
              Privacy Policy explains how DX collects, uses, stores, and safeguards your personal
              details when you visit our website, register for the early-access waitlist, or contact
              our team.
            </p>
            <p>
              DX is proudly being built in The Gambia to provide a streamlined, secure platform for
              digital dollars (USDT). As we prepare for our launch, transparency regarding data
              practices is foundational to our mission.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">2. Information We Collect</h2>
            <p>
              During this pre-launch and early-access phase, we collect information you voluntarily
              provide to us through our waitlist and contact forms:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-foreground">Contact Identification:</strong> Full name,
                email address, and Gambian or international telephone number (e.g., +220 numbers).
              </li>
              <li>
                <strong className="text-foreground">Geographic Region:</strong> Your selected
                administrative division within The Gambia (Banjul, Kanifing, West Coast, North Bank,
                Lower River, Central River, Upper River) or indication of residing outside The
                Gambia.
              </li>
              <li>
                <strong className="text-foreground">Fintech &amp; Use-Case Preferences:</strong>{" "}
                Your intended primary use for DX (such as Freelancing payouts, Online Business,
                Forex, International Payments, or Personal Use).
              </li>
              <li>
                <strong className="text-foreground">Technical Device Data:</strong> Standard server
                logs including browser type, operating system, and IP address for diagnostic
                security and fraud prevention.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">3. How We Use Your Information</h2>
            <p>We use the data collected strictly for legitimate purposes, including:</p>
            <div className="grid gap-4 sm:grid-cols-2 mt-4">
              <div className="rounded-xl border border-border bg-surface p-5">
                <div className="flex items-center gap-2 font-bold text-foreground mb-2">
                  <CheckCircle2 className="size-4 text-primary" />
                  Waitlist Administration
                </div>
                <p className="text-sm leading-6">
                  Reserving your priority spot, managing onboarding batches, and providing
                  early-access access codes.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-surface p-5">
                <div className="flex items-center gap-2 font-bold text-foreground mb-2">
                  <CheckCircle2 className="size-4 text-primary" />
                  Product Updates
                </div>
                <p className="text-sm leading-6">
                  Sending critical development milestones, product rollout announcements, and
                  official launch dates.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-surface p-5">
                <div className="flex items-center gap-2 font-bold text-foreground mb-2">
                  <CheckCircle2 className="size-4 text-primary" />
                  Payment Rails Planning
                </div>
                <p className="text-sm leading-6">
                  Aggregating regional demand to optimize local liquidity points and mobile money
                  integrations (Wave, QMoney, Afrimoney, and local banks).
                </p>
              </div>
              <div className="rounded-xl border border-border bg-surface p-5">
                <div className="flex items-center gap-2 font-bold text-foreground mb-2">
                  <CheckCircle2 className="size-4 text-primary" />
                  Security &amp; Abuse Prevention
                </div>
                <p className="text-sm leading-6">
                  Preventing automated bot registrations, duplicate entries, and unauthorized access
                  to our systems.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">4. Data Storage and Protection</h2>
            <p>
              We implement industry-standard organizational and technological safeguards to prevent
              loss, misuse, or unauthorized alteration of your personal records.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>All web communications use TLS/HTTPS encryption in transit.</li>
              <li>
                Waitlist records are kept on protected servers with restricted administrative
                access.
              </li>
              <li>
                We will never sell, rent, or trade your personal email address or phone number to
                third-party marketers or data brokers.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">5. Your Privacy Rights</h2>
            <p>
              You maintain full ownership of your personal information. At any time before or after
              our official launch, you have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Request confirmation of whether we hold your personal data.</li>
              <li>Request correction or updating of your phone number, name, or region.</li>
              <li>
                Request the permanent removal of your contact details from the DX early-access
                waiting list.
              </li>
              <li>Opt-out of any promotional or informational email newsletters.</li>
            </ul>
            <p>
              To exercise any of these rights, simply email our team at{" "}
              <a
                href="mailto:abdoulieojay@gmail.com"
                className="font-bold text-primary-hover hover:underline"
              >
                abdoulieojay@gmail.com
              </a>
              .
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">6. Demonstration Notice</h2>
            <p>
              The current DX website features prototype models, rate previews (e.g. Gambian Dalasi
              to USDT ratios), and interactive workflow mockups. These interfaces are educational
              demonstrations designed to illustrate our proposed user experience. No real monetary
              transactions are processed on this marketing website.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">7. Contact Information</h2>
            <p>
              If you have any questions or feedback regarding our privacy standards, contact us:
            </p>
            <div className="rounded-xl border border-border bg-surface p-6 space-y-2">
              <p className="font-bold text-foreground">DX Official Team</p>
              <p>Email: abdoulieojay@gmail.com</p>
              <p>Phone: +220 338 4626</p>
              <p>Location: The Gambia</p>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-surface py-10 text-center text-sm text-muted-foreground">
        <p>© 2026 DX. All rights reserved. Built in The Gambia. Designed for the world.</p>
      </footer>
    </div>
  );
}
