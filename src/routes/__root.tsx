import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  useRouterState,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { accentButton, outlineButton } from "@/lib/ui";

/** The live address. Share images need the full URL for LinkedIn and Facebook previews. */
const SITE_URL = "https://danielajimenezz.com";

import appCss from "../styles.css?url";
import { ThemeToggle } from "../components/ThemeToggle";

/** Shown for any address that doesn't match a page. Same type, buttons and voice as the rest of the site. */
function NotFoundComponent() {
  useEffect(() => {
    document.title = "Page not found — Daniela Jimenez";
  }, []);
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-6xl flex-col justify-center px-5 py-20 md:px-8">
      <p className="label-tech text-link">Error 404</p>
      <h1 className="mt-3 font-display text-foreground">This page doesn't exist.</h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
        The link may be old, or the address has a typo. My projects and teaching work are one click
        away.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/projects" className={accentButton}>
          See my projects <span aria-hidden>→</span>
        </Link>
        <Link to="/" className={outlineButton}>
          Go home
        </Link>
      </div>
    </section>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className={accentButton}
          >
            Try again
          </button>
          <a href="/" className={outlineButton}>
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Daniela Jimenez — UI/UX Designer in Chicago" },
      {
        name: "description",
        content:
          "Portfolio of Daniela Jimenez, Computer Science student at Illinois Tech and UI/UX designer working at the intersection of people, design, and technology.",
      },
      { name: "author", content: "Daniela Jimenez" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Daniela Jimenez" },
      { property: "og:image", content: `${SITE_URL}/og-image.png` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content:
          "Daniela Jimenez, UI/UX Design and Computer Science: creating spaces where people feel seen, supported, and informed.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: `${SITE_URL}/og-image.png` },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      // Plain pink square, matching the header logo (the SVG switches to soft pink in dark mode).
      { rel: "icon", href: "/favicon.svg?v=2", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon.ico?v=2", sizes: "any" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png?v=2" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,400&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <head>
        <HeadContent />
        <script
          // Dark is the default; switch to light before first paint only if the visitor chose it.
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem("daniela-theme")==="light"){document.documentElement.classList.remove("dark");document.documentElement.style.colorScheme="light"}}catch(e){}`,
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

const navItems = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
] as const;

function SiteHeader() {
  return (
    <header id="site-header" className="sticky top-0 z-30 border-b border-border bg-header">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 md:px-8 md:py-4">
        <Link
          to="/"
          className="flex min-w-0 items-center gap-3"
          aria-label="Daniela Jimenez — home"
        >
          <span aria-hidden className="block h-10 w-10 shrink-0 bg-primary md:h-11 md:w-11" />
          <span className="hidden min-w-0 sm:block">
            <span className="block whitespace-nowrap font-display text-2xl font-semibold leading-none text-foreground">
              Daniela Jimenez
            </span>
            <span className="label-tech mt-1 block truncate">UI/UX Design · Chicago</span>
          </span>
        </Link>

        <div className="flex shrink-0 items-center gap-4 sm:gap-6">
          <nav aria-label="Main" className="flex items-center gap-4 text-sm sm:gap-7">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                className="nav-underline before:absolute before:-inset-x-2 before:-inset-y-3 before:content-[''] text-muted-foreground transition-colors hover:text-link data-[status=active]:font-medium data-[status=active]:text-link"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

function SiteFooter() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const onContact = pathname.startsWith("/contact");

  return (
    <footer className="mt-auto bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 py-5 md:px-8">
        <p className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="font-display text-xl font-semibold leading-none">
            Let's build something.
          </span>
          <a
            href="mailto:danielajjmzz@gmail.com"
            className="text-sm underline decoration-1 underline-offset-4 hover:decoration-2"
          >
            danielajjmzz@gmail.com
          </a>
        </p>
        {onContact ? (
          <p className="text-xs tracking-[0.06em]">
            Chicago, Illinois · © {new Date().getFullYear()}
          </p>
        ) : (
          <Link
            to="/contact"
            className="inline-flex w-fit items-center gap-2 bg-ink px-4 py-2 text-sm font-semibold text-ink-foreground transition-opacity hover:opacity-85"
          >
            Get in touch <span aria-hidden>→</span>
          </Link>
        )}
      </div>
    </footer>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </QueryClientProvider>
  );
}
