import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Scale, AlertCircle, FileCheck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import dxLogo from "@/assets/dx-logo-icon-transparent.png.asset.json";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service | DX — Digital Dollars, Made Simple" },
      {
        name: "description",
        content:
          "Terms of Service for DX. Review our conditions of use, waitlist terms, prototype disclaimers, and governing law for The Gambia.",
      },
      { property: "og:title", content: "Terms of Service | DX" },
      {
        property: "og:description",
        content: "Terms of Service and conditions of use for DX in The Gambia.",
      },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
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
            <Scale className="size-3.5" />
            LEGAL AGREEMENT &amp; TERMS
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            DX Terms of Service
          </h1>
          <p className="text-sm font-medium text-muted-foreground">
            Effective Date: September 2026 • Last Updated: September 28, 2026
          </p>
        </div>

        <div className="mt-10 space-y-10 text-base leading-8 text-muted-foreground">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">1. Acceptance of Terms</h2>
            <p>
              Please read these Terms of Service ("Terms") carefully. By accessing, browsing, or
              registering on the DX website (the "Site"), or by submitting an entry to the DX
              early-access waiting list, you agree to be bound by these Terms and our Privacy
              Policy. If you do not agree, please do not use the Site or submit your information.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              2. Pre-Launch Status &amp; Demonstration Notice
            </h2>
            <div className="rounded-xl border border-warning/40 bg-warning/5 p-5 text-foreground">
              <div className="flex items-center gap-2 font-bold mb-2 text-warning">
                <AlertCircle className="size-5" />
                Prototype &amp; Educational Demonstrations Only
              </div>
              <p className="text-sm leading-6 text-muted-foreground">
                DX is currently in active pre-launch development. All interactive wallet previews,
                exchange rate displays (such as Dalasi to USDT conversions), card mockups, and
                transfer simulations on this website are visual and educational demonstrations
                created to illustrate our planned service architecture.
              </p>
            </div>
            <p>
              No real funds, fiat currencies, or cryptocurrency tokens are accepted, held, or
              transferred through this public marketing site. Joining our waitlist does not
              constitute the opening of a deposit account or credit facility.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">3. Waitlist &amp; Early Access</h2>
            <p>By joining the DX waitlist, you acknowledge and agree that:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Joining the waitlist is entirely free and involves no financial commitment.</li>
              <li>
                Inclusion on the waitlist does not guarantee immediate access to DX upon release, as
                rollouts may proceed in regional or invite-only stages.
              </li>
              <li>
                You will provide truthful and accurate information (name, phone number, email
                address, and region).
              </li>
              <li>
                DX reserves the right to decline or revoke waitlist registration for any individual
                submitting fraudulent, automated, or abusive entries.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">4. Eligibility</h2>
            <p>
              To participate in the DX waitlist and future services, you must be at least eighteen
              (18) years of age or the age of legal majority in your jurisdiction. DX is tailored
              primarily for users residing in The Gambia and members of the Gambian diaspora.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">5. Intellectual Property Rights</h2>
            <p>
              The DX brand name, logo, custom graphics, user interface designs, and code are the
              exclusive intellectual property of DX. You may not reproduce, duplicate, copy, sell,
              or exploit any portion of the service or visual assets without express written
              permission from our management team.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">6. Third-Party References</h2>
            <p>
              Any references to external payment networks (e.g. Wave, QMoney, Afrimoney), local
              banking institutions, card networks, or third-party crypto platforms (such as Exness,
              Binance, Trust Wallet, or Bybit) are used solely to illustrate compatibility or target
              ecosystem integration. Such references do not imply endorsement, sponsorship, or
              official partnership unless explicitly stated.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">7. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted under applicable law, DX and its founders, developers,
              and affiliates shall not be liable for any direct, indirect, incidental, or
              consequential damages arising out of your use of, or inability to use, this
              informational website or the early-access waitlist.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              8. Governing Law &amp; Jurisdiction
            </h2>
            <p>
              These Terms and any disputes relating to the DX platform or waitlist shall be governed
              by and construed in accordance with the laws of the Republic of The Gambia, without
              regard to its conflict of law principles.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">9. Changes to Terms</h2>
            <p>
              We reserve the right to revise these Terms at any time as our platform develops and
              regulatory frameworks evolve. Your continued use of the website following any updates
              constitutes your acceptance of the revised Terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">10. Inquiries &amp; Notices</h2>
            <p>For any questions regarding these Terms, please contact:</p>
            <div className="rounded-xl border border-border bg-surface p-6 space-y-2">
              <p className="font-bold text-foreground">DX Legal &amp; Compliance</p>
              <p>Email: founder@dxcompany.org</p>
              <p>Phone: +220 866714855</p>
              <p>The Gambia, West Africa</p>
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
