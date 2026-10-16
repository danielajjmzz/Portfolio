import { useId, useState, type FormEvent } from "react";
import { Send } from "lucide-react";

/**
 * Formspree form ID (the part after https://formspree.io/f/).
 * Set VITE_FORMSPREE_FORM_ID in a .env file, or paste the ID here.
 * Until one is set, submitting opens the visitor's email app with the message prefilled.
 */
const FORMSPREE_FORM_ID = (import.meta.env["VITE_FORMSPREE_FORM_ID"] as string | undefined) ?? "";
const CONTACT_EMAIL = "danielajjmzz@gmail.com";

const contactTopics = [
  "Internship",
  "Freelance project",
  "Entry-level role",
  "Design collaboration",
  "Community project",
  "Something else",
] as const;

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "w-full border-0 border-b border-form-foreground/45 bg-transparent px-0 py-2 text-[0.9375rem] text-form-foreground placeholder:text-form-muted focus:border-form-foreground focus:outline-none focus-visible:ring-0";
const labelClass = "text-xs font-semibold text-form-foreground";

export function ContactForm() {
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const topics = data.getAll("topics").map(String);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");

    if (!FORMSPREE_FORM_ID) {
      const body = `${message}\n\nFrom: ${name} <${email}>${topics.length ? `\nAbout: ${topics.join(", ")}` : ""}`;
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Portfolio message from ${name}`)}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          topics: topics.join(", ") || "Not specified",
          _subject: `Portfolio message from ${name}`,
          _gotcha: String(data.get("_gotcha") ?? ""),
        }),
      });
      if (!response.ok) throw new Error(String(response.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex h-full flex-col" aria-describedby={`${id}-status`}>
      <h2 className="text-form-foreground">Tell me what you're working on.</h2>
      <p className="mt-3 text-sm text-form-foreground">
        A few lines is plenty. I'll get back to you by email.
      </p>

      <div className="mt-7 grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className={labelClass}>
            Name
          </label>
          <input
            id={`${id}-name`}
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor={`${id}-email`} className={labelClass}>
            Email
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor={`${id}-message`} className={labelClass}>
          Message
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          required
          rows={3}
          placeholder="Tell me about your project or opportunity…"
          className={`${fieldClass} resize-y`}
        />
      </div>

      <fieldset className="mt-7">
        <legend className={labelClass}>What's this about?</legend>
        <div className="mt-3 grid gap-x-6 gap-y-3 sm:grid-cols-2">
          {contactTopics.map((topic) => (
            <label
              key={topic}
              className="flex cursor-pointer items-center gap-3 text-[0.9375rem] text-form-foreground"
            >
              <input
                type="checkbox"
                name="topics"
                value={topic}
                className="h-[18px] w-[18px] shrink-0 cursor-pointer accent-[#21242c] [color-scheme:light] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-form-foreground"
              />
              {topic}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Spam trap for bots; hidden from people and screen readers. */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
      />

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-8 inline-flex w-full items-center justify-center gap-2 bg-ink px-5 py-4 text-sm font-semibold text-ink-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-form-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-form disabled:opacity-60 dark:text-primary"
      >
        <Send aria-hidden className="size-4" strokeWidth={1.8} />
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      <p id={`${id}-status`} role="status" className="mt-3 min-h-5 text-sm text-form-foreground">
        {status === "sent" && "Thanks! Your message is on its way."}
        {status === "error" && (
          <>
            Something went wrong. Please email me at{" "}
            <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
            .
          </>
        )}
      </p>
    </form>
  );
}
