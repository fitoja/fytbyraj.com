import Image from "next/image";
import Link from "next/link";

type SiteHeaderProps = {
  tone?: "light" | "dark";
};

export function SiteHeader({ tone = "dark" }: SiteHeaderProps) {
  const isLight = tone === "light";

  return (
    <header className={`site-header ${isLight ? "site-header--light" : ""}`}>
      <Link className="brand-mark" href="/">
        <span
          className="brand-mark__logo-frame"
          style={{
            display: "block",
            flex: "0 0 52px",
            height: "52px",
            position: "relative",
            width: "52px",
          }}
        >
          <Image
            src="/assets/fyt-by-raj-logo.png"
            alt="Fit By Raj logo"
            fill
            className="brand-mark__logo"
            sizes="52px"
            priority
          />
        </span>
        <span>
          <strong>FYTBYRAJ</strong>
          <small>Fitness & wellness</small>
        </span>
      </Link>

      <nav className="site-nav" aria-label="Primary navigation">
        <Link href="/">Home</Link>
        <Link href="/about">About Us</Link>
        <Link className="site-nav__cta" href="/#consultation">
          Consultation
        </Link>
      </nav>
    </header>
  );
}
