"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Check, Spinner } from "@/components/ui/icons";
import { site } from "@/lib/content";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const fieldStyles = cn(
  "w-full rounded-xl border border-border bg-bg px-4 py-3 text-[0.9375rem] text-text",
  "placeholder:text-muted/70",
  "transition-[border-color,box-shadow] duration-200 [transition-timing-function:var(--ease-soft)]",
  "hover:border-accent focus:border-accent-ink focus:outline-none",
  "aria-[invalid=true]:border-red-500/60",
);

/**
 * Progressive enhancement, deliberately:
 *
 *  - With RESEND_API_KEY + CONTACT_TO_EMAIL set, the route delivers the message.
 *  - Without them, the route replies `not_configured` and we open a prefilled
 *    mail client instead.
 *
 * A contact form that silently swallows messages is worse than no form at all,
 * so there is no path here that ends in nothing happening.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
      // Bots fill every field they find; humans never see this one.
      company: String(formData.get("company") ?? ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (result.status === "not_configured") {
        const subject = encodeURIComponent(`Portfolio enquiry from ${payload.name}`);
        const body = encodeURIComponent(`${payload.message}\n\n— ${payload.name} (${payload.email})`);
        window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
        setStatus("success");
        return;
      }

      if (!response.ok) throw new Error(result.message ?? "Something went wrong.");

      setStatus("success");
      event.currentTarget.reset();
    } catch (submitError) {
      setStatus("error");
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Something went wrong. Please email me directly.",
      );
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex items-center gap-3 rounded-xl border border-border bg-accent-soft px-5 py-6"
      >
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-bg text-accent-ink">
          <Check className="size-4" />
        </span>
        <div>
          <p className="text-[0.9375rem] font-medium">Message sent</p>
          <p className="text-sm text-muted">I&apos;ll get back to you within a couple of days.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="label mb-2 block">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Ada Lovelace"
            className={fieldStyles}
          />
        </div>
        <div>
          <label htmlFor="email" className="label mb-2 block">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            className={fieldStyles}
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="label mb-2 block">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          placeholder="Tell me what you're working on."
          className={cn(fieldStyles, "resize-y")}
        />
      </div>

      {/* Honeypot — hidden from sight and from assistive tech. */}
      <div aria-hidden className="absolute h-px w-px overflow-hidden opacity-0">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <Button type="submit" disabled={status === "submitting"} className="group">
          {status === "submitting" ? (
            <>
              <Spinner className="size-4 animate-spin" />
              Sending
            </>
          ) : (
            <>
              Send message
              <ArrowRight className="size-4 transition-transform duration-300 [transition-timing-function:var(--ease-soft)] group-hover:translate-x-0.5" />
            </>
          )}
        </Button>

        {/* Politely announced so it doesn't interrupt a screen reader mid-field. */}
        <p role="status" aria-live="polite" className="text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      </div>
    </form>
  );
}
