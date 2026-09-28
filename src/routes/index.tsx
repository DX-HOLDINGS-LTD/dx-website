import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowDownLeft, ArrowRight, ArrowUpRight, BadgeCheck, Banknote, Check,
  ChevronRight, CircleDollarSign, Clock3, CreditCard, Download, ExternalLink,
  Facebook, Globe2, History, Instagram, Landmark, Linkedin, LockKeyhole,
  Menu, Minus, Phone, Play, QrCode, Send, ShieldCheck, Smartphone, Sparkles,
  WalletCards, X, Youtube, Zap,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import dxLogo from "@/assets/dx-logo-icon-transparent.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "DX — Digital Dollars, Made Simple" },
    { name: "description", content: "Buy, sell, send and manage USDT through DX, built for The Gambia." },
    { property: "og:title", content: "DX — Digital Dollars, Made Simple" },
    { property: "og:description", content: "Your gateway to simple digital finance, built for The Gambia." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: HomePage,
});

const nav = [
  ["Home", "top"], ["DX", "wallet"], ["How It Works", "how-it-works"],
  ["DX Card", "dx-card"], ["FAQ", "faq"],
] as const;

function Brand({ inverse = false }: { inverse?: boolean }) {
  return <a href="#top" className={`flex items-center gap-2.5 font-extrabold text-xl ${inverse ? "text-dark-foreground" : "text-foreground"}`} aria-label="DX home">
    <img src={dxLogo.url} alt="" className="size-11 object-contain" />
    <span>DX</span>
  </a>;
}

function SiteHeader() {
  const [open, setOpen] = useState(false);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);
  return <header className="absolute inset-x-0 top-0 z-40 border-b border-border bg-background/85 backdrop-blur-lg">
    <div className="mx-auto grid h-20 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center px-5 sm:px-8 lg:px-10">
      <Brand />
      <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
        {nav.map(([label, id]) => <a key={id} href={`#${id}`} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">{label}</a>)}
        <Button asChild size="lg"><a href="#waitlist">Join Waitlist</a></Button>
      </nav>
      <Button variant="ghost" size="icon" className="size-11 lg:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? "Close navigation" : "Open navigation"}>{open ? <X /> : <Menu />}</Button>
    </div>
    {open && <div id="mobile-nav" className="absolute inset-x-0 top-20 border-b border-border bg-background p-5 shadow-2xl lg:hidden">
      <nav className="mx-auto flex max-w-7xl flex-col" aria-label="Mobile navigation">
        {nav.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="border-b border-border py-4 text-base font-semibold text-foreground">{label}</a>)}
        <Button asChild size="lg" className="mt-5 w-full"><a href="#waitlist" onClick={() => setOpen(false)}>Join Waitlist</a></Button>
      </nav>
    </div>}
  </header>;
}

function PreviewPill() { return <span className="inline-flex items-center gap-1.5 rounded-full border border-dark-border bg-dark-surface px-3 py-1 text-[11px] font-semibold text-dark-foreground/70"><Sparkles className="size-3" /> Product preview</span>; }

function WalletPhone() {
  return <div className="phone-float relative mx-auto w-full max-w-[360px] rounded-[2.5rem] border-[7px] border-foreground bg-background p-2.5 shadow-2xl">
    <div className="overflow-hidden rounded-[1.8rem] bg-background p-5 text-foreground">
      <div className="mb-10 flex items-center justify-between"><img src={dxLogo.url} alt="DX" className="size-11 object-contain"/><span className="rounded-full bg-brand-soft px-3 py-1 text-[10px] font-bold text-primary-hover">SIMPLE &amp; SECURE</span></div>
      <div className="flex items-center justify-center gap-3">
        <div className="rounded-xl border border-border bg-surface p-4 text-center"><span className="mx-auto grid size-9 place-items-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">D</span><p className="mt-2 text-[10px] text-muted-foreground">Dalasi</p><p className="font-extrabold">750</p></div>
        <ArrowRight className="size-5 text-primary-hover" />
        <div className="rounded-xl bg-dark p-5 text-center text-dark-foreground shadow-xl"><p className="text-[10px] font-bold text-primary">DX</p><p className="mt-2 text-2xl font-extrabold">$10</p><p className="text-[10px] text-dark-foreground/60">USDT balance</p></div>
        <ArrowRight className="size-5 text-primary-hover" />
        <div className="rounded-xl border border-border bg-surface p-4 text-center"><span className="mx-auto grid size-9 place-items-center rounded-lg bg-brand-soft text-sm font-bold text-primary-hover">$</span><p className="mt-2 text-[10px] text-muted-foreground">USDT</p><p className="font-extrabold">10.00</p></div>
      </div>
      <div className="mt-7 flex flex-wrap justify-center gap-2">{["Wave","Afrimoney","QMoney","Bank"].map(method=><span key={method} className="rounded-full border border-border bg-surface px-2.5 py-1 text-[10px] font-bold">{method}</span>)}</div>
      <div className="mt-7 text-center"><p className="text-2xl font-extrabold leading-tight">Buy Digital<br/>Dollars</p><p className="mx-auto mt-3 max-w-[270px] text-xs leading-5 text-muted-foreground">Purchase USDT quickly and securely with a simple, trusted experience.</p></div>
    </div>
  </div>;
}

function Hero() {
  return <section id="top" className="relative overflow-hidden bg-brand-soft pt-32 text-foreground sm:pt-36">
    <div className="mx-auto grid min-h-[760px] max-w-7xl items-center gap-16 px-5 pb-20 sm:px-8 lg:grid-cols-[1.02fr_.98fr] lg:px-10 lg:pb-24">
      <div className="section-reveal relative z-10 max-w-2xl">
        <p className="mb-6 flex items-center gap-2 text-sm font-semibold text-primary-hover"><ShieldCheck className="size-4" /> Simple &amp; Secure</p>
        <h1 className="text-[clamp(3.2rem,8vw,6.8rem)] font-extrabold leading-[.96] tracking-[0]">Buy Digital<br/><span className="text-primary-hover">Dollars.</span></h1>
        <p className="mt-7 max-w-xl text-lg leading-8 text-muted-foreground">Purchase USDT quickly and securely using supported local payment methods. No complicated platforms—just a simple, trusted way to access digital dollars.</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row"><Button asChild size="lg"><a href="#waitlist">Join the Waitlist <ArrowRight /></a></Button><Button asChild size="lg" variant="outline"><a href="#how-it-works">See How It Works</a></Button></div>
        <p className="mt-5 flex items-center gap-2 text-xs text-muted-foreground"><Globe2 className="size-4 text-primary-hover" /> Built in The Gambia · Join free</p>
      </div>
      <div className="relative mx-auto w-full max-w-lg pb-4 pt-6">
        <WalletPhone />
      </div>
    </div>
  </section>;
}

const features = [
  [Download,"Buy USDT","Buy USDT using supported local payment methods."], [ArrowUpRight,"Sell USDT","Sell your USDT and receive Gambian Dalasi."],
  [Send,"Send USDT","Send digital dollars using a DX ID, phone number or QR code."], [ArrowDownLeft,"Deposit","Receive USDT from compatible external wallets."],
  [ExternalLink,"Withdraw","Send USDT to your external wallet."], [History,"Track","View your balance and transaction history in one place."],
] satisfies ReadonlyArray<readonly [LucideIcon,string,string]>;

function IntroAndFeatures() {
  return <><section id="wallet" className="bg-background py-24 sm:py-32"><div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:px-10">
    <div><p className="text-sm font-bold text-primary-hover">BUILT FOR EVERYDAY USE</p><h2 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">Your Digital<br/>Dollar Wallet.</h2></div>
    <div className="border-l-2 border-primary pl-6 sm:pl-10"><p className="max-w-2xl text-xl leading-9 text-foreground">DX is designed to make buying, selling, sending and managing USDT simple for Gambians.</p><div className="mt-8 grid gap-3 text-base font-semibold sm:grid-cols-2"><p className="flex gap-2"><Check className="mt-0.5 size-5 text-primary" /> No complicated exchanges.</p><p className="flex gap-2"><Check className="mt-0.5 size-5 text-primary" /> No unnecessary complexity.</p></div><p className="mt-6 text-muted-foreground">Just a simple way to manage your digital dollars.</p></div>
  </div></section>
  <section className="bg-surface py-24 sm:py-28"><div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10"><SectionHeading eyebrow="WHAT YOU CAN DO" title="Everything you need. Nothing you don't." text="Clear tools for managing your digital dollars with confidence." />
    <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">{features.map(([Icon,title,text],i) => <article key={title} className={`group min-h-56 bg-background p-7 transition-colors hover:bg-brand-soft ${i===0 || i===5 ? "sm:min-h-64" : ""}`}><div className="grid size-11 place-items-center rounded-md bg-brand-soft text-primary-hover transition-transform group-hover:-translate-y-1"><Icon /></div><h3 className="mt-8 text-xl font-bold">{title}</h3><p className="mt-3 max-w-xs leading-7 text-muted-foreground">{text}</p></article>)}</div>
  </div></section></>;
}

function SectionHeading({eyebrow,title,text,inverse=false}: {eyebrow:string;title:string;text?:string;inverse?:boolean}) { return <div className="max-w-2xl"><p className={`text-xs font-extrabold ${inverse ? "text-primary" : "text-primary-hover"}`}>{eyebrow}</p><h2 className={`mt-4 text-4xl font-extrabold leading-tight sm:text-5xl ${inverse ? "text-dark-foreground" : "text-foreground"}`}>{title}</h2>{text && <p className={`mt-5 text-lg leading-8 ${inverse ? "text-dark-foreground/60" : "text-muted-foreground"}`}>{text}</p>}</div>; }

function HowItWorks() {
  const steps = [["Create Your Account","Sign up and complete the required verification."],["Buy or Deposit","Get USDT into your DX."],["Use Your USDT","Send it to another DX user or an external wallet."],["Sell or Withdraw","Convert your USDT to Dalasi or send it elsewhere."]];
  return <section id="how-it-works" className="bg-background py-24 sm:py-32"><div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10"><SectionHeading eyebrow="HOW IT WORKS" title="Four steps. That's it." text="A straightforward path from signing up to using digital dollars."/><ol className="relative mt-14 grid gap-8 lg:grid-cols-4 lg:gap-0"><div className="absolute left-[12%] right-[12%] top-7 hidden h-px bg-border lg:block" />{steps.map(([title,text],i)=><li key={title} className="relative grid grid-cols-[auto_1fr] gap-5 lg:block lg:pr-9"><span className="relative z-10 grid size-14 place-items-center rounded-full border border-primary bg-background font-bold text-primary-hover">0{i+1}</span><div className="lg:mt-8"><h3 className="text-lg font-bold">{title}</h3><p className="mt-2 leading-7 text-muted-foreground">{text}</p></div></li>)}</ol></div></section>;
}

function TradeCard({sell=false}: {sell?:boolean}) { return <article className="rounded-xl border border-dark-border bg-dark-surface p-5 sm:p-7"><div className="mb-8 flex items-center justify-between"><div><p className="text-xs font-bold text-primary">{sell ? "SELL" : "BUY"} USDT</p><h3 className="mt-1 text-xl font-bold text-dark-foreground">{sell ? "Sell USDT" : "Buy USDT"}</h3></div><span className="grid size-11 place-items-center rounded-full bg-primary/10 text-primary">{sell ? <ArrowUpRight/> : <ArrowDownLeft/>}</span></div><div className="space-y-4"><div className="rounded-lg border border-dark-border bg-dark p-4"><p className="text-xs text-dark-foreground/50">Amount</p><div className="mt-2 flex items-end justify-between"><span className="text-2xl font-bold text-dark-foreground">100</span><span className="text-sm font-bold text-primary">USDT</span></div></div><div className="rounded-lg border border-dark-border p-4"><p className="text-xs text-dark-foreground/50">{sell ? "You receive" : "You pay"}</p><p className="mt-2 text-2xl font-bold text-dark-foreground">D {sell ? "14,700" : "14,850"}</p></div><div className="flex items-center justify-between border-b border-dark-border py-3 text-sm"><span className="text-dark-foreground/50">{sell ? "Receive via" : "Payment method"}</span><span className="font-semibold text-dark-foreground">{sell ? "Mobile Money" : "Wave"}</span></div><Button variant="hero" size="lg" className="w-full" disabled>{sell ? "Confirm Sale" : "Confirm Purchase"}</Button><p className="text-center text-[11px] text-dark-foreground/40">Visual demonstration only</p></div></article>; }

function BuySell() { return <section className="bg-dark py-24 sm:py-32"><div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10"><div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"><SectionHeading eyebrow="PRODUCT PREVIEW" title="Buy & Sell USDT" text="A clear, guided experience designed to keep every step easy to understand." inverse/><PreviewPill/></div><div className="mt-14 grid gap-6 lg:grid-cols-2"><TradeCard/><TradeCard sell/></div></div></section>; }

function SendShowcase() { return <section className="overflow-hidden bg-surface py-24 sm:py-32"><div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:px-10"><div><SectionHeading eyebrow="SEND USDT" title="Send Digital Dollars in Seconds." text="Choose the detail you already have. DX is designed to make sending feel quick and familiar."/><div className="mt-8 flex flex-wrap gap-3">{([[BadgeCheck,"DX ID"],[Phone,"Phone Number"],[QrCode,"QR Code"]] satisfies ReadonlyArray<readonly [LucideIcon,string]>).map(([Icon,label])=><span key={label} className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold"><Icon className="size-4 text-primary-hover"/>{label}</span>)}</div></div><div className="mx-auto w-full max-w-md rounded-[2rem] border-[6px] border-foreground bg-background p-6 shadow-2xl"><div className="flex items-center justify-between"><h3 className="text-xl font-extrabold">Send USDT</h3><span className="text-xs text-muted-foreground">Preview</span></div><div className="mt-8 space-y-5"><div><p className="text-xs font-semibold text-muted-foreground">To</p><div className="mt-2 rounded-lg border border-input p-4 font-bold">DX102847</div></div><div><p className="text-xs font-semibold text-muted-foreground">Amount</p><div className="mt-2 flex items-center justify-between rounded-lg border border-primary bg-brand-soft p-4"><span className="text-2xl font-bold">50</span><span className="font-bold text-primary-hover">USDT</span></div></div><Button size="lg" className="w-full" disabled>Send USDT <Send/></Button><p className="text-center text-[11px] text-muted-foreground">Visual demonstration only</p></div></div></div></section>; }

function ExternalAndWhy() { const why: ReadonlyArray<readonly [LucideIcon,string,string]>=[[Sparkles,"Simple","Designed for people who don't want complicated financial platforms."],[Zap,"Fast","Designed to make everyday transactions quick and convenient."],[ShieldCheck,"Secure","Security is built into the DX experience."],[Landmark,"Local","Built with the needs of Gambian users in mind."]]; return <><section className="bg-background py-24"><div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10"><div className="grid gap-12 lg:grid-cols-2"><SectionHeading eyebrow="EXTERNAL WALLETS" title="Connect With Your Digital World." text="Send USDT to your DX from compatible external wallets, or withdraw it when you need it."/><div className="grid grid-cols-2 gap-3">{["Exness","Binance","Trust Wallet","Bybit"].map(x=><div key={x} className="flex min-h-24 items-center gap-3 rounded-lg border border-border bg-surface p-4 font-bold"><span className="grid size-9 place-items-center rounded-md bg-brand-soft text-primary-hover"><WalletCards className="size-4"/></span>{x}</div>)}</div></div><p className="mt-7 text-sm text-muted-foreground">Compatible platforms may include those shown above. Names are examples only and do not imply partnership, endorsement, or official integration.</p></div></section><section className="border-y border-border bg-surface py-24"><div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10"><SectionHeading eyebrow="WHY DX" title="Built around what matters."/><div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{why.map(([Icon,title,text])=><div key={title}><Icon className="size-7 text-primary-hover"/><h3 className="mt-5 text-xl font-bold">{title}</h3><p className="mt-2 leading-7 text-muted-foreground">{text}</p></div>)}</div></div></section></>; }

function DXCard() {
  const creationSteps = [
    ["01", "Join DX", "Create your DX profile and complete the required identity checks."],
    ["02", "Request your card", "Submit your card request when card access becomes available."],
    ["03", "Add funds", "Move money from your DX USDT balance onto your card."],
    ["04", "Start spending", "Use your card wherever the supported card network is accepted."],
  ] as const;
  const cardUses: ReadonlyArray<readonly [LucideIcon,string,string]> = [
    [Globe2, "Shop online", "Pay on international websites and digital services."],
    [Smartphone, "Subscriptions", "Use it for apps, streaming, software and recurring payments."],
    [CreditCard, "Everyday purchases", "Pay in stores and at supported card terminals."],
    [ShieldCheck, "Stay in control", "Manage card access and spending from your DX account."],
  ];
  return <section id="dx-card" className="bg-dark py-24 text-dark-foreground sm:py-32"><div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
    <div className="grid items-center gap-14 lg:grid-cols-[.9fr_1.1fr]">
      <div><p className="text-xs font-extrabold text-primary">DX CARD</p><h2 className="mt-4 text-4xl font-extrabold leading-tight sm:text-6xl">Your digital dollars, ready to spend.</h2><p className="mt-6 max-w-xl text-lg leading-8 text-dark-foreground/65">Create your card through DX, fund it from your USDT balance, and use it for supported online and everyday payments.</p><span className="mt-7 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-bold text-primary"><Sparkles className="size-4"/> Product preview</span></div>
      <div className="relative mx-auto w-full max-w-lg py-10"><div className="relative z-10 mx-auto aspect-[1.58/1] max-w-md rounded-2xl border border-primary/35 bg-primary p-7 text-primary-foreground shadow-2xl sm:p-9"><div className="flex items-start justify-between"><img src={dxLogo.url} alt="DX" className="size-14 object-contain"/><CreditCard className="size-9"/></div><div className="mt-12 text-xl font-semibold tracking-[.18em]">••••&nbsp; ••••&nbsp; ••••&nbsp; 2048</div><div className="mt-8 flex items-end justify-between"><div><p className="text-[10px] opacity-60">CARD HOLDER</p><p className="mt-1 text-sm font-bold">YOUR NAME</p></div><p className="text-lg font-extrabold">VIRTUAL</p></div></div></div>
    </div>
    <div className="mt-20"><h3 className="text-2xl font-bold">How to create your DX Card</h3><ol className="mt-8 grid gap-px overflow-hidden rounded-lg border border-dark-border bg-dark-border sm:grid-cols-2 lg:grid-cols-4">{creationSteps.map(([number,title,text])=><li key={number} className="bg-dark-surface p-6"><span className="text-sm font-extrabold text-primary">{number}</span><h4 className="mt-7 text-lg font-bold">{title}</h4><p className="mt-3 text-sm leading-6 text-dark-foreground/60">{text}</p></li>)}</ol></div>
    <div className="mt-16"><h3 className="text-2xl font-bold">What you can use it for</h3><div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{cardUses.map(([Icon,title,text])=><div key={title}><span className="grid size-11 place-items-center rounded-md bg-primary/10 text-primary"><Icon className="size-5"/></span><h4 className="mt-5 font-bold">{title}</h4><p className="mt-2 text-sm leading-6 text-dark-foreground/60">{text}</p></div>)}</div></div>
    <div className="mt-12 border-t border-dark-border pt-8"><Button asChild size="lg" variant="hero"><a href="#waitlist">Join the card waitlist <ArrowRight/></a></Button><p className="mt-4 max-w-xl text-xs leading-5 text-dark-foreground/45">Card availability, supported countries, fees and network details will be confirmed before launch.</p></div>
  </div></section>;
}

function VideoStory() {
  return <section id="video" className="bg-background py-24 sm:py-32"><div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
    <div className="mx-auto max-w-3xl text-center"><p className="text-xs font-extrabold text-primary-hover">SEE DX IN ACTION</p><h2 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">Digital dollars, made clear.</h2><p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">A closer look at how DX is being built to make buying, sending and spending digital dollars feel simple.</p></div>
    <div className="relative mt-12 aspect-video w-full overflow-hidden rounded-xl border border-border bg-dark shadow-2xl">
      <div className="absolute inset-0 grid place-items-center p-6 text-center">
        <div><img src={dxLogo.url} alt="" className="mx-auto size-20 object-contain sm:size-24"/><p className="mt-5 text-sm font-bold text-dark-foreground">The DX Story</p><p className="mt-2 text-xs text-dark-foreground/50">Video coming soon</p></div>
      </div>
      <Button type="button" variant="hero" size="icon" className="absolute left-1/2 top-1/2 size-16 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-2xl sm:size-20" disabled aria-label="DX story video coming soon"><Play className="size-6 fill-current sm:size-7"/></Button>
      <div className="absolute inset-x-0 bottom-0 h-1 bg-dark-border"><div className="h-full w-0 bg-primary"/></div>
    </div>
  </div></section>;
}

function ComingSoon() { const items: ReadonlyArray<readonly [LucideIcon,string,string,string,string]>=[[Smartphone,"Bills & Airtime","Pay for Everyday Essentials.","Future support for electricity, airtime, utilities and other everyday payments.","Coming Soon"],[CircleDollarSign,"More Financial Services","More Ways to Use Your Money.","DX plans to continue expanding its financial services.","More Coming Soon"]]; return <section id="coming-soon" className="bg-surface py-24 sm:py-32"><div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10"><SectionHeading eyebrow="THE JOURNEY AHEAD" title="And We're Just Getting Started." text="DX is the beginning of a larger digital-finance journey."/><div className="mt-14 grid gap-5 lg:grid-cols-2">{items.map(([Icon,title,sub,text,badge])=><article key={title} className="border border-border bg-background p-7"><div className="flex items-start justify-between gap-3"><Icon className="size-8 text-primary-hover"/><span className="rounded-full border border-primary/30 bg-brand-soft px-3 py-1 text-[10px] font-bold text-primary-hover">{badge}</span></div><h3 className="mt-10 text-2xl font-bold">{title}</h3><p className="mt-2 font-semibold text-primary-hover">{sub}</p><p className="mt-4 leading-7 text-muted-foreground">{text}</p></article>)}</div></div></section>; }

const useCases=["Forex","Freelancing","Online Business","International Payments","Digital Assets","Personal Use","Other"];
function FieldError({children}:{children:string | undefined}) { return children ? <p className="mt-1.5 text-xs font-medium text-destructive">{children}</p> : null; }
function Waitlist() {
  const [status,setStatus]=useState<"idle"|"loading"|"success">("idle"); const [errors,setErrors]=useState<Record<string,string>>({});
  function submit(e:FormEvent<HTMLFormElement>){e.preventDefault(); const data=new FormData(e.currentTarget); const next:Record<string,string>={}; const name=String(data.get("name")||"").trim(), phone=String(data.get("phone")||"").trim(), email=String(data.get("email")||"").trim(); if(name.length<2)next["name"]="Please enter your full name."; if(!/^\+?[0-9\s-]{7,18}$/.test(phone))next["phone"]="Please enter a valid phone number."; if(!/^\S+@\S+\.\S+$/.test(email))next["email"]="Please enter a valid email address."; if(!data.get("region"))next["region"]="Please select your region."; if(!data.get("useCase"))next["useCase"]="Please select a main use."; setErrors(next); if(Object.keys(next).length)return; setStatus("loading"); window.setTimeout(()=>setStatus("success"),900); }
  return <section id="waitlist" className="bg-primary py-24 sm:py-32"><div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[.85fr_1.15fr] lg:px-10"><div><p className="text-xs font-extrabold text-primary-foreground/70">EARLY ACCESS</p><h2 className="mt-4 text-5xl font-extrabold leading-tight text-primary-foreground sm:text-6xl">Be One of<br/>the First.</h2><p className="mt-6 max-w-md text-lg leading-8 text-primary-foreground/75">DX is being built now. Join the waiting list and be among the first to experience simple digital finance built for The Gambia.</p></div><div className="bg-background p-6 shadow-2xl sm:p-9">{status==="success"?<div className="flex min-h-[480px] flex-col items-center justify-center text-center"><span className="check-pop grid size-16 place-items-center rounded-full bg-brand-soft text-primary-hover"><Check className="size-8"/></span><h3 className="mt-6 text-3xl font-extrabold">You're In!</h3><p className="mt-3 max-w-sm leading-7 text-muted-foreground">You're officially on the DX waiting list.<br/>We'll keep you updated as we get closer to launch.</p><Button asChild size="lg" className="mt-8"><a href="#journey">Follow Our Journey <ArrowRight/></a></Button></div>:<form noValidate onSubmit={submit} aria-label="Join the DX waitlist"><div className="grid gap-5 sm:grid-cols-2"><div><Label htmlFor="name">Full Name</Label><Input id="name" name="name" maxLength={100} className="mt-2 h-12" aria-invalid={!!errors["name"]}/><FieldError>{errors["name"]}</FieldError></div><div><Label htmlFor="phone">Phone Number</Label><Input id="phone" name="phone" type="tel" maxLength={18} placeholder="+220" className="mt-2 h-12" aria-invalid={!!errors["phone"]}/><FieldError>{errors["phone"]}</FieldError></div><div><Label htmlFor="email">Email Address</Label><Input id="email" name="email" type="email" maxLength={255} className="mt-2 h-12" aria-invalid={!!errors["email"]}/><FieldError>{errors["email"]}</FieldError></div><div><Label htmlFor="region">Region</Label><select id="region" name="region" className="mt-2 h-12 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:ring-2 focus-visible:ring-ring" aria-invalid={!!errors["region"]}><option value="">Select region</option>{["Banjul","Kanifing","West Coast","North Bank","Lower River","Central River","Upper River","Outside The Gambia"].map(x=><option key={x}>{x}</option>)}</select><FieldError>{errors["region"]}</FieldError></div></div><fieldset className="mt-6"><legend className="text-sm font-medium">What would you mainly use DX for?</legend><div className="mt-3 flex flex-wrap gap-2">{useCases.map(x=><label key={x} className="cursor-pointer"><input className="peer sr-only" type="radio" name="useCase" value={x}/><span className="inline-flex min-h-10 items-center rounded-full border border-input px-4 text-sm transition-colors peer-checked:border-primary peer-checked:bg-brand-soft peer-checked:text-primary-hover">{x}</span></label>)}</div><FieldError>{errors["useCase"]}</FieldError></fieldset><Button size="lg" className="mt-7 w-full" type="submit" disabled={status==="loading"}>{status==="loading"?<><span className="size-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground"/> Joining...</>:<>Join the Waitlist <ArrowRight/></>}</Button><p className="mt-4 text-center text-xs text-muted-foreground">Free to join. No financial commitment.</p></form>}</div></div></section>;
}

const lessons:Record<string,string>={"What is USDT?":"USDT is a digital token designed to track the value of the US dollar. DX aims to make handling it clear and approachable.","How does buying work?":"Choose an amount, review the Dalasi total and payment method, then confirm. The final product will guide each step.","How does selling work?":"Choose how much USDT to sell, review the Dalasi amount you would receive, and select an available payout method.","How do I deposit?":"A deposit moves USDT from a compatible external wallet into your DX using the provided wallet details.","How do I withdraw?":"A withdrawal sends USDT from DX to a compatible external wallet address after you review the details."};
function Learn() { return <section className="bg-background py-24"><div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10"><SectionHeading eyebrow="LEARN" title="New to Digital Dollars?" text="Don't worry. We're building DX to be simple enough for everyone."/><div className="mt-10 divide-y divide-border border-y border-border">{Object.entries(lessons).map(([title,text])=><Dialog key={title}><DialogTrigger asChild><Button variant="ghost" className="h-auto w-full justify-between rounded-none px-0 py-5 text-left text-base hover:bg-transparent hover:text-primary-hover">{title}<ChevronRight/></Button></DialogTrigger><DialogContent className="max-w-md rounded-lg"><DialogHeader><DialogTitle className="text-2xl">{title}</DialogTitle><DialogDescription className="pt-3 text-base leading-7">{text}</DialogDescription></DialogHeader></DialogContent></Dialog>)}</div></div></section>; }

const faqs=[["What is DX?","DX is a digital-dollar wallet being designed for Gambian users to buy, sell, send and manage USDT simply."],["What is USDT?","USDT is a digital token designed to maintain a value close to the US dollar."],["Who can use DX?","DX is being built with Gambian users in mind. Final eligibility requirements will be shared before launch."],["How can I buy USDT?","The planned experience lets users choose an amount and complete payment through supported local methods."],["How can I sell USDT?","The planned experience lets users sell USDT and receive Gambian Dalasi through available payout methods."],["Can I send USDT to another person?","The planned wallet will support sending through a DX ID, phone number, or QR code."],["Can I deposit from another wallet?","DX is planned to accept deposits from compatible external wallets."],["When will DX launch?","A launch date has not been announced. Join the waitlist for updates."],["Is joining the waiting list free?","Yes. Joining the DX waiting list is completely free."]];
function FAQ(){return <section id="faq" className="bg-surface py-24 sm:py-32"><div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[.75fr_1.25fr] lg:px-10"><SectionHeading eyebrow="FAQ" title="Questions, answered." text="The essentials about DX and the planned experience."/><Accordion type="single" collapsible className="border-t border-border">{faqs.map(([q,a],i)=><AccordionItem key={q} value={`q-${i}`}><AccordionTrigger className="py-6 text-base font-bold hover:no-underline">{q}</AccordionTrigger><AccordionContent className="max-w-2xl pb-6 leading-7 text-muted-foreground">{a}</AccordionContent></AccordionItem>)}</Accordion></div></section>}

const socials = [["TikTok",Zap],["Instagram",Instagram],["Facebook",Facebook],["X",X],["YouTube",Youtube],["LinkedIn",Linkedin]] satisfies ReadonlyArray<readonly [string,LucideIcon]>;
function JourneyContact(){const [sent,setSent]=useState(false); function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();const f=e.currentTarget;if(!f.checkValidity()){f.reportValidity();return;}setSent(true);} return <><section id="journey" className="bg-background py-24"><div className="mx-auto max-w-7xl px-5 text-center sm:px-8 lg:px-10"><SectionHeading eyebrow="FOLLOW THE JOURNEY" title="We're Building DX From The Gambia." text="Follow our journey as we build DX from the ground up."/><div className="mx-auto mt-10 flex max-w-xl flex-wrap justify-center gap-3">{socials.map(([name,Icon])=><a key={name} href="#journey" aria-label={name} title={`${name} link coming soon`} className="grid size-12 place-items-center rounded-full border border-border transition-colors hover:border-primary hover:bg-brand-soft hover:text-primary-hover"><Icon className="size-5"/></a>)}</div></div></section><section id="contact" className="border-t border-border bg-surface py-24"><div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:px-10"><div><SectionHeading eyebrow="CONTACT" title="Have a Question?"/><div className="mt-8 space-y-4"><a href="mailto:abdoulieojay@gmail.com" className="flex items-center gap-3 font-semibold hover:text-primary-hover"><span className="grid size-10 place-items-center rounded-full bg-brand-soft"><Send className="size-4"/></span>abdoulieojay@gmail.com</a><a href="tel:+2203384626" className="flex items-center gap-3 font-semibold hover:text-primary-hover"><span className="grid size-10 place-items-center rounded-full bg-brand-soft"><Phone className="size-4"/></span>+220 338 4626</a></div></div>{sent?<div className="flex min-h-72 flex-col items-center justify-center border border-border bg-background p-8 text-center"><BadgeCheck className="size-12 text-primary"/><h3 className="mt-5 text-2xl font-bold">Message ready</h3><p className="mt-2 max-w-sm text-muted-foreground">Thanks for reaching out. This preview does not send messages yet.</p></div>:<form onSubmit={submit} className="border border-border bg-background p-6 sm:p-8"><div className="grid gap-5"><div><Label htmlFor="contact-name">Full Name</Label><Input id="contact-name" required minLength={2} maxLength={100} className="mt-2 h-12"/></div><div><Label htmlFor="contact-email">Email Address</Label><Input id="contact-email" type="email" required maxLength={255} className="mt-2 h-12"/></div><div><Label htmlFor="message">Message</Label><Textarea id="message" required minLength={10} maxLength={1000} className="mt-2 min-h-32 resize-y"/></div><Button size="lg" type="submit">Contact Us <ArrowRight/></Button></div></form>}</div></section></>}

function Footer(){return <footer className="bg-dark py-14 text-dark-foreground"><div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10"><div className="grid gap-10 border-b border-dark-border pb-12 lg:grid-cols-[1fr_auto]"><div><Brand inverse/><p className="mt-4 text-sm text-dark-foreground/55">Your Gateway to Global Finance.</p></div><div className="grid grid-cols-2 gap-x-10 gap-y-4 text-sm sm:grid-cols-3">{[...nav,["Contact","contact"] as const].map(([label,id])=><a key={id} href={`#${id}`} className="text-dark-foreground/65 hover:text-primary">{label}</a>)}<a href="#top" className="text-dark-foreground/65 hover:text-primary">Privacy Policy</a><a href="#top" className="text-dark-foreground/65 hover:text-primary">Terms of Service</a></div></div><div className="flex flex-col gap-4 pt-7 text-xs text-dark-foreground/45 sm:flex-row sm:items-center sm:justify-between"><p>© 2026 DX. All rights reserved.</p><p>Built in The Gambia. Designed for the world.</p></div></div></footer>}

function HomePage(){return <main><SiteHeader/><Hero/><IntroAndFeatures/><HowItWorks/><BuySell/><SendShowcase/><ExternalAndWhy/><DXCard/><VideoStory/><ComingSoon/><Waitlist/><Learn/><FAQ/><JourneyContact/><Footer/></main>}