import NextLink from "next/link";
import type { ComponentProps } from "react";

// Existing templates use sitePath for static hosting. Next Link adds that prefix itself.
export default function SiteLink({href, ...props}: ComponentProps<typeof NextLink>) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const unprefixed = typeof href === "string" && base && (href === base || href.startsWith(`${base}/`) || href.startsWith(`${base}?`)) ? href.slice(base.length) || "/" : href;
  return <NextLink {...props} href={unprefixed} />;
}
