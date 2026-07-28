import { ImageResponse } from "next/og";
import { site } from "@/lib/content";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Generated at build time, so the link preview stays in sync with content.ts
 * and there's no static image to re-export whenever a detail changes.
 *
 * Uses the site's own palette — inline styles only; Satori supports no CSS
 * variables and only a flexbox subset.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#ffffff",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Accent hairline, echoing the section labels on the site itself. */}
        <div style={{ display: "flex", width: "96px", height: "4px", backgroundColor: "#a7d8ff" }} />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 88,
              fontWeight: 600,
              letterSpacing: "-0.04em",
              color: "#111111",
            }}
          >
            {site.name}
          </div>
          {/* Single interpolation: Satori rejects a non-flex div with more
              than one child, and JSX text + expressions count separately. */}
          <div style={{ marginTop: 20, fontSize: 36, color: "#6b7280" }}>
            {`${site.role} · ${site.location}`}
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 26, color: "#0f6fa8" }}>
          {site.url.replace(/^https?:\/\//, "")}
        </div>
      </div>
    ),
    size,
  );
}
