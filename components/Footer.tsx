import { site } from "@/content/site";
import { nav } from "@/content/nav";
import { footer } from "@/content/footer";

export function Footer() {
  return (
    <footer className="relative border-t border-line/70">
      <div className="mx-auto max-w-[1400px] px-8 py-16 sm:px-12 md:px-20 md:py-20 lg:px-28">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2">
              <span className="font-display text-lg font-bold tracking-[0.06em] text-bone">
                {site.name}
              </span>
              <span className="size-1.5 bg-signal shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
            </div>
            <p className="mt-4 max-w-[32ch] text-sm leading-relaxed text-muted">
              {footer.tagline}
            </p>
            <a
              href={`mailto:${footer.email}`}
              className="mt-6 inline-block font-mono text-sm tracking-[0.04em] text-bone transition-colors duration-200 ease-out hover:text-signal"
            >
              {footer.email}
            </a>
          </div>

          {/* Navigation */}
          <nav className="md:col-span-4 md:col-start-7">
            <ul className="grid grid-cols-2 gap-3">
              {nav.items.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="font-mono text-xs uppercase tracking-[0.16em] text-muted transition-colors duration-200 ease-out hover:text-signal"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Socials */}
          <div className="md:col-span-2 md:col-start-11">
            <ul className="grid gap-3">
              {footer.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs uppercase tracking-[0.16em] text-muted transition-colors duration-200 ease-out hover:text-signal"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-line/60 pt-8">
          <p className="font-mono text-[11px] tracking-[0.1em] text-faint">
            {footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
