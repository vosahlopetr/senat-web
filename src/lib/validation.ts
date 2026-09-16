/** Deliberately permissive – Resend does the authoritative validation. */
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const EMAIL_MAX_LENGTH = 255;

export function isValidEmail(email: string): boolean {
  return (
    email.length > 0 &&
    email.length <= EMAIL_MAX_LENGTH &&
    EMAIL_REGEX.test(email)
  );
}
