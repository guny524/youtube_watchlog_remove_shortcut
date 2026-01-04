type CookieData = {
  name: string;
  value: string;
  domain: string;
  path?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: 'no_restriction' | 'lax' | 'strict';
  expirationDate?: number;
}

type InjectCookiesMessage = {
  type: 'inject-cookies';
  cookies: CookieData[];
}

type InjectCookiesResponse = {
  success: boolean;
  injectedCount?: number;
  error?: string;
}

type ExternalMessage = InjectCookiesMessage;

async function injectCookies(cookies: CookieData[]): Promise<number> {
  let injectedCount = 0;

  for (const cookie of cookies) {
    try {
      await browser.cookies.set({
        url: `https://${cookie.domain.replace(/^\./, '')}${cookie.path ?? '/'}`,
        name: cookie.name,
        value: cookie.value,
        domain: cookie.domain,
        path: cookie.path ?? '/',
        secure: cookie.secure ?? true,
        httpOnly: cookie.httpOnly ?? false,
        sameSite: cookie.sameSite ?? 'no_restriction',
        expirationDate: cookie.expirationDate,
      });
      injectedCount++;
    } catch (error) {
      console.error(`[YT History Shortcut] Failed to set cookie ${cookie.name}:`, error);
    }
  }

  return injectedCount;
}

export default defineBackground(() => {
  console.log('[YT History Shortcut] Background script loaded', { id: browser.runtime.id });

  // Listen for external messages (from test pages via externally_connectable)
  browser.runtime.onMessageExternal.addListener(
    (
      message: ExternalMessage,
      _sender: { id?: string; url?: string; tab?: { id?: number } },
      sendResponse: (response: InjectCookiesResponse) => void
    ) => {
      if (message.type === 'inject-cookies') {
        injectCookies(message.cookies)
          .then((injectedCount) => {
            console.log(`[YT History Shortcut] Injected ${injectedCount} cookies`);
            sendResponse({ success: true, injectedCount });
          })
          .catch((error: unknown) => {
            const errorMessage = error instanceof Error ? error.message : String(error);
            console.error('[YT History Shortcut] Cookie injection failed:', errorMessage);
            sendResponse({ success: false, error: errorMessage });
          });
        return true; // Keep message channel open for async response
      }
      return false;
    }
  );
});
