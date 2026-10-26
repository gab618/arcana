"use client";

import { openCookieConsent } from "./cookie-consent";

export function CookiePreferencesButton() {
  return (
    <button
      type="button"
      onClick={openCookieConsent}
      className="cursor-pointer hover:underline"
    >
      Preferências de cookies
    </button>
  );
}
