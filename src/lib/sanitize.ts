/* ================================================================
   StadiumPulse — Input Sanitization Utilities
   Prevents XSS in user-facing content. Used in chat and any
   place user text is displayed (even as text content, not HTML).
   ================================================================ */

/**
 * Strips any HTML/script tags from a string and trims whitespace.
 * Suitable for text-only contexts (no HTML rendering).
 */
export function sanitizeText(input: string): string {
  return input
    .replace(/<[^>]*>/g, '')  // strip tags
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .trim()
    .slice(0, 500); // hard cap to prevent DoS
}

/**
 * Validates and normalises a phone number to digits only (max 15).
 */
export function sanitizePhone(input: string): string {
  return input.replace(/\D/g, '').slice(0, 15);
}

/**
 * Validates a ticket ID format (alphanumeric + hyphens, 4–24 chars).
 */
export function isValidTicketId(input: string): boolean {
  return /^[A-Za-z0-9\-]{4,24}$/.test(input.trim());
}

/**
 * Encodes a string for safe use in a URL query parameter.
 */
export function encodeForUrl(input: string): string {
  return encodeURIComponent(sanitizeText(input));
}
