import { describe, expect, it, vi } from "vitest";
import {
  COOKIE_CONSENT_KEY,
  OPEN_COOKIE_CONSENT_EVENT,
  openCookieConsent,
} from "./cookie-consent";

describe("CookieConsent constants & helpers", () => {
  it("possui chave de storage e evento customizado bem definidos", () => {
    expect(COOKIE_CONSENT_KEY).toBe("tt_cookie_consent");
    expect(OPEN_COOKIE_CONSENT_EVENT).toBe("tt:open-cookie-consent");
  });

  it("openCookieConsent dispara o evento esperado na window", () => {
    const dispatchSpy = vi.fn();
    vi.stubGlobal("window", {
      dispatchEvent: dispatchSpy,
    });

    openCookieConsent();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    const event = dispatchSpy.mock.calls[0][0];
    expect(event.type).toBe(OPEN_COOKIE_CONSENT_EVENT);

    vi.unstubAllGlobals();
  });
});
